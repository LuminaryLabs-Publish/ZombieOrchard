# Current audit: ZombieOrchard

**Timestamp:** `2026-07-12T04-38-12-04-00`  
**Status:** `frame-publication-fault-containment-authority-audited`  
**Branch:** `main`

## Summary

The runtime commits command or tick mutations before synchronous subscriber publication. `notify()` invokes every listener without isolation, so one throwing observer can prevent an accepted command result from returning or abort a browser frame after simulation has advanced. `draw()` schedules its successor RAF only after tick, world render, and HTML render complete, so any exception in those stages can permanently stop the loop.

## Plan ledger

**Goal:** define one post-commit publication and render-cycle authority that isolates observer failures, preserves command results, classifies render stages, guarantees explicit scheduling/recovery behavior, and correlates visible frames with committed state.

- [x] Compare the current Publish inventory with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Avoid newer unsynchronized work in `HorrorCorridor` and `PhantomCommand`.
- [x] Select only `ZombieOrchard` as the next-oldest stable eligible repository.
- [x] Inspect browser boot, raw public engine exposure, command/tick mutation, notification, snapshots, world rendering, HTML rendering, RAF scheduling, and smoke proof.
- [x] Identify the complete interaction loop, all domains, all 27 implemented kits, and offered services.
- [x] Confirm command mutation precedes subscriber invocation.
- [x] Confirm subscriber exceptions escape without delivery results or quarantine.
- [x] Confirm the next RAF is not scheduled when tick, notification, or rendering throws.
- [x] Define observer leases, delivery results, render-stage results, cycle results, recovery policy, bounded journals, and fixtures.
- [x] Add timestamped architecture and system-specific audits.
- [x] Refresh all required root `.agent` files and registry.
- [ ] Implement and execute fault-containment fixtures.

## Selection audit

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

HorrorCorridor
  central:    2026-07-12T02-49-19-04-00
  repo-local: 2026-07-12T04-28-03-04-00
  decision:   skip newer unsynchronized work

PhantomCommand
  central:    2026-07-12T03-00-46-04-00
  repo-local: 2026-07-12T04-18-44-04-00
  decision:   skip newer unsynchronized work

ZombieOrchard
  central:    2026-07-12T03-11-51-04-00
  repo-local: 2026-07-12T03-11-51-04-00
  decision:   selected next-oldest stable eligible repository
```

Only `LuminaryLabs-Publish/ZombieOrchard` is in scope for Publish changes.

## Complete interaction loop

```txt
module evaluation
  -> create engine and all domains
  -> create canvas and HTML renderers
  -> install delegated HTML click listener
  -> expose window.GameHost.engine/getState/tick
  -> call draw()

public observer path
  -> caller reaches GameHost.engine.subscribe(listener)
  -> listener is stored in runtime Set

command path
  -> engine.command(domainId, type, payload)
  -> domain.command mutates durable state
  -> runtime calls notify()
  -> runtime creates a snapshot
  -> runtime calls listeners in insertion order
  -> result returns only after all listeners complete

frame path
  -> engine.tick(1 / 60)
  -> clock and domain owners mutate
  -> runtime calls notify()
  -> runtime returns another snapshot
  -> world renderer mutates canvas pixels
  -> HTML renderer replaces root.innerHTML
  -> next RAF is scheduled
