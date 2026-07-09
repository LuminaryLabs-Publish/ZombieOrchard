# ZombieOrchard Market Consumer Fixture Readback Contract

**Timestamp:** `2026-07-08T23-40-55-04-00`

## Contract purpose

Tighten the previous Market source-manifest adapter direction into a consumer fixture and readback contract.

The Market source owns command rows, price rows, capacity rows, accepted/rejected results, mutation summaries, and journals.

`interface-composition`, `html-interface-renderer`, and `GameHost` consume those rows.

## Source authority

```txt
MarketCommandSourceManifest:
  manifestId: zombie-orchard.market.v1
  sourceVersion: 1
  actionRows:
    sell-apples
    buy-basic-tool
    buy-row-supply
    back
  commandRows:
    market.sell
    market.buy
    market.back
  reasonRows:
    market.sell_apples.accepted
    market.buy_basic_tool.accepted
    market.buy_row_supply.accepted
    market.unknown_command
    market.invalid_quantity
    market.insufficient_apples
    market.insufficient_funds
    market.inventory_capacity_full
    market.source_unavailable
  priceRows:
    apples.sell.unitMoney
    basic-tool.buy.money
    row-supply.buy.money
  capacityRows:
    inventory.maxItems
    inventory.availableSlots
```

## Command result authority

```txt
MarketCommandEnvelope:
  envelopeId
  commandId
  actionId
  commandType
  itemId
  quantity
  source
  frame
  elapsed

MarketSourceSnapshot:
  snapshotId
  sourceFingerprint
  resources
  inventory
  prices
  capacity
  activeActionIds

MarketPreflight:
  accepted
  reason
  commandEnvelope
  beforeSnapshot
  normalizedQuantity
  expectedMutation

MarketCommandResult:
  resultId
  accepted
  reason
  envelope
  beforeSnapshot
  afterSnapshot
  mutationSummary
  transactionRecord
  commandJournalRow
  resultJournalRow
```

## Consumer adapter contract

```txt
InterfaceNestedResultAdapter:
  adapterId
  activeBefore
  activeAfter
  nestedDomain
  nestedType
  nestedAccepted
  nestedReason
  nestedResultId
  projectionId
  commandId
  resultSummary
```

`interface-composition.command("activate")` should preserve existing transition/back behavior and return this adapter output when a nested Market command runs.

`interface-composition.snapshot()` should add `lastResult` without removing existing `active`, `previous`, or `activeSnapshot` fields.

## Renderer consumer contract

```txt
MarketResultProjection:
  projectionId
  sourceFingerprint
  activeActionRows
  priceRows
  capacityRows
  transactionRows
  lastResultSummary
  disabledActionIds

MarketRenderReadback:
  readbackId
  projectionId
  consumedActionIds
  consumedPriceRowIds
  consumedCapacityRowIds
  consumedTransactionIds
  rendererAuthority:
    prices: false
    capacity: false
    transactions: false
    resourceMutation: false
    inventoryMutation: false
```

## GameHost consumer contract

```txt
window.GameHost:
  preserve engine
  preserve getState()
  preserve tick(dt)
  add optional market diagnostics only

GameHost market diagnostics:
  sourceManifest
  latestResult
  commandJournalTail
  resultJournalTail
  latestProjection
  latestReadback
  fixtureStatus
```

## Fixture contract

```txt
fixture entrypoint:
  tests/market-transaction-fixture.mjs

fixture imports:
  createOrchardGame
  market helper modules

fixture must not use:
  DOM
  canvas
  browser APIs
  requestAnimationFrame
  localStorage
```

## Acceptance rows

```txt
- source manifest row parity
- accepted sell apples
- rejected sell zero apples
- accepted buy basic tool
- rejected buy basic tool insufficient funds
- rejected buy basic tool capacity full
- unknown command
- invalid quantity
- price determinism
- capacity determinism
- rejected no-mutation before/after snapshots
- accepted transaction record
- command journal row
- result journal row
- interface nested result adapter
- snapshot.lastResult projection
- exchange renderer projection consumption
- renderer readback no-authority row
- GameHost compatibility row
```

## Stop condition

```txt
Stop when Market source rows, result rows, consumer rows, renderer readback rows, and GameHost diagnostics are fixture-proven without changing the static route or making renderer code own Market business logic.
```
