# Current audit: ZombieOrchard

**Timestamp:** `2026-07-12T23-00-53-04-00`  
**Status:** `runtime-observer-publication-authority-central-reconciled`  
**Branch:** `main`

## Summary

The kit runtime commits domain mutation before calling `notify()`. `notify()` captures one snapshot and synchronously passes the same object to every listener. There is no publication sequence, observer identity, delivery queue, reentrancy guard, fault isolation, timeout budget or typed delivery result.

A listener can call `engine.command()` or `engine.tick()` while a predecessor publication is still being delivered. The nested mutation publishes a newer snapshot to all listeners, after which the predecessor loop resumes and can deliver its older snapshot to listeners that have not yet run. A listener can also throw after state committed, preventing later listeners and causing the caller to receive an exception instead of the committed command result.

## Plan ledger

**Goal:** define one ordered publication transaction from committed state through immutable snapshot delivery, observer results and visible-frame proof.

- [x] Compare the current Publish inventory against central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only ZombieOrchard because its repo-local observer audit was newer than central state.
- [x] Read boot, runtime, game composition, gameplay domains, renderers, preset and smoke proof.
- [x] Identify the complete interaction loop, active domains, 27 implemented kits and services.
- [x] Confirm snapshot delivery is synchronous and shares one object.
- [x] Confirm observer exceptions propagate after state mutation.
- [x] Confirm reentrant command/tick can invert observation order.
- [x] Confirm browser draw has no containment around `engine.tick()`.
- [x] Add and route the central reconciliation family.
- [ ] Implement and execute observer publication fixtures.

## Selection audit

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

ZombieOrchard central: 2026-07-12T20-31-27-04-00
ZombieOrchard repo-local observer audit: 2026-07-12T22-48-25-04-00
selected for reconciliation: yes
```

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
  -> clear events and tick every domain
  -> capture snapshot and invoke listeners
  -> return a second snapshot
  -> render canvas and HTML
  -> request successor RAF

reentrant observer path
  -> outer publication captures S1
  -> observer A invokes nested command/tick
  -> nested publication captures S2 and delivers A then B
  -> outer publication resumes and delivers S1 to B
  -> B observes S2 before S1
```

## Source-backed findings

- `src/kits/runtime.js` stores listeners in one untyped `Set`, mutates before notification, captures one snapshot and passes it to every listener without `try/catch`, sequencing or a reentrancy fence.
- `src/start.js` calls `engine.tick()` before canvas and HTML rendering and schedules the successor RAF only after both renderers.
- A thrown observer can therefore hide an already committed result, skip later observers, skip both renderers and stop future RAF scheduling.
- `tests/smoke.mjs` does not register subscribers and cannot detect mutation, throw, reentrancy, ordering or liveness failures.

## Domains in use

```txt
browser document, canvas, DOM, RAF and public GameHost
runtime registration, commands, ticks, events, snapshots, subscriptions and publication
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
| interface | Screen state, fields, selection, actions, routing, Back, nested dispatch and Outcome routing |
| gameplay | Resources, pressure, orchard collection/refill, construction, hiring, equipment, movement, phases, pests, damage, score and failure |
| render | Canvas trees, apples, player, pests and built objects; HTML route, HUD, cards and Outcome |
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
  -> preserve committed command/tick result independently
  -> render one admitted publication
  -> acknowledge the first matching visible frame
```

## Runtime non-claims

No runtime source, gameplay behavior, rendering, package scripts or deployment configuration changed. No immutable delivery, monotonic observer order, reentrancy isolation, observer fault containment, retry safety or frame-loop liveness claim is made.