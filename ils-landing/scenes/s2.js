MOTION.scene({
  id: 's2',
  draw(t, lt, ctx) {
    const { X, P, W, H, at, wordTime, noise1 } = ctx, I = window.ILS;
    I.sky(ctx, t, { hz: 0.62 });
    const wi = wordTime('l2', 5);
    const hit = Math.max(0, t - wi.s), shake = hit > 0 ? Math.sin(hit * 70) * 10 * Math.exp(-hit * 7) : 0;
    X.save(); X.translate(shake, shake * 0.4);
    const q = at(lt, 0, 0.7, 'expoOut');
    ctx.text(X, '؟', 540, 900, { family: 'display', size: 900 * (0.94 + 0.06 * q), color: P.mut, alpha: 0.11 * q });
    /* الأرض */
    const gy = 1110, ter = x => gy + noise1(x * 0.0035, 5) * 34 + (x / W) * 36;
    X.fillStyle = '#0A1423'; X.beginPath(); X.moveTo(0, H); for (let x = 0; x <= W; x += 20) X.lineTo(x, ter(x)); X.lineTo(W, H); X.closePath(); X.fill();
    X.strokeStyle = P.mut; X.lineWidth = 4; X.beginPath(); for (let x = 0; x <= W; x += 20) x ? X.lineTo(x, ter(x)) : X.moveTo(x, ter(x)); X.stroke();
    /* مسار النزول: خط متقطّع */
    const A = [110, 360], B = [800, 1040], p = at(lt, 0.15, 3.05, 'sineInOut');
    X.save(); X.strokeStyle = P.clay; X.lineWidth = 6; X.setLineDash([26, 20]); X.lineDashOffset = -lt * 70; X.globalAlpha = 0.9;
    X.beginPath(); X.moveTo(A[0], A[1]); X.lineTo(A[0] + (B[0] - A[0]) * Math.min(1, p + 0.18), A[1] + (B[1] - A[1]) * Math.min(1, p + 0.18)); X.stroke(); X.restore();
    const px = A[0] + (B[0] - A[0]) * p, py = A[1] + (B[1] - A[1]) * p, ang = Math.atan2(B[1] - A[1], B[0] - A[0]);
    /* مسح بحث الطيار: أقواس تتوسع أمام الأنف */
    for (let i = 0; i < 3; i++) {
      const k = ((lt * 0.9 + i / 3) % 1);
      X.save(); X.translate(px + 78, py + 10); X.rotate(ang); X.globalAlpha = (1 - k) * 0.7 * at(lt, 0.2, 0.6); X.strokeStyle = P.hi; X.lineWidth = 5;
      X.beginPath(); X.arc(0, 0, 50 + k * 260, -0.5, 0.5); X.stroke(); X.restore();
    }
    I.planeSide(X, px, py, 1.9, ang, '#EEF2F8', 1, P.acc);
    /* لحظة الاصطدام المحتمل */
    if (hit > 0) {
      const r = 40 + 300 * at(t, wi.s, wi.s + 0.9, 'expoOut');
      X.globalAlpha = 1 - at(t, wi.s + 0.15, wi.s + 1.0); X.strokeStyle = P.acc; X.lineWidth = 12; X.beginPath(); X.arc(B[0] + 20, ter(B[0]) - 8, r, 0, 6.283); X.stroke(); X.globalAlpha = 1;
    }
    X.restore();
    I.scrim(ctx, 1180, 1560);
    I.caption(ctx, t, 'l2', 0, 2, { y: 1350, size: 96 });
    I.caption(ctx, t, 'l2', 3, 5, { y: 1350, size: 96, hl: [5], hold: 0.9 });
  }
});
