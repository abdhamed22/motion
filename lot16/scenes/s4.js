MOTION.scene({
  id: 's4',
  draw(t, lt, ctx) {
    const { X, P, W, H, at, wordTime, noise1 } = ctx, I = window.ILS, wt = i => wordTime('l4', i);
    I.sky(ctx, t, { hz: 0.9, stars: false, top: '#04070F', mid: '#0A1424', bot: '#0A1424' }); I.grid(ctx, 0.07);
    const cx = 540, cy = 700, rx = 360, ry = 300, k = at(lt, 0, 0.6, 'expoOut');
    /* مدرج من فوق + مسار الدوران */
    X.save(); X.globalAlpha = k; X.fillStyle = '#1A2538'; X.fillRect(cx - 50, cy - 230, 100, 460); X.fillStyle = '#E8EEF7'; for (let y = cy - 200; y < cy + 210; y += 60) X.fillRect(cx - 4, y, 8, 30);
    X.strokeStyle = 'rgba(143,233,245,0.45)'; X.lineWidth = 5; X.setLineDash([18, 14]); X.lineDashOffset = -lt * 40; X.beginPath(); X.ellipse(cx, cy, rx, ry, 0, 0, 6.283); X.stroke(); X.setLineDash([]); X.restore();
    const ang = -Math.PI / 2 + lt * 0.8, px = cx + Math.cos(ang) * rx, py = cy + Math.sin(ang) * ry, tx = -Math.sin(ang) * rx, ty = Math.cos(ang) * ry;
    I.planeTop(X, px, py, 0.62, Math.atan2(ty, tx) + Math.PI / 2, P.ink);
    /* مؤشر الوقود يهبط */
    const fk = at(t, wt(7).s - 0.1, wt(7).s + 0.4, 'expoOut'), f = 1 - 0.8 * at(t, wt(7).s, wt(8).e + 0.6, 'sineInOut');
    if (fk > 0) { X.save(); X.globalAlpha = fk; I.rr(X, 900, 330, 34, 460, 17); X.fillStyle = '#16294A'; X.fill(); X.fillStyle = f < 0.4 ? P.clay : P.acc; I.rr(X, 900, 330 + 460 * (1 - f), 34, 460 * f, 17); X.fill(); ctx.text(X, 'الوقود', 917, 850, { family: 'body', weight: 800, size: 38, color: P.ink }); X.restore(); }
    /* فرق الطوارئ تتجمع بجانب المدرج */
    for (let i = 0; i < 3; i++) { const tk = at(t, wt(10).s + i * 0.3, wt(10).s + 0.9 + i * 0.3, 'cubicOut'); if (tk <= 0) continue;
      const side = i === 1 ? 1 : -1, x = cx + side * 110 + (1 - tk) * side * 400, y = cy + 120 + (i === 2 ? 60 : 0) - i * 40;
      X.save(); X.globalAlpha = tk; X.translate(x, y); X.fillStyle = P.clay; X.beginPath(); X.roundRect(-50, -24, 100, 48, 10); X.fill(); X.fillStyle = '#F4F7FB'; X.fillRect(-30, -12, 22, 24); const bl = Math.floor(t * 2) % 2; X.fillStyle = bl ? P.acc : P.hi; X.fillRect(10, -30, 24, 10); X.restore(); }
    I.vig(ctx, '0,0,0', 0.35); I.scrim(ctx, 1260, 1620);
    I.caption(ctx, t, 'l4', 0, 4, { y: 1400, size: 90, hl: [2, 4] });
    I.caption(ctx, t, 'l4', 5, 8, { y: 1400, size: 90, hl: [6, 8] });
    I.caption(ctx, t, 'l4', 9, 14, { y: 1400, size: 90, hl: [11, 12, 14], hold: 0.9 });
  }
});
