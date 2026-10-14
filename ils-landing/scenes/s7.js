MOTION.scene({
  id: 's7',
  draw(t, lt, ctx) {
    const { X, P, W, H, at, wordTime } = ctx, I = window.ILS, wt = i => wordTime('l8', i);
    I.sky(ctx, t, { hz: 0.9, stars: false, top: '#08111F', mid: '#0C1A2E', bot: '#0C1A2E' });
    const tA = 3.0, ph = at(lt, tA - 0.35, tA + 0.15, 'cubicInOut');          // خروج المرحلة الأولى
    /* ── أ: طائرات ومطارات مجهّزة ── */
    if (ph < 1) {
      X.save(); X.globalAlpha = 1 - ph; X.translate(-120 * ph, 0);
      const card = (y, label, k, icon, kc) => {
        const dy = (1 - k) * 60; X.save(); X.globalAlpha *= k; I.card(X, 150, y + dy, 780, 300, { fill: '#102038', stroke: '#27415F', r: 36 });
        icon(250, y + dy + 150);
        ctx.text(X, label, 640, y + dy + 190, { family: 'display', size: 98, color: P.ink });
        ctx.text(X, 'مجهّزة', 640, y + dy + 238, { family: 'body', weight: 700, size: 58, color: P.hi, alpha: 0.0 });
        const c = at(t, kc, kc + 0.4); if (c > 0) { X.beginPath(); X.arc(850, y + dy + 66, 38, 0, 6.283); X.fillStyle = P.acc; X.fill(); I.check(X, 850, y + dy + 68, 20, c, '#0A1424', 9); }
        X.restore();
      };
      card(380, 'طائرة مجهّزة', at(t, wt(2).s - 0.05, wt(2).s + 0.4, 'expoOut'), (x, y) => I.planeTop(X, x, y, 1.15, 0, P.ink), wt(4).s + 0.1);
      card(740, 'مطار مجهّز', at(t, wt(3).s - 0.05, wt(3).s + 0.4, 'expoOut'), (x, y) => { X.fillStyle = P.ink; I.tower(X, x, y + 70, 70, P.ink, 9); }, wt(4).s + 0.35);
      X.restore();
    }
    /* ── ب + ج: شاشة الطيار + ضباب ── */
    if (ph > 0) {
      const pk = at(lt, tA - 0.2, tA + 0.45, 'expoOut'), px = 120, py = 300 + (1 - pk) * 80, pw = 840, phh = 880, cx = px + pw / 2, hz = py + 400;
      X.save(); X.globalAlpha = pk;
      X.beginPath(); X.roundRect(px, py, pw, phh, 40); X.clip();
      const sg = X.createLinearGradient(0, py, 0, hz); sg.addColorStop(0, '#173357'); sg.addColorStop(1, '#2B5A8E'); X.fillStyle = sg; X.fillRect(px, py, pw, hz - py);
      X.fillStyle = '#0F2036'; X.fillRect(px, hz, pw, py + phh - hz);
      /* مدرج يقترب ثم يختفي بالضباب */
      const ap = at(lt, tA, 6.4, 'sineIn'), vis = 1 - at(lt, 6.46, 8.9, 'cubicInOut') * 0.96;
      X.globalAlpha = pk * (0.25 + 0.75 * vis);
      const bw = 40 + 330 * ap; X.fillStyle = '#26364F'; X.beginPath(); X.moveTo(cx - 8, hz + 4); X.lineTo(cx + 8, hz + 4); X.lineTo(cx + bw, py + phh); X.lineTo(cx - bw, py + phh); X.closePath(); X.fill();
      X.fillStyle = '#E8EEF7'; for (let i = 0; i < 6; i++) { const q = ((i / 6 + lt * 0.35) % 1) ** 1.8, y = hz + 8 + q * (py + phh - hz), w = 3 + 16 * q, h = 4 + 40 * q; X.fillRect(cx - w / 2, y, w, h); }
      X.globalAlpha = pk;
      /* ضباب */
      const fg = at(lt, 6.46, 8.9, 'cubicInOut'); if (fg > 0) I.mist(ctx, t, 0.95 * fg, py + 220, py + 820, '#8FA3BF');
      X.globalAlpha = pk * 0.22 * fg; X.fillStyle = '#9FB2CC'; X.fillRect(px, py, pw, phh); X.globalAlpha = pk;
      /* إبر ILS تتمركز بنفسها */
      const lk = at(lt, 3.6, 5.3, 'cubicOut'), dx = 250 * (1 - lk), dy = -210 * (1 - lk), lock = lk > 0.97 ? P.clay : P.acc, cy = py + 480;
      X.fillStyle = 'rgba(244,247,251,0.75)'; for (let i = -2; i <= 2; i++) { if (!i) continue; X.beginPath(); X.arc(cx + i * 130, py + 780, 9, 0, 6.283); X.fill(); X.beginPath(); X.arc(px + 60, cy + i * 110, 9, 0, 6.283); X.fill(); }
      X.strokeStyle = lock; X.lineWidth = 12; X.lineCap = 'round';
      X.beginPath(); X.moveTo(cx + dx, py + 230); X.lineTo(cx + dx, py + 730); X.stroke();
      X.beginPath(); X.moveTo(px + 130, cy + dy); X.lineTo(px + pw - 130, cy + dy); X.stroke();
      /* رمز الطائرة بالمنتصف */
      X.strokeStyle = P.ink; X.lineWidth = 9; X.lineJoin = 'round'; X.beginPath(); X.moveTo(cx - 120, cy + 40); X.lineTo(cx - 30, cy + 40); X.lineTo(cx, cy + 4); X.lineTo(cx + 30, cy + 40); X.lineTo(cx + 120, cy + 40); X.stroke();
      X.restore();
      X.save(); X.globalAlpha = pk; I.card(X, px, py, pw, phh, { stroke: '#27415F', lw: 6, r: 40 });
      /* شريحة الطيار الآلي */
      const ap2 = at(t, wt(7).s - 0.05, wt(7).s + 0.3, 'expoOut'); X.globalAlpha = pk * ap2;
      I.card(X, cx - 190, py + 28 - (1 - ap2) * 16, 380, 84, { fill: P.acc, r: 42 }); ctx.text(X, 'الطيار الآلي', cx, py + 88, { family: 'body', weight: 900, size: 52, color: '#0A1424' });
      X.restore();
      /* مقياس الرؤية */
      const vg = at(lt, 6.46, 7.2, 'expoOut'); if (vg > 0) {
        X.save(); X.globalAlpha = vg; const bx = 995, by = py + 120, bh = 600; X.fillStyle = '#16294A'; I.rr(X, bx, by, 26, bh, 13); X.fill();
        X.fillStyle = P.hi; const lv = 1 - at(lt, 7.0, 8.9, 'cubicInOut') * 0.92; I.rr(X, bx, by + bh * (1 - lv), 26, bh * lv, 13); X.fill();
        ctx.text(X, 'الرؤية', bx + 13, by + bh + 56, { family: 'body', weight: 800, size: 40, color: P.hi }); X.restore();
      }
    }
    I.scrim(ctx, 1180, 1580);
    I.caption(ctx, t, 'l8', 0, 4, { y: 1360, size: 84, hl: [2, 3, 4] });
    I.caption(ctx, t, 'l8', 5, 10, { y: 1360, size: 84, hl: [7, 8, 10] });
    I.caption(ctx, t, 'l8', 11, 16, { y: 1360, size: 84, hl: [14, 15, 16], hold: 0.6 });
  }
});
