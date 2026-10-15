MOTION.scene({
  id: 's4',
  draw(t, lt, ctx) {
    const { X, P, W, H, at, wordTime, noise1 } = ctx, I = window.ILS, wt = i => wordTime('l4', i), r = ctx.rng('deb');
    const tH = wt(1).s + 0.35, hit = Math.max(0, t - tH), shk = t > tH ? 14 * Math.exp(-hit * 2.2) : 0;
    I.sky(ctx, t, { hz: 0.8, stars: true, top: '#05080F', mid: '#1B1626', bot: '#0A0F1A' });
    X.save(); X.translate(noise1(t * 50, 1) * shk, noise1(t * 50, 2) * shk);
    const gy = 1060; X.fillStyle = '#0B1220'; X.fillRect(0, gy, W, 200);
    const pk = at(t, tH, tH + 3.0, 'sineIn'), px = 560 + 60 * lt * 0.1, py = 540 + 40 * Math.sin(lt * 1.2) + 260 * pk * (t > tH ? 1 : 0), ang = t > tH ? 0.12 + 0.3 * pk : 0;
    /* صاروخ من الأرض */
    const lk = at(t, wt(0).s, tH, 'cubicIn'), L0 = [150, gy], T0 = [px + 20, py + 60], mx = L0[0] + (T0[0] - L0[0]) * lk, my = L0[1] + (T0[1] - L0[1]) * lk;
    if (t < tH + 0.02) {
      X.strokeStyle = 'rgba(220,230,245,0.55)'; X.lineWidth = 12; X.lineCap = 'round'; X.beginPath(); X.moveTo(L0[0], L0[1]); X.lineTo(mx, my); X.stroke();
      const a = Math.atan2(T0[1] - L0[1], T0[0] - L0[0]); X.save(); X.translate(mx, my); X.rotate(a); X.fillStyle = P.ink; X.fillRect(-60, -7, 70, 14); X.beginPath(); X.moveTo(10, -7); X.lineTo(34, 0); X.lineTo(10, 7); X.fill(); X.fillStyle = P.clay; X.beginPath(); X.moveTo(-60, -9); X.lineTo(-110, 0); X.lineTo(-60, 9); X.fill(); X.restore();
      /* شبكة التتبع */
      const rt = at(t, wt(0).s + 0.1, tH, 'cubicIn'), rr = 220 - 130 * rt; X.strokeStyle = P.clay; X.lineWidth = 6; X.beginPath(); X.arc(px, py, rr, 0, 6.283); X.stroke(); X.beginPath(); X.moveTo(px - rr - 30, py); X.lineTo(px - rr + 30, py); X.moveTo(px + rr - 30, py); X.lineTo(px + rr + 30, py); X.moveTo(px, py - rr - 30); X.lineTo(px, py - rr + 30); X.moveTo(px, py + rr - 30); X.lineTo(px, py + rr + 30); X.stroke();
    }
    I.planeSide(X, px, py, 1.5, ang, '#EEF2F8', 1, P.acc);
    if (t > tH) {
      const e = at(t, tH, tH + 0.9, 'expoOut'); X.globalAlpha = 1 - at(t, tH + 0.2, tH + 1.0); X.strokeStyle = P.hi; X.lineWidth = 14; X.beginPath(); X.arc(px + 20, py + 55, 40 + 340 * e, 0, 6.283); X.stroke(); X.globalAlpha = 1;
      for (let i = 0; i < 18; i++) { const a = r() * 6.283, v = 200 + r() * 520; X.globalAlpha = 1 - at(t, tH + 0.4, tH + 1.6); X.fillStyle = i % 3 ? P.clay : P.acc; X.save(); X.translate(px + 20 + Math.cos(a) * v * hit, py + 55 + Math.sin(a) * v * hit + 400 * hit * hit); X.rotate(a * 5 + hit * 12); X.fillRect(-10, -5, 20, 10); X.restore(); } X.globalAlpha = 1;
      const g = X.createRadialGradient(px + 20, py + 55, 0, px + 20, py + 55, 160); g.addColorStop(0, 'rgba(255,230,180,0.9)'); g.addColorStop(1, 'rgba(255,90,54,0)'); X.globalAlpha = (1 - at(t, tH, tH + 0.45)); X.fillStyle = g; X.fillRect(0, 0, W, H); X.globalAlpha = 1;
    }
    X.restore();
    const fl = at(t, tH, tH + 0.04) * (1 - at(t, tH + 0.04, tH + 0.35)); if (fl > 0) { X.globalAlpha = 0.8 * fl; X.fillStyle = '#FFFFFF'; X.fillRect(0, 0, W, H); X.globalAlpha = 1; }
    /* ارتفاع نحو 8 آلاف قدم */
    const ak = at(t, wt(7).s - 0.1, wt(7).s + 0.4, 'expoOut'); if (ak > 0) { X.save(); X.globalAlpha = ak; I.card(X, 700, 330, 300, 200, { fill: 'rgba(7,11,20,0.9)', stroke: P.acc, lw: 5, r: 30 }); ctx.text(X, '8', 850, 470, { family: 'num', weight: 900, size: 170, color: P.acc, dir: 'ltr' }); X.restore(); }
    const bk = at(t, wt(8).s - 0.05, wt(8).s + 0.35); if (bk > 0) ctx.text(X, 'آلاف قدم', 850, 560, { family: 'display', size: 64, color: P.ink, alpha: bk });
    I.scrim(ctx, 1230, 1600);
    I.caption(ctx, t, 'l4', 0, 3, { y: 1370, size: 92, hl: [0, 1, 2] });
    I.caption(ctx, t, 'l4', 4, 9, { y: 1370, size: 90, hl: [7, 8, 9], hold: 0.8 });
  }
});
