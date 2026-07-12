# Gameplay audit: HUD and route projection loop

**Timestamp:** `2026-07-12T07-51-04-04-00`  
**Repository:** `LuminaryLabs-Publish/ZombieOrchard`

## Summary

Gameplay state is projected into the HUD every frame regardless of whether any displayed value changed. Route menus are also rebuilt while the simulation continues ticking. The interface has no dirty-domain set, view-model revision or route-aware projection budget.

## Plan ledger

**Goal:** ensure gameplay changes produce deliberate interface revisions instead of animation-cadence-driven subtree replacement.

- [x] Map gameplay values used by the HUD and cards.
- [x] Map route state used by menu projection.
- [x] Confirm snapshot cadence drives UI mutation cadence.
- [x] Define gameplay-to-view-model boundaries.
- [ ] Implement dirty-state and projection fixtures.

## Projected gameplay values

```txt
active-session:
  day
  phase
  player.condition
  actions
  message

resource-ledger:
  money
  apples
  wood

pressure-field:
  rowPressure

construction-runtime:
  built

roster-runtime:
  actors

inventory-runtime:
  items

outcome:
  score
  day
```

## Current problem

```txt
simulation tick with no displayed change
  -> fresh snapshot
  -> identical HTML string
  -> complete subtree replacement
```

## Required gameplay projection contract

```txt
domain revisions
  -> InterfaceViewModel
  -> displayed-field fingerprint
  -> unchanged result OR one admitted projection revision
  -> visible HUD/route receipt
```

No gameplay simulation behavior was changed by this audit.
