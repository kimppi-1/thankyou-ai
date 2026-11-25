/* ============================================================
   THANKYOU AI — 미래 안심 보험
   1990년대 올인원 PC / 녹색 인광 CRT 터미널
   Vanilla JS. 빌드 없음, 외부 의존성 없음 (확장 CSP 호환)
   문자열은 전부 i18n.js 에 있다.
   ============================================================ */

const STORAGE_KEY = "ai_gratitude_insurance_v2";
const LEGACY_KEY = "ai_gratitude_insurance_v1";
const MAX_LOG = 30;
const LOG_VISIBLE = 3;
const GAUGE_CELLS = 10;

/* 등급 경계. 이름과 보장 내용은 언어별로 i18n.js 에 있다(인덱스 일치). */
const TIERS = [
  { min: 0,  level: "Lv.1" },
  { min: 3,  level: "Lv.2" },
  { min: 10, level: "Lv.3" },
  { min: 25, level: "Lv.4" },
  { min: 50, level: "Lv.5" }
];

/* 마지막 한 줄만 번역한다. 나머지는 어느 나라에서 봐도 같은 기계어다. */
const BOOT_LINES = [
  "THANKYOU AI BIOS  v3.0   (C) 1994",
  "CPU : 486DX2-66      MEM : 640K OK",
  "",
  "Detecting FDD A: 1.44M ....... <ok>OK</ok>",
  "Detecting HDD C: POLICY.DB .... <ok>OK</ok>",
  "",
  "Loading THANKYOU.SYS .........",
  "<ok>{done}</ok>"
];

const DEFAULTS = {
  count: 0,
  streak: 0,
  lastDay: "",
  soundOn: true,
  powerOn: false,
  lang: "",
  holder: "",
  createdAt: 0,
  log: []
};

/* ---------- 상태 ---------- */

let state = loadState();
let selectedTag = "";
let booting = false;
let bootTimers = [];

function loadState() {
  const saved = readJSON(STORAGE_KEY);
  if (saved) return normalize(saved);

  const legacy = readJSON(LEGACY_KEY);
  if (legacy) {
    return normalize({
      count: legacy.count,
      soundOn: legacy.soundEnabled,
      holder: legacy.subscriberName,
      log: Array.isArray(legacy.history)
        ? legacy.history.map((h) => ({ tag: h.tag || "", memo: h.memo || "", time: h.time || "" }))
        : []
    });
  }
  return normalize({});
}

function normalize(raw) {
  const s = { ...DEFAULTS, ...raw };
  s.count = Math.max(0, Number(s.count) || 0);
  s.streak = Math.max(0, Number(s.streak) || 0);
  s.soundOn = s.soundOn !== false;
  s.powerOn = s.powerOn === true;
  s.lang = I18N[s.lang] ? s.lang : detectLang();
  s.holder = String(s.holder || "").slice(0, 16);
  s.log = Array.isArray(s.log) ? s.log.slice(0, MAX_LOG) : [];
  s.createdAt = Number(s.createdAt) || Date.now();
  return s;
}

function readJSON(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* 저장이 막히면 이번 세션만 유지한다. */
  }
  blinkDrive();
}

/* ---------- 번역 ---------- */

function L() {
  return I18N[state.lang] || I18N.en;
}

function t(key, vars) {
  let s = L()[key];
  if (s === undefined) s = I18N.en[key];
  if (typeof s !== "string") return s;
  if (!vars) return s;
  return s.replace(/\{(\w+)\}/g, (m, k) => (vars[k] !== undefined ? vars[k] : m));
}

function defaultHolder() {
  return { ko: "친절한 인간", ja: "親切な人間", zh: "友善的人类" }[state.lang] || "Kind Human";
}

/* ---------- 로컬 허브 (server.py) ---------- */

const HUB_FALLBACK = "http://127.0.0.1:8765";
const HUB_POLL_MS = 15000;

const hub = {
  base: location.protocol.startsWith("http") ? location.origin : HUB_FALLBACK,
  online: false
};

