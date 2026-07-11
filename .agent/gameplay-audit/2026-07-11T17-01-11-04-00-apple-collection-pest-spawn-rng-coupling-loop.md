# Gameplay audit: Apple Collection and Pest Spawn RNG Coupling

## Plan ledger

**Goal:** show how player collection timing and browser tick cadence currently alter future orchard and pest outcomes through one shared global random sequence.

- [x] Trace startup apple generation.
- [x] Trace collection-triggered apple refill.
- [x] Trace night pest trials and spawn creation.
- [x] Identify cross-system draw coupling.
- [x] Define isolated deterministic policies.
- [ ] Add executable gameplay parity fixtures.

## Current loop

```txt
startup
  -> generate 26 apples
  -> 5 random draws per apple

successful collection
  -> remove one apple
  -> generate one replacement
  -> consume 5 more global random draws

night simulation tick
  -> consume one global random spawn trial
  -> if accepted, consume random angle and random id
```

## Coupling defect

The global random sequence makes unrelated gameplay actions affect one another:

```txt
collect apple before next night tick
  -> advance global cursor by five draws
  -> pest admission reads a different value
  -> later pest count and placement diverge
```

Current display-cadence timing compounds the problem:

```txt
more RAF callbacks
  -> more simulation ticks
  -> more pest trials
  -> faster global cursor advancement
```

## Required gameplay policy

```txt
apple placement stream
  -> affected only by committed apple generation

apple rarity stream
  -> affected only by committed apple rarity decisions

pest admission stream
  -> exactly one draw per committed eligible night tick

pest placement stream
  -> draws only after a committed spawn admission

entity identity sequence
  -> monotonic committed sequence, no random draw
```

## Replay cases

1. Same seed and same collection commands produce the same apple identities, positions and kinds.
2. Collecting apples does not alter the pest-admission stream.
3. Same committed tick schedule produces the same pest admissions and placements.
4. Rejected collection does not consume an apple stream cursor.
5. Rejected or rolled-back spawn does not consume authoritative pest cursors.
6. A replay mismatch identifies the first stream and cursor that diverged.

No deterministic gameplay claim is currently valid.