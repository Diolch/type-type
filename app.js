'use strict';

const LEVELS = {
  beginner: {
    key: 'beginner',
    shortName: '入门',
    name: '入门 Beginner',
    goal: '5-10 WPM',
    goalMin: 5,
    tagline: 'home row - 5-10 WPM',
    desc: 'Learn the keyboard zone by zone - home row, top row, bottom row, then the whole keyboard. Passages stay under 50 words. Goal: 5-10 WPM.',
    passages: [
      { title: 'Zone 1 - Home row', text: 'A sad lad has a flash; a glad lass has a glass.' },
      { title: 'Zone 2 - Top row', text: 'Try to write two quiet, pretty words up here.' },
      { title: 'Zone 3 - Bottom row', text: 'A man can move a van by a cab.' },
      { title: 'Zone 4 - Whole keyboard', text: 'We can add a few quick words of every kind.' }
    ]
  },
  basic: {
    key: 'basic',
    shortName: '基础',
    name: '基础 Basic',
    goal: '10-20 WPM',
    goalMin: 10,
    tagline: 'cross-region - 10-20 WPM',
    desc: 'Full-keyboard passages around 100-200 characters that push your fingers across rows and regions, with common punctuation. Goal: 10-20 WPM.',
    passages: [
      { title: 'Cross-row warm-up', text: 'Quick brown foxes jump over lazy dogs, and brave zebras run past quiet rivers while the wind moves across open fields.' },
      { title: 'Everyday sentence', text: "Doesn't typing every day make your fingers strong and your mind sharp? Mix in numbers and symbols when you feel ready to grow." },
      { title: 'Pangram sprint', text: 'Pack my box with five dozen large jugs of liquid wax, then fix the quick lazy vexed wizard with a single jump.' },
      { title: 'Zebra and fox', text: 'We quickly gave the bronze jugs to the amazed fox, who danced and waved before moving on to the next field.' }
    ]
  },
  advanced: {
    key: 'advanced',
    shortName: '进阶',
    name: '进阶 Advanced',
    goal: '20-35 WPM',
    goalMin: 20,
    tagline: 'blind touch - 20-35 WPM',
    desc: 'Long passages over 200 characters with uncommon vocabulary and heavier punctuation - practise blind touch typing and accuracy. Goal: 20-35 WPM.',
    passages: [
      { title: 'Uncommon vocabulary', text: 'The ephemeral quixotic reverie of the bibliophile was a juxtaposition of serendipity and meticulous cacophony; yet a quintessential verisimilitude remained - as the archivist observed - throughout the labyrinthine narrative: a testament to the perseverance of assiduous scholarship.' },
      { title: 'Precision passage', text: 'A meticulous zoologist cataloged the idiosyncratic behavior of the ubiquitous yet enigmatic cephalopods, while a sagacious archivist deciphered archaic manuscripts with unyielding alacrity and profound perspicacity; undeterred, she queried: "What does this inscription reveal?" - a question that echoed through the labyrinthine archive.' },
      { title: 'Long-form focus', text: 'Notwithstanding the ostensibly inexorable vicissitudes of the quotidian, the indefatigable polymath persevered with equanimity - transmuting obfuscation into lucidity (through assiduous scholarship) - and never yielded to complacency or despair; such is the hallmark of a disciplined mind.' }
    ]
  },
  challenge: {
    key: 'challenge',
    shortName: '挑战',
    name: '挑战 Challenge',
    goal: '35+ WPM',
    goalMin: 35,
    tagline: 'timed - 35+ WPM',
    desc: 'Timed display with numbers and symbols: set a target speed and a length, and the passage stays on screen only for the time that speed allows. Keep pace or the text runs out. Goal: 35+ WPM.',
    timed: true,
    passages: [
      { len: 'short', title: 'Short - rhythm', text: 'Type with rhythm, not force; every clean keystroke builds speed.' },
      { len: 'short', title: 'Short - home row', text: 'Return to the home row after every key: it keeps your hands oriented.' },
      { len: 'short', title: 'Short - accuracy', text: 'Reach 35+ WPM: focus on accuracy first, then add speed.' },
      { len: 'medium', title: 'Beat the clock', text: 'To reach 30 WPM, practice a little every day, focus on the keys you miss, and keep a steady rhythm instead of rushing through the words.' },
      { len: 'medium', title: 'Sprint test', text: 'Set a goal: 40 WPM with 95% accuracy. Then hit each key once, correct mistakes calmly, and let rhythm carry you to the finish.' },
      { len: 'medium', title: 'Long haul', text: 'A strong typist keeps relaxed posture, rests the wrists lightly, and returns to the home row after every key - at any speed from 20 to 60 WPM, accuracy still wins.' },
      { len: 'medium', title: 'Final burst', text: 'Smooth motion beats sudden speed; let each keystroke land cleanly, correct mistakes calmly, and aim for 98% accuracy or better.' },
      { len: 'long', title: 'Long - control today', text: 'Great typing is built one clean session at a time: keep your fingers near the home row, reach for each key with the nearest finger, correct mistakes quickly, and let a steady rhythm replace sudden bursts of speed, because control today becomes speed tomorrow.' },
      { len: 'long', title: 'Long - regular practice', text: 'The surest way to improve is regular practice: type a little every day, notice which keys give you trouble, drill them until they feel natural, and measure yourself with the same WPM rule so you can watch your progress climb week after week.' }
    ]
  }
};

