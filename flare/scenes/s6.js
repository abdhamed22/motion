MOTION.scene({
  id: 's6',
  draw(t, lt, ctx) {
    const { X, P, W, H, at, wordTime } = ctx, I = window.ILS, wt = i => wordTime('l6', i), t0 = ctx.scene.start;
    I.sky(ctx, t, { hz: 0.8, stars: true, top: '#05080F', mid: '#16203A', bot: '#0A0F1A' });
    const gy = 1000, TX = 640, k = 0.62, pathY = x => gy - (TX - x) * k;
    X.fillStyle = '#0B1220'; X.fillRect(0, gy, W, 300); X.fillStyle = '#16213A'; X.fillRect(340, gy, 740, 26); X.fillStyle = '#E8EEF7'; X.fillRect(340, gy - 4, 740, 8);
    const F = [300, pathY(300) - 62], P1 = [470, F[1] + 120], P2 = [560, gy - 190], P3 = [700, gy - 64];
    const bez = u => [(1 - u) ** 3 * F[0] + 3 * (1 - u) ** 2 * u * P1[0] + 3 * (1 - u) * u * u * P2[0] + u ** 3 * P3[0], (1 - u) ** 3 * F[1] + 3 * (1 - u) ** 2 * u * P1[1] + 3 * (1 - u) * u * u * P2[1] + u ** 3 * P3[1]];
    /* الشعاع المستقيم (أحمر) مقابل منحنى التسوية (كهرماني) */
    X.save(); X.setLineDash([22, 16]); X.lineDashOffset = -lt * 60; X.lineWidth = 6; X.strokeStyle = P.clay; X.beginPath(); X.moveTo(40, pathY(40) - 62); X.lineTo(F[0], F[1]); X.lineTo(F[0] + 340, F[1] + 340 * k); X.stroke(); X.restore();
    const tS = wt(2).s - 0.3, tT = wt(8).s + 0.35, u = at(t, tS, tT, 'sineInOut');
    X.strokeStyle = P.acc; X.lineWidth = 8; X.lineCap = 'round'; X.beginPath(); X.moveTo(F[0], F[1]); for (let i = 1; i <= 40; i++) { const q = bez(u * i / 40); X.lineTo(q[0], q[1]); } X.stroke();
    let px, py, ang;
    if (t < tS) { px = 60 + (F[0] - 60) * at(lt, 0, tS - t0, 'linear'); py = pathY(px) - 62; ang = 0.555; }
    else { const q = bez(u); px = q[0]; py = q[1]; ang = 0.555 - (0.555 + 0.02) * at(u, 0, 0.85, 'cubicOut'); }
    if (t > tT) { px += 380 * (1 - Math.exp(-(t - tT) * 0.9)) * 0.5; py = gy - 64; ang = -0.02; }
    I.gearPlane(X, px, py, 1.3, ang, P.acc);
    /* غبار لمسة ناعمة */
    if (t > tT) for (let i = 0; i < 6; i++) { const ph = Math.min(1, (t - tT) * 0.8 + i * 0.05); X.globalAlpha = 0.35 * (1 - ph); X.fillStyle = '#C9D3E0'; X.beginPath(); X.arc(P3[0] - 50 + i * 18, gy - 12 - ph * 40, 14 + ph * 24, 0, 6.283); X.fill(); } X.globalAlpha = 1;
    /* مقياس سرعة النزول */
    const vk = at(t, wt(5).s - 0.1, wt(5).s + 0.4, 'expoOut'), v = 1 - 0.78 * at(t, wt(5).s, wt(8).s, 'cubicOut');
    if (vk > 0) { X.save(); X.globalAlpha = vk; I.rr(X, 940, 360, 30, 400, 15); X.fillStyle = '#16294A'; X.fill(); X.fillStyle = v < 0.4 ? P.hi : P.clay; I.rr(X, 940, 360 + 400 * (1 - v), 30, 400 * v, 15); X.fill(); ctx.text(X, 'سرعة النزول', 955, 830, { family: 'body', weight: 800, size: 36, color: P.ink }); X.restore(); }
    const ok = at(t, wt(11).s - 0.05, wt(11).s + 0.45); if (ok > 0) I.check(X, 540, 520, 60, ok, P.acc, 18);
    I.scrim(ctx, 1250, 1620);
    I.caption(ctx, t, 'l6', 0, 4, { y: 1390, size: 92, hl: [0, 2] });
    I.caption(ctx, t, 'l6', 5, 7, { y: 1390, size: 92, hl: [6, 7] });
    I.caption(ctx, t, 'l6', 8, 11, { y: 1390, size: 92, hl: [9, 11], hold: 0.8 });
  }
});
