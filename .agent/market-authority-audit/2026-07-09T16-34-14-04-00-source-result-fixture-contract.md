# ZombieOrchard Market Authority Audit: Source Result Fixture Contract

**Timestamp:** `2026-07-09T16-34-14-04-00`

## Authority goal

Make Exchange/Market behavior source-owned before adding broader economy content.

## Current authority state

```txt
resource-ledger owns resources
inventory-runtime owns inventory/equipped
scoped exchange screen owns only descriptor actions
interface-composition owns activation and nested command dispatch
html-interface-renderer owns generic Exchange rendering
```

No single Market authority owns action source rows, prices, capacity, command envelopes, result rows, transaction history, or fixture replay.

## Required source contract

```txt
MarketActionCatalog
  sell-apples
  buy-basic-tool
  buy-row-supply
  back

MarketCommandSourceManifest
  action id
  label
  source version
  command type
  resource delta
  inventory delta
  price/cost
  capacity policy
  expected mutation

MarketCommandEnvelope
  id
  actionId
  commandType
  source
  payload
  expectedMutation

MarketSourceSnapshot
  resources
  inventory
  active screen
  prices
  capacity
  transaction count
  inventory intake count

MarketPreflight
  accepted
  reason
  blockers

MarketCommandResult
  accepted
  reason
  command envelope
  before snapshot
  after snapshot
  diff facts
  transaction row id
  intake row id
```

## Required rejection reasons

```txt
market/no-apples-to-sell
market/insufficient-money
market/inventory-capacity-full
market/unknown-action
market/no-mutation-for-rejected-command
```

## Fixture contract

```txt
accepted sell-apples:
  before.apples > after.apples
  after.money > before.money
  accepted true
  transaction count increments

accepted buy-basic-tool:
  before.money > after.money
  inventory intake count increments
  accepted true

rejected insufficient money:
  accepted false
  reason market/insufficient-money
  resources unchanged
  inventory unchanged

rejected capacity:
  accepted false
  reason market/inventory-capacity-full
  resources unchanged
  inventory unchanged
```

## Next implementation files

```txt
src/kits/market-authority.js
src/kits/market-source.js
src/kits/market-results.js
src/kits/interface-nested-result-adapter.js
src/renderer/market-projection.js
src/diagnostics/market-diagnostics.js
tests/market-result-fixture.mjs
```

These names are proposed implementation seams. Preserve legacy public host APIs.