const GENERAL_TIPS = [
  "Find the bumps on F and J with your index fingers - that is your home position, and every other key is reached from there.",
  "For a capital letter, hold Shift with the opposite hand while you press the letter key.",
  "Most symbols need Shift; the top row and number keys hold the rest. Practise a symbol slowly before using it at speed.",
  "Keep your eyes on the screen, not your hands - your fingers learn where the keys are through repetition.",
  "Return to the home row after every keystroke so your hands always know where they are.",
  "Relax your wrists and keep a light touch; speed comes from rhythm, not from pressing harder."
];

const STORAGE_KEY = 'keysprint_stats_v1';

const passageEl = document.getElementById('passage');
const input = document.getElementById('typingInput');
const wpmEl = document.getElementById('wpm');
const accEl = document.getElementById('accuracy');
const errorsEl = document.getElementById('errors');
const correctionsEl = document.getElementById('corrections');
const timerEl = document.getElementById('timer');
const scoreEl = document.getElementById('score');
const progressEl = document.getElementById('progressBar');
const scoreBar = document.getElementById('scoreBar');
const stateEl = document.getElementById('sessionState');
const titleEl = document.getElementById('passageTitle');
const tipEl = document.getElementById('tipText');
const levelNav = document.getElementById('levelNav');
const levelDescEl = document.getElementById('levelDesc');
const challengeBar = document.getElementById('challengeBar');
const targetInput = document.getElementById('targetWpm');
const challengeTimeEl = document.getElementById('challengeTime');
const challengeLenSelect = document.getElementById('challengeLen');
const homeRowHint = document.getElementById('homeRowHint');
const timerLabelEl = document.getElementById('timerLabel');
const goalEl = document.getElementById('goal');
const feedbackEl = document.getElementById('feedback');
const helpBtn = document.getElementById('helpBtn');
const helpModal = document.getElementById('helpModal');
const helpClose = document.getElementById('helpClose');
const suggestBtn = document.getElementById('suggestBtn');
const suggestModal = document.getElementById('suggestModal');
const suggestClose = document.getElementById('suggestClose');
const suggestForm = document.getElementById('suggestForm');
const suggestText = document.getElementById('suggestText');
const suggestLiked = document.getElementById('suggestLiked');
const suggestStatus = document.getElementById('suggestStatus');

const FINGERS = {
  a:'left pinky', s:'left ring', d:'left middle', f:'left index', g:'left index', h:'right index', j:'right index', k:'right middle', l:'right ring', ';':'right pinky',
  q:'left pinky', w:'left ring', e:'left middle', r:'left index', t:'left index', y:'right index', u:'right index', i:'right middle', o:'right ring', p:'right pinky',
  z:'left pinky', x:'left ring', c:'left middle', v:'left index', b:'left index', n:'right index', m:'right index'
};

function loadPersistent() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch (e) { return {}; }
}
function savePersistent(stats) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(stats)); } catch (e) {}
}
function randInt(n) { return Math.floor(Math.random() * n); }
function pick(s) { return s[randInt(s.length)]; }

let persistentKeyStats = loadPersistent();
let sessionKeyStats = {};
let saveTimer = null;
let level = LEVELS.beginner;
let passageIndex = 0;
let passage = level.passages[0];
let startedAt = null, timerId = null, finished = false;
let challengeDeadline = null;
let targetWpm = 40;
let challengeLen = 'medium';
let correctKeystrokes = 0;
let mistakes = 0;
let corrections = 0;
let lastValue = '';
let generalTipIndex = 0;
let focusMode = false;

