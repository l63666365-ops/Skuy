// SkuyJadwal Service Worker v6 - offline page embedded
const CACHE_VERSION = 'skuy-v6';
const CACHE_NAME = CACHE_VERSION;

const OFFLINE_HTML = `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
<title>Offline – SkuyJadwal</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&display=swap');
*{margin:0;padding:0;box-sizing:border-box;font-family:'Poppins',sans-serif;}

body {
  min-height:100vh;
  display:flex;align-items:center;justify-content:center;
  padding:24px 20px;
  background: #0a0f2c;
  overflow:hidden;
  position:relative;
}

/* ── Bintang-bintang di background ── */
.stars {
  position:fixed;inset:0;pointer-events:none;z-index:0;
}
.star {
  position:absolute;background:#fff;border-radius:50%;
  animation: twinkle var(--dur) ease-in-out infinite var(--delay);
}
@keyframes twinkle {
  0%,100%{opacity:.15;transform:scale(1);}
  50%{opacity:1;transform:scale(1.4);}
}

/* ── Meteor sesekali ── */
.meteor {
  position:fixed;top:0;left:0;width:2px;height:60px;
  background:linear-gradient(to bottom,#fff,transparent);
  border-radius:2px;pointer-events:none;z-index:1;
  animation: meteorFly var(--dur2) linear infinite var(--delay2);
  opacity:0;
}
@keyframes meteorFly {
  0%{opacity:0;transform:translate(var(--mx),var(--my)) rotate(35deg);}
  5%{opacity:1;}
  40%{opacity:0;transform:translate(calc(var(--mx) + 300px), calc(var(--my) + 200px)) rotate(35deg);}
  100%{opacity:0;transform:translate(calc(var(--mx) + 300px), calc(var(--my) + 200px)) rotate(35deg);}
}

/* ── Card ── */
.card {
  position:relative;z-index:10;
  background:rgba(255,255,255,0.05);
  backdrop-filter:blur(20px);
  -webkit-backdrop-filter:blur(20px);
  border:1px solid rgba(255,255,255,0.12);
  border-radius:28px;
  padding:40px 28px 36px;
  text-align:center;
  max-width:340px;width:100%;
  box-shadow:0 0 60px rgba(84,131,179,0.2), 0 8px 32px rgba(0,0,0,0.4);
  animation: cardIn .8s cubic-bezier(.34,1.56,.64,1);
}
@keyframes cardIn {
  from{opacity:0;transform:scale(.8) translateY(30px);}
  to{opacity:1;transform:scale(1) translateY(0);}
}

/* ── Ilustrasi Planet + Sinyal ── */
.scene {
  width:130px;height:130px;
  margin:0 auto 22px;
  position:relative;
  cursor:pointer;
  -webkit-tap-highlight-color:transparent;
}

/* Planet */
.planet {
  width:80px;height:80px;
  background:radial-gradient(circle at 35% 35%, #3a7bd5, #0a0f2c);
  border-radius:50%;
  position:absolute;
  bottom:0;left:50%;transform:translateX(-50%);
  box-shadow:0 0 30px rgba(58,123,213,0.6), inset -10px -10px 20px rgba(0,0,0,0.4);
  animation: planetFloat 4s ease-in-out infinite;
}
@keyframes planetFloat{0%,100%{transform:translateX(-50%) translateY(0);}50%{transform:translateX(-50%) translateY(-6px);}}

/* Cincin planet */
.planet-ring {
  position:absolute;
  bottom:18px;left:50%;
  width:100px;height:22px;
  border:3px solid rgba(125,160,202,0.4);
  border-radius:50%;
  transform:translateX(-50%) rotateX(70deg);
  animation: planetFloat 4s ease-in-out infinite;
}

/* Antena di planet */
.antenna {
  position:absolute;
  bottom:78px;left:50%;
  transform:translateX(-50%);
  display:flex;flex-direction:column;align-items:center;
  animation: planetFloat 4s ease-in-out infinite;
}
.antenna-stick {
  width:3px;height:22px;
  background:linear-gradient(to top,#7da0ca,#c1e8ff);
  border-radius:2px;
}
.antenna-ball {
  width:8px;height:8px;
  background:#c1e8ff;border-radius:50%;
  box-shadow:0 0 8px #c1e8ff, 0 0 16px #5483b3;
  animation: antennaPulse 1.5s ease-in-out infinite;
}
@keyframes antennaPulse{0%,100%{box-shadow:0 0 6px #c1e8ff,0 0 12px #5483b3;}50%{box-shadow:0 0 14px #c1e8ff,0 0 28px #5483b3,0 0 40px #5483b3;}}

/* Sinyal WiFi glitch */
.wifi-wrap {
  position:absolute;
  top:0;left:50%;transform:translateX(-50%);
}
.wifi-wrap svg { width:60px;height:45px; }

.arc { fill:none;stroke-linecap:round; }

.arc-1 { stroke:#c1e8ff;stroke-width:5; }
.arc-2 { stroke:#7da0ca;stroke-width:5; }
.arc-3 { stroke:#5483b3;stroke-width:5; }
.wifi-dot { fill:#052659; }

/* Glitch: arc masing-masing punya delay beda */
.arc-1 { animation: glitchArc1 2.4s ease-in-out infinite; }
.arc-2 { animation: glitchArc2 2.4s ease-in-out infinite .25s; }
.arc-3 { animation: glitchArc3 2.4s ease-in-out infinite .5s; }
.wifi-dot { animation: glitchDot 2.4s ease-in-out infinite .75s; }

@keyframes glitchArc1 {
  0%,100%{opacity:1;transform:none;}
  30%{opacity:0;transform:translateX(-4px);}
  32%{opacity:1;transform:translateX(3px);}
  34%{opacity:0;transform:none;}
  36%{opacity:1;}
  60%{opacity:.2;}70%{opacity:1;}
}
@keyframes glitchArc2 {
  0%,100%{opacity:1;transform:none;}
  28%{opacity:1;}
  31%{opacity:0;transform:translateX(5px);}
  33%{opacity:1;transform:none;}
  62%{opacity:.15;}72%{opacity:1;}
}
@keyframes glitchArc3 {
  0%,100%{opacity:1;transform:none;}
  29%{opacity:0;transform:translateX(-3px) scaleX(1.1);}
  32%{opacity:1;transform:none;}
  64%{opacity:.3;}74%{opacity:1;}
}
@keyframes glitchDot {
  0%,100%{opacity:1;}
  30%,34%{opacity:0;}
  32%{opacity:.8;}
  66%{opacity:.1;}76%{opacity:1;}
}

/* X merah animasi */
.x-badge {
  position:absolute;top:0;right:24px;
  width:22px;height:22px;
  background:#ff4d4d;border-radius:50%;
  border:2px solid rgba(255,255,255,0.3);
  display:flex;align-items:center;justify-content:center;
  box-shadow:0 0 12px rgba(255,77,77,.7);
  animation: xBadge 2.4s ease-in-out infinite;
}
@keyframes xBadge {
  0%,100%{box-shadow:0 0 8px rgba(255,77,77,.5);transform:scale(1);}
  31%,33%{box-shadow:0 0 20px rgba(255,77,77,1);transform:scale(1.2);}
  32%{transform:scale(.9);}
  50%{box-shadow:0 0 8px rgba(255,77,77,.5);transform:scale(1);}
}
.x-badge svg{width:11px;height:11px;stroke:#fff;stroke-width:2.5;stroke-linecap:round;fill:none;}

/* Partikel muncul saat tap */
.particle {
  position:fixed;border-radius:50%;pointer-events:none;z-index:999;
  animation:particleFly .8s ease-out forwards;
}
@keyframes particleFly{
  0%{opacity:1;transform:translate(0,0) scale(1);}
  100%{opacity:0;transform:translate(var(--px),var(--py)) scale(0);}
}

/* Ring ripple saat tap */
.ripple-ring {
  position:fixed;border-radius:50%;pointer-events:none;z-index:998;
  border:2px solid rgba(193,232,255,0.7);
  animation:rippleOut .6s ease-out forwards;
}
@keyframes rippleOut{
  0%{transform:translate(-50%,-50%) scale(0);opacity:1;}
  100%{transform:translate(-50%,-50%) scale(3);opacity:0;}
}

/* Teks */
h1 { font-size:21px;font-weight:800;color:#e8f4ff;letter-spacing:-.5px;margin-bottom:8px; }
.subtitle { font-size:13px;color:#7da0ca;font-weight:500;line-height:1.7;margin-bottom:22px; }

/* Tips */
.tips {
  background:rgba(255,255,255,0.06);
  border:1px solid rgba(193,232,255,0.15);
  border-radius:14px;padding:14px 16px;text-align:left;margin-bottom:22px;
}
.tips-title{font-size:10px;font-weight:800;color:#c1e8ff;text-transform:uppercase;letter-spacing:.8px;margin-bottom:8px;}
.tips-item{display:flex;align-items:flex-start;gap:8px;margin-bottom:6px;font-size:12px;color:#a0c4e8;font-weight:600;}
.tips-item:last-child{margin-bottom:0;}
.tips-dot{width:5px;height:5px;min-width:5px;background:#5483b3;border-radius:50%;margin-top:5px;}

/* Tombol */
.btn-retry {
  width:100%;border:none;padding:15px;border-radius:14px;
  font-size:13px;font-weight:800;cursor:pointer;
  letter-spacing:.5px;text-transform:uppercase;
  display:flex;align-items:center;justify-content:center;gap:8px;
  background:linear-gradient(135deg,#3a7bd5,#052659);
  color:#fff;
  box-shadow:0 0 20px rgba(58,123,213,0.5), 0 6px 0 rgba(2,16,36,0.5);
  margin-bottom:4px;
  transition:all .15s ease;
  position:relative;overflow:hidden;
}
.btn-retry::before {
  content:'';position:absolute;inset:0;
  background:linear-gradient(135deg,rgba(255,255,255,.15),transparent);
  border-radius:14px;
}
.btn-retry:active{box-shadow:0 0 10px rgba(58,123,213,.4),0 2px 0 rgba(2,16,36,.5);transform:translateY(4px);}

@keyframes spinIcon{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
.spin-anim{animation:spinIcon .7s linear infinite;}

/* Status pill */
#status-pill {
  display:inline-flex;align-items:center;gap:6px;
  font-size:10px;font-weight:700;color:#5483b3;
  background:rgba(255,255,255,0.05);
  border:1px solid rgba(125,160,202,0.25);
  border-radius:20px;padding:5px 14px;margin-top:14px;
}
.pulse-dot{width:7px;height:7px;background:#ff4d4d;border-radius:50%;animation:pulseDot 1.4s ease-in-out infinite;}
@keyframes pulseDot{0%,100%{transform:scale(1);opacity:1;}50%{transform:scale(1.6);opacity:.4;}}

.footer-note{font-size:10px;color:rgba(125,160,202,.45);margin-top:16px;font-weight:500;}

/* Hint tap */
.tap-hint {
  font-size:10px;color:rgba(193,232,255,.35);
  margin-top:6px;letter-spacing:.3px;
  animation:hintFade 3s ease-in-out infinite;
}
@keyframes hintFade{0%,100%{opacity:.35;}50%{opacity:.8;}}
</style>
</head>
<body>

<!-- Bintang -->
<div class="stars" id="stars"></div>

<div class="card">

  <!-- Scene utama -->
  <div class="scene" id="scene" onclick="onSceneTap(event)">
    <!-- Sinyal WiFi glitch -->
    <div class="wifi-wrap">
      <svg viewBox="0 0 60 45">
        <path class="arc arc-1" d="M4 28 Q30 4 56 28"/>
        <path class="arc arc-2" d="M12 35 Q30 16 48 35"/>
        <path class="arc arc-3" d="M20 42 Q30 28 40 42"/>
        <circle class="wifi-dot" cx="30" cy="42" r="3.5"/>
      </svg>
      <div class="x-badge">
        <svg viewBox="0 0 14 14"><line x1="2" y1="2" x2="12" y2="12"/><line x1="12" y1="2" x2="2" y2="12"/></svg>
      </div>
    </div>
    <!-- Planet + antena -->
    <div class="planet-ring"></div>
    <div class="planet"></div>
    <div class="antenna">
      <div class="antenna-ball"></div>
      <div class="antenna-stick"></div>
    </div>
  </div>

  <div class="tap-hint">✨ Tap untuk efek</div>

  <h1>Kamu Lagi Offline 😴</h1>
  <p class="subtitle">Sinyalnya ilang entah ke mana.<br>Cek koneksi lalu coba lagi ya!</p>

  <div class="tips">
    <div class="tips-title">💡 Coba Langkah Ini</div>
    <div class="tips-item"><div class="tips-dot"></div><span>Aktifkan WiFi atau data seluler</span></div>
    <div class="tips-item"><div class="tips-dot"></div><span>Pindah ke lokasi sinyal lebih kuat</span></div>
    <div class="tips-item"><div class="tips-dot"></div><span>Matikan &amp; nyalakan ulang koneksi</span></div>
    <div class="tips-item"><div class="tips-dot"></div><span>Tap "Coba Lagi" setelah koneksi pulih</span></div>
  </div>

  <button class="btn-retry" id="retryBtn" onclick="retryNow()">
    <svg id="retryIcon" width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="23 4 23 10 17 10"/>
      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
    </svg>
    Coba Lagi
  </button>

  <div id="status-pill"><div class="pulse-dot"></div> Menunggu koneksi...</div>
  <div class="footer-note">© 2026 SkuyJadwal · SMK Negeri 2 Sragen</div>
</div>

<script>
/* ── Generate bintang ── */
const starsEl = document.getElementById('stars');
for(let i=0;i<80;i++){
  const s=document.createElement('div');
  s.className='star';
  const size=Math.random()*2.5+0.5;
  s.style.cssText=
    'width:'+size+'px;height:'+size+'px;'+
    'top:'+Math.random()*100+'%;left:'+Math.random()*100+'%;'+
    '--dur:'+(2+Math.random()*3)+'s;--delay:-'+(Math.random()*3)+'s;';
  starsEl.appendChild(s);
}

/* ── Generate meteor ── */
for(let i=0;i<5;i++){
  const m=document.createElement('div');
  m.className='meteor';
  m.style.cssText=
    '--mx:'+Math.random()*100+'vw;--my:-60px;'+
    '--dur2:'+(4+Math.random()*6)+'s;--delay2:-'+(Math.random()*8)+'s;';
  document.body.appendChild(m);
}

/* ── Partikel saat tap scene ── */
function onSceneTap(e){
  const colors=['#c1e8ff','#7da0ca','#5483b3','#fff','#3a7bd5','#ff4d4d'];
  const cx=e.clientX, cy=e.clientY;

  // Ripple
  const r=document.createElement('div');
  r.className='ripple-ring';
  r.style.cssText='width:60px;height:60px;left:'+cx+'px;top:'+cy+'px;';
  document.body.appendChild(r);
  r.addEventListener('animationend',()=>r.remove());

  // Partikel
  for(let i=0;i<18;i++){
    const p=document.createElement('div');
    p.className='particle';
    const size=4+Math.random()*6;
    const angle=Math.random()*Math.PI*2;
    const dist=40+Math.random()*80;
    p.style.cssText=
      'width:'+size+'px;height:'+size+'px;'+
      'background:'+colors[Math.floor(Math.random()*colors.length)]+';'+
      'left:'+cx+'px;top:'+cy+'px;'+
      '--px:'+(Math.cos(angle)*dist)+'px;--py:'+(Math.sin(angle)*dist)+'px;'+
      'animation-delay:'+(Math.random()*.15)+'s;';
    document.body.appendChild(p);
    p.addEventListener('animationend',()=>p.remove());
  }
}

/* ── Retry ── */
function retryNow(){
  const btn=document.getElementById('retryBtn');
  btn.innerHTML='<svg class="spin-anim" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg> Mengecek...';
  setTimeout(()=>window.location.reload(),800);
}

/* ── Auto-detect online ── */
const pill=document.getElementById('status-pill');
setInterval(()=>{
  if(navigator.onLine){
    pill.innerHTML='<div style="width:7px;height:7px;background:#28a745;border-radius:50%;box-shadow:0 0 8px #28a745;"></div> Koneksi pulih! Membuka...';
    setTimeout(()=>window.location.href='./',700);
  }
},4000);
</script>
</body>
</html>`;

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
        ).then(() => clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);
    if (url.origin !== self.location.origin) return;

    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request)
                .then(res => {
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

// ─── Background Notification ───────────────────────────────────────────────
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
        const tag = kelas ? ' · ' + kelas : '';
        return { title: '📚 SkuyJadwal' + tag, body: statNext ? statNow + '\n' + statNext : statNow };
    }
    const now = new Date();
    const days = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
    const todayName = days[now.getDay()];
    const currentMin = now.getHours() * 60 + now.getMinutes();
    const currentMs = now.getTime();
    const tag = kelas ? ' · ' + kelas : '';
    if (todayName === 'Sabtu' || todayName === 'Minggu')
        return { title: '🏖️ Libur Akhir Pekan' + tag, body: 'Sampai Senin ya!' };
    if (currentMin >= 18 * 60) {
        const besok = new Date(now); besok.setDate(besok.getDate() + 1);
        const namaBesok = days[besok.getDay()];
        if (namaBesok === 'Sabtu' || namaBesok === 'Minggu')
            return { title: '🎉 Libur Akhir Pekan' + tag, body: 'Selamat istirahat!' };
        return { title: '📋 Persiapan Besok: ' + namaBesok + tag, body: 'Tugas sudah diurutkan sesuai jadwal besok' };
    }
    const wt = (jadwal && jadwal[weekType]) ? weekType : 'm1';
    const listMapel = (jadwal && jadwal[wt] && jadwal[wt][todayName]) || [];
    if (!listMapel.length) return { title: '📅 ' + todayName + tag, body: 'Tidak ada jadwal hari ini.' };
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
            return { title: '📖 Sekarang: ' + listMapel[i][0] + tag, body: 'Berakhir ' + cd + '\nSelanjutnya: ' + (next ? next[0] : 'Pulang 🎉') };
        }
        if (currentMin < startMin) {
            const cd = countdown(new Date(now.getFullYear(), now.getMonth(), now.getDate(), s[0], s[1]||0, 0).getTime() - currentMs);
            return { title: '⏰ Istirahat' + tag, body: listMapel[i][0] + ' mulai ' + cd + ' lagi' };
        }
    }
    return { title: '✅ Selesai' + tag, body: 'Semua pelajaran hari ini selesai!' };
}

function countdown(ms) {
    const t = Math.max(0, Math.floor(ms / 1000));
    const h = Math.floor(t / 3600);
    const m = Math.floor((t % 3600) / 60);
    const s = t % 60;
    const p = [];
    if (h) p.push(h + ' jam');
    if (m) p.push(m + ' menit');
    if (s || !p.length) p.push(s + ' detik');
    return p.join(' ');
}
