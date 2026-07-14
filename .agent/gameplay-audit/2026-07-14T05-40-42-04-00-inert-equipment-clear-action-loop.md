# Gameplay audit: inert equipment clear-action loop

**Timestamp:** `2026-07-14T05-40-42-04-00`

## Summary

Inventory equipment does not participate in gameplay. The clear action always applies one condition point to a nearby pest, regardless of owned items or the stored equipped ID.

## Plan ledger

**Goal:** make every combat result attributable to one accepted equipment revision and effect descriptor.

- [x] Trace initial inventory and equipped state.
- [x] Trace raw equip mutation.
- [x] Trace the clear command.
- [x] Confirm clear does not read inventory.
- [x] Record missing effect, durability, and result contracts.
- [ ] Implement equipment-aware gameplay settlement.

## Current loop

```txt
preset
  -> items = [branch]
  -> equipped = branch

optional raw equip
  -> assign any payload.id

clear
  -> find first pest within 58 units
  -> subtract exactly 1 condition
  -> remove defeated pest
  -> add score and scrap
  -> report generic clear message
```

## Missing gameplay semantics

```txt
item ownership validation
equippable type
range descriptor
damage descriptor
stamina cost
cadence or cooldown
durability and breakage
resource effect
animation/presentation descriptor
EquipmentRevision on ClearActionResult
```

## Consequences

- The authored branch is mechanically identical to an arbitrary unknown item ID.
- Inventory progression cannot alter survival decisions.
- The browser inventory route cannot prepare a combat loadout.
- Saves or future replay cannot explain why a clear action produced its result.
- Tests can pass while inventory remains entirely inert.

## Validation boundary

No gameplay behavior changed. No equipment-aware combat or balance claim is made.