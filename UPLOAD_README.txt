UPLOAD THESE TO THE SwimApp REPO **ROOT** (not as a subfolder).

On GitHub: SwimApp repo -> Add file -> Upload files -> drag the 7 files
below (NOT this whole folder, and NOT the folder itself) -> Commit.

Files (all go at the repo root, alongside each other):
  index.html                 <- V1 (public split predictor)  -> chaubetg.github.io/SwimApp/
  pacer_19a0177a4f06.html    <- V3 (private full build)
  manifest.webmanifest       <- V1 PWA identity ("Pacer")
  manifest-v3.webmanifest    <- V3 PWA identity ("Pacer+")
  sw.js                      <- shared service worker (must be at root)
  icon-192.png               <- app icon
  icon-512.png               <- app icon

Do NOT put these inside a folder in the repo — index.html and sw.js
must be at the root or the site + offline/install will break.

(This UPLOAD_README.txt is just a note for you — no need to upload it.)
