MOTION.scene({
  id: 's4',
  setup(ctx) {
    const { THREE } = ctx;
    this.st = ctx.stage3D({ fov: 40, camera: [0, 8, 90], tone: 'neutral', exposure: 1, env: 'room', samples: 0 });
    const sc = this.st.scene; sc.fog = new THREE.Fog('#1A3860', 70, 420);
    const sun = new THREE.DirectionalLight('#BFD8FF', 2.4); sun.position.set(-6, 10, 6); sc.add(sun);
    this.world = window.ILS.runway(ctx, { len: 200, approach: 36 }); this.st.add(this.world);
    this.plane = window.ILS.plane(ctx); this.plane.scale.setScalar(1.0); this.st.add(this.plane);
    this.hoops = [];
    for (let i = 0; i < 9; i++) { const m = new THREE.Mesh(new THREE.TorusGeometry(1, 0.03, 8, 64), new THREE.MeshBasicMaterial({ color: ctx.P.hi, transparent: true, opacity: 0, depthWrite: false })); this.st.add(m); this.hoops.push(m); }
    const geo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0.1, -20), new THREE.Vector3(0, 27, 130)]);
    this.path = new THREE.Line(geo, new THREE.LineBasicMaterial({ color: ctx.P.acc, transparent: true, opacity: 0.55 })); this.st.add(this.path);
    this.V = THREE.Vector3;
  },
  draw(t, lt, ctx) {
    const { X, P, W, H, at, wordTime } = ctx, I = window.ILS;
    I.sky(ctx, t, { hz: 0.47 });
    const zp = 62 - 16 * at(lt, 0, 6.9, 'sineInOut'), yp = (zp + 20) * 0.18 + 0.4;
    this.world.update(t);
    this.plane.position.set(0, yp, zp); this.plane.rotation.set(-0.09, 0, Math.sin(lt * 0.7) * 0.03);
    this.plane.userData.strobe.visible = ((t * 1.7) % 1) < 0.18;
    const sig = wordTime('l5', 3).s, a0 = at(t, sig - 0.05, sig + 0.45);
    this.hoops.forEach((m, i) => {
      const ph = (t * 0.75 + i / 9) % 1, z = -20 + ph * (zp + 20 - 3);
      m.position.set(0, (z + 20) * 0.18 + 0.1, z); m.scale.setScalar(0.9 + 3.4 * ph); m.material.opacity = Math.sin(Math.PI * ph) * 0.8 * a0;
    });
    this.path.material.opacity = 0.55 * a0;
    this.st.camera.position.set(0, yp + 4.2, zp + 24); this.st.camera.lookAt(0, yp - 8.5, zp - 30);
    this.st.draw(X);
    /* وصلة الموقع بين الطائرة والمدرج + بطاقات */
    const V = this.V, pp = I.proj(ctx, this.st, new V(0, yp, zp)), rp = I.proj(ctx, this.st, new V(0, 0.4, -20));
    const wMy = wordTime('l5', 9), wRw = wordTime('l5', 12), wHelp = wordTime('l5', 5);
    const ring = at(t, wHelp.s, wHelp.s + 0.6, 'expoOut');
    if (ring > 0) { X.globalAlpha = (1 - at(t, wHelp.s + 0.7, wHelp.s + 1.6)) * ring; X.strokeStyle = P.acc; X.lineWidth = 7; X.beginPath(); X.arc(pp[0], pp[1], 90 + 80 * ring, 0, 6.283); X.stroke(); X.globalAlpha = 1; }
    const link = at(t, wMy.s, wMy.s + 0.9, 'cubicOut');
    if (link > 0) {
      X.save(); X.strokeStyle = P.acc; X.lineWidth = 6; X.setLineDash([22, 18]); X.lineDashOffset = -lt * 60;
      X.beginPath(); X.moveTo(pp[0], pp[1] + 60); X.lineTo(pp[0] + (rp[0] - pp[0]) * link, pp[1] + 60 + (rp[1] - pp[1] - 60) * link); X.stroke(); X.restore();
      const cd = (x, y, str, k, col) => { X.save(); X.globalAlpha = k; I.card(X, x - 130, y - 38 + (1 - k) * 18, 260, 76, { fill: 'rgba(10,20,36,0.88)', stroke: col, r: 38 }); ctx.text(X, str, x, y + 22, { family: 'body', weight: 800, size: 44, color: P.ink }); X.restore(); };
      cd(Math.min(W - 160, pp[0] + 190), pp[1] - 90, 'موقعها', at(t, wMy.s, wMy.s + 0.3, 'expoOut'), P.acc);
      cd(Math.max(160, Math.min(W - 160, rp[0])), Math.min(1180, rp[1] - 70), 'المدرج', at(t, wRw.s - 0.05, wRw.s + 0.3, 'expoOut'), P.clay);
    }
    I.scrim(ctx, 1180, 1560);
    I.caption(ctx, t, 'l5', 0, 2, { y: 1350, size: 90 });
    I.caption(ctx, t, 'l5', 3, 4, { y: 1350, size: 100, hl: [3, 4], hold: 0.4 });
    I.caption(ctx, t, 'l5', 5, 7, { y: 1350, size: 90 });
    I.caption(ctx, t, 'l5', 8, 12, { y: 1350, size: 84, hl: [9, 12], hold: 0.7 });
  }
});
