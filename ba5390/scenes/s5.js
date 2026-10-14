MOTION.scene({
  id: 's5',
  draw(t, lt, ctx) {
    const { X, P, W, H, at, wordTime } = ctx, I = window.ILS, wt = i => wordTime('l5', i);
    I.sky(ctx, t, { hz: 0.9, stars: false, top: '#08111F', mid: '#0C1A2E', bot: '#0C1A2E' });
    X.strokeStyle = 'rgba(124,140,166,0.10)'; X.lineWidth = 2;
    for (let x = 0; x <= W; x += 90) { X.beginPath(); X.moveTo(x, 150); X.lineTo(x, 1220); X.stroke(); } for (let y = 150; y <= 1220; y += 90) { X.beginPath(); X.moveTo(0, y); X.lineTo(W, y); X.stroke(); }
    const e1 = at(t, wt(4).s - 0.25, wt(4).s + 0.1, 'cubicInOut'), e2 = at(t, wt(7).s - 0.3, wt(7).s + 0.1, 'cubicInOut');
    /* أ: ساعة: دقائق الرعب */
    if (e1 < 1) {
      X.save(); X.globalAlpha = 1 - e1; const k = at(lt, 0, 0.5, 'expoOut'); X.translate(540, 640); X.scale(0.94 + 0.06 * k, 0.94 + 0.06 * k);
      X.strokeStyle = P.ink; X.lineWidth = 16; X.beginPath(); X.arc(0, 0, 300, 0, 6.283); X.stroke();
      for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; X.lineWidth = 10; X.beginPath(); X.moveTo(Math.sin(a) * 262, -Math.cos(a) * 262); X.lineTo(Math.sin(a) * 288, -Math.cos(a) * 288); X.stroke(); }
      const ang = lt * 3.6; X.strokeStyle = P.acc; X.lineWidth = 18; X.lineCap = 'round'; X.beginPath(); X.moveTo(0, 0); X.lineTo(Math.sin(ang) * 230, -Math.cos(ang) * 230); X.stroke();
      X.strokeStyle = P.ink; X.lineWidth = 18; X.beginPath(); X.moveTo(0, 0); X.lineTo(Math.sin(ang / 12) * 150, -Math.cos(ang / 12) * 150); X.stroke(); X.fillStyle = P.acc; X.beginPath(); X.arc(0, 0, 18, 0, 6.283); X.fill();
      X.restore();
      const rk = at(t, wt(3).s, wt(3).s + 0.15) * (1 - at(t, wt(3).s + 0.2, wt(3).s + 0.9)); if (rk > 0) { const g = X.createRadialGradient(540, 960, 300, 540, 960, 1000); g.addColorStop(0, 'rgba(255,180,58,0)'); g.addColorStop(1, `rgba(255,180,58,${0.55 * rk})`); X.fillStyle = g; X.fillRect(0, 0, W, H); }
    }
    /* ب: هبوط بسلام */
    if (e1 > 0 && e2 < 1) {
      X.save(); X.globalAlpha = e1 * (1 - e2); const gy = 1000, A = [120, 420], B = [620, gy - 8];
      X.fillStyle = '#13213A'; X.fillRect(0, gy, W, 200); X.fillStyle = '#E8EEF7'; X.fillRect(100, gy - 6, 880, 12);
      const pr = at(t, wt(4).s, wt(6).s + 0.1, 'sineOut'), lx = A[0] + (B[0] - A[0]) * pr + Math.max(0, (t - wt(6).s)) * 260, ly = A[1] + (B[1] - A[1]) * pr;
      I.planeSide(X, Math.min(lx, 900), ly - 56 + 0, 1.5, 0.12 * (1 - pr), '#EEF2F8', 1, P.acc);
      const c = at(t, wt(6).s, wt(6).s + 0.5); if (c > 0) { X.beginPath(); X.arc(540, 520, 90, 0, 6.283); X.fillStyle = P.acc; X.fill(); I.check(X, 540, 525, 44, c, '#0A1424', 22); }
      X.restore();
    }
    /* ج: 87 شخصاً نجوا */
    if (e2 > 0) {
      X.save(); X.globalAlpha = e2; const cols = 12, gx = 540 - (cols - 1) * 36, gy0 = 560;
      for (let i = 0; i < 87; i++) { const c = i % cols, r = Math.floor(i / cols), on = at(t, wt(7).s + 0.05 + i * 0.026, wt(7).s + 0.3 + i * 0.026, 'expoOut'); X.save(); X.translate(gx + c * 72, gy0 + r * 92); X.scale(0.34, 0.34); I.person(X, 0, 0, 1, on > 0.5 ? P.acc : '#27415F', 0, { noLegs: false }); X.restore(); }
      const nk = at(t, wt(14).s - 0.1, wt(14).s + 0.4, 'expoOut'), n = Math.round(87 * at(t, wt(14).s, wt(14).s + 0.9, 'cubicOut'));
      if (nk > 0) { X.globalAlpha = e2 * nk; ctx.text(X, ctx.num(n), 700, 420, { family: 'num', weight: 900, size: 220 * (0.95 + 0.05 * nk), color: P.acc, dir: 'ltr' }); ctx.text(X, 'شخصًا', 360, 410, { family: 'display', size: 100, color: P.ink, alpha: at(t, wt(15).s - 0.05, wt(15).s + 0.3) }); }
      X.restore();
    }
    I.scrim(ctx, 1230, 1600);
    I.caption(ctx, t, 'l5', 0, 3, { y: 1370, size: 92, hl: [1, 3] });
    I.caption(ctx, t, 'l5', 4, 6, { y: 1370, size: 100, hl: [6] });
    I.caption(ctx, t, 'l5', 7, 15, { y: 1370, size: 84, hl: [8, 14, 15], hold: 0.8 });
  }
});
