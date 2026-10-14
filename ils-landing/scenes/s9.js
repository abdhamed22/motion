MOTION.scene({
  id: 's9',
  draw(t, lt, ctx) {
    const { X, P, W, H, at, wordTime } = ctx, I = window.ILS, wt = i => wordTime('l10', i);
    I.sky(ctx, t, { hz: 0.9, stars: false, top: '#08111F', mid: '#0C1A2E', bot: '#0C1A2E' });
    /* ── أ: الشروط ما تكتمل ── */
    const aOut = at(lt, 3.0, 3.45, 'cubicInOut');
    if (aOut < 1) {
      X.save(); X.globalAlpha = 1 - aOut; X.translate(0, -60 * aOut);
      const k = at(lt, 0, 0.5, 'expoOut'), fail = at(t, wt(2).s, wt(2).s + 0.45, 'expoOut');
      const col = fail > 0.5 ? P.acc : P.clay;
      X.fillStyle = 'rgba(39,195,216,0.08)'; X.beginPath(); X.moveTo(540, 300); X.lineTo(770, 380); X.lineTo(770, 640); X.quadraticCurveTo(770, 800, 540, 900); X.quadraticCurveTo(310, 800, 310, 640); X.lineTo(310, 380); X.closePath(); X.fill();
      ctx.drawPath(X, 'M540 300 L770 380 L770 640 Q770 800 540 900 Q310 800 310 640 L310 380 Z', k, { width: 14, color: col, cap: 'round' });
      I.cross(X, 540, 610, 100, at(t, wt(2).s + 0.1, wt(2).s + 0.5), P.acc, 26);
      /* بنود: اثنين تكتمل، الثالث يبقى فاضي */
      [0, 1, 2].forEach(i => {
        const y = 1010 + i * 80, a = at(lt, 0.2 + i * 0.12, 0.6 + i * 0.12, 'expoOut'); X.save(); X.globalAlpha = a;
        I.rr(X, 180, y, 560, 22, 11); X.fillStyle = '#27415F'; X.fill(); I.rr(X, 180, y, 560 * (0.6 + 0.1 * i), 22, 11); X.fillStyle = P.hi; X.fill();
        X.beginPath(); X.arc(850, y + 11, 30, 0, 6.283);
        if (i < 2) { X.fillStyle = P.acc; X.fill(); I.check(X, 850, y + 12, 15, 1, '#0A1424', 8); }
        else { X.setLineDash([10, 9]); X.strokeStyle = P.acc; X.lineWidth = 6; X.lineDashOffset = -lt * 30; X.stroke(); }
        X.restore();
      });
      X.restore();
    }
    /* ── ب: النزول لين الارتفاع المحدد والمدرج مو باين ── */
    const bIn = at(lt, 3.0, 3.6, 'expoOut');
    if (bIn > 0) {
      X.save(); X.globalAlpha = bIn;
      const gy = 1040, A = [880, gy - 6], B = [90, 470], pathY = x => A[1] + (B[1] - A[1]) * ((x - A[0]) / (B[0] - A[0]));
      X.strokeStyle = 'rgba(124,140,166,0.12)'; X.lineWidth = 2;
      for (let x = 0; x <= W; x += 90) { X.beginPath(); X.moveTo(x, 150); X.lineTo(x, 1220); X.stroke(); } for (let y = 150; y <= 1220; y += 90) { X.beginPath(); X.moveTo(0, y); X.lineTo(W, y); X.stroke(); }
      X.fillStyle = '#13213A'; X.fillRect(0, gy, W, 200); X.fillStyle = '#E8EEF7'; X.fillRect(300, gy - 6, 700, 12);
      X.strokeStyle = P.acc; X.lineWidth = 7; X.globalAlpha = bIn * 0.8; X.beginPath(); X.moveTo(A[0], A[1]); X.lineTo(B[0], B[1]); X.stroke(); X.globalAlpha = bIn;
      /* الارتفاع المحدد */
      const dy = 760, wd = wt(13), wm = wt(14), dl = at(t, wd.s - 0.05, wd.s + 0.7, 'cubicOut');
      X.save(); X.strokeStyle = P.hi; X.lineWidth = 6; X.setLineDash([30, 20]); X.lineDashOffset = -lt * 40;
      X.beginPath(); X.moveTo(110, dy); X.lineTo(110 + 840 * dl, dy); X.stroke(); X.restore();
      const chip = at(t, wd.s + 0.15, wd.s + 0.55, 'expoOut'); if (chip > 0) { X.save(); X.globalAlpha = chip; I.card(X, 600, dy - 130, 340, 78, { fill: P.hi, r: 39 }); ctx.text(X, 'الارتفاع المحدد', 770, dy - 74, { family: 'body', weight: 900, size: 44, color: '#0A1424' }); X.restore(); }
      /* الطائرة تنزل لين خط القرار */
      const pk = at(lt, 3.2, 6.9, 'sineInOut'), pxx = 160 + (496 - 160) * pk, py = pathY(pxx) - 58;
      I.planeSide(X, pxx, py, 1.35, 0.2, '#EEF2F8', 1, P.acc);
      /* ضباب يبلع المدرج */
      const fg = at(t, wt(7).s - 0.3, wt(11).e, 'cubicInOut'); I.mist(ctx, t, 0.95 * fg, 840, 1060, '#8FA3BF');
      X.globalAlpha = bIn * fg * 0.28; X.fillStyle = '#9FB2CC'; X.fillRect(0, 880, W, 190); X.globalAlpha = bIn;
      /* عين مشطوبة */
      const ek = at(t, wt(10).s - 0.1, wt(10).s + 0.35, 'expoOut'); if (ek > 0) { X.save(); X.globalAlpha = bIn * ek; I.eye(X, 800, 520, 90 * (0.9 + 0.1 * ek), P.ink, at(t, wt(11).s, wt(11).s + 0.4), 12); X.restore(); }
      X.restore();
    }
    I.scrim(ctx, 1200, 1580);
    I.caption(ctx, t, 'l10', 0, 5, { y: 1350, size: 86, hl: [2, 4, 5] });
    I.caption(ctx, t, 'l10', 6, 11, { y: 1350, size: 86, hl: [8, 11] });
    I.caption(ctx, t, 'l10', 12, 14, { y: 1350, size: 96, hl: [13, 14], hold: 0.7 });
  }
});
