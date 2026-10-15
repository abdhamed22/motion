MOTION.scene({
  id: 's9',
  draw(t, lt, ctx) {
    const { X, P, W, H, at, wordTime, noise1 } = ctx, I = window.ILS, w9 = i => wordTime('l9', i), w10 = i => wordTime('l10', i);
    I.sky(ctx, t, { hz: 0.9, stars: false, top: '#070B14', mid: '#0C1424', bot: '#0C1424' }); I.grid(ctx);
    const ds = w9(6).s, de = w9(8).e + 0.4, act = at(t, ds, ds + 0.4), osc = Math.sin((t - ds) * 3.0) * act * (1 - at(t, de, de + 0.5));
    const steer = at(t, w10(8).s, w10(11).e, 'cubicInOut');
    const up = at(t, w10(7).s, w10(11).e, 'sineInOut');
    const cx = 540 + 150 * (1 - 0) * 0 + 0, cy = 880 - 190 * up, yaw = 0.42 * osc * (1 - steer) + 0.0;
    X.save(); X.translate(cx, cy); X.rotate(yaw);
    const hl = at(t, w9(4).s, w9(5).e, 'expoOut') * (1 - at(t, w9(6).s + 0.4, w9(6).s + 0.8));
    /* دفع المحركين: أعمدة تتغير */
    const lL = 150 + 110 * osc, lR = 150 - 110 * osc;
    for (const [sx, len] of [[-1, lL], [1, lR]]) { const ex = sx * 150, g = X.createLinearGradient(0, 40, 0, 40 + len); g.addColorStop(0, 'rgba(255,208,138,0.95)'); g.addColorStop(1, 'rgba(255,90,54,0)'); X.fillStyle = g; X.beginPath(); X.moveTo(ex - 20, 40); X.lineTo(ex + 20, 40); X.lineTo(ex + 6, 40 + len); X.lineTo(ex - 6, 40 + len); X.closePath(); X.fill(); }
    X.save(); X.scale(2.3, 2.3); I.planeTop(X, 0, 0, 1, 0, '#EEF2F8'); X.restore();
    for (const sx of [-1, 1]) { X.fillStyle = P.acc; X.beginPath(); X.roundRect(sx * 150 - 24, -30, 48, 84, 18); X.fill(); if (hl > 0) { X.globalAlpha = hl; X.strokeStyle = P.acc; X.lineWidth = 8; X.beginPath(); X.arc(sx * 150, 12, 70 + 18 * Math.sin(t * 12), 0, 6.283); X.stroke(); X.globalAlpha = 1; } }
    X.restore();
    /* ← المقود التقليدي مشطوب */
    const yk = at(t, w10(2).s - 0.05, w10(2).s + 0.4, 'expoOut') * (1 - at(t, w10(5).s - 0.1, w10(5).s + 0.3));
    if (yk > 0.01) { X.save(); X.globalAlpha = yk; I.yoke(X, 540, 540, 1.7, P.ink, 20); I.cross(X, 540, 560, 150, at(t, w10(3).s - 0.1, w10(3).s + 0.4), P.clay, 22); X.restore(); }
    /* المطار */
    const ak = at(t, w10(9).s, w10(11).s + 0.2, 'expoOut'); if (ak > 0) { X.save(); X.globalAlpha = ak; X.fillStyle = '#1A2538'; X.fillRect(480, 230, 120, 120 + 60); X.fillStyle = P.ink; for (let i = 0; i < 4; i++) X.fillRect(536, 246 + i * 40, 8, 22); I.tower(X, 740, 330, 50, P.acc, 8); X.restore(); }
    I.scrim(ctx, 1230, 1600);
    I.caption(ctx, t, 'l9', 0, 3, { y: 1370, size: 88 });
    I.caption(ctx, t, 'l9', 4, 8, { y: 1370, size: 92, hl: [4, 5, 7, 8], hold: 0.3 });
    I.caption(ctx, t, 'l10', 0, 3, { y: 1370, size: 90, hl: [2, 3] });
    I.caption(ctx, t, 'l10', 4, 11, { y: 1370, size: 86, hl: [7, 11], hold: 0.8 });
  }
});
