MOTION.scene({
  id: 's5',
  setup(ctx) { const o = window.REAL.setup(ctx, { fov: 36, cam: [18, 1.6, -95] }); this.st = o.st; this.rw = o.rw; this.pl = o.pl; this.sp = window.REAL.sparks(ctx, 220); this.st.add(this.sp); this.sm = window.REAL.smoke(ctx, 48); this.st.add(this.sm); },
  draw(t, lt, ctx) {
    const { X, P, W, H, at, wordTime, noise1 } = ctx, I = window.ILS, wt = i => wordTime('l5', i), t0 = ctx.scene.start, L = s => s - t0;
    const tl = L(wt(8).s) + 0.1, ts = L(wt(13).s) + 0.5, T = ts - tl, v0 = 75, dist = lt => { const d = Math.min(Math.max(0, lt - tl), T); return v0 * (d - d * d / (2 * T)); };
    const z = lt < tl ? -40 + 75 * (tl - lt) : -40 - dist(lt), y = lt < tl ? 1.25 + Math.max(0, (z + 40) * 0.052) : 1.25, pitch = lt < tl ? 0.06 : 0.06 * Math.max(0, 1 - (lt - tl) * 1.4);
    this.pl.position.set(0, y, z); this.pl.rotation.set(-pitch, 0, 0); this.rw.update(t); this.pl.userData.strobe.visible = ((t * 1.1) % 1) < 0.1;
    const sl = lt > tl, em = tt => { const lz = tt < tl ? -40 + 75 * (tl - tt) : -40 - dist(tt); return [0, 0.15, lz + 1.5]; }; this.sp.update(lt, tl, ts - 0.4, em); this.sm.update(lt, tl, ts, em);
    const cam = this.st.camera, shake = sl && lt < ts ? 0.05 * (1 - (lt - tl) / T) : 0; cam.position.set(18 + noise1(t * 30, 1) * shake, 1.6 + noise1(t * 30, 2) * shake, -95); cam.lookAt(0, 2.2, z + (lt < tl ? 0 : -6));
    window.REAL.sky(ctx, window.REAL.horizon(ctx, this.st)); this.st.draw(X);
    /* قرار الطاقم: عجلة مشطوبة */
    const e1 = at(lt, 2.6, 3.4), k = at(t, wt(2).s, wt(2).s + 0.5, 'expoOut') * (1 - e1);
    if (k > 0) { X.save(); X.globalAlpha = k; X.translate(540, 520); X.fillStyle = '#0E1B2D'; X.strokeStyle = P.ink; X.lineWidth = 20; X.beginPath(); X.arc(0, 0, 150, 0, 6.283); X.fill(); X.stroke(); X.fillStyle = '#9AA9BD'; X.beginPath(); X.arc(0, 0, 60, 0, 6.283); X.fill(); I.cross(X, 0, 0, 200, at(t, wt(6).s - 0.1, wt(6).s + 0.5), P.clay, 26); X.restore(); }
    const ck = at(t, wt(13).s + 0.5, wt(13).s + 1.0); if (ck > 0) I.check(X, 540, 520, 70, ck, P.acc, 20);
    I.vig(ctx, '0,0,0', 0.3); I.scrim(ctx, 1260, 1620);
    I.caption(ctx, t, 'l5', 0, 7, { y: 1400, size: 88, hl: [2, 4, 7] });
    I.caption(ctx, t, 'l5', 8, 13, { y: 1400, size: 92, hl: [8, 11, 13], hold: 0.9 });
  }
});
