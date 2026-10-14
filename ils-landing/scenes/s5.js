MOTION.scene({
  id: 's5',
  draw(t, lt, ctx) {
    const { X, P, W, H, at, wordTime } = ctx, I = window.ILS;
    I.sky(ctx, t, { hz: 0.9, stars: false, top: '#08111F', mid: '#0C1A2E', bot: '#0C1A2E' });
    /* شبكة خفيفة */
    X.strokeStyle = 'rgba(124,140,166,0.12)'; X.lineWidth = 2;
    for (let x = 0; x <= W; x += 90) { X.beginPath(); X.moveTo(x, 150); X.lineTo(x, 1220); X.stroke(); }
    for (let y = 150; y <= 1220; y += 90) { X.beginPath(); X.moveTo(0, y); X.lineTo(W, y); X.stroke(); }
    const cx = 540, top = 260, bot = 1010;
    /* المدرج من فوق */
    X.fillStyle = '#1A2538'; X.fillRect(cx - 80, top, 160, bot - top);
    X.fillStyle = '#E8EEF7'; for (let y = top + 30; y < bot - 40; y += 70) X.fillRect(cx - 6, y, 12, 38);
    X.fillRect(cx - 80, top, 5, bot - top); X.fillRect(cx + 75, top, 5, bot - top);
    /* مروحة الإشارة الأفقية */
    const fan = at(lt, 0.1, 0.9, 'expoOut');
    X.save(); X.beginPath(); X.rect(0, top, W, (bot + 200 - top)); X.clip();
    const grd = X.createLinearGradient(0, top, 0, bot + 200); grd.addColorStop(0, 'rgba(39,195,216,0.55)'); grd.addColorStop(1, 'rgba(39,195,216,0.07)');
    X.fillStyle = grd; X.globalAlpha = fan; X.beginPath(); X.moveTo(cx - 14, top); X.lineTo(cx - 14 - 470 * fan, bot + 200); X.lineTo(cx + 14 + 470 * fan, bot + 200); X.lineTo(cx + 14, top); X.closePath(); X.fill();
    X.globalAlpha = fan; X.strokeStyle = P.clay; X.lineWidth = 5; X.beginPath(); X.moveTo(cx - 14, top); X.lineTo(cx - 14 - 470 * fan, bot + 200); X.moveTo(cx + 14, top); X.lineTo(cx + 14 + 470 * fan, bot + 200); X.stroke(); X.restore();
    /* خط المنتصف الممتد */
    const wl = wordTime('l6', 3), wm = wordTime('l6', 4), cl = at(t, wl.s - 0.05, wm.e, 'cubicOut');
    X.save(); X.strokeStyle = P.acc; X.lineWidth = 9; X.setLineDash([34, 24]); X.lineDashOffset = -lt * 120; X.globalAlpha = 0.25 + 0.75 * cl;
    X.beginPath(); X.moveTo(cx, top - 30); X.lineTo(cx, bot + 200); X.stroke(); X.restore();
    /* الطائرة تتجه أفقياً نحو الخط */
    const wh = wordTime('l6', 1), mv = at(t, wh.s, wordTime('l6', 3).s + 0.3, 'cubicInOut');
    const px = cx + 300 * (1 - mv), py = 1120 - 150 * at(lt, 0, 3.2, 'sineOut'), rot = 0.0 + 0.22 * Math.sin(Math.PI * mv) * -1;
    I.planeTop(X, px, py, 1.45, rot, '#EEF2F8');
    /* سهم أفقي */
    const ar = at(t, wh.s - 0.05, wh.s + 0.3, 'expoOut') * (1 - at(t, wh.e + 0.5, wh.e + 1.0));
    if (ar > 0.01) {
      X.save(); X.globalAlpha = ar; X.strokeStyle = P.acc; X.fillStyle = P.acc; X.lineWidth = 10; X.lineCap = 'round';
      const ay = py - 150, sh = Math.sin(lt * 9) * 12;
      X.beginPath(); X.moveTo(cx - 170 + sh, ay); X.lineTo(cx + 170 + sh, ay); X.stroke();
      for (const s of [-1, 1]) { X.beginPath(); X.moveTo(cx + s * 170 + sh, ay); X.lineTo(cx + s * 140 + sh, ay - 24); X.lineTo(cx + s * 140 + sh, ay + 24); X.closePath(); X.fill(); }
      X.restore();
    }
    if (cl > 0.8) I.check(X, cx + 170, 300, 46, at(t, wm.s + 0.25, wm.s + 0.6), P.acc, 14);
    I.scrim(ctx, 1180, 1560);
    I.caption(ctx, t, 'l6', 0, 2, { y: 1350, size: 96, hl: [1] });
    I.caption(ctx, t, 'l6', 3, 4, { y: 1350, size: 96, hl: [3, 4], hold: 0.7 });
  }
});
