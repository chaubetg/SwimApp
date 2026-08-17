# Split Compass

**Race splits from real data — for the pool deck.** Record a swim, see how it was actually
paced against a model built from elite race analysis, and take pace targets to practice.

**→ [splitcompass.app](https://splitcompass.app)**

No account, no sign-up, no server. It works offline once loaded and installs to a phone's home
screen like a native app.

---

## Two versions

Opening the link asks one question first: coach or swimmer. It remembers the answer and goes
straight there next time, and a **Switch version** link in the app changes it back.

### For coaches

A whole squad. Record races against each swimmer and build a history — best times, a progress
chart per event, a ranking by World Aquatics points, and a side-by-side against their best or
their previous swim. Set target times and get the splits to hit them. Import a season of
results from a Hy-Tek CSV rather than typing them in.

**Training Pace** is the one built specifically for the deck: pick a pool and a distance and
get one table of every swimmer with a recorded time in it, grouped by stroke, filterable by
sex, downloadable as a spreadsheet or a PDF.

```
Swimmer      Target        1st 50   2nd 50  1st 25  2nd 25  3rd 25  4th 25
Alex Chen    52.00 (FR)     24.83    27.17   11.93   12.91   13.05   14.12
Mia Brown    58.40 (FR)     28.03    30.37   13.60   14.43   14.73   15.64
```

Targets come from each swimmer's best time, or their most recent — your choice.

**Team vs standards** answers the September question: pick an event and see every swimmer who
has raced it, ranked, with how far each one is from each qualifying cut. Canada, World and
Rudolph points are toggles rather than tabs, so you can put a U SPORTS cut beside an Olympic B
beside a 1–20 age-graded score in the same row. Under the cut shows green; a comparison that
crossed courses is marked as an estimate.

```
Swimmer           Best     Trials Sen   U SPORTS   Rudolph
Men · cut                       51.09      49.60         20
Tegan O Neill    50.62          −0.47     ~−0.70         14
Marcus Delacroix 52.91          +1.82     ~+1.51         13
```

### For swimmers

One athlete: your own races and splits, your target times, your best times and how they are
trending. No roster, no search, nothing to set up beyond your name.

Optionally, a **race journal**. At setup you choose "just my splits" or "splits + reflect on my
races". If you choose to reflect, three collapsible sections appear under each race — race and
technique, nutrition, and where your head was — with four questions each and a confidence
rating you can watch across a season. Every question is optional and none of it ever stops you
saving a race. The last question of each section shows what you wrote after your previous race,
so you can see whether you actually did the thing you said you would.

---

## Where the numbers come from

The split shapes are derived from published race analysis of elite finals — World Championships
and Olympic finals, per event, sex and course. For each event the model holds a median split
shape plus a 25th/75th-percentile band, so a prediction is a *range* rather than a single
number: the band is how differently real finalists swimming the same time have distributed
their effort.

The short-course 25 m marks are measured, not borrowed. They come from every clean race across
three 2025 World Cup stops — **1,201 races for the 100 SCM** and **1,004 for the 200 SCM**,
after filtering to swims whose incremental 25s actually sum to the official time. Before that,
the 100's quarter splits were estimated by applying the 50 m shape to each lap; replacing that
with real data cut the error at the 75 m mark from 0.43–1.22 s to 0.09–0.12 s.

What this means in practice: a swimmer outside the band is not wrong, but they are pacing the
race differently from how finalists at that speed usually do, which is worth a conversation.

**One honest limitation.** The model describes elite finals. A developmental swimmer's optimal
shape may legitimately differ. Treat the bands as a reference, not a rule.

World Aquatics points use the official formula, **P = 1000 × (B/T)³**, with the published base
times. The time-for-points calculation is verified against the official tables.

---

## Your data stays on your device

Everything is stored in your browser's local storage, on the device you used. It is never
uploaded, and there is no server to upload it to — this is a static page.

That is a real privacy guarantee, and it comes with real consequences:

- Data does **not** sync between your phone and your laptop. They are separate records.
- Clearing your browser data, or "Clear website data" on iOS, deletes it.
- **Install it to your home screen.** Safari clears script-writable storage after about seven
  days of not visiting a site. A home-screen app is exempt from that; a browser tab is not.
- Use **Back up** to write a file you keep, and **Restore** to load it on a new phone.

Every screen that shows times also downloads as a CSV, so nothing here is a lock-in.

## Install it on a phone

**iPhone / iPad** — open in Safari, tap **Share**, scroll down, **Add to Home Screen**.

**Android** — open in Chrome, tap **⋮**, then **Add to Home screen**, then **Install app**. If
Chrome offers to install it for you, take that instead. ("Create shortcut" is not the same
thing — it only opens a tab, and it does not protect your data.)

It then opens full-screen without browser chrome, and works with no connection.

---

## Feedback

Built and used by a university swim coach. If something is wrong, unclear, or missing —
particularly if a prediction disagrees with what you see on the pool deck — please open an
issue. Real race data that contradicts the model is the most useful thing you can send.

## Licence

© 2026 Gaël Chaubet. All rights reserved. Free to use for coaching; not licensed for
redistribution or commercial resale.
