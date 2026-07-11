# Known gaps — ZombieOrchard

## Primary architecture chain

There is no authoritative chain joining lifecycle, clock, commands, random decisions, rendering, replay and persistence.

```txt
lifecycle command
  -> runtime/session identity and epoch
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

## Runtime-session and lifecycle gaps

1. The mutable graph is constructed at module evaluation before Play.
2. No `runtimeId`, `sessionId`, `runId`, `sessionEpoch`, `graphRevision` or `lifecycleRevision` exists.
3. Play, New Game and Start route into the same graph.
4. New Game does not create fresh resource, pressure, orchard, construction, roster, inventory or active-session state.
5. Pause, Title and Outcome are routes, not lifecycle barriers.
6. No restart transaction or atomic authority transfer exists.
7. The RAF request ID and callback generation are not retained.
8. The delegated HTML listener has no removal lease.
9. Renderers expose no disposal service.
10. `window.GameHost` is permanent, raw and not revocable.
11. No ordered idempotent disposal result exists.
12. Snapshots carry no runtime/session provenance.

## Fixed-step clock gaps

13. `draw()` submits one hard-coded `1 / 60` step per RAF callback.
14. The RAF timestamp is ignored.
15. Simulation speed follows callback cadence rather than wall time.
16. Long stalls have no catch-up, defer or drop policy.
17. No wall-time baseline, accumulator, fixed-step descriptor or catch-up budget exists.
18. No monotonic `simulationTickId`, independent `renderFrameId` or `clockRevision` exists.
19. Pause and inactive routes do not stop simulation mutation.
20. `GameHost.tick(dt)` can mutate between RAF callbacks.
21. Automatic and manual mutation have no exclusion lease.
22. Stale callbacks have no session/epoch/generation rejection.
23. Canvas, HTML and GameHost do not acknowledge a committed tick.

## Capability and transaction gaps

24. No canonical public capability gateway exists.
25. Browser actions call `engine.command()` directly and discard results.
26. Commands carry no runtime/session/epoch, lifecycle or tick identity.
27. Parent actions can publish child mutations before parent completion.
28. Child rejection can be concealed by parent success.
29. Resource and gameplay mutations have no shared rollback boundary.
30. No command/transaction id, idempotency cache or result-to-frame acknowledgement exists.

## Seeded randomness gaps

31. `orchard-world-kit` uses process-global `Math.random()` for apple tree selection.
32. Apple IDs are generated from random strings.
33. Apple x and y offsets use the same global source.
34. Apple rarity uses the same global source.
35. Startup generation of 26 apples consumes at least 130 global random draws.
36. Every successful collection triggers one refill and at least five more global draws.
37. `active-session-domain-kit` uses the same global source for every eligible night spawn trial.
38. Successful pest admission consumes additional random angle and random-id draws.
39. Apple generation can change future pest outcomes by advancing the shared source.
40. Display cadence changes pest trial count and random cursor advancement.
41. No `runSeed`, `randomPolicyId`, policy version or seed fingerprint exists.
42. No named random streams or stream isolation exists.
43. No deterministic PRNG algorithm is declared.
44. No per-stream state or monotonic cursor exists.
45. No random decision ID or typed draw result exists.
46. Rejected command cursor behavior is undefined.
47. Rolled-back transaction cursor behavior is undefined.
48. Duplicate command random behavior is undefined.
49. Random string IDs prevent stable entity identity across replay.
50. No committed apple or pest entity sequence exists.

## Replay gaps

51. No replay event sequence or journal exists.
52. No command envelope records admitted player inputs.
53. No committed tick receipt records system-driven random decisions.
54. No random receipt binds a draw to a command, transaction or tick.
55. No canonical durable-state fingerprint exists.
56. No manifest, preset or random-policy fingerprint is recorded.
57. No replay verifier can reproduce or compare a run.
58. No first-divergence result identifies event, stream, cursor and state mismatch.
59. `engine.snapshot()` is presentation state, not a replay artifact.
60. Canvas and HTML output are not correlated with random receipt ranges.
61. No stale replay, wrong policy or wrong manifest rejection exists.

## Persistence gaps

62. No versioned save/load envelope exists.
63. No migration, staged restore, load epoch, commit or rollback exists.
64. No save captures random algorithm state, stream cursors or entity sequences.
65. Restoring only gameplay state would not preserve future random continuation.
66. No atomic load proves the first rendered restored frame.

## Proof and deployment gaps

67. The smoke test proves only Entry to Play and apple presence.
68. No runtime-session identity or fresh-run fixture exists.
69. No cadence, pause, stall or tick/render fixture exists.
70. No capability or transaction fixture exists.
71. No same-seed startup fixture exists.
72. No different-seed intentional-divergence fixture exists.
73. No apple/pest stream-isolation fixture exists.
74. No rejected, duplicate or rollback cursor fixture exists.
75. No fixed-tick replay parity fixture exists.
76. No first-divergence localization fixture exists.
77. No save/restore random-continuation fixture exists.
78. No browser seed/policy/receipt observation fixture exists.
79. Pages deployment is not gated on these authority contracts.

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

Do not claim fresh New Game state, authoritative pause, cadence-independent simulation, deterministic seeds, isolated random systems, replayability, resumable random continuation, stable entity identity or atomic persistence until the corresponding fixtures pass on `main`.