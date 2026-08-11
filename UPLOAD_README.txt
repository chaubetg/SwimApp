UPLOAD EVERY FILE HERE TO THE SwimApp REPO **ROOT** (not as a subfolder).

ALL THREE BUILDS SHARE ONE FOLDER AND ONE REPO. Do not split them.
They must sit on the SAME ORIGIN (chaubetg.github.io/SwimApp/) because browser
storage is per-origin: a swimmer's races live in that origin's localStorage. Put
the swimmer build on a different repo or domain and it becomes a separate island
that can never see the coach build's data, and you'd need a second service
worker, second icon set and second manifest to maintain.


THE FILES
---------
  index.html                   FRONT DOOR "coach or swimmer?" -> the link you share
  coach.html                   COACH app        -> .../coach.html
  swimmer.html                 SWIMMER app      -> .../swimmer.html
  pacer_19a0177a4f06.html      PRIVATE full build (every tool)
  sw.js                        service worker — SEE THE CACHE WARNING BELOW
  manifest.webmanifest         coach app identity (start_url coach.html)
  manifest-swimmer.webmanifest swimmer app identity
  manifest-v3.webmanifest      private build identity
  icon-192.png / icon-512.png  app icon (both sizes referenced)
  .nojekyll                    empty file; stops GitHub Pages running Jekyll
  README.md                    shown on the GitHub repo page (optional)

The three builds are ONE codebase generated from pacer_19a0177a4f06.html. Each
differs from it by exactly three lines: the <title>, which manifest it loads, and
one flag —  const BUILD = 'private' | 'public' | 'swimmer'.

  PUBLIC  (index.html)   Record Races + Set target time + Training Pace, full roster
  PRIVATE (pacer_*.html) all of the above plus Course converter, Adjacent events,
                         50 m splits, Efficiency tests, Squad targets
  SWIMMER (swimmer.html) ONE athlete, their own races only: Record Races,
                         Set target time, best times, progress, backup.
                         No roster, no search, no Training Pace, no import.


WHAT TO UPLOAD, AND WHEN
------------------------
FIRST TIME / AFTER A LONG GAP:  upload everything above. Replace all.

EVERY NORMAL UPDATE — these four change on basically every build:
    coach.html
    swimmer.html
    pacer_19a0177a4f06.html
    sw.js                      <- the cache bump; without it nothing updates

  index.html (the front door) only changes when you edit chooser.html.

ONLY WHEN THEY CHANGE (rare, set-and-forget):
    the three manifests   — app name, icons, start_url
    icon-192 / icon-512   — new artwork
    .nojekyll             — once, ever
    README.md             — when you edit it


*** IF A CHANGE DOESN'T SHOW UP AFTER UPLOADING, IT IS ALMOST ALWAYS THE CACHE. ***
sw.js serves the cached copy if the network takes longer than 2.5 s, and an
installed home-screen app can keep the old build for days. Two fixes:
  1. Bump `const CACHE = 'split-compass-vN'` in sw.js on every upload. The activate
     handler deletes every cache whose name differs — that is what forces the
     refresh. sync_deploy.py does this bump for you automatically.
  2. To check immediately: open in a private/incognito tab, which ignores the cache.


THE COMMIT MESSAGE
-----------------
COMMIT_NOTES.txt (in the folder ABOVE this one, not in the repo) holds the
message for the NEXT upload, already written. Copy what sits between the ====
lines into GitHub's commit box. It is rewritten from scratch every time files
change here, so it always describes exactly what you are about to upload — the
running history stays in PACER_README.md.


REGENERATING AFTER EDITS
------------------------
The PRIVATE build in this folder is the editable source of truth. Never hand-edit
coach.html, swimmer.html or index.html — they are generated and your edits will be
overwritten. The front door's real source is chooser.html; edit that.

    edit SwimApp_deploy/pacer_19a0177a4f06.html
    node outputs/test_*.js                  (run the suites)
    python3 outputs/sync_deploy.py          (from the sw_database root)

sync_deploy regenerates coach.html AND swimmer.html from the private build, copies
chooser.html over index.html,
refuses to run if either would differ by more than its three allowed lines, and
bumps the sw.js cache.


DO NOT RENAME THE REPO
----------------------
The URL is the origin. Renaming SwimApp changes it, which (a) breaks every
already-installed home-screen app and (b) orphans everyone's saved data, since
localStorage is per-origin. If the name is ever going to change, it has to happen
before anyone installs it.
