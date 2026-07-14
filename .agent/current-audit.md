# Current audit: ZombieOrchard

**Timestamp:** `2026-07-14T05-40-42-04-00`  
**Status:** `inventory-equipment-gameplay-adoption-authority-central-reconciled`  
**Branch:** `main`

## Summary

ZombieOrchard stores one authored inventory item and an equipped ID, but equipment is not an admitted capability. The inventory route has no Equip action, raw commands can assign any ID, the clear action ignores inventory state, and neither HTML nor Canvas2D projects the accepted item or effect.

## Plan ledger

**Goal:** preserve the full repository breakdown while defining equipment as one owned-item, gameplay-effect, render, rollback, and proof transaction.

- [x] Compare the current Publish organization inventory with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm no higher-priority repository outranks the fallback rule.
- [x] Select only ZombieOrchard as the oldest eligible central entry.
- [x] Read inventory, interaction, gameplay, render, proof, build, and deployment surfaces.
- [x] Preserve all 27 implemented kits and offered services.
- [x] Add and route the timestamped inventory-equipment audit family.
- [x] Keep writes on `main`; create no branch or pull request.
- [ ] Implement and run equipment-adoption fixtures.

## Complete interaction loop

```txt
inventory route
  -> item cards and Back only
  -> no authored Equip action

raw command
  -> inventory-runtime/equip
  -> assign payload.id without validation
  -> return generic accepted result

clear action
  -> find nearby pest
  -> subtract exactly one condition
  -> ignore items and equipped state

projection
  -> no equipped marker in inventory
  -> no equipment in HUD
  -> no held item or effect in Canvas2D
```

## Domains in use

```txt
browser DOM, delegated input, Canvas2D, RAF, error panel, and public GameHost
runtime registration, commands, ticks, events, snapshots, subscriptions, and publication
12 interface domains and interface composition
resource ledger, pressure, orchard, construction, roster, and inventory
movement, collection, phases, pests, clearing, score, damage, failure, and outcome
inventory ownership, equipment admission, effects, durability, rollback, and visible proof
HTML and Canvas2D presentation
validation, static build, Pages deployment, and central tracking
```

## Implemented kits and services

```txt
27 total surfaces: 19 engine-installed and 8 host/tooling/support
runtime and scoped interface composition
12 route/interface domains
resource, pressure, orchard, construction, roster, and inventory services
active-session movement, collection, phases, pests, clearing, score, damage, and failure
Canvas2D and HTML projection
raw GameHost diagnostics
smoke, build, and Pages deployment
```

## Source-backed findings

- The preset defines `branch` as the only item and initial equipped ID.
- The inventory interface exposes Back only.
- `inventory-runtime` accepts any `payload.id` and stores it as equipped.
- The clear command never reads inventory or equipment state.
- The inventory screen does not mark the equipped item.
- The active HUD and Canvas2D renderer omit equipment.
- The smoke test never exercises inventory, equipment, or clear-effect coupling.

## Required parent domain

```txt
zombie-orchard-inventory-equipment-gameplay-adoption-authority-domain
```

## Required transaction

```txt
EquipmentChangeCommand
  -> bind run and expected revisions
  -> validate exact owned and equippable item
  -> resolve immutable gameplay and presentation descriptors
  -> prepare mandatory consumers
  -> atomically commit one EquipmentRevision
  -> publish typed result and participant receipts
  -> make gameplay actions cite the revision
  -> acknowledge the matching visible frame
  -> otherwise restore the predecessor
```

## Current file family

```txt
.agent/trackers/2026-07-14T05-40-42-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-14T05-40-42-04-00.md
.agent/architecture-audit/2026-07-14T05-40-42-04-00-inventory-equipment-gameplay-adoption-dsk-map.md
.agent/render-audit/2026-07-14T05-40-42-04-00-equipped-item-visible-state-gap.md
.agent/gameplay-audit/2026-07-14T05-40-42-04-00-inert-equipment-clear-action-loop.md
.agent/interaction-audit/2026-07-14T05-40-42-04-00-inventory-equip-command-result-map.md
.agent/inventory-audit/2026-07-14T05-40-42-04-00-equipment-validation-effect-contract.md
.agent/deploy-audit/2026-07-14T05-40-42-04-00-inventory-equipment-fixture-gate.md
.agent/central-sync-audit/2026-07-14T05-40-42-04-00-repo-ledger-inventory-equipment-reconciliation.md
```

## Validation boundary

Documentation only. No runtime, gameplay, renderer, HTML, CSS, dependency, package-script, test, workflow, build, or deployment behavior changed.