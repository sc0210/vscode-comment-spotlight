/* store.js — tiny localStorage-backed state layer shared across views. */
(function (global) {
  "use strict";

  const KEY = "weddingPlanner.v1";

  const defaults = {
    settings: { name1: "Alex", name2: "Sam", date: "", totalBudget: 0 },
    budget: [],   // { id, item, category, planned, actual, paid }
    guests: [],   // { id, name, party, rsvp, checkedIn }
    game: { best: null } // best moves
  };

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return structuredClone(defaults);
      const parsed = JSON.parse(raw);
      // Merge so new fields appear for older saves.
      return {
        settings: Object.assign({}, defaults.settings, parsed.settings),
        budget: Array.isArray(parsed.budget) ? parsed.budget : [],
        guests: Array.isArray(parsed.guests) ? parsed.guests : [],
        game: Object.assign({}, defaults.game, parsed.game)
      };
    } catch (e) {
      console.warn("Could not read saved data, starting fresh.", e);
      return structuredClone(defaults);
    }
  }

  let state = load();
  const listeners = new Set();

  function persist() {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch (e) {
      console.warn("Could not save data.", e);
    }
    listeners.forEach((fn) => fn(state));
  }

  const Store = {
    get: () => state,
    subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); },
    update(mutator) { mutator(state); persist(); },
    uid: () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
  };

  // Format a number as currency without external libs.
  Store.money = function (n) {
    const v = Number(n) || 0;
    return "$" + v.toLocaleString(undefined, { maximumFractionDigits: v % 1 ? 2 : 0 });
  };

  global.Store = Store;
})(window);
