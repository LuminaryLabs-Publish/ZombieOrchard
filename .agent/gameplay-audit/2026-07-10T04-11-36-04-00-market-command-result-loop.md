# Gameplay Audit: Market Command Result Loop

**Timestamp:** `2026-07-10T04-11-36-04-00`

## Current gameplay loop

```txt
active-session
  -> move
  -> collect apple
  -> clear pest
  -> next phase
  -> pressure/pest tick
  -> score/resource updates
  -> pause/build/market/roster/inventory/codex navigation
```

## Current Market loop

```txt
active-session Market button
  -> interface-composition activates action id market
  -> action.to moves active screen to exchange
  -> exchange screen renders generic Market panel
  -> only Back is available
```

## Existing command result behavior

`createKitRuntime.command()` already returns a result object.

Examples:

```txt
missing domain -> { accepted: false, reason: `missing domain ${domainId}` }
resource-ledger pay -> { accepted: true | false }
construction build -> { accepted: true | false }
active-session collect -> { accepted: true | false }
```

## Gameplay blocker

Market cannot become a real game loop until it can prove result rows.

Missing proof rows:

```txt
sell apples accepted
sell apples rejected because no apples
buy tool accepted
buy tool rejected because not enough money
buy supply accepted
buy supply rejected because capacity full
no mutation on rejected rows
resource transaction rows for accepted rows
inventory intake rows for accepted buy rows
nested command result retained by interface-composition
Exchange projection consumes retained result
GameHost exposes retained result
DOM-free fixture replays all rows
```

## Recommended loop

```txt
player opens Market
  -> Exchange projection lists source-owned MarketActionCatalog
  -> player chooses action
  -> InterfaceNestedResultAdapter wraps action.command
  -> MarketCommandEnvelope is built
  -> MarketSourceSnapshot before is captured
  -> MarketPreflight returns accepted or rejected
  -> MarketCommandResult records status/reason/deltas
  -> accepted row mutates resources/inventory
  -> rejected row proves no mutation
  -> MarketSourceSnapshot after is captured
  -> MarketResultJournal appends row
  -> interface-composition.snapshot().lastResult retains row
  -> Exchange renderer projects row
  -> GameHost exposes marketDiagnostics
  -> fixture asserts accepted/rejected parity
```

## Main gameplay finding

The next gameplay work should be Market proof, not economy breadth.

Do not add more shops, crops, enemies, or save/load until accepted and rejected Market command rows are stable.
