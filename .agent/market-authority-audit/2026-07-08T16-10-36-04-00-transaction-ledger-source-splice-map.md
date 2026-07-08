# Market Authority Audit — Transaction Ledger Source Splice Map

**Timestamp:** `2026-07-08T16-10-36-04-00`

## Goal

Narrow the next implementation into a source-owned Market transaction ledger splice that can be proven without DOM ownership.

## Implementation spine

```txt
market ids
  -> source snapshot
  -> command envelope
  -> preflight
  -> command result
  -> transaction ledger
  -> command/result journals
  -> projection
  -> nested result propagation
  -> renderer readback
  -> GameHost diagnostics
  -> DOM-free fixture
```

## Required source modules

```txt
src/market/market-ids.js
  Exports action ids, command types, and reason constants.

src/market/market-source-snapshot.js
  Reads resource, inventory, price, capacity, and active exchange context into a stable snapshot.

src/market/market-command-envelope.js
  Normalizes requested action into { id, type, payload, quantity, actor, sourceFingerprint }.

src/market/market-preflight.js
  Returns accepted/rejected preflight with stable reason codes.

src/market/market-result.js
  Builds accepted/rejected MarketCommandResult records with before/after snapshots.

src/market/market-transaction-ledger.js
  Builds TransactionRecord rows for accepted sell/buy operations.

src/market/market-projection.js
  Builds renderer-ready exchange projection rows.

src/market/market-render-readback.js
  Builds proof that the renderer consumed Market projection rows only.
```

## Required runtime splice points

```txt
src/presets/orchard-preset.js
  Add exchange actions for sell-apples, buy-basic-tool, buy-row-supply, and back.

src/kits/game-domains.js
  Extend resource-ledger with transaction history while preserving values/canPay/pay/add.
  Extend inventory-runtime with purchase intake while preserving items/equipped.
  Add market-runtime-kit or equivalent Market dispatch service.

src/kits/composition.js
  Preserve nested command result from action.command dispatch.
  Return nested command result with transition result where appropriate.
  Expose lastResult in snapshot.

src/game.js
  Install Market runtime kit after resource/inventory dependencies exist.

src/renderer/html-interface-renderer.js
  Add exchange projection branch that consumes MarketResultProjection only.
  Produce optional MarketRenderReadback.

src/start.js
  Preserve window.GameHost.engine/getState/tick.
  Add optional fixture-readable market diagnostics.
```

## Fixture rows

```txt
entry_to_active_session
active_session_to_exchange
exchange_catalog_has_expected_actions
sell_apples_accepted
sell_apples_rejected_no_apples
buy_basic_tool_accepted
buy_basic_tool_rejected_insufficient_funds
buy_basic_tool_rejected_capacity_full
buy_row_supply_accepted
unknown_market_command_rejected
invalid_quantity_rejected
accepted_sell_appends_transaction
accepted_buy_appends_transaction
rejected_command_no_resource_mutation
rejected_command_no_inventory_mutation
command_journal_appends_for_accepted_and_rejected
result_journal_appends_for_accepted_and_rejected
nested_command_result_reaches_interface_composition
exchange_projection_has_price_capacity_transaction_and_last_result_rows
renderer_readback_reports_projection_consumption
GameHost_baseline_shape_preserved
```

## Row result shape

```txt
{
  id,
  accepted,
  reason,
  commandEnvelope,
  sourceBefore,
  sourceAfter,
  mutationSummary,
  transaction,
  commandJournalRow,
  resultJournalRow,
  projection,
  renderReadback,
  nestedResultVisible,
  gameHostCompatible
}
```

## Acceptance line

The implementation is acceptable only when Market sell/buy commands can be proven in a DOM-free fixture and the existing static browser route remains compatible.

## Do not cross this line

```txt
Do not start worker assignment, save slots, codex progression, visual renderer extraction, or settlement parity until this Market transaction ledger splice passes.
```