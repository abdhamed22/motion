MOTION.scene({
  id: 's10',
  setup(ctx) {
    /* مسار الإلغاء: يصعد، يلف، ويرجع لبداية الاقتراب */
    const P0 = [496, 760], P1 = [700, 560], P2 = [960, 420], P3 = [900, 260], P4 = [640, 230], P5 = [300, 250], P6 = [120, 340], P7 = [150, 520];
    const bez = (a, b, c, d, u) => [0, 1].map(i => (1 - u) ** 3 * a[i] + 3 * (1 - u) ** 2 * u * b[i] + 3 * (1 - u) * u * u * c[i] + u ** 3 * d[i]);
    const pts = [];
    for (let i = 0; i <= 60; i++) pts.push(bez(P0, P1, P2, P3, i / 60));
    for (let i = 1; i <= 50; i++) pts.push(bez(P3, [850, 210], [760, 220], P4, i / 50));
    for (let i = 1; i <= 60; i++) pts.push(bez(P4, [520, 240], [380, 240], P6, i / 60));
    for (let i = 1; i <= 30; i++) pts.push(bez(P6, [90, 390], [110, 470], P7, i / 30));
    this.pts = pts;
  },
  draw(t, lt, ctx) {
    const { X, P, W, H, at, wordTime } = ctx, I = window.ILS, wt = i => wordTime('l11', i);
    I.sky(ctx, t, { hz: 0.9, stars: false, top: '#08111F', mid: '#0C1A2E', bot: '#0C1A2E' });
    X.strokeStyle = 'rgba(124,140,166,0.12)'; X.lineWidth = 2;
    for (let x = 0; x <= W; x += 90) { X.beginPath(); X.moveTo(x, 150); X.lineTo(x, 1220); X.stroke(); } for (let y = 150; y <= 1220; y += 90) { X.beginPath(); X.moveTo(0, y); X.lineTo(W, y); X.stroke(); }
    const gy = 1040, A = [880, gy - 6], B = [90, 470];
    X.fillStyle = '#13213A'; X.fillRect(0, gy, W, 200); X.fillStyle = '#E8EEF7'; X.fillRect(300, gy - 6, 700, 12);
    X.strokeStyle = P.acc; X.globalAlpha = 0.35; X.lineWidth = 6; X.beginPath(); X.moveTo(A[0], A[1]); X.lineTo(B[0], B[1]); X.stroke(); X.globalAlpha = 1;
    X.strokeStyle = P.hi; X.globalAlpha = 0.6; X.lineWidth = 5; X.setLineDash([30, 20]); X.beginPath(); X.moveTo(110, 760); X.lineTo(950, 760); X.stroke(); X.setLineDash([]); X.globalAlpha = 1;
    /* حركة الطائرة على مسار الإلغاء */
    const u = at(t, wt(2).s - 0.15, wt(5).s + 0.75, 'sineInOut'), n = this.pts.length - 1, f = u * n, i0 = Math.min(n - 1, Math.floor(f)), q = f - i0;
    const a = this.pts[i0], b = this.pts[i0 + 1], px = a[0] + (b[0] - a[0]) * q, py = a[1] + (b[1] - a[1]) * q, dx = b[0] - a[0], dy = b[1] - a[1];
    const cnt = Math.floor(f);
    X.save(); X.strokeStyle = P.clay; X.lineWidth = 8; X.lineCap = 'round'; X.setLineDash([26, 18]); X.lineDashOffset = -lt * 80;
    X.beginPath(); X.moveTo(this.pts[0][0], this.pts[0][1]); for (let k = 1; k <= cnt; k++) X.lineTo(this.pts[k][0], this.pts[k][1]); X.lineTo(px, py); X.stroke(); X.restore();
    const hold0 = at(lt, 0, 0.35, 'expoOut');
    X.save(); X.translate(px, py); X.globalAlpha = hold0;
    const ang = u < 0.002 ? 0.2 : Math.atan2(dy, dx);
    if (dx < 0) { X.scale(-1, 1); I.planeSide(X, 0, 0, 1.35, Math.atan2(dy, -dx), '#EEF2F8', 1, P.acc); } else I.planeSide(X, 0, 0, 1.35, ang, '#EEF2F8', 1, P.acc);
    X.restore();
    /* ختم إلغاء الهبوط */
    const sk = at(t, wt(2).s, wt(2).s + 0.35, 'expoOut') * (1 - at(t, wt(4).s - 0.1, wt(4).s + 0.2));
    if (sk > 0.01) { X.save(); X.globalAlpha = sk; X.translate(540, 560); X.rotate(-0.06); I.card(X, -330, -75, 660, 150, { fill: 'rgba(10,20,36,0.92)', stroke: P.acc, lw: 8, r: 36 }); ctx.text(X, 'إلغاء الهبوط', 40, 34, { family: 'display', size: 100, color: P.acc }); I.cross(X, -245, 0, 34, at(t, wt(2).s + 0.1, wt(2).s + 0.5), P.acc, 14); X.restore(); }
    /* سهم دائري: المحاولة مجددًا */
    const rk = at(t, wt(4).s, wt(4).s + 0.5, 'expoOut'); if (rk > 0) {
      X.save(); X.globalAlpha = rk; X.translate(560, 560); X.strokeStyle = P.hi; X.fillStyle = P.hi; X.lineWidth = 14; X.lineCap = 'round';
      const a0 = -1.2 + lt * 0.0, sw = 4.6 * rk; X.beginPath(); X.arc(0, 0, 90, a0, a0 + sw); X.stroke();
      const ea = a0 + sw, ex = Math.cos(ea) * 90, ey = Math.sin(ea) * 90; X.save(); X.translate(ex, ey); X.rotate(ea + Math.PI / 2); X.beginPath(); X.moveTo(0, -26); X.lineTo(32, 6); X.lineTo(-32, 6); X.closePath(); X.fill(); X.restore(); X.restore();
    }
    I.scrim(ctx, 1200, 1580);
    I.caption(ctx, t, 'l11', 0, 3, { y: 1350, size: 96, hl: [2, 3] });
    I.caption(ctx, t, 'l11', 4, 5, { y: 1350, size: 104, hl: [4, 5], hold: 0.9 });
  }
});