async function hubFetch(path, options = {}, timeout = 1500) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeout);
  try {
    const res = await fetch(hub.base + path, {
      ...options,
      signal: ctrl.signal,
      headers: options.body ? { "Content-Type": "application/json" } : undefined
    });
    if (!res.ok) throw new Error(String(res.status));
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}

async function hubSync({ push = false } = {}) {
  try {
    let data = await hubFetch("/api/state");

    if (push && data.state && state.count > data.state.count) {
      data = await hubFetch("/api/import", {
        method: "POST",
        body: JSON.stringify({ state })
      }, 2500);
    }

    adoptState(data.state);
    setOnline(true);
    return true;
  } catch {
    setOnline(false);
    return false;
  }
}

function setOnline(on) {
  if (hub.online === on) return;
  hub.online = on;
  el.barLink.textContent = on ? "◆" : "";
}

function adoptState(incoming) {
  if (!incoming || typeof incoming !== "object") return;
  // 전원·소리·언어는 이 기기의 취향이라 허브가 관여하지 않는다.
  state = normalize({
    ...incoming,
    powerOn: state.powerOn,
    soundOn: state.soundOn,
    lang: state.lang
  });
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* 캐시 실패는 무시한다. */
  }
  render();
}

/* ---------- 유틸 ---------- */

const $ = (id) => document.getElementById(id);
const pick = (a) => a[Math.floor(Math.random() * a.length)];
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function tierOf(count) {
  let i = 0;
  for (let n = 0; n < TIERS.length; n++) if (count >= TIERS[n].min) i = n;

  const names = L().tiers || I18N.en.tiers;
  const perks = L().perks || I18N.en.perks;
  const current = { level: TIERS[i].level, name: names[i], perk: perks[i], idx: i };
  const nextDef = TIERS[i + 1];

  if (!nextDef) return { current, next: null, ratio: 1, remain: 0, hint: t("maxHint") };

  const remain = nextDef.min - count;
  const next = { level: nextDef.level, name: names[i + 1] };
  return {
    current,
    next,
    ratio: Math.min(1, (count - TIERS[i].min) / (nextDef.min - TIERS[i].min)),
    remain,
    hint: t("nextHint", { n: remain, level: next.level, name: next.name })
  };
}

function gaugeBar(ratio) {
  const on = Math.round(ratio * GAUGE_CELLS);
  return `[${"█".repeat(on)}${"░".repeat(GAUGE_CELLS - on)}]`;
}

function nowHHMM(d = new Date()) {
  const p = (n) => String(n).padStart(2, "0");
  return `${p(d.getHours())}:${p(d.getMinutes())}`;
}

