(() => {
  "use strict";
  const W = 1080,
    H = 1350,
    $ = (id) => document.getElementById(id),
    canvas = $("poster"),
    ctx = canvas.getContext("2d");
  const THAANA = '"Faruma","MV Boli","Noto Sans Thaana",sans-serif';
  const ARABIC =
    '"Traditional Arabic","Noto Naskh Arabic","Segoe UI",Arial,sans-serif';
  let backgroundImage = null,
    bismillahImage = null,
    logoImage = null,
    backgroundUrl = null,
    bismillahUrl = null,
    logoUrl = null,
    fontUrl = null,
    customFont = "",
    bismillahCanTint = false,
    assetData = { background: null, bismillah: null, logo: null, font: null },
    imageRequest = { background: 0, bismillah: 0, logo: 0 };


  // Replace these temporary entries with your real Bismillah text choices.
  const bismillahOptions = [
    "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ",
    "﷽",
  ];

  function setupBismillahOptions() {
    $("bismillah").innerHTML = bismillahOptions
      .map(
        (text) =>
          `<option value="${escapeHtml(text)}">${escapeHtml(text)}</option>`,
      )
      .join("");
  }

  // Replace these temporary entries with your real mosque, prayer-leader and address lists.
  const mosqueOptions = [
    "މަސްޖިދުއްޝަހީދު ޢުމަރު ޢަހްމަދު",
    "މަސްޖިދުއްޢުފްރާން",
    "މަސްޖިދުއްރަޙްމާން",
  ];
  const leaderOptions = [
    "އަލްފާޟިލް އަބްދުއްރަޙްމާން ޒާހިދު",
    "އަލްފާޟިލް މުޙައްމަދު މާޒިން މޫސާ",
    "އަލްފާޟިލް އަލީ ރަޝީދު",
    "އަލްފާޟިލް އަޙްމަދު މާހިލް މުޙައްމަދު",
    "އަލްފާޟިލް އާދަމް ސަޢީދު",
    "އަލްހާފިޒް އައްބާދު ބިން އަފްޝަލް",
    "އަލްފާޟިލް ޖައުޙަރީ އަލީ",
    "އަލްފާޟިލް މުޙައްމަދު ޚަލަފް ޝަކީބް",
    "އަލްފާޟިލް ނަސްރު ﷲ ޙަސަން",
    "އަލްފާޟިލް މޫސާ ޝަފީގު",
    "އަލްފާޟިލް އަޒުޔަދު އަޙްސަން",
    "އަލްފާޟިލް ޛަކްވާން އަބްދުﷲ",
    "އަލްފާޟިލް މުޙައްމަދު ނަޞީރު",
    "އަލްފާޟިލް ޙަސަން މުޙައްމަދު",
  ];
  const addressOptions = [
    "ނިރުހިޔާ، ހއ. ދިއްދޫ",
    "ދިލާސާވިލާ، ހއ. ދިއްދޫ",
    "ނިޔަރުގެ، ހއ. ދިއްދޫ",
    "ޖޭމްގަސްދޮށުގެ، ހއ. ދިއްދޫ",
    "ސަމާ، ހއ. ދިއްދޫ",
    "ހ. އަލިނަރުމާގެ، ކ. މާލެ",
    "އާނިރު، ހއ. ދިއްދޫ",
    "ތިލަދޫ، ހއ. ދިއްދޫ",
    "އަސަރީގެ، ހއ. ދިއްދޫ",
    "ފޮސީތިޔާ، ހއ. ދިއްދޫ",
    "ހިތަދޫ، ހއ. ދިއްދޫ",
    "އަލިނޫރު، ހއ. އިހަވަންދޫ",
    "އެވޭލާ، ހއ. ދިއްދޫ",
  ];
  // Add or replace event locations in this list.
  const locationOptions = ["ހއ. ދިއްދޫ، ދިވެހިރާއްޖެ"];
  const defaults = {
    bismillah: "ބިސްމި ﷲِ އައްރަޙްމާނި އައްރަޙީމް",
    bismillahWidth: 140,
    bismillahColor: "#ffffff",
    showBismillah: true,
    logoWidth: 86,
    logoY: 171,
    showLogo: true,
    institution: "އިސްލާމީ މަރުކަޒުގެ ފަރާތުން",
    institutionSize: 25,
    institutionColor: "#f4efe3",
    institutionWeight: "400",
    title1:
      "ތިލަދުންމަތީ އުތުރުބުރީ ދިއްދޫ ކައުންސިލް އިދާރާ\nހއ. ދިއްދޫ ދިވެހިރާއްޖު",
    title1Size: 28,
    title1Color: "#ffffff",
    title1Weight: "700",
    title2: "ހުތުބާ މައުޟޫ",
    title2Size: 36,
    title2Color: "#ffffff",
    title2Weight: "700",
    direction: "rtl",
    fontChoice: "Faruma",
    eventDescription:
      "ހުކުރު ނަމާދު ކުރުމަށް ހަމަޖެހިފައިވާ އިމާމުންގެ ތާވަލު:",
    eventDescriptionSize: 23,
    calendarIconColor: "#07172d",
    gregorian: "2026-07-10",
    hijriDay: 25,
    hijriMonth: 0,
    hijriYear: 1448,
    eventTime: "12:30",
    location: locationOptions[0],
    showGregorian: true,
    showHijri: true,
    showTime: true,
    showLocation: true,
    showCalendar: true,
    bgMode: "cover",
    bgOpacity: 100,
    bgZoom: 100,
    bgX: 0,
    bgY: 0,
    photoOverlay: 0,
    navy: "#07172d",
    gold: "#c49743",
    mainText: "#ffffff",
    panelColor: "#ffffff",
    panelTextColor: "#07172d",
    panelOpacity: 100,
    rowLabelColor: "#ffffff",
    rowLabelTextColor: "#07172d",
    rowLabelOpacity: 100,
    overlayDarkness: 0,
    contentScale: 100,
    showGuides: false,
    rows: [
      {
        mosque: mosqueOptions[0],
        leader: leaderOptions[0],
        address: addressOptions[0],
      },
      {
        mosque: mosqueOptions[1],
        leader: leaderOptions[1],
        address: addressOptions[1],
      },
      {
        mosque: mosqueOptions[2],
        leader: leaderOptions[2],
        address: addressOptions[2],
      },
    ],
  };
  const defaultTransforms = {
    bismillah: { x: 540, y: 101, scale: 100 },
    logo: { x: 540, y: 171, scale: 65 },
    title1: { x: 538, y: 244, scale: 65 },
    title2: { x: 542, y: 344, scale: 169 },
    info: { x: 538, y: 418, scale: 78 },
    rows: { x: 538, y: 608, scale: 90 },
  };
  function makeRowPosition(i) {
    return { x: 540, y: 575 + i * 108, scale: 100 };
  }
  defaults.transforms = clone(defaultTransforms);
  defaults.rows = defaults.rows.map((r, i) => ({
    ...r,
    id: "row-" + (i + 1),
    ...makeRowPosition(i),
  }));
  let state = clone(defaults),
    overflow = false,
    hitRegions = [],
    selectedId = "info",
    drag = null;
  function clone(v) {
    return JSON.parse(JSON.stringify(v));
  }
  function fileAsDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
  }
  function containsArabic(text) {
    return /[\u0600-\u06ff\u0750-\u077f\ufb50-\ufdff\ufe70-\ufeff]/.test(
      String(text || ""),
    );
  }

  function isBismillahLigature(text) {
    return String(text || "").trim() === "﷽";
  }

  function bismillahFontFamily(text) {
    if (isBismillahLigature(text))
      return '"Segoe UI Symbol","Arial Unicode MS","Noto Naskh Arabic",sans-serif';
    return fontFamily(text);
  }

  function fontFamily(text = "") {
    if (containsArabic(text))
      return customFont ? `"${customFont}",${ARABIC}` : ARABIC;
    if (customFont) return `"${customFont}",${THAANA}`;
    if (state.fontChoice && state.fontChoice !== "auto")
      return `"${state.fontChoice}",${THAANA}`;
    return THAANA;
  }
  function toast(msg) {
    const e = $("toast");
    e.textContent = msg;
    e.classList.add("show");
    clearTimeout(toast.t);
    toast.t = setTimeout(() => e.classList.remove("show"), 2500);
  }
  function rgba(hex, a) {
    let h = hex.replace("#", "");
    if (h.length === 3)
      h = h
        .split("")
        .map((x) => x + x)
        .join("");
    const n = parseInt(h, 16);
    return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`;
  }

  let bismillahTintCanvas = null;
  let bismillahTintKey = "";

  function tintedBismillahArtwork() {
    if (!bismillahImage) return null;
    const iw = bismillahImage.naturalWidth || bismillahImage.width;
    const ih = bismillahImage.naturalHeight || bismillahImage.height;
    const key = `${bismillahUrl}|${state.bismillahColor}|${iw}x${ih}`;
    if (bismillahTintCanvas && bismillahTintKey === key)
      return bismillahTintCanvas;

    const tinted = document.createElement("canvas");
    tinted.width = iw;
    tinted.height = ih;
    const tintContext = tinted.getContext("2d");
    tintContext.drawImage(bismillahImage, 0, 0, iw, ih);
    tintContext.globalCompositeOperation = "source-in";
    tintContext.fillStyle = state.bismillahColor;
    tintContext.fillRect(0, 0, iw, ih);
    tintContext.globalCompositeOperation = "source-over";
    bismillahTintCanvas = tinted;
    bismillahTintKey = key;
    return tinted;
  }
  function roundRect(x, y, w, h, r, fill, stroke) {
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, r);
    if (fill) {
      ctx.fillStyle = fill;
      ctx.fill();
    }
    if (stroke) {
      ctx.strokeStyle = stroke;
      ctx.stroke();
    }
  }
  function fitText(
    text,
    maxWidth,
    size,
    weight = "400",
    family = fontFamily(),
    min = 14,
  ) {
    let s = size;
    while (s > min) {
      ctx.font = `${weight} ${s}px ${family}`;
      if (ctx.measureText(text).width <= maxWidth) break;
      s -= 1;
    }
    return s;
  }
  function breakWords(text) {
    return state.direction === "rtl"
      ? Array.from(text)
      : text.trim().split(/\s+/);
  }
  function wrap(
    text,
    maxWidth,
    size,
    weight = "400",
    family = fontFamily(),
    maxLines = 3,
  ) {
    ctx.font = `${weight} ${size}px ${family}`;
    const paras = String(text || "").split("\n"),
      lines = [];
    for (const para of paras) {
      if (!para) {
        lines.push("");
        continue;
      }
      const units = breakWords(para);
      let line = "";
      for (const unit of units) {
        const sep = state.direction === "rtl" ? "" : " ";
        const test = line ? line + sep + unit : unit;
        if (ctx.measureText(test).width > maxWidth && line) {
          lines.push(line);
          line = unit;
        } else line = test;
        if (lines.length >= maxLines) break;
      }
      if (line && lines.length < maxLines) lines.push(line);
      if (lines.length >= maxLines) break;
    }
    if (lines.length === maxLines) {
      const joined = paras.join("");
      const shown = lines.join(state.direction === "rtl" ? "" : " ");
      if (shown.length < joined.length) {
        let last = lines[maxLines - 1];
        while (last.length && ctx.measureText(last + "…").width > maxWidth)
          last = last.slice(0, -1);
        lines[maxLines - 1] = last + "…";
        overflow = true;
      }
    }
    return lines;
  }
  function textBlock(text, x, y, maxWidth, size, opt = {}) {
    const weight = opt.weight || "400",
      family = opt.family || fontFamily(),
      align = opt.align || "center",
      dir = opt.dir || state.direction,
      lineHeight = opt.lineHeight || 1.25,
      maxLines = opt.maxLines || 3,
      color = opt.color || state.mainText;
    let fs = size;
    if (opt.shrink !== false)
      fs = fitText(
        String(text)
          .split("\n")
          .reduce((a, b) => (a.length > b.length ? a : b), ""),
        maxWidth,
        size,
        weight,
        family,
        opt.min || 14,
      );
    const lines = wrap(text, maxWidth, fs, weight, family, maxLines),
      lineStep = fs * lineHeight,
      height = lines.length * lineStep,
      verticallyCentered = opt.boxHeight != null,
      drawY = verticallyCentered
        ? y + opt.boxHeight / 2 - ((lines.length - 1) * lineStep) / 2
        : y;
    ctx.save();
    ctx.font = `${weight} ${fs}px ${family}`;
    ctx.fillStyle = color;
    ctx.textAlign = align;
    ctx.textBaseline = verticallyCentered ? "middle" : "top";
    ctx.direction = dir;
    lines.forEach((line, i) =>
      ctx.fillText(line, x, drawY + i * fs * lineHeight, maxWidth),
    );
    ctx.restore();
    return { height, size: fs, lines };
  }
  function drawMotif(x, y, flip = 1) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(flip, 1);
    ctx.strokeStyle = state.gold;
    ctx.lineWidth = Math.max(1, state.borderThickness * 0.55);
    ctx.globalAlpha = 0.82;
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.moveTo(0, i * 48);
      ctx.bezierCurveTo(34, i * 48 + 8, 15, i * 48 + 34, 45, i * 48 + 42);
      ctx.bezierCurveTo(22, i * 48 + 34, 40, i * 48 + 11, 4, i * 48 + 5);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(24, i * 48 + 23, 8, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();
  }
  function drawFrame() {
    ctx.save();
    ctx.strokeStyle = state.gold;
    ctx.fillStyle = state.gold;
    ctx.lineWidth = state.borderThickness;
    const side = 55;
    ctx.fillRect(18, 0, side, H);
    ctx.fillRect(W - 18 - side, 0, side, H);
    ctx.fillStyle = rgba(state.navy, 0.76);
    ctx.fillRect(27, 0, side - 18, H);
    ctx.fillRect(W - 27 - side + 18, 0, side - 18, H);
    for (let y = 15; y < H; y += 72) {
      ctx.save();
      ctx.translate(45, y);
      ctx.rotate(Math.PI / 4);
      ctx.strokeStyle = state.gold;
      ctx.lineWidth = 2;
      ctx.strokeRect(-12, -12, 24, 24);
      ctx.beginPath();
      ctx.arc(0, 0, 7, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
      ctx.save();
      ctx.translate(W - 45, y);
      ctx.rotate(Math.PI / 4);
      ctx.strokeStyle = state.gold;
      ctx.strokeRect(-12, -12, 24, 24);
      ctx.beginPath();
      ctx.arc(0, 0, 7, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }
    drawMotif(30, 8, 1);
    drawMotif(W - 30, 8, -1);
    ctx.lineWidth = state.borderThickness;
    ctx.beginPath();
    ctx.moveTo(102, 117);
    ctx.lineTo(175, 117);
    ctx.quadraticCurveTo(230, 117, 230, 62);
    ctx.lineTo(W - 230, 62);
    ctx.quadraticCurveTo(W - 230, 117, W - 175, 117);
    ctx.lineTo(W - 102, 117);
    ctx.lineTo(W - 102, H - 115);
    ctx.lineTo(W - 175, H - 115);
    ctx.quadraticCurveTo(W - 230, H - 115, W - 230, H - 60);
    ctx.lineTo(230, H - 60);
    ctx.quadraticCurveTo(230, H - 115, 175, H - 115);
    ctx.lineTo(102, H - 115);
    ctx.closePath();
    ctx.stroke();
    ctx.globalAlpha = 0.45;
    ctx.lineWidth = 1;
    ctx.strokeRect(91, 45, W - 182, H - 90);
    ctx.restore();
  }
  function drawDefaultArchitecture() {
    const top = 760;
    const grad = ctx.createLinearGradient(0, top, 0, H);
    grad.addColorStop(0, "#133450");
    grad.addColorStop(0.45, "#0b253d");
    grad.addColorStop(1, "#04101e");
    ctx.fillStyle = grad;
    ctx.fillRect(75, top, W - 150, H - top);
    ctx.fillStyle = rgba(state.gold, 0.1);
    for (let i = 0; i < 18; i++) {
      ctx.beginPath();
      ctx.arc(110 + i * 55, 900 + (i % 3) * 16, 90, Math.PI, 0);
      ctx.fill();
    }
    ctx.fillStyle = "#08192b";
    ctx.fillRect(150, 1000, 780, 270);
    ctx.fillRect(120, 970, 840, 45);
    for (let i = 0; i < 7; i++) {
      const x = 215 + i * 108;
      ctx.beginPath();
      ctx.moveTo(x - 34, 1265);
      ctx.lineTo(x - 34, 1080);
      ctx.quadraticCurveTo(x, 1025, x + 34, 1080);
      ctx.lineTo(x + 34, 1265);
      ctx.closePath();
      ctx.fillStyle = i === 3 ? "#102e44" : "#0c2237";
      ctx.fill();
      ctx.strokeStyle = rgba(state.gold, 0.55);
      ctx.lineWidth = 3;
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.arc(W / 2, 990, 112, Math.PI, 0);
    ctx.fillStyle = "#0a2035";
    ctx.fill();
    ctx.fillRect(W / 2 - 112, 990, 224, 20);
    ctx.fillStyle = rgba(state.gold, 0.7);
    ctx.fillRect(W / 2 - 3, 835, 6, 53);
    ctx.beginPath();
    ctx.arc(W / 2, 835, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#071827";
    ctx.fillRect(160, 760, 42, 230);
    ctx.beginPath();
    ctx.moveTo(155, 760);
    ctx.lineTo(181, 680);
    ctx.lineTo(207, 760);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = rgba(state.gold, 0.5);
    for (let i = 0; i < 12; i++) {
      ctx.fillRect(170, 780 + i * 16, 22, 3);
    }
  }
  function drawPhoto() {
    if (!backgroundImage) return;
    const y = 0,
      h = H;
    ctx.save();
    ctx.globalAlpha = state.bgOpacity / 100;
    const iw = backgroundImage.naturalWidth || backgroundImage.width,
      ih = backgroundImage.naturalHeight || backgroundImage.height;
    let scale =
      state.bgMode === "cover"
        ? Math.max(W / iw, H / ih)
        : Math.min(W / iw, H / ih);
    scale *= state.bgZoom / 100;
    const dw = iw * scale,
      dh = ih * scale,
      x = (W - dw) / 2 + (state.bgX / 100) * W * 0.35,
      dy = (H - dh) / 2 + (state.bgY / 100) * H * 0.35;
    ctx.beginPath();
    ctx.rect(0, 0, W, H);
    ctx.clip();
    ctx.drawImage(backgroundImage, x, dy, dw, dh);
    ctx.restore();
    if (state.photoOverlay) {
      ctx.fillStyle = rgba(state.navy, state.photoOverlay / 100);
      ctx.fillRect(0, 0, W, H);
    }
  }
  function drawPlaceholderLogo() {
    ctx.save();
    ctx.translate(W / 2, state.logoY);
    const s = state.logoWidth / 90;
    ctx.scale(s, s);
    ctx.strokeStyle = state.gold;
    ctx.fillStyle = state.gold;
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.arc(0, 0, 36, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, -28);
    ctx.lineTo(-22, -12);
    ctx.lineTo(-18, 18);
    ctx.lineTo(0, 30);
    ctx.lineTo(18, 18);
    ctx.lineTo(22, -12);
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, -5, 10, 0.35, Math.PI * 1.65);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(6, -5, 8, 0.4, Math.PI * 1.6);
    ctx.fill();
    ctx.restore();
  }
  function drawCalendar(x, y, size = 28) {
    const scale = size / 28;
    ctx.save();
    ctx.strokeStyle = state.calendarIconColor;
    ctx.lineWidth = 2.5 * scale;
    ctx.strokeRect(x - 14 * scale, y - 13 * scale, 28 * scale, 27 * scale);
    ctx.beginPath();
    ctx.moveTo(x - 14 * scale, y - 5 * scale);
    ctx.lineTo(x + 14 * scale, y - 5 * scale);
    ctx.moveTo(x - 7 * scale, y - 17 * scale);
    ctx.lineTo(x - 7 * scale, y - 9 * scale);
    ctx.moveTo(x + 7 * scale, y - 17 * scale);
    ctx.lineTo(x + 7 * scale, y - 9 * scale);
    ctx.stroke();
    ctx.restore();
  }
  function drawPoster() {
    overflow = false;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = state.navy;
    ctx.fillRect(0, 0, W, H);
    drawPhoto();
    if (backgroundImage && state.overlayDarkness) {
      ctx.fillStyle = rgba(state.navy, state.overlayDarkness / 100);
      ctx.fillRect(0, 0, W, H);
    }
    const S = state.contentScale / 100,
      cx = W / 2,
      max = 820;
    let y = 52;
    if (state.showBismillah) {
      const b = textBlock(
        state.bismillah,
        cx,
        y,
        max,
        state.bismillahSize * S,
        { color: state.bismillahColor, maxLines: 1, min: 18 },
      );
      y += b.height + 8;
    }
    if (state.showLogo) {
      if (logoImage) {
        const iw = logoImage.naturalWidth || logoImage.width,
          ih = logoImage.naturalHeight || logoImage.height,
          w = state.logoWidth * S,
          h = (w * ih) / iw;
        ctx.drawImage(logoImage, cx - w / 2, state.logoY - h / 2, w, h);
      } else drawPlaceholderLogo();
      y = Math.max(y, state.logoY + state.logoWidth * S * 0.65);
    }
    y += 14;
    let b = textBlock(
      state.institution,
      cx,
      y,
      max,
      state.institutionSize * S,
      {
        weight: state.institutionWeight,
        color: state.institutionColor,
        maxLines: 2,
      },
    );
    y += b.height + 14;
    b = textBlock(state.title1, cx, y, max, state.title1Size * S, {
      weight: state.title1Weight,
      color: state.title1Color,
      maxLines: 2,
      min: 30,
    });
    y += b.height + 5;
    b = textBlock(state.title2, cx, y, max, state.title2Size * S, {
      weight: state.title2Weight,
      color: state.title2Color,
      maxLines: 2,
      min: 22,
    });
    y += b.height + 18;
    const panelY = y,
      hasDescription = Boolean(state.eventDescription.trim()),
      panelH = (hasDescription ? 122 : 80) * S,
      panelFill = rgba(state.panelColor, state.panelOpacity / 100);
    roundRect(95, panelY, 890, panelH, 20, panelFill);
    let infoTop = panelY + 10 * S;
    if (hasDescription) {
      textBlock(state.eventDescription, cx, infoTop, 780, 20 * S, {
        color: state.panelTextColor,
        weight: "700",
        maxLines: 2,
        min: 13,
        boxHeight: 44 * S,
      });
      ctx.strokeStyle = rgba(state.panelTextColor, 0.18);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(135, panelY + 57 * S);
      ctx.lineTo(945, panelY + 57 * S);
      ctx.stroke();
      infoTop = panelY + 64 * S;
    }
    let values = [];
    if (state.showGregorian && state.gregorian)
      values.push(formatGregorian(state.gregorian));
    if (state.showHijri) values.push(formatHijri());
    if (state.showTime && state.eventTime)
      values.push(formatEventTime(state.eventTime));
    if (state.showLocation && state.location) values.push(state.location);
    const info = values.filter(Boolean).join("   |   "),
      iconSpace = state.showCalendar ? 64 : 0,
      infoX = state.showCalendar ? cx + 28 : cx,
      infoWidth = 760 - iconSpace;
    textBlock(
      info,
      infoX,
      infoTop,
      infoWidth,
      state.direction === "rtl" ? 21 * S : 19 * S,
      {
        color: state.panelTextColor,
        weight: "700",
        maxLines: 2,
        min: 13,
        boxHeight: 50 * S,
      },
    );
    if (state.showCalendar) drawCalendar(145, infoTop + 25 * S);
    y += panelH + 18;
    const rowCount = Math.max(1, state.rows.length),
      availableBottom = 800,
      rowH = Math.min(108 * S, (availableBottom - y) / rowCount);
    if (rowH < 84) overflow = true;
    state.rows.forEach((r, i) => {
      const ry = y + i * rowH,
        labelY = ry + 13 * S,
        labelH = 46 * S,
        labelFill = rgba(state.rowLabelColor, state.rowLabelOpacity / 100);
      if (i > 0) {
        ctx.strokeStyle = rgba(state.mainText, 0.38);
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(120, ry + 2 * S);
        ctx.lineTo(960, ry + 2 * S);
        ctx.stroke();
      }
      const labelW = 235;
      roundRect(715, labelY, labelW, labelH, 23, labelFill);
      textBlock(r.mosque, 832.5, labelY, labelW - 26, 18 * S, {
        color: state.rowLabelTextColor,
        weight: "700",
        maxLines: 1,
        min: 11,
        boxHeight: labelH,
      });
      textBlock(r.leader, cx, labelY, 300, 20 * S, {
        color: state.mainText,
        weight: "700",
        maxLines: 2,
        min: 12,
        boxHeight: labelH,
      });
      roundRect(130, labelY, labelW, labelH, 23, labelFill);
      textBlock(r.address, 247.5, labelY, labelW - 26, 17 * S, {
        color: state.rowLabelTextColor,
        weight: "700",
        maxLines: 1,
        min: 11,
        boxHeight: labelH,
      });
    });
    if (state.showGuides) {
      ctx.save();
      ctx.strokeStyle = "#3ee0d0";
      ctx.setLineDash([12, 10]);
      ctx.lineWidth = 2;
      ctx.strokeRect(90, 45, W - 180, H - 90);
      ctx.setLineDash([]);
      ctx.fillStyle = "#3ee0d0";
      ctx.font = "16px sans-serif";
      ctx.textAlign = "left";
      ctx.direction = "ltr";
      ctx.fillText("SAFE AREA", 98, H - 68);
      ctx.restore();
    }
    $("layoutWarning").classList.toggle("show", overflow);
  }
  function transformFor(id) {
    if (id.startsWith("row:"))
      return state.rows.find((r) => r.id === id.slice(4));
    return state.transforms[id];
  }
  function addHit(id, label, x, y, w, h) {
    hitRegions.push({ id, label, x, y, w, h });
  }
  function drawSelection(r) {
    ctx.save();
    ctx.strokeStyle = "#35d6ef";
    ctx.fillStyle = "rgba(53,214,239,.08)";
    ctx.lineWidth = 3;
    ctx.setLineDash([10, 7]);
    ctx.fillRect(r.x, r.y, r.w, r.h);
    ctx.strokeRect(r.x, r.y, r.w, r.h);
    ctx.setLineDash([]);
    ctx.fillStyle = "#35d6ef";
    [
      [r.x, r.y],
      [r.x + r.w, r.y],
      [r.x, r.y + r.h],
      [r.x + r.w, r.y + r.h],
    ].forEach(([x, y]) => {
      ctx.beginPath();
      ctx.arc(x, y, 7, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.restore();
  }

  function drawAlignmentGrid(selected) {
    const minorStep = 30;
    const majorStep = 150;

    ctx.save();

    // A light veil keeps the grid readable on both dark and bright photos.
    ctx.fillStyle = "rgba(5, 18, 33, 0.12)";
    ctx.fillRect(0, 0, W, H);

    for (let x = minorStep; x < W; x += minorStep) {
      const major = x % majorStep === 0;
      ctx.beginPath();
      ctx.moveTo(x + 0.5, 0);
      ctx.lineTo(x + 0.5, H);
      ctx.strokeStyle = major
        ? "rgba(255, 255, 255, 0.25)"
        : "rgba(255, 255, 255, 0.1)";
      ctx.lineWidth = major ? 1.5 : 1;
      ctx.stroke();
    }

    for (let y = minorStep; y < H; y += minorStep) {
      const major = y % majorStep === 0;
      ctx.beginPath();
      ctx.moveTo(0, y + 0.5);
      ctx.lineTo(W, y + 0.5);
      ctx.strokeStyle = major
        ? "rgba(255, 255, 255, 0.25)"
        : "rgba(255, 255, 255, 0.1)";
      ctx.lineWidth = major ? 1.5 : 1;
      ctx.stroke();
    }

    // Strong center lines and live crosshairs make alignment easy.
    ctx.strokeStyle = "rgba(228, 188, 107, 0.9)";
    ctx.lineWidth = 2;
    ctx.setLineDash([12, 8]);
    ctx.beginPath();
    ctx.moveTo(W / 2, 0);
    ctx.lineTo(W / 2, H);
    ctx.moveTo(0, H / 2);
    ctx.lineTo(W, H / 2);
    ctx.stroke();

    if (selected) {
      const centerX = selected.x + selected.w / 2;
      const centerY = selected.y + selected.h / 2;
      ctx.strokeStyle = "rgba(53, 214, 239, 0.95)";
      ctx.setLineDash([7, 6]);
      ctx.beginPath();
      ctx.moveTo(centerX, 0);
      ctx.lineTo(centerX, H);
      ctx.moveTo(0, centerY);
      ctx.lineTo(W, centerY);
      ctx.stroke();
    }

    ctx.restore();
  }

  drawPoster = function (exporting = false) {
    overflow = false;
    hitRegions = [];
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = state.navy;
    ctx.fillRect(0, 0, W, H);
    drawPhoto();
    if (backgroundImage && state.overlayDarkness) {
      ctx.fillStyle = rgba(state.navy, state.overlayDarkness / 100);
      ctx.fillRect(0, 0, W, H);
    }
    const G = state.contentScale / 100;
    if (state.showBismillah && bismillahImage) {
      const t = state.transforms.bismillah,
        s = (G * t.scale) / 100,
        iw = bismillahImage.naturalWidth || bismillahImage.width,
        ih = bismillahImage.naturalHeight || bismillahImage.height,
        w = state.bismillahWidth * s,
        h = (w * ih) / iw;
      const artwork = bismillahCanTint
        ? tintedBismillahArtwork()
        : bismillahImage;
      ctx.drawImage(artwork, t.x - w / 2, t.y - h / 2, w, h);
      addHit("bismillah", "Bismillah artwork", t.x - w / 2, t.y - h / 2, w, h);
    }
    if (state.showLogo) {
      const t = state.transforms.logo,
        s = (G * t.scale) / 100,
        w = state.logoWidth * s;
      let h = w;
      if (logoImage) {
        const iw = logoImage.naturalWidth || logoImage.width,
          ih = logoImage.naturalHeight || logoImage.height;
        h = (w * ih) / iw;
        ctx.drawImage(logoImage, t.x - w / 2, t.y - h / 2, w, h);
      } else {
        h = w;
        ctx.save();
        ctx.translate(t.x, t.y);
        ctx.scale(w / 90, w / 90);
        ctx.strokeStyle = state.gold;
        ctx.fillStyle = state.gold;
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.arc(0, 0, 36, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, -28);
        ctx.lineTo(-22, -12);
        ctx.lineTo(-18, 18);
        ctx.lineTo(0, 30);
        ctx.lineTo(18, 18);
        ctx.lineTo(22, -12);
        ctx.closePath();
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(0, -5, 10, 0.35, Math.PI * 1.65);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(6, -5, 8, 0.4, Math.PI * 1.6);
        ctx.fill();
        ctx.restore();
      }
      addHit("logo", "Logo", t.x - w / 2, t.y - h / 2, w, h);
    }
    const drawTextLayer = (
      id,
      label,
      text,
      size,
      color,
      weight,
      maxLines = 2,
    ) => {
      const t = state.transforms[id],
        s = (G * t.scale) / 100,
        fs = size * s,
        w = Math.min(940, 820 * s),
        h = Math.max(fs * 1.3, fs * 1.25 * maxLines);
      textBlock(text, t.x, t.y - h / 2, w, fs, {
        color,
        weight,
        maxLines,
        min: 12,
        boxHeight: h,
      });
      addHit(id, label, t.x - w / 2, t.y - h / 2, w, h);
    };
    drawTextLayer(
      "title1",
      "Title 1",
      state.title1,
      state.title1Size,
      state.title1Color,
      state.title1Weight,
      2,
    );
    drawTextLayer(
      "title2",
      "Title 2",
      state.title2,
      state.title2Size,
      state.title2Color,
      state.title2Weight,
      2,
    );
    {
      const t = state.transforms.info,
        s = (G * t.scale) / 100,
        w = 980 * s,
        h = 80 * s,
        x = t.x - w / 2,
        y = t.y - h / 2;
      roundRect(
        x,
        y,
        w,
        h,
        20 * s,
        rgba(state.panelColor, state.panelOpacity / 100),
      );
      const eventDate =
          state.showGregorian && state.gregorian
            ? formatGregorian(state.gregorian)
            : "",
        hijriDate = state.showHijri ? formatHijri() : "",
        eventTime =
          state.showTime && state.eventTime
            ? formatEventTime(state.eventTime)
            : "",
        hasDescription = Boolean(state.eventDescription.trim()),
        descriptionWidth = hasDescription ? 400 * s : 0,
        detailsWidth = w - 80 * s - descriptionWidth,
        timeWidth = 115 * s,
        hijriWidth = 190 * s,
        eventDateWidth = detailsWidth - timeWidth - hijriWidth,
        detailsStart = x + 40 * s,
        eventDateTextWidth = eventDateWidth - (state.showCalendar ? 48 * s : 8 * s),
        requestedSize = state.eventDescriptionSize * s,
        sharedSize = Math.min(
          hasDescription
            ? fitText(
                state.eventDescription.trim(),
                descriptionWidth - 30 * s,
                requestedSize,
                "700",
                fontFamily(),
                8,
              )
            : requestedSize,
          eventDate
            ? fitText(eventDate, eventDateTextWidth, requestedSize, "700", fontFamily(), 8)
            : requestedSize,
          hijriDate
            ? fitText(hijriDate, hijriWidth - 12 * s, requestedSize, "700", fontFamily(), 8)
            : requestedSize,
          eventTime
            ? fitText(eventTime, timeWidth - 12 * s, requestedSize, "700", fontFamily(), 8)
            : requestedSize,
        ),
        commonTextOptions = {
          color: state.panelTextColor,
          weight: "700",
          maxLines: 1,
          shrink: false,
          min: 8,
          boxHeight: h,
        };
      if (eventTime)
        textBlock(
          eventTime,
          detailsStart + timeWidth / 2,
          y,
          timeWidth - 12 * s,
          sharedSize,
          { ...commonTextOptions, dir: "ltr" },
        );
      if (hijriDate)
        textBlock(
          hijriDate,
          detailsStart + timeWidth + hijriWidth / 2,
          y,
          hijriWidth - 12 * s,
          sharedSize,
          commonTextOptions,
        );
      if (eventDate)
        textBlock(
          eventDate,
          detailsStart + timeWidth + hijriWidth + eventDateWidth / 2 +
            (state.showCalendar ? -20 * s : 0),
          y,
          eventDateTextWidth,
          sharedSize,
          commonTextOptions,
        );
      const dividerOptions = {
        ...commonTextOptions,
        color: rgba(state.panelTextColor, 0.55),
        dir: "ltr",
      };
      if (eventTime && hijriDate)
        textBlock(
          "|",
          detailsStart + timeWidth,
          y,
          18 * s,
          sharedSize,
          dividerOptions,
        );
      if (hijriDate && eventDate)
        textBlock(
          "|",
          detailsStart + timeWidth + hijriWidth,
          y,
          18 * s,
          sharedSize,
          dividerOptions,
        );
      if (state.showCalendar && eventDate)
        drawCalendar(
          detailsStart + timeWidth + hijriWidth + eventDateWidth - 22 * s,
          t.y,
          sharedSize,
        );
      if (hasDescription)
        textBlock(
          state.eventDescription.trim(),
          x + w - descriptionWidth / 2 - 20 * s,
          y,
          descriptionWidth - 30 * s,
          sharedSize,
          {
            color: state.panelTextColor,
            weight: "700",
            maxLines: 1,
            shrink: false,
            min: 8,
            boxHeight: h,
          },
        );
      addHit("info", "Main information", x, y, w, h);
    }
    const rowsTransform = state.transforms.rows,
      rowsScale = (G * rowsTransform.scale) / 100,
      rowGap = 108 * rowsScale;
    state.rows.forEach((r, i) => {
      if (!r.id) r.id = "row-" + Date.now() + "-" + i;
      const s = rowsScale,
        w = 840 * s,
        h = 92 * s,
        rowCenterY =
          rowsTransform.y + (i - (state.rows.length - 1) / 2) * rowGap,
        x = rowsTransform.x - w / 2,
        y = rowCenterY - h / 2,
        labelW = 235 * s,
        labelH = 46 * s,
        labelY = y + 6 * s,
        fill = rgba(state.rowLabelColor, state.rowLabelOpacity / 100);
      roundRect(x, labelY, labelW, labelH, 23 * s, fill);
      textBlock(r.address, x + labelW / 2, labelY, labelW - 26 * s, 17 * s, {
        color: state.rowLabelTextColor,
        weight: "700",
        maxLines: 1,
        min: 9,
        boxHeight: labelH,
      });
      textBlock(r.leader, rowsTransform.x, labelY, 300 * s, 20 * s, {
        color: state.mainText,
        weight: "700",
        maxLines: 2,
        min: 10,
        boxHeight: labelH,
      });
      roundRect(x + w - labelW, labelY, labelW, labelH, 23 * s, fill);
      textBlock(r.mosque, x + w - labelW / 2, labelY, labelW - 26 * s, 18 * s, {
        color: state.rowLabelTextColor,
        weight: "700",
        maxLines: 1,
        min: 9,
        boxHeight: labelH,
      });
      ctx.save();
      ctx.strokeStyle = rgba(state.mainText, 0.4);
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(x, y + h - 3 * s);
      ctx.lineTo(x + w, y + h - 3 * s);
      ctx.stroke();
      ctx.restore();
    });
    if (state.rows.length) {
      const groupWidth = 840 * rowsScale,
        groupHeight = 92 * rowsScale + (state.rows.length - 1) * rowGap;
      addHit(
        "rows",
        "Mosque information rows",
        rowsTransform.x - groupWidth / 2,
        rowsTransform.y - groupHeight / 2,
        groupWidth,
        groupHeight,
      );
    }
    if (state.showGuides) {
      ctx.save();
      ctx.strokeStyle = "#3ee0d0";
      ctx.setLineDash([12, 10]);
      ctx.lineWidth = 2;
      ctx.strokeRect(90, 45, W - 180, H - 90);
      ctx.restore();
    }
    if (!exporting) {
      const selected = hitRegions.find((r) => r.id === selectedId);
      if (drag) drawAlignmentGrid(selected);
      if (selected) drawSelection(selected);
    }
    $("layoutWarning").classList.toggle("show", overflow);
  };
  function setValue(id, val) {
    const e = $(id);
    if (!e) return;
    if (e.type === "checkbox") e.checked = !!val;
    else e.value = val;
    const out = $(id + "Out");
    if (out) out.textContent = formatOut(id, val);
  }
  function formatOut(id, val) {
    if (
      [
        "bgOpacity",
        "bgZoom",
        "photoOverlay",
        "overlayDarkness",
        "contentScale",
        "panelOpacity",
        "rowLabelOpacity",
        "layoutScale",
      ].includes(id)
    )
      return val + "%";
    if (["bgX", "bgY"].includes(id)) return (val > 0 ? "+" : "") + val;
    return val + " px";
  }
  const gregorianMonths = [
    "ޖެނުއަރީ",
    "ފެބްރުއަރީ",
    "މާރޗް",
    "އޭޕްރީލް",
    "މެއި",
    "ޖޫން",
    "ޖުލައި",
    "އޮގަސްޓް",
    "ސެޕްޓެމްބަރ",
    "އޮކްޓޯބަރ",
    "ނޮވެމްބަރ",
    "ޑިސެމްބަރ",
  ];

  const hijriMonths = [
    "މުޙައްރަމް",
    "ޞަފަރު",
    "ރަބީޢުލް އައްވަލް",
    "ރަބީޢުލް އާޚިރު",
    "ޖުމާދަލް އޫލާ",
    "ޖުމާދަލް އާޚިރާ",
    "ރަޖަބު",
    "ޝަޢުބާން",
    "ރަމަޟާން",
    "ޝައްވާލް",
    "ޛުލްޤަޢިދާ",
    "ޛުލްޙިއްޖާ",
  ];
  function setupHijriPickers() {
    const day = $("hijriDay"),
      month = $("hijriMonth"),
      year = $("hijriYear");
    day.innerHTML = Array.from(
      { length: 30 },
      (_, i) => `<option value="${i + 1}">${i + 1}</option>`,
    ).join("");
    month.innerHTML = hijriMonths
      .map((m, i) => `<option value="${i}">${m}</option>`)
      .join("");
    year.innerHTML = Array.from(
      { length: 101 },
      (_, i) => `<option value="${1400 + i}">${1400 + i}</option>`,
    ).join("");
    [day, month, year].forEach((control) =>
      control.addEventListener("change", () => {
        state.hijriDay = +$("hijriDay").value;
        state.hijriMonth = +$("hijriMonth").value;
        state.hijriYear = +$("hijriYear").value;
        drawPoster();
      }),
    );
  }
  function formatGregorian(value) {
    if (!value) return "";
    const parts = value.split("-").map(Number);
    if (parts.length !== 3 || parts.some(Number.isNaN)) return value;
    return `${parts[2]} ${gregorianMonths[parts[1] - 1]} ${parts[0]}`;
  }
  function formatHijri() {
    return `${state.hijriDay} ${hijriMonths[state.hijriMonth] || hijriMonths[0]} ${state.hijriYear}`;
  }
  function formatEventTime(value) {
    const match = String(value || "").match(/^(\d{1,2}):(\d{2})/);
    if (!match) return value;
    const hours = Number(match[1]);
    const suffix = hours >= 12 ? "PM" : "AM";
    const displayHour = hours % 12 || 12;
    return `${displayHour}:${match[2]} ${suffix}`;
  }
  function normalizeLayout() {
    state.transforms = {
      ...clone(defaultTransforms),
      ...(state.transforms || {}),
    };
    state.rows.forEach((r, i) => {
      if (!r.id) r.id = "row-" + Date.now() + "-" + i;
      if (r.x == null || r.y == null || r.scale == null)
        Object.assign(r, makeRowPosition(i));
    });
    state.logoY = state.transforms.logo.y;
  }
  function layerOptions() {
    return [
      { id: "bismillah", label: "Bismillah" },
      { id: "logo", label: "Logo" },
      { id: "title1", label: "Title 1" },
      { id: "title2", label: "Title 2" },
      { id: "info", label: "Main information" },
      { id: "rows", label: "Mosque information rows" },
    ];
  }
  function refreshLayerControls() {
    const options = layerOptions();
    if (!options.some((o) => o.id === selectedId)) selectedId = "info";
    $("elementSelect").innerHTML = options
      .map(
        (o) =>
          `<option value="${o.id}"${o.id === selectedId ? " selected" : ""}>${o.label}</option>`,
      )
      .join("");
    const t = transformFor(selectedId);
    if (!t) return;
    setValue("layoutX", Math.round(t.x));
    setValue("layoutY", Math.round(t.y));
    setValue("layoutScale", Math.round(t.scale));
  }
  function selectLayer(id) {
    selectedId = id;
    refreshLayerControls();
    drawPoster();
  }
  function canvasPoint(e) {
    const r = canvas.getBoundingClientRect();
    return {
      x: ((e.clientX - r.left) * W) / r.width,
      y: ((e.clientY - r.top) * H) / r.height,
    };
  }
  $("elementSelect").onchange = (e) => selectLayer(e.target.value);
  ["layoutX", "layoutY", "layoutScale"].forEach(
    (id) =>
      ($(id).oninput = (e) => {
        const t = transformFor(selectedId);
        if (!t) return;
        const key = id === "layoutX" ? "x" : id === "layoutY" ? "y" : "scale";
        t[key] = +e.target.value;
        $(id + "Out").textContent =
          id === "layoutScale" ? t[key] + "%" : Math.round(t[key]) + " px";
        if (selectedId === "logo") state.logoY = state.transforms.logo.y;
        drawPoster();
      }),
  );
  canvas.addEventListener("pointerdown", (e) => {
    const p = canvasPoint(e),
      hit = [...hitRegions]
        .reverse()
        .find(
          (r) =>
            p.x >= r.x && p.x <= r.x + r.w && p.y >= r.y && p.y <= r.y + r.h,
        );
    if (!hit) return;
    selectLayer(hit.id);
    const t = transformFor(hit.id);
    drag = { dx: p.x - t.x, dy: p.y - t.y };
    canvas.setPointerCapture(e.pointerId);
    canvas.classList.add("dragging");
    canvas.focus();
    drawPoster();
    e.preventDefault();
  });
  canvas.addEventListener("pointermove", (e) => {
    if (!drag) return;
    const p = canvasPoint(e),
      t = transformFor(selectedId);
    t.x = Math.max(0, Math.min(W, p.x - drag.dx));
    t.y = Math.max(0, Math.min(H, p.y - drag.dy));
    if (selectedId === "logo") state.logoY = t.y;
    refreshLayerControls();
    drawPoster();
  });
  function stopDrag() {
    drag = null;
    canvas.classList.remove("dragging");
    drawPoster();
  }
  canvas.addEventListener("pointerup", stopDrag);
  canvas.addEventListener("pointercancel", stopDrag);
  canvas.addEventListener("keydown", (e) => {
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key))
      return;
    const t = transformFor(selectedId),
      step = e.shiftKey ? 10 : 1;
    if (e.key === "ArrowLeft") t.x -= step;
    if (e.key === "ArrowRight") t.x += step;
    if (e.key === "ArrowUp") t.y -= step;
    if (e.key === "ArrowDown") t.y += step;
    t.x = Math.max(0, Math.min(W, t.x));
    t.y = Math.max(0, Math.min(H, t.y));
    refreshLayerControls();
    drawPoster();
    e.preventDefault();
  });
  $("resetSelected").onclick = () => {
    const t = transformFor(selectedId);
    if (selectedId.startsWith("row:"))
      Object.assign(t, makeRowPosition(state.rows.indexOf(t)));
    else Object.assign(t, clone(defaultTransforms[selectedId]));
    refreshLayerControls();
    drawPoster();
    toast("Selected layer reset");
  };
  $("resetLayout").onclick = () => {
    state.transforms = clone(defaultTransforms);
    state.rows.forEach((r, i) => Object.assign(r, makeRowPosition(i)));
    refreshLayerControls();
    drawPoster();
    toast("All positions reset");
  };
  const bindings = [
    "bismillahWidth",
    "bismillahColor",
    "showBismillah",
    "logoWidth",
    "logoY",
    "showLogo",
    "title1",
    "title1Size",
    "title1Color",
    "title1Weight",
    "title2",
    "title2Size",
    "title2Color",
    "title2Weight",
    "direction",
    "fontChoice",
    "eventDescription",
    "eventDescriptionSize",
    "calendarIconColor",
    "gregorian",
    "eventTime",
    "showGregorian",
    "showHijri",
    "showTime",
    "showCalendar",
    "bgMode",
    "bgOpacity",
    "bgZoom",
    "bgX",
    "bgY",
    "photoOverlay",
    "navy",
    "gold",
    "mainText",
    "panelColor",
    "panelTextColor",
    "panelOpacity",
    "rowLabelColor",
    "rowLabelTextColor",
    "rowLabelOpacity",
    "overlayDarkness",
    "contentScale",
    "showGuides",
  ];
  function applyState() {
    normalizeLayout();
    bindings.forEach((id) =>
      setValue(id, id === "logoY" ? state.transforms.logo.y : state[id]),
    );
    setValue("hijriDay", state.hijriDay);
    setValue("hijriMonth", state.hijriMonth);
    setValue("hijriYear", state.hijriYear);
    document.querySelectorAll(".rtl").forEach((e) => {
      e.dir = state.direction;
      e.classList.toggle("rtl", state.direction === "rtl");
    });
    renderRows();
    refreshLayerControls();
    drawPoster();
  }
  bindings.forEach((id) => {
    const e = $(id);
    e.addEventListener(
      e.type === "text" ||
        e.tagName === "TEXTAREA" ||
        e.type === "range" ||
        e.type === "color"
        ? "input"
        : "change",
      () => {
        state[id] =
          e.type === "checkbox"
            ? e.checked
            : e.type === "range"
              ? +e.value
              : e.value;
        if (id === "logoY") state.transforms.logo.y = state.logoY;
        const out = $(id + "Out");
        if (out) out.textContent = formatOut(id, state[id]);
        if (id === "direction")
          document
            .querySelectorAll("textarea,input[type=text]")
            .forEach((x) => {
              x.dir = state.direction;
              x.classList.toggle("rtl", state.direction === "rtl");
            });
        refreshLayerControls();
        drawPoster();
      },
    );
  });
  function optionMarkup(options, current) {
    const all =
      current && !options.includes(current) ? [current, ...options] : options;
    return (
      '<option value="">Select an option</option>' +
      all
        .map(
          (v) =>
            `<option value="${escapeHtml(v)}"${v === current ? " selected" : ""}>${escapeHtml(v)}</option>`,
        )
        .join("")
    );
  }
  function escapeHtml(v) {
    return String(v).replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );
  }
  function renderRows() {
    const root = $("rows");
    root.innerHTML = "";
    if (!state.rows.length) {
      root.innerHTML =
        '<p class="footnote">No rows yet. Add one to list a mosque and prayer leader.</p>';
      return;
    }
    state.rows.forEach((row, i) => {
      const card = document.createElement("div");
      card.className = "row-card";
      card.innerHTML = `
        <div class="row-head">
          <strong>Row ${i + 1}</strong>
          <div class="row-tools">
            <button class="icon-btn" type="button" data-act="up" aria-label="Move row ${i + 1} up"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 14 6-6 6 6"/></svg></button>
            <button class="icon-btn" type="button" data-act="down" aria-label="Move row ${i + 1} down"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 10 6 6 6-6"/></svg></button>
            <button class="icon-btn danger" type="button" data-act="remove" aria-label="Remove row ${i + 1}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 7h16m-10 4v6m4-6v6M9 7l1-3h4l1 3m3 0-1 14H7L6 7"/></svg></button>
          </div>
        </div>
        <div class="field"><label>Mosque name</label><select data-key="mosque">${optionMarkup(mosqueOptions, row.mosque)}</select></div>
        <div class="field"><label>Prayer leader</label><select data-key="leader">${optionMarkup(leaderOptions, row.leader)}</select></div>
        <div class="field"><label>Address or island</label><select data-key="address">${optionMarkup(addressOptions, row.address)}</select></div>`;
      card.querySelectorAll("select,input").forEach((control) => {
        control.dir = state.direction;
        control.classList.toggle("rtl", state.direction === "rtl");
        control.addEventListener(
          control.tagName === "SELECT" ? "change" : "input",
          () => {
            row[control.dataset.key] = control.value;
            drawPoster();
          },
        );
      });
      card.querySelectorAll("button").forEach(
        (btn) =>
          (btn.onclick = () => {
            const a = btn.dataset.act;
            if (a === "remove") state.rows.splice(i, 1);
            if (a === "up" && i > 0)
              [state.rows[i - 1], state.rows[i]] = [
                state.rows[i],
                state.rows[i - 1],
              ];
            if (a === "down" && i < state.rows.length - 1)
              [state.rows[i + 1], state.rows[i]] = [
                state.rows[i],
                state.rows[i + 1],
              ];
            renderRows();
            drawPoster();
          }),
      );
      root.appendChild(card);
    });
  }
  $("addRow").onclick = () => {
    const i = state.rows.length;
    state.rows.push({
      mosque: "",
      leader: "",
      address: "",
      id: "row-" + Date.now(),
      ...makeRowPosition(i),
    });
    renderRows();
    refreshLayerControls();
    drawPoster();
    toast("Information row added");
  };
  function loadLocalImage(input, kind) {
    const file = input.files && input.files[0];
    if (!file) return;
    const allowed =
      kind === "bismillah"
        ? ["image/png", "image/svg+xml"]
        : kind === "logo"
          ? ["image/png", "image/jpeg", "image/webp", "image/svg+xml"]
          : ["image/png", "image/jpeg", "image/webp"];
    const err = $(`${kind}Error`);
    err.textContent = "";
    if (!allowed.includes(file.type)) {
      err.textContent = "Choose a supported image file.";
      input.value = "";
      return;
    }
    const request = ++imageRequest[kind];
    const url = URL.createObjectURL(file),
      img = new Image();
    img.onload = async () => {
      if (request !== imageRequest[kind]) {
        URL.revokeObjectURL(url);
        return;
      }
      const old =
        kind === "bismillah"
          ? bismillahUrl
          : kind === "logo"
            ? logoUrl
            : backgroundUrl;
      if (old && old.startsWith("blob:")) URL.revokeObjectURL(old);
      if (kind === "bismillah") {
        bismillahImage = img;
        bismillahUrl = url;
        bismillahCanTint = true;
        state.showBismillah = true;
        setValue("showBismillah", true);
      } else if (kind === "logo") {
        logoImage = img;
        logoUrl = url;
        state.showLogo = true;
        setValue("showLogo", true);
      } else {
        backgroundImage = img;
        backgroundUrl = url;
      }
      try {
        const data = await fileAsDataUrl(file);
        if (request === imageRequest[kind]) assetData[kind] = data;
      } catch (error) {
        if (request === imageRequest[kind]) assetData[kind] = null;
        console.error("Could not prepare uploaded image for saving", error);
      }
      drawPoster();
      toast(
        kind === "bismillah"
          ? "Bismillah artwork added"
          : kind === "logo"
            ? "Logo added"
            : "Background added",
      );
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      if (request !== imageRequest[kind]) return;
      err.textContent = "This image could not be loaded. Try another file.";
    };
    img.src = url;
    input.value = "";
  }

  function loadBundledArtwork() {
    const bundled = window.DEFAULT_POSTER_ASSETS;
    if (!bundled) {
      ["backgroundError", "bismillahError", "logoError"].forEach((id) => {
        $(id).textContent =
          "Bundled artwork is unavailable. Run tools/embed-default-assets.ps1.";
      });
      return;
    }

    const background = new Image();
    background.onload = () => {
      backgroundImage = background;
      backgroundUrl = bundled.background;
      drawPoster();
    };
    background.onerror = () => {
      $("backgroundError").textContent =
        "The default background image could not be loaded.";
    };
    background.src = bundled.background;

    const bismillah = new Image();
    bismillah.onload = () => {
      bismillahImage = bismillah;
      bismillahUrl = bundled.bismillah;
      bismillahCanTint = true;
      bismillahTintCanvas = null;
      bismillahTintKey = "";
      drawPoster();
    };
    bismillah.onerror = () => {
      $("bismillahError").textContent =
        "The default Bismillah artwork could not be loaded.";
    };
    bismillah.src = bundled.bismillah;

    const logo = new Image();
    logo.onload = () => {
      logoImage = logo;
      logoUrl = bundled.logo;
      drawPoster();
    };
    logo.onerror = () => {
      $("logoError").textContent = "The default logo could not be loaded.";
    };
    logo.src = bundled.logo;
  }

  $("bismillahUpload").onchange = (e) =>
    loadLocalImage(e.target, "bismillah");
  $("logoUpload").onchange = (e) => loadLocalImage(e.target, "logo");
  $("backgroundUpload").onchange = (e) =>
    loadLocalImage(e.target, "background");
  $("removeLogo").onclick = () => {
    imageRequest.logo++;
    if (logoUrl) URL.revokeObjectURL(logoUrl);
    logoUrl = null;
    logoImage = null;
    assetData.logo = null;
    state.showLogo = false;
    setValue("showLogo", false);
    drawPoster();
    toast("Logo removed");
  };
  $("removeBismillah").onclick = () => {
    imageRequest.bismillah++;
    if (bismillahUrl) URL.revokeObjectURL(bismillahUrl);
    bismillahUrl = null;
    bismillahImage = null;
    assetData.bismillah = null;
    bismillahCanTint = false;
    state.showBismillah = false;
    setValue("showBismillah", false);
    drawPoster();
    toast("Bismillah artwork removed");
  };
  $("removeBackground").onclick = () => {
    imageRequest.background++;
    if (backgroundUrl) URL.revokeObjectURL(backgroundUrl);
    backgroundUrl = null;
    backgroundImage = null;
    assetData.background = null;
    drawPoster();
    toast("Background removed");
  };
  $("resetBackground").onclick = () => {
    ["bgMode", "bgOpacity", "bgZoom", "bgX", "bgY", "photoOverlay"].forEach(
      (id) => {
        state[id] = defaults[id];
        setValue(id, state[id]);
      },
    );
    drawPoster();
    toast("Image controls reset");
  };
  $("fontUpload").onchange = async (e) => {
    const file = e.target.files && e.target.files[0],
      err = $("fontError");
    err.textContent = "";
    if (!file) return;
    try {
      if (fontUrl) URL.revokeObjectURL(fontUrl);
      fontUrl = URL.createObjectURL(file);
      const name = "PosterFont" + Date.now(),
        face = new FontFace(name, `url(${fontUrl})`);
      await face.load();
      document.fonts.add(face);
      customFont = name;
      assetData.font = { name: file.name, data: await fileAsDataUrl(file) };
      const status = $("fontStatus");
      status.replaceChildren();
      const dot = document.createElement("span");
      dot.className = "status-dot";
      status.append(dot, document.createTextNode("Using " + file.name));
      drawPoster();
      toast("Custom font loaded");
    } catch (ex) {
      err.textContent =
        "This font could not be loaded. Try a TTF, OTF, WOFF, or WOFF2 file.";
    }
    e.target.value = "";
  };
  $("resetDesign").onclick = () => {
    [
      "navy",
      "gold",
      "mainText",
      "panelColor",
      "panelTextColor",
      "panelOpacity",
      "rowLabelColor",
      "rowLabelTextColor",
      "rowLabelOpacity",
      "overlayDarkness",
      "contentScale",
      "showGuides",
    ].forEach((id) => {
      state[id] = defaults[id];
      setValue(id, state[id]);
    });
    drawPoster();
    toast("Design settings reset");
  };
  function serializable() {
    return { version: 2, state: clone(state), assets: clone(assetData) };
  }
  function hydratedState(value) {
    if (!value || typeof value !== "object" || Array.isArray(value))
      throw new Error("Invalid saved settings");
    const source = value.version === 2 ? value.state : value;
    if (!source || typeof source !== "object" || Array.isArray(source))
      throw new Error("Invalid saved state");
    if (source.rows !== undefined && !Array.isArray(source.rows))
      throw new Error("Invalid saved rows");
    if (
      source.transforms !== undefined &&
      (!source.transforms ||
        typeof source.transforms !== "object" ||
        Array.isArray(source.transforms))
    )
      throw new Error("Invalid saved transforms");
    const next = { ...clone(defaults) };
    Object.keys(defaults).forEach((key) => {
      if (source[key] !== undefined) next[key] = clone(source[key]);
    });
    next.transforms = {
      ...clone(defaultTransforms),
      ...(source.transforms ? clone(source.transforms) : {}),
    };
    next.rows = (source.rows || clone(defaults.rows)).filter(
      (row) => row && typeof row === "object" && !Array.isArray(row),
    );
    return next;
  }
  function restoreSavedImage(kind, data) {
    if (typeof data !== "string" || !data.startsWith("data:image/")) return;
    const request = ++imageRequest[kind];
    const img = new Image();
    img.onload = () => {
      if (request !== imageRequest[kind]) return;
      if (kind === "background") {
        if (backgroundUrl && backgroundUrl.startsWith("blob:"))
          URL.revokeObjectURL(backgroundUrl);
        backgroundImage = img;
        backgroundUrl = data;
      }
      if (kind === "logo") {
        if (logoUrl && logoUrl.startsWith("blob:")) URL.revokeObjectURL(logoUrl);
        logoImage = img;
        logoUrl = data;
      }
      if (kind === "bismillah") {
        if (bismillahUrl && bismillahUrl.startsWith("blob:"))
          URL.revokeObjectURL(bismillahUrl);
        bismillahImage = img;
        bismillahUrl = data;
        bismillahCanTint = true;
      }
      assetData[kind] = data;
      drawPoster();
    };
    img.src = data;
  }
  async function restoreSavedFont(savedFont) {
    if (
      !savedFont ||
      typeof savedFont.name !== "string" ||
      typeof savedFont.data !== "string" ||
      !savedFont.data.startsWith("data:")
    )
      return;
    const name = "PosterFont" + Date.now();
    const face = new FontFace(name, `url(${savedFont.data})`);
    await face.load();
    document.fonts.add(face);
    customFont = name;
    assetData.font = clone(savedFont);
    const status = $("fontStatus");
    status.replaceChildren();
    const dot = document.createElement("span");
    dot.className = "status-dot";
    status.append(dot, document.createTextNode("Using " + savedFont.name));
    drawPoster();
  }
  $("saveBtn").onclick = () => {
    try {
      localStorage.setItem(
        "noorPosterSettings",
        JSON.stringify(serializable()),
      );
      toast("Settings saved in this browser");
    } catch (e) {
      toast("Browser storage is unavailable");
    }
  };
  $("loadBtn").onclick = () => {
    try {
      const saved = localStorage.getItem("noorPosterSettings");
      if (!saved) {
        toast("No saved settings found");
        return;
      }
      const parsed = JSON.parse(saved);
      const nextState = hydratedState(parsed);
      const savedAssets = parsed.version === 2 && parsed.assets ? parsed.assets : {};
      const previousState = state;
      state = nextState;
      try {
        applyState();
      } catch (error) {
        state = previousState;
        applyState();
        throw error;
      }
      ["background", "bismillah", "logo"].forEach((kind) =>
        restoreSavedImage(kind, savedAssets[kind]),
      );
      restoreSavedFont(savedAssets.font).catch((error) =>
        console.error("Saved font could not be restored", error),
      );
      toast("Saved settings loaded");
    } catch (e) {
      toast("Saved settings could not be loaded");
    }
  };
  function resetAll() {
    state = clone(defaults);
    imageRequest.background++;
    imageRequest.bismillah++;
    imageRequest.logo++;
    if (backgroundUrl) URL.revokeObjectURL(backgroundUrl);
    if (bismillahUrl) URL.revokeObjectURL(bismillahUrl);
    if (logoUrl) URL.revokeObjectURL(logoUrl);
    backgroundUrl = bismillahUrl = logoUrl = null;
    backgroundImage = bismillahImage = logoImage = null;
    bismillahCanTint = false;
    assetData = { background: null, bismillah: null, logo: null, font: null };
    applyState();
    loadBundledArtwork();
    toast("Poster reset");
  }
  $("resetAll").onclick = () => {
    if (confirm("Reset all poster content and design settings?")) resetAll();
  };
  // Export only the full-resolution canvas as a timestamped PNG.
  async function download() {
    const downloadButtons = [$("downloadBtn"), $("mobileDownload")];
    downloadButtons.forEach((button) => (button.disabled = true));
    try {
      const loadedFonts = await document.fonts.load(
        '16px "Faruma"',
        "ދިވެހި",
      );
      if (!loadedFonts.length) throw new Error("Faruma font did not load");
      await document.fonts.ready;
      drawPoster(true);
      const d = new Date(),
        stamp = [
          d.getFullYear(),
          String(d.getMonth() + 1).padStart(2, "0"),
          String(d.getDate()).padStart(2, "0"),
          String(d.getHours()).padStart(2, "0"),
          String(d.getMinutes()).padStart(2, "0"),
        ].join("-");
      const blob = await new Promise((resolve) =>
        canvas.toBlob(resolve, "image/png"),
      );
      if (!blob)
        throw new Error("The canvas could not be converted to a PNG");
      const url = URL.createObjectURL(blob),
        a = document.createElement("a");
      a.download = `maldives-event-poster-${stamp}.png`;
      a.href = url;
      a.hidden = true;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      toast("1080 × 1350 poster downloaded");
    } catch (error) {
      console.error("Poster export failed", error);
      toast("Faruma could not be loaded. Reload the page and try again.");
    } finally {
      drawPoster();
      downloadButtons.forEach((button) => (button.disabled = false));
    }
  }
  $("downloadBtn").onclick = download;
  $("mobileDownload").onclick = download;
  window.addEventListener("beforeunload", () => {
    [backgroundUrl, bismillahUrl, logoUrl, fontUrl]
      .filter(Boolean)
      .forEach(URL.revokeObjectURL);
  });
  setupHijriPickers();
  applyState();
  loadBundledArtwork();
  document.fonts.ready.then(() => drawPoster());
})();
