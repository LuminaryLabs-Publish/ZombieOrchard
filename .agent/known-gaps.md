# Known gaps — ZombieOrchard

## Primary architecture gap

There is no authoritative runtime session boundary joining lifecycle, graph ownership, tick admission, rendering, input, diagnostics, terminal outcome, reset, disposal, and later persistence.

```txt
lifecycle intent
  -> admitted session command
  -> session identity and epoch
  -> candidate/fresh graph
  -> tick admission
  -> committed state
  -> render observation
  -> terminal result or rollback
  -> resource retirement
```

## Session-instance gaps

### Construction and identity

1. The full mutable graph is constructed before Play.
2. No `runtimeId`, `runtimeGeneration`, `sessionId`, or `sessionEpoch` exists.
3. Play does not declare whether it resumes or starts fresh.
4. New Game and Start do not create a new graph.
5. No preset/content revision is attached to a run.
6. No initial-state fingerprint exists.
7. No typed construction failure or rollback result exists.

### Lifecycle and route authority

8. Play, New Game, Start, Pause, Resume, Title, and Outcome are route changes only.
9. No lifecycle state machine exists.
10. No start, pause, resume, end, title, reset, stop, or dispose command exists.
11. Interface routes can change without a committed lifecycle result.
12. Active-session commands are accepted regardless of active screen.
13. Automatic Outcome routing infers lifecycle from mutable `ended` state.
14. Outcome does not capture an immutable terminal snapshot.
15. Title after Outcome is pulled back to Outcome on the next tick.
16. Play after Outcome reuses the ended session and returns to Outcome.
17. Title does not define whether the session is retired, suspended, or retained.

### Tick and pause admission

18. One fixed tick runs per RAF callback.
19. Every domain ticks on every screen.
20. Pressure advances on Entry, Run Setup, Pause, Title, and Outcome.
21. At night, pest admission, pursuit, and player damage continue while paused or on other screens.
22. No skipped-tick result exists.
23. Manual GameHost ticking can race future automatic ticking.
24. No stale tick or callback generation is rejected.

### Reset and fresh-run fidelity

25. Resources survive Title and New Game.
26. Pressure survives Title and New Game.
27. Apples and random IDs survive Title and New Game.
28. Built structures survive Title and New Game.
29. Hired actors survive Title and New Game.
30. Inventory/equipment survives Title and New Game.
31. Player position, condition, phase, pests, score, message, and ended state survive re-entry.
32. Interface selected indexes and fields also survive.
33. No atomic fresh-graph ownership transfer exists.
34. No reset-failure rollback exists.

### Runtime and resource ownership

35. RAF IDs are not retained.
36. No stop or restart service exists.
37. The delegated click listener has no removal handle.
38. The world renderer has no disposal handle.
39. The HTML renderer has no disposal handle.
40. GameHost is assigned globally without lease/release semantics.
41. No cleanup stack exists.
42. No active RAF/listener/global/resource counts exist.
43. Disposal cannot be proven idempotent.
44. A future remount can create duplicate owners.

### Command and result admission

45. Lifecycle actions carry no `commandId`.
46. No expected session identity or epoch is checked.
47. Duplicate Start clicks have no exactly-once policy.
48. Stale commands cannot be identified.
49. Results do not contain before/after lifecycle state.
50. Results do not correlate first committed tick or first rendered frame.
51. No lifecycle result journal exists.

### Render and diagnostics

52. Render snapshots carry no session provenance.
53. The world continues to render mutable state behind non-gameplay screens.
54. Outcome is projected from a mutable session closure.
55. No first-frame acknowledgement exists after start/reset.
56. No stale snapshot rejection exists.
57. GameHost exposes the raw mutable engine.
58. GameHost manual tick is unrestricted.
59. No detached lifecycle observation exists.

## Existing downstream gaps

### Fixed-step clock

60. Simulation speed depends on RAF cadence.
61. No wall-time accumulator, catch-up limit, or dropped-time policy exists.
62. Render frames and committed simulation ticks are not separate identities.

### Capability reachability

63. Movement and several implemented services remain unreachable.
64. Session Select remains dormant.
65. Market is visible without a real service.
66. Disabled-action projection is not authoritative.

### Composite commands

67. Nested commands discard child results.
68. Nested dispatch can publish before parent completion.
69. Resource and target validation is weak.
70. No transaction rollback or single-publication barrier exists.

### Randomness and replay

71. Apple and pest generation use global `Math.random()`.
72. Random IDs are unstable.
73. No seed, stream cursor, decision ledger, replay receipt, or state fingerprint exists.

### Persistence

74. Session Select has no incoming route or slot owner.
75. No save/load commands, adapter, schema, migration, atomic load, or load epoch exists.
76. `engine.snapshot()` is presentation state, not a restorable save.
77. No domain exposes export, validation, staged restore, commit, or rollback.

### Proof and deployment

78. The smoke test proves only Entry -> Play and apple presence.
79. No lifecycle fixture exists.
80. No pause/fresh-start/outcome/title/reset/disposal fixture exists.
81. No browser smoke proves one RAF/listener owner.
82. Pages is not gated on session lifecycle fidelity.

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
runtime session instance authority
  -> fixed-step clock authority
  -> capability reachability
  -> composite command transaction authority
  -> seeded random and replay authority
  -> committed durable-state fingerprint
  -> versioned save/load authority
  -> deployment proof
```