function formatTime(sec) {
  sec = Math.max(0, Math.floor(sec));
  return String(Math.floor(sec / 60)).padStart(2, '0') + ':' + String(sec % 60).padStart(2, '0');
}
function challengeBudget() {
  return (passage.text.length / 5) / targetWpm * 60;
}
function currentWpm() {
  const elapsed = (Date.now() - startedAt) / 60000;
  return Math.floor((correctKeystrokes / 5) / Math.max(elapsed, 1 / 60));
}
function activePool() {
  return level.timed ? level.passages.filter(p => p.len === challengeLen) : level.passages;
}
function keyNorm(ch) {
  const c = ch.toLowerCase();
  return /[a-z]/.test(c) ? c : ch;
}
function topWeakKeys(stats, n) {
  const list = [];
  for (const ch in stats) {
    const r = stats[ch];
    const attempts = r.c + r.w;
    if (r.w > 0 && attempts >= 2) list.push({ ch, w: r.w, attempts, rate: r.w / attempts });
  }
  list.sort((a, b) => (b.rate - a.rate) || (b.w - a.w));
  return list.slice(0, n);
}
function buildFocusPassage(keys) {
  const ks = keys.slice(0, 4);
  if (!ks.length) return null;
  const vowels = 'aeiou';
  const consonants = 'bdghlmnrstw';
  const words = [];
  const count = 10 + randInt(6);
  for (let i = 0; i < count; i++) {
    const len = 3 + randInt(3);
    const wkCount = Math.random() < 0.35 ? 2 : 1;
    const chars = [];
    for (let j = 0; j < len; j++) chars.push(pick(consonants));
    const positions = new Set();
    while (positions.size < Math.min(wkCount, len)) positions.add(randInt(len));
    for (const pos of positions) chars[pos] = pick(ks);
    const fillers = [];
    for (let j = 0; j < len; j++) if (!positions.has(j)) fillers.push(j);
    if (fillers.length) chars[fillers[randInt(fillers.length)]] = pick(vowels);
    words.push(chars.join(''));
  }
  return { title: 'Focus drill - ' + ks.join(' '), text: words.join(' ') };
}
function fingerHint(ch) {
  const f = FINGERS[ch.toLowerCase()];
  return f ? 'That key belongs to your ' + f + '.' : 'Practise that key a few times on its own.';
}
function nextGeneralTip() {
  const tip = GENERAL_TIPS[generalTipIndex % GENERAL_TIPS.length];
  generalTipIndex++;
  return tip;
}
function scheduleSave() {
  if (saveTimer) return;
  saveTimer = setTimeout(() => { saveTimer = null; savePersistent(persistentKeyStats); }, 400);
}
function persistNow() {
  if (saveTimer) { clearTimeout(saveTimer); saveTimer = null; }
  savePersistent(persistentKeyStats);
}

