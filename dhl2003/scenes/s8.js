MOTION.scene({
  id: 's8',
  draw(t, lt, ctx) {
    const { X, P, W, H, at, wordTime } = ctx, I = window.ILS, wt = i => wordTime('l8', i);
    X.fillStyle = '#04060B'; X.fillRect(0, 0, W, H);
    const sp = at(lt, 0, 1.2, 'expoOut'), g = X.createRadialGradient(540, 620, 0, 540, 620, 700); g.addColorStop(0, `rgba(255,208,138,${0.35 * sp})`); g.addColorStop(1, 'rgba(255,208,138,0)'); X.fillStyle = g; X.fillRect(0, 0, W, H);
    const tw = wt(4).s, qk = at(lt, 0.1, 0.8, 'expoOut') * (1 - at(t, tw - 0.1, tw + 0.2));
    ctx.text(X, '؟', 540, 840, { family: 'display', size: 700 * (0.95 + 0.05 * qk), color: P.acc, alpha: qk * (0.8 + 0.2 * Math.sin(t * 10)) });
    const ek = at(t, tw, tw + 0.5, 'expoOut');
    if (ek > 0) for (const s of [-1, 1]) { X.save(); X.translate(540 + s * 220, 700); X.globalAlpha = ek; X.strokeStyle = P.acc; X.lineWidth = 14; X.beginPath(); X.arc(0, 0, 130 * (0.9 + 0.1 * ek), 0, 6.283); X.stroke(); X.rotate(t * 8 * s); X.lineWidth = 12; for (let i = 0; i < 8; i++) { X.rotate(Math.PI / 4); X.beginPath(); X.moveTo(20, 0); X.lineTo(116, 0); X.stroke(); } X.restore(); }
    I.vig(ctx, '0,0,0', 0.6);
    I.scrim(ctx, 1230, 1600);
    I.caption(ctx, t, 'l8', 0, 4, { y: 1370, size: 92, hl: [3, 4], hold: 0.8 });
  }
});
