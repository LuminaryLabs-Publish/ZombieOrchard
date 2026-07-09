# ZombieOrchard Market Transaction Result Loop

**Timestamp:** `2026-07-08T21-18-39-04-00`

## Goal

Pin the gameplay authority loop for Market actions before adding more economy behavior.

## Current gameplay loop

```txt
Entry
  -> Play
  -> Active Session
  -> Collect
  -> Clear
  -> Next Phase
  -> Build
  -> Market
  -> Exchange shell
  -> Back
```

## Current command loop

```txt
data-action click
  -> interface-composition.activate
  -> active screen command("activate")
  -> action row
  -> optional action.command
  -> ctx.engine.command(action.command.domain, action.command.type, action.command.payload)
  -> nested result discarded
  -> optional transition result returned
```

## Target Market command loop

```txt
exchange action click
  -> action id
  -> MarketCommandEnvelope
  -> MarketSourceSnapshot before
  -> MarketPreflight
  -> MarketCommandResult
  -> accepted: resource/inventory mutation + TransactionRecord
  -> rejected: no mutation
  -> MarketCommandJournal append
  -> MarketResultJournal append
  -> MarketSourceSnapshot after
  -> nested result returned through interface-composition
  -> interface-composition.snapshot().lastResult
  -> exchange projection
  -> renderer readback
```

## Required gameplay cases

```txt
sell-apples accepted:
  apples decreases
  money increases
  transaction record appended
  result status accepted

sell-apples rejected:
  apples remains zero
  money unchanged
  reason insufficient_apples
  result status rejected

buy-basic-tool accepted:
  money decreases
  inventory item added
  transaction record appended
  result status accepted

buy-basic-tool rejected:
  money unchanged
  inventory unchanged
  reason insufficient_funds or capacity_full
  result status rejected

buy-row-supply accepted:
  money decreases
  inventory/resource benefit recorded
  transaction record appended

unknown command rejected:
  no mutation
  stable unknown_market_command reason

invalid quantity rejected:
  no mutation
  stable invalid_quantity reason
```

## Replay requirements

```txt
Market fixture replay must be DOM-free.
Market fixture replay must start from deterministic resources/inventory.
Market fixture replay must produce ordered command/result journal rows.
Market fixture replay must prove rejected no-mutation before/after snapshots.
Market fixture replay must not rely on renderer DOM or canvas.
```

## Follow-on gameplay intentionally deferred

```txt
worker assignment
expanded economy
tool durability
sell/buy animations
building effects
phase authority expansion
save/load economy state
```
