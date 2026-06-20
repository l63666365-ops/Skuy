// SkuyJadwal Service Worker v5 - offline page embedded langsung di SW
const CACHE_VERSION = 'skuy-v12';
const CACHE_NAME = CACHE_VERSION;

// HTML offline di-embed langsung di sini — tidak butuh file offline.html di server
const OFFLINE_HTML = `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
<title>Offline – SkuyJadwal</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&display=swap');
:root{--c1:#021024;--c2:#052659;--c3:#5483b3;--c4:#7da0ca;--c5:#c1e8ff;}
*{margin:0;padding:0;box-sizing:border-box;font-family:'Poppins',sans-serif;}
body{
  background-color:#f1f6f9;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cdefs%3E%3Cstyle%3E.b%7Bfill:none;stroke:%23052659;stroke-width:0.7;opacity:0.13%7D%3C/style%3E%3C/defs%3E%3Ccircle class='b' cx='20' cy='20' r='12'/%3E%3Ccircle class='b' cx='60' cy='20' r='12'/%3E%3Ccircle class='b' cx='20' cy='60' r='12'/%3E%3Ccircle class='b' cx='60' cy='60' r='12'/%3E%3Ccircle class='b' cx='40' cy='40' r='12'/%3E%3Ccircle class='b' cx='0' cy='40' r='12'/%3E%3Ccircle class='b' cx='80' cy='40' r='12'/%3E%3Ccircle class='b' cx='40' cy='0' r='12'/%3E%3Ccircle class='b' cx='40' cy='80' r='12'/%3E%3Ccircle class='b' cx='20' cy='20' r='5'/%3E%3Ccircle class='b' cx='60' cy='20' r='5'/%3E%3Ccircle class='b' cx='20' cy='60' r='5'/%3E%3Ccircle class='b' cx='60' cy='60' r='5'/%3E%3Ccircle class='b' cx='40' cy='40' r='5'/%3E%3Cpath class='b' d='M40 28 L52 40 L40 52 L28 40 Z'/%3E%3Cpath class='b' d='M20 8 L28 16 L20 24 L12 16 Z'/%3E%3Cpath class='b' d='M60 8 L68 16 L60 24 L52 16 Z'/%3E%3Cpath class='b' d='M20 56 L28 64 L20 72 L12 64 Z'/%3E%3Cpath class='b' d='M60 56 L68 64 L60 72 L52 64 Z'/%3E%3C/svg%3E");
  background-size:80px 80px;
  min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px 20px;
}
.card{
  background:#fff;border-radius:24px;padding:40px 28px 36px;
  text-align:center;max-width:340px;width:100%;
  box-shadow:0 8px 32px rgba(5,38,89,.12),0 2px 8px rgba(0,0,0,.06);
  border:1px solid rgba(193,232,255,.6);
  animation:popIn .6s cubic-bezier(.34,1.56,.64,1);
}
@keyframes popIn{from{opacity:0;transform:scale(.85) translateY(20px)}to{opacity:1;transform:scale(1) translateY(0)}}
.wifi-wrap{width:80px;height:80px;margin:0 auto 20px;position:relative;display:flex;align-items:center;justify-content:center;}
.wifi-icon{animation:float 3s ease-in-out infinite;}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
.wifi-icon svg{width:72px;height:72px;}
.arc{fill:none;stroke-linecap:round;}
.arc-1{stroke:#c1e8ff;stroke-width:5;animation:arcFade 2s ease-in-out infinite 0s;}
.arc-2{stroke:#7da0ca;stroke-width:5;animation:arcFade 2s ease-in-out infinite .3s;}
.arc-3{stroke:#5483b3;stroke-width:5;animation:arcFade 2s ease-in-out infinite .6s;}
.dot{fill:#052659;animation:arcFade 2s ease-in-out infinite .9s;}
@keyframes arcFade{0%,100%{opacity:.2}50%{opacity:1}}
.x-mark{
  position:absolute;top:-4px;right:-4px;width:26px;height:26px;
  background:#ff4d4d;border-radius:50%;border:2.5px solid #fff;
  display:flex;align-items:center;justify-content:center;
  box-shadow:0 2px 6px rgba(255,77,77,.4);
  animation:xPop .5s cubic-bezier(.34,1.56,.64,1) .4s both;
}
@keyframes xPop{from{transform:scale(0);opacity:0}to{transform:scale(1);opacity:1}}
.x-mark svg{width:13px;height:13px;stroke:#fff;stroke-width:2.5;stroke-linecap:round;fill:none;}
h1{font-size:22px;font-weight:800;color:#052659;letter-spacing:-.5px;margin-bottom:8px;}
p{font-size:13px;color:#5483b3;font-weight:500;line-height:1.7;margin-bottom:24px;}
.tips{background:#c1e8ff;border:1px solid #7da0ca;border-radius:14px;padding:14px 16px;text-align:left;margin-bottom:24px;}
.tips-title{font-size:11px;font-weight:800;color:#052659;text-transform:uppercase;letter-spacing:.8px;margin-bottom:8px;}
.tips-item{display:flex;align-items:flex-start;gap:8px;margin-bottom:6px;font-size:12px;color:#052659;font-weight:600;}
.tips-item:last-child{margin-bottom:0;}
.tips-dot{width:6px;height:6px;min-width:6px;background:#5483b3;border-radius:50%;margin-top:5px;}
.btn-retry{
  width:100%;background:#052659;color:#fff;border:none;padding:14px;
  border-radius:13px;font-size:13px;font-weight:800;cursor:pointer;
  letter-spacing:.5px;text-transform:uppercase;
  box-shadow:0 6px 0 #021024;margin-bottom:4px;
  transition:all .1s ease;display:flex;align-items:center;justify-content:center;gap:8px;
}
.btn-retry:active{box-shadow:0 2px 0 #021024;transform:translateY(4px);}
@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
.spin{animation:spin .8s linear infinite;}
#status-pill{
  display:inline-flex;align-items:center;gap:5px;font-size:10px;font-weight:700;
  color:#5483b3;background:#f0f7ff;border:1px solid #7da0ca;
  border-radius:20px;padding:4px 12px;margin-top:14px;
}
.pulse-dot{width:7px;height:7px;background:#ff4d4d;border-radius:50%;animation:pulseDot 1.5s ease-in-out infinite;}
@keyframes pulseDot{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.5);opacity:.5}}
.footer-note{font-size:10px;color:#7da0ca;margin-top:18px;font-weight:500;}
</style>
</head>
<body>
<div class="card">
  <div class="wifi-wrap">
    <div class="wifi-icon">
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <path class="arc arc-1" d="M12 38 Q40 10 68 38"/>
        <path class="arc arc-2" d="M22 48 Q40 28 58 48"/>
        <path class="arc arc-3" d="M32 58 Q40 46 48 58"/>
        <circle class="dot" cx="40" cy="66" r="4.5"/>
      </svg>
    </div>
    <div class="x-mark">
      <svg viewBox="0 0 14 14"><line x1="2" y1="2" x2="12" y2="12"/><line x1="12" y1="2" x2="2" y2="12"/></svg>
    </div>
  </div>
  <h1>Kamu Lagi Offline</h1>
  <p>Koneksi internet tidak terdeteksi.<br>Cek koneksi lalu coba lagi ya.</p>
  <div class="tips">
    <div class="tips-title"><svg xmlns="http://w3.org" viewBox="0 0 100 100" width="12" height="12">
  <defs>
    <!-- Efek Pendaran Cahaya (Glow Effect) -->
    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="6" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    <!-- Gradasi Warna Kuning Bohlam -->
    <radialGradient id="bulbYellow" cx="50%" cy="40%" r="50%">
      <stop offset="0%" stop-color="#FFFFCC" />
      <stop offset="70%" stop-color="#FFD700" />
      <stop offset="100%" stop-color="#FF9900" />
    </radialGradient>
  </defs>

  <!-- Sinar Lampu Belakang (Glow) -->
  <circle cx="50" cy="42" r="28" fill="#FFE600" opacity="0.3" filter="url(#glow)" />

  <!-- Garis Sinar Luar -->
  <g stroke="#FFD700" stroke-width="3.5" stroke-linecap="round">
    <line x1="50" y1="8" x2="50" y2="15" />
    <line x1="18" y1="42" x2="25" y2="42" />
    <line x1="82" y1="42" x2="75" y2="42" />
    <line x1="27" y1="20" x2="33" y2="25" />
    <line x1="73" y1="20" x2="67" y2="25" />
  </g>

  <!-- Badan Kaca Bohlam -->
  <path d="M32,53 C32,32 68,32 68,53 C68,61 62,65 59,71 L41,71 C38,65 32,61 32,53 Z" fill="url(#bulbYellow)" stroke="#FF9900" stroke-width="2" />

  <!-- Filamen Dalam (Kawat) -->
  <path d="M44,71 L44,53 Q50,45 56,53 L56,71" fill="none" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" filter="url(#glow)" />

  <!-- Fitting / Dudukan Logam Lampu -->
  <g fill="#9E9E9E" stroke="#757575" stroke-width="1.5" stroke-linejoin="round">
    <path d="M40,71 H60 V75 H40 Z" />
    <path d="M42,75 H58 V79 H42 Z" />
    <path d="M44,79 H56 V82 H44 Z" />
    <!-- Ujung Bawah -->
    <path d="M46,82 C46,85 54,85 54,82 Z" fill="#424242" stroke="#424242" />
  </g>
</svg>
 Coba Langkah Ini:</div>
    <div class="tips-item"><div class="tips-dot"></div><span>Aktifkan WiFi atau data seluler</span></div>
    <div class="tips-item"><div class="tips-dot"></div><span>Pindah ke lokasi dengan sinyal lebih kuat</span></div>
    <div class="tips-item"><div class="tips-dot"></div><span>Matikan &amp; nyalakan ulang koneksi</span></div>
    <div class="tips-item"><div class="tips-dot"></div><span>Tap "Coba Lagi" setelah koneksi pulih</span></div>
  </div>
  <button class="btn-retry" id="retryBtn" onclick="retryNow()">
    <svg id="retryIcon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="23 4 23 10 17 10"/>
      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
    </svg>
    Coba Lagi
  </button>
  <div id="status-pill"><div class="pulse-dot"></div> Menunggu koneksi...</div>
  <div class="footer-note">© 2026 SkuyJadwal · SMK Negeri 2 Sragen</div>
</div>
<script>
function retryNow(){
  document.getElementById('retryIcon').classList.add('spin');
  document.getElementById('retryBtn').innerHTML='<svg class="spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg> Mengecek...';
  setTimeout(()=>window.location.reload(),800);
}
const pill=document.getElementById('status-pill');
setInterval(()=>{
  if(navigator.onLine){
    pill.innerHTML='<div style="width:7px;height:7px;background:#28a745;border-radius:50%;"></div> Koneksi pulih! Membuka...';
    setTimeout(()=>window.location.href='./',600);
  }
},4000);
</script>
</body>
</html>`;

