MOTION.scene({
  id: 's3',
  draw(t, lt, ctx) {
    const { X, P, W, H, at, wordTime, noise1 } = ctx, I = window.ILS, wt = i => wordTime('l3', i), r = ctx.rng('ice');
    I.sky(ctx, t, { hz: 0.9, stars: false, top: '#02040A', mid: '#07101C', bot: '#07101C' });
    const e1 = at(t, wt(5).s - 0.25, wt(5).s + 0.2, 'cubicInOut'), e2 = at(t, wt(10).s - 0.2, wt(10).s + 0.2, 'cubicInOut'), e3 = at(t, wt(13).s - 0.2, wt(13).s + 0.2, 'cubicInOut');
    /* أ: ليل وسحب فوق المحيط */
    if (e1 < 1) {
      X.save(); X.globalAlpha = 1 - e1;
      for (let i = 0; i < 14; i++) { const sp = 30 + r() * 40, y = 300 + r() * 600, w = 200 + r() * 260, x = ((r() * 1500 - lt * sp) % 1600 + 1600) % 1600 - 250; X.globalAlpha = (1 - e1) * (0.18 + 0.1 * r()); X.fillStyle = '#3A4A66'; X.beginPath(); X.ellipse(x, y, w, 60, 0, 0, 6.283); X.fill(); }
      X.globalAlpha = 1 - e1; I.planeSide(X, 540 + 30 * Math.sin(lt * 0.8), 620, 1.5, 0.02, '#C9D3E0', 1, P.acc); X.restore();
    }
    /* ب: مجسّ السرعة يتجمّد */
    if (e1 > 0 && e2 < 1) {
      X.save(); X.globalAlpha = e1 * (1 - e2); X.translate(540, 640);
      X.fillStyle = '#9AA9BD'; X.beginPath(); X.roundRect(-340, -26, 520, 52, 26); X.fill(); X.fillStyle = '#C7D2E1'; X.beginPath(); X.roundRect(-340, -26, 520, 20, 10); X.fill(); X.fillStyle = '#6D7C93'; X.fillRect(180, -80, 90, 160);
      const ice = at(t, wt(5).s, wt(7).e, 'cubicOut');
      for (let i = 0; i < 60; i++) { const a = r() * 6.283, d = 20 + r() * 90, x = -330 + r() * 120 * ice + Math.cos(a) * d * ice * 0.4, y = Math.sin(a) * 40 * (0.4 + 0.6 * r()); if (r() > ice) continue; X.fillStyle = `rgba(220,245,255,${0.5 + 0.4 * r()})`; X.beginPath(); X.moveTo(x, y - 14 * ice); X.lineTo(x + 8 * ice, y); X.lineTo(x, y + 14 * ice); X.lineTo(x - 8 * ice, y); X.closePath(); X.fill(); }
      X.fillStyle = `rgba(210,240,255,${0.65 * ice})`; X.beginPath(); X.ellipse(-300, 0, 70 * ice, 36, 0, 0, 6.283); X.fill();
      X.restore();
    }
    /* ج: قراءات السرعة تضطرب */
    if (e2 > 0 && e3 < 1) {
      X.save(); X.globalAlpha = e2 * (1 - e3); const act = at(t, wt(9).s, wt(9).s + 0.4);
      const v = 0.55 + act * (0.3 * Math.sin(t * 9) + 0.2 * Math.sin(t * 23) + 0.15 * noise1(t * 6, 3));
      I.dial(X, 540, 650, 230, Math.max(0.05, Math.min(1, v)), P.hi, P.clay, 22);
      const fl = Math.abs(Math.sin((t - wt(9).s) * 9)) * act; if (fl > 0.6) { X.strokeStyle = P.clay; X.lineWidth = 8; X.beginPath(); X.arc(540, 650, 270, 0, 6.283); X.stroke(); }
      X.restore();
    }
    /* د: الطيار الآلي يتوقف */
    if (e3 > 0) {
      X.save(); X.globalAlpha = e3; X.translate(540, 650); const off = at(t, wt(13).s, wt(13).s + 0.6, 'cubicOut');
      X.fillStyle = off > 0.5 ? '#27415F' : P.acc; I.rr(X, -260, -90, 520, 180, 90); X.fill();
      X.fillStyle = '#F4F7FB'; X.beginPath(); X.arc(-170 + 340 * off, 0, 70, 0, 6.283); X.fill();
      ctx.text(X, 'الطيار الآلي', 0, 200, { family: 'display', size: 84, color: off > 0.5 ? P.mut : P.ink });
      X.restore();
    }
    I.vig(ctx, '0,0,0', 0.4); I.scrim(ctx, 1260, 1620);
    I.caption(ctx, t, 'l3', 0, 4, { y: 1400, size: 88, hl: [1, 4] });
    I.caption(ctx, t, 'l3', 5, 8, { y: 1400, size: 90, hl: [5, 6, 8] });
    I.caption(ctx, t, 'l3', 9, 12, { y: 1400, size: 90, hl: [10, 12] });
    I.caption(ctx, t, 'l3', 13, 17, { y: 1400, size: 90, hl: [14, 15, 17], hold: 0.9 });
  }
});
