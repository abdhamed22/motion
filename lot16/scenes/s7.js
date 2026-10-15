MOTION.scene({
  id: 's7',
  draw(t, lt, ctx) {
    const { X, P, W, H, at, wordTime } = ctx, I = window.ILS, wt = i => wordTime('l7', i), dur = ctx.timeline.duration;
    const g = X.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#0B1630'); g.addColorStop(0.55, '#3B3350'); g.addColorStop(0.75, '#B5704A'); g.addColorStop(1, '#0A0F1A'); X.fillStyle = g; X.fillRect(0, 0, W, H);
    const gy = 1000, z = 1 + 0.04 * at(lt, 0, 6, 'sineOut'); X.save(); X.translate(540, 700); X.scale(z, z); X.translate(-540, -700);
    X.fillStyle = '#0A1018'; X.fillRect(-50, gy, W + 100, 400); X.fillStyle = '#16213A'; X.fillRect(-50, gy, W + 100, 26); X.fillStyle = '#E8EEF7'; X.fillRect(-50, gy - 4, W + 100, 8);
    I.planeSide(X, 540, gy - 62, 1.6, 0, '#EEF2F8', 1, P.acc);
    X.restore();
    const chip = (x, y, label, k) => { if (k <= 0) return; X.save(); X.globalAlpha = k; X.translate(0, (1 - k) * 24); I.card(X, x - 190, y - 56, 380, 112, { fill: 'rgba(10,20,36,0.85)', stroke: P.acc, lw: 5, r: 56 }); ctx.text(X, label, x, y + 24, { family: 'display', size: 76, color: P.ink }); X.restore(); };
    chip(540, 360, 'الخبرة', at(t, wt(4).s - 0.05, wt(4).s + 0.4, 'expoOut')); chip(540, 520, 'الهدوء', at(t, wt(5).s - 0.05, wt(5).s + 0.4, 'expoOut'));
    I.vig(ctx, '0,0,0', 0.35); I.scrim(ctx, 1260, 1620);
    I.caption(ctx, t, 'l7', 0, 5, { y: 1400, size: 90, hl: [4, 5] });
    I.caption(ctx, t, 'l7', 6, 9, { y: 1400, size: 92, hl: [8, 9], hold: 1.0 });
    const fo = at(t, dur - 0.9, dur, 'quadIn'); if (fo > 0) { X.globalAlpha = fo; X.fillStyle = '#000'; X.fillRect(0, 0, W, H); X.globalAlpha = 1; }
  }
});
