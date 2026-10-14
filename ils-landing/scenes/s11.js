MOTION.scene({
  id: 's11',
  setup(ctx) {
    const { THREE } = ctx;
    this.st = ctx.stage3D({ fov: 42, camera: [0, 4, 20], tone: 'neutral', exposure: 1, env: 'room', samples: 0 });
    const sc = this.st.scene; sc.fog = new THREE.Fog('#1A3860', 4, 40);
    const sun = new THREE.DirectionalLight('#BFD8FF', 2.4); sun.position.set(-6, 10, 6); sc.add(sun);
    this.world = window.ILS.runway(ctx, { len: 220, approach: 36 }); this.st.add(this.world);
    this.plane = window.ILS.plane(ctx); this.st.add(this.plane);
  },
  draw(t, lt, ctx) {
    const { X, P, W, H, at, prog, wordTime, noise1 } = ctx, I = window.ILS, wt = i => wordTime('l12', i);
    I.sky(ctx, t, { hz: 0.47, starAlpha: 0.6, top: '#1A3860', mid: '#1A3860' });
    const clear = at(t, wt(12).s - 0.2, wt(12).s + 0.9, 'cubicOut');                 // الضباب ينقشع عند «اللحظات الأخيرة»
    const fogNear = 2 + 70 * clear, fogFar = 34 + 360 * clear;
    this.st.scene.fog.near = fogNear; this.st.scene.fog.far = fogFar;
    const z = 74 - 104 * prog(lt, 0, 8.0) ** 1.0, ground = 0.55;
    const y = Math.max(ground, (z + 20) * 0.17 + ground);
    const touch = at(t, wt(13).e - 0.2, wt(13).e + 0.1);
    this.world.update(t);
    this.plane.position.set(noise1(lt * 0.5, 4) * 0.3 * (1 - touch), y, z);
    this.plane.rotation.set(-0.08 + 0.12 * touch, 0, Math.sin(lt * 0.8) * 0.04 * (1 - touch));
    this.plane.userData.strobe.visible = ((t * 1.7) % 1) < 0.18;
    const sh = (t > wt(13).e - 0.15) ? Math.sin((t - wt(13).e) * 60) * 0.06 * Math.exp(-(t - wt(13).e + 0.15) * 6) : 0;
    this.st.camera.position.set(0.8, y + 6.5 + sh, z + 24); this.st.camera.lookAt(0, y - 16, z - 40);
    this.st.draw(X);
    /* ضباب أمامي */
    I.mist(ctx, t, 0.9 * (1 - clear), 700, 1450, '#30517C');
    /* هوك: والأغرب؟ */
    const hk = at(t, 0.0, 0.0, 'linear'); const h0 = at(lt, 0, 0.4, 'expoOut') * (1 - at(lt, 1.15, 1.6, 'cubicIn'));
    if (h0 > 0.01) ctx.text(X, 'والأغرب؟', 540, 760, { family: 'display', size: 270 * (0.95 + 0.05 * h0), color: P.acc, alpha: h0, shadow: { blur: 0, y: 8, color: 'rgba(0,0,0,0.35)' } });
    I.scrim(ctx, 1180, 1580);
    I.caption(ctx, t, 'l12', 1, 4, { y: 1350, size: 94, hl: [3, 4], hold: 0.1 });
    I.caption(ctx, t, 'l12', 5, 10, { y: 1350, size: 88, hl: [9, 10] });
    I.caption(ctx, t, 'l12', 11, 13, { y: 1350, size: 100, hl: [12, 13], hold: 1.2 });
    /* خفوت نهائي */
    const fo = at(t, ctx.timeline.duration - 0.45, ctx.timeline.duration, 'quadIn'); if (fo > 0) { X.globalAlpha = fo; X.fillStyle = P.bg; X.fillRect(0, 0, W, H); X.globalAlpha = 1; }
  }
});
