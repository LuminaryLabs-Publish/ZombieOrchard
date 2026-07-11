# Known gaps — ZombieOrchard

## Primary architecture chain

There is no authoritative chain joining run lifecycle, clock, commands, random decisions, rendering, replay and persistence.

```txt
lifecycle command
  -> runtime/run/session identity
  -> admitted callback generation
  -> bounded fixed-step plan
  -> committed simulation tick
  -> admitted public command and transaction
  -> staged random decisions
  -> committed random receipts
  -> durable-state fingerprint
  -> render-frame acknowledgement
  -> replay or save continuation
```

## Runtime-session and fresh-run gaps

1. The mutable graph is constructed at module boot before Play.
2. No `runtimeId`, `runtimeGeneration`, `runId`, `sessionEpoch`, `graphRevision` or `lifecycleRevision` exists.
3. Play, New Game and Start route into the same graph.
4. New Game does not create fresh resource, pressure, orchard, construction, roster, inventory or active-session state.
5. Pause, Title and Outcome are routes, not lifecycle barriers.
6. Active-session terminal `ended` state is retained after Title.
7. Outcome -> Title -> Play reuses the ended run.
8. Composition automatically routes that reused run back to Outcome on the next tick.
9. No canonical fresh-run state factory exists.
10. No staged graph validation exists.
11. No atomic run authority transfer or rollback exists.
12. No stale predecessor command or callback rejection exists.
13. No route-to-run binding exists.
14. No first fresh-run frame acknowledgement exists.
15. The RAF request ID and callback generation are not retained.
16. The delegated HTML listener has no removal lease.
17. Renderers expose no disposal service.
18. `window.GameHost` is permanent, raw and not revocable.
19. No ordered idempotent disposal result exists.
20. Snapshots carry no runtime/session provenance.

## Fixed-step clock gaps

21. `draw()` submits one hard-coded `1 / 60` step per RAF callback.
22. The RAF timestamp is ignored.
23. Simulation speed follows callback cadence rather than wall time.
24. Long stalls have no catch-up, defer or drop policy.
25. No wall-time baseline, accumulator, fixed-step descriptor or catch-up budget exists.
26. No monotonic `simulationTickId`, independent `renderFrameId` or `clockRevision` exists.
27. Pause and inactive routes do not stop simulation mutation.
28. `GameHost.tick(dt)` can mutate between RAF callbacks.
29. Automatic and manual mutation have no exclusion lease.
30. Stale callbacks have no session/epoch/generation rejection.
31. Canvas, HTML and GameHost do not acknowledge a committed tick.

## Capability and transaction gaps

32. No canonical public capability gateway exists.
33. Browser actions call `engine.command()` directly and discard results.
34. Commands carry no runtime/session/epoch, lifecycle or tick identity.
35. Parent actions can publish child mutations before parent completion.
36. Child rejection can be concealed by parent success.
37. Resource and gameplay mutations have no shared rollback boundary.
38. No command/transaction ID, idempotency cache or result-to-frame acknowledgement exists.

## Seeded randomness and replay gaps

39. Apple generation and pest generation use process-global `Math.random()`.
40. Startup, collection refill and night callbacks advance one invisible shared source.
41. Display cadence changes pest trial count and random cursor advancement.
42. No run seed, policy version, named stream, cursor or typed draw result exists.
43. Random string IDs prevent stable entity identity across replay.
44. Rejected, duplicate and rolled-back cursor behavior is undefined.
45. No replay event sequence, verifier or first-divergence result exists.
46. No canonical durable-state fingerprint exists.
47. Canvas and HTML output are not correlated with random receipt ranges.

## Persistence gaps

48. No versioned save/load envelope exists.
49. No migration, staged restore, load epoch, commit or rollback exists.
50. No save captures random algorithm state, stream cursors or entity sequences.
51. Restoring only gameplay state would not preserve future random continuation.
52. No atomic load proves the first rendered restored frame.

## Render and observation gaps

53. The world canvas renders orchard/session state on every route.
54. Entry, Run Setup, Pause and Outcome can show predecessor-run world pixels.
55. Canvas and HTML publish no run/frame identity.
56. GameHost samples live mutable state rather than a committed frame record.
57. No first-run-frame or first-restored-frame acknowledgement exists.

## Proof and deployment gaps

58. The smoke test proves only initial Entry-to-Play and apple presence.
59. No runtime-session identity or fresh-run fixture exists.
60. No Outcome -> Title -> Play fixture exists.
61. No full-domain reset fixture exists.
62. No candidate failure rollback fixture exists.
63. No stale callback/command fixture exists.
64. No RAF/listener leak fixture exists.
65. No cadence, pause, stall or manual-step fixture exists.
66. No capability or transaction fixture exists.
67. No same-seed, stream-isolation or replay parity fixture exists.
68. No save/restore random-continuation fixture exists.
69. Pages deployment is not gated on these authority contracts.

## Dependency order

```txt
runtime session instance authority
  -> fixed-step clock authority
  -> public capability gateway
  -> composite command transaction authority
  -> seeded random and replay authority
  -> committed durable-state fingerprint
  -> versioned save/load authority
  -> deployment proof
```

## Do not claim

Do not claim fresh New Game state, restart, authoritative pause, cadence-independent simulation, deterministic seeds, replayability, resumable continuation, stable entity identity, atomic persistence, lifecycle safety or resource retirement until the corresponding fixtures pass on `main`.