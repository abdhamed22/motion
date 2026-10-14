MOTION.scene({
  id: 's6',
  draw(t, lt, ctx) {
    const { X, P, W, H, at, wordTime } = ctx, I = window.ILS, wt = i => wordTime('l6', i);
    I.sky(ctx, t, { hz: 0.9, stars: false, top: '#08111F', mid: '#0C1A2E', bot: '#0C1A2E' });
    X.strokeStyle = 'rgba(124,140,166,0.10)'; X.lineWidth = 2;
    for (let x = 0; x <= W; x += 90) { X.beginPath(); X.moveTo(x, 150); X.lineTo(x, 1220); X.stroke(); } for (let y = 150; y <= 1220; y += 90) { X.beginPath(); X.moveTo(0, y); X.lineTo(W, y); X.stroke(); }
    const e1 = at(t, wt(5).s - 0.2, wt(5).s + 0.1, 'cubicInOut'), e2 = at(t, wt(11).s + 0.3, wt(12).s - 0.1, 'cubicInOut');
    /* أ: تحقيق: عدسة فوق إطار النافذة */
    if (e1 < 1) {
      X.save(); X.globalAlpha = 1 - e1; const k = at(lt, 0, 0.5, 'expoOut'); X.translate(0, (1 - k) * 40);
      X.strokeStyle = P.hi; X.lineWidth = 8; X.beginPath(); X.roundRect(330, 330, 420, 600, 40); X.stroke();
      X.fillStyle = 'rgba(143,233,245,0.10)'; X.fill();
      const mx = 540 + Math.sin(lt * 1.6) * 120, my = 640 + Math.cos(lt * 1.3) * 120;
      X.strokeStyle = P.acc; X.lineWidth = 20; X.beginPath(); X.arc(mx, my, 120, 0, 6.283); X.stroke(); X.lineCap = 'round'; X.beginPath(); X.moveTo(mx + 85, my + 85); X.lineTo(mx + 190, my + 190); X.stroke();
      const bk = at(t, wt(1).s, wt(1).s + 0.35, 'expoOut'); if (bk > 0) { X.globalAlpha = (1 - e1) * bk; X.beginPath(); X.arc(840, 380, 64, 0, 6.283); X.fillStyle = P.acc; X.fill(); ctx.text(X, '!', 840, 428, { family: 'display', size: 130, color: '#0A1424' }); }
      X.restore();
    }
    /* ب: 84 برغياً */
    if (e1 > 0 && e2 < 1) {
      X.save(); X.globalAlpha = e1 * (1 - e2); const cols = 12, gx = 540 - (cols - 1) * 38, gy0 = 600;
      const fk = at(t, wt(10).s - 0.1, wt(10).s + 0.5, 'expoOut'); if (fk > 0) { X.strokeStyle = P.hi; X.lineWidth = 7; X.globalAlpha = e1 * (1 - e2) * fk; X.beginPath(); X.roundRect(gx - 60, gy0 - 70, (cols - 1) * 76 + 120, 6 * 98 + 140, 30); X.stroke(); X.globalAlpha = e1 * (1 - e2); }
      for (let i = 0; i < 84; i++) { const c = i % cols, r = Math.floor(i / cols), on = at(t, wt(5).s + 0.05 + i * 0.016, wt(5).s + 0.3 + i * 0.016, 'expoOut'); I.screw(X, gx + c * 76, gy0 + r * 98, 14, 54, on > 0.5 ? P.acc : '#27415F'); }
      const nk = at(t, wt(5).s - 0.1, wt(5).s + 0.4, 'expoOut'), n = Math.round(84 * at(t, wt(5).s, wt(5).s + 0.9, 'cubicOut'));
      X.globalAlpha = e1 * (1 - e2) * nk; ctx.text(X, ctx.num(n), 540, 400, { family: 'num', weight: 900, size: 240, color: P.acc, dir: 'ltr' });
      X.restore();
    }
    /* ج: المقاس المطلوب أكبر */
    if (e2 > 0) {
      X.save(); X.globalAlpha = e2; const ak = at(t, wt(12).s - 0.05, wt(12).s + 0.4, 'expoOut'), rk = at(t, wt(14).s - 0.05, wt(14).s + 0.4, 'expoOut');
      X.strokeStyle = P.hi; X.setLineDash([16, 12]); I.screw(X, 700, 640, 70, 520, P.hi, 7); X.setLineDash([]);
      X.globalAlpha = e2 * ak; I.screw(X, 380, 640, 70, 520, '#27415F', 0); I.screw(X, 380, 700, 54, 400, P.acc);
      X.globalAlpha = e2 * rk; X.strokeStyle = P.hi; X.lineWidth = 5; X.beginPath(); X.moveTo(380, 380); X.lineTo(700, 380); X.moveTo(380, 360); X.lineTo(380, 400); X.moveTo(700, 360); X.lineTo(700, 400); X.stroke();
      I.card(X, 360, 880, 460, 96, { fill: P.hi, r: 48 }); ctx.text(X, 'المقاس المطلوب', 590, 948, { family: 'body', weight: 900, size: 56, color: '#0A1424' });
      X.globalAlpha = e2 * ak; X.fillStyle = P.acc; X.beginPath(); X.moveTo(380, 330); X.lineTo(350, 300); X.lineTo(410, 300); X.closePath(); X.fill();
      X.restore();
    }
    I.scrim(ctx, 1230, 1600);
    I.caption(ctx, t, 'l6', 0, 4, { y: 1370, size: 90, hl: [1, 4] });
    I.caption(ctx, t, 'l6', 5, 10, { y: 1370, size: 86, hl: [5, 7, 10] });
    I.caption(ctx, t, 'l6', 11, 15, { y: 1370, size: 90, hl: [12, 14, 15], hold: 0.8 });
  }
});
