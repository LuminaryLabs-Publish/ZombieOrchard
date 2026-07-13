# Validation - ZombieOrchard

**Timestamp:** `2026-07-13T01-18-20-04-00`

## Scope

Documentation-only audit of runtime event creation, mutable buffering, command accumulation, tick clearing, snapshot omission, subscriber omission, renderer omission, public readback and central tracking. Runtime source, dependencies, gameplay, rendering and deployment configuration were not changed.

## Plan ledger

**Goal:** record exact source evidence and executable proof required before event-lifecycle correctness claims are made.

- [x] Read `src/kits/runtime.js`.
- [x] Confirm `ctx.emit()` writes mutable records into `ctx.events`.
- [x] Confirm command does not clear or publish the event buffer.
- [x] Confirm tick clears events before domain ticks.
- [x] Confirm `engine.snapshot()` omits events.
- [x] Read `src/kits/scoped-interface-domains.js` and confirm event emitters.
- [x] Read `src/kits/composition.js` and confirm nested command potential.
- [x] Read `src/start.js` and both renderers.
- [x] Confirm browser rendering and `GameHost.getState()` consume event-free snapshots.
- [x] Confirm raw engine context remains publicly mutable.
- [x] Add timestamped audits and root routing.
- [x] Update the central repo ledger and internal change log.
- [x] Push documentation only to `main` without a branch or pull request.
- [ ] Implement and run event-lifecycle fixtures.

## Source-backed findings

```txt
src/kits/runtime.js
  -> one mutable ctx.events array
  -> event shape has type, payload, frame and elapsed only
  -> command events accumulate
  -> tick clears the entire array before domain ticks
  -> snapshot excludes ctx and events

src/kits/scoped-interface-domains.js
  -> select emits <domain>.selected
  -> set-field emits <domain>.fieldChanged
  -> activate emits <domain>.actionRequested

src/kits/composition.js
  -> child activate may emit directly
  -> nested engine.command may follow
  -> no shared command/event causal envelope

src/start.js and renderers
  -> tick precedes rendering
  -> renderers receive domain snapshots only
  -> GameHost.getState returns domain snapshots only
  -> raw engine remains exposed
```

## Deterministic observations

```txt
implemented kit surfaces: 27
engine-installed kits: 19
host/support kits: 8
event buffers: 1 mutable array
event IDs: 0
event sequences: 0
command/tick correlations: 0
snapshot event ranges: 0
consumer cursors: 0
event acknowledgement fixtures: 0
```

## Required fixtures

```txt
command event identity
multi-command ordering before one tick
command-event retention across tick admission
tick-event publication
payload immutability
bounded retention and overflow
consumer cursor and acknowledgement
public readback isolation
event-to-snapshot range
event-to-visible-frame acknowledgement
source/dist/Pages parity
```

## Validation result

```txt
runtime source changed: no
dependencies changed: no
package scripts changed: no
gameplay behavior changed: no
canvas behavior changed: no
HTML behavior changed: no
deployment changed: no
branch created: no
pull request created: no

npm test: not run
npm run build: not run
event lifecycle fixtures: unavailable / not run
browser event smoke: unavailable / not run
Pages event smoke: unavailable / not run
```

No event-retention, ordering, immutability, acknowledgement, replay or visible-frame parity claim is made.
