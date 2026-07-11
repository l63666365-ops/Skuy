// SkuyJadwal Service Worker v10 - update background offline page jadi gradient
const CACHE_VERSION = 'skuy-v30';
const CACHE_NAME = CACHE_VERSION;
const FONT_CACHE = 'skuy-fonts-v1';

const POPPINS_CSS_URL = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&display=swap';

const OFFLINE_HTML = `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
<title>Offline – SkuyJadwal</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&display=swap');
:root{--c1:#021024;--c2:#052659;--c3:#5483b3;--c4:#7da0ca;--c5:#c1e8ff;--cbg:#e2e5f0;--ccard:#fff;--caccent:#c1e8ff;--bg-gradient:linear-gradient(135deg, #e2e5f0 0%, #d4daf0 50%, #cbd2eb 100%);--bg-blobs:radial-gradient(circle at 80% 20%, rgba(255,255,255,0.4) 0%, transparent 40%),radial-gradient(circle at 20% 60%, rgba(200,207,235,0.6) 0%, transparent 50%),radial-gradient(circle at 70% 80%, rgba(218,224,245,0.5) 0%, transparent 45%);--bg-pattern:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='320' viewBox='0 0 320 320'%3E%3Cdefs%3E%3Csymbol id='ic-book' viewBox='0 0 90 70'%3E%3Crect x='8' y='9' width='74' height='52' rx='4'/%3E%3Cpath d='M45,9 L45,61'/%3E%3Cpath d='M17,22 L36,22'/%3E%3Cpath d='M17,32 L34,32'/%3E%3Cpath d='M17,42 L32,42'/%3E%3Cpath d='M54,22 L73,22'/%3E%3Cpath d='M56,32 L73,32'/%3E%3Cpath d='M58,42 L73,42'/%3E%3C/symbol%3E%3Csymbol id='ic-pencil' viewBox='0 0 40 100'%3E%3Crect x='15' y='26' width='10' height='58'/%3E%3Cpath d='M15,26 L20,8 L25,26 Z'/%3E%3Cpath d='M14,84 L26,84'/%3E%3Crect x='14' y='84' width='12' height='11' rx='2'/%3E%3C/symbol%3E%3Csymbol id='ic-cap' viewBox='0 0 100 70'%3E%3Cpath d='M6,26 L50,10 L94,26 L50,42 Z'/%3E%3Cpath d='M27,29 Q27,52 50,56 Q73,52 73,29'/%3E%3Cpath d='M84,23 L91,52'/%3E%3Ccircle cx='91' cy='57' r='4'/%3E%3C/symbol%3E%3Csymbol id='ic-clock' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='56' r='34'/%3E%3Cpath d='M50,56 L50,36'/%3E%3Cpath d='M50,56 L66,62'/%3E%3Cpath d='M28,24 L16,10'/%3E%3Ccircle cx='15' cy='8' r='5'/%3E%3Cpath d='M72,24 L84,10'/%3E%3Ccircle cx='85' cy='8' r='5'/%3E%3Cpath d='M38,90 L34,98'/%3E%3Cpath d='M62,90 L66,98'/%3E%3C/symbol%3E%3Csymbol id='ic-ruler' viewBox='0 0 100 40'%3E%3Crect x='4' y='12' width='92' height='18' rx='2'/%3E%3Cpath d='M14,12 L14,20'/%3E%3Cpath d='M24,12 L24,17'/%3E%3Cpath d='M34,12 L34,20'/%3E%3Cpath d='M44,12 L44,17'/%3E%3Cpath d='M54,12 L54,20'/%3E%3Cpath d='M64,12 L64,17'/%3E%3Cpath d='M74,12 L74,20'/%3E%3Cpath d='M84,12 L84,17'/%3E%3C/symbol%3E%3C/defs%3E%3Cg fill='none' stroke='%235483b3' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cuse href='%23ic-clock' x='167.3' y='13.5' width='37' height='37' opacity='0.29' transform='rotate(11 185.8 32.0)'/%3E%3Cuse href='%23ic-pencil' x='262.0' y='247.3' width='39' height='39' opacity='0.18' transform='rotate(-20 281.5 266.8)'/%3E%3Cuse href='%23ic-book' x='194.0' y='107.3' width='43' height='43' opacity='0.41' transform='rotate(14 215.5 128.8)'/%3E%3Cuse href='%23ic-ruler' x='1.5' y='35.7' width='39' height='39' opacity='0.29' transform='rotate(23 21.0 55.2)'/%3E%3Cuse href='%23ic-ruler' x='321.5' y='35.7' width='39' height='39' opacity='0.29' transform='rotate(23 341.0 55.2)'/%3E%3Cuse href='%23ic-cap' x='194.2' y='240.4' width='43' height='43' opacity='0.41' transform='rotate(-19 215.7 261.9)'/%3E%3Cuse href='%23ic-book' x='92.3' y='180.3' width='42' height='42' opacity='0.41' transform='rotate(24 113.3 201.3)'/%3E%3Cuse href='%23ic-cap' x='200.5' y='181.9' width='39' height='39' opacity='0.34' transform='rotate(12 220.0 201.4)'/%3E%3Cuse href='%23ic-pencil' x='275.6' y='160.2' width='36' height='36' opacity='0.34' transform='rotate(-21 293.6 178.2)'/%3E%3Cuse href='%23ic-ruler' x='271.7' y='97.0' width='40' height='40' opacity='0.41' transform='rotate(8 291.7 117.0)'/%3E%3Cuse href='%23ic-clock' x='20.2' y='110.1' width='37' height='37' opacity='0.29' transform='rotate(-15 38.7 128.6)'/%3E%3Cuse href='%23ic-ruler' x='82.4' y='21.2' width='36' height='36' opacity='0.18' transform='rotate(20 100.4 39.2)'/%3E%3Cuse href='%23ic-book' x='6.8' y='266.0' width='43' height='43' opacity='0.34' transform='rotate(-17 28.3 287.5)'/%3E%3Cuse href='%23ic-book' x='326.8' y='266.0' width='43' height='43' opacity='0.34' transform='rotate(-17 348.3 287.5)'/%3E%3Cuse href='%23ic-clock' x='122.3' y='243.2' width='38' height='38' opacity='0.29' transform='rotate(-9 141.3 262.2)'/%3E%3Cuse href='%23ic-pencil' x='248.0' y='36.1' width='38' height='38' opacity='0.23' transform='rotate(-14 267.0 55.1)'/%3E%3Cuse href='%23ic-cap' x='79.2' y='121.0' width='39' height='39' opacity='0.41' transform='rotate(18 98.7 140.5)'/%3E%3Cuse href='%23ic-clock' x='22.9' y='195.8' width='43' height='43' opacity='0.34' transform='rotate(15 44.4 217.3)'/%3E%3C/g%3E%3C/svg%3E");}
[data-theme="dark"]{--c1:#e9eff7;--c2:#3f7ab8;--c5:#16233a;--cbg:#0a1128;--ccard:#101c30;--caccent:#c1e8ff;--bg-gradient:linear-gradient(135deg, #0a1128 0%, #10193a 50%, #16233a 100%);--bg-blobs:radial-gradient(circle at 80% 20%, rgba(63,122,184,0.18) 0%, transparent 40%),radial-gradient(circle at 20% 60%, rgba(22,35,58,0.75) 0%, transparent 50%),radial-gradient(circle at 70% 80%, rgba(16,28,48,0.6) 0%, transparent 45%);--bg-pattern:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='320' viewBox='0 0 320 320'%3E%3Cdefs%3E%3Csymbol id='ic-book' viewBox='0 0 90 70'%3E%3Crect x='8' y='9' width='74' height='52' rx='4'/%3E%3Cpath d='M45,9 L45,61'/%3E%3Cpath d='M17,22 L36,22'/%3E%3Cpath d='M17,32 L34,32'/%3E%3Cpath d='M17,42 L32,42'/%3E%3Cpath d='M54,22 L73,22'/%3E%3Cpath d='M56,32 L73,32'/%3E%3Cpath d='M58,42 L73,42'/%3E%3C/symbol%3E%3Csymbol id='ic-pencil' viewBox='0 0 40 100'%3E%3Crect x='15' y='26' width='10' height='58'/%3E%3Cpath d='M15,26 L20,8 L25,26 Z'/%3E%3Cpath d='M14,84 L26,84'/%3E%3Crect x='14' y='84' width='12' height='11' rx='2'/%3E%3C/symbol%3E%3Csymbol id='ic-cap' viewBox='0 0 100 70'%3E%3Cpath d='M6,26 L50,10 L94,26 L50,42 Z'/%3E%3Cpath d='M27,29 Q27,52 50,56 Q73,52 73,29'/%3E%3Cpath d='M84,23 L91,52'/%3E%3Ccircle cx='91' cy='57' r='4'/%3E%3C/symbol%3E%3Csymbol id='ic-clock' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='56' r='34'/%3E%3Cpath d='M50,56 L50,36'/%3E%3Cpath d='M50,56 L66,62'/%3E%3Cpath d='M28,24 L16,10'/%3E%3Ccircle cx='15' cy='8' r='5'/%3E%3Cpath d='M72,24 L84,10'/%3E%3Ccircle cx='85' cy='8' r='5'/%3E%3Cpath d='M38,90 L34,98'/%3E%3Cpath d='M62,90 L66,98'/%3E%3C/symbol%3E%3Csymbol id='ic-ruler' viewBox='0 0 100 40'%3E%3Crect x='4' y='12' width='92' height='18' rx='2'/%3E%3Cpath d='M14,12 L14,20'/%3E%3Cpath d='M24,12 L24,17'/%3E%3Cpath d='M34,12 L34,20'/%3E%3Cpath d='M44,12 L44,17'/%3E%3Cpath d='M54,12 L54,20'/%3E%3Cpath d='M64,12 L64,17'/%3E%3Cpath d='M74,12 L74,20'/%3E%3Cpath d='M84,12 L84,17'/%3E%3C/symbol%3E%3C/defs%3E%3Cg fill='none' stroke='%238fb4e8' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cuse href='%23ic-clock' x='167.3' y='13.5' width='37' height='37' opacity='0.29' transform='rotate(11 185.8 32.0)'/%3E%3Cuse href='%23ic-pencil' x='262.0' y='247.3' width='39' height='39' opacity='0.18' transform='rotate(-20 281.5 266.8)'/%3E%3Cuse href='%23ic-book' x='194.0' y='107.3' width='43' height='43' opacity='0.41' transform='rotate(14 215.5 128.8)'/%3E%3Cuse href='%23ic-ruler' x='1.5' y='35.7' width='39' height='39' opacity='0.29' transform='rotate(23 21.0 55.2)'/%3E%3Cuse href='%23ic-ruler' x='321.5' y='35.7' width='39' height='39' opacity='0.29' transform='rotate(23 341.0 55.2)'/%3E%3Cuse href='%23ic-cap' x='194.2' y='240.4' width='43' height='43' opacity='0.41' transform='rotate(-19 215.7 261.9)'/%3E%3Cuse href='%23ic-book' x='92.3' y='180.3' width='42' height='42' opacity='0.41' transform='rotate(24 113.3 201.3)'/%3E%3Cuse href='%23ic-cap' x='200.5' y='181.9' width='39' height='39' opacity='0.34' transform='rotate(12 220.0 201.4)'/%3E%3Cuse href='%23ic-pencil' x='275.6' y='160.2' width='36' height='36' opacity='0.34' transform='rotate(-21 293.6 178.2)'/%3E%3Cuse href='%23ic-ruler' x='271.7' y='97.0' width='40' height='40' opacity='0.41' transform='rotate(8 291.7 117.0)'/%3E%3Cuse href='%23ic-clock' x='20.2' y='110.1' width='37' height='37' opacity='0.29' transform='rotate(-15 38.7 128.6)'/%3E%3Cuse href='%23ic-ruler' x='82.4' y='21.2' width='36' height='36' opacity='0.18' transform='rotate(20 100.4 39.2)'/%3E%3Cuse href='%23ic-book' x='6.8' y='266.0' width='43' height='43' opacity='0.34' transform='rotate(-17 28.3 287.5)'/%3E%3Cuse href='%23ic-book' x='326.8' y='266.0' width='43' height='43' opacity='0.34' transform='rotate(-17 348.3 287.5)'/%3E%3Cuse href='%23ic-clock' x='122.3' y='243.2' width='38' height='38' opacity='0.29' transform='rotate(-9 141.3 262.2)'/%3E%3Cuse href='%23ic-pencil' x='248.0' y='36.1' width='38' height='38' opacity='0.23' transform='rotate(-14 267.0 55.1)'/%3E%3Cuse href='%23ic-cap' x='79.2' y='121.0' width='39' height='39' opacity='0.41' transform='rotate(18 98.7 140.5)'/%3E%3Cuse href='%23ic-clock' x='22.9' y='195.8' width='43' height='43' opacity='0.34' transform='rotate(15 44.4 217.3)'/%3E%3C/g%3E%3C/svg%3E");}
*{margin:0;padding:0;box-sizing:border-box;font-family:'Poppins',sans-serif;}
body{
  background-color:var(--cbg);
  background-image:var(--bg-pattern), var(--bg-blobs), var(--bg-gradient);
  background-attachment:fixed, fixed, fixed;
  background-size:225px 225px, cover, cover;
  background-repeat:repeat, no-repeat, no-repeat;
  background-position:0 0, center, center;
  color:var(--c1);
  min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px 16px;
}
.theme-toggle-btn{position:fixed;top:14px;left:14px;width:42px;height:42px;border-radius:50%;background:var(--ccard);border:1px solid var(--c4);display:flex;align-items:center;justify-content:center;cursor:pointer;z-index:50;box-shadow:0 4px 15px rgba(5,38,89,.15);}
.theme-toggle-btn:active{transform:scale(.9);}
.theme-toggle-btn svg{width:20px;height:20px;stroke:var(--c2);fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;}
.theme-toggle-btn .icon-moon{display:none;}
[data-theme="dark"] .theme-toggle-btn .icon-sun{display:none;}
[data-theme="dark"] .theme-toggle-btn .icon-moon{display:block;}
.card{
  background:var(--ccard);border-radius:28px;padding:38px 26px 28px;
  text-align:center;max-width:330px;width:100%;
  box-shadow:0 10px 36px rgba(5,38,89,.10);
  border:1px solid rgba(193,232,255,.55);
  animation:popIn .55s cubic-bezier(.34,1.56,.64,1);
}
@keyframes popIn{from{opacity:0;transform:scale(.9) translateY(14px)}to{opacity:1;transform:scale(1) translateY(0)}}

.mascot-wrap{position:relative;width:140px;height:150px;margin:0 auto 6px;display:flex;align-items:center;justify-content:center;}
.mascot-glow{position:absolute;width:118px;height:118px;border-radius:50%;background:var(--caccent);animation:glowPulse 3s ease-in-out infinite;}
@keyframes glowPulse{0%,100%{transform:scale(1);opacity:.5;}50%{transform:scale(1.1);opacity:.7;}}
.mascot-shadow{position:absolute;bottom:10px;width:62px;height:12px;border-radius:50%;background:rgba(5,38,89,.14);animation:shadowPulse 2.6s ease-in-out infinite;}
@keyframes shadowPulse{0%,100%{transform:scaleX(1);opacity:.45;}50%{transform:scaleX(.82);opacity:.25;}}
.mascot-bot{position:relative;z-index:2;animation:botBob 2.8s ease-in-out infinite;transform-origin:bottom center;}
@keyframes botBob{0%,100%{transform:translateY(0) rotate(-3deg);}50%{transform:translateY(-6px) rotate(3deg);}}
.mascot-bot svg{width:108px;height:128px;display:block;}

.eye{animation:blink 4.4s ease-in-out infinite;transform-origin:center;}
.eye.right{animation-delay:.15s;}
@keyframes blink{0%,90%,100%{transform:scaleY(1);}93%,96%{transform:scaleY(.1);}}

.mouth-happy{opacity:0;transition:opacity .3s;}
.mascot-bot.online .mouth-sad{opacity:0;}
.mascot-bot.online .mouth-happy{opacity:1;}

.ant-tip{fill:var(--c4);animation:tipPulse 1.5s ease-in-out infinite;transition:fill .3s;}
.mascot-bot.online .ant-tip{fill:#28a745;animation:none;}
@keyframes tipPulse{0%,100%{opacity:.55;}50%{opacity:1;}}
.ant-halo{fill:var(--c4);opacity:0;transition:opacity .3s;}
.mascot-bot.online .ant-halo{opacity:.3;}

.sig{stroke:var(--c4);fill:none;stroke-width:2.5;stroke-linecap:round;transition:opacity .3s;}
.sig1{animation:sigFade 1.8s ease-in-out infinite 0s;}
.sig2{animation:sigFade 1.8s ease-in-out infinite .25s;}
.sig3{animation:sigFade 1.8s ease-in-out infinite .5s;}
@keyframes sigFade{0%,100%{opacity:.15;}50%{opacity:.85;}}
.mascot-bot.online .sig{opacity:0;animation:none;}

h1{font-size:20px;font-weight:800;color:var(--c2);letter-spacing:-.4px;margin-bottom:10px;}

.status-line{display:flex;align-items:center;justify-content:center;gap:7px;min-height:36px;margin-bottom:20px;padding:0 6px;}
.status-dot{width:6px;height:6px;border-radius:50%;background:#ff4d4d;flex-shrink:0;animation:dotPulse 1.4s ease-in-out infinite;}
.status-dot.amber{background:#ffaa00;}
.status-dot.green{background:#28a745;animation:none;}
@keyframes dotPulse{0%,100%{transform:scale(1);opacity:1;}50%{transform:scale(1.6);opacity:.5;}}
.status-text{font-size:12.5px;font-weight:600;color:var(--c3);transition:opacity .25s;line-height:1.5;}
.status-text.amber{color:#b8860b;}
.status-text.green{color:#1f8a3c;}

.btn-retry{position:relative;width:100%;background:var(--c2);color:var(--caccent);border:none;padding:14px;border-radius:14px;font-size:13px;font-weight:800;cursor:pointer;letter-spacing:.4px;text-transform:uppercase;overflow:hidden;margin-bottom:16px;transition:transform .1s;}
.btn-retry:active{transform:scale(.97);}
.btn-retry .fill{position:absolute;left:0;top:0;bottom:0;width:0%;background:rgba(255,255,255,.16);transition:width 1s linear;}
.btn-retry .label{position:relative;z-index:2;}
.btn-retry.shake{animation:shake .4s ease;}
@keyframes shake{0%,100%{transform:translateX(0);}25%{transform:translateX(-5px);}75%{transform:translateX(5px);}}

.sched-link{display:flex;align-items:center;justify-content:center;gap:6px;font-size:11.5px;font-weight:700;color:var(--c3);cursor:pointer;padding:4px 0 2px;user-select:none;}
.sched-link .chev{font-size:9px;transition:transform .25s;display:inline-block;}
.sched-link.open .chev{transform:rotate(180deg);}
.sched-list{max-height:0;overflow:hidden;transition:max-height .3s ease;text-align:left;}
.sched-list-inner{padding-top:10px;}
.sched-row{padding:8px 2px;border-bottom:1px solid var(--c5);}
.sched-row:last-child{border-bottom:none;}
.sched-mapel{color:var(--c2);font-weight:700;font-size:11.5px;margin-bottom:3px;}
.sched-meta{display:flex;align-items:center;gap:5px;color:var(--c3);font-weight:600;font-size:10.5px;}
.sched-meta .sep{opacity:.5;}
.sched-meta .ruang{display:flex;align-items:center;gap:3px;}
.sched-head{font-size:10px;font-weight:800;color:var(--c3);text-transform:uppercase;letter-spacing:.5px;margin-bottom:6px;text-align:center;}
.sched-empty{font-size:11px;color:var(--c3);font-weight:600;text-align:center;padding:8px 4px;}

.footer-note{font-size:9.5px;color:var(--c4);margin-top:16px;font-weight:500;}

.confetti-piece{position:fixed;width:7px;height:7px;border-radius:2px;z-index:999;pointer-events:none;animation:flyOut .8s ease-out forwards;}
@keyframes flyOut{0%{transform:translate(0,0) scale(1);opacity:1;}100%{transform:translate(var(--x),var(--y)) scale(.5);opacity:0;}}
.sparkle{position:fixed;border-radius:50%;z-index:998;pointer-events:none;animation:sparkleFly .9s ease-out forwards;opacity:0;}
@keyframes sparkleFly{0%{transform:scale(0) translate(0,0);opacity:1;}100%{transform:scale(1) translate(var(--sx),var(--sy));opacity:0;}}

[data-theme="dark"] .mascot-body-shape{fill:var(--c2);}

</style>
<script>
(function () {
  var saved = localStorage.getItem('skuyTheme');
  var theme = saved || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
})();
function toggleTheme() {
  var current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  var next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('skuyTheme', next);
}
</script>
</head>
<body>
<button class="theme-toggle-btn" onclick="toggleTheme()" aria-label="Ganti tema terang/gelap">
  <svg class="icon-sun" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"></path></svg>
  <svg class="icon-moon" viewBox="0 0 24 24"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"></path></svg>
</button>

<div class="card">
  <div class="mascot-wrap">
    <div class="mascot-glow"></div>
    <div class="mascot-shadow"></div>
    <div class="mascot-bot" id="mascotBot">
      <svg viewBox="0 -14 120 154" xmlns="http://www.w3.org/2000/svg">
        <path class="sig sig3" d="M43,-3 Q60,-17 77,-3"/>
        <path class="sig sig2" d="M48,2 Q60,-9 72,2"/>
        <path class="sig sig1" d="M53,7 Q60,-1 67,7"/>
        <circle class="ant-halo" cx="60" cy="22" r="12"/>
        <line x1="60" y1="44" x2="60" y2="26" stroke="#5483b3" stroke-width="4" stroke-linecap="round"/>
        <circle class="ant-tip" cx="60" cy="22" r="6"/>
        <rect class="mascot-body-shape" x="20" y="40" width="80" height="80" rx="28" fill="#052659"/>
        <rect class="mascot-face-shape" x="32" y="56" width="56" height="46" rx="18" fill="#c1e8ff"/>
        <circle class="eye left" cx="48" cy="78" r="5" fill="#021024"/>
        <circle class="eye right" cx="72" cy="78" r="5" fill="#021024"/>
        <path class="mouth-sad" d="M50,95 Q60,89 70,95" stroke="#021024" stroke-width="3" fill="none" stroke-linecap="round"/>
        <path class="mouth-happy" d="M50,90 Q60,99 70,90" stroke="#021024" stroke-width="3" fill="none" stroke-linecap="round"/>
      </svg>
    </div>
  </div>

  <h1>Kamu Lagi Offline</h1>

  <div class="status-line">
    <span class="status-dot" id="statusDot"></span>
    <span class="status-text" id="statusText">Koneksi internet kamu lagi putus</span>
  </div>

  <button class="btn-retry" id="retryBtn">
    <span class="fill" id="retryFill"></span>
    <span class="label" id="retryLabel">Coba Lagi</span>
  </button>

  <div class="sched-link" id="schedToggle">
    <span>Lihat jadwal tersimpan hari ini</span>
    <span class="chev">&#9662;</span>
  </div>
  <div class="sched-list" id="schedList">
    <div class="sched-list-inner" id="schedInner"></div>
  </div>

  <div class="footer-note">&copy; ${new Date().getFullYear()} SkuyJadwal &middot; SMK Negeri 2 Sragen</div>
</div>

<script>
var messages = [
  'Koneksi internet kamu lagi putus',
  'Coba aktifkan WiFi atau data seluler',
  'Sedang mencari sinyal di sekitar...',
  'Pindah ke tempat dengan sinyal lebih kuat',
  'Mencoba menyambung ulang...',
  'Matikan & nyalakan koneksi sebentar',
  'Menunggu jaringan kembali...'
];
var msgIndex = 0;
var msgTimer = null;
var resolved = false;

function setStatusColor(cls) {
  document.getElementById('statusDot').className = 'status-dot' + (cls ? ' ' + cls : '');
  document.getElementById('statusText').className = 'status-text' + (cls ? ' ' + cls : '');
}

function showMessage(text) {
  var el = document.getElementById('statusText');
  el.style.opacity = 0;
  setTimeout(function () {
    el.innerText = text;
    el.style.opacity = 1;
  }, 200);
}

function nextMessage() {
  msgIndex = (msgIndex + 1) % messages.length;
  showMessage(messages[msgIndex]);
}

function restartMessageLoop() {
  if (msgTimer) clearInterval(msgTimer);
  msgTimer = setInterval(nextMessage, 3000);
}
restartMessageLoop();

var RETRY_SECONDS = 5;
var retrySecLeft = RETRY_SECONDS;

function updateFill() {
  var pct = ((RETRY_SECONDS - retrySecLeft) / RETRY_SECONDS) * 100;
  document.getElementById('retryFill').style.width = pct + '%';
}

function goOnline() {
  if (resolved) return;
  resolved = true;
  clearInterval(msgTimer);
  clearInterval(retryInterval);
  setStatusColor('green');
  showMessage('Sinyal balik! Membuka jadwal kamu...');
  document.getElementById('mascotBot').classList.add('online');
  document.getElementById('retryLabel').innerText = 'Membuka...';
  document.getElementById('retryFill').style.transition = 'width .3s';
  document.getElementById('retryFill').style.width = '100%';
  burstConfetti();
  spawnSparkles();
  setTimeout(function () { window.location.href = './'; }, 800);
}

function checkConnection(manual) {
  if (resolved) return;
  if (navigator.onLine) {
    goOnline();
    return;
  }
  if (manual) {
    var btn = document.getElementById('retryBtn');
    btn.classList.remove('shake');
    void btn.offsetWidth;
    btn.classList.add('shake');
    clearInterval(msgTimer);
    setStatusColor('amber');
    showMessage('Masih belum konek, coba lagi sebentar');
    setTimeout(function () {
      if (!resolved) {
        setStatusColor('');
        restartMessageLoop();
      }
    }, 1800);
  }
  retrySecLeft = RETRY_SECONDS;
  updateFill();
}

var retryInterval = setInterval(function () {
  if (resolved) return;
  retrySecLeft--;
  updateFill();
  if (retrySecLeft <= 0) {
    checkConnection(false);
  }
}, 1000);

document.getElementById('retryBtn').addEventListener('click', function () {
  checkConnection(true);
});

window.addEventListener('online', goOnline);

function burstConfetti() {
  var colors = ['#28a745', '#20c050', '#5483b3', '#ffd700', '#052659', '#7da0ca'];
  var cx = window.innerWidth / 2;
  var cy = window.innerHeight / 2 - 60;
  for (var i = 0; i < 26; i++) {
    var el = document.createElement('div');
    el.className = 'confetti-piece';
    el.style.background = colors[i % colors.length];
    var angle = Math.random() * Math.PI * 2;
    var velocity = 50 + Math.random() * 80;
    el.style.setProperty('--x', (Math.cos(angle) * velocity) + 'px');
    el.style.setProperty('--y', (Math.sin(angle) * velocity) + 'px');
    el.style.left = cx + 'px';
    el.style.top = cy + 'px';
    document.body.appendChild(el);
    setTimeout(function (node) { return function () { node.remove(); }; }(el), 800);
  }
}

function spawnSparkles() {
  var colors = ['#28a745', '#20c050', '#5483b3', '#ffd700', '#052659', '#7da0ca', '#ffffff'];
  var rect = document.querySelector('.card').getBoundingClientRect();
  for (var i = 0; i < 16; i++) {
    var el = document.createElement('div');
    el.className = 'sparkle';
    var size = 4 + Math.random() * 6;
    var angle = Math.random() * Math.PI * 2;
    var dist = 40 + Math.random() * 60;
    el.style.width = size + 'px';
    el.style.height = size + 'px';
    el.style.background = colors[i % colors.length];
    el.style.left = (rect.left + rect.width / 2) + 'px';
    el.style.top = (rect.top + 90) + 'px';
    el.style.setProperty('--sx', (Math.cos(angle) * dist) + 'px');
    el.style.setProperty('--sy', (Math.sin(angle) * dist) + 'px');
    el.style.animationDelay = (Math.random() * 0.25) + 's';
    document.body.appendChild(el);
    setTimeout(function (node) { return function () { node.remove(); }; }(el), 1000);
  }
}

function getWeekNumber(d) {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

function buildSchedulePreview() {
  var days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  var now = new Date();
  var isBesok = now.getHours() >= 18;
  var refDate = new Date(now);
  if (isBesok) refDate.setDate(refDate.getDate() + 1);
  var dayName = days[refDate.getDay()];
  var weekType = (getWeekNumber(refDate) % 2 === 0) ? 'm2' : 'm1';
  var label = isBesok ? 'Jadwal besok' : 'Jadwal hari ini';

  var inner = document.getElementById('schedInner');
  var savedRaw = null;
  var kelas = null;
  try {
    savedRaw = localStorage.getItem('savedJadwal');
    kelas = localStorage.getItem('userKelas');
  } catch (e) {}

  if (dayName === 'Sabtu' || dayName === 'Minggu') {
    inner.innerHTML = '<div class="sched-empty">Libur akhir pekan, santai dulu ya</div>';
    return;
  }
  if (!savedRaw) {
    inner.innerHTML = '<div class="sched-empty">Belum ada jadwal tersimpan di perangkat ini.</div>';
    return;
  }
  var jadwalData;
  try { jadwalData = JSON.parse(savedRaw); } catch (e) { jadwalData = {}; }
  var list = (jadwalData[weekType] && jadwalData[weekType][dayName]) || [];
  if (list.length === 0) {
    inner.innerHTML = '<div class="sched-empty">Tidak ada data jadwal tersimpan untuk hari ini.</div>';
    return;
  }
  var html = '<div class="sched-head">' + label + (kelas ? ' &middot; ' + kelas : '') + '</div>';
  for (var i = 0; i < list.length; i++) {
    var jamRaw = list[i][1] || '';
    // Normalisasi: ganti titik → titik dua, buang spasi
    var jamNorm = jamRaw.replace(/\./g, ':').replace(/\s/g, '');
    var parts = jamNorm.split('-');
    // Tambah spasi di sekitar titik dua supaya jadi "07 : 45"
    var fmtTime = function(t) { return t.replace(':', ' : '); };
    var jamCantik = parts.length === 2
      ? fmtTime(parts[0]) + ' &mdash; ' + fmtTime(parts[1])
      : jamRaw;
    html += '<div class="sched-row">'
      + '<div class="sched-mapel">' + list[i][0] + '</div>'
      + '<div class="sched-meta">'
      + '<span>' + jamCantik + '</span>'
      + '<span class="sep">&middot;</span>'
      + '<span class="ruang">&#128205; ' + list[i][2] + '</span>'
      + '</div></div>';
  }
  inner.innerHTML = html;
}

var schedOpen = false;
document.getElementById('schedToggle').addEventListener('click', function () {
  schedOpen = !schedOpen;
  this.classList.toggle('open', schedOpen);
  var panel = document.getElementById('schedList');
  if (schedOpen) {
    buildSchedulePreview();
    panel.style.maxHeight = panel.scrollHeight + 'px';
  } else {
    panel.style.maxHeight = '0px';
  }
});
<\/script>
</body>
</html>`;

