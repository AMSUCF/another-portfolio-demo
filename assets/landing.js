/* 🦄💃 Landing page — music notes + sparkle trail to match the disco 💃🦄 */

/* ---------- floating music notes ---------- */
(function noteParty() {
  const wrap = document.getElementById('notes');
  if (!wrap) return;
  const notes = ['🎵', '🎶', '🎼', '✨', '🌟', '💖', '🪩', '🦄'];
  const COUNT = 22;
  for (let i = 0; i < COUNT; i++) {
    const n = document.createElement('span');
    n.textContent = notes[i % notes.length];
    n.style.left = (i / COUNT) * 100 + '%';
    n.style.animationDuration = 6 + (i % 6) * 1.5 + 's';
    n.style.animationDelay = '-' + (i % 8) + 's';
    n.style.fontSize = 1.4 + (i % 4) * 0.5 + 'rem';
    wrap.appendChild(n);
  }
})();

/* ---------- sparkle cursor trail ---------- */
(function sparkleTrail() {
  const sparks = ['✨', '⭐', '💖', '🌟', '🦄', '🌈', '🎶'];
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
