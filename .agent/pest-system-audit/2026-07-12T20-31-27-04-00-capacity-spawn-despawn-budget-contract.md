# Pest system audit: capacity, spawn, despawn and budget contract

**Timestamp:** `2026-07-12T20-31-27-04-00`

## Contract

A pest population must be addressed by:

```txt
runtimeSessionId
runGeneration
populationId
populationRevision
configurationFingerprint
```

Each pest must carry:

```txt
pestId
pestGeneration
spawnRevision
spawnReason
age
lifecycleState
position
condition
```

## Capacity policy

The authority must define:

- maximum active population;
- maximum spawn admissions per step and per phase;
- simulation work budget;
- render work budget;
- contact and damage aggregation policy;
- expiry, distance, terminal and run-reset retirement rules.

## Invariants

1. Active count never exceeds accepted capacity.
2. IDs are unique within one run generation.
3. A pest retires at most once.
4. Stale-generation clear or tick results cannot mutate successors.
5. Damage is derived from one admitted contact set.
6. Snapshot and visible frame cite the same population revision.
7. Source, dist and Pages expose equivalent policy and results.
