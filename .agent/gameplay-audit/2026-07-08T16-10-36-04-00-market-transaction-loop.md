# Gameplay Audit — Market Transaction Loop

**Timestamp:** `2026-07-08T16-10-36-04-00`

## Goal

Document the gameplay authority loop needed before adding wider orchard economy features.

## Current player loop

```txt
Entry
  -> Play
  -> Active Session
  -> move player
  -> collect apples
  -> clear pests
  -> advance day/night phase
  -> Build
  -> Market
  -> Roster
  -> Inventory
  -> Codex
  -> Settings
  -> Outcome when condition reaches zero
```

## Current Market state

```txt
active-session action id: market
  -> to: exchange

exchange screen:
  title: Market
  actions:
    - back -> active-session
```

The Market is reachable but not yet a transaction loop.

## Current command behavior relevant to Market

```txt
resource-ledger:
  canPay(cost)
  pay(cost)
  add(values)
  command(add/pay)
  snapshot(values,last)

inventory-runtime:
  command(equip)
  snapshot(items,equipped)

interface-composition:
  activate(actionId)
  optional action.command dispatch through ctx.engine.command
  nested result currently not retained or returned

html-interface-renderer:
  data-action -> interface-composition.activate
  data-command -> active-session direct command
```

## Target Market transaction loop

```txt
active-session Market action
  -> exchange screen
  -> sell-apples action
  -> buy-basic-tool action
  -> buy-row-supply action
  -> MarketCommandEnvelope
  -> MarketSourceSnapshot before
  -> MarketPreflight
  -> MarketCommandResult
  -> accepted mutation path or rejected no-mutation path
  -> TransactionRecord for accepted commands
  -> MarketCommandJournal row
  -> MarketResultJournal row
  -> MarketSourceSnapshot after
  -> MarketResultProjection
  -> exchange renderer readback
  -> optional GameHost market diagnostics
  -> fixture assertion
```

## Required gameplay cases

```txt
entry_to_active_session
active_session_to_exchange
exchange_back_to_active_session
exchange_action_catalog_has_sell_buy_supply_back
sell_apples_accepts_when_apples_available
sell_apples_rejects_when_apples_zero
sell_apples_appends_transaction
buy_basic_tool_accepts_when_money_and_capacity_available
buy_basic_tool_rejects_on_insufficient_funds
buy_basic_tool_rejects_on_capacity_full
buy_row_supply_accepts_when_money_and_capacity_available
buy_row_supply_rejects_on_insufficient_funds
unknown_market_command_rejects_with_stable_reason
invalid_quantity_rejects_with_stable_reason
rejected_market_command_does_not_mutate_resources
rejected_market_command_does_not_mutate_inventory
accepted_market_command_updates_projection
nested_result_reaches_interface_composition_snapshot
market_result_reaches_GameHost_diagnostics
```

## Current gameplay blocker

Wider economy systems would add ambiguity right now.

Market must first prove:

```txt
- what command was requested
- what source state was read
- what rule accepted or rejected it
- what mutation happened
- what transaction was recorded
- what projection the renderer consumed
- what did not mutate on rejection
```

## Defer

```txt
- worker assignment and pay cycles
- save/load progression
- phase-specific market prices
- codex unlocks
- building effects
- tool durability
- settlement parity
- advanced pest AI
```