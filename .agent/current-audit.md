# Current audit: ZombieOrchard

**Timestamp:** `2026-07-12T22-48-25-04-00`  
**Status:** `runtime-observer-publication-authority-audited`  
**Branch:** `main`

## Summary

The kit runtime commits domain mutation before calling `notify()`. `notify()` captures one snapshot and synchronously passes the same object to every listener. There is no publication sequence, observer identity, delivery queue, reentrancy guard, fault isolation, timeout budget or typed delivery result.

A listener can call `engine.command()` or `engine.tick()` while a predecessor publication is still being delivered. The nested mutation publishes a newer snapshot to all listeners, after which the predecessor loop resumes and can deliver its older snapshot to listeners that have not yet run. A listener can also throw after state committed, preventing later listeners and causing the caller to receive an exception instead of the committed command result.

## Plan ledger

**Goal:** define one ordered publication transaction from committed state through immutable snapshot delivery, observer results and visible-frame proof.

- [x] Compare current Publish inventory against central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only ZombieOrchard under the oldest eligible fallback.
- [x] Read boot, runtime, game composition, gameplay domains, renderers, preset and smoke proof.
- [x] Identify the complete interaction loop, active domains, 27 implemented kits and services.
- [x] Confirm snapshot delivery is synchronous and shares one object.
- [x] Confirm observer exceptions propagate after state mutation.
- [x] Confirm reentrant command/tick can invert observation order.
- [x] Confirm browser draw has no containment around `engine.tick()`.
- [ ] Implement and execute observer publication fixtures.

## Selection audit

```txt
ZombieOrchard      2026-07-12T20-31-27-04-00 selected
MyCozyIsland       2026-07-12T20-40-56-04-00
TheUnmappedHouse   2026-07-12T20-51-16-04-00
AetherVale         2026-07-12T21-15-06-04-00
TheOpenAbove       2026-07-12T21-31-40-04-00
IntoTheMeadow      2026-07-12T21-40-09-04-00
PhantomCommand     2026-07-12T22-15-00-04-00
PrehistoricRush    2026-07-12T22-18-39-04-00
HorrorCorridor     2026-07-12T22-29-30-04-00
TheCavalryOfRome   excluded
```

No new, ledger-missing or root-`.agent`-missing eligible repository was found.

## Complete interaction loop

```txt
browser module boot
  -> createOrchardGame()
  -> install 19 engine kits
  -> create canvas and HTML renderers
  -> expose raw engine through window.GameHost
  -> start recursive RAF

command path
  -> engine.command(domain, type, payload)
  -> domain mutates state
  -> runtime captures snapshot
  -> runtime synchronously invokes listeners
  -> caller receives result only after all listeners return

tick path
  -> clamp delta and advance frame/elapsed
  -> clear events
  -> tick every domain
  -> capture snapshot
  -> synchronously invoke listeners
  -> return a second snapshot to browser draw
  -> render canvas and HTML
  -> request successor RAF

reentrant observer path
  -> outer publication captures S1
  -> observer A invokes nested command
  -> nested publication captures S2 and delivers A then B
  -> outer publication resumes and delivers S1 to B
  -> B observes S2 before S1
```

## Source-backed findings

### Shared mutable delivery object

`notify()` computes `const snap = engine.snapshot()` once and passes that same object reference to every listener. It is not frozen, fingerprinted or cloned per observer. One listener can alter the projection received by later listeners.

### Reentrant delivery can regress observer order

Listeners run inside the mutation call stack. A listener can invoke `command()` or `tick()`, which immediately calls `notify()` again. The nested publication completes before the predecessor loop resumes, allowing later listeners to observe a successor snapshot before its predecessor.

### Observer failure hides a committed result

State mutation occurs before `notify()`. If a listener throws, the exception escapes `notify()`, `command()` or `tick()`. Later listeners do not run, yet the state remains mutated. A caller that retries can duplicate a command whose first commit actually succeeded.

### A subscriber can stop the visible loop

`draw()` calls `engine.tick()` before canvas and HTML rendering and has no error boundary. A throwing subscriber therefore aborts the frame after simulation committed, skips both renderers and prevents the successor RAF from being requested.

