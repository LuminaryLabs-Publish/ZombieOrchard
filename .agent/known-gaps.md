# Known gaps — ZombieOrchard

## Primary gap

The runtime cannot explain a Market purchase as one durable parent-to-child-to-transaction causality chain.

```txt
interface activation
  -> child command
  -> preflight
  -> resource transaction
  -> inventory intake
  -> result projection
  -> renderer consumption
  -> GameHost readback
```

## Specific gaps

1. No Market source/catalog revision rows.
2. No runtime command sequence or command IDs.
3. No bounded command request/result journal.
4. Scoped interface activation has no activation ID.
5. `interface-composition` drops child command results.
6. Parent acceptance can conceal child rejection.
7. Transition behavior after child rejection is implicit.
8. Runtime events are cleared at tick start and absent from snapshots.
9. Resource payment returns a boolean without transaction attribution.
10. Resource rows lack before/delta/after values and stable rejection reasons.
11. Inventory has no purchase-intake or capacity service.
12. No atomicity contract joins resource debit and inventory intake.
13. No duplicate-command/idempotency behavior is defined.
14. Exchange is Back-only and has no Market command surface.
15. Exchange has no source/result projection rows.
16. HTML renderer has no Market projection consumption readback.
17. GameHost exposes raw mutable handles instead of bounded JSON-safe journals.
18. Existing smoke coverage does not prove accepted/rejected/no-mutation behavior.
19. No deterministic DOM-free Market causality fixture exists.
20. The build is not gated on Market transaction proof.

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
