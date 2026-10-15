MOTION.scene({
  id: 's2',
  draw(t, lt, ctx) {
    const { X, P, W, H, at, wordTime } = ctx, I = window.ILS, wt = i => wordTime('l2', i);
    I.sky(ctx, t, { hz: 0.9, stars: false, top: '#03060D', mid: '#08121F', bot: '#08121F' }); I.grid(ctx, 0.07);
    /* رقم الرحلة */
    const a = at(t, wt(2).s - 0.05, wt(2).s + 0.5, 'expoOut'), up = at(t, wt(3).s - 0.3, wt(3).s + 0.5, 'cubicInOut');
    X.save(); X.translate(540, 560 - 250 * up); X.scale(1 - 0.5 * up, 1 - 0.5 * up);
    I.card(X, -380, -260, 760, 440, { fill: '#0E1A2D', stroke: '#27415F', lw: 5, r: 40 });
    ctx.text(X, 'الرحلة', 230, -150, { family: 'body', weight: 800, size: 64, color: P.hi, alpha: at(t, wt(1).s, wt(1).s + 0.3) });
    ctx.text(X, '447', 0, 70, { family: 'num', weight: 900, size: 260 * (0.94 + 0.06 * a), color: P.acc, alpha: a, dir: 'ltr' });
    X.restore();
    const ak = at(t, wt(7).s - 0.1, wt(7).s + 0.4, 'expoOut'); if (ak > 0) { X.save(); X.globalAlpha = ak; I.card(X, 140, 470, 800, 110, { fill: '#F4F7FB', r: 55 }); ctx.text(X, 'Air France', 540, 548, { family: 'num', weight: 800, size: 64, color: '#0A1A33', dir: 'ltr' }); X.restore(); }
    /* مسار ريو ← باريس */
    const mk = at(t, wt(10).s - 0.1, wt(10).s + 0.5, 'expoOut');
    if (mk > 0) {
      X.save(); X.globalAlpha = mk; const A = [250, 1060], B = [830, 700], C1 = [330, 740];
      const pt = u => [(1 - u) ** 2 * A[0] + 2 * (1 - u) * u * C1[0] + u * u * B[0], (1 - u) ** 2 * A[1] + 2 * (1 - u) * u * C1[1] + u * u * B[1]];
      const pr = at(t, wt(11).s, wt(15).e, 'sineInOut');
      X.fillStyle = 'rgba(143,233,245,0.06)'; X.beginPath(); X.roundRect(110, 640, 860, 520, 30); X.fill();
      X.strokeStyle = P.hi; X.lineWidth = 6; X.setLineDash([22, 16]); X.lineDashOffset = -lt * 50; X.beginPath(); X.moveTo(A[0], A[1]); X.quadraticCurveTo(C1[0], C1[1], B[0], B[1]); X.stroke(); X.setLineDash([]);
      const dot = (p, c) => { X.fillStyle = c; X.beginPath(); X.arc(p[0], p[1], 22, 0, 6.283); X.fill(); X.fillStyle = '#08121F'; X.beginPath(); X.arc(p[0], p[1], 9, 0, 6.283); X.fill(); }; dot(A, P.acc); dot(B, P.clay);
      X.globalAlpha = mk * at(t, wt(11).s, wt(11).s + 0.3); ctx.text(X, 'ريو دي جانيرو', 290, 1130, { family: 'display', size: 74, color: P.ink });
      X.globalAlpha = mk * at(t, wt(15).s - 0.1, wt(15).s + 0.3); ctx.text(X, 'باريس', 780, 650, { family: 'display', size: 74, color: P.ink });
      X.globalAlpha = mk; const q = pt(pr), q2 = pt(Math.min(1, pr + 0.02)); I.planeTop(X, q[0], q[1], 0.5, Math.atan2(q2[1] - q[1], q2[0] - q[0]) + 1.57, P.ink); X.restore();
    }
    /* التاريخ */
    const dk = at(t, wt(17).s - 0.1, wt(17).s + 0.5, 'expoOut'); if (dk > 0) {
      X.save(); X.globalAlpha = dk; X.translate(0, (1 - dk) * 30); I.card(X, 250, 1010, 580, 190, { fill: '#F4F7FB', r: 32 }); X.fillStyle = P.acc; X.fillRect(250, 1010, 580, 54);
      ctx.text(X, 'يونيو', 540, 1052, { family: 'display', size: 44, color: '#0A1424', alpha: at(t, wt(19).s - 0.05, wt(19).s + 0.3) });
      ctx.text(X, '1', 700, 1170, { family: 'num', weight: 900, size: 110, color: '#0A1424', dir: 'ltr' });
      ctx.text(X, '2009', 400, 1165, { family: 'num', weight: 800, size: 90, color: '#27415F', alpha: at(t, wt(21).s - 0.05, wt(21).s + 0.3), dir: 'ltr' }); X.restore();
    }
    I.vig(ctx, '0,0,0', 0.35); I.scrim(ctx, 1260, 1620);
    I.caption(ctx, t, 'l2', 0, 2, { y: 1400, size: 92, hl: [2] });
    I.caption(ctx, t, 'l2', 3, 8, { y: 1400, size: 84, hl: [7, 8] });
    I.caption(ctx, t, 'l2', 9, 15, { y: 1400, size: 84, hl: [11, 13, 15] });
    I.caption(ctx, t, 'l2', 16, 21, { y: 1400, size: 92, hl: [19, 21], hold: 0.9 });
  }
});
