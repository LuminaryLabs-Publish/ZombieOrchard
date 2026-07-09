# ZombieOrchard Market Nested Result Fixture Contract

**Timestamp:** `2026-07-09T18-49-13-04-00`

## Contract target

Market needs source-owned command rows before economy expansion.

## Source rows

```txt
MarketActionCatalog
MarketCommandSourceManifest
MarketCommandEnvelope
MarketSourceSnapshot before
MarketPreflight
MarketCommandResult
MarketCommandJournal
MarketResultJournal
ResourceTransactionHistory
InventoryPurchaseIntake
MarketSourceSnapshot after
```

## Fixture rows

```txt
accepted_sell_apples
accepted_buy_basic_tool
accepted_buy_row_supply
rejected_insufficient_money
rejected_insufficient_apples
rejected_capacity
back_transition_still_works
nested_result_retained
exchange_projection_matches_result
market_render_readback_matches_projection
gamehost_market_diagnostics_match_fixture
```

## Compatibility rule

Keep current runtime APIs:

```txt
window.GameHost.engine
window.GameHost.getState()
window.GameHost.tick(dt)
engine.command(domainId, type, payload)
engine.snapshot()
```

Add Market diagnostics without removing raw engine state.
