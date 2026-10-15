MOTION.scene({
  id: 's6',
  draw(t, lt, ctx) {
    const { X, P, W, H, at, wordTime } = ctx, I = window.ILS, wt = i => wordTime('l6', i);
    I.sky(ctx, t, { hz: 0.9, stars: false, top: '#04070F', mid: '#0C1A2E', bot: '#0C1A2E' });
    const cols = 21, rows = 11, gx = 540 - (cols - 1) * 21, gy = 560;
    X.save(); for (let i = 0; i < cols * rows; i++) { const c = i % cols, r = Math.floor(i / cols), on = at(t, wt(1).s + (i / 231) * 2.2, wt(1).s + 0.4 + (i / 231) * 2.2, 'expoOut'); if (on <= 0) continue; X.globalAlpha = on; X.fillStyle = P.acc; X.beginPath(); X.arc(gx + c * 42, gy + r * 42, 12 * (0.6 + 0.4 * on) + 1.2 * Math.sin(t * 2 + i * 0.4), 0, 6.283); X.fill(); } X.restore();
    const nk = at(t, wt(3).s - 0.05, wt(3).s + 0.5, 'expoOut'); if (nk > 0) ctx.text(X, '231', 540, 410, { family: 'num', weight: 900, size: 200 * (0.95 + 0.05 * nk), color: P.ink, alpha: nk, dir: 'ltr' });
    const ck = at(t, wt(5).s - 0.1, wt(5).s + 0.5, 'expoOut'); if (ck > 0) { X.save(); X.globalAlpha = ck; X.beginPath(); X.arc(540, 1130, 56, 0, 6.283); X.fillStyle = P.acc; X.fill(); I.check(X, 540, 1134, 28, at(t, wt(5).s + 0.1, wt(5).s + 0.6), '#0A1424', 14); X.restore(); }
    I.vig(ctx, '0,0,0', 0.3); I.scrim(ctx, 1260, 1620);
    I.caption(ctx, t, 'l6', 0, 3, { y: 1400, size: 92, hl: [1, 3] });
    I.caption(ctx, t, 'l6', 4, 5, { y: 1400, size: 100, hl: [5], hold: 0.9 });
  }
});
