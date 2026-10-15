MOTION.scene({
  id: 's3',
  draw(t, lt, ctx) {
    const { X, P, W, H, at, wordTime, noise1 } = ctx, I = window.ILS, wt = i => wordTime('l3', i);
    window.REAL.bg2d(ctx, t); I.grid(ctx, 0.06);
    const e1 = at(t, wt(2).s - 0.3, wt(2).s + 0.2, 'cubicInOut'), e2 = at(t, wt(7).s - 0.3, wt(7).s + 0.2, 'cubicInOut');
    /* أ: قبل الهبوط */
    if (e1 < 1) { X.save(); X.globalAlpha = 1 - e1; const gy = 1000; X.fillStyle = '#13213A'; X.fillRect(0, gy, W, 200); X.fillStyle = '#E8EEF7'; X.fillRect(280, gy - 6, 760, 12);
      const p = at(lt, 0, 2.6, 'sineInOut'); I.planeSide(X, 150 + 520 * p, 480 + 400 * p, 1.3, 0.2, '#EEF2F8', 1, P.acc); X.restore(); }
    /* ب: المحاولة: ذراع العجلات + ثلاث أضواء */
    if (e1 > 0 && e2 < 1) {
      X.save(); X.globalAlpha = e1 * (1 - e2); const pull = at(t, wt(4).s, wt(5).e, 'cubicInOut');
      I.card(X, 190, 330, 700, 700, { fill: '#0E1A2D', stroke: '#27415F', lw: 5, r: 40 });
      X.fillStyle = '#27415F'; I.rr(X, 255, 420, 56, 440, 28); X.fill(); X.save(); X.translate(283, 450 + 340 * pull); X.fillStyle = P.acc; X.beginPath(); X.arc(0, 0, 58, 0, 6.283); X.fill(); X.fillStyle = '#0A1424'; X.beginPath(); X.arc(0, 0, 34, 0, 6.283); X.fill(); X.fillStyle = P.acc; X.beginPath(); X.arc(0, 0, 14, 0, 6.283); X.fill(); X.restore();
      for (let i = 0; i < 3; i++) { const x = 480 + i * 140, flick = 0.55 + 0.45 * Math.abs(Math.sin(t * 5 + i)); X.fillStyle = P.clay; X.globalAlpha = e1 * (1 - e2) * (pull > 0.3 ? flick : 0.35); X.beginPath(); X.arc(x, 520, 52, 0, 6.283); X.fill(); X.globalAlpha = e1 * (1 - e2); X.strokeStyle = P.ink; X.lineWidth = 8; X.beginPath(); X.moveTo(x, 640); X.lineTo(x, 760); X.stroke(); X.fillStyle = '#0E1B2D'; X.strokeStyle = P.ink; X.beginPath(); X.arc(x, 790, 34, 0, 6.283); X.fill(); X.stroke(); }
      X.restore();
    }
    /* ج: النظام تعطّل */
    if (e2 > 0) {
      X.save(); X.globalAlpha = e2; X.translate(540, 620);
      X.strokeStyle = P.hi; X.lineWidth = 12; X.lineCap = 'round'; X.lineJoin = 'round'; X.beginPath(); X.moveTo(-230, -120); X.lineTo(-230, 120); X.lineTo(230, 120); X.lineTo(230, -120); X.closePath(); X.stroke();
      X.beginPath(); X.moveTo(-120, 40); X.quadraticCurveTo(0, -120, 120, 40); X.stroke(); X.beginPath(); X.moveTo(-120, 40); X.lineTo(-120, 80); X.moveTo(120, 40); X.lineTo(120, 80); X.stroke();
      const ck = at(t, wt(9).s - 0.1, wt(9).s + 0.5, 'expoOut'); I.cross(X, 0, 0, 170, ck, P.clay, 30);
      const wk = at(t, wt(11).s, wt(12).s, 'cubicOut'); for (let i = 0; i < 3; i++) { const x = -160 + i * 160; X.strokeStyle = P.ink; X.lineWidth = 8; X.beginPath(); X.moveTo(x, 260); X.lineTo(x, 330 + 10 * Math.sin(t * 20) * (1 - wk)); X.stroke(); X.fillStyle = '#0E1B2D'; X.beginPath(); X.arc(x, 370, 34, 0, 6.283); X.fill(); X.stroke(); }
      X.restore();
    }
    I.vig(ctx, '255,50,30', 0.3 * at(t, wt(9).s, wt(12).e)); I.scrim(ctx, 1260, 1620);
    I.caption(ctx, t, 'l3', 0, 1, { y: 1400, size: 96 });
    I.caption(ctx, t, 'l3', 2, 6, { y: 1400, size: 88, hl: [3, 5, 6] });
    I.caption(ctx, t, 'l3', 7, 12, { y: 1400, size: 90, hl: [8, 9, 12], hold: 0.9 });
  }
});
