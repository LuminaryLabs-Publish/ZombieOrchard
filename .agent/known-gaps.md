# Known gaps — ZombieOrchard

## Primary gap

The runtime cannot reproduce and explain a scenario as one durable seed-to-command-to-frame-to-render observation chain.

```txt
scenario seed
  -> named random draws
  -> command requests/results
  -> durable events
  -> committed frame snapshot
  -> renderer consumption
  -> GameHost readback
  -> replay fingerprint
```

## Specific gaps

1. No versioned scenario configuration.
2. No seed ownership in the runtime composition.
3. `orchard-world-kit` directly calls global `Math.random()`.
4. `active-session-domain-kit` directly calls global `Math.random()`.
5. Apple and pest IDs are not deterministic.
6. Random draws have no stream IDs or draw indices.
7. Same commands and tick count do not guarantee the same initial or final snapshot.
8. Runtime commands have no stable sequence IDs.
9. No bounded command request/result journal exists.
10. Scoped interface activation has no activation ID.
11. `interface-composition` drops child command results.
12. Parent acceptance can conceal child rejection.
13. Runtime events are cleared at tick start and excluded from snapshots.
14. Snapshots have no scenario ID, preset revision, command range, or event range.
15. No canonical snapshot serialization or stable state fingerprint exists.
16. No immutable committed-frame row exists.
17. World rendering records no consumed frame or snapshot fingerprint.
18. HTML rendering records no consumed frame, interaction result, or projection fingerprint.
19. Full `innerHTML` replacement occurs every frame with no projection-consumption readback.
20. `GameHost` exposes mutable engine authority rather than bounded immutable proof.
21. Existing smoke coverage proves reachability only.
22. No same-seed replay fixture exists.
23. No different-seed structural-invariant fixture exists.
24. No fixture rejects gameplay use of global `Math.random()`.
25. The Pages build gate does not verify deterministic scenario proof.
26. Resource payment remains boolean-only without transaction attribution.
27. Inventory still lacks purchase intake and capacity policy.
28. Market source, result, projection, and transaction causality remain missing.
29. Market proof cannot assert stable whole-state parity until scenario authority exists.

## Explicit non-gaps for the next pass

These are not the immediate blocker:

```txt
world canvas fidelity
orchard content volume
new pest types
economy balance
Market artwork
renderer replacement
full runtime rewrite
```

## Dependency order

```txt
deterministic scenario authority
  -> command/frame observation
  -> replay fixture gate
  -> Market transaction causality
  -> broader gameplay and content work
```