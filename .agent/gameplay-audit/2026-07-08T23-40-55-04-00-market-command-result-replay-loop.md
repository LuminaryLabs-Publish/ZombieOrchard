# ZombieOrchard Market Command Result Replay Loop

**Timestamp:** `2026-07-08T23-40-55-04-00`

## Current gameplay loop

```txt
Entry
  -> Play
  -> Active Session
  -> move through active-session commands
  -> collect apples
  -> clear pests
  -> next-phase toggles day/night
  -> Build routes to construction
  -> construction action can pay resource-ledger and append built item
  -> Market routes to exchange
  -> exchange currently only exposes Back
  -> Roster routes to roster shell
  -> Inventory routes to inventory shell
  -> Codex/Settings route to static shell screens
  -> active-session ends when player condition reaches zero
  -> outcome screen
```

## Gameplay command surfaces

```txt
active-session direct commands:
  collect
  clear
  next-phase

active-session navigation actions:
  pause
  build
  market
  roster
  inventory
  codex

interface actions:
  play
  new
  settings
  start
  back
  resume
  title
  shed

nested command example:
  construction action shed
    -> interface-composition.activate
    -> action.command construction-runtime/build
    -> ctx.engine.command("construction-runtime", "build", payload)
    -> nested result currently discarded
```

## Market gameplay gap

```txt
exchange screen exists.
exchange screen has no sell/buy action rows.
Market command source does not exist.
Market prices do not exist.
Market capacity policy does not exist.
Market accepted/rejected result shape does not exist.
Market transaction records do not exist.
Market replay rows do not exist.
Nested Market result propagation does not exist.
```

## Target Market gameplay loop

```txt
active-session market action
  -> transition to exchange
  -> exchange action row selected
  -> MarketCommandEnvelope
  -> MarketSourceSnapshot before
  -> MarketPreflight
  -> MarketCommandResult
  -> accepted mutation or rejected no-mutation
  -> MarketSourceSnapshot after
  -> TransactionRecord if accepted
  -> MarketCommandJournal row
  -> MarketResultJournal row
  -> InterfaceNestedResultAdapter
  -> interface-composition.snapshot().lastResult
  -> MarketResultProjection
  -> exchange renderer consumer
  -> MarketRenderReadback
  -> GameHost market diagnostics
  -> DOM-free replay fixture
```

## Required replay rows

```txt
accepted sell-apples:
  resources.apples decreases
  resources.money increases
  transaction record appended
  result accepted true

rejected sell-apples with zero apples:
  resources unchanged
  inventory unchanged
  result accepted false
  reason market.insufficient_apples

accepted buy-basic-tool:
  resources.money decreases
  inventory.items appends tool
  transaction record appended

rejected buy-basic-tool insufficient funds:
  resources unchanged
  inventory unchanged
  stable reason market.insufficient_funds

rejected buy-basic-tool capacity full:
  resources unchanged
  inventory unchanged
  stable reason market.inventory_capacity_full

unknown command:
  resources unchanged
  inventory unchanged
  stable reason market.unknown_command

invalid quantity:
  resources unchanged
  inventory unchanged
  stable reason market.invalid_quantity

nested result propagation:
  interface-composition.activate returns adapter result
  interface-composition.snapshot().lastResult is populated

projection/readback:
  exchange renderer consumes MarketResultProjection
  MarketRenderReadback row confirms no renderer-owned Market authority
```

## Gameplay rule

The Market fixture must prove gameplay result integrity before adding more economy loops, combat loops, worker loops, or save-state behavior.
