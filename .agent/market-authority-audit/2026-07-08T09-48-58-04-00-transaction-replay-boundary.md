# ZombieOrchard Market Transaction Replay Boundary

**Timestamp:** `2026-07-08T09-48-58-04-00`

## Purpose

Narrow the existing Market fixture implementation map into a transaction replay and renderer readback boundary.

This file is documentation only.

## Current source read

```txt
src/kits/runtime.js:
  engine.command returns domain command results.
  missing domains return accepted: false with reason.
  no journal or replay helper exists.

src/kits/composition.js:
  action.command dispatches nested commands through ctx.engine.command.
  the nested command result is not retained.
  snapshot does not include lastResult.

src/kits/game-domains.js:
  resource-ledger has values/canPay/pay/add.
  inventory-runtime has items/equipped/equip only.
  active-session collect path mutates resources through resource-ledger.api.add.

src/presets/orchard-preset.js:
  exchange screen only exposes Back.
```

## Required transaction replay boundary

```txt
MarketCommandEnvelope:
  commandId
  actionId
  quantity
  actorId
  sourceFrame
  issuedAtElapsed

MarketSourceSnapshot:
  resourcesBefore
  inventoryBefore
  priceRows
  capacityRows
  sourceFingerprint

MarketPreflight:
  accepted
  reason
  resourceDeltas
  inventoryDeltas

MarketCommandResult:
  accepted
  commandId
  actionId
  reason
  sourceSnapshot
  resourcesAfter
  inventoryAfter
  transaction
  projection

TransactionRecord:
  id
  commandId
  type
  resourceDeltas
  inventoryDeltas
  frame
  summary

MarketResultJournalEntry:
  commandId
  accepted
  reason
  transactionId
  resourcesBefore
  resourcesAfter
  inventoryBefore
  inventoryAfter

MarketResultProjection:
  title
  message
  rows
  lastResult
  transactions

MarketRenderReadback:
  screenId
  consumedRows
  consumedTransactionRows
  renderedFromProjection
  ownsPriceAuthority
  ownsCapacityAuthority
  ownsTransactionAuthority
```

## Replay fixtures

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
[ ] accepted command appends one TransactionRecord.
[ ] accepted and rejected commands append MarketResultJournalEntry.
[ ] replaying the same fixture sequence produces the same result reasons and deltas.
[ ] interface-composition exposes nested lastResult.
[ ] exchange projection has stable title/message/rows/lastResult/transactions.
[ ] renderer readback proves projection consumption.
[ ] window.GameHost engine/getState/tick still work.
```

## Source file cut line

```txt
Add:
  src/market/market-ids.js
  src/market/market-sources.js
  src/market/market-command.js
  src/market/market-results.js
  tests/market-fixture.mjs

Patch:
  src/presets/orchard-preset.js
  src/kits/game-domains.js
  src/kits/composition.js
  src/renderer/html-interface-renderer.js
  src/start.js only if adding additive GameHost diagnostics

Do not patch:
  index.html
  src/boot.js
  src/renderer/world-canvas.js unless adding read-only diagnostics
```

## Guardrails

```txt
Do not rewrite createKitRuntime.
Do not remove current engine.command shape.
Do not remove snapshot["resource-ledger"].values.
Do not remove active-session direct collect/clear/next-phase commands.
Do not require DOM to run Market fixture cases.
Do not put price, capacity, transaction, or result authority in html-interface-renderer.
Do not expand save/runtime/workers/codex before the Market fixture passes.
```

## Stop condition

Stop when a source implementation can prove Market command replay and renderer projection readback without requiring any DOM-owned business logic.
