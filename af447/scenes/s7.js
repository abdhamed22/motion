MOTION.scene({
  id: 's7',
  draw(t, lt, ctx) {
    const { X, P, W, H, at, wordTime, noise1 } = ctx, I = window.ILS, wt = i => wordTime('l7', i), dur = ctx.timeline.duration;
    I.sky(ctx, t, { hz: 0.9, stars: true, top: '#02040A', mid: '#0A1830', bot: '#0A1830' });
    const k = at(lt, 0, 0.8, 'expoOut'), cx = 540, cy = 640, R = 320;
    X.save(); X.globalAlpha = k; X.strokeStyle = 'rgba(143,233,245,0.55)'; X.lineWidth = 4; X.beginPath(); X.arc(cx, cy, R, 0, 6.283); X.stroke(); X.fillStyle = 'rgba(143,233,245,0.05)'; X.fill();
    X.save(); X.beginPath(); X.arc(cx, cy, R, 0, 6.283); X.clip();
    for (let i = -3; i <= 3; i++) { const ph = (lt * 0.12 + i / 3.5) % 2 - 1; X.beginPath(); X.ellipse(cx, cy, Math.abs(Math.cos(ph * Math.PI / 2)) * R, R, 0, 0, 6.283); X.stroke(); }
    for (let j = -2; j <= 2; j++) { const y = cy + j * R / 3, w = Math.sqrt(R * R - (j * R / 3) ** 2); X.beginPath(); X.ellipse(cx, y, w, w * 0.12, 0, 0, 6.283); X.stroke(); }
    X.restore();
    /* طيارون يضيئون حول العالم */
    const pts = [[-150, -90], [90, -170], [170, 40], [-60, 120], [-220, 60], [30, -30], [200, -110], [-110, -190]];
    pts.forEach((p, i) => { const on = at(t, wt(3).s + i * 0.32, wt(3).s + 0.4 + i * 0.32, 'expoOut'); if (on > 0) { X.save(); X.translate(cx + p[0], cy + p[1]); X.globalAlpha = k * on; X.fillStyle = P.acc; X.beginPath(); X.arc(0, 0, 14 + 4 * Math.sin(t * 4 + i), 0, 6.283); X.fill(); X.globalAlpha = k * on * 0.4; X.beginPath(); X.arc(0, 0, 30, 0, 6.283); X.fill(); X.restore(); } });
    X.restore();
    /* طائرة تعبر بهدوء */
    const pf = at(t, wt(10).s, dur, 'sineInOut'); I.planeTop(X, 150 + 780 * pf, 1060 - 120 * pf, 0.55, 1.2, P.ink, 0.9);
    I.vig(ctx, '0,0,0', 0.35); I.scrim(ctx, 1260, 1620);
    I.caption(ctx, t, 'l7', 0, 7, { y: 1400, size: 88, hl: [2, 3, 4, 5] });
    I.caption(ctx, t, 'l7', 8, 13, { y: 1400, size: 88, hl: [9, 13], hold: 1.0 });
    const fo = at(t, dur - 0.9, dur, 'quadIn'); if (fo > 0) { X.globalAlpha = fo; X.fillStyle = '#000'; X.fillRect(0, 0, W, H); X.globalAlpha = 1; }
  }
});
