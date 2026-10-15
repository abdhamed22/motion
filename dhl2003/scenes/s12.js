MOTION.scene({
  id: 's12',
  draw(t, lt, ctx) {
    const { X, P, W, H, at, wordTime } = ctx, I = window.ILS, wt = i => wordTime('l14', i);
    I.sky(ctx, t, { hz: 0.9, stars: false, top: '#070B14', mid: '#0C1424', bot: '#0C1424' }); I.grid(ctx);
    const out = at(t, wt(12).s - 0.2, wt(12).s + 0.25, 'cubicInOut');
    if (out < 1) {
      X.save(); X.globalAlpha = 1 - out; X.translate(0, -50 * out);
      const card = (y, label, k, draw) => { const a = at(t, k, k + 0.45, 'expoOut'); if (a <= 0) return; X.save(); X.globalAlpha *= a; X.translate(0, (1 - a) * 50); I.card(X, 140, y, 800, 230, { fill: '#102038', stroke: '#27415F', lw: 5, r: 40 }); draw(280, y + 115); ctx.text(X, label, 660, y + 150, { family: 'display', size: 100, color: P.ink }); X.restore(); };
      card(300, 'الخبرة', wt(3).s - 0.05, (x, y) => { X.fillStyle = P.acc; X.beginPath(); for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? 36 : 82; X.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr); } X.closePath(); X.fill(); });
      card(570, 'اتخاذ القرار', wt(6).s - 0.05, (x, y) => { X.strokeStyle = P.hi; X.lineWidth = 14; X.lineCap = 'round'; X.lineJoin = 'round'; X.beginPath(); X.moveTo(x, y + 70); X.lineTo(x, y); X.lineTo(x - 54, y - 56); X.moveTo(x, y); X.lineTo(x + 54, y - 56); X.stroke(); });
      const bk = at(t, wt(10).s - 0.1, wt(10).s + 0.5, 'expoOut'); if (bk > 0) { X.save(); X.globalAlpha *= bk; X.translate(540, 1050); const tilt = -0.25 * at(t, wt(10).s, wt(10).s + 0.8, 'cubicOut') + 0.04 * Math.sin(t * 2); X.rotate(tilt); X.strokeStyle = P.ink; X.lineWidth = 12; X.lineCap = 'round'; X.beginPath(); X.moveTo(-300, 0); X.lineTo(300, 0); X.moveTo(0, 0); X.lineTo(0, 110); X.moveTo(-80, 110); X.lineTo(80, 110); X.stroke(); X.fillStyle = P.acc; X.beginPath(); X.arc(-250, 40, 40, 0, 6.283); X.fill(); X.fillStyle = P.clay; X.beginPath(); X.arc(250, 40, 40, 0, 6.283); X.fill(); X.restore(); }
      X.restore();
    }
    if (out > 0) { X.save(); X.globalAlpha = out; I.planeTop(X, 540, 700, 1.7, 0, '#EEF2F8'); I.yoke(X, 540, 1000, 1.3, P.ink, 16); I.cross(X, 540, 1010, 130, at(t, wt(16).s, wt(16).s + 0.5), P.clay, 20); X.restore(); }
    I.scrim(ctx, 1230, 1600);
    I.caption(ctx, t, 'l14', 0, 7, { y: 1370, size: 84, hl: [0, 3, 4, 6, 7] });
    I.caption(ctx, t, 'l14', 8, 11, { y: 1370, size: 92, hl: [10] });
    I.caption(ctx, t, 'l14', 12, 17, { y: 1370, size: 86, hl: [15, 16, 17], hold: 0.8 });
  }
});