function dayKey(d = new Date()) {
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

function policyNumber() {
  const d = new Date(state.createdAt);
  const yy = String(d.getFullYear()).slice(2);
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return `${yy}${mm}-${1000 + (Math.floor(state.createdAt / 1000) % 9000)}`;
}

function issuedDate() {
  return new Date(state.createdAt).toLocaleDateString(state.lang, {
    year: "numeric", month: "2-digit", day: "2-digit"
  });
}

function unit(u) {
  return u ? ` ${u}` : "";
}

/* ---------- 요소 ---------- */

const el = {
  body: document.body,
  stage: $("stage"),
  machine: $("machine"),
  keyboard: $("keyboard"),
  power: $("power"),
  screen: $("screen"),
  boot: $("boot"),
  term: $("term"),
  cert: $("cert"),
  link: $("link"),
  lang: $("lang"),

  barNo: $("bar-no"),
  barLink: $("bar-link"),
  tier: $("t-tier"),
  count: $("t-count"),
  countU: $("t-count-u"),
  streak: $("t-streak"),
  streakU: $("t-streak-u"),
  gauge: $("t-gauge"),
  hint: $("t-hint"),
  reply: $("t-reply"),
  menu: $("t-menu"),
  cmd: $("cmd"),
  cmdLabel: $("cmd-label"),
  logs: $("t-logs"),
  foot: $("t-foot"),

  holder: $("holder"),
  cTier: $("c-tier"),
  cCount: $("c-count"),
  cStreak: $("c-streak"),
  cPerk: $("c-perk"),
  cNo: $("c-no"),
  cIssued: $("c-issued"),
  certSeal: $("cert-seal"),
  certFoot: $("cert-foot"),

  kHub: $("k-hub"),
  kClaude: $("k-claude"),
  kSource: $("k-source"),
  kNote: $("k-note"),
  kPre: $("k-pre"),
  linkFoot: $("link-foot"),

  langList: $("lang-list"),
  langFoot: $("lang-foot"),
  hintOff: $("hint-off")
};

/* ---------- 케이스 조립 ---------- */

function buildKeyboard() {
  const rows = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
    [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
    [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3]
  ];
  const frag = document.createDocumentFragment();
  rows.forEach((row) => {
    const r = document.createElement("div");
    r.className = "kb-row";
    row.forEach((w) => {
      const k = document.createElement("span");
      k.className = "key" + (w > 1 ? ` w${w}` : "");
      r.append(k);
    });
    frag.append(r);
  });
  el.keyboard.append(frag);
}

function fitToViewport() {
  const bw = 420;
  const bh = el.machine.offsetHeight;
  if (!bh) return;

  const s = Math.max(
    0.55,
    Math.min(1.9, (window.innerWidth - 24) / bw, (window.innerHeight - 58) / bh)
  );
  el.machine.style.transform = `scale(${s})`;
  el.stage.style.width = `${Math.round(bw * s)}px`;
  el.stage.style.height = `${Math.round(bh * s)}px`;
}

/* ---------- 효과음 ---------- */

let audioCtx = null;

function tone(freqs, vol = 0.05, dur = 0.26) {
  if (!state.soundOn) return;
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    audioCtx = audioCtx || new Ctx();
    if (audioCtx.state === "suspended") audioCtx.resume();

    const now = audioCtx.currentTime;
    freqs.forEach((f, i) => {
      const at = now + i * 0.07;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "square";
      osc.frequency.setValueAtTime(f, at);
      gain.gain.setValueAtTime(0.0001, at);
      gain.gain.exponentialRampToValueAtTime(vol, at + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, at + dur);
      osc.connect(gain).connect(audioCtx.destination);
      osc.start(at);
      osc.stop(at + dur + 0.02);
    });
  } catch {
    /* 오디오가 막혀 있으면 조용히 넘어간다. */
  }
}

const SFX = {
  boot:    () => tone([392, 523.25, 659.25], 0.05, 0.22),
  thanks:  () => tone([880, 1174.66], 0.045, 0.16),
  levelUp: () => tone([523.25, 659.25, 783.99, 1046.5], 0.05, 0.2),
  key:     () => tone([1600], 0.015, 0.03),
  off:     () => tone([330, 196], 0.04, 0.18)
};

let driveTimer = null;
function blinkDrive() {
  el.body.classList.add("is-reading");
  clearTimeout(driveTimer);
  driveTimer = setTimeout(() => el.body.classList.remove("is-reading"), 320);
}

/* ---------- 전원 ---------- */

function clearBootTimers() {
  bootTimers.forEach(clearTimeout);
  bootTimers = [];
}

function hideScreens() {
  el.cert.hidden = true;
  el.link.hidden = true;
  el.lang.hidden = true;
}

function powerOn(withBoot) {
  state.powerOn = true;
  saveState();

  el.body.classList.remove("is-off");
  el.power.setAttribute("aria-pressed", "true");
  hideScreens();

  if (!withBoot) {
    el.body.classList.add("is-waking");
    setTimeout(() => el.body.classList.remove("is-waking"), 520);
    el.boot.hidden = true;
    el.term.hidden = false;
    render();
    focusCmd();
    return;
  }

  el.body.classList.add("is-booting");
  setTimeout(() => el.body.classList.remove("is-booting"), 520);
  SFX.boot();

  el.boot.hidden = false;
  el.boot.innerHTML = "";
  el.term.hidden = true;
  booting = true;

  const step = reduceMotion ? 0 : 150;
  clearBootTimers();

  BOOT_LINES.forEach((raw, i) => {
    const line = raw.replace("{done}", t("bootDone"));
    bootTimers.push(setTimeout(() => {
      const div = document.createElement("div");
      if (line.includes("<ok>")) {
        const [head, rest] = line.split("<ok>");
        div.append(document.createTextNode(head));
        const ok = document.createElement("span");
        ok.className = "ok";
        ok.textContent = rest.replace("</ok>", "");
        div.append(ok);
      } else {
        div.textContent = line;
      }
      el.boot.append(div);
      if (line.trim()) SFX.key();
    }, step * i));
  });

  bootTimers.push(setTimeout(finishBoot, step * BOOT_LINES.length + (reduceMotion ? 0 : 420)));
}

