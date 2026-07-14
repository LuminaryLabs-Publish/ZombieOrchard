# Render audit: stale predecessor world frame gap

**Timestamp:** `2026-07-14T16-41-33-04-00`

## Summary

Canvas2D always renders `orchard-world` and `active-session`, even when the HTML interface shows entry, setup, pause, settings, or outcome. Because a new run never replaces those snapshots, a second Play or Start can display predecessor trees, apples, player position, pests, damage, and outcome state.

## Plan ledger

**Goal:** require HTML and Canvas2D to adopt the same accepted successor generation and acknowledge the first frame before the run is considered visible.

- [x] Trace Canvas2D snapshot consumers.
- [x] Trace HTML route and session consumers.
- [x] Confirm neither renderer receives `RunGeneration`.
- [x] Confirm Canvas2D ignores the active interface route.
- [ ] Add generation-bound candidate projection and frame acknowledgement.

## Current frame path

```txt
RAF
  -> engine.tick(1/60)
  -> one snapshot object
  -> world.render(snapshot) always draws predecessor world/session
  -> ui.render(snapshot) draws current route
```

## Missing evidence

```txt
RunId and RunGeneration in render snapshots
candidate-versus-accepted render state
route-aware world visibility policy
predecessor frame retirement
HTML participant adoption receipt
Canvas2D participant adoption receipt
matching frame revision
FirstVisibleRunFrameAck
```

## Required result

The first accepted successor frame must prove that HTML route, HUD, resource values, player state, orchard state, and Canvas2D world all reference the same `RunGeneration`. A stale predecessor frame must not be publishable after successor adoption.