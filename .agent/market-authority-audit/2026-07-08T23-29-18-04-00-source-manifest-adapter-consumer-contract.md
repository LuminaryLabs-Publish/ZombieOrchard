# ZombieOrchard Market Source Manifest Adapter Consumer Contract

**Timestamp:** `2026-07-08T23-29-18-04-00`

## Contract purpose

This file defines the next implementation contract for Market authority.

The command source must be owned by Market helpers.

`interface-composition`, `html-interface-renderer`, and `GameHost` must be consumers.

## Source manifest

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

## Command envelope

```txt
MarketCommandEnvelope:
  envelopeId
  commandId
  actionId
  commandType
  itemId
  quantity
  source: exchange | fixture | GameHost
  frame
  elapsed
```

## Source snapshot

```txt
MarketSourceSnapshot:
  snapshotId
  sourceFingerprint
  resources
  inventory
  prices
  capacity
  activeActionIds
```

## Preflight result

```txt
MarketPreflight:
  accepted: boolean
  reason
  commandEnvelope
  beforeSnapshot
  normalizedQuantity
  expectedMutation
```

## Command result

```txt
MarketCommandResult:
  resultId
  accepted
  reason
  envelope
  beforeSnapshot
  afterSnapshot
  mutationSummary
  transactionRecord | null
  commandJournalRow
  resultJournalRow
```

## Transaction record

```txt
TransactionRecord:
  transactionId
  commandId
  type: sell | buy
  itemId
  quantity
  resourceDeltas
  inventoryDeltas
  frame
```

## Nested result adapter

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
```

`interface-composition.command("activate")` should return a top-level accepted result that includes the adapter output when a nested command executes.

`interface-composition.snapshot()` should expose:

```txt
lastResult:
  adapterId
  nestedAccepted
  nestedReason
  nestedResultId
  projectionId
  commandId
```

## Projection contract

```txt
MarketResultProjection:
  projectionId
  resultId
  accepted
  reason
  actionRows
  priceRows
  capacityRows
  lastResultSummary
  transactionRows
  disabledActionIds
```

## Consumer contract

```txt
html-interface-renderer:
  consumes MarketResultProjection
  renders actionRows, priceRows, capacityRows, lastResultSummary, transactionRows
  does not compute prices
  does not compute capacity
  does not mutate resource-ledger
  does not mutate inventory-runtime

GameHost:
  preserves engine/getState/tick
  may add market diagnostics
  exposes source manifest, last result, journals, projection, and readback additively
```

## Fixture contract

```txt
fixture should import createOrchardGame and Market helpers without DOM
fixture should not depend on canvas or browser APIs
fixture should build deterministic resource/inventory states
fixture should run commands through source-owned Market helpers
fixture should assert result shape and state mutation/no-mutation
fixture should assert interface-composition nested result after exchange activation
fixture should assert projection/readback shape
fixture should assert GameHost compatibility at source-helper level when browser host is not mounted
```

## Acceptance stop condition

```txt
- All source manifest rows are stable.
- All accepted/rejected result rows are stable.
- Rejected commands do not mutate resources or inventory.
- Accepted commands append transaction records.
- Nested Market command results return through interface-composition.
- snapshot.lastResult exposes the nested result adapter output.
- Exchange renderer consumes projection rows only.
- Renderer readback proves no renderer authority leak.
- GameHost baseline remains intact.
```
