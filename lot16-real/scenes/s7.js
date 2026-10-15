MOTION.scene({
  id: 's7',
  setup(ctx) { const o = window.REAL.setup(ctx, { fov: 34, cam: [30, 3, -110] }); this.st = o.st; this.rw = o.rw; this.pl = o.pl; this.trucks = [[-1, -110], [1, -128], [-1, -150], [1, -170]].map(() => { const g = window.REAL.truck(ctx); g.scale.setScalar(1.2); this.st.add(g); return g; }); },
  draw(t, lt, ctx) {
    const { X, P, W, H, at, wordTime } = ctx, I = window.ILS, wt = i => wordTime('l7', i), dur = ctx.timeline.duration;
    this.rw.update(t); this.pl.position.set(0, 1.25, -152); this.pl.rotation.set(0, 0, 0); this.pl.userData.strobe.visible = ((t * 1.1) % 1) < 0.1;
    [[-1, -128], [1, -140], [-1, -168], [1, -178]].forEach((p, i) => { const g = this.trucks[i]; g.position.set(p[0] * 20, 0, p[1]); g.rotation.y = p[0] > 0 ? -Math.PI / 2 : Math.PI / 2; g.userData.flash(t + i * 0.2); });
    const k = at(lt, 0, 8, 'sineOut'), cam = this.st.camera; cam.position.set(34 - 8 * k, 3.2 - 0.6 * k, -108 - 10 * k); cam.lookAt(0, 4, -152);
    window.REAL.sky(ctx, window.REAL.horizon(ctx, this.st)); this.st.draw(X);
    const chip = (x, y, label, kk) => { if (kk <= 0) return; X.save(); X.globalAlpha = kk; X.translate(0, (1 - kk) * 24); I.card(X, x - 190, y - 56, 380, 112, { fill: 'rgba(10,20,36,0.78)', stroke: P.acc, lw: 5, r: 56 }); ctx.text(X, label, x, y + 24, { family: 'display', size: 76, color: P.ink }); X.restore(); };
    chip(540, 360, 'الخبرة', at(t, wt(4).s - 0.05, wt(4).s + 0.4, 'expoOut')); chip(540, 520, 'الهدوء', at(t, wt(5).s - 0.05, wt(5).s + 0.4, 'expoOut'));
    I.vig(ctx, '0,0,0', 0.3); I.scrim(ctx, 1260, 1620);
    I.caption(ctx, t, 'l7', 0, 5, { y: 1400, size: 90, hl: [4, 5] });
    I.caption(ctx, t, 'l7', 6, 9, { y: 1400, size: 92, hl: [8, 9], hold: 1.0 });
    const fo = at(t, dur - 0.9, dur, 'quadIn'); if (fo > 0) { X.globalAlpha = fo; X.fillStyle = '#000'; X.fillRect(0, 0, W, H); X.globalAlpha = 1; }
  }
});
