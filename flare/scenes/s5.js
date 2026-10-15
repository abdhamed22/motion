MOTION.scene({
  id: 's5',
  draw(t, lt, ctx) {
    const { X, P, W, H, at, wordTime } = ctx, I = window.ILS, wt = i => wordTime('l5', i);
    I.sky(ctx, t, { hz: 0.8, stars: true, top: '#05080F', mid: '#16203A', bot: '#0A0F1A' });
    const gy = 1000, TX = 640, k = 0.62, pathY = x => gy - (TX - x) * k, sc = 5;      // 5 بكسل لكل قدم
    X.fillStyle = '#0B1220'; X.fillRect(0, gy, W, 300); X.fillStyle = '#16213A'; X.fillRect(340, gy, 740, 26); X.fillStyle = '#E8EEF7'; X.fillRect(340, gy - 4, 740, 8);
    X.save(); X.setLineDash([22, 16]); X.lineDashOffset = -lt * 60; X.lineWidth = 6; X.strokeStyle = P.clay; X.beginPath(); X.moveTo(40, pathY(40)); X.lineTo(TX, gy); X.stroke(); X.restore();
    /* مسطرة الارتفاع + حزمة 30-50 قدم */
    const bk = at(t, wt(4).s, wt(5).e, 'expoOut');
    X.save(); X.globalAlpha = bk; X.strokeStyle = P.mut; X.lineWidth = 4; X.beginPath(); X.moveTo(160, gy); X.lineTo(160, gy - 300); X.stroke(); for (let i = 0; i <= 6; i++) { X.beginPath(); X.moveTo(160, gy - i * 50); X.lineTo(i % 2 ? 186 : 200, gy - i * 50); X.stroke(); }
    const b = at(t, wt(7).s, wt(9).e, 'cubicOut');
    if (b > 0) { X.save(); X.fillStyle = 'rgba(255,180,58,0.22)'; X.fillRect(150, gy - 50 * sc, 560 * b, 20 * sc); X.strokeStyle = P.acc; X.lineWidth = 5; X.setLineDash([16, 10]); X.beginPath(); X.moveTo(150, gy - 50 * sc); X.lineTo(150 + 560 * b, gy - 50 * sc); X.moveTo(150, gy - 30 * sc); X.lineTo(150 + 560 * b, gy - 30 * sc); X.stroke(); X.restore(); }
    const n1 = at(t, wt(7).s - 0.05, wt(7).s + 0.35, 'expoOut'), n2 = at(t, wt(9).s - 0.05, wt(9).s + 0.35, 'expoOut');
    if (n1 > 0) ctx.text(X, '30', 100, gy - 30 * sc + 20, { family: 'num', weight: 900, size: 64, color: P.acc, alpha: n1, dir: 'ltr' });
    if (n2 > 0) ctx.text(X, '50', 100, gy - 50 * sc + 20, { family: 'num', weight: 900, size: 64, color: P.acc, alpha: n2, dir: 'ltr' });
    const fk = at(t, wt(10).s - 0.05, wt(10).s + 0.35); if (fk > 0) ctx.text(X, 'قدم', 100, gy - 300, { family: 'body', weight: 800, size: 46, color: P.ink, alpha: fk });
    const px = 60 + 560 * at(lt, 0.2, 7.4, 'sineInOut') * 0.82; I.gearPlane(X, px, pathY(px) - 62, 1.3, 0.555, P.acc);
    /* التسوية */
    const ck = at(t, wt(14).s - 0.1, wt(14).s + 0.4, 'expoOut'); if (ck > 0) { X.save(); X.globalAlpha = ck; X.translate(0, (1 - ck) * 30); I.card(X, 540 - 220, 440, 440, 120, { fill: P.acc, r: 60 }); ctx.text(X, 'التسوية', 540, 525, { family: 'display', size: 100, color: '#0A1424' }); X.restore(); }
    I.scrim(ctx, 1250, 1620);
    I.caption(ctx, t, 'l5', 0, 3, { y: 1390, size: 92, hl: [2] });
    I.caption(ctx, t, 'l5', 4, 10, { y: 1390, size: 86, hl: [7, 9, 10] });
    I.caption(ctx, t, 'l5', 11, 14, { y: 1390, size: 92, hl: [14], hold: 0.8 });
  }
});
