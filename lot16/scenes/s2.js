MOTION.scene({
  id: 's2',
  draw(t, lt, ctx) {
    const { X, P, W, H, at, wordTime } = ctx, I = window.ILS, wt = i => wordTime('l2', i);
    I.sky(ctx, t, { hz: 0.9, stars: false, top: '#04070F', mid: '#0A1424', bot: '#0A1424' }); I.grid(ctx, 0.07);
    const a = at(t, wt(2).s - 0.05, wt(2).s + 0.5, 'expoOut'), up = at(t, wt(3).s - 0.3, wt(3).s + 0.5, 'cubicInOut');
    X.save(); X.translate(540, 520 - 270 * up); X.scale(1 - 0.5 * up, 1 - 0.5 * up);
    I.card(X, -380, -250, 760, 420, { fill: '#0E1A2D', stroke: '#27415F', lw: 5, r: 40 });
    ctx.text(X, 'الرحلة', 230, -140, { family: 'body', weight: 800, size: 64, color: P.hi, alpha: at(t, wt(1).s, wt(1).s + 0.3) });
    ctx.text(X, '16', 0, 70, { family: 'num', weight: 900, size: 280 * (0.94 + 0.06 * a), color: P.acc, alpha: a, dir: 'ltr' }); X.restore();
    const ak = at(t, wt(7).s - 0.1, wt(7).s + 0.4, 'expoOut'); if (ak > 0) { X.save(); X.globalAlpha = ak; I.card(X, 340, 420, 400, 100, { fill: '#C8102E', r: 50 }); ctx.text(X, 'LOT', 540, 495, { family: 'num', weight: 900, size: 62, color: '#FFFFFF', dir: 'ltr' }); X.restore(); }
    /* التاريخ */
    const dk = at(t, wt(9).s - 0.1, wt(9).s + 0.5, 'expoOut'), dOut = at(t, wt(17).s - 0.3, wt(17).s + 0.2, 'cubicInOut');
    if (dk > 0 && dOut < 1) { X.save(); X.globalAlpha = dk * (1 - dOut); X.translate(0, (1 - dk) * 30); I.card(X, 250, 590, 580, 300, { fill: '#F4F7FB', r: 36 }); X.fillStyle = P.acc; X.fillRect(250, 590, 580, 70);
      ctx.text(X, 'نوفمبر', 540, 640, { family: 'display', size: 56, color: '#0A1424', alpha: at(t, wt(11).s - 0.05, wt(11).s + 0.3) });
      ctx.text(X, '1', 700, 830, { family: 'num', weight: 900, size: 150, color: '#0A1424', dir: 'ltr' });
      ctx.text(X, '2011', 400, 825, { family: 'num', weight: 800, size: 110, color: '#27415F', alpha: at(t, wt(13).s - 0.05, wt(13).s + 0.3), dir: 'ltr' }); X.restore(); }
    /* المسار نيوارك ← وارسو */
    const mk = at(t, wt(14).s, wt(14).s + 0.5, 'expoOut');
    if (mk > 0) {
      X.save(); X.globalAlpha = mk; const A = [220, 960], B = [840, 700], C1 = [450, 640];
      const pt = u => [(1 - u) ** 2 * A[0] + 2 * (1 - u) * u * C1[0] + u * u * B[0], (1 - u) ** 2 * A[1] + 2 * (1 - u) * u * C1[1] + u * u * B[1]];
      const pr = at(t, wt(17).s, wt(20).e, 'sineInOut');
      X.fillStyle = 'rgba(143,233,245,0.06)'; X.beginPath(); X.roundRect(110, 560, 860, 500, 30); X.fill();
      X.strokeStyle = P.hi; X.lineWidth = 6; X.setLineDash([22, 16]); X.lineDashOffset = -lt * 50; X.beginPath(); X.moveTo(A[0], A[1]); X.quadraticCurveTo(C1[0], C1[1], B[0], B[1]); X.stroke(); X.setLineDash([]);
      const dot = (p, c) => { X.fillStyle = c; X.beginPath(); X.arc(p[0], p[1], 22, 0, 6.283); X.fill(); X.fillStyle = '#0A1424'; X.beginPath(); X.arc(p[0], p[1], 9, 0, 6.283); X.fill(); }; dot(A, P.acc); dot(B, P.clay);
      X.globalAlpha = mk * at(t, wt(17).s - 0.1, wt(17).s + 0.3); ctx.text(X, 'نيوارك', 270, 1040, { family: 'display', size: 74, color: P.ink });
      X.globalAlpha = mk * at(t, wt(20).s - 0.1, wt(20).s + 0.3); ctx.text(X, 'وارسو', 790, 640, { family: 'display', size: 74, color: P.ink });
      X.globalAlpha = mk; const q = pt(pr), q2 = pt(Math.min(1, pr + 0.02)); I.planeTop(X, q[0], q[1], 0.5, Math.atan2(q2[1] - q[1], q2[0] - q[0]) + 1.57, P.ink); X.restore();
    }
    const bk = at(t, wt(24).s - 0.1, wt(24).s + 0.4, 'expoOut'); if (bk > 0) { X.save(); X.globalAlpha = bk; I.card(X, 250, 1100, 580, 100, { fill: '#102038', stroke: P.hi, lw: 4, r: 50 }); ctx.text(X, 'بوينغ', 640, 1170, { family: 'body', weight: 900, size: 56, color: P.ink }); ctx.text(X, '767', 400, 1172, { family: 'num', weight: 900, size: 62, color: P.acc, alpha: at(t, wt(25).s - 0.05, wt(25).s + 0.3), dir: 'ltr' }); X.restore(); }
    I.vig(ctx, '0,0,0', 0.35); I.scrim(ctx, 1260, 1620);
    I.caption(ctx, t, 'l2', 0, 2, { y: 1400, size: 92, hl: [2] });
    I.caption(ctx, t, 'l2', 3, 7, { y: 1400, size: 86, hl: [6, 7] });
    I.caption(ctx, t, 'l2', 8, 13, { y: 1400, size: 90, hl: [11, 13] });
    I.caption(ctx, t, 'l2', 14, 20, { y: 1400, size: 86, hl: [17, 20] });
    I.caption(ctx, t, 'l2', 21, 25, { y: 1400, size: 90, hl: [24, 25], hold: 0.9 });
  }
});