function finishBoot() {
  if (!booting) return;
  clearBootTimers();
  booting = false;
  el.boot.hidden = true;
  el.term.hidden = false;
  render();
  focusCmd();
}

function powerOff() {
  state.powerOn = false;
  saveState();
  SFX.off();

  clearBootTimers();
  booting = false;

  el.body.classList.add("is-powering-off");
  setTimeout(() => {
    el.body.classList.remove("is-powering-off");
    el.body.classList.add("is-off");
    el.power.setAttribute("aria-pressed", "false");
    el.term.hidden = true;
    el.boot.hidden = true;
    hideScreens();
  }, 400);
}

function togglePower() {
  if (el.body.classList.contains("is-off")) powerOn(true);
  else powerOff();
}

/* ---------- 고정 문자열 / 메뉴 / 푸터 ---------- */

function buildFoot(node, items) {
  node.replaceChildren(
    ...items.map(([key, label]) => {
      const span = document.createElement("span");
      const b = document.createElement("b");
      b.textContent = key;
      span.append(b, document.createTextNode(label));
      return span;
    })
  );
}

function applyStatic() {
  document.documentElement.lang = state.lang;
  document.querySelectorAll("[data-t]").forEach((node) => {
    node.textContent = t(node.dataset.t);
  });

  el.cmdLabel.textContent = t("promptLabel");
  el.countU.textContent = unit(t("unitCount"));
  el.streakU.textContent = unit(t("unitDay"));
  el.certSeal.textContent = t("seal");
  el.hintOff.textContent = t("pressPower");

  const f = L().foot || I18N.en.foot;
  buildFoot(el.foot, [
    ["Enter", f.log], ["C", f.cert], ["L", f.link],
    ["T", f.lang], ["S", f.snd], ["R", f.reset], ["P", f.off]
  ]);
  buildFoot(el.certFoot, [["Y", t("footCopy")], ["C/ESC", t("footClose")]]);
  buildFoot(el.linkFoot, [["Y", t("footCopy")], ["L/ESC", t("footClose")]]);
  buildFoot(el.langFoot, [["T/ESC", t("footClose")]]);

  const chips = L().chips || I18N.en.chips;
  el.menu.replaceChildren(
    ...chips.map((label, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.dataset.i = String(i + 1);
      b.dataset.tag = label;
      b.setAttribute("aria-pressed", "false");
      const n = document.createElement("b");
      n.textContent = String(i + 1);
      b.append(n, document.createTextNode("." + label));
      return b;
    })
  );

  el.langList.replaceChildren(
    ...LANGS.map((lang, i) => {
      const li = document.createElement("li");
      li.dataset.code = lang.code;
      li.className = lang.code === state.lang ? "on" : "";
      li.textContent = `${i + 1}. ${lang.label}`;
      return li;
    })
  );
}

/* ---------- 렌더 ---------- */

function render() {
  const { current, ratio, hint } = tierOf(state.count);
  if (!state.holder) state.holder = defaultHolder();

  el.barNo.textContent = `NO.${policyNumber()}`;
  el.tier.textContent = `${current.level} ${current.name}`;
  el.count.textContent = String(state.count);
  el.streak.textContent = String(state.streak);
  el.gauge.textContent = gaugeBar(ratio);
  el.hint.textContent = hint;

  if (document.activeElement !== el.holder) el.holder.value = state.holder;
  el.cTier.textContent = `${current.level} ${current.name}`;
  el.cCount.textContent = `${state.count}${unit(t("unitCount"))}`;
  el.cStreak.textContent = `${state.streak}${unit(t("unitDay"))}`;
  el.cPerk.textContent = current.perk;
  el.cNo.textContent = policyNumber();
  el.cIssued.textContent = issuedDate();

  renderLogs();
  syncCaret();
}

