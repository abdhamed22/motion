MOTION.scene({
  id: 's7',
  draw(t, lt, ctx) {
    const { X, P, W, H, at, wordTime, noise1 } = ctx, I = window.ILS, wt = i => wordTime('l7', i), r = ctx.rng('blk');
    I.sky(ctx, t, { hz: 0.9, stars: false, top: '#0A0D16', mid: '#0A0D16', bot: '#0A0D16' });
    const dur = ctx.scene.dur, k = at(lt, 0, dur, 'cubicIn');                       // اقتراب الأرض
    /* مدينة من فوق: مربعات تتحرك للأسفل وتكبر */
    X.save(); const zoom = 1 + 1.1 * k; X.translate(540, 760); X.scale(zoom, zoom); X.translate(-540, -760);
    X.fillStyle = '#0F1626'; X.fillRect(-300, -300, 1700, 2000);
    for (let i = 0; i < 70; i++) { const bx = r() * 1500 - 210, by = ((r() * 1900 - lt * 260) % 1900 + 1900) % 1900 - 300, bw = 70 + r() * 150, bh = 70 + r() * 150; X.fillStyle = r() < 0.3 ? '#1D2A44' : '#16213A'; X.fillRect(bx, by, bw, bh); if (r() < 0.5) { X.fillStyle = 'rgba(255,180,58,0.55)'; X.fillRect(bx + bw * 0.4, by + bh * 0.4, 14, 14); } }
    X.strokeStyle = 'rgba(124,140,166,0.25)'; X.lineWidth = 6; for (let i = 0; i < 6; i++) { const y = ((i * 380 - lt * 260) % 1900 + 1900) % 1900 - 300; X.beginPath(); X.moveTo(-300, y); X.lineTo(1400, y); X.stroke(); }
    X.restore();
    /* الطائرة وظلها */
    const px = 540 + 60 * Math.sin(lt * 1.3), py = 640, sc = 1.0 + 0.9 * k, rot = 0.22 * Math.sin(lt * 0.9) + 0.3 * k;
    X.save(); X.globalAlpha = 0.45; X.translate(px + 40 * (1 - k) + 30, py + 420 * (1 - k) + 40); X.rotate(rot); X.scale(sc * 0.9, sc * 0.9); X.fillStyle = '#000'; I.planeTop(X, 0, 0, 1.4, 0, '#000'); X.restore();
    /* أثر دخان */
    for (let i = 0; i < 22; i++) { const ph = i / 22; X.globalAlpha = 0.55 * (1 - ph); X.fillStyle = '#05070C'; X.beginPath(); X.arc(px - Math.sin(rot) * 220 * ph * sc + noise1(i, 7) * 14, py + 220 * ph * sc * Math.cos(rot), (26 + 30 * ph) * sc, 0, 6.283); X.fill(); } X.globalAlpha = 1;
    I.planeTop(X, px, py, 1.4 * sc, rot, '#EEF2F8');
    /* بغداد */
    const bk = at(t, wt(4).s - 0.05, wt(4).s + 0.35, 'expoOut'); if (bk > 0) { X.save(); X.globalAlpha = bk; I.card(X, 120, 260, 360, 100, { fill: P.acc, r: 50 }); ctx.text(X, 'بغداد', 300, 332, { family: 'display', size: 82, color: '#0A0D16' }); X.restore(); }
    const pu = Math.abs(Math.sin(t * (3 + 8 * at(t, wt(7).s, wt(13).e)))); I.vig(ctx, '255,50,30', (0.2 + 0.5 * pu) * at(t, wt(5).s, wt(5).s + 1.0));
    I.scrim(ctx, 1230, 1600);
    I.caption(ctx, t, 'l7', 0, 4, { y: 1370, size: 90, hl: [4] });
    I.caption(ctx, t, 'l7', 5, 6, { y: 1370, size: 100, hl: [5, 6] });
    I.caption(ctx, t, 'l7', 7, 13, { y: 1370, size: 88, hl: [8, 13], hold: 0.8 });
  }
});
