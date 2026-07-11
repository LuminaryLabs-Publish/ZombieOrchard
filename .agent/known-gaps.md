# Known gaps — ZombieOrchard

## Primary architecture gap

There is no authoritative run boundary joining lifecycle, time, capability admission, composite command transactions, seeded randomness, replay, rendering, and proof readback.

```txt
lifecycle intent
  -> session epoch and seed
  -> fixed simulation ticks
  -> admitted capability
  -> one command transaction
  -> child and resource results
  -> partitioned random decisions
  -> committed state fingerprint
  -> one state publication
  -> render observation
  -> bounded result and replay journals
```

## Specific gaps

### Session identity and reset fidelity

1. `createOrchardGame()` constructs the full mutable graph once.
2. The browser starts ticking before Play or New Game.
3. No session identifier or epoch distinguishes runs.
4. Play and New Game are screen transitions only.
5. No preset-backed reset factory exists.
6. Mutable gameplay state can survive route changes.
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

### Composite command transaction authority

25. Commands have no stable `commandId` or `transactionId`.
26. `interface-composition.activate` invokes nested children through public `engine.command()`.
27. Nested children can notify subscribers before parent completion.
28. The outer parent command notifies again after returning.
29. Child results are discarded by interface composition.
30. A required child rejection does not automatically reject the parent result.
31. A child mutation can occur before a later route failure.
32. There is no transaction preflight, staging, commit barrier, rollback or no-commit result.
33. Resource payment returns a boolean without attribution or before/after values.
34. Unknown construction IDs fall back to the first catalog item.
35. Inventory equipment accepts arbitrary IDs.
36. Roster hiring accepts payload-derived cost without a canonical offer row.
37. Ephemeral events are not a durable command journal.
38. `GameHost` exposes no bounded command/result journal.
39. Renderers expose no committed command identity or publication count.
40. No fixture proves one admitted user intent produces one committed publication.

### Seeded randomness and replay

41. `orchard-world.seedApples()` uses global `Math.random()` for tree selection, IDs, offsets, and kind.
42. `active-session.addPest()` uses global `Math.random()` for angle and ID.
43. Night spawn admission calls global `Math.random()` once per simulation tick.
44. The preset has no seed or random policy.
45. `createOrchardGame()` accepts no random provider.
46. The kit context exposes no random service.
47. World and encounter randomness share the same implicit global source.
48. Random IDs are not stable or monotonic.
49. Snapshots expose outcomes but not seed, stream state, draw index, or decision reason.
50. Commands have no durable sequence/result journal suitable for replay.
51. No replay command format or replay receipt exists.
52. No canonical committed state fingerprint exists.
53. Renderers record no session epoch, simulation tick, command ID, seed, or decision range.
54. The smoke test asserts only Entry -> Play and nonempty apples.
55. The Pages gate cannot detect transaction, cadence, reachability, or determinism regressions.

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
  -> composite command transaction and single publication
  -> seeded random source and stream partitioning
  -> command/random decision replay
  -> committed state and render provenance
  -> broader gameplay and content work
```
