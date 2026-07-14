# Interaction audit: inventory equip command result map

**Timestamp:** `2026-07-14T05-40-42-04-00`

## Summary

The browser has no equipment command surface, while the public host can send an unrestricted equip command. Neither path returns a typed, revision-bound result that gameplay and presentation can consume.

## Plan ledger

**Goal:** route equipment through one authored command surface with explicit admission and terminal results.

- [x] Inspect inventory route actions.
- [x] Inspect delegated HTML controls.
- [x] Inspect public GameHost access.
- [x] Inspect inventory-runtime equip handling.
- [x] Map accepted and missing results.
- [ ] Implement browser and host command admission.

## Current map

```txt
browser inventory route
  -> item cards
  -> Back action only
  -> no Equip request

public GameHost
  -> arbitrary engine.command
  -> inventory-runtime/equip
  -> state.equipped = payload.id
  -> { accepted: true }
  -> no command ID, item receipt, revision, effect receipt, or projection receipt
```

## Required results

```txt
Accepted
UnknownItem
UnownedItem
NotEquippable
Duplicate
Stale
WrongRoute
RunRetired
Failed
RolledBack
```

Every accepted result must include:

```txt
EquipmentCommandId
RunGeneration
PreviousEquipmentRevision
EquipmentRevision
ItemId
ItemFingerprint
EffectDescriptorFingerprint
InventoryReceipt
GameplayReceipt
HtmlProjectionReceipt
CanvasProjectionReceipt
```

## Validation boundary

No interaction or command behavior changed. No safe browser equipment surface or typed equipment result is claimed.