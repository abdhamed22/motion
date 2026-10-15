MOTION.scene({
  id: 's4',
  draw(t, lt, ctx) {
    const { X, P, W, H, at, wordTime, noise1 } = ctx, I = window.ILS, wt = i => wordTime('l4', i);
    I.sky(ctx, t, { hz: 0.9, stars: false, top: '#08111F', mid: '#0C1A2E', bot: '#0C1A2E' });
    X.strokeStyle = 'rgba(124,140,166,0.10)'; X.lineWidth = 2;
    for (let x = 0; x <= W; x += 90) { X.beginPath(); X.moveTo(x, 150); X.lineTo(x, 1220); X.stroke(); } for (let y = 150; y <= 1220; y += 90) { X.beginPath(); X.moveTo(0, y); X.lineTo(W, y); X.stroke(); }
    const e1 = at(t, wt(4).s - 0.2, wt(4).s + 0.3, 'cubicInOut'), e2 = at(t, wt(10).s - 0.3, wt(10).s + 0.2, 'cubicInOut');
    /* أ: الطاقم يمسك الساقين */
    if (e1 < 1) {
      X.save(); X.globalAlpha = 1 - e1; const k = at(lt, 0, 0.5, 'expoOut');
      X.fillStyle = '#13213A'; X.fillRect(120, 640, 840, 14);                                  // حافة الهيكل
      const sw = noise1(t * 22, 9) * 6;
      I.person(X, 540 + sw, 790, 2.4, P.ink, 0, { armL: [-60, -70], armR: [60, -70] });
      /* الطاقم يمسكون الساقين */
      const gr = at(t, wt(1).s - 0.1, wt(2).s + 0.4, 'expoOut');
      for (const s of [-1, 1]) { X.save(); X.globalAlpha *= gr; X.translate(540 + s * 230 - s * 100 * gr, 930); I.person(X, 0, 0, 1.5, P.acc, 0, { armL: s > 0 ? [-60, -50] : [-30, 0], armR: s > 0 ? [30, 0] : [60, -50], noLegs: false }); X.restore(); }
      
      X.restore();
    }
    /* ب: المساعد يتولى القيادة */
    if (e1 > 0 && e2 < 1) {
      const k = at(t, wt(4).s, wt(4).s + 0.5, 'expoOut'); X.save(); X.globalAlpha = Math.min(1, e1) * (1 - e2);
      I.card(X, 140, 330, 800, 640, { fill: '#102038', stroke: '#27415F', lw: 5, r: 40 });
      X.save(); X.beginPath(); X.rect(140, 330, 800, 640); X.clip(); I.person(X, 440, 700, 2.6, P.ink, 0, { armL: [-30, 20], armR: [60, 20], noLegs: true }); X.restore();
      /* عجلة القيادة */
      const rot = Math.sin((t - wt(5).s) * 3) * 0.18 * at(t, wt(5).s, wt(5).s + 0.3);
      X.save(); X.translate(700, 760); X.rotate(rot); X.strokeStyle = P.acc; X.lineWidth = 18; X.lineCap = 'round'; X.beginPath(); X.moveTo(-140, -30); X.lineTo(-60, -30); X.lineTo(-60, 40); X.moveTo(140, -30); X.lineTo(60, -30); X.lineTo(60, 40); X.moveTo(-60, -30); X.lineTo(60, -30); X.stroke(); X.restore();
      const c = at(t, wt(7).s, wt(7).s + 0.4); if (c > 0) { X.beginPath(); X.arc(830, 420, 44, 0, 6.283); X.fillStyle = P.acc; X.fill(); I.check(X, 830, 422, 22, c, '#0A1424', 11); }
      X.restore();
    }
    /* ج: الهبوط الاضطراري نحو المطار */
    if (e2 > 0) {
      X.save(); X.globalAlpha = e2; const gy = 1010, A = [120, 420], B = [860, gy - 8], pr = at(t, wt(10).s, wt(15).e, 'sineInOut');
      X.fillStyle = '#13213A'; X.fillRect(0, gy, W, 200); X.fillStyle = '#E8EEF7'; X.fillRect(560, gy - 6, 440, 12);
      X.strokeStyle = P.clay; X.lineWidth = 6; X.setLineDash([24, 18]); X.lineDashOffset = -lt * 60; X.beginPath(); X.moveTo(A[0], A[1]); X.lineTo(B[0], B[1]); X.stroke(); X.setLineDash([]);
      const ang = Math.atan2(B[1] - A[1], B[0] - A[0]);
      I.planeSide(X, A[0] + (B[0] - A[0]) * pr * 0.88, A[1] + (B[1] - A[1]) * pr * 0.88 - 58, 1.2, ang, '#EEF2F8', 1, P.acc);
      const tk = at(t, wt(14).s - 0.05, wt(14).s + 0.4, 'expoOut'); if (tk > 0) { X.globalAlpha = e2 * tk; I.tower(X, 800, gy - 20, 70, P.ink, 9); I.card(X, 440, 560, 480, 90, { fill: P.acc, r: 45 }); ctx.text(X, 'ساوثهامبتون', 680, 625, { family: 'display', size: 70, color: '#0A1424' }); }
      X.restore();
    }
    I.scrim(ctx, 1230, 1600);
    I.caption(ctx, t, 'l4', 0, 3, { y: 1370, size: 90, hl: [0, 3] });
    I.caption(ctx, t, 'l4', 4, 9, { y: 1370, size: 84, hl: [6, 7] });
    I.caption(ctx, t, 'l4', 10, 15, { y: 1370, size: 84, hl: [11, 12, 15], hold: 0.8 });
  }
});
