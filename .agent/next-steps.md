# Next steps - ZombieOrchard

**Timestamp:** `2026-07-15T02-38-45-04-00`

## Summary

Replace the one-step-per-RAF host loop with a monotonic clock sample, fixed-step accumulator, bounded catch-up budget, explicit visibility policy and render-once result. Keep external diagnostic ticking under the retained public-capability authority rather than mixing it into the production clock.

## Plan ledger

**Goal:** make equivalent wall-time traces produce equivalent gameplay state across callback rates while preserving responsive rendering and bounded work.

- [ ] Define `HostFrameId`, `ClockRevision` and `SimulationStepId`.
- [ ] Accept the RAF timestamp and validate monotonicity.
- [ ] Derive and clamp wall delta.
- [ ] Add a fixed-step accumulator.
- [ ] Set an explicit fixed-step duration.
- [ ] Bound catch-up steps per host frame.
- [ ] Report deferred and dropped time.
- [ ] Define hidden-tab suspend/reduced/continue policy.
- [ ] Reset or settle accumulator debt on resume.
- [ ] Render Canvas2D and HTML once from the latest accepted snapshot.
- [ ] Bind both renderer receipts to one state revision.
- [ ] Publish `HostFrameResult` and `FirstClockBoundVisibleFrameAck`.
- [ ] Reject stale callbacks after host retirement.
- [ ] Keep production external tick disabled or separately leased.
- [ ] Add 30/60/120 Hz, stall, hide/resume, dist and Pages fixtures.
- [ ] Retain clean-run, public capability and frame-coherence work.

## Immediate implementation ledge

1. Change `draw()` to receive the RAF timestamp.
2. Store the first timestamp without synthesizing elapsed wall time.
3. Accumulate a clamped wall delta.
4. Execute at most the configured fixed-step budget.
5. Render once after zero or more accepted steps.
6. Clear stale timestamp debt on visibility resume.
7. Expose timing diagnostics without exposing mutable clock internals.
8. Add synthetic callback-trace fixtures before publishing claims.

## Target files

```txt
src/start.js
src/kits/runtime.js
src/host/raf-clock-authority.js
src/host/visibility-clock-policy.js
src/renderer/world-canvas.js
src/renderer/html-interface-renderer.js
tests/raf-clock.fixture.mjs
scripts/smoke-raf-clock-browser.mjs
package.json
```

## Required fixtures

```txt
30, 60 and 120 Hz traces produce equal fixed-step counts for equal wall time
pressure and damage results match across traces
long frames respect catch-up budget
excess time is reported
hidden tab follows declared policy
resume applies no stale unbounded debt
zero-step frame does not mutate gameplay
multi-step host frame renders once
Canvas2D and HTML cite the same state revision
retired host rejects late callback
source, dist and Pages behavior match
```

## Do not claim

Do not claim refresh-rate independence, deterministic wall-time behavior, catch-up correctness, hidden-tab safety, visible-frame convergence, artifact parity or production readiness until the complete fixture matrix passes on `main`.