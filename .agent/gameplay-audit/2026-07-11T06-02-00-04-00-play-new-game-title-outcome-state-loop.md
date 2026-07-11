# Gameplay audit — Play, New Game, Title, and Outcome state loop

## Timestamp

```txt
2026-07-11T06-02-00-04-00
```

## Current player-facing loop

```txt
Entry
  -> Play -> Active Session
  -> New Game -> Run Setup -> Start -> Active Session

Active Session
  -> collect, clear, next phase
  -> Build, Market, Roster, Inventory, Codex
  -> Pause -> Interrupt
  -> condition reaches zero -> Outcome

Interrupt
  -> Resume -> Active Session
  -> Title -> Entry

Outcome
  -> Title -> Entry
```

The visible loop implies fresh runs, pause, terminal outcome, and return-to-title behavior. The implementation provides route changes only.

## State retained across lifecycle-looking actions

```txt
resources
pressure values
apples and random IDs
built structures
hired actors
inventory and equipped item
player position, condition, stamina
pests
score
day and phase
message
ended flag
interface selected indexes and fields
```

## Concrete failure paths

### New Game is not new

```txt
mutate resources/world/session
  -> Title
  -> New Game
  -> Start
  -> same closures and same mutated values
```

### Pause is not pause

```txt
night active session
  -> Pause route
  -> RAF continues
  -> pressure ticks
  -> pest admission and pursuit continue
  -> player damage can continue
  -> ended can become true
  -> automatic route to Outcome
```

### Title after Outcome is unstable

```txt
active-session.ended = true
  -> composition auto-routes to Outcome
  -> player chooses Title
  -> route moves to Entry
  -> next engine tick still sees ended = true
  -> composition auto-routes back to Outcome
```

### Play after Outcome cannot recover

```txt
Outcome -> Title -> Play
  -> same ended active-session
  -> next tick routes back to Outcome
```

## Required gameplay lifecycle semantics

### Play

Play should either resume an explicitly suspended identified session or create a fresh session by declared policy. It must never ambiguously reuse a process-lifetime graph.

### New Game / Start

Start must commit a fresh preset-backed graph with initial resources, pressure, world, inventory, player, score, day, phase, and `ended = false` under a new session epoch.

### Pause / Resume

Pause must freeze simulation mutation while allowing stable UI rendering. Resume must continue the same session and epoch.

### Outcome

Outcome must be entered once from a terminal gameplay result. Terminal score/day/state must be immutable after finalization.

### Title

Title must retire or suspend the session by explicit policy. An ended session must not automatically reclaim the route after retirement.

## Required typed results

```txt
StartSessionResult
PauseSessionResult
ResumeSessionResult
EndSessionResult
ReturnToTitleResult
ResetSessionResult
DisposeRuntimeResult
```

Each result should contain:

```txt
accepted
reason
sessionId
beforeEpoch
afterEpoch
beforeLifecycle
afterLifecycle
committedTickId
terminalResultId
cleanupStatus
firstFrameAcknowledged
```

## Fixture matrix

```txt
Play from boot -> initial state under session epoch 1
mutate -> Title -> New Game -> Start -> initial state under epoch 2
Pause at night -> ticks/renders -> gameplay fingerprint unchanged
Resume -> mutation continues under same epoch
condition reaches zero -> one immutable terminal result
Outcome -> Title -> ten ticks -> remains Entry
Outcome -> Title -> Play -> fresh non-ended session
Reset twice -> one committed replacement per accepted command
duplicate stale Start command -> typed rejection
```

## Priority

This gate precedes fixed-step clock, capability reachability, command atomicity, replay, and persistence because all later proof requires a stable run owner.
