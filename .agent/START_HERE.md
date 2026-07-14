# START HERE: ZombieOrchard

**Repository:** `LuminaryLabs-Publish/ZombieOrchard`  
**Branch:** `main`  
**Aligned:** `2026-07-14T05-40-42-04-00`  
**Status:** `inventory-equipment-gameplay-adoption-authority-central-reconciled`  
**Retained statuses:** `construction-settlement-world-adoption-authority-central-reconciled`, `html-content-command-surface-authority-central-reconciled`, `browser-startup-readiness-failure-authority-central-reconciled`, `canvas-html-frame-coherence-authority-central-reconciled`, `runtime-event-lifecycle-publication-authority-audited`, `runtime-observer-publication-authority-central-reconciled`

## Summary

ZombieOrchard is a dependency-free orchard survival and economy shell built from a mutable kit runtime, 12 interface definitions, gameplay services, Canvas2D and HTML projection, diagnostics, Node smoke proof, static build, and Pages deployment.

The current audit isolates inventory equipment adoption. The project stores one item and an equipped ID, but the browser cannot equip items, raw commands accept arbitrary IDs, clearing pests ignores equipment, and neither HTML nor Canvas2D proves the accepted equipment state.

## Plan ledger

**Goal:** make equipment one validated transaction from owned item selection through gameplay-effect adoption, matching HTML/Canvas projection, rollback, and visible proof.

- [x] Compare all 11 current Publish repositories with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all ten eligible repositories are tracked, root-documented, and synchronized.
- [x] Select only ZombieOrchard as the oldest eligible central entry.
- [x] Read boot, runtime, interface, composition, gameplay, preset, renderer, smoke, and package surfaces.
- [x] Preserve all 27 implemented kits and offered services.
- [x] Add the timestamped inventory-equipment audit family.
- [x] Refresh required root `.agent` documents and the machine registry.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Implement equipment admission, effect adoption, and executable fixtures.

## Read this run first

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

## Complete interaction loop

```txt
browser click or GameHost command
  -> interface-composition enters inventory or active-session
  -> inventory route lists owned item cards and Back only
  -> no browser Equip action exists
  -> raw inventory-runtime/equip can assign any payload.id
  -> no ownership or item validation occurs
  -> clear action finds a nearby pest and subtracts exactly one condition
  -> clear never reads inventory items or equipped state
  -> HTML omits equipped marker and HUD state
  -> Canvas2D omits held item and effect projection
  -> no equipment revision or first visible frame is acknowledged
```

## Required authority

```txt
zombie-orchard-inventory-equipment-gameplay-adoption-authority-domain
```

## Required transaction

```txt
EquipmentChangeCommand
  -> bind run, command, inventory, catalog, active-session, and route revisions
  -> validate exact owned and equippable item
  -> resolve immutable gameplay and presentation effects
  -> prepare inventory, gameplay, HTML, and Canvas2D candidates
  -> atomically commit one EquipmentRevision
  -> publish EquipmentChangeResult
  -> make ClearActionCommand cite the accepted EquipmentRevision
  -> acknowledge FirstVisibleEquipmentFrameAck
  -> otherwise restore the predecessor and dispose partial candidates
```

## Validation boundary

Documentation only. Runtime source, gameplay, inventory behavior, HTML, CSS, Canvas2D behavior, dependencies, package scripts, tests, workflows, build, and deployment were not changed. No valid equipment admission, gameplay effect, durability, visible equipment state, rollback, or production-readiness claim is made.