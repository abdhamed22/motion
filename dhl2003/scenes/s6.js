MOTION.scene({
  id: 's6',
  draw(t, lt, ctx) {
    const { X, P, W, H, at, wordTime, noise1 } = ctx, I = window.ILS, wt = i => wordTime('l6', i);
    I.sky(ctx, t, { hz: 0.9, stars: false, top: '#070B14', mid: '#0C1424', bot: '#0C1424' }); I.grid(ctx);
    const e1 = at(t, wt(7).s - 0.25, wt(7).s + 0.1, 'cubicInOut');
    if (e1 < 1) {
      X.save(); X.globalAlpha = 1 - e1; const pos = [[540, 520], [320, 930], [760, 930]], drop = [wt(4).s + 0.1, wt(5).s - 0.1, wt(6).s - 0.05];
      pos.forEach((p, i) => { const v = 1 - at(t, drop[i], drop[i] + 0.6, 'cubicIn') * 0.98, a = at(lt, i * 0.12, i * 0.12 + 0.5, 'expoOut'); X.save(); X.globalAlpha *= a; I.dial(X, p[0], p[1], 150, v * 0.95 + (v > 0.5 ? noise1(t * 5, i) * 0.04 : 0), P.clay === '' ? P.hi : P.hi, P.clay);
        if (v < 0.1) { const ck = at(t, drop[i] + 0.55, drop[i] + 0.95); I.cross(X, p[0], p[1] + 20, 56, ck, P.clay, 16); } X.restore(); });
      const c3 = at(t, wt(5).s, wt(5).s + 0.4, 'expoOut'); if (c3 > 0) ctx.text(X, '3', 540, 1180, { family: 'num', weight: 900, size: 140, color: P.clay, alpha: c3 * (1 - e1), dir: 'ltr' });
      X.restore();
    }
    if (e1 > 0) {
      X.save(); X.globalAlpha = e1; X.translate(540, 700); X.scale(2.3, 2.3); I.planeTop(X, 0, 0, 1, 0, '#EEF2F8'); X.restore();
      const ss = [[-118, 66, wt(11).s, 0.0], [118, 66, wt(11).s + 0.15, 0.0], [0, 168, wt(13).s, 0.0]];
      X.globalAlpha = e1; X.fillStyle = P.acc;
      const rects = [[540 - 245, 760, 120, 22], [540 + 125, 760, 120, 22], [540 - 24, 848, 48, 120]]; rects.forEach(rc => X.fillRect(rc[0], rc[1], rc[2], rc[3]));
      [[540 - 185, 790, wt(11).s], [540 + 185, 790, wt(11).s + 0.15], [540, 910, wt(13).s]].forEach(c => { const k = at(t, c[2], c[2] + 0.4, 'expoOut'); if (k > 0) I.cross(X, c[0], c[1], 54, k, P.clay, 15); });
      X.globalAlpha = 1;
    }
    I.vig(ctx, '255,50,30', 0.25 * (0.5 + 0.5 * Math.sin(t * 6)) * at(t, wt(4).s, wt(6).s));
    I.scrim(ctx, 1230, 1600);
    I.caption(ctx, t, 'l6', 0, 6, { y: 1370, size: 86, hl: [4, 5, 6] });
    I.caption(ctx, t, 'l6', 7, 11, { y: 1370, size: 88, hl: [11] });
    I.caption(ctx, t, 'l6', 12, 15, { y: 1370, size: 88, hl: [13], hold: 0.8 });
  }
});
