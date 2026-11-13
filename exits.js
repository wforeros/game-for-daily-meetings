// Animaciones de salida de los pollitos.
// Cada salida recibe un contexto { slot, chick, body, tag, size, name } y
// termina cuando el pollito ya no está en pantalla.
window.ChickExits = (() => {
  "use strict";

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const run = (el, frames, opts = {}) =>
    el.animate(frames, { duration: 600, easing: "ease-in-out", fill: "forwards", ...opts }).finished;

  // ---------- Dibujos ----------
  const wheel = (cx, cy, r) => `
    <g class="wheel">
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="#2d2d35"/>
      <circle cx="${cx}" cy="${cy}" r="${r * 0.45}" fill="#c9ced6"/>
      <path d="M${cx - r * 0.45} ${cy} L${cx + r * 0.45} ${cy} M${cx} ${cy - r * 0.45} L${cx} ${cy + r * 0.45}" stroke="#7d8a99" stroke-width="2"/>
    </g>`;

  const CAR = `
<svg viewBox="0 0 180 95" xmlns="http://www.w3.org/2000/svg">
  <path d="M122 42 L134 16" stroke="#a3262b" stroke-width="7" stroke-linecap="round"/>
  <path d="M122 42 L134 16" stroke="#9fdcff" stroke-width="4" stroke-linecap="round"/>
  <path d="M8 54 Q8 42 22 42 L150 42 Q172 44 176 58 L176 72 Q176 78 170 78 L14 78 Q8 78 8 72 Z" fill="#e5484d" stroke="#a3262b" stroke-width="2.5" stroke-linejoin="round"/>
  <path d="M14 62 L170 62" stroke="#fff" stroke-width="3" opacity=".55"/>
  <path d="M66 46 L66 74" stroke="#a3262b" stroke-width="2"/>
  <rect x="72" y="50" width="10" height="3" rx="1.5" fill="#a3262b"/>
  <ellipse cx="171" cy="52" rx="4" ry="5" fill="#ffe680"/>
  <rect x="8" y="47" width="5" height="9" rx="2" fill="#ffb3b3"/>
  ${wheel(44, 78, 16)}
  ${wheel(146, 78, 16)}
</svg>`;

  const PLANE = `
<svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
  <path d="M24 56 L8 20 L32 20 L56 48 Z" fill="#e5484d" stroke="#a3262b" stroke-width="2" stroke-linejoin="round"/>
  <path d="M14 60 Q14 42 40 42 L160 42 Q192 44 194 60 Q192 76 160 78 L40 78 Q14 76 14 60 Z" fill="#f5f7fa" stroke="#7d8a99" stroke-width="2.5"/>
  <path d="M18 68 L186 68" stroke="#e5484d" stroke-width="3"/>
  <path d="M158 45 Q180 47 187 58 L158 58 Z" fill="#9fdcff" stroke="#7d8a99" stroke-width="1.5"/>
  <circle cx="60" cy="56" r="5" fill="#9fdcff"/>
  <circle cx="80" cy="56" r="5" fill="#9fdcff"/>
  <circle cx="120" cy="56" r="5" fill="#9fdcff"/>
  <circle cx="140" cy="56" r="5" fill="#9fdcff"/>
  <path d="M72 66 L122 66 L102 92 L82 92 Z" fill="#c4cfdb" stroke="#7d8a99" stroke-width="2" stroke-linejoin="round"/>
  <rect x="192" y="54" width="6" height="12" rx="2" fill="#7d8a99"/>
  <ellipse class="propeller" cx="198" cy="60" rx="3" ry="24" fill="#55606e" opacity=".85"/>
</svg>`;

  const BUS = `
<svg viewBox="0 0 240 125" xmlns="http://www.w3.org/2000/svg">
  <rect x="6" y="10" width="228" height="90" rx="16" fill="#f7c331" stroke="#b9861a" stroke-width="3"/>
  <rect x="7" y="68" width="226" height="8" fill="#2d2d35" opacity=".2"/>
  <rect x="18" y="22" width="34" height="30" rx="5" fill="#9fdcff" stroke="#b9861a" stroke-width="2"/>
  <rect x="60" y="22" width="34" height="30" rx="5" fill="#9fdcff" stroke="#b9861a" stroke-width="2"/>
  <rect x="102" y="22" width="34" height="30" rx="5" fill="#9fdcff" stroke="#b9861a" stroke-width="2"/>
  <rect x="144" y="22" width="30" height="30" rx="5" fill="#9fdcff" stroke="#b9861a" stroke-width="2"/>
  <rect x="182" y="22" width="36" height="72" rx="5" fill="#9fdcff" stroke="#b9861a" stroke-width="2"/>
  <path d="M200 22 L200 94" stroke="#b9861a" stroke-width="2"/>
  <circle cx="228" cy="84" r="5" fill="#fff2a8"/>
  <rect x="70" y="0" width="60" height="14" rx="4" fill="#2d2d35"/>
  <text x="100" y="11" text-anchor="middle" font-size="10" font-weight="700" fill="#ffd34d" font-family="sans-serif">DAILY</text>
  ${wheel(54, 100, 17)}
  ${wheel(184, 100, 17)}
</svg>`;

  const ANVIL = `
<svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
  <path d="M2 12 Q20 10 30 10 L114 10 L114 24 Q96 26 88 36 L88 54 L102 56 L102 74 L18 74 L18 56 L32 54 L32 36 Q26 28 2 22 Z" fill="#4b5260" stroke="#2a2e36" stroke-width="3" stroke-linejoin="round"/>
  <path d="M34 15 L110 15" stroke="#8a93a3" stroke-width="3" stroke-linecap="round"/>
  <text x="60" y="50" text-anchor="middle" font-size="13" font-weight="800" fill="#aab3c2" font-family="sans-serif">10 T</text>
</svg>`;

  const JETPACK = `
<svg viewBox="0 0 140 120" xmlns="http://www.w3.org/2000/svg">
  <g class="flame"><path d="M10 82 Q18 122 26 82 Z" fill="#ff9f1c"/><path d="M14 82 Q18 104 22 82 Z" fill="#ffe066"/></g>
  <g class="flame"><path d="M114 82 Q122 122 130 82 Z" fill="#ff9f1c"/><path d="M118 82 Q122 104 126 82 Z" fill="#ffe066"/></g>
  <rect x="10" y="70" width="16" height="12" rx="2" fill="#55606e"/>
  <rect x="114" y="70" width="16" height="12" rx="2" fill="#55606e"/>
  <rect x="4" y="16" width="28" height="58" rx="12" fill="#c3ccd6" stroke="#6b7785" stroke-width="3"/>
  <rect x="108" y="16" width="28" height="58" rx="12" fill="#c3ccd6" stroke="#6b7785" stroke-width="3"/>
  <path d="M4 24 Q18 -6 32 24 Z" fill="#e5484d" stroke="#a3262b" stroke-width="2"/>
  <path d="M108 24 Q122 -6 136 24 Z" fill="#e5484d" stroke="#a3262b" stroke-width="2"/>
</svg>`;

  const BALLOONS = `
<svg viewBox="0 0 100 130" xmlns="http://www.w3.org/2000/svg">
  <path d="M30 50 Q40 90 50 130 M55 42 Q52 86 50 130 M78 54 Q62 92 50 130" stroke="#7a5236" stroke-width="1.5" fill="none"/>
  <ellipse cx="30" cy="28" rx="17" ry="21" fill="#ff5d73"/>
  <ellipse cx="78" cy="32" rx="17" ry="21" fill="#7bd651"/>
  <ellipse cx="55" cy="20" rx="18" ry="22" fill="#5aa9ff"/>
  <ellipse cx="24" cy="20" rx="4" ry="7" fill="#fff" opacity=".45"/>
  <ellipse cx="49" cy="11" rx="4" ry="7" fill="#fff" opacity=".45"/>
  <ellipse cx="72" cy="24" rx="4" ry="7" fill="#fff" opacity=".45"/>
  <path d="M27 49 L33 49 L30 53 Z M52 42 L58 42 L55 46 Z M75 53 L81 53 L78 57 Z" fill="#7a5236"/>
</svg>`;


  const HORSE = `
<svg viewBox="0 0 240 190" xmlns="http://www.w3.org/2000/svg">
  <!-- patas traseras (lado lejano) -->
  <g class="leg leg-b"><rect x="70" y="122" width="11" height="52" rx="5" fill="#8a5126"/><rect x="68" y="168" width="15" height="8" rx="3" fill="#3b2414"/></g>
  <g class="leg leg-a"><rect x="152" y="122" width="11" height="52" rx="5" fill="#8a5126"/><rect x="150" y="168" width="15" height="8" rx="3" fill="#3b2414"/></g>
  <!-- cola -->
  <path d="M58 104 Q30 100 26 124 Q24 140 36 146 Q34 128 48 118 Q56 114 62 112 Z" fill="#4a2a12"/>
  <!-- cuerpo -->
  <ellipse cx="118" cy="114" rx="64" ry="30" fill="#a8672f"/>
  <ellipse cx="104" cy="104" rx="30" ry="9" fill="#c0803f" opacity=".6"/>
  <!-- cuello y cabeza -->
  <path d="M158 104 Q166 72 188 54 L204 66 Q186 86 180 118 Z" fill="#a8672f"/>
  <ellipse cx="206" cy="66" rx="24" ry="13" fill="#a8672f" transform="rotate(28 206 66)"/>
  <ellipse cx="220" cy="76" rx="9" ry="7" fill="#c0803f" transform="rotate(28 220 76)"/>
  <circle cx="223" cy="78" r="1.8" fill="#3b2414"/>
  <circle cx="200" cy="58" r="3" fill="#1b120c"/>
  <circle cx="201" cy="57" r="1" fill="#fff"/>
  <path d="M190 48 L194 36 L198 50 Z" fill="#8a5126"/>
  <!-- crin -->
  <path d="M186 50 Q176 58 170 72 Q166 82 160 92 Q170 86 172 78 Q178 70 180 62 Q186 56 192 52 Z" fill="#4a2a12"/>
  <!-- riendas -->
  <path d="M212 74 Q180 76 150 70" stroke="#5a3418" stroke-width="2" fill="none"/>
  <!-- silla -->
  <path d="M84 88 Q112 80 150 88 L148 100 Q114 94 86 100 Z" fill="#7a2e1e"/>
  <rect x="110" y="98" width="6" height="24" rx="2" fill="#5a3418"/>
  <!-- vaqueros -->
  
  <g>
    <ellipse cx="96" cy="70" rx="21" ry="25" fill="#f6ae4a"/>
    <ellipse cx="100" cy="64" rx="2.6" ry="3.2" fill="#1b120c"/>
    <ellipse cx="110" cy="64" rx="2.6" ry="3.2" fill="#1b120c"/>
    <path d="M96 58 L103 60 M114 58 L107 60" stroke="#3b2414" stroke-width="2" stroke-linecap="round"/>
    <path d="M114 69 L122 71 L114 74 Z" fill="#e0702a"/>
    <path d="M82 80 Q98 92 114 80 L108 90 Q98 96 88 90 Z" fill="#3a7bd5"/>
    <ellipse cx="98" cy="47" rx="28" ry="5" fill="#d9b26f" stroke="#3b2414" stroke-width="1.5"/>
    <path d="M84 47 Q84 28 92 30 Q98 34 104 30 Q112 28 112 47 Z" fill="#d9b26f" stroke="#3b2414" stroke-width="1.5"/>
    <path d="M84 43 L112 43" stroke="#3b2414" stroke-width="3"/>
  </g>
  <g>
    <ellipse cx="136" cy="70" rx="21" ry="25" fill="#f6ae4a"/>
    <ellipse cx="140" cy="64" rx="2.6" ry="3.2" fill="#1b120c"/>
    <ellipse cx="150" cy="64" rx="2.6" ry="3.2" fill="#1b120c"/>
    <path d="M136 58 L143 60 M154 58 L147 60" stroke="#3b2414" stroke-width="2" stroke-linecap="round"/>
    <path d="M154 69 L162 71 L154 74 Z" fill="#e0702a"/>
    <path d="M122 80 Q138 92 154 80 L148 90 Q138 96 128 90 Z" fill="#f2c94c"/>
    <ellipse cx="138" cy="47" rx="28" ry="5" fill="#f2efe6" stroke="#3b2414" stroke-width="1.5"/>
    <path d="M124 47 Q124 28 132 30 Q138 34 144 30 Q152 28 152 47 Z" fill="#f2efe6" stroke="#3b2414" stroke-width="1.5"/>
    <path d="M124 43 L152 43" stroke="#3b2414" stroke-width="3"/>
  </g>
  <!-- lazo girando -->
  <g class="rider-lasso">
    <path d="M150 64 L156 26" stroke="#c8a165" stroke-width="3" stroke-linecap="round"/>
    <ellipse class="spin-lasso" cx="156" cy="18" rx="26" ry="7" fill="none" stroke="#c8a165" stroke-width="3.5"/>
  </g>
  <!-- patas delanteras (lado cercano) -->
  <g class="leg leg-a"><rect x="82" y="122" width="12" height="52" rx="5" fill="#a8672f"/><rect x="80" y="168" width="16" height="8" rx="3" fill="#3b2414"/></g>
  <g class="leg leg-b"><rect x="164" y="122" width="12" height="52" rx="5" fill="#a8672f"/><rect x="162" y="168" width="16" height="8" rx="3" fill="#3b2414"/></g>
</svg>`;

  const LASSO = `
<svg viewBox="0 0 100 30" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="50" cy="15" rx="46" ry="11" fill="none" stroke="#c8a165" stroke-width="4"/>
  <path d="M90 12 Q110 0 120 -40" stroke="#c8a165" stroke-width="3" fill="none" stroke-linecap="round"/>
</svg>`;

  // ---------- Ayudantes ----------
  // Pone un objeto en el slot del pollito. `anchor` es la fracción del ancho del
  // objeto que queda alineada con el centro del pollito (+ `shift` px).
  function addProp(ctx, svg, { width, anchor = 0.5, shift = 0, bottom = 0, z = 3, cls = "" }) {
    const el = document.createElement("div");
    el.className = `prop ${cls}`;
    el.innerHTML = svg;
    el.style.width = `${width}px`;
    el.style.left = `${ctx.slot.offsetWidth / 2 - width * anchor + shift}px`;
    el.style.bottom = `${bottom}px`;
    el.style.zIndex = z;
    ctx.slot.append(el);
    return el;
  }

  // Distancias para sacar un elemento de la pantalla (medidas en reposo).
  function offscreen(el, margin = 60) {
    const r = el.getBoundingClientRect();
    return {
      left: -(r.right + margin),
      right: window.innerWidth - r.left + margin,
      up: -(r.bottom + margin),
    };
  }

  // Mete al pollito dentro de un vehículo para que se muevan juntos.
  function board(chick, vehicle) {
    const c = chick.getBoundingClientRect();
    const v = vehicle.getBoundingClientRect();
    chick.getAnimations().forEach((a) => a.cancel());
    chick.style.position = "absolute";
    chick.style.left = `${c.left - v.left}px`;
    chick.style.top = `${c.top - v.top}px`;
    vehicle.prepend(chick); // detrás del dibujo del vehículo
  }

  function puff(ctx, x, bottom, { dx = 0, dy = -20, delay = 0, scale = 1.6 } = {}) {
    const p = document.createElement("div");
    p.className = "puff";
    p.style.left = `${x}px`;
    p.style.bottom = `${bottom}px`;
    ctx.slot.append(p);
    run(p, [
      { transform: "translate(-50%, 0) scale(.3)", opacity: 1 },
      { transform: `translate(calc(-50% + ${dx}px), ${dy}px) scale(${scale})`, opacity: 0 },
    ], { duration: 700, delay, easing: "ease-out" }).then(() => p.remove());
  }

  function dust(ctx, count = 6) {
    const cx = ctx.slot.offsetWidth / 2;
    for (let i = 0; i < count; i++) {
      const side = i % 2 ? 1 : -1;
      puff(ctx, cx + side * ctx.size * 0.3, 0, {
        dx: side * (30 + Math.random() * 40), dy: -10 - Math.random() * 20, delay: i * 30,
      });
    }
  }

  function bubble(ctx, text) {
    const b = document.createElement("div");
    b.className = "bubble";
    b.textContent = text;
    ctx.slot.append(b);
    return b;
  }

  // ---------- Las 7 salidas ----------
  const EXITS = {
    carro: {
      label: (n) => `${n} se va en su carro 🚗`,
      async play(ctx) {
        const { chick, size } = ctx;
        const car = addProp(ctx, CAR, { width: size * 1.9, anchor: 0.52, bottom: -8 });
        const off = offscreen(car);
        car.classList.add("moving");
        await run(car, [{ transform: `translateX(${off.left}px)` }, { transform: "translateX(0)" }],
          { duration: 1100, easing: "cubic-bezier(.2,.8,.3,1)" });
        car.classList.remove("moving");
        await run(chick, [
          { transform: "translateY(0)" },
          { transform: `translateY(${-size * 0.55}px)`, offset: 0.5 },
          { transform: `translateY(${-size * 0.1}px)` },
        ], { duration: 500 });
        board(chick, car);
        await run(car, [{ transform: "translateY(0)" }, { transform: "translateY(5px)" }, { transform: "translateY(0)" }], { duration: 250 });
        await sleep(200);
        const tailX = parseFloat(car.style.left);
        [0, 120, 240].forEach((d) => puff(ctx, tailX, 6, { dx: -40, dy: -10, delay: d }));
        car.classList.add("moving");
        await run(car, [{ transform: "translateX(0)" }, { transform: `translateX(${off.right}px)` }],
          { duration: 1100, easing: "cubic-bezier(.5,0,.8,.4)" });
      },
    },

    avion: {
      label: (n) => `${n} despega en avión ✈️`,
      async play(ctx) {
        const { chick, size } = ctx;
        const plane = addProp(ctx, PLANE, { width: size * 2.1, anchor: 0.48, bottom: size * 0.15 });
        const off = offscreen(plane);
        await run(plane, [
          { transform: `translate(${off.left}px, ${-size * 1.6}px) rotate(8deg)` },
          { transform: "translate(0, 0) rotate(0)" },
        ], { duration: 1300, easing: "cubic-bezier(.2,.8,.3,1)" });
        const seat = -size * 0.56;
        await run(chick, [
          { transform: "translateY(0)" },
          { transform: `translateY(${seat - size * 0.35}px)`, offset: 0.55 },
          { transform: `translateY(${seat}px)` },
        ], { duration: 600 });
        board(chick, plane);
        await sleep(250);
        await run(plane, [
          { transform: "translate(0, 0) rotate(0)" },
          { transform: `translate(${size * 0.5}px, -6px) rotate(-6deg)`, offset: 0.25 },
          { transform: `translate(${off.right}px, ${off.up - size}px) rotate(-18deg)` },
        ], { duration: 1700, easing: "ease-in" });
      },
    },

    yunque: {
      label: (n) => `¡Cuidado, ${n}! 💥`,
      async play(ctx) {
        const { chick, body, tag, size, slot } = ctx;
        const bodyH = body.offsetHeight;
        const flatH = bodyH * 0.22;
        const shadow = addProp(ctx, "", { width: size * 0.9, bottom: -6, cls: "anvil-shadow", z: 1 });
        const anvil = addProp(ctx, ANVIL, { width: size * 0.95, bottom: flatH - 3 });
        const fall = offscreen(anvil, 20).up;
        anvil.style.transform = `translateY(${fall}px)`;

        const b = bubble(ctx, "❗");
        run(shadow, [{ transform: "scale(.1)", opacity: 0 }, { transform: "scale(1)", opacity: 1 }], { duration: 900, easing: "ease-in" });
        await run(chick, [
          { transform: "translateX(0)" }, { transform: "translateX(-3px)" }, { transform: "translateX(3px)" },
          { transform: "translateX(-3px)" }, { transform: "translateX(0)" },
        ], { duration: 400, iterations: 1 });
        b.remove();

        await run(anvil, [{ transform: `translateY(${fall}px)` }, { transform: `translateY(${-(bodyH - flatH)}px)` }],
          { duration: 500, easing: "cubic-bezier(.55,0,1,.45)" });
        // ¡Plaf!
        run(tag, [
          { transform: "translateY(0) rotate(0)", opacity: 1 },
          { transform: `translate(${size * 0.6}px, ${-size}px) rotate(200deg)`, opacity: 0 },
        ], { duration: 700, easing: "ease-out" });
        run(anvil, [{ transform: `translateY(${-(bodyH - flatH)}px)` }, { transform: "translateY(0)" }], { duration: 90, easing: "ease-out" });
        await run(body, [{ transform: "scale(1, 1)" }, { transform: "scale(1.35, .22)" }], { duration: 90, easing: "ease-out" });
        slot.parentElement.animate(
          [{ transform: "translateY(0)" }, { transform: "translateY(5px)" }, { transform: "translateY(-3px)" }, { transform: "translateY(0)" }],
          { duration: 260 });
        dust(ctx, 8);
        const stars = document.createElement("div");
        stars.className = "stars";
        stars.textContent = "💫 💫";
        stars.style.bottom = `${flatH + anvil.offsetHeight + 4}px`;
        slot.append(stars);
        run(stars, [{ transform: "translateX(-50%) rotate(-10deg)" }, { transform: "translateX(-50%) rotate(10deg)" }],
          { duration: 300, iterations: 4, direction: "alternate", fill: "none" });
        await sleep(1300);
        await Promise.all([anvil, chick, shadow, stars].map((el) =>
          run(el, [{ opacity: 1 }, { opacity: 0 }], { duration: 400 })));
      },
    },

    bus: {
      label: (n) => `${n} va tarde… ¡al bus! 🚌`,
      async play(ctx) {
        const { chick, body, size } = ctx;
        const b = bubble(ctx, "⌚ ¡Se me hizo tarde!");
        await run(body, [
          { transform: "rotate(0)" }, { transform: "rotate(-10deg)", offset: 0.3 },
          { transform: "rotate(-10deg)", offset: 0.7 }, { transform: "rotate(0)" },
        ], { duration: 1100 });
        await run(chick, [
          { transform: "translateX(0)" }, { transform: "translateX(-6px)" }, { transform: "translateX(6px)" },
          { transform: "translateX(-6px)" }, { transform: "translateX(6px)" }, { transform: "translateX(0)" },
        ], { duration: 450 });
        b.remove();

        const bus = addProp(ctx, BUS, { width: size * 2.6, anchor: 200 / 240, shift: size * 0.62, bottom: -14, z: 1 });
        const off = offscreen(bus);
        bus.classList.add("moving");
        await run(bus, [{ transform: `translateX(${off.left}px)` }, { transform: "translateX(0)" }],
          { duration: 1200, easing: "cubic-bezier(.2,.8,.3,1)" });
        bus.classList.remove("moving");
        await run(bus, [{ transform: "rotate(0)" }, { transform: "rotate(-1.5deg)" }, { transform: "rotate(0)" }],
          { duration: 300, fill: "none" });
        await run(chick, [
          { transform: "translate(0, 0) scale(1)", opacity: 1 },
          { transform: `translate(${size * 0.35}px, ${-size * 0.35}px) scale(.95)`, opacity: 1, offset: 0.5 },
          { transform: `translate(${size * 0.62}px, ${-size * 0.1}px) scale(.75)`, opacity: 0 },
        ], { duration: 650 });
        await sleep(250);
        bus.classList.add("moving");
        await run(bus, [{ transform: "translateX(0)" }, { transform: `translateX(${off.right}px)` }],
          { duration: 1200, easing: "cubic-bezier(.5,0,.8,.4)" });
      },
    },

    cohete: {
      label: (n) => `${n} sale disparado 🚀`,
      async play(ctx) {
        const { chick, body, size, slot } = ctx;
        const pack = document.createElement("div");
        pack.className = "jetpack";
        pack.innerHTML = JETPACK;
        body.append(pack);
        await run(pack, [{ transform: "scale(0)" }, { transform: "scale(1.1)", offset: 0.7 }, { transform: "scale(1)" }],
          { duration: 350, easing: "ease-out" });
        pack.classList.add("on");
        const shake = [];
        for (let i = 0; i < 10; i++) shake.push({ transform: `translate(${(Math.random() - 0.5) * 6}px, ${-Math.random() * 4}px)` });
        shake.push({ transform: "translate(0, 0)" });
        const cx = slot.offsetWidth / 2;
        [0, 150, 300, 450].forEach((d) => {
          puff(ctx, cx - size * 0.45, 0, { dx: -30, delay: d });
          puff(ctx, cx + size * 0.45, 0, { dx: 30, delay: d });
        });
        await run(chick, shake, { duration: 700, easing: "linear" });
        dust(ctx, 8);
        await run(chick, [{ transform: "translateY(0)" }, { transform: `translateY(${offscreen(chick).up - size}px)` }],
          { duration: 1000, easing: "cubic-bezier(.6,0,.9,.6)" });
      },
    },

    globos: {
      label: (n) => `${n} se va flotando 🎈`,
      async play(ctx) {
        const { chick, size } = ctx;
        const bal = document.createElement("div");
        bal.className = "balloons";
        bal.innerHTML = BALLOONS;
        chick.append(bal);
        await run(bal, [{ transform: "scale(0)" }, { transform: "scale(1.1)", offset: 0.7 }, { transform: "scale(1)" }],
          { duration: 500, easing: "ease-out" });
        await run(chick, [
          { transform: "translateY(0)" }, { transform: `translateY(${-size * 0.08}px)` }, { transform: "translateY(0)" },
        ], { duration: 500 });
        const up = offscreen(chick).up - size * 1.6;
        await run(chick, [
          { transform: "translate(0, 0) rotate(0)" },
          { transform: `translate(${size * 0.2}px, ${up * 0.15}px) rotate(5deg)`, offset: 0.2 },
          { transform: `translate(${-size * 0.2}px, ${up * 0.45}px) rotate(-5deg)`, offset: 0.5 },
          { transform: `translate(${size * 0.25}px, ${up * 0.75}px) rotate(4deg)`, offset: 0.75 },
          { transform: `translate(0, ${up}px) rotate(0)` },
        ], { duration: 2800, easing: "ease-in" });
      },
    },

    vaqueros: {
      label: (n) => `¡Yiijaa! Unos vaqueros se llevan a ${n} 🤠`,
      async play(ctx) {
        const { chick, size } = ctx;
        // El anca del caballo (x≈62 de 240) queda alineada con el pollito
        const horse = addProp(ctx, HORSE, { width: size * 3.4, anchor: 58 / 240, bottom: -10, cls: "horse" });
        const off = offscreen(horse);
        horse.classList.add("galloping");
        await run(horse, [{ transform: `translateX(${off.left}px)` }, { transform: "translateX(0)" }],
          { duration: 1500, easing: "cubic-bezier(.2,.7,.35,1)" });
        horse.classList.remove("galloping");
        await run(horse, [{ transform: "rotate(0)" }, { transform: "rotate(-4deg)" }, { transform: "rotate(0)" }],
          { duration: 350, fill: "none" });

        // Lanza el lazo
        horse.querySelector(".rider-lasso").style.opacity = "0";
        const lasso = document.createElement("div");
        lasso.className = "lasso";
        lasso.innerHTML = LASSO;
        ctx.body.append(lasso);
        await run(lasso, [
          { transform: `translate(${size * 0.9}px, ${-size * 1.3}px) scale(1.4) rotate(-30deg)`, opacity: 0 },
          { transform: `translate(${size * 0.4}px, ${-size * 0.9}px) scale(1.3) rotate(-10deg)`, opacity: 1, offset: 0.4 },
          { transform: "translate(0, 0) scale(1) rotate(0)", opacity: 1 },
        ], { duration: 700, easing: "ease-in" });
        await run(chick, [
          { transform: "translateY(0)" }, { transform: "translateY(4px) scale(1.05, .95)" }, { transform: "translateY(0)" },
        ], { duration: 220 });

        // ¡Arriba!
        const seat = -size * 1.12;
        await run(chick, [
          { transform: "translate(0, 0) rotate(0)" },
          { transform: `translate(${size * 0.05}px, ${seat - size * 0.45}px) rotate(-20deg)`, offset: 0.55 },
          { transform: `translate(0, ${seat}px) rotate(-8deg)` },
        ], { duration: 650, easing: "ease-out" });
        board(chick, horse);
        chick.style.transform = "rotate(-8deg)";
        await sleep(200);
        horse.classList.add("galloping");
        await run(horse, [
          { transform: "translateX(0)" },
          { transform: `translateX(${off.right + size}px)` },
        ], { duration: 1500, easing: "cubic-bezier(.5,0,.8,.5)" });
      },
    },
  };

  const NAMES = Object.keys(EXITS);
  let bag = [];

  function pick() {
    if (!bag.length) {
      bag = NAMES.slice();
      for (let i = bag.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [bag[i], bag[j]] = [bag[j], bag[i]];
      }
    }
    return bag.pop();
  }

  // ---------- Despedidas ----------
  const FAREWELLS = [
    "¡Me voy a tomar un café… de 3 horas! ☕",
    "Si alguien pregunta, estoy en otra reunión",
    "¡En mi máquina funciona! 👋",
    "Me voy antes de que me asignen otro ticket",
    "Nos vemos en el próximo daily… o no 😎",
    "¡Hasta la vista, bugs!",
    "Voy a hacer merge sin review 😈",
    "Bueno, a fingir que trabajo",
    "¡Chao! Dejé el build roto 🙃",
    "Me llama mi mamá gallina 🐔",
    "Alt + F4 y me voy 👋",
    "Mi update era que me voy",
    "Me voy a picotear unos bugs 🐛",
    "Esta reunión pudo ser un correo 📧",
    "Cámara apagada, modo siesta 😴",
    "Les dejo mis bloqueos de regalo 🎁",
    "¡Adiós! No toquen producción 🔥",
    "Me voy a mover tickets a «Done» 😏",
    "¿Ya me puedo ir? ¡Gracias!",
    "Si se cae Claude, no trabajo 🤷",
  ];
  let farewellBag = [];
  function farewell() {
    if (!farewellBag.length) {
      farewellBag = FAREWELLS.slice();
      for (let i = farewellBag.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [farewellBag[i], farewellBag[j]] = [farewellBag[j], farewellBag[i]];
      }
    }
    return farewellBag.pop();
  }

  async function sayGoodbye(ctx) {
    const b = bubble(ctx, farewell());
    b.classList.add("farewell");
    // Que el globo no se salga de la pantalla
    const r = b.getBoundingClientRect();
    const margin = 8;
    if (r.left < margin) b.style.marginLeft = `${margin - r.left}px`;
    else if (r.right > window.innerWidth - margin) b.style.marginLeft = `${window.innerWidth - margin - r.right}px`;

    await run(ctx.chick, [
      { transform: "translateY(0)" }, { transform: "translateY(-10px)" }, { transform: "translateY(0)" },
      { transform: "translateY(-6px)" }, { transform: "translateY(0)" },
    ], { duration: 600, fill: "none" });
    await sleep(1500);
    await run(b, [{ opacity: 1 }, { opacity: 0 }], { duration: 250 });
    b.remove();
  }

  async function play(slot, name, setHint, forced) {
    const chick = slot.querySelector(".chick");
    const ctx = {
      slot, chick, name,
      body: chick.querySelector(".chick-body"),
      tag: chick.querySelector(".tag"),
      size: chick.offsetWidth,
    };
    slot.classList.add("leaving");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      await run(chick, [{ opacity: 1 }, { opacity: 0 }], { duration: 300 });
      return;
    }

    // ?salida=carro en la URL fuerza una salida (útil para probar)
    const fromUrl = new URLSearchParams(location.search).get("salida");
    const key = forced || (EXITS[fromUrl] ? fromUrl : pick());
    try {
      setHint(`${name} se despide 👋`);
      await sayGoodbye(ctx);
      setHint(EXITS[key].label(name));
      await EXITS[key].play(ctx);
    } catch (err) {
      console.error(err);
    }
    slot.style.visibility = "hidden";
  }

  return { play, reset: () => { bag = []; farewellBag = []; }, names: NAMES };
})();
