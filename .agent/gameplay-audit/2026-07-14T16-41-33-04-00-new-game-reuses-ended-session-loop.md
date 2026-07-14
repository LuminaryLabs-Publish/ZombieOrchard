# Gameplay audit: New Game reuses ended session

**Timestamp:** `2026-07-14T16-41-33-04-00`

## Summary

`New Game` is currently a route label, not a gameplay operation. Starting from run setup returns to the same `active-session` closure. If the predecessor ended, it remains ended; if it was partially played, every mutation remains.

## Plan ledger

**Goal:** make New Game and Play explicitly choose a start mode and settle one clean successor run before gameplay resumes.

- [x] Trace entry, run-setup, active-session, interrupt, and outcome actions.
- [x] Trace runtime tick behavior across routes.
- [x] Trace state retained by every gameplay domain.
- [x] Identify the immediate post-defeat bounce-to-outcome case.
- [ ] Implement start modes, predecessor settlement, reset candidates, adoption, and fixtures.

## Current loop

```txt
first run
  -> mutate resources, pressure, world, construction, roster, inventory, player, score, day, pests
  -> player condition reaches zero
  -> ended=true
  -> route moves to outcome

Title
  -> route moves to entry only

New Game -> Start
  -> route moves to active-session only
  -> ended remains true
  -> all predecessor values remain
  -> interface-composition can move back to outcome on the next tick
```

## Gameplay consequences

```txt
no clean starting economy
no clean player condition or position
no clean score or day
no pest reset
no pressure reset
no construction reset
no roster reset
no equipment reset
no deterministic orchard reset
no retry lineage
no retained predecessor outcome artifact
```

## Required policy

`Play` must explicitly mean resume an accepted active run or start a clean run when none exists. `New Game` must always allocate a distinct successor generation after any required confirmation or predecessor settlement. `Start` must publish success only after every gameplay participant adopts that successor.