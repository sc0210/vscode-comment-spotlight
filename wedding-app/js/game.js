/* game.js — wedding-themed memory matching game. */
(function (global) {
  "use strict";

  const $ = (sel) => document.querySelector(sel);
  const SYMBOLS = ["💍", "💐", "🎂", "🥂", "💒", "👰", "🤵", "💌"];

  let deck = [];
  let flipped = [];     // currently face-up, unmatched cards (DOM + value)
  let matched = 0;
  let moves = 0;
  let locked = false;
  let timer = null;
  let seconds = 0;
  let started = false;

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function fmtTime(s) {
    const m = Math.floor(s / 60);
    const r = s % 60;
    return m + ":" + String(r).padStart(2, "0");
  }

  function updateHud() {
    $("#gameMoves").textContent = moves;
    $("#gamePairs").textContent = matched + "/8";
    $("#gameTime").textContent = fmtTime(seconds);
    const best = Store.get().game.best;
    $("#gameBest").textContent = best ? best + " moves" : "–";
  }

  function startTimer() {
    if (timer) return;
    timer = setInterval(() => { seconds++; updateHud(); }, 1000);
  }

  function stopTimer() {
    clearInterval(timer);
    timer = null;
  }

  function build() {
    stopTimer();
    deck = shuffle(SYMBOLS.concat(SYMBOLS));
    flipped = [];
    matched = 0;
    moves = 0;
    seconds = 0;
    started = false;
    locked = false;

    const board = $("#gameBoard");
    board.innerHTML = "";
    $("#gameWin").hidden = true;
    board.hidden = false;

    deck.forEach((sym, idx) => {
      const card = document.createElement("button");
      card.className = "card";
      card.type = "button";
      card.dataset.value = sym;
      card.dataset.idx = idx;
      card.setAttribute("aria-label", "Hidden card");
      card.innerHTML = `
        <div class="card-inner">
          <div class="card-face card-front">&#10070;</div>
          <div class="card-face card-back">${sym}</div>
        </div>`;
      card.addEventListener("click", () => onFlip(card));
      board.appendChild(card);
    });

    updateHud();
  }

  function onFlip(card) {
    if (locked) return;
    if (card.classList.contains("flipped") || card.classList.contains("matched")) return;

    if (!started) { started = true; startTimer(); }

    card.classList.add("flipped");
    card.setAttribute("aria-label", card.dataset.value);
    flipped.push(card);

    if (flipped.length === 2) {
      moves++;
      updateHud();
      const [a, b] = flipped;
      if (a.dataset.value === b.dataset.value) {
        a.classList.add("matched");
        b.classList.add("matched");
        a.disabled = true;
        b.disabled = true;
        flipped = [];
        matched++;
        updateHud();
        if (matched === SYMBOLS.length) win();
      } else {
        locked = true;
        setTimeout(() => {
          a.classList.remove("flipped");
          b.classList.remove("flipped");
          a.setAttribute("aria-label", "Hidden card");
          b.setAttribute("aria-label", "Hidden card");
          flipped = [];
          locked = false;
        }, 800);
      }
    }
  }

  function win() {
    stopTimer();
    const prevBest = Store.get().game.best;
    const isBest = !prevBest || moves < prevBest;
    if (isBest) {
      Store.update((s) => { s.game.best = moves; });
    }
    updateHud();
    $("#gameBoard").hidden = true;
    const winEl = $("#gameWin");
    winEl.hidden = false;
    $("#winSummary").textContent =
      `${moves} moves in ${fmtTime(seconds)}.` + (isBest ? " That's a new best! 🏆" : "");
  }

  function init() {
    $("#gameRestart").addEventListener("click", build);
    $("#winPlayAgain").addEventListener("click", build);
    build();
  }

  // Pause the timer when leaving the game view; resume is implicit on next flip.
  function onLeave() { stopTimer(); }
  function onEnter() { if (started && matched < SYMBOLS.length) startTimer(); }

  global.Game = { init, build, onLeave, onEnter };
})(window);
