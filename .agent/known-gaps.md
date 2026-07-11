# Known gaps — ZombieOrchard

## Primary architecture gap

There is no authoritative run boundary joining lifecycle, time, capability admission, composite commands, deterministic randomness, replay, persistence, rendering, and proof readback.

```txt
lifecycle intent
  -> session epoch and seed
  -> fixed simulation ticks
  -> admitted capability
  -> one command transaction
  -> random decisions
  -> committed state fingerprint
  -> versioned save envelope
  -> atomic restore/load epoch
  -> one publication and render observation
  -> bounded result journals
```

## Existing prerequisite gaps

### Session, clock, capability, command, and replay

1. The mutable graph is constructed before Play.
2. Play and New Game are route changes, not session transactions.
3. No session epoch, stop, dispose, or reset factory exists.
4. One fixed tick runs per RAF callback.
5. All domains tick on every screen.
6. Movement and several services are unreachable.
7. Nested commands discard child results and can publish twice.
8. Resource and target validation is weak.
9. Apple and pest generation use global `Math.random()`.
10. No command, random-decision, replay, or committed-state journal exists.

## New persistence-specific gaps

### Dormant Save Select surface

11. `session-select-domain-kit` exists but has no incoming route.
12. The preset defines only a Back action.
13. The preset supplies no `meta.slots`.
14. The renderer has a slot-card branch that always receives an empty list.
15. No Save, Load, Overwrite, Delete, Rename, Import, or Export action exists.
16. No slot selection result or disabled/corrupt/incompatible state is projected.

### Save envelope and identity

17. No save schema version exists.
18. No product, campaign, or content revision identity exists.
19. No session epoch, load epoch, committed tick, or command range exists.
20. No declared seed, random stream cursor, or replay receipt exists.
21. No canonical durable-state fingerprint exists.
22. No save timestamp, progress summary, or slot fingerprint exists.

### Export and restore ownership

23. `engine.snapshot()` aggregates presentation snapshots only.
24. Domains expose no `exportState` or durable/transient classification.
25. Domains expose no validation, staged restore, commit, or rollback service.
26. Randomly generated IDs make snapshot equality unstable.
27. Action catalogs, selected indexes, messages, and route projection are mixed with gameplay data.
28. No dependency order exists for restoring resources, world, construction, roster, inventory, session, and route.
29. No partial-load rollback exists.
30. No load epoch rejects stale input, ticks, commands, or render observations.

### Persistence adapter and migration

31. No in-memory persistence adapter exists for deterministic tests.
32. No browser storage adapter exists.
33. No storage quota, unavailable-storage, or serialization error result exists.
34. No migration registry or incompatible-version rejection exists.
35. No corrupted-slot quarantine exists.
36. No atomic slot overwrite or delete result exists.

### Proof and deployment

37. `GameHost` exposes no save/load commands or detached journals.
38. No fixture proves save -> reset -> load returns the same durable state.
39. No fixture proves invalid load leaves all live domains unchanged.
40. No fixture proves migration determinism.
41. No browser smoke proves slot persistence survives reload.
42. The Pages workflow gates only Entry -> Play and apple presence.

## Explicit non-gaps for this pass

```txt
world canvas fidelity
orchard content volume
new Market items
new pest types
economy balance
renderer replacement
cloud save
```

## Dependency order

```txt
session instance authority
  -> fixed-step clock and pause eligibility
  -> capability reachability
  -> composite command transaction
  -> seeded random and replay
  -> committed durable-state fingerprint
  -> versioned save envelope
  -> slot index and persistence adapter
  -> migration and atomic load transaction
  -> load epoch and render provenance
  -> save/load deployment fixtures
```
