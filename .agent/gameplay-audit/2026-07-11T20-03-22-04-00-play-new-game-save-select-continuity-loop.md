# Gameplay audit — Play, New Game and Save Select Continuity

## Plan ledger

**Goal:** separate fresh-run, continue-run and load-slot semantics so each player-facing action has one authoritative gameplay result.

- [x] Trace Entry actions.
- [x] Trace New Game and Start actions.
- [x] Trace the existing Save Select domain.
- [x] Trace domain state required for continuation.
- [x] Define gameplay continuity rules.
- [ ] Implement lifecycle and persistence transactions.

## Current player-facing loop

```txt
Entry
  -> Play -> existing active-session graph
  -> New Game -> Run Setup -> existing active-session graph
  -> Settings

Save Select
  -> unreachable
  -> empty generic screen
  -> Back only
```

The labels imply three different intents, but the runtime has only one retained graph and no saved continuation.

## Required intent split

```txt
Play / Continue
  -> resolve preferred compatible save slot
  -> typed load result
  -> restored run

New Game
  -> stage canonical fresh graph
  -> optional slot assignment
  -> fresh run result

Load Game / Save Select
  -> display authoritative slot index
  -> select exact slot and expected revision
  -> typed load result

Start
  -> commit the candidate configured by Run Setup
```

No label should route directly into an unknown retained graph.

## Continuation-critical gameplay state

```txt
resources
  money, apples, wood, scrap

pressures
  rowPressure, curse

orchard
  trees, apple entities and kinds

construction
  catalog state, built objects, message

roster
  actors, roles, message

inventory
  items, equipped item

active session
  day, phase, player pose/condition/stamina,
  pests, score, message, ended state

continuation authority
  committed tick, command sequence,
  random stream states, entity sequences
```

## Main gameplay defect

A snapshot-only save would capture visible current values but not future causality. After load, global `Math.random()` would continue from an unrelated process state, so apple refills and pest admission would diverge immediately from uninterrupted play.

```txt
save state S
  -> continue uninterrupted -> future F1

load raw snapshot S
  -> unrelated Math.random continuation -> future F2

F1 != F2
```

## Required gameplay results

```txt
NewRunResult
ContinueRunResult
LoadSlotResult
SaveRunResult
DeleteSlotResult
MigrationResult
CorruptSlotResult
```

Each result must identify the run, slot, schema, state fingerprint and first visible frame when applicable.

## Terminal and pause policy

Persistence must explicitly define:

```txt
whether paused runs can save
whether ended runs can save as summaries
whether loading an ended run opens Outcome
whether autosave occurs before terminal transition
whether Save Select can be opened while a run is active
whether failed load returns to prior active/paused route
```

These are lifecycle policies, not renderer decisions.

## Required gameplay fixtures

```txt
New Game never loads prior state
Continue loads the selected compatible slot
Save Select targets exact slot revision
loaded resource, orchard, construction, roster,
inventory and active-session state match saved state
future apple/pest sequence matches uninterrupted continuation
ended-save route policy is deterministic
failed load leaves current gameplay unchanged
```

## Validation status

Documentation only. Current Play and New Game semantics remain route-only, and Save Select remains unreachable.