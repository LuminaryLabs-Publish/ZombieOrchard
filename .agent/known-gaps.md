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
  -> versioned save envelope
  -> atomic slot result
  -> staged load candidate
  -> load epoch and authority transfer
  -> first restored frame acknowledgement
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

## Save Select and slot gaps

48. `session-select-domain-kit` exists but Entry never routes to it.
49. The preset gives Save Select only a Back action.
50. No slot metadata is supplied to `current.meta.slots`.
51. No slot index domain owns available, compatible, corrupt or conflicted saves.
52. No Save, Load, Delete, Rename, Import or Export capability exists.
53. The renderer cannot project a typed slot command result.
54. No active slot or save identity is bound to the run.

## Persistence envelope gaps

55. No `saveId`, `slotId` or monotonic `slotRevision` exists.
56. No schema ID or schema version exists.
57. No preset ID or preset fingerprint is stored.
58. No runtime, random or entity policy version is stored.
59. No created/updated timestamp policy exists.
60. No durable-domain allowlist separates continuation state from transient presentation resources.
61. No committed `simulationTickId`, command sequence or lifecycle revision is captured.
62. No random stream state, cursor or deterministic entity sequence is captured.
63. No canonical state fingerprint or checksum exists.
64. No envelope validation or read-after-write validation exists.

## Save transaction gaps

65. No save command envelope or typed save result exists.
66. No expected slot revision or compare-and-swap conflict check exists.
67. No atomic slot write and index update boundary exists.
68. Storage quota, serialization and backend failures are not represented.
69. Duplicate or stale save behavior is undefined.
70. A failed save has no guarantee that the prior valid envelope remains intact.
71. No persistence journal records admitted and rejected attempts.

## Migration and corruption gaps

72. No ordered migration registry exists.
73. No pure version-to-version migration contract exists.
74. Unknown future schemas cannot be distinguished from malformed data.
75. No corruption quarantine preserves original bytes for diagnostics or export.
76. No compatibility result explains preset or policy mismatch.
77. No migration fingerprint proves deterministic output.

## Load transaction gaps

78. `engine.snapshot()` is a one-way projection with no restore inverse.
79. Mutable domain state lives inside closures with no hydrate service.
80. Runtime `ctx.frame` and `ctx.elapsed` are absent from snapshots.
81. Future `Math.random()` continuation cannot be reconstructed.
82. No candidate graph is staged from loaded state.
83. No domain-by-domain hydration validation exists.
84. No `loadEpoch` fences predecessor callbacks, commands or render work.
85. No atomic authority swap or rollback exists.
86. No first-restored-frame acknowledgement exists.
87. A failed load has no explicit guarantee that the current live run remains unchanged.
88. No load result correlates the slot envelope, restored fingerprint and frame ID.

## Render and observation gaps

89. The world canvas renders orchard/session state on every route.
90. Entry, Run Setup, Pause, Save Select and Outcome can show predecessor-run world pixels.
91. Canvas and HTML publish no run, save, load or frame identity.
92. GameHost samples live mutable state rather than a committed frame record.
93. No first-run-frame or first-restored-frame acknowledgement exists.
94. The Save Select renderer reads static interface metadata rather than authoritative slot-index state.

## Proof and deployment gaps

95. The smoke test proves only initial Entry-to-Play and apple presence.
96. No runtime-session identity or fresh-run fixture exists.
97. No cadence, pause, stall or manual-step fixture exists.
98. No capability or transaction fixture exists.
99. No same-seed, stream-isolation or replay parity fixture exists.
100. No save/load roundtrip fixture exists.
101. No random-continuation-after-load fixture exists.
102. No slot conflict or atomic-write fixture exists.
103. No migration fixture exists.
104. No corrupt-save quarantine fixture exists.
105. No failed-load rollback fixture exists.
106. No first-restored-frame fixture exists.
107. No repeated save/load RAF or listener leak fixture exists.
108. Pages deployment is not gated on these authority contracts.

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

Do not claim fresh New Game state, authoritative pause, cadence-independent simulation, deterministic replay, reachable Save Select, resumable continuation, schema compatibility, atomic persistence, random continuation after load, corrupt-save recovery, first-restored-frame coherence, lifecycle safety or resource retirement until the corresponding fixtures pass on `main`.