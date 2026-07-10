# Market Authority Audit: Ledger Fixture Contract

**Timestamp:** `2026-07-10T04-11-36-04-00`

## Market authority goal

Turn Exchange from a Back-only placeholder into a source-owned Market loop with fixture-readable accepted and rejected rows.

## Required source files next

```txt
src/market/market-action-catalog.js
src/market/market-command-source-manifest.js
src/market/market-command-envelope.js
src/market/market-source-snapshot.js
src/market/market-preflight.js
src/market/market-command-result.js
src/market/market-result-journal.js
src/market/resource-transaction-history.js
src/market/inventory-purchase-intake.js
src/market/market-projection.js
src/market/market-render-readback.js
src/market/market-gamehost-diagnostics.js
```

## Required fixture next

```txt
tests/market-result-fixture.mjs
```

## First action rows

```txt
sell-apples:
  accepted when apples > 0
  rejected when apples === 0
  accepted row adds money and removes apples
  rejected row does not mutate resources

buy-basic-tool:
  accepted when money is sufficient and capacity allows
  rejected when money is insufficient
  accepted row removes money and adds inventory intake
  rejected row does not mutate money or inventory

buy-row-supply:
  accepted when money is sufficient and capacity allows
  rejected when capacity is full or money is insufficient
  accepted row adds inventory intake
  rejected row does not mutate money or inventory
```

## Required result fields

```txt
id
actionId
status
accepted
reason
source
before
preflight
resourceDelta
inventoryDelta
transactionRows
intakeRows
after
mutationApplied
uiMessage
```

## Required fixture assertions

```txt
accepted sell row has actionId sell-apples
accepted sell row mutates apples and money
rejected sell row has stable reason no_apples
rejected sell row has no mutation
accepted buy row mutates money and inventory
rejected buy row has stable reason insufficient_money or capacity_full
interface-composition snapshot retains lastResult
Exchange projection includes lastResult
Market render readback includes lastResult
GameHost market diagnostics exposes lastResult and journals
```

## Authority finding

Market should be source-owned before it is visually expanded.

Without source-owned command rows, economy expansion would make the existing proof gap wider.
