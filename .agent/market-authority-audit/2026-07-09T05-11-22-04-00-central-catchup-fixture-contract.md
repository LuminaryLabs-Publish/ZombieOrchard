# Market Authority Audit: Central Catch-up Fixture Contract

**Timestamp:** `2026-07-09T05-11-22-04-00`

## Authority problem

Market/Exchange currently exists as interface content, not as a source-owned command/result contract.

The runtime can return command results, but the nested command path does not preserve them.

## Required source contract

```txt
MarketCommandSourceManifest
  version
  actionIds
  commandTypes
  reasonCatalog
  priceRows
  capacityRows
  resourceKeys
  inventoryKeys
  projectionKeys
```

## Required command envelope

```txt
MarketCommandEnvelope {
  id,
  actionId,
  commandType,
  payload,
  source,
  frame
}
```

## Required source snapshot

```txt
MarketSourceSnapshot {
  frame,
  resources,
  inventory,
  activeScreen,
  prices,
  capacity,
  lastResult
}
```

## Required preflight result

```txt
MarketPreflight {
  accepted,
  reason,
  actionId,
  resourceDelta,
  inventoryDelta,
  noMutationExpected
}
```

## Required command result

```txt
MarketCommandResult {
  accepted,
  reason,
  actionId,
  commandId,
  before,
  after,
  resourceDelta,
  inventoryDelta,
  transactionId,
  journalId
}
```

## Required fixture rows

```txt
sell-apples accepted
sell-apples rejected no-apples
buy-basic-tool accepted
buy-basic-tool rejected insufficient-money
buy-row-supply accepted
buy-row-supply rejected insufficient-money
unknown-action rejected
rejected rows preserve resources
rejected rows preserve inventory
nested result is retained
projection consumes lastResult
render readback consumes projection
GameHost exposes market diagnostics
```

## Source files recommended next

```txt
src/market/market-action-catalog.js
src/market/market-command-source-manifest.js
src/market/market-command-envelope.js
src/market/market-source-snapshot.js
src/market/market-preflight.js
src/market/market-command-result.js
src/market/market-command-journal.js
src/market/market-result-journal.js
src/market/resource-transaction-history.js
src/market/inventory-purchase-intake.js
src/market/interface-nested-result-adapter.js
src/market/market-result-projection.js
src/market/market-render-readback.js
src/market/market-gamehost-diagnostics.js
scripts/zombie-orchard-market-result-fixture.mjs
```

## Integration files recommended next

```txt
src/kits/composition.js
src/kits/game-domains.js
src/renderer/html-interface-renderer.js
src/start.js
package.json
```

## Decision

Implement this as an additive proof path. Preserve existing `engine.command`, `engine.snapshot`, `window.GameHost.engine`, `window.GameHost.getState`, and `window.GameHost.tick` compatibility.
