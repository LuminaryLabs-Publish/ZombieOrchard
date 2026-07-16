# Gameplay audit: ambient randomness and run replay loop

**Timestamp:** `2026-07-15T22-40-29-04-00`

## Summary

Initial apples, replacement apples and night pests depend on the shared ambient random sequence. Collecting an apple changes the next random cursor, so unrelated command timing can alter later apple kinds, positions and IDs. Pest generation shares the same global source and can also perturb future values.

## Plan ledger

**Goal:** make run outcomes depend only on the accepted seed, named random streams, accepted commands and fixed simulation steps.

- [x] Trace initial orchard generation.
- [x] Trace collect-triggered apple refill.
- [x] Trace night pest spawning.
- [x] Identify random coupling between systems.
- [ ] Partition streams and prove replay equivalence.

## Current gameplay loop

```txt
create run
  -> seed 26 apples through global Math.random
collect
  -> remove apple
  -> refill immediately through global Math.random
night tick
  -> random spawn eligibility
  -> random pest angle and id
next run
  -> begin from whatever ambient browser random state exists
```

## Required loop

```txt
accepted RunGeneration
  -> orchard-layout stream creates initial state
  -> apple-refill stream handles collection replacements
  -> pest-spawn stream handles night encounters
  -> entity-id stream creates stable identities
  -> command log and fixed steps are recorded
  -> canonical snapshot hashes prove replay
```

## Gameplay proof gate

Two independent runtimes with the same seed, algorithm version, commands and fixed-step sequence must produce equal canonical hashes after initial creation, collection/refill, pest spawning, save/restore and same-seed retry. A different seed must produce a classified divergent run.
