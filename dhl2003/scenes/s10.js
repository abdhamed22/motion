MOTION.scene({
  id: 's10',
  draw(t, lt, ctx) {
    const { X, P, W, H, at, wordTime, noise1 } = ctx, I = window.ILS, wt = i => wordTime('l11', i), r = ctx.rng('dust');
    const t0 = ctx.scene.start, L = s => s - t0;                               // زمن نسبي
    I.sky(ctx, t, { hz: 0.8, stars: true, top: '#05080F', mid: '#241420', bot: '#0A0F1A' });
    const gy = 1010, rwEnd = 700;
    /* الأرض: مدرج ثم أرض غير ممهدة */
    X.fillStyle = '#121B2D'; X.fillRect(0, gy, rwEnd, 260); X.fillStyle = '#E8EEF7'; X.fillRect(60, gy - 6, rwEnd - 60, 12);
    X.fillStyle = '#3B2A1C'; X.fillRect(rwEnd, gy, W - rwEnd, 260); const rr = ctx.rng('dirt'); X.fillStyle = '#5A4128'; for (let i = 0; i < 90; i++) X.fillRect(rwEnd + rr() * (W - rwEnd), gy + 8 + rr() * 220, 5 + rr() * 10, 4);
    X.fillStyle = P.clay; for (let i = 0; i < 8; i++) X.fillRect(rwEnd - 6, gy - 40 + i * 0, 8, 40);
    /* حركة الطائرة */
    const tTouch = L(wt(11).s) + 0.1, tEnd = L(wt(24).s) - 0.3;
    let px, py, ang;
    if (lt < tTouch) { const u = at(lt, 0, tTouch, 'sineIn'); px = -120 + 400 * u; py = 420 + (gy - 56 - 420) * u + 70 * Math.sin(lt * 3.2) * (1 - u) ; ang = 0.12 + 0.2 * Math.sin(lt * 3.2) * (1 - u); }
    else { const u = at(lt, tTouch, tEnd, 'quadOut'); px = 280 + 560 * u; py = gy - 56; ang = 0; }
    const wob = lt < tTouch ? noise1(lt * 6, 3) * 6 : 0; I.planeSide(X, px, py + wob, 1.3, ang, '#EEF2F8', 1, P.acc);
    /* شرر وغبار بعد الملامسة */
    if (lt > tTouch) { const e = lt - tTouch; for (let i = 0; i < 14; i++) { const a = r() * 0.8, v = 120 + r() * 300; X.globalAlpha = Math.max(0, 1 - e * 0.5) * (px < rwEnd ? 1 : 0.0); X.fillStyle = i % 2 ? P.acc : P.hi; X.fillRect(px - 60 - v * e * 0.5 * Math.cos(a), gy - 8 - v * e * Math.sin(a) * (1 - e * 0.4), 8, 5); } X.globalAlpha = 1;
      if (px > rwEnd - 60) for (let i = 0; i < 16; i++) { const ph = ((lt * 0.8 + i / 16) % 1); X.globalAlpha = 0.5 * (1 - ph); X.fillStyle = '#8A6A45'; X.beginPath(); X.arc(px - 120 - ph * 260 + r() * 30, gy - 20 - ph * 140 * r(), 36 + ph * 70, 0, 6.283); X.fill(); } X.globalAlpha = 1; }
    /* بغداد */
    const bk = at(t, wt(10).s - 0.1, wt(10).s + 0.4, 'expoOut') * (1 - at(t, wt(11).s + 0.1, wt(11).s + 0.5)); if (bk > 0) { X.save(); X.globalAlpha = bk; I.card(X, 340, 320, 400, 100, { fill: P.acc, r: 50 }); ctx.text(X, 'بغداد', 540, 392, { family: 'display', size: 84, color: '#0A0D16' }); X.restore(); }
    const ek = at(t, wt(25).s - 0.2, wt(25).s + 0.4, 'expoOut'); if (ek > 0) { X.save(); X.globalAlpha = ek; I.card(X, 520, 420, 480, 96, { fill: '#5A4128', stroke: P.hi, lw: 4, r: 48 }); ctx.text(X, 'أرض غير ممهدة', 760, 490, { family: 'body', weight: 900, size: 52, color: P.ink }); X.restore(); }
    I.vig(ctx, '255,50,30', 0.45 * (0.5 + 0.5 * Math.sin(t * 10)) * (1 - at(t, wt(4).s - 0.2, wt(4).s + 0.2)) * at(t, wt(3).s - 0.6, wt(3).s));
    I.scrim(ctx, 1230, 1600);
    I.caption(ctx, t, 'l11', 0, 3, { y: 1370, size: 92, hl: [1, 3] });
    I.caption(ctx, t, 'l11', 4, 10, { y: 1370, size: 86, hl: [4, 5, 10] });
    I.caption(ctx, t, 'l11', 11, 15, { y: 1370, size: 88, hl: [11, 14, 15] });
    I.caption(ctx, t, 'l11', 16, 20, { y: 1370, size: 90, hl: [18, 19, 20] });
    I.caption(ctx, t, 'l11', 21, 25, { y: 1370, size: 90, hl: [21, 25], hold: 0.8 });
  }
});