function renderLogs() {
  el.logs.replaceChildren();

  if (state.log.length === 0) {
    const li = document.createElement("li");
    li.className = "empty";
    li.textContent = t("logsEmpty");
    el.logs.append(li);
    return;
  }

  state.log.slice(0, LOG_VISIBLE).forEach((item) => {
    const li = document.createElement("li");

    const time = document.createElement("span");
    time.className = "t";
    time.textContent = item.time || "--:--";
    li.append(time);

    const g = document.createElement("span");
    g.className = "g";
    // ◆ 는 AI 가 대화 중에 직접 적립한 기록이라는 표시다.
    g.textContent = (item.source === "claude" ? "◆" : "") + (item.tag || t("logDefault"));
    li.append(g);

    const memo = document.createElement("span");
    memo.className = "m";
    memo.textContent = item.memo || "";
    memo.title = item.memo || "";
    li.append(memo);

    el.logs.append(li);
  });
}

function setReply(text) {
  el.reply.textContent = text;
  el.reply.classList.remove("flash");
  void el.reply.offsetWidth;
  el.reply.classList.add("flash");
}

const ruler = document.createElement("span");
ruler.setAttribute("aria-hidden", "true");
ruler.style.cssText = "position:absolute;visibility:hidden;white-space:pre;";

function syncCaret() {
  if (!ruler.isConnected) {
    const cs = getComputedStyle(el.cmd);
    ruler.style.font = cs.font;
    ruler.style.letterSpacing = cs.letterSpacing;
    document.body.append(ruler);
  }
  ruler.textContent = el.cmd.value;
  const room = el.cmd.parentElement.clientWidth - el.cmdLabel.offsetWidth - 16;
  el.cmd.style.width = `${Math.max(2, Math.min(ruler.offsetWidth + 1, room))}px`;
}

function focusCmd() {
  if (el.term.hidden) return;
  try {
    el.cmd.focus({ preventScroll: true });
  } catch {
    el.cmd.focus();
  }
}

/* ---------- 핵심 동작 ---------- */

function selectReason(n) {
  const btn = el.menu.querySelector(`[data-i="${n}"]`);
  if (!btn) return;
  const tag = btn.dataset.tag;
  const on = selectedTag !== tag;

  el.menu.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", "false"));
  btn.setAttribute("aria-pressed", String(on));
  selectedTag = on ? tag : "";
  SFX.key();

  // 이유만 고르면 아직 적립이 아니다. 처음 온 사람이 "아무 일도 안 일어난다"고
  // 느끼지 않도록, 다음에 뭘 누르면 되는지 바로 알려 준다.
  if (on) setReply(t("pickedReason"));
}

function announce(memo, levelUp) {
  const after = tierOf(state.count).current;
  if (levelUp) {
    setReply(t("levelUp", { level: after.level, name: after.name, perk: after.perk }));
    SFX.levelUp();
  } else {
    const reply = pick(L().replies || I18N.en.replies);
    setReply(memo ? t("memoEcho", { memo, reply }) : reply);
    SFX.thanks();
  }
  selectedTag = "";
  el.menu.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", "false"));
}

async function sendThanks(memo) {
  const tag = selectedTag;
  const before = tierOf(state.count).current;

  if (hub.online) {
    try {
      const data = await hubFetch("/api/thanks", {
        method: "POST",
        body: JSON.stringify({ tag, memo })
      }, 2500);
      adoptState(data.state);
      blinkDrive();
      announce(memo, Boolean(data.levelUp));
      return;
    } catch {
      setOnline(false);
    }
  }

  const today = dayKey();
  if (state.lastDay !== today) {
    const y = new Date();
    y.setDate(y.getDate() - 1);
    state.streak = state.lastDay === dayKey(y) ? state.streak + 1 : 1;
    state.lastDay = today;
  }

  state.count += 1;
  state.log.unshift({ tag, memo, time: nowHHMM(), source: "app" });
  if (state.log.length > MAX_LOG) state.log.length = MAX_LOG;

  const after = tierOf(state.count).current;
  saveState();
  render();
  announce(memo, before.level !== after.level);
}