function renderPassage() {
  passageEl.innerHTML = '';
  [...passage.text].forEach((ch, i) => {
    const s = document.createElement('span');
    s.textContent = ch; s.dataset.i = i;
    passageEl.appendChild(s);
  });
  updateVisual('');
}
function updateVisual(value) {
  const spans = [...passageEl.children];
  spans.forEach((s, i) => {
    s.className = '';
    if (i < value.length) s.classList.add(value[i] === passage.text[i] ? 'correct' : 'incorrect');
    if (i === value.length && !finished) s.classList.add('current');
  });
  progressEl.style.width = Math.min(100, value.length / passage.text.length * 100) + '%';
}
function applyLevelUI() {
  levelDescEl.textContent = level.desc;
  challengeBar.classList.toggle('hidden', !level.timed);
  homeRowHint.classList.toggle('hidden', level.key !== 'beginner');
  timerLabelEl.textContent = level.timed ? 'time left' : 'elapsed';
  goalEl.textContent = level.shortName + ' - ' + level.goal;
  [...levelNav.children].forEach(b => {
    const lvl = LEVELS[b.dataset.level];
    const i = b.querySelector('i');
    if (i && lvl) i.textContent = lvl.tagline;
  });
  if (level.timed) { targetInput.value = targetWpm; challengeTimeEl.textContent = formatTime(challengeBudget()); }
}
function reset() {
  persistNow();
  clearInterval(timerId);
  startedAt = null; timerId = null; finished = false;
  challengeDeadline = null;
  correctKeystrokes = 0; mistakes = 0; corrections = 0; lastValue = '';
  sessionKeyStats = {};
  input.value = ''; input.disabled = false;
  stateEl.textContent = 'READY TO PRACTICE';
  wpmEl.textContent = '0'; accEl.textContent = '100%'; errorsEl.textContent = '0'; correctionsEl.textContent = '0';
  timerEl.textContent = '00:00'; scoreEl.textContent = '—';
  progressEl.style.width = '0%'; scoreBar.style.width = '0%';
  goalEl.classList.remove('hit');
  tipEl.textContent = nextGeneralTip();
  feedbackEl.textContent = 'Finish the passage to get a personal suggestion.';
  feedbackEl.classList.remove('done');
  titleEl.textContent = passage.title;
  if (level.timed) challengeTimeEl.textContent = formatTime(challengeBudget());
  renderPassage();
  input.focus();
}
function start() {
  if (startedAt) return;
  startedAt = Date.now();
  if (level.timed) challengeDeadline = Date.now() + challengeBudget() * 1000;
  stateEl.textContent = 'IN THE ZONE';
  timerId = setInterval(updateStats, 250);
}
function accountInput() {
  const prev = lastValue;
  const next = input.value;
  if (next === prev) return;
  let p = 0;
  while (p < prev.length && p < next.length && prev[p] === next[p]) p++;
  let s = 0;
  while (s < prev.length - p && s < next.length - p && prev[prev.length - 1 - s] === next[next.length - 1 - s]) s++;
  const removed = prev.length - p - s;
  const inserted = next.slice(p, next.length - s);
  corrections += removed;
  for (let k = 0; k < inserted.length; k++) {
    const target = passage.text[p + k];
    const key = keyNorm(target);
    const rec = sessionKeyStats[key] || (sessionKeyStats[key] = { c: 0, w: 0 });
    const prec = persistentKeyStats[key] || (persistentKeyStats[key] = { c: 0, w: 0 });
    if (inserted[k] === target) { correctKeystrokes++; rec.c++; prec.c++; }
    else { mistakes++; rec.w++; prec.w++; }
  }
  lastValue = next;
  scheduleSave();
}
function buildFinalFeedback() {
  const total = correctKeystrokes + mistakes;
  const accuracy = total ? Math.round(correctKeystrokes / total * 100) : 100;
  const wpm = currentWpm();
  const inGoal = level.timed ? wpm >= targetWpm : wpm >= level.goalMin;
  const parts = [];
  if (mistakes === 0 && corrections === 0) parts.push('Flawless run - zero mistakes and zero corrections.');
  if (!inGoal) parts.push('WPM ' + wpm + ' is below this level\'s goal (' + level.goal + ') - re-run with a steady rhythm.');
  if (accuracy < 88) parts.push('Accuracy was ' + accuracy + '% - slow down and let each keystroke land cleanly.');
  if (corrections >= 5) parts.push('You backspaced ' + corrections + ' times - aim to hit the right key the first time.');
  const roundKeys = topWeakKeys(sessionKeyStats, 3);
  if (roundKeys.length) parts.push('This round\'s weak keys: ' + roundKeys.map(k => k.ch + ' (' + k.w + 'x)').join(', ') + '.');
  const habitKeys = topWeakKeys(persistentKeyStats, 4);
  if (habitKeys.length) parts.push('Your recurring weak keys are ' + habitKeys.map(k => k.ch).join(', ') + ' - try Focus practice.');
  if (parts.length === 0) parts.push('Solid run - keep the rhythm and try the next passage or a higher target.');
  return parts.join(' ');
}
function updateStats() {
  if (!startedAt) return;
  if (level.timed) {
    const remaining = Math.max(0, (challengeDeadline - Date.now()) / 1000);
    timerEl.textContent = formatTime(remaining);
    challengeTimeEl.textContent = formatTime(remaining);
    if (remaining <= 0) { finish('timeout'); return; }
  } else {
    timerEl.textContent = formatTime((Date.now() - startedAt) / 1000);
  }
  const elapsed = (Date.now() - startedAt) / 1000;
  const minutes = Math.max(elapsed / 60, 1 / 60);
  const total = correctKeystrokes + mistakes;
  const wpm = Math.floor((correctKeystrokes / 5) / minutes);
  const accuracy = total ? Math.round(correctKeystrokes / total * 100) : 100;
  wpmEl.textContent = wpm;
  accEl.textContent = accuracy + '%';
  errorsEl.textContent = mistakes;
  correctionsEl.textContent = corrections;
  const score = Math.max(0, Math.min(100, Math.round(accuracy * 0.7 + Math.min(wpm, 60) / 60 * 30)));
  scoreEl.textContent = score + '/100'; scoreBar.style.width = score + '%';
  goalEl.classList.toggle('hit', level.timed ? wpm >= targetWpm : wpm >= level.goalMin);
}
function finish(reason) {
  if (finished) return;
  finished = true;
  clearInterval(timerId);
  input.disabled = true;
  updateVisual(input.value);
  stateEl.textContent = level.timed ? (reason === 'timeout' ? "TIME'S UP" : 'BEAT THE CLOCK') : 'PASSAGE COMPLETE';
  feedbackEl.textContent = buildFinalFeedback();
  feedbackEl.classList.add('done');
  persistNow();
}
function setLevel(key) {
  level = LEVELS[key];
  passageIndex = 0;
  focusMode = false;
  passage = activePool()[0];
  [...levelNav.children].forEach(b => b.classList.toggle('active', b.dataset.level === key));
  applyLevelUI();
  reset();
}
function focusPractice() {
  const keys = topWeakKeys(persistentKeyStats, 6).map(w => w.ch).filter(c => /[a-z]/.test(c));
  if (!keys.length) {
    feedbackEl.textContent = 'Finish a few rounds first so KeySprint can learn your weak keys.';
    feedbackEl.classList.add('done');
    return;
  }
  passage = buildFocusPassage(keys);
  focusMode = true;
  reset();
}
function openHelp() { helpModal.classList.remove('hidden'); }
function closeHelp() { helpModal.classList.add('hidden'); }
function openSuggest() { suggestModal.classList.remove('hidden'); }
function closeSuggest() { suggestModal.classList.add('hidden'); }

