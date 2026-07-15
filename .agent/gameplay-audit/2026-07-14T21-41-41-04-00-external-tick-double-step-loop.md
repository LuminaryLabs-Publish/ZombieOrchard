# Gameplay audit: external tick double-step loop

**Timestamp:** `2026-07-14T21-41-41-04-00`

## Summary

A public manual tick updates pressure, active-session pests, damage and every other ticking domain outside the RAF. The next RAF immediately performs another fixed step. The external caller cannot bind the step to route, pause, run generation or one visible result.

## Plan ledger

**Goal:** make external stepping explicit, test-scoped and single-settlement rather than an ambient second scheduler.

- [x] Trace public tick to `engine.tick()`.
- [x] Confirm every domain tick is invoked.
- [x] Confirm pressure and active-session can mutate.
- [x] Confirm RAF performs an additional fixed step.
- [ ] Disable production external ticking by default.
- [ ] Require a versioned debug/test lease.
- [ ] Add exact-step and stale-lease fixtures.

## Current loop

```txt
public tick request
  -> dt accepted after numeric clamp
  -> runtime frame advances
  -> pressure advances
  -> night pest spawn and movement may advance
  -> player damage may advance
  -> subscribers are notified
  -> no visible frame is committed

next RAF
  -> all ticking domains advance again
  -> later state is rendered
```

## Missing policy

```txt
caller identity
external-tick lease
production/test mode
expected runtime frame
run generation
route eligibility
pause eligibility
maximum total debug steps
headless or visible classification
idempotent result
visible-frame acknowledgement
```

## Required result

`ExternalTickResult` must state whether the step was rejected, executed headlessly or executed with a required matching visible frame.

## Validation boundary

No gameplay behavior changed and no double-step browser reproduction was run.