// ─── Install: tidak perlu cache file eksternal ────────────────────────────────
self.addEventListener('install', () => self.skipWaiting());

// ─── Activate: hapus semua cache versi lama ───────────────────────────────────
self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
        ).then(() => clients.claim())
    );
});

// ─── Fetch ────────────────────────────────────────────────────────────────────
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // Jangan intercept request ke luar domain (Firebase, Cloudinary, GAS, dll)
    if (url.origin !== self.location.origin) return;

    // Navigasi / dokumen HTML → network dulu, kalau gagal → serve OFFLINE_HTML langsung
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request)
                .then(res => {
                    // Simpan ke cache kalau berhasil
                    if (res && res.status === 200) {
                        const clone = res.clone();
                        caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
                    }
                    return res;
                })
                .catch(() =>
                    new Response(OFFLINE_HTML, {
                        status: 200,
                        headers: { 'Content-Type': 'text/html; charset=utf-8' }
                    })
                )
        );
        return;
    }

    // Aset statis (JS, CSS, gambar): cache-first, fallback network
    event.respondWith(
        caches.match(event.request).then(cached => {
            if (cached) return cached;
            return fetch(event.request).then(response => {
                if (response && response.status === 200) {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
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
        if (!notifInterval) notifInterval = setInterval(tickNotif, 10000);
    }
    if (event.data.type === 'CLOSE_ALL_NOTIF') {
        self.registration.getNotifications().then(list => list.forEach(n => n.close()));
    }
    if (event.data.type === 'STOP_NOTIF') {
        if (notifInterval) { clearInterval(notifInterval); notifInterval = null; }
        self.registration.getNotifications({ tag: NOTIF_TAG }).then(list => list.forEach(n => n.close()));
    }
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((wins) => {
            for (const w of wins) {
                if (w.url.includes('index.html') || w.url.endsWith('/')) return w.focus();
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
        const endMin   = e[0] * 60 + (e[1] || 0);
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
