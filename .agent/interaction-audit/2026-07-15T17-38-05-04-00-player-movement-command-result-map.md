# Interaction audit: player movement command/result map

**Timestamp:** `2026-07-15T17-38-05-04-00`

## Summary

The current interaction boundary exposes raw `move` mutation but no normalized action state, command identity, expected position revision, typed result, cancellation result, or presentation acknowledgement.

## Plan ledger

**Goal:** make movement an explicit command/result contract that rejects stale or ineligible work and settles once.

- [x] Trace current click and command delegation.
- [x] Trace active-session movement mutation.
- [x] Identify missing identities and results.
- [x] Define the required command map.
- [ ] Implement and fixture accepted, rejected, cancelled, and stale cases.

## Current command

```txt
engine.command("active-session", "move", { x, y })
  -> add x * 22 and y * 22
  -> clamp to bounds
  -> return { accepted: true }
```

## Required command

```txt
MovementCommand
  ControlGeneration
  InputDeviceGeneration
  RouteRevision
  RunGeneration
  CommandId
  ExpectedPlayerPositionRevision
  DirectionVector
  WallTimestamp

MovementResult
  accepted | rejected | cancelled | stale
  reason
  previous PlayerPositionRevision
  next PlayerPositionRevision
  applied displacement
  bounds outcome
  SimulationRevision
```

## Settlement

Only the active gameplay route may admit movement. Focused overlays, blur, hidden documents, retired runs, duplicate commands, and stale position revisions must reject or cancel without mutating player state.

## Validation boundary

No command schema, idempotency fixture, stale-command fixture, or first-frame acknowledgement exists yet.
