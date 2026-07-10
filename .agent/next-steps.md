# Next steps — ZombieOrchard

## Next safe ledge

```txt
ZombieOrchard Market Command Causality Ledger
+ Resource/Inventory Transaction Fixture Gate
```

## Implementation order

1. Add immutable Market source/catalog rows with revision, item, action, price, and capacity inputs.
2. Add runtime command sequence IDs and a bounded request/result journal.
3. Add activation IDs to scoped interface and composition results.
4. Update `interface-composition.activate` to retain the exact child command result.
5. Define explicit transition policy for accepted and rejected child commands.
6. Add stable Market preflight and rejection reasons.
7. Update `resource-ledger-kit` with transaction IDs, before/delta/after rows, and source command attribution.
8. Update `inventory-runtime-kit` with capacity preflight and purchase-intake rows.
9. Apply Market purchases atomically after both preflights pass.
10. Add Exchange projection rows referencing source and result IDs.
11. Add HTML renderer consumption rows referencing projection/result IDs.
12. Add bounded JSON-safe `GameHost.market` command/transaction/readback journals.
13. Add a deterministic DOM-free fixture for accepted, rejected, unknown, and duplicate command paths.
14. Gate `npm test` and build-sensitive work on the fixture.

## Acceptance checklist

```txt
[ ] Market source rows have stable ids and revisions.
[ ] Parent activations have stable activation ids.
[ ] Child commands have stable command ids.
[ ] Parent result retains exact child result.
[ ] Parent acceptance does not conceal child rejection.
[ ] Rejection reasons are stable and serializable.
[ ] Resource transactions record before/delta/after and source command.
[ ] Inventory intake records before/delta/after and source command.
[ ] Accepted purchase mutates both resources and inventory.
[ ] Rejected purchase mutates neither resources nor inventory.
[ ] Duplicate command behavior prevents double spending.
[ ] Exchange projection references source and result rows.
[ ] Renderer readback references consumed projection rows.
[ ] GameHost Market journals are bounded and JSON-safe.
[ ] DOM-free fixture proves accepted and rejected causality chains.
```

## Avoid until proof exists

- economy tuning
- additional Market inventory
- Market art expansion
- renderer replacement
- world-content expansion
- unrelated runtime refactors