### Synchronous delivery has no work budget

A slow listener blocks command completion and the browser frame. There is no observer duration, queue depth, coalescing policy, backpressure result or retirement policy.

### Existing proof is absent

`tests/smoke.mjs` does not subscribe listeners. It cannot detect mutation of delivered snapshots, throwing observers, skipped observers, reentrant ordering, duplicate retry hazards or frame-loop termination.

## Domains in use

```txt
browser document, canvas, DOM, RAF and public GameHost
runtime registration, commands, ticks, events, snapshots, subscriptions and synchronous publication
11 generic scoped interface domains plus custom active-session
interface composition, nested dispatch, routing and automatic Outcome routing
runtime session, command/tick admission and observer publication
resource ledger and pressure field
orchard world, collection and refill
construction, roster and inventory
movement, phases, pest spawning, contact damage, clearing, score and failure
canvas world and HTML interface projection
Node smoke, static build, Pages deployment and central tracking
```

## Implemented kits

```txt
kit-runtime
scoped-interface-domain-kit
entry-domain-kit
session-select-domain-kit
run-setup-domain-kit
active-session-domain-kit
interrupt-domain-kit
construction-domain-kit
exchange-domain-kit
roster-domain-kit
inventory-domain-kit
knowledge-domain-kit
preferences-domain-kit
outcome-domain-kit
interface-composition-kit
resource-ledger-kit
pressure-field-kit
orchard-world-kit
construction-runtime-kit
roster-runtime-kit
inventory-runtime-kit
world-canvas-render-kit
html-interface-render-kit
game-host-diagnostics-kit
smoke-fixture-kit
static-build-copy-kit
pages-deploy-kit
```

## Offered services

| Kit group | Services |
|---|---|
| runtime | Registration, domain creation, commands, delta clamp, ticks, events, snapshots, subscriptions and synchronous publication |
| interface | Screen state, fields, selection, actions, routing, back navigation, nested dispatch and Outcome routing |
| gameplay | Resources, pressure, orchard collection/refill, construction, hiring, equipment, movement, phases, pests, damage, score and failure |
| render | Canvas trees, apples, player and pests; HTML route, HUD, cards and Outcome |
| diagnostics/proof/deploy | Raw engine publication, state readback, manual tick, Node smoke, static copy and Pages deployment |

## Required composed domain

`zombie-orchard-runtime-observer-publication-authority-domain`

## Required transaction

```txt
committed command or simulation step
  -> allocate publication ID and monotonic sequence
  -> capture state revision, frame, elapsed and event range
  -> build immutable SnapshotEnvelope and fingerprint
  -> enqueue delivery after the mutation stack unwinds
  -> prevent nested publication and classify reentrant mutations
  -> deliver in sequence to identified observer generations
  -> isolate exceptions and continue to remaining observers
  -> record duration, fault and backpressure results
  -> retire stale observers exactly once
  -> render one admitted publication
  -> acknowledge the first matching visible frame
```

## Candidate kits

```txt
runtime-publication-id-kit
runtime-publication-sequence-kit
snapshot-envelope-kit
snapshot-fingerprint-kit
snapshot-immutability-kit
observer-id-kit
observer-generation-kit
observer-subscription-kit
observer-cursor-kit
observer-delivery-queue-kit
observer-reentrancy-guard-kit
observer-mutation-admission-kit
observer-fault-isolation-kit
observer-delivery-result-kit
observer-backpressure-budget-kit
observer-retirement-kit
publication-journal-kit
publication-observation-kit
committed-command-result-kit
committed-tick-result-kit
first-publication-frame-ack-kit
observer-order-fixture-kit
observer-fault-fixture-kit
observer-reentrancy-fixture-kit
observer-source-dist-pages-parity-fixture-kit
```

## Runtime non-claims

No runtime source, gameplay behavior, rendering, package scripts or deployment configuration changed. No immutable delivery, monotonic observer order, reentrancy isolation, observer fault containment, retry safety or frame-loop liveness claim is made.
