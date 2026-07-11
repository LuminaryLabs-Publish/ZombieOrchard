# Gameplay audit — Outcome, Title and Play Reuse Loop

## Summary

The terminal state is stored inside the only active-session instance. Outcome and Title navigation do not retire that instance. A player who returns to the title after failure cannot start a fresh run because the next Play or Start reuses `ended = true`.

## Source path

```txt
active-session tick
  -> player condition reaches 0
  -> condition clamped to 0
  -> ended = true
  -> message = "The orchard has fallen."

interface-composition tick
  -> reads active-session snapshot
  -> ended && active != outcome
  -> move("outcome")

Outcome title action
  -> move("entry") only

Entry play or Run Setup start
  -> move("active-session") only

next engine tick
  -> active-session remains ended
  -> composition moves back to outcome
```

## State retained across the supposed restart

```txt
resource values and last mutation
pressure channels
orchard apple population
construction catalog, built objects and message
roster actors and message
inventory items and equipped selection
day and phase
player position, condition and stamina
pests
score
terminal message
ended flag
```

## Additional lifecycle consequence

The engine ticks every RAF regardless of route. Entry, Run Setup, Pause, Construction, Inventory and Outcome do not suspend pressure growth or other tickable domains. This is connected to, but does not replace, the separate fixed-step clock and pause-authority work.

## Required gameplay policy

```txt
run A ended
  -> mutations for run A are terminally fenced
  -> Outcome may read run A summary
  -> Title exits run A
  -> New Game stages run B from canonical preset
  -> run B commits with a distinct runId and epoch
  -> run B begins with fresh gameplay state
```

A new run must not mutate the ended instance in place. It must instantiate a new graph or a complete candidate state set, validate it and atomically transfer authority.

## Required result classes

```txt
started
restarted
exited-to-title
rejected-stale-run
rejected-invalid-lifecycle
failed-candidate-validation
rolled-back
```

## Required fixtures

```txt
Outcome -> Title -> Play fresh-run proof
Outcome -> Title -> New Game -> Start fresh-run proof
mid-run New Game explicit replacement policy
resource reset proof
pressure reset proof
orchard reset proof
construction/roster/inventory reset proof
player/pest/day/score reset proof
predecessor command rejection
candidate failure rollback
```

The current smoke test does not execute any terminal or restart path.