/* budget.js — budget planner view. */
(function (global) {
  "use strict";

  const $ = (sel) => document.querySelector(sel);

  function totals() {
    const items = Store.get().budget;
    const planned = items.reduce((s, i) => s + (Number(i.planned) || 0), 0);
    const actual = items.reduce((s, i) => s + (Number(i.actual) || 0), 0);
    const paidCount = items.filter((i) => i.paid).length;
    return { planned, actual, paidCount, count: items.length };
  }

  function render() {
    const state = Store.get();
    const items = state.budget;
    const list = $("#budgetList");
    const empty = $("#budgetEmpty");
    const { planned, actual } = totals();
    const budget = Number(state.settings.totalBudget) || 0;

    $("#bsTotalBudget").textContent = Store.money(budget);
    $("#bsPlanned").textContent = Store.money(planned);
    $("#bsActual").textContent = Store.money(actual);
    const remaining = budget - actual;
    const remEl = $("#bsRemaining");
    remEl.textContent = Store.money(remaining);
    remEl.classList.toggle("is-over", remaining < 0);

    list.innerHTML = "";
    empty.hidden = items.length > 0;

    items.forEach((it) => {
      const row = document.createElement("div");
      row.className = "row-card";
      row.innerHTML = `
        <div class="row-main">
          <div class="row-title">${escapeHtml(it.item)} <span class="cat-tag">${escapeHtml(it.category)}</span></div>
          <div class="row-meta">Planned ${Store.money(it.planned)} &middot; Actual ${Store.money(it.actual)}</div>
        </div>
        <button class="pay-toggle ${it.paid ? "is-paid" : ""}" data-pay="${it.id}">${it.paid ? "Paid" : "Unpaid"}</button>
        <div class="row-amount">
          <div class="actual">${Store.money(it.actual || it.planned)}</div>
          <div class="planned">of ${Store.money(it.planned)}</div>
        </div>
        <button class="del-btn" data-del="${it.id}" title="Remove" aria-label="Remove ${escapeHtml(it.item)}">&times;</button>
      `;
      list.appendChild(row);
    });
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[c]));
  }

  function init() {
    $("#budgetForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const item = $("#bItem").value.trim();
      if (!item) return;
      Store.update((s) => {
        s.budget.push({
          id: Store.uid(),
          item,
          category: $("#bCategory").value,
          planned: Number($("#bPlanned").value) || 0,
          actual: Number($("#bActual").value) || 0,
          paid: false
        });
      });
      e.target.reset();
      $("#bItem").focus();
    });

    $("#budgetList").addEventListener("click", (e) => {
      const del = e.target.closest("[data-del]");
      const pay = e.target.closest("[data-pay]");
      if (del) {
        Store.update((s) => { s.budget = s.budget.filter((i) => i.id !== del.dataset.del); });
      } else if (pay) {
        Store.update((s) => {
          const it = s.budget.find((i) => i.id === pay.dataset.pay);
          if (it) it.paid = !it.paid;
        });
      }
    });

    $("#editTotalBudget").addEventListener("click", () => {
      global.App && global.App.openSettings();
    });

    Store.subscribe(render);
    render();
  }

  global.Budget = { init, render, totals };
})(window);
