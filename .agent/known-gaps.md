# Known gaps — ZombieOrchard

## Primary architecture gap

There is no authoritative runtime-session boundary joining lifecycle, graph ownership, tick admission, public capabilities, transactions, rendering, terminal outcome, reset, disposal and persistence.

```txt
lifecycle command
  -> runtime/session identity and epoch
  -> admitted graph authority
  -> admitted wall-time sample
  -> committed simulation tick
  -> public capability gateway
  -> transactional mutation
  -> rendered acknowledgement
  -> terminal result, handoff or rollback
```

## Runtime-session and lifecycle gaps

1. The mutable graph is constructed at module evaluation before Play.
2. No `runtimeId`, `sessionId`, `sessionEpoch`, `graphRevision` or `lifecycleRevision` exists.
3. Play, New Game and Start route into the same graph.
4. New Game does not create fresh resource, pressure, orchard, construction, roster, inventory or active-session state.
5. Pause, Title and Outcome are routes, not lifecycle barriers.
6. Returning to Title does not declare whether the current run is retained or retired.
7. The `ended` active-session latch survives Title and can route the UI back to Outcome on a later tick.
8. No restart command or atomic old-session/new-session authority transfer exists.
9. No off-line graph construction or required-domain validation occurs before publication.
10. No startup rollback stack exists.
11. The RAF request ID is discarded.
12. No RAF generation token prevents stale callbacks from scheduling or mutating.
13. The HTML delegated click listener has no removal lease.
14. Runtime subscriptions have no session-owned lease collection.
15. Canvas and HTML renderers expose no `dispose()` or render-after-dispose rejection.
16. `window.GameHost` is not revocable.
17. `GameHost` exposes the raw engine and unrestricted tick authority.
18. No ordered idempotent disposal transaction exists.
19. No stable `DISPOSED` result or cleanup row journal exists.
20. Render snapshots carry no runtime/session provenance.

## Fixed-step clock gaps

21. `draw()` submits one hard-coded `1/60` step per RAF.
22. Simulation speed follows display cadence rather than wall time.
23. A 30 Hz display runs half as many simulation steps as 60 Hz.
24. A 120 Hz display runs twice as many simulation steps as 60 Hz.
25. Background throttling has no catch-up, defer or drop policy.
26. The runtime is not a wall-time accumulator.
27. There is no maximum catch-up-step budget.
28. There is no overrun or dropped-time result.
29. `ctx.frame` conflates tick count with frame-like identity.
30. There is no monotonic committed simulation tick ID.
31. There is no independent render frame ID.
32. There is no clock revision or clock fingerprint.
33. Pause and inactive routes do not stop pressure or gameplay ticks.
34. Resume has no accumulator reset policy.
35. Visibility resume has no baseline-reset policy.
36. `GameHost.tick(dt)` can advance the graph between RAF callbacks.
37. Manual and automatic tick paths have no exclusion or lease policy.
38. A manual tick can trigger pressure, pests, damage and Outcome routing.
39. Renderers do not acknowledge which committed tick they consumed.

## Capability and transaction gaps

40. No canonical capability registry or public gateway exists.
41. Browser actions call `engine.command()` directly and discard results.
42. Commands carry no runtime/session/epoch or lifecycle revision.
43. Parent actions can publish child mutations before parent completion.
44. Child rejection can be concealed by parent success.
45. Resource and gameplay mutations have no shared rollback boundary.
46. No result remains pending until a rendered frame acknowledges it.

## Randomness, replay and persistence gaps

47. Apple and pest generation use global `Math.random()`.
48. No seed, random stream cursor, decision journal or replay receipt exists.
49. No deterministic state fingerprint exists.
50. No versioned save/load envelope, migration, staged restore or load epoch exists.
51. `engine.snapshot()` is presentation state, not a restorable save.

## Proof and deployment gaps

52. The smoke test proves only Entry to Play and apple presence.
53. No runtime-session identity fixture exists.
54. No fresh-run/reset parity fixture exists.
55. No startup rollback fixture exists.
56. No single-RAF or stale-callback fixture exists.
57. No listener removal or host-revocation fixture exists.
58. No ordered-disposal fixture exists.
59. No session/frame correlation fixture exists.
60. No 30/60/120 Hz cadence-parity fixture exists.
61. No pause-freeze or visibility-resume fixture exists.
62. No catch-up budget or dropped-time fixture exists.
63. No automatic/manual tick exclusion fixture exists.
64. No capability, transaction, replay or persistence fixture exists.
65. Pages deployment is not gated on these authority contracts.

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

Do not claim fresh New Game state, safe restart, authoritative pause, lifecycle cleanup, single-RAF ownership, listener cleanup, revocable diagnostics, cadence-independent simulation, deterministic replay, stable terminal state or session-to-frame correlation until the corresponding fixtures pass on `main`.