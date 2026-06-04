// SkuyJadwal Service Worker v2 - cache busting + background notification
const CACHE_VERSION = 'skuy-v3';
const CACHE_NAME = CACHE_VERSION;

// Hapus semua cache lama saat SW baru aktif
self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
            )
        ).then(() => clients.claim())
    );
});

self.addEventListener('install', () => self.skipWaiting());

// Fetch: network-first untuk HTML, cache-first untuk aset statis
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // Jangan intercept request ke luar domain (Firebase, Cloudinary, GAS, dll)
    if (!url.origin.includes(self.location.origin)) return;

    // HTML selalu dari network (agar update langsung kena)
    if (event.request.destination === 'document' ||
        url.pathname.endsWith('.html') ||
        url.pathname === '/') {
        event.respondWith(
            fetch(event.request).catch(() => caches.match(event.request))
        );
        return;
    }

    // Aset lain: cache-first dengan fallback network
    event.respondWith(
        caches.match(event.request).then(cached => {
            if (cached) return cached;
            return fetch(event.request).then(response => {
                if (response && response.status === 200) {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
                }
                return response;
            });
        })
    );
});

// ─── Background Notification ─────────────────────────────────────────────────
const NOTIF_TAG = 'skuyjadwal-status';
let jadwalState = null;
let lastNotifBody = '';
let notifInterval = null;

self.addEventListener('message', (event) => {
    if (!event.data) return;

    if (event.data.type === 'UPDATE_JADWAL') {
        jadwalState = event.data.payload;
        tickNotif();
        if (!notifInterval) {
            notifInterval = setInterval(tickNotif, 10000);
        }
    }

    if (event.data.type === 'CLOSE_ALL_NOTIF') {
        self.registration.getNotifications()
            .then(list => list.forEach(n => n.close()));
    }

    if (event.data.type === 'STOP_NOTIF') {
        if (notifInterval) { clearInterval(notifInterval); notifInterval = null; }
        self.registration.getNotifications({ tag: NOTIF_TAG })
            .then(list => list.forEach(n => n.close()));
    }
});

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

function tickNotif() {
    if (!jadwalState) return;
    const { title, body } = buildNotifContent();
    const hasCountdown = body.includes('detik') || body.includes('menit') || body.includes('jam');
    if (!hasCountdown && body === lastNotifBody) return;
    lastNotifBody = body;
    self.registration.showNotification(title, {
        body, tag: NOTIF_TAG, renotify: true, silent: true,
        icon: './icon-192.png', badge: './icon-192.png',
        requireInteraction: false, data: { url: './index.html' }
    }).catch(() => {});
}

function buildNotifContent() {
    if (!jadwalState) return { title: '📚 SkuyJadwal', body: 'Buka app untuk lihat jadwal.' };
    const { jadwal, weekType, kelas, statNow, statNext } = jadwalState;
    if (statNow) {
        const tag = kelas ? ` · ${kelas}` : '';
        return { title: `📚 SkuyJadwal${tag}`, body: statNext ? `${statNow}\n${statNext}` : statNow };
    }
    const now = new Date();
    const days = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
    const todayName = days[now.getDay()];
    const currentMin = now.getHours() * 60 + now.getMinutes();
    const currentMs = now.getTime();
    const tag = kelas ? ` · ${kelas}` : '';
    if (todayName === 'Sabtu' || todayName === 'Minggu')
        return { title: `🏖️ Libur Akhir Pekan${tag}`, body: 'Sampai Senin ya!' };
    if (currentMin >= 18 * 60) {
        const besok = new Date(now); besok.setDate(besok.getDate() + 1);
        const namaBesok = days[besok.getDay()];
        if (namaBesok === 'Sabtu' || namaBesok === 'Minggu')
            return { title: `🎉 Libur Akhir Pekan${tag}`, body: 'Selamat istirahat!' };
        return { title: `📋 Persiapan Besok: ${namaBesok}${tag}`, body: 'Tugas sudah diurutkan sesuai jadwal besok' };
    }
    const wt = (jadwal && jadwal[weekType]) ? weekType : 'm1';
    const listMapel = (jadwal && jadwal[wt] && jadwal[wt][todayName]) || [];
    if (!listMapel.length) return { title: `📅 ${todayName}${tag}`, body: 'Tidak ada jadwal hari ini.' };
    for (let i = 0; i < listMapel.length; i++) {
        const raw = (listMapel[i][1] || '').replace(/\./g, ':').replace(/\s/g, '');
        const parts = raw.split('-');
        if (!parts[1]) continue;
        const s = parts[0].split(':').map(Number);
        const e = parts[1].split(':').map(Number);
        const startMin = s[0] * 60 + (s[1] || 0);
        const endMin = e[0] * 60 + (e[1] || 0);
        if (currentMin >= startMin && currentMin < endMin) {
            const cd = countdown(new Date(now.getFullYear(), now.getMonth(), now.getDate(), e[0], e[1]||0, 0).getTime() - currentMs);
            const next = listMapel[i + 1];
            return { title: `📖 Sekarang: ${listMapel[i][0]}${tag}`, body: `Berakhir ${cd}\nSelanjutnya: ${next ? next[0] : 'Pulang 🎉'}` };
        }
        if (currentMin < startMin) {
            const cd = countdown(new Date(now.getFullYear(), now.getMonth(), now.getDate(), s[0], s[1]||0, 0).getTime() - currentMs);
            return { title: `⏰ Istirahat${tag}`, body: `${listMapel[i][0]} mulai ${cd} lagi` };
        }
    }
    return { title: `✅ Selesai${tag}`, body: 'Semua pelajaran hari ini selesai!' };
}

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
