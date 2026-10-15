MOTION.scene({
  id: 's4',
  setup(ctx) { const o = window.REAL.setup(ctx, { fov: 48, cam: [0, 70, 10] }); this.st = o.st; this.rw = o.rw; this.pl = o.pl; this.trucks = [0, 1, 2].map(() => { const g = window.REAL.truck(ctx); g.scale.setScalar(1.2); this.st.add(g); return g; }); },
  draw(t, lt, ctx) {
    const { X, P, W, H, at, wordTime } = ctx, I = window.ILS, wt = i => wordTime('l4', i);
    this.rw.update(t);
    const C = [0, 0, -190], R0 = 26, ang = -1.2 + lt * 0.6, x = C[0] + Math.cos(ang) * R0, z = C[2] + Math.sin(ang) * R0, y = 40 + 2 * Math.sin(lt * 0.6);
    const hd = [-Math.sin(ang), Math.cos(ang)], yaw = Math.atan2(-hd[0], -hd[1]);
    this.pl.scale.setScalar(3); this.pl.position.set(x, y, z); this.st.scene.fog.near = 400; this.st.scene.fog.far = 2000; this.pl.rotation.set(0, yaw, -0.32); this.pl.rotation.order = 'YXZ'; this.pl.userData.strobe.visible = ((t * 1.1) % 1) < 0.1;
    this.trucks.forEach((g, i) => { const k = at(t, wt(10).s + i * 0.35, wt(10).s + 1.6 + i * 0.35, 'cubicOut'); const side = i === 1 ? 1 : -1; g.position.set(side * (24 + (1 - k) * 120), 0, -150 - i * 22); g.rotation.y = side > 0 ? -Math.PI / 2 : Math.PI / 2; g.visible = k > 0.001; g.userData.flash(t); });
    const cam = this.st.camera; cam.position.set(0, 70 - 4 * lt * 0.3, 10); cam.lookAt(0, 38, -190);
    window.REAL.sky(ctx, window.REAL.horizon(ctx, this.st)); this.st.draw(X);
    const fk = at(t, wt(7).s - 0.1, wt(7).s + 0.4, 'expoOut'), f = 1 - 0.8 * at(t, wt(7).s, wt(8).e + 0.6, 'sineInOut');
    if (fk > 0) { X.save(); X.globalAlpha = fk; I.rr(X, 900, 330, 34, 460, 17); X.fillStyle = 'rgba(10,18,34,0.7)'; X.fill(); X.fillStyle = f < 0.4 ? P.clay : P.acc; I.rr(X, 900, 330 + 460 * (1 - f), 34, 460 * f, 17); X.fill(); ctx.text(X, 'الوقود', 917, 850, { family: 'body', weight: 800, size: 38, color: P.ink }); X.restore(); }
    I.vig(ctx, '0,0,0', 0.3); I.scrim(ctx, 1260, 1620);
    I.caption(ctx, t, 'l4', 0, 4, { y: 1400, size: 90, hl: [2, 4] });
    I.caption(ctx, t, 'l4', 5, 8, { y: 1400, size: 90, hl: [6, 8] });
    I.caption(ctx, t, 'l4', 9, 14, { y: 1400, size: 90, hl: [11, 12, 14], hold: 0.9 });
  }
});
