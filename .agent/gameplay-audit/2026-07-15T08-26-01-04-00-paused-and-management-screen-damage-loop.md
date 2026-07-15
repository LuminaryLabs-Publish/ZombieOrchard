# Gameplay audit: paused and management-screen damage loop

**Timestamp:** `2026-07-15T08-26-01-04-00`  
**Repository:** `LuminaryLabs-Publish/ZombieOrchard`

## Summary

The visible Pause and management routes do not pause the active-session domain. At night, pests can continue spawning, moving and damaging the player while the player cannot see or use the active-session controls.

## Plan ledger

**Goal:** prevent gameplay hazards from advancing unless a route policy explicitly admits them.

- [x] Trace active-session tick predicates.
- [x] Trace Pause and management transitions.
- [x] Trace defeat routing order.
- [x] Record the source-permitted hidden damage path.
- [ ] Execute deterministic route-suspension fixtures.

## Source-permitted loop

```txt
active night session with one or more pests
  -> select Pause, Build, Market, Roster, Inventory or Codex
  -> HTML leaves active-session HUD
  -> active-session.tick still runs
  -> pests approach and damage player
  -> player condition reaches zero
  -> active-session marks ended
  -> interface-composition routes to outcome
  -> no Resume command was admitted
```

Pressure also grows on Entry, Run Setup, Settings, Title, Pause and all management routes.

## Required gameplay contract

```txt
running route
  -> pressure and active-session leases admitted

Pause or management route
  -> leases suspended atomically
  -> commands that require active gameplay rejected
  -> state remains unchanged except explicitly background-safe services

Resume
  -> same run generation required
  -> stale input/time debt settled
  -> leases reactivated exactly once

Outcome or Title
  -> gameplay leases retired
```

## Validation boundary

This loop is derived from source order and predicates. It was not executed in a browser.
