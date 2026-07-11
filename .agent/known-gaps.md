# Known gaps — ZombieOrchard

## Primary architecture gap

There is no authoritative runtime session boundary joining lifecycle, graph ownership, tick admission, rendering, input, diagnostics, terminal outcome, reset, disposal and later persistence.

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

## Session and lifecycle gaps

1. The full mutable graph is constructed before Play.
2. No `runtimeId`, `runtimeGeneration`, `sessionId` or `sessionEpoch` exists.
3. Play does not declare whether it resumes or starts fresh.
4. New Game and Start do not create a new graph.
5. No preset/content revision is attached to a run.
6. No initial-state fingerprint exists.
7. No typed construction failure or rollback result exists.
8. Play, New Game, Start, Pause, Resume, Title and Outcome are route changes only.
9. No lifecycle state machine exists.
10. Interface routes can change without a committed lifecycle result.
11. Active-session commands are accepted regardless of the active route.
12. Automatic Outcome routing infers lifecycle from mutable `ended` state.
13. Outcome does not capture an immutable terminal snapshot.
14. Title after Outcome is pulled back to Outcome on the next tick.
15. Play after Outcome reuses ended state.
16. Every domain ticks on every screen.
17. Pressure, pest admission, pursuit and damage can continue while paused.
18. No stale tick or callback generation is rejected.
19. Resources, world, construction, roster, inventory and session state survive Title/New Game.
20. No atomic fresh-graph ownership transfer exists.
21. RAF IDs are not retained.
22. The delegated click listener and renderers have no disposal handles.
23. GameHost has no lease/release semantics.
24. Render snapshots carry no session provenance.
25. GameHost exposes the raw mutable engine and unrestricted manual tick.

## Fixed-step clock gaps

26. Simulation speed depends on RAF cadence.
27. No wall-time accumulator, catch-up limit or dropped-time policy exists.
28. Render frames and committed simulation ticks are not separate identities.
29. Manual and automatic ticking have no mutual-exclusion policy.

## Capability reachability gaps

30. Movement and several implemented services remain unreachable from the shipped interface.
31. Session Select remains dormant.
32. Market is visible without a real service.
33. Hiring and equipment mutation are implemented but not bound to usable actions.
34. Disabled-action projection is not authoritative.
35. There is no canonical capability registry.

## Composite command transaction gaps

### Identity and admission

36. Public commands have no `commandId`.
37. Composite actions have no `transactionId` or parent/child correlation.
38. Commands carry no expected session, epoch or committed tick.
39. Duplicate and stale commands cannot be identified.
40. No complete action plan is preflighted before mutation.

### Parent/child result integrity

41. `interface-composition` dispatches child work through public `engine.command()`.
42. The nested child command publishes before parent completion.
43. The nested child result is discarded.
44. The parent can return `accepted: true` while the required child rejects.
45. Parent results contain no child-results array.
46. A missing child domain can be concealed by parent success.
47. A future command-plus-route action can transition despite child rejection.

### Target and resource integrity

48. An unknown construction ID falls back to the first catalog item.
49. Resource payment returns only a Boolean.
50. Payment has no debit ID, before/after values, shortfall or reason.
51. Construction has no typed target-admission result.
52. Inventory equip accepts unknown item IDs.
53. Resource debit and built-object creation are not staged together.
54. No rollback restores resources after a later child failure.
55. No idempotency key prevents repeated side effects.

### Publication and proof

56. Accepted composite commands can publish more than once.
57. Rejected/rolled-back command publication policy is undefined.
58. Subscribers can observe intermediate partial state.
59. Events are cleared on the next tick and do not form a durable command journal.
60. Aggregate snapshots carry no command or transaction provenance.
61. Renderers cannot acknowledge the first frame consuming a committed command.
62. No before/after state fingerprints exist.
63. No command-result journal exists.
64. No fixture counts publications or proves rollback.

## Randomness and replay gaps

65. Apple and pest generation use global `Math.random()`.
66. Random IDs are unstable.
67. No seed, stream partition, draw cursor, decision ledger or replay receipt exists.
68. No deterministic state fingerprint exists.

## Persistence gaps

69. Session Select has no incoming route or slot owner.
70. No save/load commands, adapter, schema, migration, atomic load or load epoch exists.
71. `engine.snapshot()` is presentation state, not a restorable save.
72. No domain exposes export, validation, staged restore, commit or rollback.

## Proof and deployment gaps

73. The smoke test proves only Entry -> Play and apple presence.
74. No lifecycle, clock, capability, transaction, replay or persistence fixture exists.
75. No browser smoke proves one RAF/listener owner.
76. No fixture proves one publication per composite command.
77. No fixture proves child rejection propagates to the parent.
78. No fixture proves invalid target rejection instead of first-item fallback.
79. No fixture proves resource rollback.
80. Pages deployment is not gated on these authority contracts.

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
