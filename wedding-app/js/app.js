/* app.js — navigation, dashboard, countdown, settings modal, toast. */
(function (global) {
  "use strict";

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  let currentView = "dashboard";
  let countdownTimer = null;

  /* ---------- Navigation ---------- */
  function goto(view) {
    if (view === currentView && document.querySelector(`#view-${view}:not([hidden])`)) {
      // already here
    }
    if (currentView === "game" && view !== "game") global.Game.onLeave();

    currentView = view;
    $$(".view").forEach((v) => { v.hidden = v.dataset.view !== view; });
    $$(".nav-btn").forEach((b) => b.classList.toggle("is-active", b.dataset.goto === view));
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (view === "game") global.Game.onEnter();
    if (view === "dashboard") renderDashboard();
  }

  /* ---------- Dashboard ---------- */
  function renderDashboard() {
    const s = Store.get();
    const { name1, name2, date, totalBudget } = s.settings;
    const names = `${name1 || "Partner 1"} & ${name2 || "Partner 2"}`;
    $("#heroNames").textContent = names;
    $("#brandNames").textContent = names;

    if (date) {
      const d = new Date(date + "T00:00:00");
      $("#heroDate").textContent = d.toLocaleDateString(undefined, {
        weekday: "long", year: "numeric", month: "long", day: "numeric"
      });
    } else {
      $("#heroDate").textContent = "Set your wedding date in settings ⚙";
    }

    // Budget stats
    const bt = global.Budget.totals();
    const budget = Number(totalBudget) || 0;
    $("#statSpent").textContent = Store.money(bt.actual);
    $("#statBudgetSub").textContent = "of " + Store.money(budget) + " budget";
    const budgetPct = budget > 0 ? Math.min(100, (bt.actual / budget) * 100) : 0;
    $("#statBudgetBar").style.width = budgetPct + "%";

    const paidPct = bt.count > 0 ? Math.round((bt.paidCount / bt.count) * 100) : 0;
    $("#statTasks").textContent = paidPct + "%";
    $("#statPaidBar").style.width = paidPct + "%";
    $("#statPaidSub").textContent = `${bt.paidCount} of ${bt.count} paid`;

    // Guest stats
    const gc = global.Guests.counts();
    $("#statGuests").textContent = gc.confirmed;
    $("#statGuestSub").textContent = gc.checkedIn + " checked in";

    updateCountdown();
  }

  function updateCountdown() {
    const date = Store.get().settings.date;
    const set = (id, val) => { const el = $(id); if (el) el.textContent = val; };
    if (!date) { ["#cdDays", "#cdHours", "#cdMins", "#cdSecs"].forEach((i) => set(i, 0)); return; }

    const target = new Date(date + "T00:00:00").getTime();
    const diff = target - Date.now();
    if (diff <= 0) {
      set("#cdDays", 0); set("#cdHours", 0); set("#cdMins", 0); set("#cdSecs", 0);
      $("#heroDate").textContent = "🎉 Congratulations on your wedding!";
      return;
    }
    const sec = Math.floor(diff / 1000);
    set("#cdDays", Math.floor(sec / 86400));
    set("#cdHours", Math.floor((sec % 86400) / 3600));
    set("#cdMins", Math.floor((sec % 3600) / 60));
    set("#cdSecs", sec % 60);
  }

  /* ---------- Settings modal ---------- */
  function openSettings() {
    const s = Store.get().settings;
    $("#setName1").value = s.name1 || "";
    $("#setName2").value = s.name2 || "";
    $("#setDate").value = s.date || "";
    $("#setBudget").value = s.totalBudget || "";
    $("#settingsModal").hidden = false;
  }
  function closeSettings() { $("#settingsModal").hidden = true; }

  function saveSettings() {
    Store.update((s) => {
      s.settings.name1 = $("#setName1").value.trim() || "Alex";
      s.settings.name2 = $("#setName2").value.trim() || "Sam";
      s.settings.date = $("#setDate").value;
      s.settings.totalBudget = Number($("#setBudget").value) || 0;
    });
    closeSettings();
    renderDashboard();
    global.Budget.render();
    toast("Saved ✓");
  }

  /* ---------- Toast ---------- */
  let toastTimer = null;
  function toast(msg) {
    const el = $("#toast");
    el.textContent = msg;
    el.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { el.hidden = true; }, 2200);
  }

  /* ---------- Wire up ---------- */
  function init() {
    Store.subscribe(() => { if (currentView === "dashboard") renderDashboard(); });

    $$("[data-goto]").forEach((btn) => btn.addEventListener("click", () => goto(btn.dataset.goto)));

    $("#settingsBtn").addEventListener("click", openSettings);
    $("#settingsCancel").addEventListener("click", closeSettings);
    $("#settingsSave").addEventListener("click", saveSettings);
    $("#settingsModal").addEventListener("click", (e) => {
      if (e.target === $("#settingsModal")) closeSettings();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !$("#settingsModal").hidden) closeSettings();
    });

    global.Budget.init();
    global.Guests.init();
    global.Game.init();

    renderDashboard();
    countdownTimer = setInterval(() => {
      if (currentView === "dashboard") updateCountdown();
    }, 1000);

    // Prompt first-time users to set their details.
    const s = Store.get().settings;
    if (!s.date) setTimeout(openSettings, 600);
  }

  global.App = { goto, openSettings, toast };
  document.addEventListener("DOMContentLoaded", init);
})(window);
