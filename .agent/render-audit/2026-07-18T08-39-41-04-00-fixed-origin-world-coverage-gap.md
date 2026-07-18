# Render audit: fixed-origin world coverage gap

**Timestamp:** `2026-07-18T08-39-41-04-00`

## Source path

`src/renderer/world-canvas.js` computes:

```txt
w = canvas.clientWidth || window.innerWidth
h = canvas.clientHeight || window.innerHeight
screenX = w / 2 + entity.x
screenY = h / 2 + entity.y
```

The active-session player is clamped to `x = -360..360` and `y = -280..280`. The renderer does not apply camera translation, camera follow, world-fit scale, viewport clamp or safe-area insets.

## Coverage evidence

```txt
playable world size: 720 x 560

320 x 568 viewport
  horizontal coverage: 44.4%
  player edge overshoot: 200 px

375 x 667 viewport
  horizontal coverage: 52.1%
  player edge overshoot: 172.5 px

640 x 480 viewport
  vertical coverage: 85.7%
  player edge overshoot: 40 px
```

Trees reach `x = +/-320`; apple placement can extend approximately 17 units beyond a tree center. Pests spawn on an ellipse reaching roughly `x = +/-360` and `y = +/-280`.

## Missing render contract

```txt
viewport generation
camera generation
projection scale
world-fit or follow policy
camera clamp result
safe-area result
HUD occlusion result
entity visibility classification
world frame digest
FirstCameraBoundFrameAck
```

## Required proof

- Portrait viewport keeps the player and interaction focus visible.
- Small landscape viewport uses a documented fit/follow policy.
- Resize settles one accepted camera generation.
- Source, `dist`, artifact and Pages origins produce the same camera digest.
- The first rendered frame acknowledges the accepted viewport and camera generation.

No visible production incident was reproduced. This is a source-backed coverage and executable-proof gap.
