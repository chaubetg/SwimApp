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

## Versioning workflow (v1 live, v2 in progress)

- **v1 = `index.html`** in the SwimApp repo — the version coaches are testing. Do **not** change it.
- **v2 = `v2.html`** — new features built here; deploys to `chaubetg.github.io/SwimApp/v2.html`. Storage key `pacer_saved_v2` so v2 testing doesn't touch v1 data on the same browser.
- Build features in v2.html only; commit v2.html to test live (or open locally to preview). v1 stays frozen.
- **Promote v2 → live:** copy v2.html content into index.html AND switch its storage key back to `pacer_saved_v1` (so coaches keep saved swimmers; safe as long as the saved-swimmer shape is unchanged).
- Backups in this folder: `pacer_index.html` (v1), `pacer_v2.html` (v2).

## Session log

### 2026-06-08
- Built real median+IQR ratios from the World Aquatics CSVs (replaced the mock's approximate values); 62 event combos.
- Reworked predicted-splits: per-50 ratios for the 200, opening/middle/closing for distance free, IM 400 grouped by stroke, IM 100 SCM added.
- UX: inline-editable target, ±1/±0.1 nudges, −1%/+1% presets, Per-50/Per-100 toggle with First/Middle/Last collapse, M:SS formatting, Copy, front-end/back-end (better/worse) range labels, 50-PB band.
- Renamed "Quick calc" → "Split predictor"; added swimmer name + Save + searchable saved swimmers grouped by name; "+ Add an event".
- Cleaned up for coach trial: removed jumper/demo/notes scaffolding, demo swimmers, Race analysis & Squad targets; centered phone card on a soft backdrop; removed the fake phone notch.
- Deployment: discovered the live `chaubetg.github.io` is a different/old repo; the real app lives in the **SwimApp** repo → enable Pages there → `chaubetg.github.io/SwimApp/`.
- Removed the fake phone "notch" (read as a stray black patch at the top of the card).
- Replaced the single MM:SS.ss time field with **three segmented inputs (min : sec . hundredths)** — numeric keypads, auto-advance, live-synced — much friendlier on a phone.
- Confirmed it runs well on iPhone. Reminder: re-commit `index.html` to SwimApp after changes to update the live link.

### v2 in progress (June 2026)
- Set up `v2.html` (separate file, storage key `pacer_saved_v2`) so v1/`index.html` stays frozen for the coach trial. Deploys to `chaubetg.github.io/SwimApp/v2.html`.
- **Race Analysis added (v2):** "Analyze a race" → enter event + goal/target + actual splits → compares each split to the elite median+IQR scaled to the goal, flags too-fast/on-range/too-slow, gives verdict + insights (went out too hard / faded / well distributed) with a **finals adjustment** line. Training suggestions deferred (placeholder shown).
  - Entry granularity: 100/200 per-50; **400+ free = first 50 + last 50 + total (middle 50s averaged automatically)**; 400 IM = 4 stroke-100s (uses the dedicated 100 IQR bands); 200 IM = 4 legs; 100 IM = 4×25; 50 = time only.
  - **Save races** under a swimmer with a Prelim/Final tag + date; saved-swimmer menu now has Pace plans + Races sections, "+ Race", and a **side-by-side Compare** (e.g. Prelim ↔ Final) showing per-split deltas.
- Note: app uses `state.form` for event selection on both the predictor and race entry; race round/target/actual-splits live in `state.raceForm.times` (keyed by row). Legacy mock race-analysis renamed `_legacyRaceAnalysis` (dead).
- **Outcome-aware verdicts:** pacing SHAPE is judged against the band scaled to the swimmer's ACTUAL total (not the goal), so hitting/beating the goal isn't mislabelled "too fast." If they hit/beat goal → leads with "🎉 Nicely done hitting your target time!" + opportunity language ("aggressive front half and it worked…"); if they missed → cautionary "Went out too hard — it cost you +X." Goal drives the framing; shape drives the read.
- Added a negative-split verdict: conservative open + fast close that still hits the goal → "Saved it for the back — go out faster" with a concrete "go out ~Xs quicker" tip (and "Went out too easy" when it misses). All four pacing shapes now give a directional message.
- Closeout: tested the 100 free prelim case; v2 is ready. To deploy v2 (test version) commit `v2.html` to SwimApp (overwrites old `v2.html`; `index.html`/v1 untouched). Promoting v2 → coaches = copy v2.html into index.html + switch key back to `pacer_saved_v1` (NOT done yet — coaches still on v1).
- TODO carried: real training prescriptions per diagnosis (coach to provide); polish; broader race testing (other events/shapes); then promote v2 → index.html when ready.

<!-- Add a new dated entry each session: what changed, decisions, and any new TODOs. -->
