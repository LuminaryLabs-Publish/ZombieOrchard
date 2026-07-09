# ZombieOrchard Nested Result Transaction Contract

**Timestamp:** `2026-07-08T21-18-39-04-00`

## Goal

Define the exact source contract that should be implemented for Market authority before additional economy or render polish.

## Source files to add

```txt
src/market/market-ids.js
src/market/market-command-source-manifest.js
src/market/market-source-snapshot.js
src/market/market-command-envelope.js
src/market/market-preflight.js
src/market/market-result.js
src/market/market-transaction-ledger.js
src/market/market-projection.js
src/market/market-render-readback.js
src/market/market-fixture-rows.js
tests/market-transaction-fixture.mjs
```

## Contract chain

```txt
MarketCommandSourceManifest
  -> action ids
  -> command types
  -> rejection reasons
  -> price rows
  -> capacity rows
  -> fixture seed rows

MarketCommandEnvelope
  -> commandId
  -> actionId
  -> commandType
  -> quantity
  -> source
  -> requestedAtFrame

MarketSourceSnapshot
  -> resources
  -> inventory
  -> prices
  -> capacity
  -> activeScreen

MarketPreflight
  -> accepted | rejected
  -> reason
  -> mutationPlan

MarketCommandResult
  -> status
  -> reason
  -> before
  -> after
  -> mutationSummary
  -> transactionRecord | null

MarketCommandJournal
  -> ordered envelopes

MarketResultJournal
  -> ordered results

NestedResultPropagation
  -> interface-composition returns nestedResult
  -> interface-composition snapshot exposes lastResult

MarketResultProjection
  -> renderer-only rows

MarketRenderReadback
  -> renderer consumed projection rows
```

## Stable reason catalog

```txt
accepted
unknown_market_command
invalid_quantity
insufficient_funds
insufficient_apples
capacity_full
missing_market_runtime
missing_resource_ledger
missing_inventory_runtime
```

## Mutation rules

```txt
accepted sell-apples:
  apples decreases
  money increases
  transaction appended

accepted buy-basic-tool:
  money decreases
  inventory item added
  transaction appended

accepted buy-row-supply:
  money decreases
  inventory/resource benefit recorded
  transaction appended

rejected command:
  resources unchanged
  inventory unchanged
  transaction not appended
  command journal still records request
  result journal records rejection
```

## Compatibility rules

```txt
- Keep resource-ledger snapshot.values stable.
- Keep resource-ledger api.canPay/pay/add stable.
- Keep inventory-runtime snapshot.items and snapshot.equipped stable.
- Keep active-session direct data-command behavior stable.
- Keep interface-composition transition/back behavior stable.
- Keep window.GameHost.engine/getState/tick stable.
```

## Acceptance fixture rows

```txt
source-manifest-shape
active-session-to-exchange
accepted-sell-apples
rejected-sell-no-apples
accepted-buy-basic-tool
rejected-buy-insufficient-funds
rejected-buy-capacity-full
unknown-market-command
invalid-quantity
nested-result-returned
snapshot-last-result-projected
exchange-projection-shape
exchange-render-readback
GameHost-baseline-compatibility
```