```

## Source-backed defects

### Observer failure changes command observability after mutation

`engine.command()` calls the domain command first, then calls `notify()`, then returns the domain result. If a subscriber throws during `notify()`:

```txt
durable domain mutation: committed
command result: not returned
caller observation: exception
publication to later listeners: skipped
```

No rollback is attempted, and the exception does not identify the committed command or state revision.

### Observer failure can stop browser simulation

`engine.tick()` mutates runtime clock and every tickable domain before calling `notify()`. A throwing listener prevents `tick()` from returning to `draw()`. The world and HTML renderers are skipped and the next RAF is never scheduled.

### Renderer failure can stop the loop after state publication

`draw()` schedules `requestAnimationFrame(draw)` only after both renderers complete. If either renderer throws:

```txt
simulation mutation: committed
subscriber publication: may already be complete
visible surfaces: partial or stale
next RAF: absent
```

There is no finally-stage scheduler, explicit STOPPED/FAULTED runtime state, recovery frame, or fallback surface.

### Public access makes the failure reachable

`window.GameHost` exposes the raw engine, including `subscribe()`. Any diagnostic or page script can register a listener that throws, intentionally or accidentally.

### Delivery and frame provenance are absent

There is no:

```txt
publicationCycleId
observerLeaseId
observerDeliveryResult
failedObserverId
commandCommitRevision
worldRenderResult
htmlRenderResult
frameCycleResult
nextFrameScheduleResult
recoveryGeneration
faultJournalEntry
visibleFrameReceipt
```

## Domains in use

```txt
browser module boot, DOM ownership, recursive RAF, and global host
runtime registration, domain creation, commands, ticks, events, snapshots, subscriptions, and publication
simulation clock mutation and fixed-step gap
12 interface-screen domains and interface composition
resource ledger, pressure field, orchard world, construction, roster, and inventory
active-session movement, collection, phases, pests, damage, score, and failure
world canvas rendering and HTML interface rendering
observer delivery, render-stage classification, scheduling, recovery, and bounded fault observation
Node smoke, static build, Pages deployment, and central audit tracking
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
| runtime | registration, domain creation, command dispatch, delta clamp, ticks, events, snapshots, subscriptions, synchronous publication |
| interface | screen state, actions, activation, routing, nested dispatch, automatic Outcome routing |
| game | resources, pressure, trees, apples, collection, construction, hiring, equipment, movement, phases, pests, damage, score, failure |
| render | orchard canvas, HUD, route screens, cards, delegated click bindings, per-frame DOM replacement |
| diagnostics/proof/deploy | raw engine publication, snapshot readback, unrestricted manual tick, Node smoke, static copy, Pages chain |

## Required composed domain

```txt
zombie-orchard-frame-publication-fault-containment-authority-domain
```

Candidate kits:

```txt
frame-cycle-id-kit
frame-cycle-generation-kit
frame-cycle-stage-kind-kit
frame-cycle-stage-result-kit
frame-cycle-lease-kit
command-commit-revision-kit
post-commit-publication-barrier-kit
detached-publication-snapshot-kit
observer-lease-kit
observer-delivery-result-kit
observer-fault-isolation-kit
observer-quarantine-policy-kit
observer-revocation-result-kit
world-render-stage-result-kit
html-render-stage-result-kit
render-fault-classification-kit
frame-schedule-finalizer-kit
frame-cycle-result-kit
frame-recovery-policy-kit
frame-recovery-generation-kit
frame-fault-journal-kit
frame-cycle-observation-kit
visible-frame-receipt-kit
command-notification-fault-fixture-kit
subscriber-throw-loop-liveness-fixture-kit
renderer-throw-loop-liveness-fixture-kit
multi-listener-isolation-fixture-kit
browser-frame-recovery-smoke-kit
```

## Required transaction

```txt
committed command or simulation step
  -> assign command/state revision
  -> create one detached publication snapshot
  -> deliver independently to each active observer lease
  -> collect delivery results without rewriting the committed command result
  -> quarantine or revoke observers under explicit policy
  -> run world and HTML render stages with typed results
  -> classify complete, partial, failed, or recovery frame
  -> schedule the successor cycle in a guaranteed finalization stage
  -> publish bounded detached fault observation
  -> acknowledge a visible frame only when required surfaces commit
```

Critical simulation-stage failure remains a separate transaction concern. This domain must not silently continue partially applied domain ticks; it must classify the session as faulted and route through explicit recovery or stop policy.

## Ordered safe ledges

```txt
1. Runtime Session Instance Authority
2. Fixed-Step Clock Authority
2a. Route-Scoped Simulation Admission Authority
2b. Player-Control Reachability Authority
3. Public Capability Gateway and Reachability
4. Composite Command Transaction Authority
4a. Frame Publication Fault Containment Authority
5. Seeded Random and Replay Authority
6. Versioned Save / Load Authority
```

## Proof boundary

Do not claim observer isolation, command-result preservation, render fault recovery, frame-loop liveness, or visible-frame correlation until the subscriber, renderer, scheduling, and browser recovery fixtures pass on `main`.
