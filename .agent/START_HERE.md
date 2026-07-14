# START HERE: ZombieOrchard

**Repository:** `LuminaryLabs-Publish/ZombieOrchard`  
**Branch:** `main`  
**Aligned:** `2026-07-14T00-38-19-04-00`  
**Status:** `construction-settlement-world-adoption-authority-central-reconciled`  
**Retained statuses:** `html-content-command-surface-authority-central-reconciled`, `browser-startup-readiness-failure-authority-central-reconciled`, `canvas-html-frame-coherence-authority-central-reconciled`, `runtime-event-lifecycle-publication-authority-audited`, `runtime-observer-publication-authority-central-reconciled`

## Summary

ZombieOrchard is a dependency-free orchard survival and economy shell built from a mutable kit runtime, 12 interface definitions, gameplay services, Canvas2D and HTML projection, diagnostics, Node smoke proof, static build, and Pages deployment.

The current audit isolates construction settlement and world adoption. Buying the Storage Shed debits resources and records a structure, but the command result is not propagated, placement is not admitted against the orchard, the Canvas2D world ignores built records, and the purchased structure has no collision or gameplay effect.

## Plan ledger

**Goal:** make construction one atomic transaction from authored item request through resource settlement, spatial adoption, gameplay effect, matching HTML/Canvas projection, rollback, and visible proof.

- [x] Compare all ten current Publish repositories with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm every eligible repository is tracked, root-documented, and synchronized.
- [x] Select only ZombieOrchard as the oldest eligible central entry.
- [x] Read boot, runtime, interface, composition, gameplay, preset, renderer, smoke, build, and deployment surfaces.
- [x] Preserve all 27 implemented kits and offered services.
- [x] Add the timestamped construction-settlement audit family.
- [x] Refresh required root `.agent` documents and the machine registry.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Implement transactional construction adoption and executable fixtures.

## Read this run first

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

## Complete interaction loop

```txt
browser click or GameHost command
  -> interface-composition transition to construction
  -> construction route exposes Storage Shed action
  -> interface-composition activate
  -> scoped construction action resolves
  -> nested construction-runtime build dispatch
  -> requested catalog id resolves, or silently falls back to catalog[0]
  -> resource-ledger pay mutates balances
  -> construction-runtime appends a built record at generated x/y
  -> nested command publishes one snapshot
  -> outer composition ignores the nested command result
  -> next RAF tick publishes another snapshot
  -> HTML construction screen lists the built record
  -> Canvas2D world renders trees, apples, pests, and player only
  -> Back returns to active-session
  -> purchased structure has no world projection, collision, capacity, or gameplay effect
```

## Required authority

```txt
zombie-orchard-construction-settlement-world-adoption-authority-domain
```

## Required transaction

```txt
ConstructionCommand
  -> bind RunGeneration, ConstructionCommandId, CatalogRevision, WorldRevision,
     ResourceRevision, expected route, requested item, and placement intent
  -> reject unknown items instead of falling back
  -> quote cost and reserve resources without durable mutation
  -> validate bounds, occupancy, collision, capacity, and item policy
  -> prepare immutable construction, canvas, collision, and effect candidates
  -> commit resource debit and construction adoption atomically
  -> publish ConstructionSettlementResult
  -> project the same ConstructionRevision into HTML and Canvas2D
  -> acknowledge FirstVisibleConstructionFrameAck
  -> otherwise release reservations, remove partial consumers, and restore predecessor state
```

## Validation boundary

Documentation only. Runtime source, gameplay, HTML, CSS, Canvas2D behavior, dependencies, package scripts, tests, workflows, build, and deployment were not changed. No atomic settlement, spatial admission, visible construction, collision, gameplay effect, rollback, or production-readiness claim is made.
