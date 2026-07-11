# Gameplay audit — Play, New Game, Title, Outcome, and reset loop

Timestamp: `2026-07-10T22-11-24-04-00`

## Intended loop

```txt
Entry
  -> Play or New Game
  -> fresh orchard run
  -> collect, clear, build, manage, and survive
  -> Pause / Resume
  -> failure or voluntary exit
  -> Outcome or Title
  -> optional fresh run
```

## Actual loop

```txt
page load
  -> run already exists and ticks

Play
  -> show Gameplay
  -> same run continues

New Game
  -> show Run Setup
  -> show Gameplay
  -> same run continues

Pause
  -> show Paused
  -> same run continues ticking

Title
  -> show Entry
  -> same run continues ticking

failure
  -> ended = true
  -> composition shows Outcome

Outcome -> Title
  -> show Entry
  -> next tick sees ended = true
  -> show Outcome again
```

## Persistent state at risk

A nominal New Game can retain:

```txt
resource-ledger.values and last
pressure-field.channels
orchard-world apples
construction-runtime built rows and message
roster-runtime actors and message
inventory-runtime equipped value
active-session day
active-session phase
active-session player position, condition, stamina
active-session pests
active-session score
active-session message
active-session ended
interface selected indices and fields
interface-composition previous screen
```

## Product impact

1. A player cannot trust New Game to start cleanly.
2. Pause does not protect the player from damage.
3. Returning to Title does not stop progression or pressure.
4. Outcome is sticky because ended state is never retired.
5. Re-entry cannot be attributed to a new run.
6. Future save/resume work would have no stable session identity to persist.
7. Existing smoke coverage can pass while all these failures remain.

## Required gameplay contract

```txt
start
  -> clean candidate state
  -> committed session epoch
  -> running

pause
  -> same epoch
  -> no gameplay mutation

resume
  -> same epoch
  -> continue from same fingerprint

reset/new game
  -> new epoch
  -> preset-backed clean state

end
  -> same epoch
  -> one ended transition
  -> outcome projection

title
  -> stop or retire current session
  -> no automatic Outcome bounce
```

## Fixture scenarios

1. Mutate every reset-owned domain, invoke New Game, and assert complete preset restoration.
2. End a run, route to Title, advance multiple ticks, and assert Entry remains active.
3. Pause during night with a nearby pest and assert player condition, pest positions, score, pressure, and tick fingerprint remain unchanged.
4. Start, reset, start again, and assert session epochs are `1`, `2`, and `3` with one live owner.
5. Stop and dispose, then assert no further automatic or manual mutation is accepted.

## Next safe ledge

`ZombieOrchard Runtime Session Instance Authority + Start/Reset/Title/Outcome Fidelity Fixture Gate`