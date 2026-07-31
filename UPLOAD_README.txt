UPLOAD EVERY FILE HERE TO THE SwimApp REPO **ROOT** (not as a subfolder).

  README.md                -> shown on the GitHub repo page (public-facing)
  index.html               -> chaubetg.github.io/SwimApp/   PUBLIC build
  pacer_19a0177a4f06.html  -> private FULL build (all tools)
  manifest.webmanifest     (Swim Book)
  manifest-v3.webmanifest  (Swim Book — Full)
  sw.js                    (service worker — SEE THE WARNING BELOW)
  icon-192.png / icon-512.png

The two builds are ONE codebase and differ by exactly three lines: the PUBLIC_BUILD flag,
which manifest they load, and the <title>. Same site storage, so a swimmer saved in one
appears in the other.

  PUBLIC build  = Record Races + Split Predictor + Training Pace
  PRIVATE build = all of the above plus Course converter, Adjacent events, 50 m splits,
                  Efficiency tests and Squad targets

*** IF A CHANGE DOESN'T SHOW UP AFTER UPLOADING, IT IS ALMOST ALWAYS THE CACHE. ***
sw.js serves the cached copy if the network takes longer than 2.5 s, and an installed
home-screen app can keep the old build for days. Two fixes:
  1. Bump `const CACHE = 'swim-book-vN'` in sw.js on every upload (the activate handler
     deletes every cache whose name differs, which is what forces the refresh).
  2. To check immediately: open in a private/incognito tab, which ignores the cache.
Current cache name: whatever sw.js says — sync_deploy.py bumps it on every run

Regenerating after edits (since the 2026-07-31 consolidation, the private build HERE is the
editable source of truth): edit pacer_19a0177a4f06.html in this folder, run the tests, then
run  python3 outputs/sync_deploy.py  from the sw_database root. It regenerates index.html
from the private build (refusing to run if they'd differ beyond the three lines) and bumps
the sw.js cache. Never hand-edit index.html.
