# Gameplay Audit: Market Command Result Loop

**Timestamp:** `2026-07-10T05-28-12-04-00`

## Current gameplay loop

```txt
active-session
  -> collect apples
  -> money increases from apple collection
  -> pressure may increase
  -> player can open Market through active-session action
  -> exchange screen shows Back only
```

## Current command proof

`engine.command()` returns command results now.

Examples in current code:

```txt
resource-ledger add/pay -> { accepted }
construction-runtime build -> { accepted }
roster-runtime hire -> { accepted }
inventory-runtime equip -> { accepted }
active-session collect/clear/next-phase -> { accepted }
interface-composition activate -> transition result or { accepted: true }
```

## Missing Market loop

```txt
sell-apples
  -> should consume apples
  -> should add money
  -> should append transaction row
  -> should return accepted MarketCommandResult

buy-basic-tool
  -> should preflight money
  -> should add inventory item
  -> should append transaction and intake rows
  -> should return accepted or rejected MarketCommandResult

buy-row-supply
  -> should preflight capacity
  -> should mutate inventory/resource rows only when accepted
  -> should return accepted or rejected MarketCommandResult
```

## Gameplay proof gap

Rejected commands need no-mutation proof.

Accepted commands need before/after snapshots and source-owned result rows.

The next fixture should prove:

```txt
accepted sell-apples
rejected sell-apples with zero apples
accepted buy-basic-tool
rejected buy-basic-tool with insufficient money
accepted buy-row-supply
rejected buy-row-supply at capacity
```
