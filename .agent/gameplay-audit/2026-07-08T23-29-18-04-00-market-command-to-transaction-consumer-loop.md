# ZombieOrchard Market Command To Transaction Consumer Loop

**Timestamp:** `2026-07-08T23-29-18-04-00`

## Current player loop

```txt
Entry
  -> Play
  -> Active Session
  -> collect apples
  -> clear pests
  -> next phase
  -> open Build / Market / Roster / Inventory / Codex / Settings
  -> Market exchange shell
  -> Back
  -> session ends on health depletion
  -> Outcome
```

## Current command paths

```txt
data-action click:
  html-interface-renderer
  -> engine.command("interface-composition", "activate", { actionId })
  -> active screen command("activate", payload)
  -> optional nested action.command through ctx.engine.command(...)
  -> nested result currently discarded

active-session quick command:
  html-interface-renderer
  -> engine.command("active-session", commandName)
  -> active-session command mutates player/session/resources/pests
```

## Gameplay blocker

Market is visually reachable but not gameplay-complete.

The player can enter the exchange surface, but there is no source-owned command loop for selling apples, buying a basic tool, buying row supplies, rejecting invalid transactions, journaling transaction results, or projecting the last result back into the UI.

## Target Market gameplay loop

```txt
player collects apples
  -> resource-ledger values.apples increases
  -> player opens Market/exchange
  -> exchange actions are emitted from MarketCommandSourceManifest
  -> player selects sell-apples / buy-basic-tool / buy-row-supply
  -> MarketCommandEnvelope normalizes intent
  -> MarketSourceSnapshot captures before state
  -> MarketPreflight checks quantity, funds, apples, capacity, and known command
  -> MarketCommandResult is accepted or rejected
  -> accepted sell mutates resources and transaction history
  -> accepted buy mutates resources, inventory, and transaction history
  -> rejected command proves no resource/inventory mutation
  -> result is adapted through interface-composition.lastResult
  -> MarketResultProjection renders player-facing result
  -> GameHost exposes fixture-readable market diagnostics
```

## Required result reasons

```txt
accepted:
  market.sell_apples.accepted
  market.buy_basic_tool.accepted
  market.buy_row_supply.accepted

rejected:
  market.unknown_command
  market.invalid_quantity
  market.insufficient_apples
  market.insufficient_funds
  market.inventory_capacity_full
  market.source_unavailable
```

## Required accepted mutations

```txt
sell-apples:
  resources.apples decreases
  resources.money increases
  transaction.type = sell
  transaction.itemId = apples

buy-basic-tool:
  resources.money decreases
  inventory.items appends basic-tool instance
  transaction.type = buy
  transaction.itemId = basic-tool

buy-row-supply:
  resources.money decreases
  inventory.items appends row-supply instance
  transaction.type = buy
  transaction.itemId = row-supply
```

## Required rejected no-mutation proof

```txt
For every rejected MarketCommandResult:
  before.resources deep-equals after.resources
  before.inventory deep-equals after.inventory
  transaction is not appended
  command journal row is appended
  result journal row is appended
  projection exposes the rejection reason
```

## Required fixture rows

```txt
- entry screen baseline
- Play to active-session
- active-session to exchange
- exchange action catalog
- source manifest action rows
- source manifest reason rows
- sell-apples accepted
- sell-apples rejected with insufficient_apples
- buy-basic-tool accepted
- buy-basic-tool rejected with insufficient_funds
- buy-row-supply accepted
- buy command rejected with inventory_capacity_full
- unknown command rejected
- invalid quantity rejected
- rejected no-mutation proof
- command journal shape
- result journal shape
- transaction history shape
- nested result adapter shape
- projection shape
- render readback shape
- GameHost baseline compatibility
```

## Stop line

Do not add new economy systems, save slots, workers, or long-term settlement simulation until this Market command-to-transaction loop is source-owned and fixture-proven.
