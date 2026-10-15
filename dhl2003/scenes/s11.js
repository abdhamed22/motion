MOTION.scene({
  id: 's11',
  draw(t, lt, ctx) {
    const { X, P, W, H, at, wordTime } = ctx, I = window.ILS, w12 = i => wordTime('l12', i), w13 = i => wordTime('l13', i);
    I.sky(ctx, t, { hz: 0.9, stars: false, top: '#070B14', mid: '#0C1424', bot: '#0C1424' });
    const q = at(t, w12(0).s - 0.02, w12(0).s + 0.45, 'expoOut'), qOut = at(t, w13(0).s - 0.15, w13(0).s + 0.2);
    if (q > 0 && qOut < 1) ctx.text(X, 'والنتيجة؟', 540, 760, { family: 'display', size: 230 * (0.95 + 0.05 * q), color: P.acc, alpha: q * (1 - qOut) });
    const sk = at(t, w13(3).s - 0.1, w13(3).s + 0.4, 'expoOut'); if (sk > 0) ctx.text(X, '3', 540, 700, { family: 'num', weight: 900, size: 560 * (0.96 + 0.04 * sk), color: P.acc, alpha: sk * 0.18, dir: 'ltr' });
    const ps = [210, 540, 870];
    ps.forEach((x, i) => { const k = at(t, w13(3).s + i * 0.2, w13(3).s + 0.4 + i * 0.2, 'expoOut'); if (k > 0) { X.save(); X.globalAlpha = k; X.translate(x, 780 + (1 - k) * 30); I.person(X, 0, 0, 2.0, P.acc); X.restore(); const c = at(t, w13(4).s + i * 0.12, w13(4).s + 0.4 + i * 0.12); if (c > 0) { X.beginPath(); X.arc(x, 1000, 42, 0, 6.283); X.fillStyle = P.ink; X.fill(); I.check(X, x, 1002, 20, c, '#070B14', 11); } } });
    I.scrim(ctx, 1230, 1600);
    I.caption(ctx, t, 'l13', 0, 4, { y: 1370, size: 94, hl: [3, 4], hold: 0.8 });
  }
});
