MOTION.scene({
  id: 's6',
  draw(t, lt, ctx) {
    const { X, P, W, H, at, wordTime, noise1 } = ctx, I = window.ILS, wt = i => wordTime('l6', i), r = ctx.rng('wf');
    I.sky(ctx, t, { hz: 0.9, stars: false, top: '#03060D', mid: '#08121F', bot: '#08121F' }); I.grid(ctx, 0.07);
    const e1 = at(t, wt(5).s - 0.3, wt(5).s + 0.15, 'cubicInOut'), e2 = at(t, wt(8).s - 0.3, wt(8).s + 0.15, 'cubicInOut');
    /* أ: الصندوق الأسود يُقرأ */
    if (e1 < 1) {
      X.save(); X.globalAlpha = 1 - e1; const k = at(lt, 0, 0.6, 'expoOut'); X.translate(540, 520); X.scale(0.92 + 0.08 * k, 0.92 + 0.08 * k);
      I.card(X, -180, -110, 360, 220, { fill: '#FF6A1A', r: 30 }); X.fillStyle = '#FFF2E0'; for (let i = 0; i < 3; i++) X.fillRect(-180, -56 + i * 56, 360, 14); X.fillStyle = '#0A0F18'; X.beginPath(); X.arc(0, 0, 40, 0, 6.283); X.fill();
      X.strokeStyle = P.hi; X.lineWidth = 6; X.beginPath(); for (let x = -420; x <= 420; x += 12) { const y = 260 + Math.sin(x * 0.06 + lt * 7) * (30 + 30 * noise1(x * 0.02 + lt, 2)); x > -420 ? X.lineTo(x, y) : X.moveTo(x, y); } X.stroke();
      X.restore();
    }
    /* ب: بدأت بمجسّات متجمّدة ← انتهت بطائرة تسقط */
    if (e1 > 0 && e2 < 1) {
      X.save(); X.globalAlpha = e1 * (1 - e2);
      const pk = at(t, wt(5).s - 0.05, wt(5).s + 0.5, 'expoOut'); X.save(); X.globalAlpha *= pk; X.translate(300, 600); X.fillStyle = '#9AA9BD'; X.beginPath(); X.roundRect(-150, -20, 300, 40, 20); X.fill(); X.fillStyle = 'rgba(210,240,255,0.8)'; X.beginPath(); X.ellipse(-130, 0, 50, 30, 0, 0, 6.283); X.fill(); X.restore();
      const ak = at(t, wt(7).s - 0.1, wt(7).s + 0.5, 'cubicOut'); X.strokeStyle = P.acc; X.lineWidth = 12; X.lineCap = 'round'; X.beginPath(); X.moveTo(480, 600); X.lineTo(480 + 150 * ak, 600); X.stroke(); if (ak > 0.9) { X.fillStyle = P.acc; X.beginPath(); X.moveTo(650, 600); X.lineTo(620, 575); X.lineTo(620, 625); X.fill(); }
      const fk = at(t, wt(7).s + 0.2, wt(7).s + 0.7, 'expoOut'); X.save(); X.globalAlpha *= fk; I.planeSide(X, 800, 560 + 140 * fk, 0.9, 0.9, '#C9D3E0', 1, P.acc); X.restore();
      X.restore();
    }
    /* ج: طيارون لم يفهموا الموقف */
    if (e2 > 0) {
      X.save(); X.globalAlpha = e2;
      for (const [x, d] of [[340, 0], [740, 0.3]]) { X.save(); X.translate(x, 700); I.person(X, 0, 0, 2.3, P.ink, 0, { noLegs: true }); const q = at(t, wt(9).s + d, wt(9).s + d + 0.4, 'expoOut'); X.globalAlpha *= q; ctx.text(X, '؟', 20, -230 - 20 * q, { family: 'display', size: 170, color: P.acc }); X.restore(); }
      const ck = at(t, wt(16).s - 0.1, wt(16).s + 0.4, 'expoOut'); if (ck > 0) { X.save(); X.globalAlpha = e2 * ck; X.translate(540, 1030); X.strokeStyle = P.ink; X.lineWidth = 9; X.beginPath(); X.arc(0, 0, 80, 0, 6.283); X.stroke(); const a = (t - wt(16).s) * 5; X.strokeStyle = P.clay; X.lineCap = 'round'; X.beginPath(); X.moveTo(0, 0); X.lineTo(Math.sin(a) * 58, -Math.cos(a) * 58); X.stroke(); X.restore(); }
      X.restore();
    }
    I.vig(ctx, '0,0,0', 0.4); I.scrim(ctx, 1260, 1620);
    I.caption(ctx, t, 'l6', 0, 4, { y: 1400, size: 90, hl: [1, 3] });
    I.caption(ctx, t, 'l6', 5, 7, { y: 1400, size: 92, hl: [5, 6, 7] });
    I.caption(ctx, t, 'l6', 8, 17, { y: 1400, size: 84, hl: [8, 12, 17], hold: 0.9 });
  }
});
