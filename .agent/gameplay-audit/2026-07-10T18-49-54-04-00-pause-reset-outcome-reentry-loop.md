# Gameplay audit — Pause, reset, and outcome re-entry loop

**Timestamp:** `2026-07-10T18-49-54-04-00`

## Current gameplay lifecycle

```txt
page load
  -> active-session state already exists
  -> automatic ticks begin

Play
  -> interface transition to active-session
  -> no start transaction

New Game
  -> run-setup screen
  -> Start transitions to active-session
  -> no reset transaction

Pause
  -> interrupt screen
  -> automatic gameplay ticks continue

Failure
  -> active-session.ended = true
  -> composition routes to outcome

Outcome -> Title
  -> transition to entry
  -> next composition tick sees ended = true
  -> routes back to outcome
```

## State that leaks through Pause

```txt
pressure-field.rowPressure
pressure-field.curse
active-session pest spawning during night
pest movement
player condition damage
failure transition
runtime frame and elapsed counters
```

## State that New Game does not reset

```txt
resources
pressure
apple layout
built structures
roster
inventory equipment
player position and condition
pests
day and phase
score
message
ended flag
interface history
```

## Root cause

The interface composition treats screens as navigation state, while gameplay domains are permanent singleton state. No session owner translates Play, New Game, Pause, Resume, Outcome, or Title intent into gameplay lifecycle transactions.

## Required command results

```txt
session.start
session.pause
session.resume
session.reset
session.stop
session.dispose
```

Each result must include:

```txt
transitionId
sessionId
command
accepted
reason
previousState
nextState
simulationTick
stateFingerprintBefore
stateFingerprintAfter
```

## Acceptance scenarios

1. Load page and wait: gameplay fingerprint stays at preset idle state.
2. Play from idle: one session starts and ticks.
3. Pause during night with nearby pests: no gameplay-owned value changes.
4. Resume: ticking continues from the same committed state.
5. New Game after mutations: every declared session-owned domain follows reset policy.
6. Fail, open Outcome, choose Title: Entry persists until explicit Play/New Game.
7. Start after ended: policy either creates a fresh session or rejects with a stable reason; it never silently reuses ended state.
8. Stop/dispose: no later automatic mutation occurs.

## Next safe ledge

```txt
ZombieOrchard Runtime Session Clock and Lifecycle Authority
+ Pause/Reset/Refresh-Rate Fixture Gate
```