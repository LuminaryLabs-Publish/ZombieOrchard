# Gameplay Audit: Market Nested Result Loop

**Timestamp:** `2026-07-09T05-11-22-04-00`

## Current gameplay loop

```txt
entry screen
  -> Play action
  -> active-session
  -> Collect / Clear / Next Phase commands
  -> optional screen actions for Build, Market, Roster, Inventory, Codex, Settings
  -> active-session ends when player condition reaches 0
  -> interface-composition moves to outcome
```

## Current Market loop

```txt
interface-composition.active = exchange
  -> html-interface-renderer shows generic screen
  -> action button click dispatches interface-composition.activate
  -> active exchange domain returns an action descriptor
  -> if action.command exists, interface-composition calls ctx.engine.command(...)
  -> nested result is not stored
  -> next transition may happen
```

## Current game services

```txt
move player
collect apples
clear pests
advance day/night
pay resources
add resources
build construction items
hire roster actors
equip inventory
track pressure
render HUD resources
render world snapshot
```

## Gameplay gap

Market actions need to behave like gameplay actions, not like generic screen links.

Each Market action should produce a stable result row:

```txt
accepted sell
accepted buy
rejected insufficient resources
rejected capacity full
rejected unknown action
unchanged rejected state proof
transaction history row
inventory intake row
nested result row
projection row
readback row
```

## Required Market action IDs

```txt
sell-apples
buy-basic-tool
buy-row-supply
back
```

## Required command/result flow

```txt
click exchange action
  -> MarketActionCatalog lookup
  -> MarketCommandEnvelope
  -> MarketSourceSnapshot before
  -> MarketPreflight
  -> MarketCommandResult
  -> accepted mutation or rejected no-mutation
  -> MarketSourceSnapshot after
  -> MarketCommandJournal
  -> MarketResultJournal
  -> InterfaceNestedResultAdapter
  -> interface-composition.snapshot().lastResult
```

## Gameplay acceptance criteria

```txt
accepted sale increases money and decreases apples
accepted purchase decreases money and adds inventory/intake row
rejected sale with no apples mutates nothing
rejected purchase with insufficient money mutates nothing
nested result is retained by interface-composition
Exchange renderer can project latest Market result
GameHost can expose latest Market diagnostics
DOM-free fixture proves all rows
```

## Decision

Keep the current active-session survival loop intact. Add Market proof around the existing command router instead of rewriting gameplay state.
