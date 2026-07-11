# Known gaps — ZombieOrchard

## Primary architecture gap

There is no authoritative runtime session boundary joining lifecycle, graph ownership, tick admission, public capabilities, internal/debug policy, transactions, rendering, terminal outcome, reset, disposal and persistence.

```txt
lifecycle intent
  -> admitted session command
  -> session identity and epoch
  -> committed tick
  -> public capability gateway
  -> transactional mutation
  -> retained result
  -> rendered acknowledgement
  -> terminal result or rollback
  -> resource retirement
```

## Session and lifecycle gaps

1. The mutable graph is constructed before Play.
2. No runtime, session or epoch identity exists.
3. Play, New Game and Start route into the same graph.
4. Pause, Title and Outcome do not gate all-domain ticking.
5. Outcome does not finalize an immutable terminal result.
6. Title after Outcome can be routed back to Outcome on the next tick.
7. Mutable gameplay state survives Title/New Game.
8. No fresh-graph transaction, stale-work rejection or idempotent disposal exists.
9. RAF IDs and listener leases are not retained.
10. Render snapshots carry no session provenance.

## Fixed-step clock gaps

11. Simulation speed depends on RAF cadence.
12. No wall-time accumulator, catch-up limit or dropped-time policy exists.
13. Render frames and committed simulation ticks are not separate identities.
14. Manual and automatic ticking have no mutual-exclusion policy.

## Public capability gateway gaps

### Registry and admission

15. No canonical capability descriptor or registry exists.
16. No registry revision or fingerprint exists.
17. Domain command existence is not validated against public declarations.
18. No support-state taxonomy is enforced for public, unreachable, dormant, unsupported, internal and debug-only services.
19. Capabilities carry no allowed lifecycle states or routes.
20. Active-session commands can be called regardless of active screen.
21. Static disabled flags are not derived from lifecycle, route, target, resources or service readiness.

### Public caller path

22. Browser actions call `engine.command()` directly.
23. There is no public command envelope with session, binding, target or tick identity.
24. DOM callers discard accepted and rejected command results.
25. No result remains pending until a rendered frame acknowledges it.
26. No gateway journal or before/after state fingerprint exists.

### Internal and debug bypass

27. `GameHost` exposes the raw engine.
28. `GameHost.tick` can advance the same graph outside the RAF path.
29. Internal resource and pressure commands can bypass product capability policy.
30. No explicit debug lease, debug build policy or stale-lease rejection exists.
31. No detached diagnostics-only host surface exists.
32. A future capability registry could still be bypassed unless raw engine access is quarantined.

### Input and target reachability

33. `active-session.move` has no shipped keyboard, pointer or accessible button binding.
34. Collect is bound, but the player cannot deliberately move to a collectible.
35. No fixture proves a fresh run has a reachable apple.
36. Roster Hire and Inventory Equip have no browser bindings.
37. Inventory Equip accepts unknown item IDs.
38. Construction falls back to the first catalog item for unknown IDs.
39. Collect and Clear do not expose target identity in typed results.
40. No target revision or stale-target admission exists.

### Presentation truth

41. Market is presented as available despite no exchange runtime service.
42. Session Select is rendered but has no incoming route or slot owner.
43. Roster and Inventory cards are read-only despite implemented services.
44. The HTML button renderer does not project disabled state or reason.
45. Unsupported and dormant reasons are not visible.
46. No capability result, projection revision or first-frame acknowledgement is exposed.

## Composite command transaction gaps

47. Public commands have no command or transaction identity.
48. Composition dispatches child work through public `engine.command()`.
49. Nested child commands publish before parent completion.
50. Child results are discarded and rejection can be concealed by parent success.
51. No complete action plan is preflighted.
52. Payment returns only a Boolean.
53. Resource and gameplay mutations are not staged or rolled back together.
54. No single-publication barrier or frame correlation exists.

## Randomness, replay and persistence gaps

55. Apple and pest generation use global `Math.random()`.
56. Random IDs are unstable.
57. No seed, stream partition, draw cursor, decision ledger or replay receipt exists.
58. No deterministic state fingerprint exists.
59. Session Select has no stable slot authority.
60. No save/load commands, schema, migration, staged restore, atomic load or load epoch exists.
61. `engine.snapshot()` is presentation state, not a restorable save.

## Proof and deployment gaps

62. The smoke test proves only Entry to Play and apple presence.
63. No lifecycle, clock, gateway, transaction, replay or persistence fixture exists.
64. No browser smoke proves one RAF/listener owner.
65. No fixture proves movement, deliberate collection, hiring or equipment reachability.
66. No fixture proves public commands cannot bypass the gateway.
67. No fixture proves internal/debug commands require a valid lease.
68. No fixture proves stale debug leases reject after reset.
69. No fixture proves disabled projection matches gateway admission.
70. No fixture proves result and first-frame correlation.
71. Pages deployment is not gated on these authority contracts.

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
  -> public capability gateway and reachability
  -> composite command transaction authority
  -> seeded random and replay authority
  -> committed durable-state fingerprint
  -> versioned save/load authority
  -> deployment proof
```