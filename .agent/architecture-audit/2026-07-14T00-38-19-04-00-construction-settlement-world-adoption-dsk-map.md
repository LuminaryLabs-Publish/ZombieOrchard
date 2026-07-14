# Architecture audit: construction settlement and world adoption DSK map

**Timestamp:** `2026-07-14T00-38-19-04-00`

## Summary

ZombieOrchard has a useful kit-composed construction route, resource ledger, internal built registry, HTML projection, and Canvas2D world. The missing boundary is a parent authority that owns item admission, payment reservation, placement validation, multi-consumer adoption, terminal results, rollback, and visible proof.

## Plan ledger

**Goal:** map every implemented kit and define the smallest coordinating DSK family needed to make construction reliable without restructuring the existing runtime.

- [x] Identify the interaction loop.
- [x] Identify all active domains.
- [x] Inventory all implemented kits and services.
- [x] Trace construction participants and ownership gaps.
- [x] Define the parent authority and coordinating surfaces.
- [ ] Implement the authority through targeted additions to existing kits.

## Current DSK/domain composition

```txt
kit-runtime
  -> resource-ledger
  -> pressure-field
  -> orchard-world
  -> construction-runtime
  -> roster-runtime
  -> inventory-runtime
  -> 11 generic scoped interface domains
  -> custom active-session domain
  -> interface-composition

browser host
  -> world-canvas-renderer
  -> html-interface-renderer
  -> GameHost diagnostics
  -> RAF scheduler
```

## Implemented kits and offered services

| Kit | Offered services |
|---|---|
| `kit-runtime` | kit registration, domain creation, arbitrary command dispatch, ticks, events, snapshots, subscriptions, publication |
| `scoped-interface-domain-kit` | screen state, fields, selection, authored action activation, action descriptors, events, snapshots |
| `entry-domain-kit` | Play, New Game, Settings |
| `session-select-domain-kit` | save-select projection and Back |
| `run-setup-domain-kit` | run setup, Start, Back |
| `active-session-domain-kit` | movement, collection, phase changes, pest lifecycle, score, damage, failure |
| `interrupt-domain-kit` | Pause, Resume, Title |
| `construction-domain-kit` | construction screen, Storage Shed action, Back |
| `exchange-domain-kit` | market projection and Back |
| `roster-domain-kit` | roster projection and Back |
| `inventory-domain-kit` | inventory projection and Back |
| `knowledge-domain-kit` | codex projection and Back |
| `preferences-domain-kit` | settings projection and Back |
| `outcome-domain-kit` | run summary and Title |
| `interface-composition-kit` | route transitions, nested commands, Back, automatic outcome routing |
| `resource-ledger-kit` | balance checks, payment, grants, snapshots |
| `pressure-field-kit` | pressure adjustment, ticking, snapshots |
| `orchard-world-kit` | tree generation, apple generation, collection, refill, bounds, snapshots |
| `construction-runtime-kit` | catalog lookup, payment request, built-record append, message, snapshots |
| `roster-runtime-kit` | payment, hiring, caller-provided names, snapshots |
| `inventory-runtime-kit` | equipment mutation and snapshots |
| `world-canvas-render-kit` | canvas sizing and tree, apple, pest, player projection |
| `html-interface-render-kit` | delegated actions and commands, HUD, screens, cards, messages, titles, descriptions, HTML projection |
| `game-host-diagnostics-kit` | raw engine exposure, state readback, manual tick |
| `smoke-fixture-kit` | Entry, Play, and apple assertions |
| `static-build-copy-kit` | static distribution assembly |
| `pages-deploy-kit` | GitHub Pages publication |

```txt
engine-installed kits: 19
host/tooling/support kits: 8
total implemented surfaces: 27
```

## Construction ownership gap

```txt
item identity             construction-runtime, but unknown IDs fall back
cost authority            resource-ledger, but no reservation or quote receipt
placement authority       absent
orchard occupancy         absent
render adoption           absent from Canvas2D
collision adoption        absent
structure effect          absent
nested terminal result    absent
idempotency/staleness     absent
rollback                  absent
visible-frame proof       absent
```

## Required parent domain

```txt
zombie-orchard-construction-settlement-world-adoption-authority-domain
```

## Required transaction

```txt
ConstructionCommand
  -> bind RunGeneration
  -> bind ConstructionCommandId
  -> bind CatalogRevision, ResourceRevision, WorldRevision, and route revision
  -> admit exact requested item
  -> calculate immutable cost quote
  -> reserve resources
  -> admit placement against bounds and occupancy
  -> prepare construction registry candidate
  -> prepare Canvas2D projection candidate
  -> prepare collision candidate
  -> prepare gameplay-effect candidate
  -> validate all mandatory receipts
  -> commit one ConstructionRevision atomically
  -> publish ConstructionSettlementResult
  -> publish FirstVisibleConstructionFrameAck
  -> release reservation and dispose candidates after rejection or failure
```

## Planned coordinating surfaces

```txt
zombie-orchard-construction-settlement-world-adoption-authority-domain
construction-command-id-kit
construction-catalog-revision-kit
construction-request-kit
construction-item-admission-kit
construction-cost-quote-kit
resource-reservation-kit
placement-intent-kit
orchard-bounds-admission-kit
construction-overlap-admission-kit
construction-effect-descriptor-kit
construction-candidate-kit
construction-resource-settlement-kit
construction-world-adoption-kit
construction-collision-adoption-kit
construction-effect-adoption-kit
construction-ui-projection-kit
construction-canvas-projection-kit
construction-settlement-result-kit
construction-rollback-kit
first-visible-construction-frame-ack-kit
construction-fixture-matrix-kit
source-dist-pages-construction-parity-kit
```

## Targeted integration rule

Do not restructure the engine. Extend `construction-runtime-kit`, `resource-ledger-kit`, `orchard-world-kit`, `active-session-domain-kit`, `interface-composition-kit`, and the two render adapters with typed prepare/commit/rollback surfaces. Keep the parent authority product-specific until a second game validates the same construction contract.
