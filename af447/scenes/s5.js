MOTION.scene({
  id: 's5',
  draw(t, lt, ctx) {
    const { X, P, W, H, at, wordTime, noise1 } = ctx, I = window.ILS, wt = i => wordTime('l5', i);
    I.sky(ctx, t, { hz: 0.9, stars: false, top: '#02040A', mid: '#07101C', bot: '#07101C' });
    const e1 = at(t, wt(5).s - 0.25, wt(5).s + 0.15, 'cubicInOut'), e2 = at(t, wt(7).s - 0.25, wt(7).s + 0.15, 'cubicInOut');
    /* أ: خمس دقائق */
    if (e1 < 1) {
      X.save(); X.globalAlpha = 1 - e1; X.translate(540, 640); X.strokeStyle = '#27415F'; X.lineWidth = 26; X.beginPath(); X.arc(0, 0, 250, 0, 6.283); X.stroke();
      const f = at(t, wt(3).s, wt(5).s, 'sineInOut'); X.strokeStyle = P.clay; X.lineCap = 'round'; X.beginPath(); X.arc(0, 0, 250, -Math.PI / 2, -Math.PI / 2 + 6.283 * f); X.stroke();
      const n = at(t, wt(3).s - 0.05, wt(3).s + 0.4, 'expoOut'); ctx.text(X, '5', 0, 70, { family: 'num', weight: 900, size: 280 * (0.94 + 0.06 * n), color: P.ink, alpha: n, dir: 'ltr' }); X.restore();
    }
    /* ب: السقوط في المحيط */
    if (e1 > 0 && e2 < 1) {
      X.save(); X.globalAlpha = e1 * (1 - e2); const oy = 920, f = at(t, wt(5).s, wt(5).s + 0.9, 'quadIn');
      X.fillStyle = '#0C2540'; X.fillRect(0, oy, W, 500);
      I.planeSide(X, 540, 320 + (oy - 380) * f, 1.2, -0.3, '#C9D3E0', 1 - 0.7 * at(f, 0.9, 1), P.acc);
      const rp = at(t, wt(5).s + 0.8, wt(6).e + 0.4); for (let i = 0; i < 3; i++) { const ph = Math.max(0, rp - i * 0.18); X.globalAlpha = e1 * (1 - e2) * (1 - ph) * 0.8; X.strokeStyle = P.hi; X.lineWidth = 5; X.beginPath(); X.ellipse(540, oy + 6, 60 + 360 * ph, 14 + 40 * ph, 0, 0, 6.283); X.stroke(); }
      X.restore();
    }
    /* ج: 228 */
    if (e2 > 0) {
      X.save(); X.globalAlpha = e2; const cols = 19, rows = 12, gx = 540 - (cols - 1) * 24, gy = 520;
      for (let i = 0; i < cols * rows; i++) { const c = i % cols, r = Math.floor(i / cols), d = at(t, wt(8).s + (i / 228) * 2.4, wt(8).s + 0.5 + (i / 228) * 2.4); X.fillStyle = d > 0.5 ? '#2B3A52' : P.acc; X.globalAlpha = e2 * (d > 0.5 ? 0.8 : 1); X.beginPath(); X.arc(gx + c * 48, gy + r * 48, 13, 0, 6.283); X.fill(); }
      X.globalAlpha = e2; const nk = at(t, wt(10).s - 0.05, wt(10).s + 0.5, 'expoOut'); if (nk > 0) ctx.text(X, '228', 540, 400, { family: 'num', weight: 900, size: 190 * (0.95 + 0.05 * nk), color: P.ink, alpha: nk, dir: 'ltr' });
      X.restore();
    }
    I.vig(ctx, '0,0,0', 0.45); I.scrim(ctx, 1260, 1620);
    I.caption(ctx, t, 'l5', 0, 4, { y: 1400, size: 92, hl: [3, 4] });
    I.caption(ctx, t, 'l5', 5, 6, { y: 1400, size: 100, hl: [5, 6] });
    I.caption(ctx, t, 'l5', 7, 12, { y: 1400, size: 90, hl: [10, 12], hold: 0.9 });
  }
});
