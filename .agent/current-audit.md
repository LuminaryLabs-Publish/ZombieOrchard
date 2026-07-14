# Current audit: ZombieOrchard

**Timestamp:** `2026-07-14T00-38-19-04-00`  
**Status:** `construction-settlement-world-adoption-authority-central-reconciled`  
**Branch:** `main`

## Summary

The Storage Shed path currently debits resources and appends an internal built record, but it does not settle one authoritative construction object. Unknown IDs fall back to the first catalog item, nested command results are discarded, placement is not validated, the Canvas2D world ignores built records, and no collision, gameplay effect, rollback, or visible-frame acknowledgement exists.

## Plan ledger

**Goal:** preserve the full repository breakdown while defining construction as one atomic resource, spatial, render, collision, and gameplay transaction.

- [x] Compare the current Publish organization inventory and central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm no higher-priority repository outranks the fallback rule.
- [x] Select only ZombieOrchard as the oldest eligible central entry.
- [x] Read boot, runtime, interface, composition, gameplay, preset, render, test, build, and deployment surfaces.
- [x] Preserve all 27 implemented kits and offered services.
- [x] Add and route the timestamped construction audit family.
- [x] Keep writes on `main`; create no branch or pull request.
- [ ] Implement and run construction-settlement and world-adoption fixtures.

## Selection comparison

```txt
ZombieOrchard      2026-07-13T18-00-38-04-00 selected
TheUnmappedHouse   2026-07-13T19-58-19-04-00
AetherVale         2026-07-13T20-40-15-04-00
PhantomCommand     2026-07-13T21-02-54-04-00
PrehistoricRush    2026-07-13T21-38-52-04-00
IntoTheMeadow      2026-07-13T22-40-52-04-00
TheOpenAbove       2026-07-13T22-58-22-04-00
HorrorCorridor     2026-07-13T23-38-39-04-00
MyCozyIsland       2026-07-13T23-58-48-04-00
TheCavalryOfRome   excluded
```

## Complete interaction loop

```txt
click Build
  -> interface-composition transitions to construction
click Storage Shed
  -> scoped action resolves
  -> nested construction-runtime build command
  -> requested ID matches or falls back to catalog[0]
  -> resource-ledger immediately pays cost
  -> construction-runtime appends built record with generated x/y
  -> nested result is discarded
  -> HTML construction route lists the built record
  -> Canvas2D world still renders only trees, apples, pests, and player
  -> return to active-session
  -> no visible structure, collision, capacity, or gameplay effect
```

## Domains in use

```txt
browser document, Canvas2D, HTML subtree replacement, delegated clicks, RAF, and public GameHost
runtime registration, commands, ticks, events, snapshots, subscribers, and publication
12 interface domains and interface composition
resource ledger, pressure, orchard, construction, roster, and inventory
movement, collection, phases, pests, score, damage, failure, and outcome
construction catalog, payment, placement, adoption, collision, effect, rollback, and visible proof
content safety, startup, frame coherence, validation, static build, Pages deployment, and central tracking
```

## Implemented kits and offered services

```txt
27 total surfaces: 19 engine-installed and 8 host/tooling/support
runtime and scoped interface composition
12 route/interface domains
resource, pressure, orchard, construction, roster, and inventory services
Canvas2D and HTML projection
raw GameHost diagnostics
smoke, build, and Pages deployment
```

## Source-backed findings

- The Storage Shed descriptor contains only an ID, label, and cost.
- Unknown item IDs fall back to `catalog[0]`.
- Resource payment occurs before any multi-consumer construction settlement.
- Built coordinates derive from array length and are not validated.
- `interface-composition` discards the nested build result.
- HTML lists built records, while Canvas2D ignores them.
- Active-session has no construction collision or gameplay-effect consumer.
- The smoke test never exercises construction.

## Required parent domain

```txt
zombie-orchard-construction-settlement-world-adoption-authority-domain
```

## Required transaction

```txt
ConstructionCommand
  -> bind run, command, catalog, resource, world, route, and placement revisions
  -> reject unknown, duplicate, stale, unaffordable, invalid, or overlapping work
  -> reserve cost without durable mutation
  -> prepare construction, canvas, collision, and effect candidates
  -> commit all mandatory participants atomically
  -> publish ConstructionSettlementResult
  -> project one ConstructionRevision into HTML and Canvas2D
  -> acknowledge the first matching visible frame
  -> otherwise roll back resources and partial consumers
```

## Current file family

```txt
.agent/trackers/2026-07-14T00-38-19-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-14T00-38-19-04-00.md
.agent/architecture-audit/2026-07-14T00-38-19-04-00-construction-settlement-world-adoption-dsk-map.md
.agent/render-audit/2026-07-14T00-38-19-04-00-built-structure-visible-world-gap.md
.agent/gameplay-audit/2026-07-14T00-38-19-04-00-resource-payment-inert-construction-loop.md
.agent/interaction-audit/2026-07-14T00-38-19-04-00-build-command-settlement-adoption-map.md
.agent/construction-audit/2026-07-14T00-38-19-04-00-placement-collision-effect-contract.md
.agent/deploy-audit/2026-07-14T00-38-19-04-00-construction-adoption-fixture-gate.md
.agent/central-sync-audit/2026-07-14T00-38-19-04-00-repo-ledger-construction-adoption-reconciliation.md
```

## Validation boundary

Documentation only. No runtime, gameplay, renderer, HTML, CSS, dependency, package-script, test, workflow, build, or deployment behavior changed.
