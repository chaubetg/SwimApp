UPLOAD EVERY FILE HERE TO THE SwimApp REPO **ROOT** (not as a subfolder).

  README.md                -> shown on the GitHub repo page (public-facing)
  index.html               -> chaubetg.github.io/SwimApp/   PUBLIC build
  pacer_19a0177a4f06.html  -> private FULL build (all tools)
  manifest.webmanifest     (Race Equation)
  manifest-v3.webmanifest  (Race Equation — Full)
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
  1. Bump `const CACHE = 'race-equation-vN'` in sw.js on every upload (the activate handler
     deletes every cache whose name differs, which is what forces the refresh).
  2. To check immediately: open in a private/incognito tab, which ignores the cache.
Current cache name: race-equation-v6

Regenerating the bundle after edits: run sync_deploy.py. It copies the private build, flips
those three lines to produce index.html, and refuses to run if the two files differ anywhere
else — so the two URLs can't silently drift apart.
