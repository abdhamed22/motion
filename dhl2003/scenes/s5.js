MOTION.scene({
  id: 's5',
  draw(t, lt, ctx) {
    const { X, P, W, H, at, wordTime, noise1 } = ctx, I = window.ILS, wt = i => wordTime('l5', i), r = ctx.rng('f');
    const tC = wt(6).s, shk = (t > wt(0).s ? 4 : 0) + (t > tC ? 12 * Math.exp(-(t - tC) * 1.5) : 0);
    I.sky(ctx, t, { hz: 0.8, stars: true, top: '#05080F', mid: '#2A1218', bot: '#0A0F1A' });
    X.save(); X.translate(noise1(t * 50, 3) * shk, noise1(t * 50, 4) * shk);
    /* جناح كبير مصاب */
    const g = X.createLinearGradient(100, 400, 1000, 900); g.addColorStop(0, '#9AA9BD'); g.addColorStop(1, '#E8EEF7');
    X.fillStyle = g; X.beginPath(); X.moveTo(1140, 360); X.lineTo(1140, 640); X.lineTo(460, 920); X.lineTo(330, 900); X.lineTo(520, 800); X.lineTo(380, 780); X.lineTo(150, 780); X.lineTo(120, 740); X.closePath(); X.fill();
    X.fillStyle = '#C7D2E1'; X.beginPath(); X.ellipse(660, 700, 150, 70, -0.38, 0, 6.283); X.fill();
    /* ألسنة مشتعلة: خطوط متدرجة تتجه للخلف (بلا أيقونة) */
    const f0 = at(t, wt(0).s - 0.05, wt(0).s + 0.5, 'expoOut');
    for (let i = 0; i < 26; i++) {
      const ph = ((t * (1.6 + r() * 1.4) + r() * 4) % 1), len = 160 + r() * 380, y0 = 760 + (r() - 0.5) * 70, x0 = 330 - ph * (len + 260), w = (1 - ph) * (16 + r() * 28) * f0;
      const lg = X.createLinearGradient(x0, 0, x0 + len, 0); lg.addColorStop(0, 'rgba(255,90,54,0)'); lg.addColorStop(0.5, 'rgba(255,140,50,0.85)'); lg.addColorStop(1, 'rgba(255,230,160,0.95)');
      X.fillStyle = lg; X.beginPath(); X.ellipse(x0 + len, y0 + noise1(t * 6 + i, 5) * 22, len, w, 0, 0, 6.283); X.fill();
    }
    /* دخان */
    for (let i = 0; i < 14; i++) { const ph = ((t * 0.5 + i / 14) % 1); X.globalAlpha = 0.5 * (1 - ph) * f0; X.fillStyle = '#10151F'; X.beginPath(); X.arc(260 - ph * 520, 740 - ph * 120 + noise1(i, 3) * 40, 60 + ph * 110, 0, 6.283); X.fill(); } X.globalAlpha = 1;
    /* تسرّب الوقود */
    const fk = at(t, wt(2).s, wt(2).s + 0.5);
    if (fk > 0) for (let i = 0; i < 34; i++) { const ph = ((t * 1.3 + r() * 2) % 1), x = 420 - ph * 520 + r() * 40, y = 840 + ph * ph * 360 + (r() - 0.5) * 60; X.globalAlpha = fk * (1 - ph); X.fillStyle = P.acc; X.beginPath(); X.ellipse(x, y, 8, 15, 0.3, 0, 6.283); X.fill(); } X.globalAlpha = 1;
    X.restore();
    const cv = at(t, tC, tC + 0.05) * (1 - at(t, tC + 0.05, tC + 0.5)); if (cv > 0) { X.globalAlpha = 0.7 * cv; X.fillStyle = '#FFFFFF'; X.fillRect(0, 0, W, H); X.globalAlpha = 1; }
    I.vig(ctx, '255,50,30', 0.25 + 0.5 * at(t, tC, tC + 0.6) * (0.6 + 0.4 * Math.sin(t * 14)));
    I.scrim(ctx, 1230, 1600);
    I.caption(ctx, t, 'l5', 0, 3, { y: 1370, size: 92, hl: [0, 1, 2, 3] });
    I.caption(ctx, t, 'l5', 4, 7, { y: 1370, size: 100, hl: [6, 7], hold: 0.8, color: P.ink });
  }
});
