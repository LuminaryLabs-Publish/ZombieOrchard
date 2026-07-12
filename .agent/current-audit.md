# Current audit: ZombieOrchard

## Status

```txt
last aligned: 2026-07-11T23-48-14-04-00
status: composite-command-transaction-authority-audited
runtime source changed: no
branch: main
root .agent state: refreshed
central ledger sync: pending until repo-local push completes
```

## Summary

`ZombieOrchard` resolves interface actions and gameplay effects through immediate nested mutations rather than one aggregate command transaction. `interface-composition.activate` can call a child command, ignore its result, optionally change route state and return parent success. The nested `engine.command()` publishes once, then the outer command publishes again.

Gameplay commands also span multiple mutable owners without prepare, commit or rollback. Apple collection removes and reseeds an apple before reward and pressure effects; pest clearing can retire a pest and increment score before scrap credit; construction and hiring debit resources before appending the resulting entity.

## Plan ledger

**Goal:** define one atomic command transaction that preserves child-result truth, prevents partial multi-domain commits and publishes exactly one typed result tied to one visible frame.

- [x] Compare the full Publish inventory with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only ZombieOrchard.
- [x] Read browser boot, runtime command dispatch, scoped interfaces, composition, preset actions, gameplay domains, render bindings and smoke proof.
- [x] Identify the interaction loop, domains, all implemented kits and services.
- [x] Trace nested activation and child command behavior.
- [x] Trace collection, clearing, construction, hiring and equipment mutations.
- [x] Define participant preparation, atomic commit, rollback, idempotency, one-publication and frame-receipt contracts.
- [x] Add architecture, render, gameplay, interaction, command-transaction and deploy audits.
- [ ] Implement and run transaction fixtures.

## Interaction loop

```txt
UI click
  -> HTML delegated listener
  -> engine.command(interface-composition, activate)
  -> active screen command returns an action descriptor
  -> action.command may invoke nested engine.command(child)
  -> nested command mutates and notifies
  -> parent discards child result
  -> parent may move route
  -> outer command returns and notifies again

Gameplay effect
  -> mutate participant A
  -> mutate participant B if present
  -> mutate participant C if present
  -> return local accepted/rejected result
  -> no aggregate revision, rollback or frame receipt
```

## Source-backed findings

1. `kit-runtime.command()` immediately calls one domain and always notifies afterward.
2. `interface-composition.activate` invokes the active screen command, then invokes `ctx.engine.command(...)` for an action child.
3. The composition domain does not retain or inspect the child result.
4. If the action has no route target, the parent returns `{ accepted: true }` even when the child rejected.
5. The Storage Shed action triggers exactly that path.
6. Nested dispatch causes a child notification followed by an outer notification.
7. The HTML delegated listener discards the returned parent result.
8. `collect` removes an apple and calls `seedApples()` before reward, pressure, score and message settlement completes.
9. Reward and pressure participants are optional-chained, so a missing participant does not reject the aggregate operation.
10. `clear` can remove a pest and increment score before optional scrap credit.
11. `build` and `hire` debit the resource ledger before appending the constructed or hired entity.
12. No command ID, transaction ID, expected revision, participant receipt, rollback receipt or idempotency record exists.
13. No result identifies the state revision or canvas/HTML frame that first presented it.
14. The smoke test does not test insufficient resources, participant failure, duplicate submission, nested publication count or frame correlation.

## Domains in use

```txt
browser module boot and window-global publication
runtime graph registration and mutable context
commands, ticks, events, snapshots, subscriptions and publication
runtime/session lifecycle authority: missing
fixed-step and single-writer clock authority: missing
route-scoped simulation admission authority: missing
public capability gateway/revocation authority: missing
composite command transaction authority: missing
12 interface-screen domains
interface action resolution and route composition
resource ledger and pressure field
orchard world and random apple lifecycle
construction, roster and inventory runtimes
active-session movement, collection, clearing, phases, pests, damage, score and failure
world-canvas and HTML projection
Node smoke proof
static build and Pages deployment
```

## Implemented kits and services

| Kit group | Services |
|---|---|
| `kit-runtime` | registration, domain creation, command dispatch, delta clamping, all-domain ticks, events, snapshots, subscriptions and publication |
| interface kits | screen state, actions, selection, fields, activation, routing, nested dispatch and automatic Outcome routing |
| `resource-ledger-kit` | affordability, payment, gain and resource projection |
| `pressure-field-kit` | pressure adjustment, clamping and per-tick growth |
| `orchard-world-kit` | tree grid, random apple population, nearest collection and refill |
| construction/roster/inventory kits | build, hire, equip and state projection |
| `active-session-domain-kit` | movement, collection, phase changes, pest spawn/pursuit, damage, score and terminal failure |
| render kits | orchard canvas, HUD, route screens, cards, delegated actions and per-frame DOM replacement |
| diagnostics/proof/deploy | raw engine publication, snapshot, manual tick, smoke proof, static copy and Pages chain |

## Complete implemented kit inventory

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

## Required composed domain

```txt
zombie-orchard-composite-command-transaction-authority-domain
  -> command-envelope-kit
  -> command-id-kit
  -> transaction-id-kit
  -> expected-revision-admission-kit
  -> action-resolution-kit
  -> command-participant-registry-kit
  -> participant-prepare-kit
  -> participant-commit-kit
  -> participant-rollback-kit
  -> transaction-idempotency-kit
  -> aggregate-command-result-kit
  -> transaction-event-buffer-kit
  -> single-publication-barrier-kit
  -> command-result-journal-kit
  -> command-frame-receipt-kit
  -> command-transaction-fixture-kit
```

## Required result

```txt
AggregateCommandResult {
  commandId
  transactionId
  status
  reason
  beforeRevision
  afterRevision
  participantResults
  emittedEvents
  idempotencyStatus
  canvasFrameId
  htmlFrameId
}
```

## Ordered safe ledges

```txt
1. Runtime Session Instance Authority
2. Fixed-Step Clock Authority
2a. Route-Scoped Simulation Admission Authority
3. Public Capability Gateway and Reachability
4. Composite Command Transaction Authority
5. Seeded Random and Replay Authority
6. Versioned Save / Load Authority
```