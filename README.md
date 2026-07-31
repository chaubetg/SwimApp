# Swim Book

**A swim coach's race tool that runs in a browser.** Record a race, see how the swim was
actually paced against a model built from elite race analysis, and print pace targets for the
whole squad before practice.

**→ [chaubetg.github.io/SwimApp](https://chaubetg.github.io/SwimApp/)**

No account, no sign-up, no server. It works offline once loaded and installs to a phone's home
screen like a native app.

---

## The three tools

### Record Races
Enter a swim — event, meet, round, date, the time swum, and the splits if you have them. The
app compares each split against the predicted shape for that time and tells you where the race
was paced well and where it wasn't. Splits are optional: a total is a complete record on its
own, and if you enter all but one split the last is filled in for you.

Every race is saved against a swimmer, so you build a history: best times, a progress chart per
event, and a side-by-side comparison against their best or their previous swim.

### Split Predictor
Type a target time and get the split targets to hit it, with a fast/slow range around each.
Enter a World Aquatics points value instead and the target time is worked out for you.

### Training Pace
Pick a pool and a distance, and get one printable table of every swimmer who has a recorded
time in it — their target and their splits, grouped by stroke. Built for taking to the pool
deck on paper.

```
Swimmer      Target        1st 50   2nd 50  1st 25  2nd 25  3rd 25  4th 25
Alex Chen    52.00 (FR)     24.83    27.17   11.93   12.91   13.05   14.12
Mia Brown    58.40 (FR)     28.03    30.37   13.60   14.43   14.73   15.64
```

Targets come from each swimmer's best time, or their most recent — your choice.

---

## Where the predictions come from

The split shapes are derived from published race analysis of elite finals — World
Championships and Olympic finals, per event, sex and course. For each event the model holds a
median split shape plus a 25th/75th-percentile band, so a prediction is a *range* rather than
a single number: the band is how differently real finalists swimming the same time have
distributed their effort.

What this means in practice: a swimmer outside the band isn't wrong, but they are pacing the
race differently from how finalists at that speed usually do, which is worth a conversation.

Two honest limitations:

- **The model describes elite finals.** A developmental swimmer's optimal shape may legitimately
  differ. Treat the bands as a reference, not a rule.
- **Some numbers are estimates and are labelled as such.** A 100 SCM's 25 m marks are derived by
  applying the 50 m per-25 shape to each lap; they carry an asterisk and a footnote. The 50 s
  and the total sit exactly on the pacing table.

World Aquatics points use the official formula, **P = 1000 × (B/T)³**, with the published base
times. The time-for-points calculation is verified against the official tables.

---

## Your data stays on your device

Everything is stored in your browser's local storage on the device you used. It is never
uploaded, and there is no server to upload it to — this is a single HTML file served as a static
page.

Practical consequences worth knowing before you rely on it:

- Data does **not** sync between your phone and your laptop. They are separate records.
- Clearing your browser data, or "Clear website data" on iOS, deletes it.
- Use **Download CSV** on a swimmer to keep a copy you control.

## Install it on a phone

**iPhone / iPad** — open the link in Safari, tap Share, then *Add to Home Screen*.
**Android** — open in Chrome and accept the install prompt, or use *Add to Home screen*.

It then opens full-screen without browser chrome and works with no connection.

---

## Feedback

Built and used by a university swim coach. If something is wrong, unclear, or missing —
particularly if a prediction disagrees with what you see on the pool deck — please open an
issue. Real race data that contradicts the model is the most useful thing you can send.

## Licence

© 2026 Gaël Chaubet. All rights reserved. Free to use for coaching; not licensed for
redistribution or commercial resale.
