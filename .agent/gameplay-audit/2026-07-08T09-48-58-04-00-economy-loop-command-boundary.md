# ZombieOrchard Economy Loop Command Boundary

**Timestamp:** `2026-07-08T09-48-58-04-00`

## Current player-facing loop

```txt
Entry
-> Play
-> Active Session
-> Collect apples
-> Clear pests
-> Next Phase
-> Build
-> Market
-> Back
-> Outcome when condition reaches zero
```

## Current economy loop

```txt
collect apple
-> active-session calls orchard-world.collectNear
-> resource-ledger.api.add({ apples, money })
-> pressure-field adjustment
-> score/message update

build shed
-> construction-runtime command(build)
-> resource-ledger.api.pay(cost)
-> built record appended
-> message update

hire roster actor
-> roster-runtime command(hire)
-> resource-ledger.api.pay({ money })
-> actor appended
-> message update

inventory equip
-> inventory-runtime command(equip)
-> equipped id changed
```

## Missing Market command loop

```txt
exchange action
-> MarketCommandEnvelope
-> MarketSourceSnapshot
-> MarketPreflight
-> MarketCommandResult
-> accepted branch mutates resources/inventory
-> rejected branch preserves resources/inventory
-> TransactionRecord appended only on accepted branch
-> MarketResultJournal appended for accepted and rejected branches
-> MarketResultProjection exposes rows/result/transactions
-> interface-composition retains nested result
-> renderer consumes projection
-> fixture replay proves parity
```

## Command boundary rules

```txt
- A Market action must not mutate resources before preflight.
- A rejected result must include reason and before/after snapshots.
- A rejected result must not append TransactionRecord.
- An accepted result must append exactly one TransactionRecord.
- A Market result must be serializable without DOM nodes.
- A Market projection must be renderer-ready without requiring business logic.
- interface-composition must retain nested command results so the active screen can project them.
```

## Minimal action catalog

```txt
sell-apples:
  type: sell
  source: resource-ledger.apples
  result: money increases, apples decreases

buy-basic-tool:
  type: buy
  source: resource-ledger.money + inventory-runtime capacity
  result: money decreases, inventory item added

buy-row-supply:
  type: buy
  source: resource-ledger.money + inventory-runtime capacity
  result: money decreases, inventory/supply item added

back:
  type: navigation
  result: interface transition only
```

## Main blocker

The repo already has command-result shaped runtime returns. The missing piece is not generic runtime mechanics. The missing piece is Market-specific authority that ties action id, source snapshot, preflight, mutation, transaction, projection, and replay together.
