# Known gaps — ZombieOrchard

## Primary architecture chain

There is no authoritative runtime-session and clock boundary joining lifecycle, graph ownership, wall-time admission, fixed ticks, public capabilities, transactions, rendering, terminal outcome, disposal and persistence.

```txt
lifecycle command
  -> runtime/session identity and epoch
  -> admitted callback generation
  -> monotonic wall-time sample
  -> bounded fixed-step plan
  -> committed simulation ticks
  -> render-frame acknowledgement
  -> capability and transaction results
  -> terminal result, handoff or rollback
```

## Runtime-session and lifecycle gaps

1. The mutable graph is constructed at module evaluation before Play.
2. No `runtimeId`, `sessionId`, `sessionEpoch`, `graphRevision` or `lifecycleRevision` exists.
3. Play, New Game and Start route into the same graph.
4. New Game does not create fresh resource, pressure, orchard, construction, roster, inventory or active-session state.
5. Pause, Title and Outcome are routes, not lifecycle barriers.
6. Returning to Title has no explicit retain-or-retire policy.
7. The ended latch can route the UI back to Outcome after Title.
8. No restart transaction or atomic authority transfer exists.
9. No off-line graph construction or startup rollback exists.
10. The RAF request ID and callback generation are not retained.
11. The delegated HTML listener has no removal lease.
12. Renderers expose no disposal service.
13. `window.GameHost` is permanent, raw and not revocable.
14. No ordered idempotent disposal result exists.
15. Snapshots carry no runtime/session provenance.

## Fixed-step clock gaps

16. `draw()` submits one hard-coded `1 / 60` step per RAF callback.
17. The RAF timestamp is ignored.
18. Simulation speed follows display callback cadence rather than wall time.
19. A 30 Hz display advances about half the simulated time of 60 Hz per wall second.
20. A 120 Hz display advances about twice the simulated time of 60 Hz per wall second.
21. Background throttling and long stalls have no catch-up, defer or drop policy.
22. The runtime has no wall-time baseline or accumulator.
23. There is no versioned fixed-step descriptor.
24. There is no maximum catch-up-step budget.
25. There is no typed overrun, deferred-time or dropped-time result.
26. The runtime can execute exactly one tick per call, not zero or several ticks per render callback.
27. `ctx.frame` counts tick calls and is not a render-frame receipt.
28. There is no monotonic committed `simulationTickId`.
29. There is no independent `renderFrameId`.
30. There is no `clockRevision` or clock observation fingerprint.
31. Pause and inactive routes do not stop pressure or gameplay ticks.
32. Resume has no wall-time baseline reset policy.
33. Visibility restore has no baseline reset policy.
34. `GameHost.tick(dt)` can mutate the graph between RAF callbacks.
35. Automatic and manual tick paths have no exclusion lease.
36. Manual tick can advance pressure, pests, damage, failure and Outcome routing.
37. Stale callbacks have no session/epoch/generation rejection.
38. Canvas, HTML and GameHost do not acknowledge a committed simulation tick.
39. A zero-tick render frame and a multi-tick catch-up frame cannot be represented.

## Gameplay timing gaps

40. Pressure growth depends on callback cadence because supplied delta is constant per callback.
41. Pest spawn trial count depends on callback cadence.
42. Pest pursuit distance and contact damage depend on callback cadence.
43. Time to failure and Outcome routing therefore depend on display cadence.
44. Pause can visually present an interrupt screen while simulation continues.
45. Stall recovery can either lose time or produce uncontrolled later behavior because no policy exists.

## Capability and transaction gaps

46. No canonical capability registry or public gateway exists.
47. Browser actions call `engine.command()` directly and discard results.
48. Commands carry no runtime/session/epoch, lifecycle or committed tick identity.
49. Parent actions can publish child mutations before parent completion.
50. Child rejection can be concealed by parent success.
51. Resource and gameplay mutations have no shared rollback boundary.
52. No result remains pending until a rendered frame acknowledges it.

## Randomness, replay and persistence gaps

53. Apple and pest generation use global `Math.random()`.
54. No seed, stream cursor, decision journal or replay receipt exists.
55. No deterministic durable-state fingerprint exists.
56. No versioned save/load envelope, migration, staged restore or load epoch exists.
57. `engine.snapshot()` is presentation state, not a restorable save.

## Proof and deployment gaps

58. The smoke test proves only Entry to Play and apple presence.
59. No runtime-session identity or fresh-run fixture exists.
60. No startup rollback, single-RAF, listener-removal, host-revocation or disposal fixture exists.
61. No 30/60/120 Hz equal-wall-time parity fixture exists.
62. No zero-tick or multi-tick render callback fixture exists.
63. No pause-freeze or visibility-resume fixture exists.
64. No catch-up budget or overrun-result fixture exists.
65. No automatic/manual tick exclusion fixture exists.
66. No tick/render/GameHost correlation fixture exists.
67. No capability, transaction, replay or persistence fixture exists.
68. Pages deployment is not gated on these authority contracts.

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

Do not claim fresh New Game state, safe restart, lifecycle cleanup, single-RAF ownership, authoritative pause, cadence-independent simulation, bounded stall recovery, deterministic manual stepping, tick/render correlation, deterministic replay, stable terminal state or atomic persistence until the corresponding fixtures pass on `main`.