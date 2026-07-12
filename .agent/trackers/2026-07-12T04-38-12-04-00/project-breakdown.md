# ZombieOrchard Project Breakdown

**Timestamp:** `2026-07-12T04-38-12-04-00`  
**Repository:** `LuminaryLabs-Publish/ZombieOrchard`  
**Scope:** documentation-only frame-publication fault-containment audit

## Summary

`ZombieOrchard` was selected after the full Publish inventory was compared with central tracking. `HorrorCorridor` and `PhantomCommand` had newer unsynchronized repo-local audit work, so this run avoided them and selected the next-oldest stable eligible repository.

The runtime commits command and tick mutations before synchronous subscriber delivery. A throwing subscriber can make an accepted command appear to fail after mutation, skip later observers, and stop the RAF loop before rendering or successor scheduling. Renderer exceptions can stop the same loop after state has already advanced and been published.

## Plan ledger

**Goal:** document one authority for post-commit publication, observer isolation, render-stage results, successor scheduling, recovery, and visible-frame proof.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Compare central ledger timestamps with repo-local `.agent` timestamps.
- [x] Avoid newer unsynchronized work in `HorrorCorridor` and `PhantomCommand`.
- [x] Select only `ZombieOrchard`.
- [x] Read runtime, browser boot, renderers, gameplay owners, diagnostics, proof, and current audit state.
- [x] Identify the complete interaction loop.
- [x] Identify all domains in use.
- [x] Identify all 27 implemented kits.
- [x] Identify every offered service group.
- [x] Confirm command/tick mutation precedes notification.
- [x] Confirm observer and renderer faults can terminate the RAF chain.
- [x] Define the composed authority and fixture boundary.
- [x] Refresh required root `.agent` files.
- [x] Add architecture, render, gameplay, interaction, frame-cycle, and deploy audits.
- [ ] Runtime implementation and executable fixtures remain future work.

## Selection

```txt
accessible Publish repositories: 10
eligible after Cavalry exclusion: 9
new or central-ledger-missing: 0
root-.agent-missing: 0

HorrorCorridor: central 02:49:19, repo-local 04:28:03 -> skipped
PhantomCommand: central 03:00:46, repo-local 04:18:44 -> skipped
ZombieOrchard: central/local 03:11:51 -> selected
```

## Interaction loop

```txt
module boot
  -> build engine graph and renderers
  -> expose raw engine and manual tick
  -> start recursive draw()

command
  -> mutate domain
  -> snapshot and notify observers synchronously
  -> return result only after delivery

frame
  -> mutate runtime/domain state
  -> snapshot and notify observers synchronously
  -> render world canvas
  -> render HTML
  -> schedule next RAF
```

## Main findings

```txt
observer callback errors are not isolated
command result can be hidden after durable mutation
later observers can be skipped by an earlier failure
tick mutation can commit without a returned snapshot
world and HTML renderers return no stage result
any tick/observer/renderer exception can prevent successor RAF scheduling
no frame-cycle identity, recovery generation, fault journal, or visible-frame receipt exists
```

## Domains in use

```txt
browser boot, DOM, RAF, and global diagnostics
runtime graph, commands, ticks, snapshots, events, subscriptions, and publication
12 interface domains and route composition
resource, pressure, orchard, construction, roster, inventory, and active-session gameplay
canvas and HTML projection
observer delivery, render-stage classification, scheduling, recovery, and fault observation
Node smoke, static build, Pages deployment, and central tracking
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

```txt
runtime registration, command dispatch, ticking, events, snapshots, subscriptions and publication
screen state, action activation, routing and nested dispatch
resources, pressure, apples, collection, building, hiring, equipment and movement
phases, pests, damage, scoring and failure
world-canvas, HUD, route-screen, card and delegated-click projection
raw diagnostics, manual stepping, smoke proof, static build and Pages deployment
```

## Required parent domain

```txt
zombie-orchard-frame-publication-fault-containment-authority-domain
```

The parent must own publication identity, detached snapshots, observer leases, delivery results, fault isolation, quarantine/revocation, render-stage results, cycle classification, final scheduling, recovery generation, bounded fault observation, visible-frame receipts, and executable fixtures.

## Validation boundary

No runtime, package, dependency, rendering, gameplay, persistence, or deployment code changed. No branch or pull request was created. No fault-containment fixture was executed.