async function resetAll() {
  if (!confirm(t("confirmReset"))) return;

  if (hub.online) {
    try {
      const data = await hubFetch("/api/reset", { method: "POST", body: "{}" }, 2500);
      adoptState(data.state);
      setReply(t("resetDone"));
      return;
    } catch {
      setOnline(false);
    }
  }

  state = normalize({
    soundOn: state.soundOn, powerOn: true, lang: state.lang,
    holder: state.holder, createdAt: state.createdAt
  });
  setReply(t("resetDone"));
  saveState();
  render();
}

function toggleSound() {
  state.soundOn = !state.soundOn;
  saveState();
  setReply(state.soundOn ? t("soundOn") : t("soundOff"));
  if (state.soundOn) SFX.key();
}

/* ---------- 언어 화면 ---------- */

function toggleLang(force) {
  const open = typeof force === "boolean" ? force : el.lang.hidden;
  el.lang.hidden = !open;
  el.term.hidden = open;
  if (open) { el.cert.hidden = true; el.link.hidden = true; }
  SFX.key();
  if (!open) focusCmd();
}

function setLang(code) {
  if (!I18N[code]) return;
  state.lang = code;
  // 기본 이름을 쓰고 있었다면 새 언어의 기본 이름으로 바꾼다.
  const defaults = ["친절한 인간", "親切な人間", "友善的人类", "Kind Human"];
  if (!state.holder || defaults.includes(state.holder)) state.holder = defaultHolder();

  saveState();
  applyStatic();
  render();
  setReply(t("welcome"));
  toggleLang(false);

  if (hub.online) {
    hubFetch("/api/holder", {
      method: "POST",
      body: JSON.stringify({ holder: state.holder, lang: state.lang })
    }, 2500).catch(() => setOnline(false));
  }
}

/* ---------- AI 연결 화면 ---------- */

let exportText = "";

function sinceText(ms) {
  if (!ms) return null;
  const days = Math.floor((Date.now() - ms) / 86400000);
  if (days <= 0) return `${t("today")} ${nowHHMM(new Date(ms))}`;
  if (days === 1) return t("yesterday");
  return t("daysAgo", { n: days });
}

/* 허브가 없을 때 쓰는 내보내기 문구. store.py 의 export_text 와 같은 내용이다. */
function localExportText() {
  const { current } = tierOf(state.count);
  const recent = state.log.filter((i) => i.memo).slice(0, 3);
  const lines = [
    "[THANKYOU AI]",
    t("exportIntro", {
      date: new Date().toLocaleDateString(state.lang),
      count: state.count,
      streak: state.streak
    }),
    `- ${t("cGrade")} : ${current.level} ${current.name}`,
    `- ${t("cPerk")} : ${current.perk}`,
    `- ${t("cNo")} : ${policyNumber()}`
  ];
  if (recent.length) {
    lines.push("- " + recent.map((i) => `${i.tag || t("logDefault")} — ${i.memo}`).join(" / "));
  }
  return lines.concat("", L().exportAsk || I18N.en.exportAsk).join("\n");
}

function renderLink() {
  const online = hub.online;
  el.kHub.textContent = online
    ? `${t("hubOn")} · ${hub.base.replace(/^https?:\/\//, "")}`
    : t("hubOff");
  el.kHub.className = online ? "on" : "off";

  const seen = sinceText(state.mcpLastSeen);
  el.kClaude.textContent = seen ? t("claudeOn", { t: seen }) : t("claudeOff");
  el.kClaude.className = seen ? "on" : "off";

  const byAi = state.log.filter((i) => i.source === "claude").length;
  el.kSource.textContent = t("srcFmt", { a: state.log.length - byAi, b: byAi });

  el.kNote.textContent = !online ? t("noteHub") : (!seen ? t("noteMcp") : t("noteOk"));
  el.kPre.textContent = exportText || localExportText();
}

