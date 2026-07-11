# Known gaps — ZombieOrchard

## Primary architecture gap

There is no authoritative runtime session boundary joining lifecycle, graph ownership, tick admission, capabilities, transactions, rendering, input, diagnostics, terminal outcome, reset, disposal and persistence.

```txt
lifecycle intent
  -> admitted session command
  -> session identity and epoch
  -> candidate/fresh graph
  -> committed tick
  -> capability admission
  -> transactional mutation
  -> render observation
  -> terminal result or rollback
  -> resource retirement
```

## Session and lifecycle gaps

1. The full mutable graph is constructed before Play.
2. No runtime, session or epoch identity exists.
3. Play, New Game and Start route into the same graph.
4. Pause, Title and Outcome do not gate all-domain ticking.
5. Outcome does not finalize an immutable terminal result.
6. Title after Outcome is routed back to Outcome on the next tick.
7. Mutable gameplay state survives Title/New Game.
8. No fresh-graph transaction, stale-work rejection or idempotent disposal exists.
9. RAF IDs and listener leases are not retained.
10. GameHost exposes the raw engine and unrestricted manual tick.
11. Render snapshots carry no session provenance.

## Fixed-step clock gaps

12. Simulation speed depends on RAF cadence.
13. No wall-time accumulator, catch-up limit or dropped-time policy exists.
14. Render frames and committed simulation ticks are not separate identities.
15. Manual and automatic ticking have no mutual-exclusion policy.

## Capability reachability gaps

### Registry and classification

16. No canonical capability descriptor or registry exists.
17. No registry revision or fingerprint exists.
18. Domain command existence is not validated against public capability declarations.
19. No support-state taxonomy exists for supported, unreachable, dormant, unsupported and internal services.
20. Raw GameHost access bypasses any product capability boundary.

### Lifecycle and route admission

21. Capabilities carry no allowed lifecycle states.
22. Capabilities carry no allowed routes.
23. Active-session commands can be called regardless of active screen.
24. Next Phase has no explicit admission policy.
25. Static action disabled flags are not derived from lifecycle, route, target, resources or service readiness.

### Input and reachability

26. `active-session.move` has no shipped keyboard, pointer or accessible button binding.
27. Collect is bound, but the player cannot deliberately move to a collectible.
28. No fixture proves a fresh run has a reachable apple.
29. Roster Hire exists but has no browser binding.
30. Inventory Equip exists but has no browser binding.
31. Scoped select and set-field commands have no browser binding.
32. No binding IDs, device descriptors or accessibility alternatives exist.

### Target integrity

33. Inventory Equip accepts unknown item IDs.
34. Construction falls back to the first catalog item for unknown IDs.
35. Collect and Clear do not expose target identity in a typed result.
36. No target-revision or stale-target admission exists.

### Presentation truth

37. Market is presented as an available route despite no exchange runtime service.
38. Session Select is rendered but has no incoming route or slot owner.
39. Roster and Inventory cards are read-only despite implemented services.
40. The HTML button renderer does not project disabled state or reason.
41. Unsupported and dormant reasons are not visible.
42. DOM command results are discarded.
43. No capability result, projection revision or first-frame acknowledgement is exposed.

## Composite command transaction gaps

44. Public commands have no command or transaction identity.
45. Interface composition dispatches child work through public `engine.command()`.
46. Nested child commands publish before parent completion.
47. Child results are discarded and rejection can be concealed by parent success.
48. No complete action plan is preflighted.
49. Payment returns only a Boolean.
50. Resource and gameplay mutations are not staged or rolled back together.
51. No single-publication barrier, command journal, fingerprints or frame correlation exists.

## Randomness and replay gaps

52. Apple and pest generation use global `Math.random()`.
53. Random IDs are unstable.
54. No seed, stream partition, draw cursor, decision ledger or replay receipt exists.
55. No deterministic state fingerprint exists.

## Persistence gaps

56. Session Select has no stable slot authority.
57. No save/load commands, adapter, schema, migration, atomic load or load epoch exists.
58. `engine.snapshot()` is presentation state, not a restorable save.
59. No domain exposes export, validation, staged restore, commit or rollback.

## Proof and deployment gaps

60. The smoke test proves only Entry to Play and apple presence.
61. No lifecycle, clock, capability, transaction, replay or persistence fixture exists.
62. No browser smoke proves one RAF/listener owner.
63. No fixture proves movement, deliberate collection, hiring or equipment reachability.
64. No fixture proves Market is truthfully unsupported.
65. No fixture proves disabled-state projection matches capability admission.
66. No fixture proves command-result and first-frame correlation.
67. Pages deployment is not gated on these authority contracts.

## Explicit non-gaps for this pass

```txt
world canvas fidelity
orchard content volume
new Market offers
new pest types
economy balance
renderer replacement
cloud save
```

## Dependency order

```txt
runtime session instance authority
  -> fixed-step clock authority
  -> capability registry and reachability
  -> composite command transaction authority
  -> seeded random and replay authority
  -> committed durable-state fingerprint
  -> versioned save/load authority
  -> deployment proof
```