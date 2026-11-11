const $ = s => document.querySelector(s);
// menu a schermo intero con X
const b = $('.burger'), o = $('#menu');
function toggle(open) {
  b.setAttribute('aria-expanded', open); b.setAttribute('aria-label', open ? 'Chiudi il menu' : 'Apri il menu');
  document.body.classList.toggle('lock', open);
  if (open) { o.hidden = false; requestAnimationFrame(() => o.classList.add('open')); }
  else { o.classList.remove('open'); setTimeout(() => o.hidden = true, 300); }
}
b.addEventListener('click', () => toggle(b.getAttribute('aria-expanded') !== 'true'));
addEventListener('keydown', e => { if (e.key === 'Escape') toggle(false); });
// header nascosto scorrendo in basso; barra di avanzamento
const h = $('[data-header]'), p = $('.progress'); let y0 = 0;
addEventListener('scroll', () => {
  const y = scrollY; h.classList.toggle('hide', y > y0 && y > 120 && b.getAttribute('aria-expanded') !== 'true'); y0 = y;
  p.style.transform = `scaleX(${y / (document.documentElement.scrollHeight - innerHeight || 1)})`;
}, { passive: true });
// comparsa elementi
const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && (e.target.classList.add('in'), io.unobserve(e.target))), { threshold: .12 });
document.querySelectorAll('[data-reveal]').forEach(e => io.observe(e));
