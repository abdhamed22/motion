MOTION.scene({
  id: 's3',
  draw(t, lt, ctx) {
    const { X, P, W, H, at, wordTime, noise1 } = ctx, I = window.ILS, wt = i => wordTime('l3', i), r = ctx.rng('p');
    const tD = wt(1).s, tP = wt(10).s, shk = t > tD ? 5 * Math.exp(-(t - tD) * 0.6) + 2 : 0;
    I.sky(ctx, t, { hz: 0.9, stars: false, top: '#0B3A78', mid: '#2F6FB5', bot: '#9CC6EE' });
    X.save(); X.translate(noise1(t * 40, 4) * shk, noise1(t * 40, 5) * shk);
    /* سحب تمر بسرعة */
    for (let i = 0; i < 14; i++) { const sp = 380 + r() * 500, y = 220 + r() * 800, w = 200 + r() * 260, x = ((r() * 1500 - lt * sp) % 1600 + 1600) % 1600 - 250; X.globalAlpha = 0.25; X.fillStyle = '#FFFFFF'; X.beginPath(); X.ellipse(x, y, w, 18, 0, 0, 6.283); X.fill(); } X.globalAlpha = 1;
    /* مقدمة الطائرة جانبياً (الأنف يمين) */
    const body = () => { X.beginPath(); X.moveTo(-60, 560); X.lineTo(700, 560); X.quadraticCurveTo(1010, 570, 1090, 720); X.quadraticCurveTo(1010, 880, 700, 890); X.lineTo(-60, 890); X.closePath(); };
    X.fillStyle = '#E8EEF7'; body(); X.fill(); X.fillStyle = P.acc; X.fillRect(-60, 830, 1000, 14);
    X.fillStyle = '#0E1B2E'; for (let i = 0; i < 6; i++) { X.beginPath(); X.roundRect(60 + i * 90, 660, 52, 70, 22); X.fill(); }
    /* نافذة القمرة */
    const hx = 800, hy = 620;
    X.fillStyle = '#0E1B2E'; X.beginPath(); X.roundRect(hx - 80, hy - 40, 170, 120, 26); X.fill();
    const dk = at(t, tD, tD + 1.0, 'cubicIn');
    if (t < tD + 1.0) { X.save(); X.globalAlpha = 1 - dk; X.translate(hx + 5 + 380 * dk, hy + 20 - 520 * dk); X.rotate(1.6 * dk); X.fillStyle = 'rgba(160,205,245,0.9)'; X.strokeStyle = '#F4F7FB'; X.lineWidth = 5; X.beginPath(); X.roundRect(-80, -55, 160, 110, 22); X.fill(); X.stroke(); X.restore(); }
    else { X.fillStyle = '#9CC6EE'; X.beginPath(); X.roundRect(hx - 70, hy - 32, 150, 104, 22); X.fill(); }
    /* هواء + أغراض تُسحب للثقب بعنف */
    const w5 = wt(5).s;
    if (t > w5 - 0.1) for (let i = 0; i < 26; i++) {
      const ph = ((t - w5) * 0.9 + r() * 3) % 1.0, a = (r() * 1.4 + 0.1) * Math.PI, sx = hx - 80 - r() * 520, sy = 640 + (r() - 0.5) * 220;
      const k = ph ** 1.6, x = sx + (hx - sx) * k + 380 * Math.max(0, ph - 0.85) * 4, y = sy + (hy + 20 - sy) * k - 120 * Math.max(0, ph - 0.85) * 4;
      X.save(); X.globalAlpha = Math.min(1, (t - w5 + 0.1) * 3) * (1 - Math.max(0, ph - 0.9) * 10); X.translate(x, y); X.rotate(a + ph * 8); X.fillStyle = i % 3 ? '#FFFFFF' : P.acc; X.fillRect(-14, -9, 28, 18); X.restore();
    }
    /* ساق/جسم القبطان خارجاً جزئيًا */
    if (t > tP - 0.2) {
      const k = at(t, tP, tP + 1.0, 'expoOut'), fl = Math.sin(t * 30) * 0.05;
      X.save(); X.beginPath(); X.rect(-100, 0, 1300, 565); X.rect(hx - 70, hy - 32, 150, 120); X.clip();
      I.person(X, hx + 5 - 60 * k, hy - 30 - 40 * k, 1.5, '#0B1B33', -1.25 + fl, { armL: [-55, -35], armR: [60, -40], noLegs: false });
      X.restore();
    }
    X.restore();
    /* خطوط رياح */
    X.strokeStyle = 'rgba(255,255,255,0.55)'; X.lineWidth = 5; X.lineCap = 'round';
    for (let i = 0; i < 10; i++) { const y = 300 + r() * 560, sp = 1.8 + r() * 1.2, x0 = ((1 - ((lt * sp + r() * 3) % 1)) * 1500) - 200; X.globalAlpha = at(t, tD, tD + 0.5) * 0.5; X.beginPath(); X.moveTo(x0, y); X.lineTo(x0 + 190, y); X.stroke(); } X.globalAlpha = 1;
    I.scrim(ctx, 1230, 1600);
    I.caption(ctx, t, 'l3', 0, 4, { y: 1370, size: 88, hl: [1] });
    I.caption(ctx, t, 'l3', 5, 9, { y: 1370, size: 88, hl: [5, 9] });
    I.caption(ctx, t, 'l3', 10, 14, { y: 1370, size: 90, hl: [10, 11, 12, 14], hold: 0.8 });
  }
});
