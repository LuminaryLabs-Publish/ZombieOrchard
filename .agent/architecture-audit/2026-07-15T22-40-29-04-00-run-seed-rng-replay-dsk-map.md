# Architecture audit: run seed, RNG state and replay DSK map

**Timestamp:** `2026-07-15T22-40-29-04-00`

## Summary

The current architecture owns generated world state but not the random authority that produced it. `orchard-world-kit` and `active-session-domain-kit` call global `Math.random()` directly, preventing explicit run identity, stream isolation, snapshot restoration and deterministic replay.

## Plan ledger

**Goal:** introduce one semantic run authority around existing gameplay kits without moving resource, world, session or rendering truth into a generic utility.

- [x] Map current runtime, interface, world, session and rendering ownership.
- [x] Identify every ambient-random consumer.
- [x] Preserve all 27 implemented surfaces.
- [x] Define one parent domain and 19 child kits.
- [ ] Implement the authority and compatibility fixtures.

## Current DSK flow

```txt
orchardPreset
  -> createOrchardGame
  -> createKitRuntime
  -> orchard-world-kit
       -> Math.random tree selection
       -> Math.random apple offset
       -> Math.random apple kind
       -> Math.random apple id
  -> active-session-domain-kit
       -> Math.random pest angle
       -> Math.random pest id
  -> snapshots omit random state
```

## Required DSK flow

```txt
RunSeedAdmissionCommand
  -> run-seed-schema-kit
  -> run-generation-identity-kit
  -> rng-algorithm-version-kit
  -> rng-stream-partition-kit
     -> orchard-layout-rng-kit
     -> apple-refill-rng-kit
     -> pest-spawn-rng-kit
     -> deterministic-entity-id-kit
  -> rng-state-snapshot-kit
  -> deterministic-snapshot-hash-kit
  -> FirstSeedBoundWorldFrameAck
```

## Domain boundaries

- **Run identity domain:** seed, algorithm version, generation and compatibility.
- **Random stream domain:** named stream derivation, cursor and draw revision.
- **Orchard world domain:** consumes orchard and refill values, remains owner of trees/apples.
- **Active session domain:** consumes pest values, remains owner of pests and outcomes.
- **Persistence/replay domain:** stores seed, algorithm, stream cursors and accepted commands.
- **Presentation domain:** renders accepted snapshots and acknowledges the matching run revision.

## Invariants

```txt
no gameplay kit calls ambient Math.random
one RunGeneration binds one seed and algorithm version
named streams prevent unrelated systems from perturbing each other
entity IDs are deterministic within the run
snapshot restore resumes at the exact next draw
same seed plus same accepted commands plus same fixed steps yields the same canonical hash
```
