# Gameplay audit — Hidden Route Simulation Loop

**Timestamp:** `2026-07-11T21-40-49-04-00`

## Summary

Gameplay mutation is attached to page RAF cadence rather than an admitted run phase. Pressure begins aging at boot, and an unended active-session can continue pest movement and damage while non-gameplay routes cover the world.

## Plan ledger

**Goal:** trace player-visible route changes against hidden simulation mutation and define the gameplay invariants required for safe suspension.

- [x] Trace boot-to-Entry mutation.
- [x] Trace Pause and management routes.
- [x] Trace terminal behavior.
- [x] Define route-specific invariants.
- [ ] Implement and run gameplay fixtures.

## Current loop

```txt
boot
  -> tick pressure before Play

Play
  -> reveal already-aged retained graph

Pause or management route
  -> hide active-session HUD
  -> keep RAF and domain ticks running
  -> pressure/pests/damage may continue

Outcome
  -> active-session stops because ended
  -> pressure continues
```

## Required invariants

```txt
NO_RUN
  resources, pressure, apples, player, pests and score do not advance

RUNNING
  only admitted fixed steps mutate gameplay

PAUSED or SUSPENDED
  simulation fingerprint remains stable

TERMINAL
  no pressure, pest, player, score or economy mutation
```

## Management policy

A real-time management design is possible, but it must be explicit. For the current prototype, the safe default is suspension because the screens replace the active HUD and provide no threat feedback.

## Required proof

```txt
idle Entry for 600 frames -> unchanged simulation fingerprint
pause during nearby pest -> unchanged pest/player state
open Build for 600 frames -> declared policy observed
resume -> no catch-up burst
Outcome for 600 frames -> unchanged terminal fingerprint
```
