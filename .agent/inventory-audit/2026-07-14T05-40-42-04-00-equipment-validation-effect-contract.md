# Inventory audit: equipment validation and effect contract

**Timestamp:** `2026-07-14T05-40-42-04-00`

## Summary

The current inventory domain stores items and one equipped ID but does not own an item catalog revision, ownership admission, equippable policy, effect descriptor, durability, or downstream adoption contract.

## Plan ledger

**Goal:** define the minimum contract that turns equipment from a mutable string into an owned, validated, gameplay-active capability.

- [x] Record current item and equipped schema.
- [x] Record current equip command behavior.
- [x] Identify ownership and policy gaps.
- [x] Identify gameplay and presentation consumers.
- [x] Define commit, rollback, and proof requirements.
- [ ] Implement the contract.

## Required item descriptor

```txt
ItemId
ItemRevision
ItemFingerprint
DisplayName
ItemType
EquippableSlots
Range
Power
StaminaCost
Cadence
Durability
GameplayEffectDescriptor
HtmlPresentationDescriptor
CanvasPresentationDescriptor
```

## Required equipment state

```txt
RunGeneration
InventoryRevision
EquipmentRevision
EquipmentCommandId
EquippedSlot
EquippedItemId
ItemFingerprint
EffectFingerprint
DurabilityState
CommittedAtFrame
```

## Admission rules

- The item ID must exist in the accepted catalog revision.
- The item must exist in the accepted owned inventory revision.
- The item type must be valid for the requested slot.
- The run, route, and predecessor equipment revision must still be current.
- Duplicate command IDs must return the original terminal result.
- Unknown, unowned, stale, retired, or invalid requests must perform zero mutation.

## Adoption rules

- Inventory state and gameplay effect must commit together.
- UI and Canvas2D must project the accepted equipment revision.
- Clear actions must cite the equipment revision used for range, power, stamina, cadence, and durability.
- Failed consumers must restore the predecessor equipment and effect state.
- A visible-frame acknowledgement must complete the transaction.

## Fixture matrix

```txt
known owned item equips
unknown item performs zero mutation
unowned item performs zero mutation
invalid slot performs zero mutation
duplicate command settles once
stale inventory revision is rejected
gameplay effect activates only after commit
clear result cites matching equipment revision
durability changes once per accepted action
HTML and Canvas2D project the same revision
failed consumer rolls back to predecessor
source, dist, and Pages behavior match
```

## Validation boundary

Contract documentation only. No equipment authority or fixtures exist in runtime.