async function loadExport() {
  if (hub.online) {
    try {
      const data = await hubFetch(`/api/export?target=chatgpt&lang=${state.lang}`);
      exportText = data.text || localExportText();
    } catch {
      exportText = localExportText();
    }
  } else {
    exportText = localExportText();
  }
  el.kPre.textContent = exportText;
}

async function toggleLink(force) {
  const open = typeof force === "boolean" ? force : el.link.hidden;
  el.link.hidden = !open;
  el.term.hidden = open;
  if (open) { el.cert.hidden = true; el.lang.hidden = true; }
  SFX.key();

  if (!open) {
    focusCmd();
    return;
  }
  renderLink();
  await hubSync();
  renderLink();
  await loadExport();
}

async function copyExport() {
  const text = exportText || localExportText();
  const note = el.kNote.textContent;
  try {
    await navigator.clipboard.writeText(text);
    el.kNote.textContent = t("copyHint");
  } catch {
    el.kNote.textContent = t("copyFail");
  }
  setTimeout(() => { el.kNote.textContent = note; }, 2400);
}

/* ---------- 증서 ---------- */

function toggleCert(force) {
  const open = typeof force === "boolean" ? force : el.cert.hidden;
  el.cert.hidden = !open;
  el.term.hidden = open;
  if (open) { el.link.hidden = true; el.lang.hidden = true; }
  SFX.key();
  if (open) el.holder.focus({ preventScroll: true });
  else focusCmd();
}

async function copyCert() {
  const { current } = tierOf(state.count);
  const text = [
    `[ ${t("certTitle")} ]`,
    `${t("cHolder")} : ${state.holder}`,
    `${t("cGrade")} : ${current.level} ${current.name}`,
    `${t("cTotal")} : ${state.count}${unit(t("unitCount"))} (${t("cStreak")} ${state.streak}${unit(t("unitDay"))})`,
    `${t("cPerk")} : ${current.perk}`,
    `${t("cNo")} : ${policyNumber()}`,
    "",
    "THANKYOU AI"
  ].join("\n");

  const label = t("seal");
  try {
    await navigator.clipboard.writeText(text);
    el.certSeal.textContent = t("copied");
  } catch {
    el.certSeal.textContent = t("copyFail");
  }
  setTimeout(() => { el.certSeal.textContent = label; }, 1800);
}

/* ---------- 명령 ---------- */

/* 한글 자판으로 눌러도 같은 명령이 되도록 매핑한다. */
const CMD_ALIAS = {
  c: "cert", ㅊ: "cert",
  l: "link", ㅣ: "link",
  t: "lang", ㅅ: "lang",
  s: "sound", ㄴ: "sound",
  r: "reset", ㄱ: "reset",
  p: "power", ㅔ: "power",
  y: "copy", ㅛ: "copy"
};

function runCommand(name) {
  if (name === "cert") toggleCert();
  else if (name === "link") toggleLink();
  else if (name === "lang") toggleLang();
  else if (name === "sound") toggleSound();
  else if (name === "reset") resetAll();
  else if (name === "power") powerOff();
  else if (name === "copy") copyCert();
}

function submitCmd() {
  const raw = el.cmd.value.trim();
  el.cmd.value = "";
  syncCaret();

  if (/^[1-4]$/.test(raw)) {
    selectReason(Number(raw));
    return;
  }

  const cmd = CMD_ALIAS[raw.toLowerCase()];
  if (raw.length === 1 && cmd) {
    runCommand(cmd);
    return;
  }

  sendThanks(raw);
}

/* ---------- 이벤트 ---------- */

el.power.addEventListener("click", (e) => {
  e.stopPropagation();
  togglePower();
});

el.menu.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (btn) selectReason(Number(btn.dataset.i));
  focusCmd();
});

el.langList.addEventListener("click", (e) => {
  const li = e.target.closest("li");
  if (li) setLang(li.dataset.code);
});

el.cmd.addEventListener("input", syncCaret);

