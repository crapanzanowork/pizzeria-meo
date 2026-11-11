// Scena 3D: 4 prodotti che fluttuano e girano lentamente; lo scroll verticale li fa scorrere in orizzontale.
import * as THREE from './three.module.min.js';

const stage = document.querySelector('[data-stage]');
const section = document.querySelector('[data-pin]');

function tex(w, h, draw, repeat) {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  draw(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4;
  if (repeat) { t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(repeat, repeat); }
  return t;
}
const rnd = (a, b) => a + Math.random() * (b - a);
function speckle(g, w, h, n, colors, rmin, rmax) {
  for (let i = 0; i < n; i++) { g.fillStyle = colors[i % colors.length]; g.beginPath(); g.arc(rnd(0, w), rnd(0, h), rnd(rmin, rmax), 0, 7); g.fill(); }
}

function makePizza() {
  const top = tex(1024, 700, (g, w, h) => {
    g.fillStyle = '#c98a3c'; g.fillRect(0, 0, w, h);               // cornicione
    g.fillStyle = '#b32d17'; g.fillRect(46, 46, w - 92, h - 92);    // pomodoro
    for (let i = 0; i < 70; i++) { g.fillStyle = `rgba(245,232,200,${rnd(.7, .95)})`; g.beginPath(); g.ellipse(rnd(80, w - 80), rnd(80, h - 80), rnd(30, 70), rnd(22, 48), rnd(0, 3), 0, 7); g.fill(); }
    speckle(g, w, h, 160, ['#7d1a0c', '#3d6b2a', '#e9b44c'], 3, 8);
    speckle(g, w, h, 120, ['#d9a04d', '#a8652a'], 3, 9);
  });
  const side = new THREE.MeshStandardMaterial({ color: 0xc58a3d, roughness: .8 });
  const topM = new THREE.MeshStandardMaterial({ map: top, roughness: .55 });
  const slab = new THREE.Mesh(new THREE.BoxGeometry(3.2, .32, 2.2), [side, side, topM, side, side, side]);
  const tray = new THREE.Mesh(new THREE.BoxGeometry(3.5, .08, 2.5), new THREE.MeshStandardMaterial({ color: 0x8a8d90, metalness: .8, roughness: .35 }));
  tray.position.y = -.2;
  const g = new THREE.Group(); g.add(slab, tray); g.rotation.x = .55; return g;
}

function makeBread() {
  const col = tex(1024, 512, (g, w, h) => {
    const gr = g.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, '#d9a24a'); gr.addColorStop(.5, '#bf7d2c'); gr.addColorStop(1, '#8c531a');
    g.fillStyle = gr; g.fillRect(0, 0, w, h);
    speckle(g, w, h, 900, ['rgba(255,245,225,.35)', 'rgba(110,60,20,.25)'], 1, 4);
    g.strokeStyle = '#f0d9a8'; g.lineWidth = 16; g.lineCap = 'round';
    for (let i = 0; i < 9; i++) { const x = 60 + i * 110; g.beginPath(); g.moveTo(x, h * .18); g.lineTo(x + 50, h * .4); g.stroke(); }
  });
  const m = new THREE.Mesh(new THREE.SphereGeometry(1, 64, 48), new THREE.MeshStandardMaterial({ map: col, bumpMap: col, bumpScale: 2.5, roughness: .75 }));
  m.scale.set(1.7, .85, .95); const g = new THREE.Group(); g.add(m); g.rotation.x = .6; return g;
}

function makeCalzone() {
  const s = new THREE.Shape(); s.moveTo(-1.4, 0); s.absarc(0, 0, 1.4, Math.PI, 0, true); s.lineTo(-1.4, 0);
  const geo = new THREE.ExtrudeGeometry(s, { depth: .3, bevelEnabled: true, bevelThickness: .45, bevelSize: .4, bevelSegments: 12, curveSegments: 32 });
  geo.center();
  const col = tex(512, 512, (g, w, h) => {
    g.fillStyle = '#c98a3a'; g.fillRect(0, 0, w, h);
    speckle(g, w, h, 500, ['#a8631f', '#e6b765', '#8c4d17'], 2, 12);
  }, .6);
  const m = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ map: col, bumpMap: col, bumpScale: 3, roughness: .7 }));
  const g = new THREE.Group(); g.add(m); g.rotation.x = .5; return g;
}

