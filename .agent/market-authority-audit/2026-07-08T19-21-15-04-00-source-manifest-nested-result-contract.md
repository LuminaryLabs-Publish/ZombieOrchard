# Market Source Manifest + Nested Result Contract

**Repository:** `LuminaryLabs-Publish/ZombieOrchard`

**Timestamp:** `2026-07-08T19-21-15-04-00`

## Contract goal

Create a source-owned Market contract that can be consumed by the exchange preset, runtime command router, interface-composition nested command path, HTML renderer, GameHost diagnostics, and DOM-free fixtures.

## Required source modules

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

## Command source manifest

```txt
MarketCommandSourceManifest:
  actionIds:
    sell-apples
    buy-basic-tool
    buy-row-supply
    back
  commandTypes:
    market.sell
    market.buy
    market.back
  reasonCatalog:
    market_source_manifest_loaded
    market_command_enveloped
    market_preflight_passed
    market_unknown_command
    market_invalid_quantity
    market_insufficient_apples
    market_insufficient_funds
    market_inventory_capacity_full
    market_transaction_recorded
    market_result_projected
    market_nested_result_returned
    market_renderer_readback_created
```

## Command result shape

```txt
MarketCommandResult:
  accepted: boolean
  status: accepted | rejected | no_mutation
  commandId: string
  reason: string
  before: MarketSourceSnapshot
  after: MarketSourceSnapshot
  mutation: object
  transaction: TransactionRecord | null
  projection: MarketResultProjection
```

## Nested result splice

```txt
interface-composition.activate
  -> active domain command returns action row
  -> action.command calls ctx.engine.command(...)
  -> nested result is retained as nestedResult
  -> activate returns nestedResult when present
  -> snapshot exposes lastResult
```

## Fixture rows

```txt
source_manifest_shape
active_to_exchange
exchange_action_catalog
sell_apples_accepted
sell_apples_rejected_no_apples
buy_basic_tool_accepted
buy_basic_tool_insufficient_funds
buy_row_supply_accepted
inventory_capacity_full
unknown_market_command
invalid_quantity
price_rows_deterministic
capacity_rows_deterministic
rejected_no_mutation
transaction_history_shape
command_journal_shape
result_journal_shape
nested_result_propagation
exchange_projection_shape
renderer_readback_shape
GameHost_compatibility
```

## Preserve

```txt
index.html
src/boot.js
src/start.js
createOrchardGame()
world-canvas renderer
active-session direct Collect/Clear/Next Phase commands
window.GameHost.engine/getState/tick
```
