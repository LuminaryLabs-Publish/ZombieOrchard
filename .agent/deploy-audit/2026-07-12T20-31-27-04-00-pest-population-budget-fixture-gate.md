# Deploy audit: pest population budget fixture gate

**Timestamp:** `2026-07-12T20-31-27-04-00`

## Current proof

`tests/smoke.mjs` verifies only the Entry route, Play transition and apple population. It does not enter night, force spawns, test capacity, measure simulation/draw counts, clear pests, verify retirement, or compare visible population state.

## Required fixtures

```txt
spawn below capacity -> accepted
spawn at capacity -> typed CapacityReached
long night -> active count remains bounded
day transition -> declared retention/retirement policy
clear pest -> exactly one retirement and reward
duplicate clear -> rejected without duplicate reward
stale generation clear -> rejected
large contact set -> bounded deterministic damage
population snapshot -> stable revision and fingerprint
canvas frame -> matching population revision
source/dist/Pages -> equivalent population and budget results
```

## Gate

Do not claim bounded pest populations, stable encounter difficulty, predictable frame cost, exact retirement or visible population parity until these fixtures pass on `main`.
