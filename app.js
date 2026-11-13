(() => {
  "use strict";

  // ---------- Dibujo del pollito (SVG) ----------
  // viewBox 0 0 140 175. El ala izquierda es la que se levanta.
  const ACCESSORIES = {
    // Guante morado en el ala que se levanta
    guante: {
      wing: `
        <g class="glove">
          <rect x="13" y="110" width="26" height="11" rx="4" fill="#f2c94c" stroke="#b8860b" stroke-width="1.5"/>
          <path d="M9 119 C 6 136, 14 146, 26 146 C 40 146, 46 136, 43 119 Z" fill="#7b3fc4" stroke="#4e2385" stroke-width="2"/>
          <path d="M9 124 C 2 124, 2 134, 10 134" fill="#7b3fc4" stroke="#4e2385" stroke-width="2"/>
          <circle cx="26" cy="130" r="4" fill="#ff5d73"/>
          <circle cx="17" cy="126" r="2.4" fill="#4fd1c5"/>
          <circle cx="35" cy="126" r="2.4" fill="#f2c94c"/>
          <circle cx="21" cy="137" r="2" fill="#7bd651"/>
          <circle cx="31" cy="137" r="2" fill="#5aa9ff"/>
        </g>`,
    },
    // Casco azul
    casco: {
      top: `
        <path d="M36 50 C 36 16, 104 16, 104 50 Z" fill="#4f7cc4" stroke="#2f4f86" stroke-width="2"/>
        <rect x="32" y="46" width="76" height="8" rx="4" fill="#2f4f86"/>
        <path d="M66 20 L74 20 L74 47 L66 47 Z" fill="#f4f4f4" opacity=".85"/>
        <ellipse cx="52" cy="30" rx="6" ry="3" fill="#fff" opacity=".35" transform="rotate(-30 52 30)"/>`,
    },
    // Cabello en punta
    cabello: {
      top: `
        <path d="M50 34 L50 6 L62 22 L70 -6 L78 22 L92 4 L90 34 Q70 24 50 34 Z" fill="#6b3a1e" stroke="#4a2611" stroke-width="2" stroke-linejoin="round"/>`,
    },
    // Zapatillas rojas
    zapatos: {
      feet: `
        <g stroke="#7d1c1c" stroke-width="1.5">
          <path d="M48 160 Q48 152 58 152 Q66 152 68 160 Z" fill="#e53e3e"/>
          <path d="M72 160 Q74 152 82 152 Q92 152 92 160 Z" fill="#e53e3e"/>
        </g>
        <rect x="47" y="159" width="22" height="4" rx="2" fill="#fff"/>
        <rect x="71" y="159" width="22" height="4" rx="2" fill="#fff"/>`,
      hideFeet: true,
    },
    // Tatuaje de corazón en la panza
    tatuaje: {
      body: `
        <g transform="translate(70 118) scale(1.6)">
          <path d="M0 6 C -10 -2, -9 -11, -3 -11 C 0 -11, 0 -8, 0 -7 C 0 -8, 0 -11, 3 -11 C 9 -11, 10 -2, 0 6 Z" fill="#d6455d" stroke="#8e1f33" stroke-width="1"/>
          <path d="M-12 -6 L12 4" stroke="#2c3e7a" stroke-width="1.6" stroke-linecap="round"/>
          <path d="M12 4 L8 1.5 M12 4 L8.5 6" stroke="#2c3e7a" stroke-width="1.4" stroke-linecap="round"/>
        </g>`,
    },
    // Gafas de sol
    gafas: {
      face: `
        <g>
          <rect x="45" y="56" width="20" height="13" rx="5" fill="#1d1d2b"/>
          <rect x="75" y="56" width="20" height="13" rx="5" fill="#1d1d2b"/>
          <path d="M65 61 Q70 58 75 61" stroke="#1d1d2b" stroke-width="3" fill="none"/>
          <path d="M48 59 L54 59" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".6"/>
          <path d="M78 59 L84 59" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".6"/>
        </g>`,
      hideEyes: true,
    },
    // Moño
    "moño": {
      body: `
        <g transform="translate(70 90)">
          <path d="M0 0 L-14 -8 L-14 8 Z" fill="#2bb673" stroke="#16774a" stroke-width="1.5" stroke-linejoin="round"/>
          <path d="M0 0 L14 -8 L14 8 Z" fill="#2bb673" stroke="#16774a" stroke-width="1.5" stroke-linejoin="round"/>
          <circle r="4" fill="#16774a"/>
        </g>`,
    },
  };
  const VARIANTS = Object.keys(ACCESSORIES); // 7 variantes

  let gradId = 0;
  function chickSVG(variant) {
    const acc = ACCESSORIES[variant] || {};
    const id = `g${gradId++}`;
    const eyes = acc.hideEyes ? "" : `
      <ellipse cx="57" cy="63" rx="4.5" ry="5.5" fill="#1b120c"/>
      <ellipse cx="83" cy="63" rx="4.5" ry="5.5" fill="#1b120c"/>
      <circle cx="58.5" cy="61" r="1.6" fill="#fff"/>
      <circle cx="84.5" cy="61" r="1.6" fill="#fff"/>`;
    const feet = acc.hideFeet ? "" : `
      <path d="M52 160 L58 156 L64 160 M76 160 L82 156 L88 160" stroke="#d9772b" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;

    return `
<svg viewBox="0 0 140 175" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <radialGradient id="${id}" cx="38%" cy="32%" r="75%">
      <stop offset="0%" stop-color="#ffd98a"/>
      <stop offset="55%" stop-color="#f6ae4a"/>
      <stop offset="100%" stop-color="#d9822b"/>
    </radialGradient>
  </defs>
  <!-- patitas -->
  <path d="M58 140 L58 157 M82 140 L82 157" stroke="#d9772b" stroke-width="3" stroke-linecap="round"/>
  ${feet}
  ${acc.feet || ""}
  <!-- ala derecha -->
  <g class="wing-right">
    <ellipse cx="112" cy="106" rx="11" ry="23" fill="#e8962f" transform="rotate(-12 112 106)"/>
  </g>
  <!-- cuerpo -->
  <path d="M70 24 C 98 24, 112 58, 116 92 C 120 128, 100 152, 70 152 C 40 152, 20 128, 24 92 C 28 58, 42 24, 70 24 Z" fill="url(#${id})"/>
  ${acc.body || ""}
  <!-- cachetes -->
  <ellipse cx="48" cy="74" rx="6" ry="3.5" fill="#ff7b7b" opacity=".35"/>
  <ellipse cx="92" cy="74" rx="6" ry="3.5" fill="#ff7b7b" opacity=".35"/>
  <!-- ojos y cejas -->
  ${eyes}
  <path d="M49 52 L63 56 M91 52 L77 56" stroke="#3b2414" stroke-width="3" stroke-linecap="round"/>
  ${acc.face || ""}
  <!-- pico -->
  <path d="M65 71 L75 71 L70 78 Z" fill="#e0702a" stroke="#b5521a" stroke-width="1" stroke-linejoin="round"/>
  ${acc.top || ""}
  <!-- ala izquierda (se levanta) -->
  <g class="wing-left">
    <ellipse cx="28" cy="108" rx="11" ry="23" fill="#e8962f" transform="rotate(12 28 108)"/>
    ${acc.wing || ""}
  </g>
</svg>`;
  }

  // ---------- Salidas ----------
  const Exits = window.ChickExits;

  // ---------- Utilidades ----------
  const $ = (s) => document.querySelector(s);
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const shuffle = (arr) => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  const parseNames = (text) =>
    text.split(/[\n,]+/).map((s) => s.trim()).filter(Boolean);

  const STORAGE_KEY = "pollitos-daily-names";
  const load = () => { try { return localStorage.getItem(STORAGE_KEY) || ""; } catch { return ""; } };
  const save = (v) => { try { localStorage.setItem(STORAGE_KEY, v); } catch { /* sin storage */ } };

  // ---------- Estado ----------
  const els = {
    setup: $("#setup"), board: $("#board"), names: $("#names"), count: $("#count"),
    start: $("#start"), row: $("#row"), hint: $("#hint"), remaining: $("#remaining"),
    spoken: $("#spoken"), next: $("#next"), restart: $("#restart"),
    done: $("#done"), again: $("#again"), edit: $("#edit"),
  };
  let names = [];
  let selected = null;   // { slot, button, name }
  let left = 0;
  let turn = 0;

  // ---------- Configuración ----------
  $("#setupChick").innerHTML = chickSVG("guante");

  function updateCount() {
    const n = parseNames(els.names.value).length;
    els.count.textContent = `${n} participante${n === 1 ? "" : "s"}`;
    els.start.disabled = n === 0;
  }
  els.names.value = load();
  updateCount();
  els.names.addEventListener("input", () => { updateCount(); save(els.names.value); });
  els.names.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey) && !els.start.disabled) startRound();
  });
  els.start.addEventListener("click", () => startRound());

  function startRound() {
    names = parseNames(els.names.value);
    if (!names.length) return;
    els.setup.classList.add("hidden");
    els.board.classList.remove("hidden");
    els.done.classList.add("hidden");
    buildBoard();
  }

  // ---------- Tablero ----------
  function buildBoard() {
    const order = shuffle(names);
    // Variantes: se reparten al azar y se repiten si hay más de 7 participantes
    let pool = [];
    const variants = order.map(() => {
      if (!pool.length) pool = shuffle(VARIANTS);
      return pool.pop();
    });

    els.row.innerHTML = "";
    els.spoken.innerHTML = "";
    selected = null;
    turn = 0;
    left = order.length;
    Exits.reset();

    order.forEach((name, i) => {
      const slot = document.createElement("div");
      slot.className = "chick-slot";

      const btn = document.createElement("button");
      btn.className = "chick";
      btn.type = "button";
      btn.setAttribute("aria-label", `Pollito número ${i + 1}`);
      btn.style.setProperty("--delay", `${(-Math.random() * 2.4).toFixed(2)}s`);

      const tag = document.createElement("div");
      tag.className = "tag";
      tag.textContent = i + 1;
      tag.style.setProperty("--tilt", `${(Math.random() * 10 - 5).toFixed(1)}deg`);

      const body = document.createElement("div");
      body.className = "chick-body";
      body.innerHTML = chickSVG(variants[i]);

      btn.append(tag, body);
      btn.addEventListener("click", () => select(slot, btn, tag, name));
      slot.append(btn);
      els.row.append(slot);
    });

    updateStatus();
  }

  function select(slot, btn, tag, name) {
    if (selected) return;
    selected = { slot, btn, name };
    btn.classList.add("selected");
    tag.textContent = name;
    tag.title = name;
    btn.setAttribute("aria-label", `Le toca a ${name}`);
    els.row.querySelectorAll(".chick").forEach((b) => (b.disabled = true));
    els.hint.textContent = `¡Te toca, ${name}!`;
    els.next.classList.remove("hidden");
    els.next.focus({ preventScroll: true });
  }

  async function next() {
    if (!selected) return;
    const { slot, name } = selected;
    selected = null;
    els.next.classList.add("hidden");

    turn++;
    left--;
    const li = document.createElement("li");
    li.innerHTML = `<span>${turn}.</span>`;
    li.append(document.createTextNode(name));
    els.spoken.append(li);
    els.remaining.textContent = left === 0
      ? "Ya no quedan pollitos"
      : `Quedan ${left} pollito${left === 1 ? "" : "s"}`;

    await Exits.play(slot, name, (text) => (els.hint.textContent = text));

    slot.classList.add("gone");
    await sleep(500);
    slot.remove();
    if (left === 0) {
      els.done.classList.remove("hidden");
      els.again.focus({ preventScroll: true });
    } else {
      els.row.querySelectorAll(".chick").forEach((b) => (b.disabled = false));
    }
    updateStatus();
  }

  function updateStatus() {
    if (left > 0 && !selected) {
      els.hint.textContent = turn === 0
        ? "Toca un pollito para ver a quién le toca"
        : "¿Quién sigue? Toca otro pollito";
    }
    els.remaining.textContent = left === 0
      ? "Ya no quedan pollitos"
      : `Quedan ${left} pollito${left === 1 ? "" : "s"}`;
  }

  els.next.addEventListener("click", next);
  document.addEventListener("keydown", (e) => {
    if (els.board.classList.contains("hidden")) return;
    if ((e.key === "ArrowRight" || e.key === "n") && selected) { e.preventDefault(); next(); }
  });

  function backToSetup() {
    els.board.classList.add("hidden");
    els.done.classList.add("hidden");
    els.setup.classList.remove("hidden");
    els.names.focus();
  }
  els.restart.addEventListener("click", backToSetup);
  els.edit.addEventListener("click", backToSetup);
  els.again.addEventListener("click", () => { els.done.classList.add("hidden"); buildBoard(); });
})();
