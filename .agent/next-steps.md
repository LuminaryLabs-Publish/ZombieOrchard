# Next steps — ZombieOrchard

## Next safe ledge

```txt
ZombieOrchard Deterministic Scenario Authority
+ Command/Frame Observation Fixture Gate
```

## Goal

Make one scenario reproducible and explainable from seed, command sequence, and tick sequence through committed state, render consumption, GameHost readback, and replay fingerprint.

## Implementation order

1. Add `ScenarioConfig` with schema version, scenario ID, seed, fixed delta, preset revision, and initial-state revision.
2. Add a shared deterministic random-source service with named streams and stable draw indices.
3. Replace direct `Math.random()` use in `orchard-world-kit` with named apple streams.
4. Replace direct `Math.random()` use in `active-session-domain-kit` with named pest streams.
5. Add runtime command sequence IDs and a bounded request/result journal.
6. Add activation IDs to scoped interface results.
7. Update `interface-composition.activate` to retain exact child command and transition results.
8. Retain durable bounded event rows instead of clearing all evidence before snapshot observation.
9. Add canonical snapshot serialization and state fingerprinting.
10. Add immutable committed-frame rows with command/event ranges and state fingerprints.
11. Add world-canvas consumption rows referencing committed frames.
12. Add HTML projection/consumption rows referencing committed frames and interaction results.
13. Add bounded JSON-safe `GameHost.scenario` observation methods.
14. Add a DOM-free scenario script runner.
15. Replay the same scenario twice and compare command, frame, render, and final fingerprints.
16. Run a different seed and prove structural invariants plus a distinct world fingerprint.
17. Add rejected and duplicate-command no-mutation assertions.
18. Gate `npm test` on deterministic scenario replay before build and Pages deployment.
19. Implement Market transaction causality as a scenario on the proven observation surface.

## Domain-update-first map

```txt
kit-runtime
  -> scenario services, command sequence, durable rows, committed frames

orchard-world-kit
  -> named deterministic random streams

active-session-domain-kit
  -> named deterministic random streams

interface-composition-kit
  -> parent/child result retention

world-canvas-render-kit
  -> frame consumption row

html-interface-render-kit
  -> projection and frame consumption row

game-host-diagnostics-kit
  -> bounded immutable scenario readback

smoke-fixture-kit
  -> deterministic replay and fingerprint gate
```

Only add new kits where no current owner exists:

```txt
deterministic-random-source-kit
state-fingerprint-kit
scenario-fixture-adapter-kit
```

## Acceptance checklist

```txt
[ ] Scenario config is versioned and JSON-safe.
[ ] Same seed creates the same initial orchard fingerprint.
[ ] Random draws use named streams and stable draw indices.
[ ] Gameplay code no longer calls global Math.random().
[ ] Commands have stable ordered IDs.
[ ] Parent activations retain exact child results.
[ ] Durable events survive into committed frame observations.
[ ] Committed frames include command/event ranges and state fingerprints.
[ ] Same seed + same commands + same ticks produces identical fingerprints.
[ ] Different seeds preserve invariants and produce distinct world fingerprints.
[ ] Rejected commands produce no gameplay fingerprint change.
[ ] Duplicate idempotent commands do not double-apply mutations.
[ ] World renderer records the committed frame it consumed.
[ ] HTML renderer records the committed frame and projection it consumed.
[ ] GameHost scenario readback is bounded, immutable, and JSON-safe.
[ ] DOM-free replay fixture passes twice from fresh engine creation.
[ ] npm test gates build and deployment on scenario proof.
[ ] Market transaction causality is tested after scenario authority exists.
```

## Avoid until proof exists

- economy tuning
- additional Market inventory
- new orchard content
- new pest types
- Market art expansion
- renderer replacement
- broad runtime refactors
- readiness claims based only on visual inspection