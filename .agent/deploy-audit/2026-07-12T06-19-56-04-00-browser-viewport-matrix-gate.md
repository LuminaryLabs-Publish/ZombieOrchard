# Deploy audit: browser viewport matrix gate

**Timestamp:** `2026-07-12T06-19-56-04-00`

## Goal

Define the proof required before the static build and Pages deployment can claim stable canvas sizing and viewport-safe gameplay.

## Existing pipeline

```txt
npm test
  -> Node engine smoke only

npm run build
  -> copy index.html and src/ into dist/

Pages
  -> serve static artifact
```

The current smoke never creates a browser canvas and cannot validate CSS size, DPR, physical allocation, world fit or visible-frame receipts.

## Required browser matrix

```txt
viewports:
  320x568
  568x320
  768x1024
  1024x768
  1280x720
  1920x1080

DPR:
  1
  1.5
  2
  3 with bounded fallback

transitions:
  resize storm
  orientation change
  zoom/device-scale change
  zero-area hide/show
  unchanged frame sequence
```

## Assertions

- CSS and physical dimensions are both reported.
- Applied DPR never exceeds policy or pixel budget.
- Unchanged frames do not rewrite the drawing buffer.
- Stale resize results cannot replace a newer surface.
- Required player, pest and apple membership follows the named projection policy.
- The first frame after a commit cites the new surface revision.
- Built artifact and Pages behavior match source behavior.

## Gate

```txt
source fixture
  -> built-artifact browser fixture
  -> Pages browser smoke
  -> surface/frame receipt comparison
```

Until this matrix passes, deployment validates file delivery only, not canvas resolution or gameplay visibility.