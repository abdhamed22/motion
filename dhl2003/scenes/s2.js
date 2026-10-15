MOTION.scene({
  id: 's2',
  draw(t, lt, ctx) {
    const { X, P, W, H, at, wordTime } = ctx, I = window.ILS, wt = i => wordTime('l2', i);
    I.sky(ctx, t, { hz: 0.9, stars: false, top: '#070B14', mid: '#0C1424', bot: '#0C1424' }); I.grid(ctx);
    const aOut = at(t, wt(6).s - 0.25, wt(6).s + 0.2, 'cubicInOut');
    if (aOut < 1) {
      X.save(); X.globalAlpha = 1 - aOut; const k = at(lt, 0, 0.5, 'expoOut'); X.translate(0, (1 - k) * 40);
      I.planeSide(X, 540, 560, 2.3, 0, '#EEF2F8', 1, P.acc);
      const cr = at(t, wt(1).s - 0.05, wt(1).s + 0.4, 'expoOut'); for (let i = 0; i < 3; i++) { X.globalAlpha = (1 - aOut) * cr; I.crate(X, 360 + i * 180, 830 - (1 - cr) * 40, 1.1, i === 1 ? P.acc : P.hi); } X.globalAlpha = 1 - aOut;
      const ck = at(t, wt(5).s - 0.05, wt(5).s + 0.4, 'expoOut'); if (ck > 0) { I.card(X, 250, 960, 580, 170, { fill: '#102038', stroke: P.acc, lw: 5, r: 36 }); ctx.text(X, 'A300', 540, 1085, { family: 'num', weight: 900, size: 120 * (0.95 + 0.05 * ck), color: P.acc, dir: 'ltr', alpha: ck }); }
      X.restore();
    }
    const bIn = at(t, wt(6).s - 0.1, wt(6).s + 0.5, 'expoOut');
    if (bIn > 0) {
      X.save(); X.globalAlpha = bIn; const A = [380, 520], B = [700, 1060], C1 = [180, 860];
      const pt = u => [(1 - u) * (1 - u) * A[0] + 2 * (1 - u) * u * C1[0] + u * u * B[0], (1 - u) * (1 - u) * A[1] + 2 * (1 - u) * u * C1[1] + u * u * B[1]];
      const pr = at(t, wt(10).s, wt(13).e + 0.2, 'sineInOut');
      X.strokeStyle = P.hi; X.lineWidth = 6; X.setLineDash([22, 18]); X.lineDashOffset = -lt * 50; X.beginPath(); X.moveTo(A[0], A[1]); X.quadraticCurveTo(C1[0], C1[1], B[0], B[1]); X.stroke(); X.setLineDash([]);
      const dot = (p, c) => { X.fillStyle = c; X.beginPath(); X.arc(p[0], p[1], 22, 0, 6.283); X.fill(); X.fillStyle = '#070B14'; X.beginPath(); X.arc(p[0], p[1], 9, 0, 6.283); X.fill(); };
      dot(A, P.acc); dot(B, P.clay);
      X.globalAlpha = bIn * at(t, wt(9).s - 0.05, wt(9).s + 0.3); ctx.text(X, 'بغداد', 560, 500, { family: 'display', size: 96, color: P.ink });
      X.globalAlpha = bIn * at(t, wt(13).s - 0.05, wt(13).s + 0.3); ctx.text(X, 'البحرين', 520, 1160, { family: 'display', size: 96, color: P.ink });
      X.globalAlpha = bIn; const q = pt(pr), q2 = pt(Math.min(1, pr + 0.02)); I.planeTop(X, q[0], q[1], 0.6, Math.atan2(q2[1] - q[1], q2[0] - q[0]) + 1.57, P.ink);
      X.restore();
    }
    I.scrim(ctx, 1230, 1600);
    I.caption(ctx, t, 'l2', 0, 5, { y: 1370, size: 86, hl: [4, 5] });
    I.caption(ctx, t, 'l2', 6, 13, { y: 1370, size: 84, hl: [9, 13], hold: 0.8 });
  }
});
