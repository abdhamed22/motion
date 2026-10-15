MOTION.scene({
  id: 's7',
  draw(t, lt, ctx) {
    const { X, P, W, H, at, wordTime } = ctx, I = window.ILS, wt = i => wordTime('l7', i), t0 = ctx.scene.start;
    I.sky(ctx, t, { hz: 0.8, stars: true, top: '#05080F', mid: '#16203A', bot: '#0A0F1A' });
    const gy = 1000;
    X.fillStyle = '#0B1220'; X.fillRect(0, gy, W, 300); X.fillStyle = '#16213A'; X.fillRect(180, gy, 900, 26); X.fillStyle = '#E8EEF7'; X.fillRect(180, gy - 4, 900, 8);
    /* الطائرة تنزل وتسوّي تلقائياً */
    const dur = ctx.scene.dur, u = at(lt, 0, wt(16).s - t0, 'sineIn'), px = 220 + 520 * at(lt, 0, dur - 0.6, 'sineInOut'), alt = (gy - 64 - 360) * (1 - u) ** 1.6 + 360 * 0 + 0, py = gy - 64 - 520 * (1 - u) ** 1.6, ang = 0.20 * (1 - u) - 0.0;
    I.gearPlane(X, px, py, 1.3, ang + 0.05, P.acc);
    /* حزم الراديو تحت الطائرة */
    const rk = at(t, wt(10).s - 0.2, wt(11).s + 0.3, 'expoOut') ;
    X.save(); X.strokeStyle = P.hi; X.lineWidth = 5; X.setLineDash([12, 10]); X.lineDashOffset = -lt * 40; X.globalAlpha = Math.max(0.35, rk); X.beginPath(); X.moveTo(px + 10, py + 60); X.lineTo(px + 10, gy - 2); X.stroke(); X.setLineDash([]);
    for (let i = 0; i < 3; i++) { const ph = ((t * 1.1 + i / 3) % 1); X.globalAlpha = Math.max(0.2, rk) * (1 - ph); X.beginPath(); X.ellipse(px + 10, py + 60 + (gy - py - 62) * ph, 24 + 40 * ph, 10 + 14 * ph, 0, 0, 6.283); X.stroke(); } X.restore();
    /* شريحة الطيار الآلي */
    const ak = at(t, wt(3).s - 0.1, wt(3).s + 0.35, 'expoOut'); if (ak > 0) { X.save(); X.globalAlpha = ak; X.translate(0, (1 - ak) * 24); I.card(X, 540 - 230, 360, 460, 100, { fill: P.acc, r: 50 }); ctx.text(X, 'الطيار الآلي', 540, 430, { family: 'body', weight: 900, size: 58, color: '#0A1424' }); X.restore(); }
    const dk = at(t, wt(10).s - 0.1, wt(10).s + 0.4, 'expoOut'); if (dk > 0) { X.save(); X.globalAlpha = dk; X.translate(0, (1 - dk) * 24); I.card(X, 540 - 340, 520, 680, 100, { fill: '#102038', stroke: P.hi, lw: 5, r: 50 }); ctx.text(X, 'جهاز قياس الارتفاع عن الأرض', 540, 590, { family: 'body', weight: 800, size: 46, color: P.hi }); X.restore(); }
    I.scrim(ctx, 1250, 1620);
    I.caption(ctx, t, 'l7', 0, 7, { y: 1390, size: 82, hl: [2, 3, 6] });
    I.caption(ctx, t, 'l7', 8, 16, { y: 1390, size: 84, hl: [10, 12, 14, 16], hold: 0.8 });
  }
});
