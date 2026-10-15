MOTION.scene({
  id: 's3',
  draw(t, lt, ctx) {
    const { X, P, W, H, at, wordTime } = ctx, I = window.ILS, wt = i => wordTime('l3', i);
    I.sky(ctx, t, { hz: 0.8, stars: true, top: '#05080F', mid: '#16203A', bot: '#0A0F1A' });
    const gy = 1000, TX = 640, k = 0.62, pathY = x => gy - (TX - x) * k;
    X.fillStyle = '#0B1220'; X.fillRect(0, gy, W, 300); X.fillStyle = '#16213A'; X.fillRect(340, gy, 740, 26); X.fillStyle = '#E8EEF7'; X.fillRect(340, gy - 4, 740, 8);
    X.fillStyle = '#35E07A'; for (let i = 0; i < 6; i++) X.fillRect(340, gy - 30 - i * 0, 10, 30);
    X.save(); X.setLineDash([22, 16]); X.lineDashOffset = -lt * 60; X.lineWidth = 6; X.strokeStyle = P.clay; X.beginPath(); X.moveTo(40, pathY(40)); X.lineTo(TX, gy); X.stroke(); X.restore();
    /* نقطة النهاية */
    const ek = at(t, wt(8).s, wt(10).s + 0.3, 'expoOut'); if (ek > 0) { X.save(); X.globalAlpha = ek; const r = 28 + 10 * Math.sin(t * 8); X.strokeStyle = P.acc; X.lineWidth = 8; X.beginPath(); X.arc(TX, gy - 4, r, 0, 6.283); X.stroke(); X.fillStyle = P.acc; X.beginPath(); X.arc(TX, gy - 4, 10, 0, 6.283); X.fill(); X.restore(); }
    /* مسطرة 300 */
    const rk = at(t, wt(13).s - 0.1, wt(17).s + 0.4, 'cubicOut');
    if (rk > 0) { X.save(); X.globalAlpha = Math.min(1, rk * 2); X.strokeStyle = P.hi; X.lineWidth = 6; const y = gy + 90; X.beginPath(); X.moveTo(340, y); X.lineTo(340 + 300 * rk, y); X.moveTo(340, y - 18); X.lineTo(340, y + 18); X.moveTo(340 + 300 * rk, y - 18); X.lineTo(340 + 300 * rk, y + 18); X.stroke(); X.restore(); }
    const nk = at(t, wt(17).s - 0.05, wt(17).s + 0.45, 'expoOut'); if (nk > 0) { ctx.text(X, '300', 560, gy + 230, { family: 'num', weight: 900, size: 130 * (0.94 + 0.06 * nk), color: P.hi, alpha: nk, dir: 'ltr' }); ctx.text(X, 'متر', 330, gy + 225, { family: 'display', size: 76, color: P.ink, alpha: at(t, wt(18).s - 0.05, wt(18).s + 0.3) }); }
    const bt = at(t, wt(14).s, wt(15).e, 'expoOut'); if (bt > 0) { X.save(); X.globalAlpha = bt; I.card(X, 150, gy - 150, 300, 70, { fill: '#35E07A', r: 35 }); ctx.text(X, 'بدايته', 300, gy - 100, { family: 'body', weight: 900, size: 44, color: '#0A1424' }); X.restore(); }
    const px = 60 + 580 * at(lt, 0.2, 8.6, 'sineInOut'); I.gearPlane(X, px, pathY(px) - 62, 1.3, 0.555, P.acc);
    I.scrim(ctx, 1250, 1620);
    I.caption(ctx, t, 'l3', 0, 6, { y: 1390, size: 82, hl: [3, 5, 6] });
    I.caption(ctx, t, 'l3', 7, 12, { y: 1390, size: 84, hl: [8, 10, 12] });
    I.caption(ctx, t, 'l3', 13, 18, { y: 1390, size: 84, hl: [17, 18], hold: 0.8 });
  }
});
