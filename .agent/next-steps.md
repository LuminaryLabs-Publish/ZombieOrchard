# Next steps - ZombieOrchard

**Timestamp:** `2026-07-13T03-59-28-04-00`

## Summary

Add a shared frame envelope and dual-surface commit authority before relying on the canvas and HTML as one coherent presentation. The runtime, canvas, HTML, diagnostics, and scheduler need stable identities and typed terminal results.

## Plan ledger

**Goal:** replace sequential ambient rendering with one revisioned presentation transaction covering both visible surfaces.

- [ ] Define `StateRevision`, `PublicationId`, `FrameEnvelopeId`, and `FrameFingerprint`.
- [ ] Capture one immutable frame envelope per accepted command or tick.
- [ ] Stop re-snapshotting between subscriber publication and browser rendering.
- [ ] Add canvas surface identity, viewport revision, and projection revision.
- [ ] Add HTML surface identity, route revision, and projection revision.
- [ ] Define explicit world visibility policy for menu, gameplay, interrupt, and outcome routes.
- [ ] Prepare canvas and HTML candidates against the same frame envelope.
- [ ] Return typed canvas and HTML projection results.
- [ ] Add one `DualSurfaceFrameCommitResult` with complete, partial, failed, stale, and superseded classifications.
- [ ] Keep successor RAF scheduling and recovery independent from projection faults.
- [ ] Expose the last visibly committed frame envelope through `GameHost`.
- [ ] Publish `FirstDualSurfaceFrameAck`.
- [ ] Add Node model tests plus browser, dist, and Pages fixtures.

## Immediate safe ledge

1. Add runtime metadata to a detached frame envelope rather than to each domain snapshot.
2. Capture the envelope once after domain ticks.
3. Pass that exact envelope to subscribers and both renderers.
4. Make each renderer return `{accepted, surfaceRevision, frameEnvelopeId, reason}`.
5. Define route-based canvas visibility explicitly.
6. Record canvas and HTML results before requesting the next RAF.
7. Preserve the last complete frame when one projection fails.
8. Make `GameHost.getVisibleFrame()` return the committed envelope and both surface receipts.
9. Add a reentrant-subscriber fixture proving publication and rendering share one envelope.
10. Add a partial-render fixture proving failure is classified and the RAF continues.

## Target files

```txt
src/kits/runtime.js
src/start.js
src/renderer/world-canvas.js
src/renderer/html-interface-renderer.js
src/styles.css
src/kits/frame-envelope.js
src/kits/dual-surface-frame-authority.js
tests/frame-envelope.fixture.mjs
tests/dual-surface-parity.fixture.mjs
tests/partial-frame-recovery.fixture.mjs
scripts/smoke-dual-surface-browser.mjs
package.json
```

## Required fixtures

```txt
one tick -> one immutable frame envelope
subscriber and renderers -> same frame envelope ID and fingerprint
reentrant subscriber -> no publication/render divergence
canvas success + HTML success -> complete frame result
canvas success + HTML failure -> typed partial result and continued RAF
canvas failure -> HTML policy and recovery result explicit
menu route -> world-canvas visibility follows declared policy
outcome route -> canvas and HTML cite same state revision
GameHost visible readback -> matches last complete frame
source/dist/Pages -> equivalent envelope and surface receipts
```

## Dependency order

```txt
runtime session and command identity
  -> immutable state publication
  -> frame envelope identity and fingerprint
  -> per-surface projection identities and results
  -> dual-surface commit and recovery
  -> visible diagnostics readback
  -> source/dist/Pages proof
```

## Do not claim

Do not claim canvas/HTML parity, atomic presentation, visible diagnostics correctness, partial-frame recovery, route/world coherence, or visible-frame acknowledgement until the fixture matrix passes on `main`.
