MOTION.scene({
  id: 's4',
  draw(t, lt, ctx) {
    const { X, P, W, H, at, wordTime, noise1 } = ctx, I = window.ILS, wt = i => wordTime('l4', i), r = ctx.rng('sp');
    const gy = 1000, TX = 640, k = 0.62, pathY = x => gy - (TX - x) * k, tH = wt(9).s + 0.5, hit = Math.max(0, t - tH);
    const shk = t > tH ? 16 * Math.exp(-hit * 2.5) : 0;
    I.sky(ctx, t, { hz: 0.8, stars: true, top: '#05080F', mid: '#16203A', bot: '#0A0F1A' });
    X.save(); X.translate(noise1(t * 50, 1) * shk, noise1(t * 50, 2) * shk);
    X.fillStyle = '#0B1220'; X.fillRect(-20, gy, W + 40, 300); X.fillStyle = '#16213A'; X.fillRect(340, gy, 740, 26); X.fillStyle = '#E8EEF7'; X.fillRect(340, gy - 4, 740, 8);
    X.save(); X.setLineDash([22, 16]); X.lineDashOffset = -lt * 60; X.lineWidth = 6; X.strokeStyle = P.clay; X.beginPath(); X.moveTo(40, pathY(40)); X.lineTo(TX, gy); X.stroke(); X.restore();
    /* الطائرة تكمل بنفس الزاوية */
    const u = at(t, wordTime('l4', 0).s, tH, 'linear'), px = 120 + (TX - 120) * u + (t > tH ? 120 * (1 - Math.exp(-hit * 2)) : 0);
    let py = pathY(Math.min(px, TX)) - 62, ang = 0.555;
    if (t > tH) { const b = Math.exp(-hit * 3.5) * Math.abs(Math.cos(hit * 11)); py = gy - 62 - 150 * b; ang = 0.555 - 0.5 * Math.min(1, hit * 3) + 0.2 * Math.sin(hit * 9) * Math.exp(-hit * 2); }
    I.gearPlane(X, px, py, 1.3, ang, P.acc);
    if (t > tH) {
      for (let i = 0; i < 26; i++) { const a = -r() * 1.4, v = 200 + r() * 600; X.globalAlpha = Math.max(0, 1 - hit * 1.1); X.fillStyle = i % 2 ? P.acc : P.hi; X.fillRect(TX + Math.cos(a) * v * hit - 20, gy - 6 + Math.sin(a) * v * hit + 500 * hit * hit, 10, 6); } X.globalAlpha = 1;
      for (let i = 0; i < 10; i++) { const ph = Math.min(1, hit * 0.7 + i * 0.03); X.globalAlpha = 0.4 * (1 - ph); X.fillStyle = '#8C98AB'; X.beginPath(); X.arc(TX - 30 + i * 22, gy - 20 - ph * 120, 30 + ph * 50, 0, 6.283); X.fill(); } X.globalAlpha = 1;
      const hk = at(t, wt(14).s - 0.1, wt(14).s + 0.4); if (hk > 0) { X.strokeStyle = P.clay; X.lineWidth = 7; X.globalAlpha = hk; for (const gx of [34, -26]) { X.beginPath(); X.arc(px + gx * 1.3, gy - 12, 40 + 8 * Math.sin(t * 14), 0, 6.283); X.stroke(); } X.globalAlpha = 1; }
      const hl = at(t, wt(15).s - 0.1, wt(15).s + 0.4); if (hl > 0) { X.strokeStyle = P.clay; X.lineWidth = 6; X.globalAlpha = hl; X.beginPath(); X.moveTo(px - 40, py - 20); X.lineTo(px - 10, py + 4); X.lineTo(px - 36, py + 14); X.lineTo(px + 6, py + 28); X.stroke(); X.globalAlpha = 1; }
    }
    X.restore();
    const fl = at(t, tH, tH + 0.04) * (1 - at(t, tH + 0.04, tH + 0.3)); if (fl > 0) { X.globalAlpha = 0.75 * fl; X.fillStyle = '#FFF'; X.fillRect(0, 0, W, H); X.globalAlpha = 1; }
    I.vig(ctx, '255,50,30', 0.55 * at(t, tH, tH + 0.3) * (0.5 + 0.5 * Math.sin(t * 12)));
    I.scrim(ctx, 1250, 1620);
    I.caption(ctx, t, 'l4', 0, 8, { y: 1390, size: 82, hl: [4, 5, 8] });
    I.caption(ctx, t, 'l4', 9, 15, { y: 1390, size: 90, hl: [9, 10, 11, 14, 15], hold: 0.8 });
  }
});
