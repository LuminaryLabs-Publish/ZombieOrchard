# Gameplay audit: first tick before readiness

**Timestamp:** `2026-07-13T13-01-03-04-00`

## Summary

The first call to `draw()` advances runtime and gameplay before the browser proves that either visible surface can render. A startup rendering failure can therefore mutate elapsed time, frame count, pressure, pest state, damage, route outcome, and events without ever presenting a successful frame.

## Plan ledger

**Goal:** keep gameplay dormant until one accepted startup generation owns a viable presentation and scheduler.

- [x] Trace `src/start.js` into `engine.tick(1 / 60)`.
- [x] Trace tick mutation across runtime and installed domains.
- [x] Confirm presentation occurs only after mutation.
- [x] Confirm no readiness predicate gates the first tick.
- [x] Confirm no rollback exists when first presentation fails.
- [ ] Add startup-gated simulation and fault-injection fixtures.

## Current loop

```txt
module evaluation
  -> engine installed
  -> renderers created
  -> GameHost exposed
  -> draw()
  -> tick frame 1
  -> mutate gameplay
  -> render canvas
  -> render HTML
```

## Gameplay consequences

```txt
Canvas2D failure after tick
  -> frame and elapsed already advanced
  -> passive pressure already changed
  -> night pest admission may already have occurred
  -> existing pests may already have moved or damaged the player
  -> Outcome routing may already have changed
  -> no visible frame proves the transition

retry by page reload
  -> constructs a separate random orchard/run
  -> no failed-attempt identity or recovery receipt
```

## Required gameplay policy

```txt
startup phase Preparing or Probing
  -> no live simulation ticks

startup phase Ready
  -> scheduler receives accepted generation
  -> first live tick follows FirstStartupFrameAck or declared readiness policy

startup phase Failed
  -> candidate runtime disposed or retained as inert diagnostic evidence
  -> no gameplay mutation
```

## Fixtures

```txt
Canvas2D unavailable -> zero live ticks
UI root missing -> zero live ticks
kit installation failure -> zero live ticks
canvas probe throws -> zero live ticks
HTML probe throws -> zero live ticks
successful startup -> exactly one admitted scheduler generation
retry after failure -> predecessor candidate cannot tick
```

## Validation boundary

No gameplay or runtime behavior changed.