// ─── Install ──────────────────────────────────────────────────────────────────
self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        (async () => {
            try {
                const fontCache = await caches.open(FONT_CACHE);
                const cssResponse = await fetch(POPPINS_CSS_URL, {
                    headers: { 'User-Agent': 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 Chrome/120 Mobile Safari/537.36' }
                });
                if (cssResponse.ok) {
                    await fontCache.put(POPPINS_CSS_URL, cssResponse.clone());
                    const cssText = await cssResponse.text();
                    const fontUrls = [...cssText.matchAll(/url\((https:\/\/fonts\.gstatic\.com[^)]+)\)/g)]
                        .map(m => m[1]);
                    await Promise.allSettled(
                        fontUrls.map(async (url) => {
                            try {
                                const fontRes = await fetch(url);
                                if (fontRes.ok) await fontCache.put(url, fontRes);
                            } catch (_) {}
                        })
                    );
                }
            } catch (err) {
                console.warn('[SW] Gagal cache font Poppins:', err);
            }
        })()
    );
});

// ─── Activate ─────────────────────────────────────────────────────────────────
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys.filter(k => k !== CACHE_NAME && k !== FONT_CACHE)
                    .map(k => caches.delete(k))
            )
        ).then(() => clients.claim())
    );
});

// ─── Fetch ────────────────────────────────────────────────────────────────────
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    if (
        url.hostname === 'fonts.googleapis.com' ||
        url.hostname === 'fonts.gstatic.com'
    ) {
        event.respondWith(
            caches.open(FONT_CACHE).then(async (cache) => {
                const cached = await cache.match(event.request);
                if (cached) return cached;
                try {
                    const response = await fetch(event.request);
                    if (response && response.status === 200) {
                        cache.put(event.request, response.clone());
                    }
                    return response;
                } catch (_) {
                    return new Response('', { status: 404 });
                }
            })
        );
        return;
    }

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

// ─── Background Notification ──────────────────────────────────────────────────
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
