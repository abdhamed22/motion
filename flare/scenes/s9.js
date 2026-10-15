MOTION.scene({
  id: 's9',
  draw(t, lt, ctx) {
    const { X, P, W, H, at, wordTime } = ctx, I = window.ILS, wt = i => wordTime('l9', i), dur = ctx.timeline.duration;
    I.sky(ctx, t, { hz: 0.8, stars: true, top: '#05080F', mid: '#2B2038', bot: '#0A0F1A' });
    const gy = 1000; X.fillStyle = '#0B1220'; X.fillRect(0, gy, W, 300); X.fillStyle = '#16213A'; X.fillRect(0, gy, W, 26); X.fillStyle = '#E8EEF7'; X.fillRect(0, gy - 4, W, 8);
    for (let i = 0; i < 12; i++) { X.fillStyle = '#E8EEF7'; X.fillRect(((i * 110 - lt * 260) % 1320 + 1320) % 1320 - 120, gy + 12, 60, 6); }
    const rl = at(lt, 0, 4.2, 'sineOut'); I.gearPlane(X, 120 + 360 * rl + (lt > 4.2 ? (lt - 4.2) * 30 : 0), gy - 64, 1.3, -0.02, P.acc);
    /* مقود يُسحب بهدوء */
    const yk = at(t, wt(5).s - 0.1, wt(6).s + 0.4, 'expoOut'); I.yoke(X, 540, 600 + 14 * Math.sin(t * 1.5), 1.7 * (0.9 + 0.1 * yk), P.ink, 20);
    const pk = at(t, wt(8).s - 0.1, wt(9).s + 0.3, 'expoOut'); if (pk > 0) { X.save(); X.globalAlpha = pk; X.translate(540, 800); I.person(X, 0, 0, 1.2, P.acc, 0, { noLegs: true, armL: [-90, -140], armR: [90, -140] }); X.restore(); }
    const ck = at(t, wt(7).s, wt(7).s + 0.5); if (ck > 0) I.check(X, 820, 460, 46, ck, P.acc, 16);
    I.scrim(ctx, 1250, 1620);
    I.caption(ctx, t, 'l9', 0, 4, { y: 1390, size: 90, hl: [1, 4] });
    I.caption(ctx, t, 'l9', 5, 9, { y: 1390, size: 98, hl: [6, 7, 9], hold: 1.0 });
    const fo = at(t, dur - 0.6, dur, 'quadIn'); if (fo > 0) { X.globalAlpha = fo; X.fillStyle = P.bg; X.fillRect(0, 0, W, H); X.globalAlpha = 1; }
  }
});
