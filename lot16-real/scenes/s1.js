/* ───────── مكتبة المشاهد المشتركة (window.ILS) + المشهد 1 ─────────
   كل المشاهد تستعمل نفس العالم: طائرة، مدرج، ضباب، كابشن بتوقيت الكلمة. */
window.ILS = (() => {
  const L = {}, cache = new Map();

  /* خلفية السماء: تدرّج + نجوم */
  L.sky = (ctx, t, o = {}) => {
    const { X, W, H, P } = ctx;
    const g = X.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, o.top || '#050B16'); g.addColorStop(o.hz ?? 0.47, o.mid || '#1A3860'); g.addColorStop(Math.min(1, (o.hz ?? 0.47) + 0.02), o.mid || '#1A3860'); g.addColorStop(1, o.bot || '#0B1626');
    X.fillStyle = g; X.fillRect(0, 0, W, H);
    if (o.stars === false) return;
    const r = ctx.rng('stars');
    for (let i = 0; i < 70; i++) {
      const x = r() * W, y = r() * H * 0.6, s = r.range(1, 2.6), ph = r() * 6.28;
      X.globalAlpha = (0.25 + 0.45 * (0.5 + 0.5 * Math.sin(t * 1.4 + ph))) * (o.starAlpha ?? 1);
      X.fillStyle = '#CFE6FF'; X.fillRect(x, y, s, s);
    }
    X.globalAlpha = 1;
  };

  /* سكريم أسفل الشاشة يرفع قراءة الكابشن */
  L.scrim = (ctx, y0 = 1180, y1 = 1640, a = 0.82) => {
    const { X, W, P } = ctx;
    const g = X.createLinearGradient(0, y0, 0, y1);
    g.addColorStop(0, 'rgba(6,13,26,0)'); g.addColorStop(1, `rgba(6,13,26,${a})`);
    X.fillStyle = g; X.fillRect(0, y0, W, 1920 - y0);
  };

  /* كابشن: عبارة من السطر (from..to)، كل كلمة تطلع بوقتها */
  L.caption = (ctx, t, line, from, to, o = {}) => {
    const { X, P, text, wordTime, wordsOf, at } = ctx;
    const ws = wordsOf(line);
    to = Math.min(to, ws.length - 1);
    const s = wordTime(line, from).s, e = wordTime(line, to).e;
    const hold = o.hold ?? 0.4, ns = to + 1 < ws.length ? wordTime(line, to + 1).s - 0.13 : 1e9, tIn = s - 0.14, tOut = Math.min(e + hold, ns);
    if (t < tIn || t > tOut + 0.12) return;
    const phrase = ws.slice(from, to + 1).map(w => w.w).join(' ');
    const key = line + from + to + (o.size || 78);
    let Lo = cache.get(key);
    if (!Lo) { Lo = text.layout(X, phrase, { family: o.family || 'body', weight: o.weight || 800, size: o.size || 78, maxWidth: o.maxWidth || 930, lineHeight: o.lh || 1.38 }); cache.set(key, Lo); }
    const fade = 1 - at(t, tOut, tOut + 0.1, 'quadIn');
    X.save(); X.globalAlpha = fade;
    text.drawLayout(X, Lo, 540, o.y || 1400, {
      align: 'center', color: o.color || P.ink,
      perWord: i => {
        const w = wordTime(line, from + i), k = at(t, w.s - 0.1, w.s + 0.24, 'expoOut');
        const hl = o.hl && o.hl.includes(from + i);
        return { clipUp: 1, dy: (1 - k) * 64, alpha: k > 0 ? 1 : 0, color: hl ? P.acc : undefined };
      }
    });
    X.restore();
  };

  /* ضباب 2D: شرائح تتحرك */
  L.mist = (ctx, t, amt, y0, y1, color = '#1C3552') => {
    if (amt <= 0.001) return;
    const { X, W } = ctx;
    for (let i = 0; i < 6; i++) {
      const y = y0 + (y1 - y0) * (i / 5), sp = 18 + i * 9, off = ((t * sp + i * 311) % 1600) - 260;
      const g = X.createLinearGradient(0, y - 130, 0, y + 130);
      g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(0.5, color); g.addColorStop(1, 'rgba(0,0,0,0)');
      X.globalAlpha = amt * (0.34 + 0.12 * Math.sin(t * 0.6 + i));
      X.fillStyle = g; X.fillRect(-300 + off * 0.35, y - 130, W + 600, 260);
    }
    X.globalAlpha = 1;
  };

  /* طائرة 3D من مجسّمات بسيطة: الأنف باتجاه -z */
  L.plane = (ctx, o = {}) => {
    const { THREE } = ctx, g = new THREE.Group();
    const body = new THREE.MeshStandardMaterial({ color: o.body || '#EEF2F8', roughness: 0.42, metalness: 0.12, side: THREE.DoubleSide });
    const wing = new THREE.MeshStandardMaterial({ color: o.wing || '#C7D2E1', roughness: 0.5, metalness: 0.2, side: THREE.DoubleSide });
    const accM = new THREE.MeshStandardMaterial({ color: o.acc || ctx.P.acc, roughness: 0.5, side: THREE.DoubleSide });
    const fus = new THREE.Mesh(new THREE.CapsuleGeometry(0.42, 4.6, 8, 20), body); fus.rotation.x = Math.PI / 2; g.add(fus);
    const nose = new THREE.Mesh(new THREE.SphereGeometry(0.43, 20, 14), body); nose.position.z = -2.65; nose.scale.set(1, 0.95, 1.1); g.add(nose);
    const win = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.13, 0.5), new THREE.MeshStandardMaterial({ color: '#0E1B2E', roughness: 0.2, metalness: 0.5 })); win.position.set(0, 0.2, -2.75); g.add(win);
    const wingShape = (s) => { const sh = new THREE.Shape(); sh.moveTo(0.3 * s, -0.7); sh.lineTo(3.7 * s, 1.15); sh.lineTo(3.7 * s, 1.6); sh.lineTo(0.3 * s, 0.85); sh.closePath(); return sh; };
    for (const s of [1, -1]) {
      const w = new THREE.Mesh(new THREE.ExtrudeGeometry(wingShape(s), { depth: 0.09, bevelEnabled: false }), wing); w.rotation.x = Math.PI / 2; w.position.set(0, -0.12, -0.2); g.add(w);
      const tp = new THREE.Mesh(new THREE.ExtrudeGeometry(wingShape(s), { depth: 0.06, bevelEnabled: false }), wing); tp.rotation.x = Math.PI / 2; tp.scale.set(0.42, 1, 0.5); tp.position.set(0, 0.1, 2.15); g.add(tp);
      const en = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.27, 1.15, 18), body); en.rotation.x = Math.PI / 2; en.position.set(1.35 * s, -0.42, -0.25); g.add(en);
      const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.1, 10, 8), new THREE.MeshBasicMaterial({ color: s > 0 ? '#41E37A' : '#FF4D4D' })); lamp.position.set(3.72 * s, -0.07, 1.4); g.add(lamp);
    }
    const fin = new THREE.Mesh(new THREE.BoxGeometry(0.09, 1.25, 1.0), accM); fin.position.set(0, 0.85, 2.15); fin.rotation.x = -0.35; g.add(fin);
    const stripe = new THREE.Mesh(new THREE.CylinderGeometry(0.435, 0.435, 4.6, 24, 1, true), accM); stripe.rotation.x = Math.PI / 2; stripe.scale.set(1, 1, 0.02); stripe.position.y = -0.02; g.add(stripe);
    const strobe = new THREE.Mesh(new THREE.SphereGeometry(0.09, 10, 8), new THREE.MeshBasicMaterial({ color: '#FFFFFF' })); strobe.position.set(0, 0.45, 0.4); g.add(strobe);
    g.userData.strobe = strobe;
    return g;
  };

  /* مدرج 3D على طول -z: العتبة عند z=0 */
  L.runway = (ctx, o = {}) => {
    const { THREE } = ctx, g = new THREE.Group(), len = o.len || 170, wd = o.width || 15;
    const mat = (c, extra) => new THREE.MeshBasicMaterial(Object.assign({ color: c }, extra));
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(900, 900), mat(o.ground || '#0B1626')); ground.rotation.x = -Math.PI / 2; ground.position.y = -0.02; g.add(ground);
    const strip = new THREE.Mesh(new THREE.PlaneGeometry(wd, len), mat(o.strip || '#1A2538')); strip.rotation.x = -Math.PI / 2; strip.position.set(0, 0, -len / 2); g.add(strip);
    const addInst = (geo, color, n, place) => { const m = new THREE.InstancedMesh(geo, mat(color), n); const d = new THREE.Object3D(); for (let i = 0; i < n; i++) { place(d, i); d.updateMatrix(); m.setMatrixAt(i, d.matrix); } m.instanceMatrix.needsUpdate = true; g.add(m); return m; };
    /* خط المنتصف */
    const nd = Math.floor(len / 11);
    addInst(new THREE.BoxGeometry(0.7, 0.03, 5), '#E8EEF7', nd, (d, i) => d.position.set(0, 0.03, -8 - i * 11));
    /* حواف */
    for (const s of [1, -1]) addInst(new THREE.BoxGeometry(0.35, 0.03, len), '#DCE6F2', 1, (d) => d.position.set(s * (wd / 2 - 0.5), 0.03, -len / 2));
    /* علامات التلامس */
    for (let k = 0; k < 3; k++) for (const s of [1, -1]) addInst(new THREE.BoxGeometry(1.5, 0.03, 7), '#E8EEF7', 1, (d) => d.position.set(s * (2.6 + k * 1.6), 0.03, -34 - k * 14));
    /* مصابيح الحواف */
    const ne = Math.floor(len / 9);
    g.edgeLights = [];
    for (const s of [1, -1]) g.edgeLights.push(addInst(new THREE.SphereGeometry(0.34, 8, 6), '#FFF3C4', ne, (d, i) => d.position.set(s * (wd / 2 + 0.9), 0.3, -2 - i * 9)));
    /* عتبة خضراء */
    addInst(new THREE.BoxGeometry(0.7, 0.2, 0.7), '#35E07A', 14, (d, i) => d.position.set(-wd / 2 + 0.9 + i * ((wd - 1.8) / 13), 0.15, 0.6));
    /* مصابيح الاقتراب (الأرنب): تتتابع نحو المدرج */
    const na = o.approach ?? 30;
    g.approach = addInst(new THREE.BoxGeometry(0.8, 0.5, 0.8), '#FFFFFF', na, (d, i) => d.position.set(0, 0.35, 3 + i * 4.2));
    g.approach.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(na * 3), 3);
    g.approach.material.color.set('#FFFFFF');
    g.approach.material.vertexColors = false;
    g.na = na;
    g.bars = [];
    for (let i = 3; i < na; i += 3) for (const s of [-1, 1]) for (let j = 1; j <= 3; j++) g.bars.push([s * j * 1.6, 3 + i * 4.2]);
    addInst(new THREE.BoxGeometry(0.5, 0.35, 0.5), '#FFFFFF', g.bars.length, (d, i) => d.position.set(g.bars[i][0], 0.25, g.bars[i][1]));
    /* مصابيح أرضية متفرقة (مدينة) */
    const r = ctx.rng('city'), nc = 260;
    addInst(new THREE.BoxGeometry(0.6, 0.6, 0.6), '#FFC96B', nc, (d, i) => { const side = r() < 0.5 ? -1 : 1; d.position.set(side * r.range(30, 260), 0.3, r.range(-120, 380)); });
    /* إضاءة وميض الأرنب: يتحدد بالزمن فقط */
    g.update = (t) => {
      const m = g.approach, c = new THREE.Color(), d = new THREE.Object3D();
      for (let i = 0; i < g.na; i++) {
        const ph = ((t * 2.2) % 1) * g.na, k = Math.max(0, 1 - Math.abs(((g.na - 1 - i) - ph + g.na) % g.na) / 2.2);
        d.position.set(0, 0.35, 3 + i * 4.2); d.scale.setScalar(0.6 + 1.0 * k); d.updateMatrix(); m.setMatrixAt(i, d.matrix);
      }
      m.instanceMatrix.needsUpdate = true;
    };
    return g;
  };

  /* طائرة جانبية 2D (الأنف يمين) */
  L.planeSide = (X, x, y, s, rot, color, alpha = 1, accent) => {
    X.save(); X.translate(x, y); X.rotate(rot); X.scale(s, s); X.globalAlpha = alpha; X.fillStyle = color;
    X.beginPath(); X.moveTo(-86, -14); X.lineTo(60, -16); X.quadraticCurveTo(94, -14, 98, 0); X.quadraticCurveTo(92, 14, 60, 16); X.lineTo(-52, 16); X.quadraticCurveTo(-78, 12, -86, -2); X.closePath(); X.fill();
    X.beginPath(); X.moveTo(-84, -12); X.lineTo(-100, -56); X.lineTo(-72, -56); X.lineTo(-44, -14); X.closePath(); X.fillStyle = accent || color; X.fill();
    X.fillStyle = color;
    X.beginPath(); X.moveTo(-8, 12); X.lineTo(-52, 52); X.lineTo(-28, 52); X.lineTo(36, 12); X.closePath(); X.fill();
    X.beginPath(); X.ellipse(8, 30, 20, 9, 0, 0, 6.283); X.fill();
    X.globalAlpha = alpha * 0.55; X.fillStyle = '#0E1B2E'; for (let i = 0; i < 9; i++) { X.beginPath(); X.arc(-40 + i * 11, -4, 2.8, 0, 6.283); X.fill(); }
    X.beginPath(); X.moveTo(70, -12); X.quadraticCurveTo(86, -11, 90, -2); X.lineTo(66, -2); X.closePath(); X.fill();
    X.restore();
  };
  /* طائرة من فوق 2D (الأنف للأعلى) */
  L.planeTop = (X, x, y, s, rot, color, alpha = 1) => {
    X.save(); X.translate(x, y); X.rotate(rot); X.scale(s, s); X.globalAlpha = alpha; X.fillStyle = color;
    X.beginPath(); X.moveTo(0, -80); X.quadraticCurveTo(9, -66, 9, -40); X.lineTo(70, 8); X.lineTo(70, 22); X.lineTo(9, 4); X.lineTo(8, 46);
    X.lineTo(30, 62); X.lineTo(30, 72); X.lineTo(0, 64); X.lineTo(-30, 72); X.lineTo(-30, 62); X.lineTo(-8, 46); X.lineTo(-9, 4);
    X.lineTo(-70, 22); X.lineTo(-70, 8); X.lineTo(-9, -40); X.quadraticCurveTo(-9, -66, 0, -80); X.closePath(); X.fill();
    X.restore();
  };
  /* مستطيل مدوّر */
  L.rr = (X, x, y, w, h, r) => { X.beginPath(); X.roundRect(x, y, w, h, r); };

  /* أيقونات ورموز 2D بالخط (k = تقدّم الرسم 0..1) */
  L.check = (X, x, y, s, k, color, w = 12) => {
    const pts = [[-1, 0.05], [-0.35, 0.7], [1, -0.8]]; X.save(); X.strokeStyle = color; X.lineWidth = w; X.lineCap = 'round'; X.lineJoin = 'round'; X.beginPath();
    const seg = [Math.hypot(0.65, 0.65), Math.hypot(1.35, 1.5)], tot = seg[0] + seg[1]; let d = k * tot;
    X.moveTo(x + pts[0][0] * s, y + pts[0][1] * s);
    const a = Math.min(1, d / seg[0]); X.lineTo(x + (pts[0][0] + (pts[1][0] - pts[0][0]) * a) * s, y + (pts[0][1] + (pts[1][1] - pts[0][1]) * a) * s);
    if (d > seg[0]) { const b = Math.min(1, (d - seg[0]) / seg[1]); X.lineTo(x + (pts[1][0] + (pts[2][0] - pts[1][0]) * b) * s, y + (pts[1][1] + (pts[2][1] - pts[1][1]) * b) * s); }
    X.stroke(); X.restore();
  };
  L.cross = (X, x, y, s, k, color, w = 12) => {
    X.save(); X.strokeStyle = color; X.lineWidth = w; X.lineCap = 'round'; X.beginPath();
    const a = Math.min(1, k * 2), b = Math.max(0, k * 2 - 1);
    X.moveTo(x - s, y - s); X.lineTo(x - s + 2 * s * a, y - s + 2 * s * a);
    if (b > 0) { X.moveTo(x + s, y - s); X.lineTo(x + s - 2 * s * b, y - s + 2 * s * b); }
    X.stroke(); X.restore();
  };
  L.eye = (X, x, y, s, color, slash = 0, w = 9) => {
    X.save(); X.strokeStyle = color; X.fillStyle = color; X.lineWidth = w; X.lineCap = 'round';
    X.beginPath(); X.moveTo(x - s, y); X.quadraticCurveTo(x, y - s * 0.95, x + s, y); X.quadraticCurveTo(x, y + s * 0.95, x - s, y); X.stroke();
    X.beginPath(); X.arc(x, y, s * 0.28, 0, 6.283); X.fill();
    if (slash > 0) { X.strokeStyle = '#0A1424'; X.lineWidth = w + 12; X.beginPath(); X.moveTo(x - s * 0.8, y - s * 0.8); X.lineTo(x - s * 0.8 + 1.6 * s * slash, y - s * 0.8 + 1.6 * s * slash); X.stroke();
      X.strokeStyle = color; X.lineWidth = w; X.beginPath(); X.moveTo(x - s * 0.8, y - s * 0.8); X.lineTo(x - s * 0.8 + 1.6 * s * slash, y - s * 0.8 + 1.6 * s * slash); X.stroke(); }
    X.restore();
  };
  L.tower = (X, x, y, s, color, w = 8) => {
    X.save(); X.strokeStyle = color; X.lineWidth = w; X.lineCap = 'round'; X.lineJoin = 'round';
    X.beginPath(); X.moveTo(x - 0.5 * s, y); X.lineTo(x, y - 2 * s); X.lineTo(x + 0.5 * s, y); X.moveTo(x - 0.33 * s, y - 0.65 * s); X.lineTo(x + 0.33 * s, y - 0.65 * s); X.moveTo(x - 0.17 * s, y - 1.3 * s); X.lineTo(x + 0.17 * s, y - 1.3 * s); X.stroke();
    X.beginPath(); X.arc(x, y - 2 * s, w * 0.9, 0, 6.283); X.fill && (X.fillStyle = color); X.fill(); X.restore();
  };
  L.card = (X, x, y, w, h, o = {}) => {
    X.save(); X.globalAlpha = o.alpha ?? 1; L.rr(X, x, y, w, h, o.r ?? 28);
    if (o.fill) { X.fillStyle = o.fill; X.fill(); } if (o.stroke) { X.strokeStyle = o.stroke; X.lineWidth = o.lw || 4; X.stroke(); } X.restore();
  };
  /* إسقاط نقطة 3D إلى بكسلات التصميم */
  L.proj = (ctx, st, v) => { const p = v.clone().project(st.camera); return [(p.x * 0.5 + 0.5) * ctx.W, (-p.y * 0.5 + 0.5) * ctx.H]; };

  /* شخص مبسّط: الأصل عند مركز الجذع */
  L.person = (X, x, y, s, color, rot = 0, o = {}) => {
    X.save(); X.translate(x, y); X.rotate(rot); X.scale(s, s); X.fillStyle = color; X.strokeStyle = color; X.lineCap = 'round';
    X.beginPath(); X.arc(0, -58, 15, 0, 6.283); X.fill();
    L.rr(X, -22, -38, 44, 72, 16); X.fill();
    if (!o.noLegs) { L.rr(X, -20, 28, 16, 62, 8); X.fill(); L.rr(X, 4, 28, 16, 62, 8); X.fill(); }
    X.lineWidth = 11; X.beginPath(); X.moveTo(-20, -28); X.lineTo(o.armL ? o.armL[0] : -38, o.armL ? o.armL[1] : 8); X.moveTo(20, -28); X.lineTo(o.armR ? o.armR[0] : 38, o.armR ? o.armR[1] : 8); X.stroke();
    X.restore();
  };
  /* برغي: رأس + ساق (جانبي) */
  L.screw = (X, x, y, w, h, color, lw = 0) => {
    X.save(); X.translate(x, y); if (lw) { X.strokeStyle = color; X.lineWidth = lw; X.fillStyle = 'rgba(0,0,0,0)'; } else X.fillStyle = color;
    const f = lw ? 'stroke' : 'fill';
    X.beginPath(); X.roundRect(-w * 0.9, -h / 2, w * 1.8, h * 0.18, 6); X[f]();
    X.beginPath(); X.roundRect(-w / 2, -h / 2 + h * 0.18, w, h * 0.82, 4); X[f]();
    if (!lw) { X.strokeStyle = 'rgba(10,20,36,0.55)'; X.lineWidth = 3; for (let i = 0; i < 5; i++) { const yy = -h / 2 + h * (0.34 + i * 0.13); X.beginPath(); X.moveTo(-w / 2, yy); X.lineTo(w / 2, yy + 5); X.stroke(); } }
    X.restore();
  };

  L.grid = (ctx, a = 0.10) => { const { X, W } = ctx; X.strokeStyle = `rgba(124,140,166,${a})`; X.lineWidth = 2; for (let x = 0; x <= W; x += 90) { X.beginPath(); X.moveTo(x, 150); X.lineTo(x, 1220); X.stroke(); } for (let y = 150; y <= 1220; y += 90) { X.beginPath(); X.moveTo(0, y); X.lineTo(W, y); X.stroke(); } };
  L.vig = (ctx, rgb, a) => { if (a <= 0.005) return; const { X, W, H } = ctx, g = X.createRadialGradient(W / 2, H / 2, 380, W / 2, H / 2, 1150); g.addColorStop(0, `rgba(${rgb},0)`); g.addColorStop(1, `rgba(${rgb},${a})`); X.fillStyle = g; X.fillRect(0, 0, W, H); };
  L.yoke = (X, x, y, s, color, w = 18) => { X.save(); X.translate(x, y); X.scale(s, s); X.strokeStyle = color; X.lineWidth = w; X.lineCap = 'round'; X.lineJoin = 'round'; X.beginPath(); X.moveTo(-150, -50); X.lineTo(-70, -50); X.lineTo(-70, 30); X.moveTo(150, -50); X.lineTo(70, -50); X.lineTo(70, 30); X.moveTo(-70, -50); X.lineTo(70, -50); X.moveTo(0, -50); X.lineTo(0, 120); X.stroke(); X.restore(); };
  L.dial = (X, x, y, r, v, ok, bad, w = 16) => { X.save(); X.translate(x, y); const a0 = Math.PI * 0.75, a1 = Math.PI * 2.25, col = v < 0.3 ? bad : ok; X.strokeStyle = '#27415F'; X.lineWidth = w; X.lineCap = 'round'; X.beginPath(); X.arc(0, 0, r, a0, a1); X.stroke(); X.strokeStyle = col; X.beginPath(); X.arc(0, 0, r, a0, a0 + (a1 - a0) * v); X.stroke();
    const a = a0 + (a1 - a0) * v; X.lineWidth = 12; X.beginPath(); X.moveTo(0, 0); X.lineTo(Math.cos(a) * (r - 30), Math.sin(a) * (r - 30)); X.stroke(); X.fillStyle = col; X.beginPath(); X.arc(0, 0, 14, 0, 6.283); X.fill(); X.restore(); };
  L.crate = (X, x, y, s, color) => { X.save(); X.translate(x, y); X.scale(s, s); X.fillStyle = color; X.beginPath(); X.roundRect(-40, -32, 80, 64, 8); X.fill(); X.strokeStyle = 'rgba(7,11,20,0.55)'; X.lineWidth = 6; X.beginPath(); X.moveTo(-40, -8); X.lineTo(40, -8); X.moveTo(0, -32); X.lineTo(0, -8); X.stroke(); X.restore(); };

  L.gearPlane = (X, x, y, s, ang, accent, gl = 46, color = '#EEF2F8') => {
    X.save(); X.translate(x, y); X.rotate(ang); X.scale(s, s); X.strokeStyle = '#9AA9BD'; X.lineWidth = 6; X.lineCap = 'round';
    for (const gx of [34, -26]) { X.beginPath(); X.moveTo(gx, 14); X.lineTo(gx, gl - 8); X.stroke(); X.fillStyle = '#0E1B2E'; X.beginPath(); X.arc(gx, gl - 8, 11, 0, 6.283); X.fill(); }
    X.restore(); L.planeSide(X, x, y, s, ang, color, 1, accent);
  };
  return L;
})();


