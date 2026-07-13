# Next steps - ZombieOrchard

**Timestamp:** `2026-07-13T01-18-20-04-00`

## Summary

Add event lifecycle authority before events are used for UI effects, audio, persistence, telemetry, editor tooling or replay. Every event needs stable identity, causal provenance, an immutable payload, bounded retention and an explicit terminal delivery result.

## Plan ledger

**Goal:** replace the ambient mutable `ctx.events` array with a revisioned event journal and consumer contract.

- [ ] Define `EventId`, monotonic `EventSequence` and predecessor sequence.
- [ ] Correlate every event with command ID, tick ID, runtime session and run generation.
- [ ] Clone or freeze payloads at emission.
- [ ] Define snapshot `eventRange` and journal fingerprint.
- [ ] Add bounded retention and explicit overflow policy.
- [ ] Define consumer IDs, generations and cursors.
- [ ] Publish event ranges with immutable snapshot envelopes.
- [ ] Add typed accepted, delivered, skipped, expired, overflowed and dead-letter results.
- [ ] Keep committed command/tick results independent from event delivery.
- [ ] Prevent raw public mutation of the live event journal.
- [ ] Correlate event-driven presentation with first visible frame acknowledgement.
- [ ] Add Node, browser, dist and Pages fixtures.

## Immediate safe ledge

1. Replace `ctx.events.length = 0` with a journal advancement operation.
2. Add a monotonic sequence to `ctx.emit()`.
3. Clone payloads before storing them.
4. Include `{firstSequence, lastSequence}` in each published snapshot envelope.
5. Expose read-only event readback instead of `engine.ctx.events`.
6. Track one cursor for each consumer.
7. Define retention until every required consumer advances or the event expires.
8. Return explicit overflow results instead of silently dropping.
9. Add a command-event fixture covering two commands before one RAF tick.
10. Add source/dist/Pages parity proof.

## Target files

```txt
src/kits/runtime.js
src/kits/scoped-interface-domains.js
src/kits/composition.js
src/start.js
src/game.js
src/renderer/world-canvas.js
src/renderer/html-interface-renderer.js
src/kits/runtime-event-lifecycle.js
tests/event-command.fixture.mjs
tests/event-order.fixture.mjs
tests/event-retention.fixture.mjs
tests/event-overflow.fixture.mjs
scripts/smoke-event-lifecycle-browser.mjs
package.json
```

## Required fixtures

```txt
one command event -> stable ID, sequence and command correlation
two commands before tick -> both retained in causal order
next tick -> no silent command-event deletion
tick-emitted event -> published in matching event range
payload mutation after emit -> stored event remains unchanged
unknown consumer -> rejected
consumer cursor advancement -> deterministic retention
retention overflow -> typed result and bounded memory
public readback mutation attempt -> engine journal unaffected
event-driven visual effect -> matching first visible frame acknowledgement
source/dist/Pages -> equivalent results
```

## Do not claim

Do not claim event delivery, order, retention, replayability, consumer convergence or visible-effect parity until the fixture matrix passes on `main`.
