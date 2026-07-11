# Gameplay audit — Core-loop movement admission gap

Timestamp: `2026-07-10T20-30-23-04-00`

## Intended loop

```txt
move through orchard
  -> approach apple
  -> collect apple
  -> gain apples and money
  -> increase score and pressure
  -> build or trade
  -> switch phase
  -> clear approaching pests
  -> survive additional days
```

## Actual browser loop

```txt
fixed starting position
  -> Collect if a random apple happens to be within 42 units
  -> otherwise receive "No apple close enough"
  -> no movement control exists
  -> Next Phase can still start night pressure
  -> pests eventually approach the fixed player
  -> Clear may become usable
```

## Finding

The core orchard loop depends on movement, but movement is not admitted through the browser interaction surface.

`active-session.command("move")` mutates player coordinates in 22-unit increments and clamps them to the orchard bounds. The renderer never invokes it. Apple placement is randomized across the tree grid, so the starting state does not guarantee a collectible apple near `{ x: 0, y: 180 }`.

The game can therefore begin in a state where the player cannot perform the first intended resource-producing action.

## Secondary loop gaps

```txt
Build
  reachable through one nested Storage Shed action

Market
  screen reachable, transaction loop absent

Roster
  screen reachable, hire loop absent from UI

Inventory
  screen reachable, equip loop absent from UI

Session Select
  domain exists, route absent
```

## Required admission contract

Movement needs a typed result:

```json
{
  "capabilityId": "active-session.move",
  "accepted": true,
  "reason": "moved",
  "prior": { "x": 0, "y": 180 },
  "next": { "x": 22, "y": 180 },
  "sessionId": "...",
  "simulationTick": 0
}
```

Rejected movement must distinguish:

```txt
session_not_running
paused
outcome_active
invalid_vector
at_boundary
disposed
```

## Fixture scenario

```txt
seed deterministic world
start new session
assert active-session route
move toward known apple
assert movement result accepted
assert player coordinate changed
collect apple
assert collect result accepted
assert apple count, money, score, and world apple identity changed
pause
attempt movement
assert rejected and coordinates unchanged
resume
move again
assert accepted
```

## Dependency

This gameplay gate must sit beneath runtime lifecycle authority. Adding movement before Pause and session-state guards would expose another command that continues to mutate gameplay while non-gameplay screens are active.

## Non-goals

- no new crop systems
- no new pests
- no economy rebalance
- no new Market catalog
- no world renderer rewrite
- no content expansion before the intended loop is reachable and testable