MOTION.scene({
  id: 's7',
  setup(ctx) {
    const { THREE } = ctx;
    this.st = ctx.stage3D({ fov: 36, camera: [0, 0, 20], tone: 'neutral', exposure: 1.05, env: 'room', samples: 0 });
    const d = new THREE.DirectionalLight('#FFE2B0', 2.6); d.position.set(6, 4, 8); this.st.scene.add(d);
    this.plane = window.ILS.plane(ctx); this.st.add(this.plane);
  },
  draw(t, lt, ctx) {
    const { X, P, W, H, at, wordTime, noise1 } = ctx, I = window.ILS, wt = i => wordTime('l7', i), dur = ctx.timeline.duration;
    const sw = at(t, wt(8).s - 0.3, wt(8).s + 0.3, 'cubicInOut');                // الانتقال من الخطأ إلى الإنقاذ
    /* خلفية فجر */
    const g = X.createLinearGradient(0, 0, 0, H); g.addColorStop(0, `rgb(${10 + 20 * sw},${20 + 40 * sw},${36 + 70 * sw})`); g.addColorStop(0.6, sw > 0.5 ? '#2B5C94' : '#0C1A2E'); g.addColorStop(1, sw > 0.5 ? '#FFB43A' : '#0C1A2E'); X.fillStyle = g; X.fillRect(0, 0, W, H);
    /* أ: خطأ الصيانة: مفتاح + تحذير */
    if (sw < 1) {
      X.save(); X.globalAlpha = 1 - sw; const wk = at(t, wt(2).s - 0.1, wt(2).s + 0.4, 'expoOut'), wr = at(t, wt(6).s - 0.1, wt(6).s + 0.4, 'expoOut');
      X.translate(540, 600); X.save(); X.globalAlpha *= wk; X.rotate(-0.7 + (1 - wk) * 0.4); X.strokeStyle = P.ink; X.lineWidth = 36; X.lineCap = 'round'; X.beginPath(); X.moveTo(-60, 180); X.lineTo(60, -120); X.stroke();
      X.lineWidth = 26; X.beginPath(); X.arc(70, -170, 76, 2.2, 7.4); X.stroke(); X.restore();
      if (wr > 0) { X.save(); X.globalAlpha *= wr; X.translate(220, 130); X.scale(0.9 + 0.1 * wr, 0.9 + 0.1 * wr); X.fillStyle = P.acc; X.beginPath(); X.moveTo(0, -130); X.lineTo(130, 100); X.lineTo(-130, 100); X.closePath(); X.fill(); ctx.text(X, '!', 0, 80, { family: 'display', size: 170, color: '#0A1424' }); X.restore(); }
      X.restore();
    }
    /* ب: الطاقم ينقذ الأرواح: طائرة تحلّق */
    if (sw > 0) {
      const k = at(t, wt(8).s, wt(8).s + 0.9, 'expoOut'); this.plane.position.set(-0.2 + 0.6 * Math.sin(lt * 0.6), 1.5 + (1 - k) * -6 + noise1(lt * 0.5, 2) * 0.2, 0);
      this.plane.rotation.set(0.12, 0.5 + 0.12 * Math.sin(lt * 0.5), -0.18 + Math.sin(lt * 0.7) * 0.05); this.plane.scale.setScalar(0.85);
      X.save(); X.globalAlpha = sw; this.st.camera.position.set(0, 1, 20); this.st.camera.lookAt(0, 0.6, 0); this.st.draw(X); X.restore();
      const r = ctx.rng('c'); for (let i = 0; i < 9; i++) { const y = 900 + r() * 500, w = 260 + r() * 300, x = ((r() * 1500 - lt * (60 + r() * 90)) % 1600 + 1600) % 1600 - 250; X.globalAlpha = 0.3 * sw; X.fillStyle = '#FFF1D6'; X.beginPath(); X.ellipse(x, y, w, 40, 0, 0, 6.283); X.fill(); } X.globalAlpha = 1;
    }
    I.scrim(ctx, 1230, 1600);
    I.caption(ctx, t, 'l7', 0, 3, { y: 1370, size: 92, hl: [2] });
    I.caption(ctx, t, 'l7', 4, 7, { y: 1370, size: 92, hl: [6, 7] });
    I.caption(ctx, t, 'l7', 8, 13, { y: 1370, size: 90, hl: [12, 13], hold: 1.0 });
    const fo = at(t, dur - 0.5, dur, 'quadIn'); if (fo > 0) { X.globalAlpha = fo; X.fillStyle = P.bg; X.fillRect(0, 0, W, H); X.globalAlpha = 1; }
  }
});
