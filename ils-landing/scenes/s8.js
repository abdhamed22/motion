MOTION.scene({
  id: 's8',
  draw(t, lt, ctx) {
    const { X, P, W, H, at, wordTime } = ctx, I = window.ILS, wt = i => wordTime('l9', i);
    I.sky(ctx, t, { hz: 0.9, stars: false, top: '#08111F', mid: '#0C1A2E', bot: '#0C1A2E' });
    const k = at(lt, 0, 0.9, 'expoOut');
    /* الدرع */
    X.save(); X.globalAlpha = Math.min(1, k * 2);
    X.fillStyle = 'rgba(39,195,216,0.10)'; X.beginPath(); X.moveTo(540, 300); X.lineTo(770, 380); X.lineTo(770, 640); X.quadraticCurveTo(770, 800, 540, 900); X.quadraticCurveTo(310, 800, 310, 640); X.lineTo(310, 380); X.closePath(); X.fill(); X.restore();
    ctx.drawPath(X, 'M540 300 L770 380 L770 640 Q770 800 540 900 Q310 800 310 640 L310 380 Z', k, { width: 14, color: P.clay, cap: 'round' });
    I.check(X, 540, 610, 130, at(t, wt(3).s - 0.1, wt(3).s + 0.45, 'cubicOut'), P.acc, 26);
    /* بنود شروط: خطوط بتأشيرات تتوالى مع الكلمات */
    const rows = [[wt(0).s + 0.1, 1010], [wt(1).s + 0.15, 1090], [wt(2).s + 0.15, 1170]];
    rows.forEach(([s0, y], i) => {
      const a = at(t, s0, s0 + 0.3, 'expoOut'); X.save(); X.globalAlpha = a; X.translate((1 - a) * 40, 0);
      I.rr(X, 180, y, 560, 22, 11); X.fillStyle = '#27415F'; X.fill(); I.rr(X, 180, y, 560 * (0.55 + 0.1 * i), 22, 11); X.fillStyle = P.hi; X.fill(); X.restore();
      const c = at(t, s0 + 0.2, s0 + 0.55); if (c > 0) { X.beginPath(); X.arc(850, y + 11, 30, 0, 6.283); X.fillStyle = P.acc; X.fill(); I.check(X, 850, y + 12, 15, c, '#0A1424', 8); }
    });
    I.scrim(ctx, 1220, 1580);
    I.caption(ctx, t, 'l9', 0, 3, { y: 1360, size: 104, hl: [1, 2, 3], hold: 0.7 });
  }
});
