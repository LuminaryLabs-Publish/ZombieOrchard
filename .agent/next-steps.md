# Next steps - ZombieOrchard

**Timestamp:** `2026-07-13T13-01-03-04-00`

## Summary

Implement one browser startup authority before relying on module evaluation as a safe boot path. Engine installation, DOM/context acquisition, listener ownership, diagnostics exposure, first simulation tick, rendering, failure fallback, retry, and scheduler adoption need stable identities and typed terminal results.

## Plan ledger

**Goal:** replace ambient startup side effects with one prepared, probed, atomically adopted generation.

- [ ] Define `StartupAttemptId`, `StartupGeneration`, and startup phases.
- [ ] Add a required DOM/capability manifest for `#world`, `#ui-root`, `#error-panel`, and Canvas2D.
- [ ] Prepare the engine and complete kit graph as a detached candidate.
- [ ] Return per-participant preparation receipts.
- [ ] Prepare canvas, HTML, diagnostics, and scheduler candidates without live publication.
- [ ] Run a non-committing engine and projection probe.
- [ ] Adopt every participant together or dispose every candidate.
- [ ] Publish `GameHost` only after accepted adoption.
- [ ] Keep gameplay ticks disabled until the accepted startup generation owns the scheduler.
- [ ] Add `StartupReadyResult`, `StartupFailureResult`, and `StartupRetirementResult`.
- [ ] Project failures through the DOM-only `#error-panel` path.
- [ ] Add bounded retry with stale-generation rejection.
- [ ] Publish `FirstStartupFrameAck`.
- [ ] Add source, dist, and Pages browser fixtures.

## Immediate safe ledge

1. Move startup orchestration into an explicit `startBrowserGame()` function.
2. Validate all required DOM nodes before engine or renderer adoption.
3. Treat `canvas.getContext("2d") === null` as a typed capability failure.
4. Prepare the engine and renderers before publishing globals or starting RAF.
5. Render one probe frame without advancing live gameplay.
6. Adopt the accepted generation and then publish `GameHost`.
7. Keep a minimal DOM-only failure projector independent of canvas and runtime state.
8. Ensure every candidate exposes disposal for listeners, callbacks, and references.
9. Gate the first live tick on accepted startup readiness.
10. Add fault injection for every startup participant.

## Target files

```txt
src/boot.js
src/start.js
src/game.js
src/kits/runtime.js
src/renderer/world-canvas.js
src/renderer/html-interface-renderer.js
src/startup/browser-startup-authority.js
src/startup/startup-results.js
tests/browser-startup.fixture.mjs
scripts/smoke-startup-browser.mjs
package.json
```

## Required fixtures

```txt
successful startup -> one accepted generation
missing canvas -> visible typed failure
missing UI root -> visible typed failure
Canvas2D unavailable -> visible typed failure
kit creation throws -> all candidates disposed
canvas probe throws -> no live tick or GameHost
HTML probe throws -> no live tick or GameHost
retry -> new generation; predecessor remains retired
successful adoption -> one scheduler owner
first visible frame -> matching StartupGeneration acknowledgement
source/dist/Pages -> equivalent terminal results
```

## Dependency order

```txt
startup identity and phases
  -> DOM/capability admission
  -> kit-graph and participant preparation
  -> projection probe
  -> atomic adoption or disposal
  -> diagnostics and scheduler publication
  -> first-frame acknowledgement
  -> source/dist/Pages proof
```

## Do not claim

Do not claim reliable startup, visible failure handling, cleanup, retry safety, first-frame readiness, or production readiness until the fixture matrix passes on `main`.