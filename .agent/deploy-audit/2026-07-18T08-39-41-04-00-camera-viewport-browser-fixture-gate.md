# Deploy audit: camera and viewport browser fixture gate

**Timestamp:** `2026-07-18T08-39-41-04-00`

## Current proof

`tests/smoke.mjs` verifies entry state, the Play transition and the presence of orchard apples. It does not create a browser, resize a canvas, move the player, inspect projected coordinates or confirm a presented frame.

## Required gate

```txt
source server
  -> open supported viewport profile
  -> start active session
  -> move player to each world edge
  -> settle camera and projection
  -> assert player remains visible
  -> assert nearest interaction focus classification
  -> capture camera/projection digest
  -> acknowledge first matching frame

repeat for dist artifact
repeat for deployed Pages origin
compare digests and screenshots
```

## Minimum viewport matrix

```txt
320x568 portrait
375x667 portrait
640x480 landscape
800x600 baseline
1366x768 desktop
```

## Required assertions

- No valid player position is unintentionally outside the supported visible region.
- Camera clamp and scale classifications match policy.
- HUD and quick controls do not cover the tracked interaction focus without an explicit result.
- Rapid resize/orientation changes reject stale camera generations.
- Source, dist and Pages origins agree on projection policy and frame digest.

## Current status

Browser, screenshot, artifact and deployed-origin fixtures are unavailable and were not run. The execution environment also could not resolve `github.com` for a direct checkout, so local `npm test` and `npm run build` were not executed in this audit.
