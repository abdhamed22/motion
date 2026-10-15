MOTION.scene({
  id: 's4',
  draw(t, lt, ctx) {
    const { X, P, W, H, at, wordTime, noise1 } = ctx, I = window.ILS, wt = i => wordTime('l4', i);
    I.sky(ctx, t, { hz: 0.9, stars: false, top: '#02040A', mid: '#07101C', bot: '#07101C' });
    const e1 = at(t, wt(5).s - 0.25, wt(5).s + 0.2, 'cubicInOut'), e2 = at(t, wt(11).s - 0.2, wt(11).s + 0.2, 'cubicInOut');
    /* أ: فقدان السيطرة: أفق يميل + مقود */
    if (e1 < 1) {
      X.save(); X.globalAlpha = 1 - e1; const tilt = 0.45 * Math.sin(lt * 1.7) * at(t, wt(2).s, wt(3).s, 'cubicOut');
      X.save(); X.translate(540, 560); X.rotate(tilt); X.beginPath(); X.arc(0, 0, 300, 0, 6.283); X.clip(); X.fillStyle = '#143B66'; X.fillRect(-400, -400, 800, 400); X.fillStyle = '#3A2A1E'; X.fillRect(-400, 0, 800, 400); X.fillStyle = '#F4F7FB'; X.fillRect(-400, -3, 800, 6); X.restore();
      X.strokeStyle = P.ink; X.lineWidth = 12; X.beginPath(); X.arc(540, 560, 300, 0, 6.283); X.stroke();
      X.strokeStyle = P.acc; X.lineWidth = 10; X.beginPath(); X.moveTo(400, 560); X.lineTo(500, 560); X.lineTo(540, 530); X.lineTo(580, 560); X.lineTo(680, 560); X.stroke();
      I.yoke(X, 540, 1040 + 14 * Math.sin(lt * 9), 1.1, P.ink, 14); X.restore();
    }
    /* ب: انفصال الهواء عن الجناح */
    if (e1 > 0 && e2 < 1) {
      X.save(); X.globalAlpha = e1 * (1 - e2); const aoa = 0.12 + 0.5 * at(t, wt(7).s, wt(9).s + 0.3, 'cubicInOut'), br = at(t, wt(9).s, wt(9).s + 0.5);
      X.translate(540, 600); X.rotate(-aoa);
      X.fillStyle = '#E8EEF7'; X.beginPath(); X.moveTo(-320, 8); X.quadraticCurveTo(-300, -40, -100, -50); X.quadraticCurveTo(160, -50, 330, 20); X.lineTo(-320, 14); X.closePath(); X.fill();
      X.strokeStyle = P.hi; X.lineWidth = 5; X.lineCap = 'round';
      for (let i = 0; i < 9; i++) { const y0 = -190 + i * 48; X.beginPath(); X.moveTo(-480, y0 + 60); if (y0 > -60 && br > 0) { X.bezierCurveTo(-200, y0 + 20, -60 + 60 * br, y0 - 20, 0, y0 + 10 * Math.sin(lt * 14 + i) * br); X.lineTo(160 + 40 * br, y0 + 40 * Math.sin(lt * 14 + i * 2) * br + 40 * br); } else { X.bezierCurveTo(-200, y0 + 20, 0, y0 - 40, 480, y0 + 30); } X.stroke(); }
      X.restore();
    }
    /* ج: السقوط نحو المحيط */
    if (e2 > 0) {
      X.save(); X.globalAlpha = e2; const f = at(t, wt(12).s - 0.3, wt(15).e + 0.4, 'quadIn'), oy = 1060 + 40;
      X.fillStyle = '#0C2540'; X.fillRect(0, oy, W, 400); X.strokeStyle = 'rgba(143,233,245,0.45)'; X.lineWidth = 4; for (let j = 0; j < 3; j++) { X.beginPath(); for (let x = 0; x <= W; x += 20) { const y = oy + 14 + j * 40 + Math.sin(x * 0.02 + lt * 1.5 + j) * 7; x ? X.lineTo(x, y) : X.moveTo(x, y); } X.stroke(); }
      const py = 280 + (oy - 120 - 280) * f, sh = noise1(t * 40, 6) * 5 * f;
      I.planeSide(X, 540 + sh, py, 1.4, -0.25 + 0.15 * Math.sin(lt * 5) * (1 - f), '#C9D3E0', 1, P.acc);
      X.strokeStyle = 'rgba(244,247,251,0.35)'; X.lineWidth = 6; for (let i = 0; i < 6; i++) { const x = 220 + i * 120; X.beginPath(); X.moveTo(x, py - 200 - (i % 3) * 60); X.lineTo(x, py - 80); X.stroke(); }
      /* مسطرة الارتفاع تهبط */
      I.rr(X, 960, 280, 26, 700, 13); X.fillStyle = '#16294A'; X.fill(); X.fillStyle = P.clay; I.rr(X, 960, 280 + 700 * f, 26, 700 * (1 - f) + 10, 13); X.fill();
      X.restore();
    }
    I.vig(ctx, '255,50,30', 0.2 + 0.3 * at(t, wt(12).s, wt(15).e)); I.scrim(ctx, 1260, 1620);
    I.caption(ctx, t, 'l4', 0, 4, { y: 1400, size: 90, hl: [2, 3, 4] });
    I.caption(ctx, t, 'l4', 5, 10, { y: 1400, size: 88, hl: [8, 9, 10] });
    I.caption(ctx, t, 'l4', 11, 15, { y: 1400, size: 90, hl: [12, 13, 15], hold: 0.9 });
  }
});
