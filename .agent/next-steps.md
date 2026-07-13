# Next steps - ZombieOrchard

**Timestamp:** `2026-07-12T22-48-25-04-00`

## Summary

Add publication authority before using runtime subscriptions for UI, telemetry, editor tooling or persistence. A committed command or tick must produce one immutable, sequenced snapshot envelope whose delivery cannot be reordered or cancelled by observers.

## Plan ledger

**Goal:** replace ambient synchronous notification with ordered, fault-isolated publication.

- [ ] Define `PublicationId`, monotonic sequence and predecessor sequence.
- [ ] Add state, frame, elapsed, event-range and fingerprint metadata.
- [ ] Freeze or structurally clone each published snapshot envelope.
- [ ] Define `ObserverId`, generation and delivery cursor.
- [ ] Queue publication after mutation completes.
- [ ] Prevent nested delivery.
- [ ] Define whether reentrant mutations are rejected or queued.
- [ ] Continue delivery after observer exceptions.
- [ ] Return typed per-observer delivery results.
- [ ] Add duration and queue-depth budgets.
- [ ] Make unsubscribe and retirement idempotent.
- [ ] Separate committed mutation results from delivery results.
- [ ] Correlate canvas/HTML rendering with publication sequence.
- [ ] Add Node, browser, dist and Pages fixtures.

## Immediate safe ledge

1. Add a runtime `publishing` guard and FIFO publication queue.
2. Add a monotonic `publicationSequence`.
3. Wrap each listener call in `try/catch`.
4. Continue to later listeners after a failure.
5. Return the committed command result even when one observer fails.
6. Publish observer failures through a bounded diagnostic result.
7. Freeze the top-level snapshot and nested domain snapshots in development proof.
8. Reject or queue `command()`/`tick()` invoked during delivery.
9. Expose a read-only subscription gateway instead of the raw engine.
10. Add a two-observer reentrancy-order fixture.

## Required runtime flow

```txt
mutation accepted
  -> commit state and result
  -> allocate publication sequence
  -> create immutable envelope
  -> enqueue envelope
  -> drain only when not already delivering
  -> deliver sequence N to every active observer generation
  -> isolate and record observer failures
  -> finish sequence N before N+1
  -> render and acknowledge sequence N or a later coalesced sequence
```

## Target files

```txt
src/kits/runtime.js
src/start.js
src/game.js
src/renderer/world-canvas.js
src/renderer/html-interface-renderer.js
src/kits/runtime-observer-publication.js
tests/observer-order.fixture.mjs
tests/observer-fault.fixture.mjs
tests/observer-reentrancy.fixture.mjs
scripts/smoke-observer-publication-browser.mjs
package.json
```

## Required fixtures

```txt
two normal observers -> same immutable sequence
observer mutates envelope -> later observer remains unaffected
observer throws -> later observer still receives sequence
throw after command commit -> caller receives committed result plus delivery report
observer re-enters command -> successor publication queues after predecessor
observer re-enters tick -> no nested delivery or stack growth
unsubscribe during delivery -> explicit deterministic policy
slow observer -> budget result without silent order loss
browser frame -> matching publication sequence
source/dist/Pages -> equivalent results
```

## Do not claim

Do not claim observer order, immutable snapshots, delivery fault isolation, command retry safety or frame-loop liveness until the fixture matrix passes on `main`.
