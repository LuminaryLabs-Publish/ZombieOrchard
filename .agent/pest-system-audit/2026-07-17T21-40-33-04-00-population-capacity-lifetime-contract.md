# Pest-system audit: population capacity and lifetime contract

**Timestamp:** `2026-07-17T21-40-33-04-00`

## Current system

```txt
storage: active-session state.pests[]
spawn source: night tick random predicate
spawn position: radius around orchard origin
movement: direct pursuit of player
contact: condition damage inside distance 8
player retirement: Clear at distance below 58, two hits
other retirement: none
```

## Risk boundary

The system has no explicit upper bound. Population growth and player threat are driven by elapsed night time, while retirement depends on player action. The same array controls simulation cost, collision/contact work, snapshot size and render cost.

## Proposed policy

```txt
PestPopulationPolicy {
  revision,
  softCapacity,
  hardCapacity,
  spawnRatePerSecond,
  maxSpawnPerTick,
  maxLifetimeSeconds,
  retireOnDay,
  retireBeyondDistance,
  updateBudgetPerTick,
  renderBudgetPerFrame
}
```

## Suggested first implementation slice

1. Add a hard capacity to `active-session-domain-kit` configuration.
2. Replace direct random append with one admitted spawn function.
3. Add stable `spawnedAt` and `generation` fields.
4. Define phase-exit and lifetime retirement explicitly.
5. Preserve player-clear reward settlement separately from policy retirement.
6. Publish population count and revision in the snapshot.
7. Add a deterministic long-night fixture before adding renderer complexity.

## Invariants

```txt
0 <= populationCount <= hardCapacity
one accepted spawn -> one unique pest id
one pest -> at most one retirement settlement
policy retirement -> no player clear reward
clear retirement -> exactly one score/scrap settlement
stale run/phase/population generation -> no mutation
projectedCount <= accepted render budget
```

## Non-goals

This audit does not prescribe a specific capacity, redesign enemy AI, add pooling, change difficulty, or require a new engine domain. The smallest high-value change is explicit population admission and retirement inside the existing active-session boundary.

## Validation

No runtime or fixture implementation was added.