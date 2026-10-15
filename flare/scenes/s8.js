MOTION.scene({
  id: 's8',
  draw(t, lt, ctx) {
    const { X, P, W, H, at, wordTime, noise1 } = ctx, I = window.ILS, wt = i => wordTime('l8', i);
    I.sky(ctx, t, { hz: 0.9, stars: false, top: '#08111F', mid: '#0C1A2E', bot: '#0C1A2E' }); I.grid(ctx);
    const cx = 540, top = 230, bot = 1090;
    X.fillStyle = '#1A2538'; X.fillRect(cx - 80, top, 160, bot - top); X.fillStyle = '#E8EEF7'; for (let y = top + 30; y < bot - 40; y += 70) X.fillRect(cx - 6, y, 12, 38); X.fillRect(cx - 80, top, 5, bot - top); X.fillRect(cx + 75, top, 5, bot - top);
    const fan = at(t, wt(2).s, wt(5).e, 'expoOut');
    X.save(); X.beginPath(); X.rect(0, top, W, bot - top + 100); X.clip(); const g = X.createLinearGradient(0, top, 0, bot + 100); g.addColorStop(0, 'rgba(39,195,216,0.5)'); g.addColorStop(1, 'rgba(39,195,216,0.06)'); X.fillStyle = g; X.globalAlpha = fan; X.beginPath(); X.moveTo(cx - 14, top); X.lineTo(cx - 14 - 440 * fan, bot + 100); X.lineTo(cx + 14 + 440 * fan, bot + 100); X.lineTo(cx + 14, top); X.closePath(); X.fill(); X.restore();
    const cl = at(t, wt(9).s, wt(11).e, 'cubicOut'); X.save(); X.strokeStyle = P.acc; X.lineWidth = 9; X.setLineDash([34, 24]); X.lineDashOffset = -lt * 120; X.globalAlpha = 0.3 + 0.7 * cl; X.beginPath(); X.moveTo(cx, top - 20); X.lineTo(cx, bot + 100); X.stroke(); X.restore();
    const roll = at(lt, 0, 6.6, 'linear'), off = 60 * Math.sin(lt * 2.4) * (1 - at(t, wt(6).s, wt(8).e)) + noise1(t * 3, 4) * 8 * (1 - cl);
    I.planeTop(X, cx + off, 1000 - 640 * roll * 0.9, 1.3, 0, '#EEF2F8');
    if (cl > 0.9) I.check(X, cx + 200, 330, 46, at(t, wt(11).s + 0.1, wt(11).s + 0.5), P.acc, 14);
    I.scrim(ctx, 1250, 1620);
    I.caption(ctx, t, 'l8', 0, 5, { y: 1390, size: 88, hl: [1, 3, 5] });
    I.caption(ctx, t, 'l8', 6, 11, { y: 1390, size: 88, hl: [8, 10, 11], hold: 0.8 });
  }
});
