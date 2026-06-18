# 💍 Forever — Wedding Planner

A lightweight, responsive web app for planning a wedding. Works on mobile and
desktop, needs no backend, and saves everything in your browser (localStorage).

## Features

- **Dashboard** — couple names, a live countdown to the big day, and at-a-glance
  stats (money spent vs. budget, confirmed guests, % of items paid).
- **Budget planner** — add line items by category, track *planned* vs. *actual*
  cost, mark items paid/unpaid, and watch your remaining budget update live.
- **Guests & check-in** — keep an RSVP list (with party sizes), then switch to
  **Check-in mode** on the wedding day to tap guests in, with a quick search.
- **Memory Match game** — a wedding-themed card-matching mini-game with a move
  counter, timer, and a saved best score. A little break from the planning.

## Running it

It's a static site — no build step, no dependencies.

```bash
cd wedding-app
python3 -m http.server 8000
# then open http://localhost:8000
```

Or just open `index.html` directly in a browser.

## Project structure

```
wedding-app/
├── index.html        # markup for all views
├── css/styles.css    # responsive, mobile-first styling
└── js/
    ├── store.js      # localStorage-backed shared state
    ├── budget.js     # budget planner
    ├── guests.js     # guest list + day-of check-in
    ├── game.js       # memory matching game
    └── app.js        # navigation, dashboard, countdown, settings
```

## Data & privacy

All data lives only in your browser under the `weddingPlanner.v1` key. Nothing
is sent anywhere. Clearing your browser storage resets the app.
