[PACER_README.md](https://github.com/user-attachments/files/28712948/PACER_README.md)
# Pacer — Swim Race Split Predictor

A single-file web app that turns a goal time into predicted 50/100 splits, based on the
pacing distribution of elite swimmers. Built for coaches to use poolside.

---

## Live site & deployment

- **Code repo:** `github.com/chaubetg/SwimApp` — this is where the live `index.html` lives.
- **Live URL:** `https://chaubetg.github.io/SwimApp/` (after GitHub Pages is enabled on the SwimApp repo).
- **Note:** `chaubetg.github.io` (the bare root) is a *different, older* repo still showing the original mock. Don't share that one.

### How to update the live site (lessons learned the hard way)
1. Get the new `index.html`. If your browser saved it as `index (1).html`, **rename it to exactly `index.html`** (the #1 cause of "my update didn't show up").
2. Easiest reliable method: on GitHub open `index.html` → pencil ✏️ (Edit) → select-all, delete, paste the new file → **Commit to `main`**.
   - Or **Add file → Upload files**, drag `index.html` (correctly named) to replace it, commit.
3. Verify the committed file: open `index.html` on GitHub, the `<title>` should read **"Pacer — v1 (real pacing data)"**.
4. Enable/confirm Pages: SwimApp → **Settings → Pages → Source = Deploy from a branch, branch `main`, folder `/ (root)`**.
5. Wait ~1 min (check the **Actions** tab for a green check), then hard-refresh / open in a private tab (Safari caches hard).

---

## How the prediction works (methodology)

- Ratios are the **median + IQR (q25–q75)** of each segment's share of total race time, from
  World Aquatics elite finals (Olympics & World Champs), ~24 swims per event.
- **200s:** each of the four 50s has its own median+IQR (real fade — fly drifts ~0.7s/50; free/back come home flatter).
- **400 / 800 / 1500 free:** opening 50 / flat middle / closing 50(s); displayed as First / Middle / Last (per-50 or per-100 toggle).
- **IM 200:** four stroke legs. **IM 400:** grouped by stroke — each 100 (with its own IQR band) + its two 50s. **IM 100 (SCM):** four 25m legs.
- **50-PB ("50 m best time needed"):** the opening-50 the goal implies, with its own IQR band; used to flag a top-end-speed limiter.
- Coverage: Free 50–1500, Back/Breast/Fly 50(SCM)/100/200, IM 100(SCM)/200/400 — Men & Women, LCM & SCM (62 event combos).

### Data pipeline
- Source CSVs: `Projects_Claude_Cursor_icloud/sw_database/swimming_raw_data_scrappingApril2026/`
- `build_ratios.py` reads those CSVs → emits `ratios.js` → paste that block into `index.html` (replaces the `const ratios = {…}` object).
- Backups of the working app live in this folder: `pacer_index.html`, `pacer_build_ratios.py`.
- To refresh with new data: re-run `build_ratios.py`, paste its `ratios.js` output into `index.html`.

---

## Current features (v1)

- Roster home: Split predictor button, search saved swimmers, clean empty state.
- **Split predictor:** stroke / sex / pool / distance / target time, optional swimmer **name** with autocomplete from saved names.
- **Predicted splits:** median centered on an IQR range bar; front-end/back-end ends (better/worse <stroke> for IM); editable target; ±1 / ±0.1 nudges; −1% / +1% presets; M:SS formatting over a minute; Copy split sheet.
- **Save & recall:** save a prediction under a name (persists in the browser via localStorage). Roster groups by name → tap a name → list of their events → tap an event → splits. **"+ Add an event"** opens the predictor pre-filled with that swimmer's name + sex/pool.
- Locked for the coach trial: Race analysis and Squad targets are removed; no demo swimmers.

---

## Known limitations / decisions

- **Storage is per-browser, per-device** (localStorage). No cross-device sync, no backup. iOS Safari may clear it after ~7 days of no use unless "Add to Home Screen" is used. A real multi-device / shared-team version needs a backend (accounts + database).
- **SCY** is offered in the form but has no data (returns the no-data screen). LCM/SCM only.
- 50m only has 25m sub-splits in **SCM** (no LCM 50 sub-splits in the dataset).
- Sample/demo race-analysis & squad screens still exist in code but are unreachable.

---

## Next steps / TODO

- [ ] Visual polish pass on the Split predictor form and Predicted splits screen.
- [ ] Delete / edit saved events (and rename a swimmer).
- [ ] Optional: make it fill the screen on iPad (currently full-screen only ≤480px).
- [ ] Decide on clean URL (`chaubetg.github.io`) vs `chaubetg.github.io/SwimApp/`.
- [ ] Longer term: backend for permanent, synced, shareable team data.
- [ ] Collect coach feedback — what's confusing, what's missing, does the pacing match their experience.

---

## Session log

### 2026-06-08
- Built real median+IQR ratios from the World Aquatics CSVs (replaced the mock's approximate values); 62 event combos.
- Reworked predicted-splits: per-50 ratios for the 200, opening/middle/closing for distance free, IM 400 grouped by stroke, IM 100 SCM added.
- UX: inline-editable target, ±1/±0.1 nudges, −1%/+1% presets, Per-50/Per-100 toggle with First/Middle/Last collapse, M:SS formatting, Copy, front-end/back-end (better/worse) range labels, 50-PB band.
- Renamed "Quick calc" → "Split predictor"; added swimmer name + Save + searchable saved swimmers grouped by name; "+ Add an event".
- Cleaned up for coach trial: removed jumper/demo/notes scaffolding, demo swimmers, Race analysis & Squad targets; centered phone card on a soft backdrop; removed the fake phone notch.
- Deployment: discovered the live `chaubetg.github.io` is a different/old repo; the real app lives in the **SwimApp** repo → enable Pages there → `chaubetg.github.io/SwimApp/`.

<!-- Add a new dated entry each session: what changed, decisions, and any new TODOs. -->