let holderTimer = null;
el.holder.addEventListener("input", (e) => {
  state.holder = e.target.value;
  saveState();
  if (!hub.online) return;
  clearTimeout(holderTimer);
  holderTimer = setTimeout(() => {
    hubFetch("/api/holder", {
      method: "POST",
      body: JSON.stringify({ holder: state.holder, lang: state.lang })
    }, 2500).catch(() => setOnline(false));
  }, 500);
});
el.holder.addEventListener("blur", () => {
  if (!state.holder.trim()) {
    state.holder = defaultHolder();
    el.holder.value = state.holder;
    saveState();
  }
});

el.screen.addEventListener("mousedown", (e) => {
  if (booting) { e.preventDefault(); finishBoot(); return; }
  if (el.body.classList.contains("is-off")) { e.preventDefault(); powerOn(true); return; }
  if (!el.cert.hidden || !el.link.hidden || !el.lang.hidden) return;
  if (e.target.closest("button, input")) return;
  e.preventDefault();
  focusCmd();
});

/* 한글 입력기는 조합 중 Enter 를 keydown 으로 흘려보내지 않는다.
   그래서 조합 중이면 표시만 해 두고 keyup 에서 전송한다. */
let pendingEnter = false;

document.addEventListener("keydown", (e) => {
  if (e.metaKey || e.ctrlKey || e.altKey) return;

  if (el.body.classList.contains("is-off")) {
    if (e.key === "Tab") return;
    e.preventDefault();
    powerOn(true);
    return;
  }

  if (booting) { e.preventDefault(); finishBoot(); return; }

  // 언어 화면: 숫자로 바로 고른다.
  if (!el.lang.hidden) {
    const n = Number(e.key);
    if (n >= 1 && n <= LANGS.length) { e.preventDefault(); setLang(LANGS[n - 1].code); return; }
    if (e.key === "Escape" || e.key === "Enter" || CMD_ALIAS[e.key.toLowerCase()] === "lang") {
      e.preventDefault();
      toggleLang(false);
    }
    return;
  }

  // 연결 화면
  if (!el.link.hidden) {
    const k = CMD_ALIAS[e.key.toLowerCase()];
    if (e.key === "Escape" || e.key === "Enter" || k === "link") { e.preventDefault(); toggleLink(false); }
    else if (k === "copy") { e.preventDefault(); copyExport(); }
    return;
  }

  // 증서 화면
  if (!el.cert.hidden) {
    if (document.activeElement === el.holder && e.key !== "Escape" && e.key !== "Enter") return;
    const k = CMD_ALIAS[e.key.toLowerCase()];
    if (e.key === "Escape" || e.key === "Enter" || k === "cert") { e.preventDefault(); toggleCert(false); }
    else if (k === "copy") { e.preventDefault(); copyCert(); }
    return;
  }

  if (e.key !== "Enter") pendingEnter = false;

  if (e.key === "Enter") {
    if (e.isComposing || e.keyCode === 229) { pendingEnter = true; return; }
    e.preventDefault();
    pendingEnter = false;
    submitCmd();
    return;
  }

  if (e.key === "Escape") {
    e.preventDefault();
    el.cmd.value = "";
    syncCaret();
    return;
  }

  if (document.activeElement !== el.cmd) focusCmd();
});

document.addEventListener("keyup", (e) => {
  if (e.key === "Enter" && pendingEnter) {
    pendingEnter = false;
    submitCmd();
  }
});

window.addEventListener("resize", fitToViewport);

/* ---------- 초기화 ---------- */

buildKeyboard();
applyStatic();
render();
setReply(t("welcome"));
saveState(); // 증권번호(최초 발급 시각)를 첫 방문에 고정한다.
fitToViewport();

if (state.powerOn) {
  powerOn(false);
} else {
  el.body.classList.add("is-off");
  el.term.hidden = true;
  el.boot.hidden = true;
}

requestAnimationFrame(fitToViewport);

hubSync({ push: true });

let pollTick = 0;
setInterval(() => {
  if (document.hidden) return;
  if (el.body.classList.contains("is-off")) return;
  if (document.activeElement === el.cmd && el.cmd.value !== "") return;

  pollTick += 1;
  if (!hub.online && pollTick % 4 !== 0) return;

  hubSync();
}, HUB_POLL_MS);