function makeCiambella() {
  const col = tex(1024, 256, (g, w, h) => {
    g.fillStyle = '#9a4f20'; g.fillRect(0, 0, w, h);
    speckle(g, w, h, 700, ['#7a3a14', '#b8702f'], 2, 9);
    speckle(g, w, h, 1500, ['rgba(255,255,255,.85)'], 1, 2.5); // zucchero
  });
  const m = new THREE.Mesh(new THREE.TorusGeometry(1, .46, 40, 96), new THREE.MeshStandardMaterial({ map: col, bumpMap: col, bumpScale: 2, roughness: .65 }));
  const g = new THREE.Group(); g.add(m); g.rotation.x = 1.0; g.scale.setScalar(1.05); return g;
}

function init() {
  const canvas = stage.querySelector('canvas');
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true }); }
  catch (e) { section.classList.add('no-3d'); return; }
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const scene = new THREE.Scene();
  const cam = new THREE.PerspectiveCamera(35, 1, .1, 100); cam.position.set(0, 0, 11);
  scene.add(new THREE.HemisphereLight(0xfff1dc, 0x3a1a08, 1.4));
  const key = new THREE.DirectionalLight(0xffffff, 2.6); key.position.set(-4, 6, 6); scene.add(key);
  const rim = new THREE.PointLight(0xffb070, 60, 30); rim.position.set(5, -2, 4); scene.add(rim);

  const items = [makePizza(), makeBread(), makeCalzone(), makeCiambella()];
  const holders = items.map(it => { const h = new THREE.Group(); h.add(it); scene.add(h); return h; });
  const track = stage.querySelector('[data-track]');
  const cards = [...track.children];
  const N = items.length;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let W, H, spacing, progress = 0, target = 0;

  function resize() {
    W = stage.clientWidth; H = stage.clientHeight;
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2)); renderer.setSize(W, H, false);
    cam.aspect = W / H; cam.updateProjectionMatrix();
    const panel = W < 700 ? W * .8 : Math.min(W * .42, 560);
    track.style.setProperty('--panel', panel + 'px');
    const pxPerUnit = H / (2 * Math.tan(cam.fov * Math.PI / 360) * cam.position.z);
    spacing = panel / pxPerUnit;
    const sc = Math.min(1, spacing * .78 / 3.4, (H * .5 / pxPerUnit) / 2.4);
    holders.forEach((h, i) => { h.position.set(i * spacing, H > W ? .9 : .7, 0); h.scale.setScalar(sc); });
  }
  function scrollProgress() {
    const r = section.getBoundingClientRect();
    target = Math.min(1, Math.max(0, -r.top / (r.height - innerHeight)));
  }
  addEventListener('resize', resize); addEventListener('scroll', scrollProgress, { passive: true });
  resize(); scrollProgress(); progress = target;

  const dots = [...stage.querySelectorAll('[data-dot]')];
  let visible = true;
  new IntersectionObserver(e => visible = e[0].isIntersecting).observe(section);
  let last = performance.now();
  (function frame(now) {
    requestAnimationFrame(frame);
    if (!visible) return;
    const dt = Math.min(.05, (now - last) / 1000); last = now;
    progress += (target - progress) * Math.min(1, dt * 6);
    const pos = progress * (N - 1);
    cam.position.x = pos * spacing;
    const panel = parseFloat(track.style.getPropertyValue('--panel')) || 400;
    track.style.transform = `translate3d(${W / 2 - panel / 2 - pos * panel}px,0,0)`;
    const t = now / 1000;
    holders.forEach((h, i) => {
      const d = Math.min(1, Math.abs(i - pos));
      h.children[0].rotation.y = reduce ? 0 : t * .22 + i * 1.3;       // rotazione molto lenta
      h.position.y = (H > W ? .9 : .7) + (reduce ? 0 : Math.sin(t * .9 + i * 1.7) * .14); // fluttuazione
      cards[i].style.opacity = 1 - d * .65;
    });
    dots.forEach((d, i) => d.classList.toggle('on', Math.round(pos) === i));
    renderer.render(scene, cam);
  })(last);
}
if (stage && section) init();