/* ═════════ مكتبة الواقعية: طائرة تفصيلية + مدرج بإضاءة + شرر ودخان + سماء الغروب ═════════ */
window.REAL = (() => {
  const R = {};
  const HDR = (THREE, hex, k) => new THREE.Color(hex).multiplyScalar(k);
  R.HDR = HDR;
  const cv = (w, h, fn) => { const c = document.createElement('canvas'); c.width = w; c.height = h; fn(c.getContext('2d'), w, h); return c; };

  /* طائرة ركاب: الأنف باتجاه -z (طول ≈ 7.6) */
  R.plane = (ctx, o = {}) => {
    const { THREE } = ctx, g = new THREE.Group(), navy = '#0F2A5E';
    const prof = [[0.02, -3.8], [0.2, -3.7], [0.38, -3.45], [0.5, -3.0], [0.55, -2.4], [0.55, 2.2], [0.5, 2.9], [0.38, 3.4], [0.2, 3.7], [0.05, 3.85]].map(p => new THREE.Vector2(p[0], p[1]));
    const fg = new THREE.LatheGeometry(prof, 48); fg.rotateX(Math.PI / 2);
    const pos = fg.attributes.position, col = new Float32Array(pos.count * 3), c = new THREE.Color();
    for (let i = 0; i < pos.count; i++) { const y = pos.getY(i); const t = Math.min(1, Math.max(0, (-0.05 - y) / 0.28)); c.set('#F2F5F9').lerp(new THREE.Color(navy), Math.min(1, Math.max(0, (-y - 0.18) / 0.22))); col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b; }
    fg.setAttribute('color', new THREE.BufferAttribute(col, 3));
    const body = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.34, metalness: 0.2, envMapIntensity: 0.6 });
    g.add(new THREE.Mesh(fg, body));
    const dark = new THREE.MeshStandardMaterial({ color: '#0A1220', roughness: 0.15, metalness: 0.6 });
    for (const s of [-1, 1]) {
      for (let i = 0; i < 26; i++) { const z = -2.0 + i * 0.145; const w = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.085, 0.07), dark); w.position.set(s * 0.552, 0.12, z); g.add(w); }
      const ck = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.1, 0.25), dark); ck.position.set(s * 0.33, 0.16, -3.12); ck.rotation.y = s * -0.55; g.add(ck);
      const ws = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.001, 0.001), dark); g.add(ws);
    }
    const wingS = (s) => { const sh = new THREE.Shape(); sh.moveTo(0, -0.9); sh.lineTo(4.1, 0.55); sh.lineTo(4.2, 0.95); sh.lineTo(0, 0.95); sh.closePath(); return sh; };
    const wmat = new THREE.MeshStandardMaterial({ color: '#D5DCE6', roughness: 0.4, metalness: 0.35, side: THREE.DoubleSide, envMapIntensity: 0.6 });
    for (const s of [-1, 1]) {
      const wg = new THREE.ExtrudeGeometry(wingS(s), { depth: 0.11, bevelEnabled: false }); wg.rotateX(Math.PI / 2); wg.translate(0, 0.05, 0);
      const w = new THREE.Mesh(wg, wmat); w.scale.x = s; w.position.set(s * 0.35, -0.3, 0.15); w.rotation.z = s * -0.07; g.add(w);
      const fl = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.02, 0.18), new THREE.MeshStandardMaterial({ color: '#98A6BA', roughness: 0.5 })); fl.position.set(s * 2.0, -0.26 - 0.07 * 1.6, 1.12); fl.rotation.z = s * -0.07; g.add(fl);
      const tp = new THREE.Mesh(new THREE.ExtrudeGeometry(wingS(s), { depth: 0.07, bevelEnabled: false }), wmat); tp.geometry.rotateX(Math.PI / 2); tp.scale.set(s * 0.36, 1, 0.36); tp.position.set(s * 0.25, 0.1, 3.05); g.add(tp);
      const en = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.3, 1.5, 28), new THREE.MeshStandardMaterial({ color: '#E4E9F0', roughness: 0.3, metalness: 0.4 })); en.rotation.x = Math.PI / 2; en.position.set(s * 1.55, -0.62, -0.55); g.add(en);
      const lip = new THREE.Mesh(new THREE.TorusGeometry(0.335, 0.035, 10, 28), new THREE.MeshStandardMaterial({ color: navy, roughness: 0.4 })); lip.position.set(s * 1.55, -0.62, -1.3); g.add(lip);
      const fan = new THREE.Mesh(new THREE.CircleGeometry(0.31, 24), new THREE.MeshStandardMaterial({ color: '#1A2233', roughness: 0.5, metalness: 0.5 })); fan.position.set(s * 1.55, -0.62, -1.295); fan.rotation.y = Math.PI; g.add(fan);
      const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.06, 10, 8), new THREE.MeshBasicMaterial({ color: HDR(THREE, s > 0 ? '#41FF8A' : '#FF3B3B', 2.5) })); lamp.position.set(s * 4.55, 0.1, 0.8); g.add(lamp);
    }
    const fs = new THREE.Shape(); fs.moveTo(0, 0); fs.lineTo(1.5, 0); fs.lineTo(2.0, 1.9); fs.lineTo(1.35, 1.9); fs.closePath();
    const fgm = new THREE.ExtrudeGeometry(fs, { depth: 0.09, bevelEnabled: false }); fgm.translate(0, 0, -0.045); fgm.rotateY(-Math.PI / 2);
    const fin = new THREE.Mesh(fgm, new THREE.MeshStandardMaterial({ color: navy, roughness: 0.35, metalness: 0.2 })); fin.position.set(0, 0.35, 1.5); g.add(fin);
    const strobe = new THREE.Mesh(new THREE.SphereGeometry(0.07, 10, 8), new THREE.MeshBasicMaterial({ color: HDR(THREE, '#FFFFFF', 4) })); strobe.position.set(0, 0.56, 0.6); g.add(strobe);
    const land = new THREE.Mesh(new THREE.SphereGeometry(0.08, 10, 8), new THREE.MeshBasicMaterial({ color: HDR(THREE, '#FFF4D6', 3) })); land.position.set(0.4, -0.5, -2.4); g.add(land);
    g.userData.strobe = strobe; g.userData.land = land;
    if (o.gear) { const gm = new THREE.MeshStandardMaterial({ color: '#8E9AAD', roughness: 0.5, metalness: 0.7 }), tm = new THREE.MeshStandardMaterial({ color: '#0C0F16', roughness: 0.9 }); for (const [x, z] of [[0, -2.4], [-0.6, 0.6], [0.6, 0.6]]) { const st = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.8, 8), gm); st.position.set(x, -0.9, z); g.add(st); const wh = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.17, 0.16, 18), tm); wh.rotation.z = Math.PI / 2; wh.position.set(x, -1.3, z); g.add(wh); } }
    return g;
  };

  /* مدرج واقعي: أسفلت + علامات + إضاءة HDR + PAPI + أضواء الاقتراب */
  R.runway = (ctx, o = {}) => {
    const { THREE } = ctx, g = new THREE.Group(), len = o.len || 420, wd = 18, THR = new THREE.Color();
    const at = cv(512, 1024, (c, w, h) => { c.fillStyle = '#1B212E'; c.fillRect(0, 0, w, h); for (let i = 0; i < 9000; i++) { const x = Math.random() * w, y = Math.random() * h; c.fillStyle = `rgba(${90 + Math.random() * 60},${95 + Math.random() * 60},${110 + Math.random() * 60},${0.05 + Math.random() * 0.12})`; c.fillRect(x, y, 1.5, 1.5); } c.fillStyle = 'rgba(0,0,0,0.25)'; for (const x of [150, 190, 322, 362]) c.fillRect(x, h * 0.45, 10, h * 0.5); });
    const tx = new THREE.CanvasTexture(at); tx.wrapS = tx.wrapT = THREE.RepeatWrapping; tx.repeat.set(1, len / 40); tx.colorSpace = THREE.SRGBColorSpace;
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(1400, 1400), new THREE.MeshStandardMaterial({ color: '#0A0F18', roughness: 1, envMapIntensity: 0 })); ground.rotation.x = -Math.PI / 2; ground.position.y = -0.05; g.add(ground);
    const strip = new THREE.Mesh(new THREE.PlaneGeometry(wd, len), new THREE.MeshStandardMaterial({ map: tx, roughness: 0.78, metalness: 0.05, envMapIntensity: 0.12 })); strip.rotation.x = -Math.PI / 2; strip.position.set(0, 0, -len / 2); g.add(strip);
    const mat = c => new THREE.MeshStandardMaterial({ color: c, roughness: 0.8, envMapIntensity: 0.15 });
    const inst = (geo, m, n, place) => { const im = new THREE.InstancedMesh(geo, m, n), d = new THREE.Object3D(); for (let i = 0; i < n; i++) { place(d, i); d.updateMatrix(); im.setMatrixAt(i, d.matrix); } im.instanceMatrix.needsUpdate = true; g.add(im); return im; };
    const nd = Math.floor(len / 30); inst(new THREE.BoxGeometry(0.5, 0.02, 12), mat('#D8DEE8'), nd, (d, i) => d.position.set(0, 0.02, -22 - i * 30));
    for (const s of [-1, 1]) inst(new THREE.BoxGeometry(0.4, 0.02, len), mat('#D8DEE8'), 1, d => d.position.set(s * (wd / 2 - 0.5), 0.02, -len / 2));
    for (const s of [-1, 1]) for (let i = 0; i < 6; i++) inst(new THREE.BoxGeometry(0.8, 0.02, 13), mat('#D8DEE8'), 1, d => d.position.set(s * (1.6 + i * 1.3), 0.02, -9));
    for (const s of [-1, 1]) for (let k = 0; k < 2; k++) inst(new THREE.BoxGeometry(2.0, 0.02, 20), mat('#D8DEE8'), 1, d => d.position.set(s * 4.8, 0.02, -(70 + k * 0) - 0));
    const hb = (c, k) => new THREE.MeshBasicMaterial({ color: HDR(THREE, c, k) });
    const ne = Math.floor(len / 14); for (const s of [-1, 1]) inst(new THREE.SphereGeometry(0.22, 8, 6), hb('#FFF1CF', 2.2), ne, (d, i) => d.position.set(s * (wd / 2 + 1.0), 0.28, -2 - i * 14));
    inst(new THREE.BoxGeometry(0.6, 0.12, 0.6), hb('#37FF86', 2), 12, (d, i) => d.position.set(-wd / 2 + 0.8 + i * ((wd - 1.6) / 11), 0.1, 0.8));
    inst(new THREE.BoxGeometry(0.6, 0.12, 0.6), hb('#FF2B2B', 2), 12, (d, i) => d.position.set(-wd / 2 + 0.8 + i * ((wd - 1.6) / 11), 0.1, -len));
    const na = o.approach ?? 40; g.na = na; g.appr = inst(new THREE.BoxGeometry(0.7, 0.35, 0.7), hb('#FFFFFF', 3), na, (d, i) => d.position.set(0, 0.3, 4 + i * 4.8));
    const bars = []; for (let i = 3; i < na; i += 3) for (const s of [-1, 1]) for (let j = 1; j <= 3; j++) bars.push([s * j * 1.7, 4 + i * 4.8]);
    inst(new THREE.BoxGeometry(0.5, 0.25, 0.5), hb('#FFFFFF', 1.8), bars.length, (d, i) => d.position.set(bars[i][0], 0.22, bars[i][1]));
    for (let i = 0; i < 4; i++) inst(new THREE.BoxGeometry(0.9, 0.5, 0.9), hb(i < 2 ? '#FF2B2B' : '#FFFFFF', 2.2), 1, d => d.position.set(-wd / 2 - 7 - i * 2.2, 0.3, -60));
    const rr = new THREE.Color(); const rn = (a) => { let s = a; return () => (s = (s * 16807) % 2147483647) / 2147483647; }; const rd = rn(7);
    inst(new THREE.SphereGeometry(0.5, 6, 5), hb('#FFB648', 2), 320, (d, i) => { const side = rd() < 0.5 ? -1 : 1; d.position.set(side * (40 + rd() * 520), 0.4, -len * 0.9 + rd() * (len + 700)); });
    inst(new THREE.SphereGeometry(0.35, 6, 5), hb('#4DA3FF', 2), 40, (d, i) => d.position.set(-70, 0.3, 20 - i * 14));
    g.update = (t) => { const d = new THREE.Object3D(); for (let i = 0; i < g.na; i++) { const ph = ((t * 2.0) % 1) * g.na, k = Math.max(0, 1 - Math.abs(((g.na - 1 - i) - ph + g.na) % g.na) / 2.0); d.position.set(0, 0.3, 4 + i * 4.8); d.scale.setScalar(0.55 + 1.2 * k); d.updateMatrix(); g.appr.setMatrixAt(i, d.matrix); } g.appr.instanceMatrix.needsUpdate = true; };
    return g;
  };

  /* شاحنة طوارئ بأضواء تومض */
  R.truck = (ctx) => {
    const { THREE } = ctx, g = new THREE.Group();
    const m = (c, r = 0.5) => new THREE.MeshStandardMaterial({ color: c, roughness: r, metalness: 0.2 });
    const b = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.7, 6.2), m('#C8201A')); b.position.y = 1.15; g.add(b);
    const cab = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.4, 2.0), m('#D8261E')); cab.position.set(0, 1.0, -2.1); g.add(cab);
    const st = new THREE.Mesh(new THREE.BoxGeometry(2.42, 0.25, 6.0), m('#F3F5F8')); st.position.y = 1.2; g.add(st);
    for (const [x, z] of [[-1.0, -2], [1.0, -2], [-1.0, 2], [1.0, 2]]) { const w = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.4, 14), m('#0A0C10', 0.9)); w.rotation.z = Math.PI / 2; w.position.set(x * 1.2, 0.5, z); g.add(w); }
    const lr = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.18, 0.4), new THREE.MeshBasicMaterial({ color: HDR(THREE, '#FF2020', 3) })), lb = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.18, 0.4), new THREE.MeshBasicMaterial({ color: HDR(THREE, '#2B7BFF', 3) }));
    lr.position.set(-0.6, 2.1, -2.0); lb.position.set(0.6, 2.1, -2.0); g.add(lr, lb); g.userData.lr = lr; g.userData.lb = lb;
    g.userData.flash = (t, k = 3.2) => { const a = (Math.floor(t * k) % 2) === 0; lr.visible = a; lb.visible = !a; };
    return g;
  };

  /* شرر */
  R.sparks = (ctx, n = 160) => {
    const { THREE } = ctx, im = new THREE.InstancedMesh(new THREE.BoxGeometry(0.07, 0.07, 0.28), new THREE.MeshBasicMaterial({ color: HDR(THREE, '#FFB04A', 6) }), n), d = new THREE.Object3D(), r = ctx.rng('sparks');
    const V = Array.from({ length: n }, () => [-r.range(1, 7), r.range(1.5, 6), r.range(-2.2, 2.2), r()]);
    im.update = (t, t0, t1, emit) => { for (let i = 0; i < n; i++) { const te = t0 + (i / n) * (t1 - t0), age = t - te; if (age < 0 || age > 0.9 || te > t1) { d.scale.setScalar(0.0001); d.position.set(0, -50, 0); } else { const e = emit(te), v = V[i]; d.position.set(e[0] + v[0] * age * 0.4, e[1] + v[1] * age - 4.9 * age * age * 0.8, e[2] + v[2] * age); d.scale.setScalar(Math.max(0.0001, 1 - age / 0.9)); d.rotation.set(age * 6, age * 3, 0); } d.updateMatrix(); im.setMatrixAt(i, d.matrix); } im.instanceMatrix.needsUpdate = true; };
    return im;
  };
  /* دخان ناعم */
  R.smoke = (ctx, n = 36) => {
    const { THREE } = ctx, g = new THREE.Group(), tex = new THREE.CanvasTexture(cv(128, 128, (c, w, h) => { const gr = c.createRadialGradient(64, 64, 4, 64, 64, 62); gr.addColorStop(0, 'rgba(210,214,222,0.9)'); gr.addColorStop(1, 'rgba(210,214,222,0)'); c.fillStyle = gr; c.fillRect(0, 0, w, h); })), r = ctx.rng('smoke');
    const S = []; for (let i = 0; i < n; i++) { const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false, opacity: 0 })); g.add(sp); S.push({ sp, dx: r.range(-1.2, 1.2), dz: r.range(-1, 1) }); }
    g.update = (t, t0, t1, emit) => { S.forEach((s, i) => { const te = t0 + (i / n) * (t1 - t0), age = t - te; if (age < 0 || age > 3.2 || te > t1) { s.sp.material.opacity = 0; return; } const e = emit(te); s.sp.position.set(e[0] + s.dx * age, e[1] + 0.4 + age * 0.7, e[2] + s.dz * age); const sc = 1.2 + age * 3.2; s.sp.scale.set(sc, sc, 1); s.sp.material.opacity = 0.42 * (1 - age / 3.2) * Math.min(1, age * 4); }); };
    return g;
  };
  /* سماء الغروب: الأفق عند y (بكسل) */
  R.sky = (ctx, hy, o = {}) => {
    const { X, W, H } = ctx, hf = Math.min(0.95, Math.max(0.05, hy / H));
    const g = X.createLinearGradient(0, 0, 0, H); g.addColorStop(0, o.top || '#070D22'); g.addColorStop(hf * 0.55, o.mid || '#2A2B58'); g.addColorStop(hf * 0.92, o.glow || '#C9744A'); g.addColorStop(hf, o.hz || '#F0A25A'); g.addColorStop(Math.min(1, hf + 0.012), '#12151F'); g.addColorStop(1, '#0A0D14'); X.fillStyle = g; X.fillRect(0, 0, W, H);
    const sx = o.sx ?? 760, rg = X.createRadialGradient(sx, hy, 0, sx, hy, 520); rg.addColorStop(0, 'rgba(255,196,120,0.55)'); rg.addColorStop(1, 'rgba(255,150,80,0)'); X.fillStyle = rg; X.fillRect(0, hy - 520, W, 520);
    const r = ctx.rng('sk'); for (let i = 0; i < 9; i++) { const y = hy - 60 - r() * 380, w = 260 + r() * 420, x = r() * W; X.globalAlpha = 0.16 + 0.1 * r(); X.fillStyle = i % 2 ? '#4A3A55' : '#6A4A55'; X.beginPath(); X.ellipse(x, y, w, 14 + r() * 18, 0, 0, 6.283); X.fill(); } X.globalAlpha = 1;
  };

  R.setup = (ctx, o = {}) => {
    const { THREE } = ctx;
    const st = ctx.stage3D({ fov: o.fov || 34, camera: o.cam || [0, 3, 40], tone: 'neutral', exposure: 0.95, env: 'room', samples: 0, bloom: { strength: 0.4, radius: 0.5, threshold: 1.5 } });
    const sc = st.scene; sc.fog = new THREE.Fog('#1E1A30', 180, 1000);
    const sun = new THREE.DirectionalLight('#FFC38A', 2.4); sun.position.set(-40, 12, 60); sc.add(sun); sc.add(new THREE.HemisphereLight('#7E86C8', '#1A1620', 0.45));
    const rw = R.runway(ctx); st.add(rw); const pl = R.plane(ctx); pl.scale.setScalar(2.2); st.add(pl);
    return { st, rw, pl };
  };
  R.bg2d = (ctx, t) => {
    const { X, W, H } = ctx, g = X.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#080D22'); g.addColorStop(0.55, '#1C1D42'); g.addColorStop(0.85, '#6B3F4A'); g.addColorStop(1, '#0B0D16'); X.fillStyle = g; X.fillRect(0, 0, W, H);
    const r = ctx.rng('bokeh'); for (let i = 0; i < 26; i++) { const x = r() * W, y = 1080 + r() * 360, rad = 26 + r() * 60, a = 0.07 + 0.1 * r() * (0.7 + 0.3 * Math.sin(t * 0.8 + i)); const rg = X.createRadialGradient(x, y, 0, x, y, rad); rg.addColorStop(0, `rgba(255,190,110,${a * 2})`); rg.addColorStop(1, 'rgba(255,150,80,0)'); X.fillStyle = rg; X.fillRect(x - rad, y - rad, rad * 2, rad * 2); }
  };
  R.horizon = (ctx, st) => { const c = st.camera, d = new ctx.THREE.Vector3(); c.getWorldDirection(d); d.y = 0; d.normalize().multiplyScalar(20000); const p = c.position.clone().add(d); p.y = 0; const q = p.project(c); return (-q.y * 0.5 + 0.5) * ctx.H; };
  return R;
})();

