/* 🌈✨ Lisa Frank Portfolio — too much animation, as ordered ✨🌈 */

/* ---------- floating background emoji ---------- */
(function emojiSky() {
  const sky = document.getElementById('emoji-sky');
  if (!sky) return;
  const set = ['🦄', '🌈', '⭐', '💖', '🐬', '🌟', '✨', '🦋', '🌸', '🍭', '💜', '💙'];
  const COUNT = 26;
  for (let i = 0; i < COUNT; i++) {
    const e = document.createElement('div');
    e.className = 'float-emoji';
    e.textContent = set[Math.floor((i / COUNT) * set.length) % set.length];
    e.style.left = (i / COUNT) * 100 + '%';
    const dur = 9 + (i % 7) * 2;
    e.style.animationDuration = dur + 's';
    e.style.animationDelay = '-' + (i % 9) + 's';
    e.style.fontSize = 1.6 + (i % 4) * 0.6 + 'rem';
    sky.appendChild(e);
  }
})();

/* ---------- sparkle cursor trail ---------- */
(function sparkleTrail() {
  const sparks = ['✨', '⭐', '💖', '🌟', '🦄', '🌈'];
  let last = 0;
  window.addEventListener('pointermove', (ev) => {
    const now = Date.now();
    if (now - last < 45) return;
    last = now;
    const s = document.createElement('div');
    s.className = 'spark';
    s.textContent = sparks[Math.floor((now / 45) % sparks.length)];
    s.style.left = ev.clientX + 'px';
    s.style.top = ev.clientY + 'px';
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 900);
  });
})();

/* ---------- click confetti burst ---------- */
(function confettiOnClick() {
  const pieces = ['🌈', '🦄', '✨', '💖', '⭐', '🐬', '🦋', '🍭'];
  window.addEventListener('click', (ev) => {
    for (let i = 0; i < 12; i++) {
      const c = document.createElement('div');
      c.className = 'spark';
      c.textContent = pieces[Math.floor(Math.random() * pieces.length)];
      c.style.left = ev.clientX + 'px';
      c.style.top = ev.clientY + 'px';
      const ang = (Math.PI * 2 * i) / 12;
      const dist = 40 + Math.random() * 60;
      c.style.setProperty('--dx', Math.cos(ang) * dist + 'px');
      c.animate([
        { transform: 'translate(0,0) scale(0.3)', opacity: 1 },
        { transform: `translate(${Math.cos(ang) * dist}px, ${Math.sin(ang) * dist}px) scale(1.4)`, opacity: 0 }
      ], { duration: 800, easing: 'cubic-bezier(.2,.8,.2,1)' });
      document.body.appendChild(c);
      setTimeout(() => c.remove(), 800);
    }
  });
})();

/* ---------- scroll reveal ---------- */
(function scrollReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((el) => obs.observe(el));
})();

/* ---------- animated number counters ---------- */
(function counters() {
  const animate = (el) => {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    let cur = 0;
    const step = Math.max(1, Math.ceil(target / 40));
    const tick = () => {
      cur += step;
      if (cur >= target) { cur = target; }
      el.textContent = cur + suffix;
      if (cur < target) requestAnimationFrame(tick);
    };
    tick();
  };
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { animate(e.target); obs.unobserve(e.target); }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.num[data-count]').forEach((el) => obs.observe(el));
})();

/* ---------- back to top ---------- */
(function backToTop() {
  const btn = document.getElementById('toTop');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 600);
  });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();
