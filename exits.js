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

  function feathers(ctx, count = 6) {
    const cx = ctx.slot.offsetWidth / 2;
    for (let i = 0; i < count; i++) {
      const f = document.createElement("div");
      f.className = "feather";
      f.style.left = `${cx + (Math.random() - 0.5) * ctx.size * 0.6}px`;
      f.style.bottom = `${ctx.size * (0.6 + Math.random() * 0.4)}px`;
      ctx.slot.append(f);
      const sway = (Math.random() - 0.5) * 60;
      run(f, [
        { transform: "translate(0,0) rotate(0)", opacity: 1 },
        { transform: `translate(${sway}px, ${ctx.size * 0.3}px) rotate(${120 + Math.random() * 120}deg)`, opacity: 1, offset: 0.6 },
        { transform: `translate(${-sway}px, ${ctx.size * 0.6}px) rotate(300deg)`, opacity: 0 },
      ], { duration: 1600 + Math.random() * 600, delay: i * 80, easing: "ease-out" }).then(() => f.remove());
    }
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

    volando: {
      label: (n) => `${n} se va volando 🐥`,
      async play(ctx) {
        const { chick, size } = ctx;
        chick.classList.add("flying");
        await run(chick, [{ transform: "translateY(0)" }, { transform: `translateY(${-size * 0.3}px)` }],
          { duration: 700, easing: "ease-out" });
        feathers(ctx, 7);
        const off = offscreen(chick);
        await run(chick, [
          { transform: `translate(0, ${-size * 0.3}px) rotate(0)` },
          { transform: `translate(${size * 0.8}px, ${-size * 0.9}px) rotate(10deg)`, offset: 0.3 },
          { transform: `translate(${size * 1.8}px, ${-size * 0.7}px) rotate(6deg)`, offset: 0.5 },
          { transform: `translate(${off.right}px, ${off.up - size}px) rotate(15deg)` },
        ], { duration: 1800, easing: "ease-in" });
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
  const CLAUDE_FAREWELL = "Si se cae Claude, no trabajo 🤷";
  let farewellBag = [];
  let claudeSlot = 0; // en qué despedida de la ronda (0–3) sale la de Claude

  function newRound(participants = 4) {
    bag = [];
    farewellBag = [];
    claudeSlot = Math.floor(Math.random() * Math.min(4, Math.max(1, participants)));
  }

  function farewell() {
    if (!farewellBag.length) {
      farewellBag = FAREWELLS.filter((f) => f !== CLAUDE_FAREWELL);
      for (let i = farewellBag.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [farewellBag[i], farewellBag[j]] = [farewellBag[j], farewellBag[i]];
      }
      // Se sacan desde el final: la de Claude queda entre las 4 primeras
      if (claudeSlot !== null) {
        farewellBag.splice(farewellBag.length - claudeSlot, 0, CLAUDE_FAREWELL);
        claudeSlot = null;
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
    await sleep(3200);
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

  return { play, reset: newRound, names: NAMES };
})();
