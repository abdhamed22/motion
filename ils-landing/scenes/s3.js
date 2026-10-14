MOTION.scene({
  id: 's3',
  setup(ctx) {
    this.st = ctx.stage3D({ fov: 30, camera: [0, 0, 14], tone: 'neutral', exposure: 1.05, env: 'room', samples: 0 });
    const d = new ctx.THREE.DirectionalLight('#FFFFFF', 2.2); d.position.set(-4, 5, 8); this.st.scene.add(d);
    this.title = ctx.extrudedText('ILS', { family: 'num', weight: 900, size: 360, height: 2.4, depth: 0.55, layers: 22, color: '#F4F7FB', sideColor: ctx.P.clay, sideColor2: '#0F5F6B' });
    this.title.position.set(0, 1.1, 0); this.st.add(this.title);
  },
  draw(t, lt, ctx) {
    const { X, P, W, H, at, wordTime } = ctx, I = window.ILS;
    I.sky(ctx, t, { hz: 0.5 });
    const wi = wordTime('l3', 5), tl = t - wi.s;                  // لحظة نطق ILS
    /* نبضات رادار من نقطة الاختفاء */
    const vp = [540, 880];
    for (let i = 0; i < 4; i++) { const k = ((lt * 0.45 + i / 4) % 1); X.globalAlpha = (1 - k) * 0.35; X.strokeStyle = P.clay; X.lineWidth = 4; X.beginPath(); X.ellipse(vp[0], vp[1], 80 + k * 700, (80 + k * 700) * 0.42, 0, 0, 6.283); X.stroke(); }
    X.globalAlpha = 1;
    /* مدرج منظوري */
    const gp = at(lt, 0, 0.8, 'expoOut');
    X.save(); X.globalAlpha = 0.9 * gp;
    for (const s of [-1, 1]) { X.strokeStyle = '#DCE6F2'; X.lineWidth = 5; X.beginPath(); X.moveTo(vp[0] + s * 18, vp[1]); X.lineTo(vp[0] + s * 560, 1500); X.stroke(); }
    X.strokeStyle = P.acc; X.lineWidth = 8; X.setLineDash([40, 40]); X.lineDashOffset = -lt * 220; X.beginPath(); X.moveTo(vp[0], vp[1]); X.lineTo(vp[0], 1500); X.stroke(); X.restore();
    /* السر */
    const sec = at(lt, 0, 0.5, 'expoOut') * (1 - at(t, wi.s - 0.25, wi.s + 0.05));
    if (sec > 0.01) {
      ctx.text(X, 'السر', 540, 760, { family: 'display', size: 330 * (0.95 + 0.05 * sec), color: P.ink, alpha: sec });
      for (let i = 0; i < 3; i++) { X.globalAlpha = sec * (0.4 + 0.6 * ((lt * 2 + i * 0.33) % 1 < 0.5 ? 1 : 0.2)); X.fillStyle = P.acc; X.beginPath(); X.arc(440 + i * 100, 900, 14, 0, 6.283); X.fill(); }
      X.globalAlpha = 1;
    }
    /* ILS ثلاثي الأبعاد */
    if (tl > -0.05) {
      const k = at(t, wi.s - 0.02, wi.s + 0.5, 'expoOut');
      this.title.scale.setScalar(0.9 + 0.1 * k);
      this.title.position.y = 1.1; this.st.orbit(Math.sin(lt * 0.9) * 0.3, 0.06, 14 - 1.5 * k, [0, 1.1, 0]);
      X.save(); X.globalAlpha = Math.min(1, k * 1.6); this.st.draw(X); X.restore();
      X.globalAlpha = 0.9 * (1 - at(t, wi.s, wi.s + 0.35)); X.fillStyle = '#FFFFFF'; X.fillRect(0, 0, W, H); X.globalAlpha = 1;
    }
    I.scrim(ctx, 1180, 1560);
    I.caption(ctx, t, 'l3', 0, 4, { y: 1380, size: 92, hold: 0.25 });
    I.caption(ctx, t, 'l4', 0, 4, { y: 1380, size: 88, hl: [2, 3, 4], hold: 0.6 });
  }
});
