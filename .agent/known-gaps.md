# Known gaps — ZombieOrchard

## Primary architecture gap

There is no authoritative run boundary joining session identity, fixed-step time, capability admission, seeded randomness, replay, rendering, and proof readback.

```txt
lifecycle intent
  -> session epoch and seed
  -> fixed simulation ticks
  -> admitted commands
  -> partitioned random decisions
  -> committed state fingerprint
  -> render projection
  -> bounded result and replay journals
```

## Specific gaps

### Session identity and reset fidelity

1. `createOrchardGame()` constructs the full mutable graph once.
2. The browser starts ticking before Play or New Game.
3. No session identifier or epoch distinguishes runs.
4. Play and New Game are screen transitions only.
5. No preset-backed reset factory exists.
6. Resources, pressure, apples, construction, roster, equipment, player state, pests, score, phase, and ended state can survive route changes.
7. Title does not retire the current run.
8. Outcome -> Title can bounce back because ended state remains authoritative.
9. No stop or dispose contract exists.
10. RAF and delegated listener ownership cannot be released.

### Timing and lifecycle eligibility

11. `engine.tick(1 / 60)` runs once per RAF callback.
12. Simulation speed changes with refresh rate and throttling.
13. No accumulator, catch-up limit, dropped-time policy, or committed simulation tick exists.
14. Every domain ticks regardless of session or screen state.
15. Pressure and pest simulation continue while Pause or non-gameplay screens are displayed.
16. `GameHost.tick()` can inject manual ticks beside automatic mode.

### Interaction capability reachability

17. `active-session.move` has no browser binding.
18. No keyboard, pointer, gamepad, or accessible movement control exists.
19. Random apple placement does not guarantee a reachable starting collectible.
20. `roster-runtime.hire` and `inventory-runtime.equip` are unbound.
21. Scoped `select` and `set-field` commands are unbound.
22. Session Select has no incoming route.
23. Market, Codex, Roster, Inventory, and Session Select overstate the operational surface.
24. Disabled action metadata is not rendered as disabled controls.

### Seeded randomness and replay

25. `orchard-world.seedApples()` uses global `Math.random()` for tree selection, IDs, offsets, and kind.
26. `active-session.addPest()` uses global `Math.random()` for angle and ID.
27. Night spawn admission calls global `Math.random()` once per simulation tick.
28. The preset has no seed or random policy.
29. `createOrchardGame()` accepts no random provider.
30. The kit context exposes no random service.
31. World and encounter randomness share the same implicit global source.
32. A change in apple generation can perturb later pest randomness.
33. Random IDs are not stable or monotonic.
34. Snapshots expose outcomes but not seed, stream state, draw index, or decision reason.
35. Runtime events are cleared each tick and cannot carry durable random proof.
36. Commands have no stable sequence or durable result journal.
37. No replay command format or replay receipt exists.
38. No canonical committed state fingerprint exists.
39. Renderers record no session epoch, simulation tick, seed, or consumed random-decision range.
40. The smoke test asserts only that apples are nonempty.
41. The Pages gate cannot detect same-seed divergence, stream-coupling regressions, or nondeterministic outcome timing.

### Command and service correctness

42. Interface composition discards nested child command results.
43. Nested commands can notify subscribers before the parent transaction completes.
44. Resource payment is boolean-only and lacks attribution.
45. Inventory accepts arbitrary equipment IDs.
46. Construction falls back to the first catalog item for an unknown ID.

## Explicit non-gaps for the next pass

```txt
world canvas fidelity
orchard content volume
additional Market items
new pest types
economy balance
Market artwork
renderer replacement
full architectural rewrite
```

## Dependency order

```txt
session instance authority
  -> reset, title, outcome, stop and dispose proof
  -> fixed-step clock and pause eligibility
  -> 30/60/120 Hz parity proof
  -> capability registry and movement admission
  -> seeded random source and stream partitioning
  -> command/random decision replay
  -> committed state and render provenance
  -> Market transaction causality
  -> broader gameplay and content work
```
