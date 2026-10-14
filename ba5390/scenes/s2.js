MOTION.scene({
  id: 's2',
  draw(t, lt, ctx) {
    const { X, P, W, H, at, wordTime } = ctx, I = window.ILS, wt = i => wordTime('l2', i);
    I.sky(ctx, t, { hz: 0.9, stars: false, top: '#08111F', mid: '#0C1A2E', bot: '#0C1A2E' });
    X.strokeStyle = 'rgba(124,140,166,0.10)'; X.lineWidth = 2;
    for (let x = 0; x <= W; x += 90) { X.beginPath(); X.moveTo(x, 150); X.lineTo(x, 1220); X.stroke(); } for (let y = 150; y <= 1220; y += 90) { X.beginPath(); X.moveTo(0, y); X.lineTo(W, y); X.stroke(); }
    /* أ: بطاقة التاريخ */
    const aOut = at(t, wt(8).s - 0.2, wt(8).s + 0.3, 'cubicInOut');
    if (aOut < 1) {
      const k = at(t, wt(3).s, wt(3).s + 0.45, 'expoOut'); X.save(); X.globalAlpha = k * (1 - aOut); X.translate(0, (1 - k) * 50 - aOut * 40);
      I.card(X, 190, 330, 700, 760, { fill: '#F4F7FB', r: 44 }); I.card(X, 190, 330, 700, 170, { fill: P.acc, r: 44 }); X.fillStyle = P.acc; X.fillRect(190, 440, 700, 60);
      ctx.text(X, 'يونيو', 540, 450, { family: 'display', size: 120, color: '#0A1424', alpha: at(t, wt(5).s - 0.05, wt(5).s + 0.3) });
      const nk = at(t, wt(4).s - 0.05, wt(4).s + 0.4, 'expoOut'); ctx.text(X, '10', 540, 830, { family: 'num', weight: 900, size: 340 * (0.94 + 0.06 * nk), color: '#0A1424', alpha: nk, dir: 'ltr' });
      const yk = at(t, wt(7).s - 0.1, wt(7).s + 0.4, 'expoOut'); ctx.text(X, '1990', 540, 1020, { family: 'num', weight: 800, size: 150, color: '#27415F', alpha: yk, dir: 'ltr' });
      X.restore();
    }
    /* ب + ج: رقم الرحلة ثم المسار */
    const bIn = at(t, wt(10).s - 0.1, wt(10).s + 0.4, 'expoOut');
    if (bIn > 0) {
      const up = at(t, wt(12).s - 0.2, wt(12).s + 0.5, 'cubicInOut'), y0 = 560 - 290 * up, sc = 1 - 0.38 * up;
      X.save(); X.globalAlpha = bIn; X.translate(540, y0); X.scale(sc, sc); X.translate(-540, -560);
      I.card(X, 150, 360, 780, 400, { fill: '#102038', stroke: '#27415F', lw: 5, r: 40 });
      I.planeTop(X, 280, 560, 1.05, 1.57, P.ink);
      ctx.text(X, 'الرحلة', 700, 470, { family: 'body', weight: 800, size: 64, color: P.hi });
      const nk = at(t, wt(11).s - 0.05, wt(11).s + 0.45, 'expoOut'); ctx.text(X, '5390', 640, 690, { family: 'num', weight: 900, size: 190 * (0.95 + 0.05 * nk), color: P.acc, alpha: nk, dir: 'ltr' });
      X.restore();
      const ak = at(t, wt(14).s - 0.1, wt(14).s + 0.4, 'expoOut'); if (ak > 0) { X.save(); X.globalAlpha = ak; I.card(X, 150, 560 - 290 + 240, 780, 100, { fill: P.clay, r: 50 }); ctx.text(X, 'الخطوط الجوية البريطانية', 540, 560 - 290 + 310, { family: 'body', weight: 900, size: 54, color: '#0A1424' }); X.restore(); }
      /* المسار: برمنغهام ← ملقة */
      const mk = at(t, wt(16).s - 0.1, wt(16).s + 0.5, 'expoOut');
      if (mk > 0) {
        const A = [360, 720], B = [700, 1130], C1 = [150, 980]; X.save(); X.globalAlpha = mk;
        const pt = u => [(1 - u) * (1 - u) * A[0] + 2 * (1 - u) * u * C1[0] + u * u * B[0], (1 - u) * (1 - u) * A[1] + 2 * (1 - u) * u * C1[1] + u * u * B[1]];
        const pr = at(t, wt(17).s, wt(20).e, 'sineInOut');
        X.strokeStyle = P.hi; X.lineWidth = 6; X.setLineDash([22, 18]); X.lineDashOffset = -lt * 50; X.beginPath(); X.moveTo(A[0], A[1]); X.quadraticCurveTo(C1[0], C1[1], B[0], B[1]); X.stroke(); X.setLineDash([]);
        const dot = (p, c) => { X.fillStyle = c; X.beginPath(); X.arc(p[0], p[1], 20, 0, 6.283); X.fill(); X.fillStyle = '#0A1424'; X.beginPath(); X.arc(p[0], p[1], 8, 0, 6.283); X.fill(); };
        dot(A, P.acc); dot(B, P.clay);
        const ca = at(t, wt(18).s - 0.05, wt(18).s + 0.3, 'expoOut'), cb = at(t, wt(20).s - 0.05, wt(20).s + 0.3, 'expoOut');
        X.globalAlpha = mk * ca; ctx.text(X, 'برمنغهام', 560, 690, { family: 'display', size: 82, color: P.ink });
        X.globalAlpha = mk * cb; ctx.text(X, 'ملقة', 480, 1210, { family: 'display', size: 82, color: P.ink });
        X.globalAlpha = mk; const q = pt(pr), q2 = pt(Math.min(1, pr + 0.02)); I.planeTop(X, q[0], q[1], 0.55, Math.atan2(q2[1] - q[1], q2[0] - q[0]) + 1.57, P.ink);
        X.restore();
      }
    }
    I.scrim(ctx, 1230, 1600);
    I.caption(ctx, t, 'l2', 0, 7, { y: 1370, size: 84, hl: [4, 5, 7] });
    I.caption(ctx, t, 'l2', 8, 11, { y: 1370, size: 88, hl: [11] });
    I.caption(ctx, t, 'l2', 12, 15, { y: 1370, size: 84, hl: [14, 15] });
    I.caption(ctx, t, 'l2', 16, 20, { y: 1370, size: 86, hl: [18, 20], hold: 0.8 });
  }
});
