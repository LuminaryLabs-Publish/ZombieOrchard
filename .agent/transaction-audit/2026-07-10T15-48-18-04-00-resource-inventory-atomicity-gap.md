# Transaction audit: Resource and inventory atomicity gap

Timestamp: `2026-07-10T15-48-18-04-00`

## Current resource contract

`resource-ledger.api.pay(cost)` returns a boolean and mutates immediately. It does not retain:

```txt
transaction id
source command id
preflight row
before values
delta values
after values
stable rejection reason
```

## Current inventory contract

`inventory-runtime` exposes item state and an equip command only. There is no intake service, capacity policy, duplicate-item policy, or purchase result.

## Market atomicity risk

A naive Market implementation could pay first and discover afterward that inventory intake cannot succeed. Aggregate snapshots would show the final state but would not explain whether the purchase was accepted, partially applied, or rolled back.

## Recommended first-cut transaction protocol

```txt
1. Resolve immutable Market source row.
2. Preflight resource affordability.
3. Preflight inventory capacity/intake.
4. Reject with no mutation when either preflight fails.
5. Apply resource debit and inventory intake under one command correlation.
6. Emit both mutation rows.
7. Return one Market result referencing both rows.
```

## Proof invariants

```txt
accepted => resourceTransaction.accepted == true
accepted => inventoryIntake.accepted == true
accepted => net resource delta matches source price
accepted => inventory delta matches source item
rejected => resource delta is zero
rejected => inventory delta is zero
same commandId cannot double-spend
result references exactly one source revision
```

## Transaction conclusion

Add transaction rows to the existing resource and inventory owners. Do not create a second hidden economy state inside Exchange or the renderer.