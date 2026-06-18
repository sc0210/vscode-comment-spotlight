/* guests.js — guest list + wedding-day check-in. */
(function (global) {
  "use strict";

  const $ = (sel) => document.querySelector(sel);
  let mode = "manage"; // "manage" | "checkin"
  let search = "";

  function counts() {
    const g = Store.get().guests;
    const invited = g.reduce((s, x) => s + (Number(x.party) || 1), 0);
    const confirmed = g.filter((x) => x.rsvp === "yes").reduce((s, x) => s + (Number(x.party) || 1), 0);
    const checkedIn = g.filter((x) => x.checkedIn).reduce((s, x) => s + (Number(x.party) || 1), 0);
    return { invited, confirmed, checkedIn, confirmedHeads: g.filter((x) => x.rsvp === "yes").length };
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[c]));
  }

  const RSVP_LABEL = { yes: "Confirmed", no: "Declined", pending: "Pending" };

  function render() {
    const g = Store.get().guests;
    const list = $("#guestList");
    const empty = $("#guestEmpty");
    const c = counts();

    $("#gcTotal").textContent = c.invited;
    $("#gcConfirmed").textContent = c.confirmed;
    $("#gcCheckedIn").textContent = c.checkedIn;

    $("#checkinSearchWrap").hidden = mode !== "checkin";

    let visible = g;
    if (mode === "checkin" && search) {
      const q = search.toLowerCase();
      visible = g.filter((x) => x.name.toLowerCase().includes(q));
    }

    list.innerHTML = "";
    empty.hidden = g.length > 0;

    visible.forEach((guest) => {
      const row = document.createElement("div");
      row.className = "row-card" + (guest.checkedIn ? " checked" : "");

      const partyLabel = (Number(guest.party) || 1) > 1 ? ` &middot; party of ${guest.party}` : "";

      if (mode === "checkin") {
        row.innerHTML = `
          <div class="row-main">
            <div class="row-title">${escapeHtml(guest.name)}</div>
            <div class="row-meta">${RSVP_LABEL[guest.rsvp] || "Pending"}${partyLabel}</div>
          </div>
          <button class="checkin-btn ${guest.checkedIn ? "is-in" : ""}" data-checkin="${guest.id}">
            ${guest.checkedIn ? "&#10003; Checked in" : "Check in"}
          </button>
        `;
      } else {
        row.innerHTML = `
          <div class="row-main">
            <div class="row-title">${escapeHtml(guest.name)}
              <span class="rsvp-badge rsvp-${guest.rsvp}">${RSVP_LABEL[guest.rsvp] || "Pending"}</span>
            </div>
            <div class="row-meta">Party of ${guest.party || 1}${guest.checkedIn ? " &middot; &#10003; checked in" : ""}</div>
          </div>
          <button class="del-btn" data-del="${guest.id}" title="Remove" aria-label="Remove ${escapeHtml(guest.name)}">&times;</button>
        `;
      }
      list.appendChild(row);
    });

    if (mode === "checkin" && visible.length === 0 && g.length > 0) {
      empty.hidden = false;
      empty.textContent = "No guests match your search.";
    } else {
      empty.textContent = "No guests yet. Add your first above.";
    }
  }

  function init() {
    $("#guestForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const name = $("#gName").value.trim();
      if (!name) return;
      Store.update((s) => {
        s.guests.push({
          id: Store.uid(),
          name,
          party: Math.max(1, Number($("#gParty").value) || 1),
          rsvp: $("#gRsvp").value,
          checkedIn: false
        });
      });
      e.target.reset();
      $("#gParty").value = 1;
      $("#gName").focus();
    });

    $("#guestList").addEventListener("click", (e) => {
      const del = e.target.closest("[data-del]");
      const chk = e.target.closest("[data-checkin]");
      if (del) {
        Store.update((s) => { s.guests = s.guests.filter((x) => x.id !== del.dataset.del); });
      } else if (chk) {
        Store.update((s) => {
          const guest = s.guests.find((x) => x.id === chk.dataset.checkin);
          if (guest) guest.checkedIn = !guest.checkedIn;
        });
        if (global.App) global.App.toast("Guest updated ✓");
      }
    });

    document.querySelectorAll(".seg-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".seg-btn").forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        mode = btn.dataset.mode;
        search = "";
        $("#checkinSearch").value = "";
        render();
      });
    });

    $("#checkinSearch").addEventListener("input", (e) => {
      search = e.target.value;
      render();
    });

    Store.subscribe(render);
    render();
  }

  global.Guests = { init, render, counts };
})(window);
