# ZombieOrchard Market Fixture Implementation Map

**Timestamp:** `2026-07-08T08-02-32-04-00`

## Purpose

Convert the existing Market acceptance ledger into the smallest safe source implementation plan.

This file is documentation only.

## Current source read

```txt
src/presets/orchard-preset.js:
  exchange currently exposes only Back.

src/kits/composition.js:
  action.command dispatch happens, but nested result is dropped.

src/kits/game-domains.js:
  resource-ledger owns values/canPay/pay/add, with no transaction history.
  inventory-runtime owns equip only, with no purchase intake.

src/renderer/html-interface-renderer.js:
  generic screen renderer does not understand Market projections.

tests/smoke.mjs:
  proves entry -> active-session and apple existence only.
```

## Source file implementation map

```txt
src/market/market-ids.js:
  export MARKET_ACTIONS
  export MARKET_REASONS
  export MARKET_ITEMS

src/market/market-sources.js:
  createMarketPriceSnapshot(ctxOrSnapshot)
  createMarketCapacitySnapshot(ctxOrSnapshot)
  createMarketSourceSnapshot(ctx, commandEnvelope)

src/market/market-command.js:
  normalizeMarketCommand(actionOrPayload, ctx)
  createMarketCommandEnvelope(input, ctx)
  preflightMarketCommand(envelope, sourceSnapshot)

src/market/market-results.js:
  createMarketCommandResult({ envelope, sourceSnapshot, accepted, reason, transaction })
  createTransactionRecord({ envelope, resourceDeltas, inventoryDeltas, frame })
  createMarketResultProjection({ sourceSnapshot, result, transactions })

src/kits/game-domains.js:
  extend resource-ledger with transaction-compatible helpers while preserving values/canPay/pay/add
  extend inventory-runtime with purchase intake while preserving equipped/items/equip
  add or expose a market runtime dispatch seam near existing game-domain kits

src/kits/composition.js:
  preserve nested command result from action.command
  store lastResult in interface-composition snapshot

src/presets/orchard-preset.js:
  add exchange actions: sell-apples, buy-basic-tool, buy-row-supply, back

src/renderer/html-interface-renderer.js:
  add exchange branch that renders MarketResultProjection rows

tests/market-fixture.mjs or tests/smoke.mjs:
  add DOM-free fixture matrix
```

## Required constants

```txt
MARKET_ACTIONS:
  sell-apples
  buy-basic-tool
  buy-row-supply
  back

MARKET_REASONS:
  accepted
  unknown-market-command
  no-apples-to-sell
  insufficient-funds
  inventory-capacity-full
  invalid-quantity
  missing-market-source
```

## Required command result shape

```txt
MarketCommandResult:
  accepted: boolean
  commandId: stable string
  actionId: stable string
  reason: stable string
  transaction: null | TransactionRecord
  resourcesBefore: object
  resourcesAfter: object
  inventoryBefore: object
  inventoryAfter: object
  projection: MarketResultProjection
```

## Required transaction shape

```txt
TransactionRecord:
  id: stable string
  type: sell | buy
  commandId: stable string
  resourceDeltas: object
  inventoryDeltas: object
  frame: runtime frame or fixture frame
```

## Required projection shape

```txt
MarketResultProjection:
  title: "Market"
  message: string
  rows:
    - actionId
      label
      description
      price
      capacity
      disabled
      disabledReason
  lastResult:
    accepted
    reason
    commandId
  transactions:
    - id
      type
      summary
      resourceDeltas
      inventoryDeltas
```

## Fixture matrix

```txt
[ ] baseline entry screen remains entry.
[ ] Play still transitions to active-session.
[ ] active-session Market action transitions to exchange.
[ ] exchange exposes sell-apples, buy-basic-tool, buy-row-supply, and back.
[ ] sell-apples accepted when apples > 0.
[ ] sell-apples rejected with no-apples-to-sell when apples = 0.
[ ] buy-basic-tool accepted when money >= price and capacity available.
[ ] buy-basic-tool rejected with insufficient-funds when money < price.
[ ] buy-row-supply accepted when money >= price and capacity available.
[ ] buy command rejected with inventory-capacity-full when inventory is full.
[ ] unknown command rejected with unknown-market-command.
[ ] invalid quantity rejected with invalid-quantity.
[ ] rejected command keeps resourcesBefore == resourcesAfter.
[ ] rejected command keeps inventoryBefore == inventoryAfter.
[ ] accepted command appends one transaction.
[ ] interface-composition exposes nested lastResult.
[ ] exchange projection has stable title/message/rows/lastResult/transactions.
[ ] window.GameHost engine/getState/tick still work.
```

## Guardrails

```txt
Do not rewrite createKitRuntime.
Do not remove current engine.command shape.
Do not remove snapshot["resource-ledger"].values.
Do not remove active-session direct collect/clear/next-phase commands.
Do not require DOM to run Market fixture cases.
Do not put price, capacity, or transaction authority in html-interface-renderer.
Do not expand save/runtime/workers/codex before the Market fixture passes.
```

## Stop condition

Stop when the next coder can implement the source files above without needing to infer command shapes, result shapes, rejection reasons, projection shape, or fixture coverage.
