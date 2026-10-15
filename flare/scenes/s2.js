MOTION.scene({
  id: 's2',
  draw(t, lt, ctx) {
    const { X, P, W, H, at, wordTime } = ctx, I = window.ILS, wt = i => wordTime('l2', i);
    I.sky(ctx, t, { hz: 0.8, stars: true, top: '#05080F', mid: '#16203A', bot: '#0A0F1A' });
    const gy = 1000, TX = 640, k = 0.62, pathY = x => gy - (TX - x) * k;
    X.fillStyle = '#0B1220'; X.fillRect(0, gy, W, 300); X.fillStyle = '#16213A'; X.fillRect(340, gy, 740, 26); X.fillStyle = '#E8EEF7'; X.fillRect(340, gy - 4, 740, 8);
    I.tower(X, 760, gy - 6, 46, P.hi, 7);
    /* الشعاع يظهر ثم يختفي عن العين */
    const bk = at(t, wt(2).s, wt(3).e, 'cubicOut'), inv = at(t, wt(4).s, wt(5).e);
    X.save(); X.setLineDash([22, 16]); X.lineDashOffset = -lt * 60; X.lineWidth = 6; X.strokeStyle = P.clay; X.globalAlpha = bk * (1 - 0.65 * inv);
    X.beginPath(); X.moveTo(TX - (TX - 40) * bk, pathY(TX - (TX - 40) * bk)); X.lineTo(TX, gy); X.stroke(); X.restore();
    const ek = at(t, wt(4).s, wt(4).s + 0.4, 'expoOut') * (1 - at(t, wt(6).s, wt(6).s + 0.4)); if (ek > 0) { X.save(); X.globalAlpha = ek; I.eye(X, 300, 450, 90, P.ink, at(t, wt(4).s + 0.1, wt(4).s + 0.6), 12); X.restore(); }
    /* زاوية 3 درجات */
    const ak = at(t, wt(9).s, wt(9).s + 0.7, 'cubicOut');
    if (ak > 0) { X.save(); X.globalAlpha = ak; X.strokeStyle = P.acc; X.lineWidth = 8; X.beginPath(); X.arc(TX, gy, 190, Math.PI, Math.PI + Math.atan(k) * ak); X.stroke(); X.restore(); }
    const nk = at(t, wt(12).s - 0.05, wt(12).s + 0.45, 'expoOut'); if (nk > 0) ctx.text(X, '3°', 430, 930, { family: 'num', weight: 900, size: 150 * (0.94 + 0.06 * nk), color: P.acc, alpha: nk, dir: 'ltr' });
    const px = 60 + 560 * at(lt, 3.4, 8.2, 'sineInOut'); I.gearPlane(X, px, pathY(px) - 62, 1.3, 0.555, P.acc);
    I.scrim(ctx, 1230, 1600);
    I.caption(ctx, t, 'l2', 0, 5, { y: 1370, size: 90, hl: [1, 3, 5] });
    I.caption(ctx, t, 'l2', 6, 13, { y: 1370, size: 88, hl: [10, 12, 13], hold: 0.8 });
  }
});
