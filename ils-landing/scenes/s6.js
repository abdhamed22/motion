MOTION.scene({
  id: 's6',
  draw(t, lt, ctx) {
    const { X, P, W, H, at, wordTime } = ctx, I = window.ILS;
    I.sky(ctx, t, { hz: 0.9, stars: false, top: '#08111F', mid: '#0C1A2E', bot: '#0C1A2E' });
    X.strokeStyle = 'rgba(124,140,166,0.12)'; X.lineWidth = 2;
    for (let x = 0; x <= W; x += 90) { X.beginPath(); X.moveTo(x, 150); X.lineTo(x, 1220); X.stroke(); }
    for (let y = 150; y <= 1220; y += 90) { X.beginPath(); X.moveTo(0, y); X.lineTo(W, y); X.stroke(); }
    const gy = 1040, rx = 880;
    /* الأرض والمدرج */
    X.fillStyle = '#13213A'; X.fillRect(0, gy, W, 180);
    X.fillStyle = '#E8EEF7'; X.fillRect(300, gy - 6, 700, 12);
    X.strokeStyle = P.mut; X.lineWidth = 4; X.beginPath(); X.moveTo(0, gy); X.lineTo(W, gy); X.stroke();
    /* مسار الهبوط الصحيح */
    const wv = wordTime('l7', 2), wd = wordTime('l7', 3), wk = wordTime('l7', 4);
    const dr = at(lt, 0.1, 1.2, 'expoOut'), A = [rx, gy - 6], B = [90, 470];
    X.save(); X.strokeStyle = P.acc; X.lineWidth = 8; X.globalAlpha = 0.9; X.beginPath(); X.moveTo(A[0], A[1]); X.lineTo(A[0] + (B[0] - A[0]) * dr, A[1] + (B[1] - A[1]) * dr); X.stroke(); X.restore();
    /* المروحة العمودية */
    X.save(); const g2 = X.createLinearGradient(0, 380, 0, gy); g2.addColorStop(0, 'rgba(255,180,58,0.0)'); g2.addColorStop(1, 'rgba(255,180,58,0.22)');
    X.fillStyle = g2; X.globalAlpha = dr; X.beginPath(); X.moveTo(A[0], A[1]); X.lineTo(B[0], B[1] - 90); X.lineTo(B[0], B[1] + 90); X.closePath(); X.fill(); X.restore();
    /* الطائرة تنزل من فوق المسار وتنطبق عليه */
    const slide = at(lt, 0.0, 2.7, 'sineInOut'), pxx = 250 + 480 * slide;
    const pathY = x => A[1] + (B[1] - A[1]) * ((x - A[0]) / (B[0] - A[0]));
    const off = 230 * (1 - at(t, wordTime('l7', 0).s + 0.3, wv.s + 0.1, 'cubicInOut'));
    const py = pathY(pxx) - 58 - off;
    I.planeSide(X, pxx, py, 1.35, 0.2, '#EEF2F8', 1, P.acc);
    /* سهم عمودي */
    const ar = at(t, wordTime('l7', 0).s, wordTime('l7', 0).s + 0.35, 'expoOut') * (1 - at(t, wv.s, wv.s + 0.4));
    if (ar > 0.01) {
      X.save(); X.globalAlpha = ar; X.strokeStyle = P.acc; X.fillStyle = P.acc; X.lineWidth = 10; X.lineCap = 'round'; const ax = pxx, sh = Math.sin(lt * 9) * 10;
      X.beginPath(); X.moveTo(ax, py - 160 + sh); X.lineTo(ax, py - 20 + sh); X.stroke();
      X.beginPath(); X.moveTo(ax, py + 10 + sh); X.lineTo(ax - 24, py - 28 + sh); X.lineTo(ax + 24, py - 28 + sh); X.closePath(); X.fill(); X.restore();
    }
    I.check(X, pxx + 6, py - 110, 44, at(t, wk.s + 0.1, wk.s + 0.5), P.acc, 14);
    I.scrim(ctx, 1180, 1560);
    I.caption(ctx, t, 'l7', 0, 4, { y: 1350, size: 92, hl: [0, 3, 4], hold: 0.7 });
  }
});
