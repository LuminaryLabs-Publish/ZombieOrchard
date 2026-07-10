# ZombieOrchard Gameplay Audit: Market Result Fixture Loop

**Timestamp:** `2026-07-09T23-20-43-04-00`

## Current gameplay loop

```txt
entry screen
  -> Play action
  -> active-session
  -> tick pressure and active-session
  -> render orchard world
  -> Collect / Clear / Next Phase commands
  -> optional active-session actions route to Build, Market, Roster, Inventory, Codex, Pause
```

## Current Market loop

```txt
active-session Market action
  -> interface-composition.activate
  -> transition to exchange
  -> exchange scoped domain snapshot
  -> HTML renderer generic screen
  -> Back action only
```

There is no sell/buy gameplay loop in Market yet.

## Gameplay domains

```txt
active-session
resource-ledger
pressure-field
orchard-world
construction-runtime
roster-runtime
inventory-runtime
interface-composition
exchange
market-action-catalog-next
market-command-result-next
resource-transaction-history-next
inventory-purchase-intake-next
market-fixture-replay-next
```

## Main gameplay finding

The orchard session is playable enough. Market gameplay should not expand into more categories until it has accepted/rejected command rows and replayable proof.

## Required Market gameplay rows

```txt
sell-apples accepted
sell-apples rejected because no apples
buy-basic-tool accepted
buy-basic-tool rejected because insufficient money
buy-row-supply accepted
buy-row-supply rejected because capacity reached
rejected rows prove no resource/inventory mutation
accepted rows append transaction or intake history
interface-composition retains nested result
Exchange projection shows last result
GameHost exposes marketDiagnostics
```

## Next safe gameplay ledge

```txt
ZombieOrchard Market Result Readback Catch-up + Exchange Fixture Gate
```

## Deferred

```txt
new crop types
workers
deep shop economy
save/load
combat pressure expansion
visual polish
```
