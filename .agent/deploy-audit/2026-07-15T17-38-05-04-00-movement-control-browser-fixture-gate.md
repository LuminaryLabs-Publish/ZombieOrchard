# Deploy audit: movement-control browser fixture gate

**Timestamp:** `2026-07-15T17-38-05-04-00`

## Summary

The current Node smoke proves entry routing and apple presence only. It does not construct a browser input environment or prove that a player can move, enter proximity range, collect, clear, cancel held input, or observe the matching frame in source, dist, or Pages output.

## Plan ledger

**Goal:** block movement-control readiness claims until the same control and frame contract passes in source, built artifact, and deployed origin.

- [x] Inspect the current smoke test.
- [x] Confirm movement assertions are absent.
- [x] Define required fixture classes.
- [ ] Execute the fixture matrix.

## Required fixtures

```txt
headless command fixture
  -> move within bounds
  -> clamp at bounds
  -> stale position rejection

browser keyboard fixture
  -> press, hold, release, blur cancellation
  -> approach apple and collect
  -> approach pest and clear

browser touch fixture
  -> visible controls
  -> pointer cancellation
  -> overlay arbitration

browser gamepad fixture
  -> dead zone and release

hybrid fixture
  -> duplicate suppression and producer switching

presentation fixture
  -> MovementResult revision matches Canvas2D frame

artifact fixture
  -> source and dist parity

Pages fixture
  -> deployed-origin movement and lifecycle smoke
```

## Gate

Do not claim player-control completeness, proximity-loop playability, artifact parity, deployed parity, or production readiness until every required fixture passes against the same revision.
