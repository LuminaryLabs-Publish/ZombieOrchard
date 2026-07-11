# Known gaps — ZombieOrchard

## Primary architecture gap

There is no authoritative runtime session and clock boundary joining lifecycle, graph ownership, tick admission, public capabilities, transactions, rendering, terminal outcome, reset, disposal and persistence.

```txt
lifecycle command
  -> session identity and epoch
  -> admitted wall-time sample
  -> committed simulation tick
  -> public capability gateway
  -> transactional mutation
  -> rendered acknowledgement
  -> terminal result or rollback
```

## Session and lifecycle gaps

1. The mutable graph is constructed before Play.
2. No runtime, session or epoch identity exists.
3. Play, New Game and Start route into the same graph.
4. Pause, Title and Outcome do not gate all-domain ticking.
5. Outcome is not an immutable exactly-once result.
6. Title after Outcome can return to Outcome on the next tick.
7. RAF IDs, listener leases and renderer ownership are not retained.
8. Render snapshots carry no session provenance.

## Fixed-step clock gaps

9. `draw()` submits one hard-coded `1/60` step per RAF.
10. Simulation speed follows display cadence rather than wall time.
11. A 30 Hz display runs half as many simulation steps as 60 Hz.
12. A 120 Hz display runs twice as many simulation steps as 60 Hz.
13. Background throttling has no catch-up, defer or drop policy.
14. The runtime is not a wall-time accumulator.
15. There is no maximum catch-up-step budget.
16. There is no overrun or dropped-time result.
17. `ctx.frame` conflates tick count with frame-like identity.
18. There is no monotonic committed simulation tick ID.
19. There is no independent render frame ID.
20. There is no clock revision or clock fingerprint.
21. Pause and inactive routes do not stop pressure or gameplay ticks.
22. Resume has no accumulator reset policy.
23. Visibility resume has no baseline-reset policy.
24. `GameHost.tick(dt)` can advance the graph between RAF callbacks.
25. Manual and automatic tick paths have no exclusion or lease policy.
26. A manual tick can trigger pressure, pests, damage and Outcome routing.
27. Renderers do not acknowledge which committed tick they consumed.

## Capability and transaction gaps

28. No canonical capability registry or public gateway exists.
29. Browser actions call `engine.command()` directly and discard results.
30. `GameHost` exposes raw command and manual-tick authority.
31. Parent actions can publish child mutations before parent completion.
32. Child rejection can be concealed by parent success.
33. Resource and gameplay mutations have no shared rollback boundary.
34. No result remains pending until a rendered frame acknowledges it.

## Randomness, replay and persistence gaps

35. Apple and pest generation use global `Math.random()`.
36. No seed, random stream cursor, decision journal or replay receipt exists.
37. No deterministic state fingerprint exists.
38. No versioned save/load envelope, migration, staged restore or load epoch exists.
39. `engine.snapshot()` is presentation state, not a restorable save.

## Proof and deployment gaps

40. The smoke test proves only Entry to Play and apple presence.
41. No session lifecycle fixture exists.
42. No 30/60/120 Hz cadence-parity fixture exists.
43. No pause-freeze or visibility-resume fixture exists.
44. No catch-up budget or dropped-time fixture exists.
45. No automatic/manual tick exclusion fixture exists.
46. No committed-tick/render-frame correlation fixture exists.
47. No capability, transaction, replay or persistence fixture exists.
48. Pages deployment is not gated on these authority contracts.

## Dependency order

```txt
runtime session instance authority
  -> fixed-step clock authority
  -> public capability gateway and reachability
  -> composite command transaction authority
  -> seeded random and replay authority
  -> committed durable-state fingerprint
  -> versioned save/load authority
  -> deployment proof
```

## Do not claim

Do not claim cadence-independent simulation, authoritative pause, deterministic replay, safe manual stepping, fixed-step catch-up, stable terminal state or tick-to-frame correlation until the corresponding fixtures pass on `main`.
