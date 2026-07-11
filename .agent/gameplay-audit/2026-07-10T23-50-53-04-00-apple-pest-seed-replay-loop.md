# Gameplay audit — apple and pest seed/replay loop

**Run:** `2026-07-10T23-50-53-04-00`

## Current loop

```txt
game construction
  -> seed 26 apples through global randomness

collect command
  -> find nearest apple
  -> remove apple
  -> replenish back to 26 through global randomness
  -> add resources and score

next-phase command
  -> enter night

each night tick
  -> random spawn admission
  -> optional random pest angle and ID
  -> deterministic pursuit from current positions
  -> damage
  -> possible ended state
```

## Determinism failures

1. Initial apple layouts differ on every construction.
2. Apple IDs, positions and kinds cannot be reconstructed.
3. Collection changes future random consumption through replenishment.
4. Pest admission depends on the number of ticks executed.
5. Pest IDs and angles cannot be reconstructed.
6. No decision rows explain why a spawn happened or did not happen.
7. Equal user actions cannot reproduce score or failure timing.

## Required replay input

```txt
session seed
preset/content fingerprint
committed command rows
committed simulation tick count
fixed-step configuration
```

## Required replay output

```txt
initial orchard fingerprint
apple replenish decision rows
pest admission and spawn rows
per-tick committed fingerprints
final resources, pressure, player, pests, score and ended state
replay receipt with final fingerprint
```

## Stream policy

```txt
world stream
  initial apple population
  apple replenishment
  apple kind and stable identity

encounter stream
  pest admission
  pest angle and stable identity
```

The streams must remain independent so adding an apple attribute does not change pest timing.

## Acceptance scenario

```txt
seed 7421
start one session
move through a deterministic command schedule
collect a known apple
advance to night
commit a fixed number of simulation ticks
record spawn decisions
clear or receive damage
compare full receipt against a second run
```

Both runs must produce identical decisions and final fingerprints.
