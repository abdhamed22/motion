MOTION.scene({
  id: 's3',
  draw(t, lt, ctx) {
    const { X, P, W, H, at, wordTime, noise1 } = ctx, I = window.ILS, wt = i => wordTime('l3', i);
    I.sky(ctx, t, { hz: 0.8, stars: true, top: '#05080F', mid: '#1B1626', bot: '#0A0F1A' });
    const gy = 1010; X.fillStyle = '#0B1220'; X.fillRect(0, gy, W, 260); X.fillStyle = '#E8EEF7'; X.fillRect(0, gy - 6, 640, 12);
    const roll = at(lt, 0.0, wt(5).s - wordTime('l3', 0).s - 0.1, 'sineIn'), lift = at(t, wt(5).s - 0.2, wt(5).s + 2.4, 'sineInOut');
    const px = 90 + 420 * roll + 360 * lift, py = gy - 56 - 480 * lift, ang = -0.30 * lift;
    X.strokeStyle = P.hi; X.lineWidth = 5; X.globalAlpha = 0.5 * lift; X.setLineDash([20, 16]); X.beginPath(); X.moveTo(90 + 420, gy - 56); X.lineTo(px, py + 20); X.stroke(); X.setLineDash([]); X.globalAlpha = 1;
    I.planeSide(X, px, py, 1.3, ang, '#EEF2F8', 1, P.acc);
    /* ساعة: دقائق */
    const ck = at(t, wt(2).s - 0.1, wt(2).s + 0.4, 'expoOut') * (1 - at(t, wt(6).s - 0.2, wt(6).s));
    if (ck > 0.01) { X.save(); X.globalAlpha = ck; X.translate(820, 380); X.strokeStyle = P.ink; X.lineWidth = 12; X.beginPath(); X.arc(0, 0, 110, 0, 6.283); X.stroke(); const a = (t - wt(2).s) * 3.2; X.strokeStyle = P.acc; X.lineWidth = 12; X.lineCap = 'round'; X.beginPath(); X.moveTo(0, 0); X.lineTo(Math.sin(a) * 80, -Math.cos(a) * 80); X.stroke(); X.restore(); }
    /* ما لم يكن في الحسبان */
    const al = at(t, wt(6).s, wt(11).s + 0.4, 'quadIn'), fl = (Math.sin((t - wt(6).s) * (8 + 10 * al)) > 0.3 ? 1 : 0.3) * al;
    I.vig(ctx, '255,50,30', 0.55 * fl);
    const ex = at(t, wt(11).s - 0.05, wt(11).s + 0.3, 'expoOut'); if (ex > 0) { ctx.text(X, '!', 540, 700, { family: 'display', size: 420 * (0.9 + 0.1 * ex), color: P.clay, alpha: ex * (0.7 + 0.3 * Math.sin(t * 20)) }); }
    I.scrim(ctx, 1230, 1600);
    I.caption(ctx, t, 'l3', 0, 5, { y: 1370, size: 88, hl: [2, 5] });
    I.caption(ctx, t, 'l3', 6, 11, { y: 1370, size: 92, hl: [8, 9, 11], hold: 0.8 });
  }
});
