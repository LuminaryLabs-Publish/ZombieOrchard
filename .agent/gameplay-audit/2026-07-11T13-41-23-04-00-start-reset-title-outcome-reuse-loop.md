# Gameplay audit: Start, reset, Title and Outcome graph reuse

## Plan ledger

**Goal:** prove that every New Game creates fresh gameplay state and that terminal or retired sessions cannot continue mutating.

- [x] Trace Entry, New Game, Start, Pause, Title and Outcome routes.
- [x] Trace active-session, resource, pressure, orchard and construction state ownership.
- [x] Confirm no reset or fresh-session constructor is called by route actions.
- [x] Define the required session handoff contract.
- [ ] Add fresh-run, terminal and reset fixtures.

## Current route behavior

```txt
Entry -> Play
  -> interface route becomes active-session
  -> existing graph remains authoritative

Entry -> New Game -> Start
  -> route passes through run-setup
  -> existing graph remains authoritative

Active Session -> Pause -> Title
  -> route returns to entry
  -> pressure, orchard, resources, player, pests and ended state remain

Failure -> Outcome -> Title
  -> route returns to entry
  -> active-session.ended remains true
  -> composition tick can route back to Outcome
```

## State reused across nominal runs

```txt
resource values and last transaction label
pressure channels
orchard trees and current apple population
construction catalog, built rows and message
roster actors and message
inventory equipment and items
active-session day, phase, player, pests, score, message and ended latch
interface screen fields and selected indices
composition active and previous route
```

## Gameplay risk

The UI presents `New Game` and `Start`, but the underlying behavior is a route change into the existing graph. A player can return to Title and re-enter with prior resources, pressure, construction, pests, damage or terminal state. There is no typed distinction between:

```txt
resume current session
start a new session
restart after failure
return to title while retaining a session
retire the current session
```

## Required command model

```txt
PlayCommand
  policy: resume an admitted resumable session or create one explicitly

NewGameCommand
  policy: always construct a fresh graph with a new sessionId and incremented epoch

PauseCommand / ResumeCommand
  policy: lifecycle transition only; clock consumes the result

ReturnToTitleCommand
  policy: explicit retain-or-retire decision

OutcomeCommand
  policy: latch one terminal result and stop gameplay mutation

RestartCommand
  policy: fresh graph plus atomic old-session retirement
```

## Fixture gate

```txt
New Game after prior mutations
  -> default resources restored
  -> pressure restored
  -> fresh apples and future seeded stream identity
  -> no prior construction, pests, damage, score or ended latch

Title after failure
  -> no automatic return to Outcome after retirement

restart
  -> new session ID and epoch
  -> old graph rejects commands and ticks

pause
  -> lifecycle state changes without creating a new run
```