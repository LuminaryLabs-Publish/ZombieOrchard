# Next steps - ZombieOrchard

**Timestamp:** `2026-07-13T07-41-11-04-00`

## Summary

Implement one immutable frame envelope and one dual-surface commit authority before relying on the canvas and HTML as a coherent presentation. Runtime publication, both renderers, diagnostics, and scheduler recovery need stable identities and typed terminal results.

## Plan ledger

**Goal:** replace sequential ambient rendering with one revisioned presentation transaction covering observers, canvas, HTML, recovery, diagnostics, and visible acknowledgement.

- [ ] Define `RuntimeSessionId`, `RunGeneration`, `StateRevision`, and `PublicationId`.
- [ ] Capture one detached immutable `FrameEnvelope` per accepted runtime transition.
- [ ] Stop re-snapshotting between subscriber publication and browser rendering.
- [ ] Add `FrameEnvelopeId` and canonical `FrameFingerprint`.
- [ ] Add canvas surface, viewport, and projection revisions.
- [ ] Add HTML surface, route, and projection revisions.
- [ ] Define route-specific world-canvas visibility policy.
- [ ] Prepare both surface candidates against the same frame envelope.
- [ ] Return typed canvas and HTML projection results.
- [ ] Add `DualSurfaceFrameCommitResult` classifications.
- [ ] Preserve or recover the last complete frame after partial failure.
- [ ] Keep successor RAF scheduling and error recovery explicit.
- [ ] Replace fresh-state diagnostics with last-complete-visible-frame readback.
- [ ] Publish `FirstDualSurfaceFrameAck`.
- [ ] Add Node model, source-browser, dist-browser, and Pages fixtures.

## Immediate safe ledge

1. Add runtime metadata to a detached frame envelope rather than every domain snapshot.
2. Capture the envelope once after domain mutation and ticking.
3. Pass that exact envelope to subscribers and both renderers.
4. Make each renderer return `{ accepted, applied, surfaceRevision, frameEnvelopeId, reason }`.
5. Add explicit route-to-canvas visibility policy.
6. Record both surface results before scheduling the next frame.
7. Retain the previous complete frame when either projection fails.
8. Add `GameHost.getVisibleFrame()` using detached frame evidence.
9. Add a reentrant-subscriber fixture.
10. Add partial-render and scheduler-recovery fixtures.

## Target files

```txt
src/kits/runtime.js
src/start.js
src/renderer/world-canvas.js
src/renderer/html-interface-renderer.js
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
one transition -> one immutable frame envelope
subscriber and renderers -> same envelope ID/fingerprint
reentrant subscriber -> no publication/render divergence
canvas + HTML success -> complete result
canvas success + HTML failure -> typed partial result and continued scheduler
canvas failure -> explicit HTML degradation result
stale route/viewport/surface -> zero-mutation rejection
menu and outcome routes -> declared world visibility
GameHost visible readback -> last complete frame
source/dist/Pages -> equivalent envelope and receipts
```

## Dependency order

```txt
runtime session and command identity
  -> immutable state publication
  -> frame envelope identity and fingerprint
  -> route, viewport, and surface revisions
  -> per-surface preparation results
  -> dual-surface commit and recovery
  -> visible diagnostics and acknowledgement
  -> source/dist/Pages proof
```

## Do not claim

Do not claim canvas/HTML parity, atomic presentation, partial-frame recovery, route/world coherence, visible diagnostics correctness, or production readiness until the fixture matrix passes on `main`.