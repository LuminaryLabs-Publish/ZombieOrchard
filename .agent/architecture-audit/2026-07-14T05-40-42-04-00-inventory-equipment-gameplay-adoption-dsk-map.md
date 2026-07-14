# Architecture audit: inventory equipment gameplay adoption DSK map

**Timestamp:** `2026-07-14T05-40-42-04-00`

## Summary

ZombieOrchard already has inventory state, one authored item, a clear action, HTML projection, and Canvas2D projection. The missing boundary is a coordinating authority that validates ownership and item type, resolves gameplay effects, commits inventory and consumers together, and produces one visible equipment result.

## Plan ledger

**Goal:** extend existing kits through a narrow parent authority rather than restructure the runtime.

- [x] Map the installed runtime graph.
- [x] Identify item, equipment, combat, UI, and render ownership.
- [x] Inventory all 27 implemented kit surfaces and services.
- [x] Define the missing parent domain and transaction.
- [x] Define targeted coordinating kits.
- [ ] Implement and validate the authority.

## Current composition

```txt
kit-runtime
  -> resource-ledger
  -> pressure-field
  -> orchard-world
  -> construction-runtime
  -> roster-runtime
  -> inventory-runtime
  -> 11 generic scoped interface domains
  -> active-session
  -> interface-composition

browser host
  -> html-interface-renderer
  -> world-canvas-renderer
  -> GameHost diagnostics
  -> RAF scheduler
```

## Current ownership

```txt
item list                  inventory-runtime
stored equipped string     inventory-runtime
browser inventory route    inventory-domain-kit
combat clearing            active-session-domain-kit
inventory cards            html-interface-render-kit
equipped HUD state         absent
equipment world visual     absent
effect resolution          absent
equipment transaction      absent
visible-frame proof        absent
```

## Implemented kit census

```txt
engine-installed kits: 19
host/tooling/support kits: 8
total implemented surfaces: 27
```

The complete per-kit service inventory is preserved in the tracker and `kit-registry.json`.

## Required parent domain

```txt
zombie-orchard-inventory-equipment-gameplay-adoption-authority-domain
```

## Required transaction

```txt
EquipmentChangeCommand
  -> bind run, command, inventory, item-catalog, active-session, and route revisions
  -> admit exact owned and equippable item
  -> resolve immutable effect and presentation descriptors
  -> prepare inventory, gameplay, HTML, and Canvas2D candidates
  -> validate all mandatory receipts
  -> atomically commit one EquipmentRevision
  -> publish EquipmentChangeResult
  -> make gameplay actions cite that revision
  -> acknowledge the first matching visible equipment frame
  -> otherwise restore the predecessor and dispose partial candidates
```

## Planned surfaces

```txt
inventory-equipment-gameplay-adoption-authority-domain
equipment-command-id-kit
inventory-revision-kit
item-catalog-revision-kit
owned-item-admission-kit
equippable-policy-kit
equipment-effect-descriptor-kit
equipment-candidate-kit
equipment-gameplay-adoption-kit
equipment-clear-action-resolution-kit
equipment-durability-kit
equipment-ui-projection-kit
equipment-canvas-projection-kit
equipment-change-result-kit
equipment-rollback-kit
first-visible-equipment-frame-ack-kit
inventory-equipment-fixture-matrix-kit
source-dist-pages-equipment-parity-kit
```

## Targeted integration rule

Extend `inventory-runtime-kit`, `active-session-domain-kit`, `inventory-domain-kit`, `interface-composition-kit`, `html-interface-render-kit`, and `world-canvas-render-kit`. Keep the parent authority product-specific until another game validates the same equipment contract.