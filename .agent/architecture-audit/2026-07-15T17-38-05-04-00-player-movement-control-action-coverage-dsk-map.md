# Architecture audit: player movement control action coverage

**Timestamp:** `2026-07-15T17-38-05-04-00`  
**Status:** `player-movement-action-coverage-authority-audited`

## Summary

The architecture has a movement consumer in `active-session-domain-kit` and a movement presentation consumer in `world-canvas-render-kit`, but no input DSK owns capability discovery, action production, normalization, lifecycle cancellation, movement admission, or frame acknowledgement.

## Plan ledger

**Goal:** compose movement as a renderer-neutral and device-neutral domain instead of adding ad hoc key listeners to the game host.

- [x] Locate the movement command and position mutation.
- [x] Locate every browser and HTML command producer.
- [x] Confirm no directional producer exists.
- [x] Map the required parent domain and subkits.
- [ ] Implement the authority without moving device code into gameplay.

## Current ownership

```txt
HTML click delegation
  -> collect / clear / next-phase
  -> route actions

active-session-domain-kit
  -> owns move command
  -> mutates player x/y by 22 units
  -> owns proximity checks

world-canvas-render-kit
  -> projects accepted player x/y

missing
  -> device capability
  -> movement action map
  -> held input lifecycle
  -> normalized movement state
  -> position revision
  -> movement result
  -> first matching frame acknowledgement
```

## Required DSK

`zombie-orchard-player-movement-control-action-coverage-authority-domain`

```txt
capability observation
  -> control profile admission
  -> keyboard / pointer-touch / gamepad / on-screen producers
  -> normalized PlayerActionState
  -> focus and lifecycle arbitration
  -> MovementCommand admission
  -> PlayerPositionRevision
  -> MovementResult
  -> Canvas2D presentation receipt
  -> FirstPlayerMovementFrameAck
```

## Domain boundary

Gameplay remains authoritative for bounds, speed policy, collisions, proximity, and accepted position. Browser adapters only emit normalized action intent. Canvas2D only renders immutable accepted snapshots.

## Validation boundary

No runtime DSK, browser adapter, or fixture was implemented.
