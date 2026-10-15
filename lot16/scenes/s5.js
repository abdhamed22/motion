MOTION.scene({
  id: 's5',
  draw(t, lt, ctx) {
    const { X, P, W, H, at, wordTime, noise1 } = ctx, I = window.ILS, wt = i => wordTime('l5', i), r = ctx.rng('sp');
    I.sky(ctx, t, { hz: 0.8, stars: true, top: '#04070F', mid: '#142038', bot: '#0A0F1A' });
    const gy = 1000, e1 = at(t, wt(8).s - 0.5, wt(8).s - 0.1, 'cubicInOut');
    X.fillStyle = '#0B1220'; X.fillRect(0, gy, W, 300); X.fillStyle = '#16213A'; X.fillRect(0, gy, W, 26); X.fillStyle = '#E8EEF7'; X.fillRect(0, gy - 4, W, 8);
    /* أ: القرار: عجلة مشطوبة */
    if (e1 < 1) {
      X.save(); X.globalAlpha = 1 - e1; const k = at(t, wt(2).s, wt(2).s + 0.5, 'expoOut'); X.translate(540, 560); X.scale(0.92 + 0.08 * k, 0.92 + 0.08 * k); X.globalAlpha *= k;
      X.fillStyle = '#0E1B2D'; X.strokeStyle = P.ink; X.lineWidth = 22; X.beginPath(); X.arc(0, 0, 170, 0, 6.283); X.fill(); X.stroke(); X.fillStyle = '#9AA9BD'; X.beginPath(); X.arc(0, 0, 70, 0, 6.283); X.fill();
      I.cross(X, 0, 0, 230, at(t, wt(6).s - 0.1, wt(6).s + 0.5), P.clay, 28); X.restore();
      I.planeSide(X, 540, 860, 1.0, 0.1, '#EEF2F8', 0.9, P.acc);
    }
    /* ب: الانزلاق على البطن حتى التوقف */
    if (e1 > 0) {
      X.save(); X.globalAlpha = e1; const tl = wt(8).s, ts = wt(13).s + 0.2, k = at(t, tl - 0.8, tl + 0.4, 'quadIn');
      const slide = at(t, tl + 0.4, ts, 'quadOut'), px = (t < tl + 0.4 ? 90 + 350 * k : 440 + 360 * slide), py = (t < tl + 0.4 ? 360 + (gy - 62 - 360) * k : gy - 62), ang = (t < tl + 0.4 ? 0.2 * (1 - k) : 0);
      I.planeSide(X, px, py, 1.5, ang, '#EEF2F8', 1, P.acc);
      if (t > tl + 0.4 && t < ts + 0.3) { const sp = 1 - slide; for (let i = 0; i < 18; i++) { const a = r() * 0.9, v = 120 + r() * 260, e = (t - tl) % 0.7; X.globalAlpha = e1 * Math.max(0, sp) * (1 - e / 0.7); X.fillStyle = i % 2 ? P.acc : P.hi; X.fillRect(px - 80 - Math.cos(a) * v * e, gy - 8 - Math.sin(a) * v * e * 0.6, 7, 4); }
        X.globalAlpha = e1 * 0.35 * Math.max(0.2, sp); X.fillStyle = '#8C98AB'; for (let i = 0; i < 7; i++) { const ph = ((t * 0.9 + i / 7) % 1); X.beginPath(); X.arc(px - 100 - ph * 200, gy - 18 - ph * 50, 20 + ph * 36, 0, 6.283); X.fill(); } }
      const ck = at(t, wt(13).s + 0.3, wt(13).s + 0.8); if (ck > 0) { X.globalAlpha = e1; I.check(X, 540, 500, 70, ck, P.acc, 20); }
      X.restore();
    }
    I.vig(ctx, '0,0,0', 0.35); I.scrim(ctx, 1260, 1620);
    I.caption(ctx, t, 'l5', 0, 7, { y: 1400, size: 88, hl: [2, 4, 7] });
    I.caption(ctx, t, 'l5', 8, 13, { y: 1400, size: 92, hl: [8, 11, 13], hold: 0.9 });
  }
});