MOTION.scene({
  id: 's1',
  setup(ctx) {
    const o = window.REAL.setup(ctx, { fov: 34, cam: [38, 3, -60] }); this.st = o.st; this.rw = o.rw; this.pl = o.pl;
  },
  draw(t, lt, ctx) {
    const { X, P, W, H, at, wordTime, noise1 } = ctx, I = window.ILS, wt = i => wordTime('l1', i), dur = ctx.scene.dur;
    const u = at(lt, 0, dur - 0.2, 'sineInOut'), z = 85 - 235 * u, y = 14 + z * 0.052 + 5 * at(lt, 8.2, dur, 'sineIn');
    this.pl.position.set(Math.sin(lt * 0.5) * 0.4, y, z); this.pl.rotation.set(0.05 - 0.02 * at(lt, 8, dur), 0, Math.sin(lt * 0.7) * 0.04);
    this.pl.userData.strobe.visible = ((t * 1.1) % 1) < 0.1; this.rw.update(t);
    const cam = this.st.camera; cam.position.set(38, 3, -60);
    const ahead = Math.max(0, 1 - at(lt, 5.5, 9.5)); cam.lookAt(this.pl.position.x * 0.5, Math.max(3, y * 0.95), z);
    const hy = window.REAL.horizon(ctx, this.st); window.REAL.sky(ctx, hy);
    this.st.draw(X);
    const V = new ctx.THREE.Vector3(), sp = () => I.proj(ctx, this.st, V.set(this.pl.position.x, this.pl.position.y - 0.5, this.pl.position.z));
    const e1 = at(t, wt(9).s - 0.35, wt(9).s + 0.15, 'cubicInOut');
    const fail = at(t, wt(7).s - 0.1, wt(7).s + 0.4, 'expoOut'); if (fail > 0 && e1 < 1) { const p = sp(); X.save(); X.globalAlpha = fail * (1 - e1); I.cross(X, p[0], p[1] + 20, 60, fail, P.clay, 16); X.restore(); }
    const one = at(t, wt(11).s, wt(12).e, 'expoOut'); if (one > 0) ctx.text(X, '1', 540, 600, { family: 'num', weight: 900, size: 400 * (0.94 + 0.06 * one), color: P.acc, alpha: one * 0.92, dir: 'ltr' });
    const bk = at(t, wt(15).s - 0.1, wt(15).s + 0.6, 'cubicOut'); if (bk > 0) { const p = sp(); X.save(); X.globalAlpha = bk; X.strokeStyle = P.clay; X.fillStyle = P.clay; X.lineWidth = 9; X.lineCap = 'round'; const len = 110 * bk; X.beginPath(); X.moveTo(p[0], p[1] + 60); X.lineTo(p[0], p[1] + 60 + len); X.stroke(); X.beginPath(); X.moveTo(p[0], p[1] + 60 + len + 26); X.lineTo(p[0] - 24, p[1] + 60 + len - 8); X.lineTo(p[0] + 24, p[1] + 60 + len - 8); X.closePath(); X.fill(); X.restore(); }
    I.vig(ctx, '0,0,0', 0.3); I.scrim(ctx, 1260, 1620);
    I.caption(ctx, t, 'l1', 0, 3, { y: 1400, size: 92, hl: [3] });
    I.caption(ctx, t, 'l1', 4, 8, { y: 1400, size: 90, hl: [5, 7, 8] });
    I.caption(ctx, t, 'l1', 9, 12, { y: 1400, size: 92, hl: [11, 12] });
    I.caption(ctx, t, 'l1', 13, 16, { y: 1400, size: 96, hl: [15, 16], hold: 0.9 });
  }
});
