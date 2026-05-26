// SkuyJadwal Service Worker - Background Notification
const NOTIF_TAG = 'skuyjadwal-status';

let jadwalState = null;
let lastNotifBody = '';
let notifInterval = null;

// ─── Terima pesan dari halaman utama ────────────────────────────────────────
self.addEventListener('message', (event) => {
    if (!event.data) return;

    if (event.data.type === 'UPDATE_JADWAL') {
        jadwalState = event.data.payload;
        // Langsung tampilkan/update notif saat dapat data baru
        tickNotif();
        // Jalankan interval update tiap 10 detik kalau belum jalan
        if (!notifInterval) {
            notifInterval = setInterval(tickNotif, 10000);
        }
    }

    if (event.data.type === 'STOP_NOTIF') {
        if (notifInterval) { clearInterval(notifInterval); notifInterval = null; }
        self.registration.getNotifications({ tag: NOTIF_TAG })
            .then(list => list.forEach(n => n.close()));
    }
});

// ─── Notifikasi diklik → buka / fokus app ───────────────────────────────────
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((wins) => {
            for (const w of wins) {
                if (w.url.includes('index.html') || w.url.endsWith('/')) {
                    return w.focus();
                }
            }
            return clients.openWindow('./index.html');
        })
    );
});

// ─── Install & Activate ─────────────────────────────────────────────────────
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(clients.claim()));

// ════════════════════════════════════════════════════════════════════════════
//  CORE: Hitung konten lalu tampilkan / update notifikasi
// ════════════════════════════════════════════════════════════════════════════
function tickNotif() {
    if (!jadwalState) return;

    const { title, body } = buildNotifContent();

    // Hindari spam: kalau isi sama persis, skip (kecuali body mengandung "detik" = countdown)
    const hasCountdown = body.includes('detik') || body.includes('menit') || body.includes('jam');
    if (!hasCountdown && body === lastNotifBody) return;
    lastNotifBody = body;

    self.registration.showNotification(title, {
        body,
        tag: NOTIF_TAG,           // overwrite notif lama → tidak numpuk
        renotify: false,          // tidak bunyi saat update
        silent: true,
        icon: './1000222713-removebg-preview.png',
        badge: './1000222713-removebg-preview.png',
        requireInteraction: false,
        data: { url: './index.html' }
    }).catch(() => {});
}

// ─── Bangun isi notifikasi dari data jadwal ──────────────────────────────────
function buildNotifContent() {
    if (!jadwalState) {
        return { title: '📚 SkuyJadwal', body: 'Buka app untuk lihat jadwal.' };
    }

    const { jadwal, weekType, kelas } = jadwalState;
    const now        = new Date();
    const days       = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
    const todayName  = days[now.getDay()];
    const currentMin = now.getHours() * 60 + now.getMinutes();
    const currentMs  = now.getTime();
    const tag        = kelas ? ` · ${kelas}` : '';

    // Akhir pekan
    if (todayName === 'Sabtu' || todayName === 'Minggu') {
        return { title: `🏖️ Libur Akhir Pekan${tag}`, body: 'Sampai Senin ya!' };
    }

    // Setelah jam 18 → persiapan besok
    if (currentMin >= 18 * 60) {
        const besok = new Date(now);
        besok.setDate(besok.getDate() + 1);
        const namaBesok = days[besok.getDay()];
        if (namaBesok === 'Sabtu' || namaBesok === 'Minggu') {
            return { title: `🎉 Libur Akhir Pekan${tag}`, body: 'Selamat istirahat!' };
        }
        return { title: `📋 Persiapan Besok: ${namaBesok}${tag}`, body: 'Cek tugas & jadwal besok.' };
    }

    // Jadwal hari ini
    const wt        = (jadwal && jadwal[weekType]) ? weekType : 'm1';
    const listMapel = (jadwal && jadwal[wt] && jadwal[wt][todayName]) || [];

    if (!listMapel.length) {
        return { title: `📅 ${todayName}${tag}`, body: 'Tidak ada jadwal hari ini.' };
    }

    for (let i = 0; i < listMapel.length; i++) {
        const raw   = (listMapel[i][1] || '').replace(/\./g, ':').replace(/\s/g, '');
        const parts = raw.split('-');
        if (!parts[1]) continue;

        const s        = parts[0].split(':').map(Number);
        const e        = parts[1].split(':').map(Number);
        const startMin = s[0] * 60 + (s[1] || 0);
        const endMin   = e[0] * 60 + (e[1] || 0);

        if (currentMin >= startMin && currentMin < endMin) {
            // Sedang berlangsung
            const cd   = countdown(new Date(now.getFullYear(), now.getMonth(), now.getDate(), e[0], e[1]||0, 0).getTime() - currentMs);
            const next = listMapel[i + 1];
            return {
                title: `📖 Sekarang: ${listMapel[i][0]}${tag}`,
                body:  `Berakhir ${cd}\nSelanjutnya: ${next ? next[0] : 'Pulang 🎉'}`
            };
        }

        if (currentMin < startMin) {
            // Belum mulai — istirahat
            const cd = countdown(new Date(now.getFullYear(), now.getMonth(), now.getDate(), s[0], s[1]||0, 0).getTime() - currentMs);
            return {
                title: `⏰ Istirahat${tag}`,
                body:  `${listMapel[i][0]} mulai ${cd} lagi`
            };
        }
    }

    return { title: `✅ Selesai${tag}`, body: 'Semua pelajaran hari ini selesai!' };
}

// ─── ms → "X jam Y menit Z detik" ───────────────────────────────────────────
function countdown(ms) {
    const t = Math.max(0, Math.floor(ms / 1000));
    const h = Math.floor(t / 3600);
    const m = Math.floor((t % 3600) / 60);
    const s = t % 60;
    const p = [];
    if (h) p.push(`${h} jam`);
    if (m) p.push(`${m} menit`);
    if (s || !p.length) p.push(`${s} detik`);
    return p.join(' ');
              }
