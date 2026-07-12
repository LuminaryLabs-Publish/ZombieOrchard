# START HERE: ZombieOrchard

## Last aligned

```txt
2026-07-11T23-48-14-04-00
```

## Summary

`ZombieOrchard` is a dependency-free static orchard survival and economy shell built from a small mutable kit runtime, 12 interface domains, gameplay services, canvas and HTML projection, diagnostics, Node smoke proof, static build and Pages deployment.

The current audit isolates composite command atomicity. Interface activation can dispatch a nested gameplay command, ignore the child result, continue with a parent success result and publish more than one observation. Gameplay commands also mutate several domains in sequence without a prepare/commit/rollback boundary. The shipped Storage Shed action can therefore report parent success when the construction child rejects for missing resources, while collection and pest-clear operations can partially commit world, reward, pressure and score state if one participant is missing or fails.

## Plan ledger

**Goal:** define one transaction from browser intent through action resolution, participant preparation, atomic multi-domain commit, one typed result and one frame-correlated publication.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger and root `.agent` coverage.
- [x] Select only `ZombieOrchard` because its central ledger remained the oldest eligible entry and its newer repo-local audit had not yet been reflected centrally.
- [x] Identify the product interaction loop, domains, all 27 implemented kits and their services.
- [x] Trace delegated UI activation, nested command dispatch, child-result handling, domain mutations, publication and render observation.
- [x] Define command envelopes, participant plans, prepare/commit/rollback, idempotency, aggregate results, journals and frame receipts.
- [x] Add timestamped architecture and system audits.
- [x] Refresh the required root `.agent` files and kit registry.
- [x] Push documentation only to `main`; create no branch or pull request.
- [ ] Implement the transaction boundary and run executable fixtures.

## Read this first

```txt
.agent/trackers/2026-07-11T23-48-14-04-00/project-breakdown.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/architecture-audit/2026-07-11T23-48-14-04-00-composite-command-transaction-dsk-map.md
.agent/render-audit/2026-07-11T23-48-14-04-00-intermediate-command-publication-frame-gap.md
.agent/gameplay-audit/2026-07-11T23-48-14-04-00-activate-child-command-commit-loop.md
.agent/interaction-audit/2026-07-11T23-48-14-04-00-nested-command-result-admission-map.md
.agent/command-transaction-audit/2026-07-11T23-48-14-04-00-prepare-commit-rollback-contract.md
.agent/deploy-audit/2026-07-11T23-48-14-04-00-command-transaction-fixture-gate.md
.agent/turn-ledger/2026-07-11T23-48-14-04-00.md
.agent/kit-registry.json
```

Retain prerequisite audits:

```txt
seeded random and replay: 2026-07-11T17-01-11-04-00
runtime session instance: 2026-07-11T18-28-40-04-00
versioned save/load: 2026-07-11T20-03-22-04-00
route-scoped simulation admission: 2026-07-11T21-40-49-04-00
public capability gateway: 2026-07-11T23-41-55-04-00
```

## Selection

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

ZombieOrchard      2026-07-11T21-40-49-04-00 selected
TheUnmappedHouse   2026-07-11T21-48-44-04-00
AetherVale         2026-07-11T22-02-01-04-00
MyCozyIsland       2026-07-11T22-20-00-04-00
PrehistoricRush    2026-07-11T22-38-54-04-00
TheOpenAbove       2026-07-11T22-58-50-04-00
IntoTheMeadow      2026-07-11T23-10-51-04-00
HorrorCorridor     2026-07-11T23-18-16-04-00
PhantomCommand     2026-07-11T23-28-29-04-00
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/ZombieOrchard` was changed in the Publish organization.

## Product interaction loop

```txt
module boot
  -> create retained graph
  -> create canvas and HTML renderers
  -> publish raw GameHost
  -> start recursive RAF

RAF
  -> engine.tick(1 / 60)
  -> tick every registered domain
  -> snapshot domain map
  -> world canvas render
  -> active-route HTML render

UI action
  -> delegated data-action lookup
  -> engine.command(interface-composition, activate)
  -> active interface resolves an action
  -> optional nested engine.command(child)
  -> child notifies subscribers
  -> parent ignores the child result
  -> optional route move
  -> parent returns and notifies subscribers again

Direct gameplay command
  -> mutate one or more participant domains immediately
  -> no participant preparation
  -> no rollback if a later participant fails
  -> return a local result without aggregate receipts
```

## Main findings

```txt
Storage Shed with insufficient resources
  -> construction child returns accepted=false
  -> parent activation ignores child result
  -> parent returns accepted=true
  -> caller discards both results

Collect apple
  -> remove apple and reseed world first
  -> optionally add rewards
  -> optionally adjust pressure
  -> increment score and message
  -> no rollback boundary

Clear pest
  -> damage/remove pest
  -> increment score
  -> optionally add scrap
  -> no rollback boundary
```

Additional defects:

```txt
commandId: absent
transactionId: absent
expected state revision: absent
participant prepare result: absent
aggregate commit result: absent
rollback receipt: absent
idempotency receipt: absent
one-publication barrier: absent
result-to-frame acknowledgement: absent
```

## Domains in use

```txt
browser boot, window-global host and RAF
kit/domain graph construction
command, tick, event, snapshot, subscription and publication routing
runtime/session lifecycle authority: missing
fixed-step clock and single-writer authority: missing
route-scoped simulation admission authority: missing
public capability gateway and host revocation authority: missing
composite command transaction authority: missing
12 scoped interface-screen domains
interface composition and nested dispatch
resource ledger and pressure field
orchard world and random apple lifecycle
construction, roster and inventory
active-session movement, phases, pests, damage, score and terminal failure
canvas and HTML rendering
Node smoke proof
static build and Pages deployment
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

## Kit services

| Kit group | Services |
|---|---|
| runtime | registration, domain creation, commands, clamped ticks, events, snapshots, subscriptions and publication |
| interface | screen state, fields, selection, actions, activation, routing, nested dispatch and automatic Outcome routing |
| game | affordability, resources, pressure, trees, apples, collection/refill, construction, hiring, equipment, movement, phases, pests, damage, score and failure |
| render | orchard canvas, HUD, route screens, cards, delegated bindings and per-frame DOM replacement |
| diagnostics/proof/deploy | raw engine, snapshot, manual tick, Node smoke, static copy and Pages chain |

## Required authority

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

## Required transaction

```txt
CommandEnvelope
  -> session/lifecycle/route/capability admission
  -> resolve the action and all participant commands
  -> verify expected state revision
  -> prepare every participant without mutation
  -> reject with no mutation if any participant rejects
  -> commit every prepared participant once
  -> buffer events and observations until aggregate commit
  -> publish one AggregateCommandResult
  -> render and acknowledge one correlated canvas/HTML frame
  -> return the same receipt for an accepted duplicate
```

## Ordered implementation queue

```txt
1. Runtime Session Instance Authority
2. Fixed-Step Clock Authority
2a. Route-Scoped Simulation Admission Authority
3. Public Capability Gateway and Reachability
4. Composite Command Transaction Authority
5. Seeded Random and Replay Authority
6. Versioned Save / Load Authority
```

## Next safe ledge

```txt
ZombieOrchard Runtime Session Instance Authority
+ Fixed-Step Clock Authority
+ Route-Scoped Simulation Admission Authority
+ Public Capability Gateway and Host Revocation
+ Composite Command Transaction Authority
+ Command Atomicity/Idempotency/Frame-Receipt Fixture Gate
```