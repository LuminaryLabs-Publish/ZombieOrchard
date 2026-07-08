# ZombieOrchard Market Authority Audit: Command Source Manifest Fixture Gate

**Timestamp:** `2026-07-08T19-10-54-04-00`

## Purpose

Turn the previous Market transaction plan into an exact source-manifest and fixture-gate contract.

The implementation should make Market command rows source-owned before renderer readback or broader economy expansion.

## Source manifest target

```txt
MarketCommandSourceManifest {
  version: "0.1.0",
  route: "exchange",
  actionIds: [
    "sell-apples",
    "buy-basic-tool",
    "buy-row-supply",
    "back"
  ],
  commandTypes: [
    "market.sell",
    "market.buy",
    "market.back"
  ],
  reasons: [
    "accepted",
    "insufficient_apples",
    "insufficient_funds",
    "inventory_capacity_full",
    "invalid_quantity",
    "unknown_market_command"
  ],
  priceRows: [
    "apple.sell",
    "basic-tool.buy",
    "row-supply.buy"
  ],
  capacityRows: [
    "inventory.tools",
    "inventory.supplies"
  ]
}
```

## Fixture row groups

```txt
source-manifest:
  market_manifest_has_expected_action_ids
  market_manifest_has_expected_command_types
  market_manifest_has_expected_reason_catalog
  market_manifest_has_price_rows
  market_manifest_has_capacity_rows

source-snapshot:
  market_source_snapshot_contains_resources
  market_source_snapshot_contains_inventory
  market_source_snapshot_contains_prices
  market_source_snapshot_contains_capacity
  market_source_snapshot_is_clone_safe

preflight:
  sell_apples_preflight_accepts_when_apples_available
  sell_apples_preflight_rejects_when_no_apples
  buy_basic_tool_preflight_accepts_when_affordable
  buy_basic_tool_preflight_rejects_when_funds_missing
  buy_row_supply_preflight_rejects_when_capacity_full
  unknown_market_command_rejects_with_stable_reason
  invalid_quantity_rejects_with_stable_reason

command-result:
  accepted_sell_returns_market_command_result
  rejected_sell_returns_market_command_result
  accepted_buy_returns_market_command_result
  rejected_buy_returns_market_command_result
  rejected_result_has_no_mutation_delta
  accepted_result_has_transaction_id

journals:
  accepted_command_appends_command_journal
  rejected_command_appends_command_journal
  accepted_command_appends_result_journal
  rejected_command_appends_result_journal
  accepted_command_appends_transaction_history

composition:
  nested_market_result_is_returned_from_interface_composition
  interface_composition_snapshot_exposes_last_result
  active_session_direct_commands_remain_compatible

projection-render:
  market_result_projection_contains_action_rows
  market_result_projection_contains_price_rows
  market_result_projection_contains_capacity_rows
  market_result_projection_contains_last_result
  exchange_renderer_consumes_projection_rows
  exchange_renderer_reports_readback

host:
  window_gamehost_engine_getstate_tick_remain_available
  optional_market_diagnostics_are_fixture_readable
```

## Required implementation order

```txt
1. src/market/market-ids.js
2. src/market/market-command-source-manifest.js
3. src/market/market-source-snapshot.js
4. src/market/market-command-envelope.js
5. src/market/market-preflight.js
6. src/market/market-result.js
7. src/market/market-transaction-ledger.js
8. src/market/market-projection.js
9. src/market/market-render-readback.js
10. src/market/market-fixture-rows.js
11. src/presets/orchard-preset.js
12. src/kits/game-domains.js
13. src/kits/composition.js
14. src/renderer/html-interface-renderer.js
15. src/start.js optional diagnostics only
16. tests/market-transaction-fixture.mjs
17. package.json test/check wiring
```

## Source invariants

```txt
The source manifest owns command IDs.
The Market source modules own prices, capacity, and rejection reasons.
resource-ledger remains compatible with existing values/canPay/pay/add.
inventory-runtime remains compatible with existing equipped/items.
interface-composition keeps transition/back behavior.
html-interface-renderer consumes projection data only.
GameHost keeps engine/getState/tick.
```

## Stop condition

Stop the next implementation when `npm test` or an equivalent fixture command proves every source-manifest, snapshot, preflight, command-result, journal, composition, projection-render, and GameHost row above.
