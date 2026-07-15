# Gameplay audit: unreachable proximity gameplay loop

**Timestamp:** `2026-07-15T17-38-05-04-00`

## Summary

Harvesting and pest clearing are distance-gated, while the shipped UI cannot intentionally change player position. The core gather-and-defend loop is therefore dependent on incidental spawn proximity or external diagnostic commands.

## Plan ledger

**Goal:** make movement, proximity eligibility, collection, clearing, feedback, and visible results one intentional gameplay loop.

- [x] Trace player initialization and movement bounds.
- [x] Trace apple and pest placement.
- [x] Trace collect and clear distance checks.
- [x] Trace all shipped input producers.
- [x] Define the missing control authority.
- [ ] Prove deterministic movement into and out of interaction range.

## Active loop

```txt
player starts at x 0 y 180
apples are randomly seeded around orchard trees
pests spawn around the orchard perimeter at night
collect succeeds only within radius 42
clear succeeds only within distance 58
move changes x/y by 22 per accepted command
no shipped control submits move
```

## Consequence

The player can change phase and repeatedly attempt Collect or Clear, but cannot deliberately navigate toward a target through the product UI. Random initial apple placement may occasionally satisfy the collection radius; that does not provide movement control coverage.

## Required result chain

```txt
PlayerActionState
  -> MovementCommand
  -> MovementResult
  -> PlayerPositionRevision
  -> ProximityEligibilityResult
  -> CollectResult or ClearResult
  -> gameplay feedback
  -> matching Canvas2D and HTML receipts
```

## Validation boundary

No claim is made about measured playability, random-seed success rate, input latency, or deployed behavior.
