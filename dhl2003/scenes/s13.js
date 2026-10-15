MOTION.scene({
  id: 's13',
  draw(t, lt, ctx) {
    const { X, P, W, H, at, wordTime, noise1 } = ctx, I = window.ILS, wt = i => wordTime('l15', i), dur = ctx.timeline.duration;
    X.fillStyle = '#070B14'; X.fillRect(0, 0, W, H);
    const tilt = Math.sin(lt * 0.9) * 0.18 * (0.4 + at(t, wt(6).s, wt(9).e)), vp = [540, 640];
    X.save(); X.translate(540, 640); X.rotate(tilt); X.translate(-540, -640);
    const sg = X.createLinearGradient(0, -400, 0, 640); sg.addColorStop(0, '#05080F'); sg.addColorStop(1, '#2A1A22'); X.fillStyle = sg; X.fillRect(-500, -500, 2100, 1140);
    X.fillStyle = '#0B1220'; X.fillRect(-500, 640, 2100, 1400);
    X.fillStyle = '#1A2538'; X.beginPath(); X.moveTo(vp[0] - 14, vp[1]); X.lineTo(vp[0] + 14, vp[1]); X.lineTo(vp[0] + 620, 1500); X.lineTo(vp[0] - 620, 1500); X.closePath(); X.fill();
    X.fillStyle = '#E8EEF7'; for (let i = 0; i < 9; i++) { const q = ((i / 9 + lt * 0.25) % 1) ** 2.2, y = vp[1] + q * 860, w = 2 + 22 * q, h = 4 + 70 * q; X.fillRect(vp[0] - w / 2, y, w, h); }
    X.restore();
    /* مقود يتفكك */
    const yk = at(t, wt(1).s, wt(1).s + 0.5, 'expoOut'), br = at(t, wt(9).s, wt(9).s + 0.6, 'cubicOut');
    X.save(); X.globalAlpha = yk; X.translate(0, 1050); const sh = noise1(t * 30, 2) * 8 * br; X.translate(sh, 0); X.rotate(Math.sin(lt * 1.8) * 0.12 * (1 + br)); I.yoke(X, 540, 0, 2.1, br > 0.5 ? P.clay : P.ink, 22); X.restore();
    if (br > 0.01) I.cross(X, 540, 1050, 180, br, P.clay, 24);
    I.vig(ctx, '255,50,30', 0.35 * at(t, wt(6).s, wt(9).e));
    I.scrim(ctx, 1230, 1600);
    I.caption(ctx, t, 'l15', 0, 5, { y: 1370, size: 88, hl: [1, 4, 5] });
    I.caption(ctx, t, 'l15', 6, 9, { y: 1370, size: 92, hl: [8, 9] });
    I.caption(ctx, t, 'l15', 10, 14, { y: 1370, size: 110, hl: [10, 12, 14], color: P.acc, hold: 1.0 });
    const fo = at(t, dur - 0.7, dur, 'quadIn'); if (fo > 0) { X.globalAlpha = fo; X.fillStyle = '#000'; X.fillRect(0, 0, W, H); X.globalAlpha = 1; }
  }
});