input.addEventListener('input', () => {
  if (finished) return;
  start();
  accountInput();
  updateVisual(input.value);
  updateStats();
  if (input.value.length >= passage.text.length) {
    if (input.value.length > passage.text.length) input.value = input.value.slice(0, passage.text.length);
    updateVisual(input.value);
    updateStats();
    finish('complete');
  }
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (!helpModal.classList.contains('hidden')) { closeHelp(); return; }
    if (!suggestModal.classList.contains('hidden')) { closeSuggest(); return; }
    e.preventDefault();
    reset();
  }
});
document.getElementById('resetBtn').onclick = reset;
document.getElementById('newPassage').onclick = () => {
  if (focusMode) { focusMode = false; passageIndex = 0; passage = activePool()[0]; }
  else { const pool = activePool(); passageIndex = (passageIndex + 1) % pool.length; passage = pool[passageIndex]; }
  reset();
};
document.getElementById('focusPractice').onclick = focusPractice;
helpBtn.onclick = openHelp;
helpClose.onclick = closeHelp;
helpModal.addEventListener('click', e => { if (e.target === helpModal) closeHelp(); });
suggestBtn.onclick = openSuggest;
suggestClose.onclick = closeSuggest;
suggestModal.addEventListener('click', e => { if (e.target === suggestModal) closeSuggest(); });
suggestForm.addEventListener('submit', async e => {
  e.preventDefault();
  const text = suggestText.value.trim();
  if (!text) return;
  const liked = suggestLiked.value.trim();
  const payload = { text, liked, at: new Date().toISOString() };
  suggestStatus.textContent = 'Sending...';
  try {
    const res = await fetch('/suggestions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('bad status');
    suggestStatus.textContent = 'Thank you so much - we received it! Your feedback will be read carefully and really does help.';
    suggestForm.reset();
  } catch (err) {
    const clip = 'KeySprint feedback\n' + text + (liked ? '\nLiked: ' + liked : '') + '\n';
    try {
      await navigator.clipboard.writeText(clip);
      suggestStatus.textContent = 'Thank you! Auto-send is not available on this hosting, so I copied your message - please paste it to the author.';
    } catch (e2) {
      suggestStatus.textContent = 'Thank you! Please send your message to the author directly.';
    }
  }
});
levelNav.addEventListener('click', e => {
  const btn = e.target.closest('button[data-level]');
  if (btn) setLevel(btn.dataset.level);
});
targetInput.addEventListener('input', () => {
  let v = parseInt(targetInput.value, 10);
  if (isNaN(v)) v = 40;
  v = Math.max(10, Math.min(120, v));
  targetWpm = v; targetInput.value = v;
  if (!startedAt) challengeTimeEl.textContent = formatTime(challengeBudget());
});
challengeLenSelect.addEventListener('change', () => {
  challengeLen = challengeLenSelect.value;
  passageIndex = 0;
  focusMode = false;
  passage = activePool()[0];
  reset();
});

applyLevelUI();
reset();
