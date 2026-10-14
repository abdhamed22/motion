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
  return L;
})();

MOTION.scene({
  id: 's1',
  setup(ctx) {
    const { THREE } = ctx;
    this.st = ctx.stage3D({ fov: 40, camera: [0, 4.5, 24], tone: 'neutral', exposure: 1.0, env: 'room', samples: 0 });
    const sc = this.st.scene;
    sc.fog = new THREE.Fog('#1A3860', 60, 400);
    const sun = new THREE.DirectionalLight('#BFD8FF', 2.4); sun.position.set(-6, 10, 6); sc.add(sun);
    this.world = ctx.ILS_RUNWAY = window.ILS.runway(ctx, { len: 200, approach: 36 });
    this.st.add(this.world);
    this.plane = window.ILS.plane(ctx); this.st.add(this.plane);
  },
  draw(t, lt, ctx) {
    const { X, P, W, H, at, prog, noise1 } = ctx, I = window.ILS;
    I.sky(ctx, t, { starAlpha: 1 - at(lt, 2.6, 4.6) * 0.8 });
    /* العالم يقترب: الأرض ترتفع والطائرة ثابتة بالكاميرا، ضباب يغلق الأفق */
    const k = at(lt, 0, 5.2, 'sineInOut');
    this.world.position.set(8 + Math.sin(lt * 0.4) * 2, -52 + 40 * k, 30 - 0 * lt - 150 * k);
    this.world.update(t);
    this.st.scene.fog.near = 90 - 70 * at(lt, 1.5, 4.4); this.st.scene.fog.far = 420 - 330 * at(lt, 1.5, 4.4);
    const bank = noise1(lt * 0.5, 3) * 0.12 + 0.05;
    this.plane.position.set(noise1(lt * 0.6, 8) * 0.5, -0.4 + noise1(lt * 0.7, 2) * 0.25, 0);
    this.plane.rotation.set(-0.07 - 0.04 * k, 0.04, bank);
    this.plane.userData.strobe.visible = (Math.floor(t * 1.7) % 2) === 0 && ((t * 1.7) % 1) < 0.18;
    this.st.camera.position.set(1.0, 4.6 - 0.8 * k, 24); this.st.camera.lookAt(0, -5.5 - 2.0 * k, -12);
    this.st.draw(X);
    /* ضباب فوق الأرض */
    I.mist(ctx, t, 0.9 * at(lt, 1.4, 4.2), 900, 1500, '#1D3A5C');
    /* مدرج شبحي يظهر ويضيع بالضباب (لا يرى المدرج) */
    const w7 = ctx.wordTime('l1', 7);
    const ghost = at(t, w7.s - 0.2, w7.s + 0.35) * (1 - at(t, w7.e + 0.1, w7.e + 1.0)) ;
    X.save(); X.globalAlpha = ghost * 0.8; X.strokeStyle = P.hi; X.lineWidth = 5; X.setLineDash([22, 16]); X.lineDashOffset = -lt * 60;
    X.beginPath(); X.moveTo(500, 860); X.lineTo(580, 860); X.lineTo(700, 1060); X.lineTo(380, 1060); X.closePath(); X.stroke(); X.restore();
    /* علامة استفهام فوق الأفق */
    const q = at(t, w7.s - 0.1, w7.s + 0.4, 'expoOut');
    ctx.text(X, '؟', 850, 620, { family: 'display', size: 170 * (0.9 + 0.1 * q), color: P.acc, alpha: q * (1 - at(t, w7.e + 0.2, w7.e + 0.8)) });
    I.scrim(ctx, 1050, 1560);
    I.caption(ctx, t, 'l1', 0, 3, { y: 1330, size: 92 });
    I.caption(ctx, t, 'l1', 4, 8, { y: 1330, size: 92, hl: [7], hold: 0.6 });
  }
});
