# ZombieOrchard Gameplay Audit: Market Transaction Result Loop

**Timestamp:** `2026-07-09T07-30-48-04-00`

## Current playable loop

```txt
start at entry
  -> play into active-session
  -> collect apples near player
  -> clear pests near player
  -> advance day/night phase
  -> open build / market / roster / inventory / codex
  -> return to active-session
  -> lose when player condition falls to zero
  -> outcome screen shows score/day
```

## Current command loops

```txt
active-session.move:
  player position changes inside bounds

active-session.collect:
  orchard-world.collectNear(player)
  resource-ledger.add({ apples, money })
  pressure-field.adjust(...)
  score/message update

active-session.clear:
  nearest pest condition changes
  resource-ledger.add({ scrap }) if cleared
  score/message update

active-session.next-phase:
  phase toggles day/night
  day increments when returning to day

construction-runtime.build:
  resource-ledger.pay(cost)
  built item appended when accepted
```

## Market gameplay gap

The player can enter Market, but Market is not yet a gameplay loop.

The current `exchange` screen only has Back. There is no source-owned sell/buy catalog, no transaction record, no result journal, and no proof that rejected Market actions preserve resources and inventory.

## Next gameplay loop

```txt
enter active-session
  -> collect apples
  -> open Market
  -> sell-apples action
  -> MarketCommandEnvelope
  -> MarketPreflight
  -> accepted MarketCommandResult
  -> resource transaction: apples decrease, money increases
  -> nested result retained by interface-composition
  -> Exchange projection reports sale
  -> GameHost diagnostics show result row
```

Rejected row:

```txt
open Market with insufficient apples or money
  -> execute sell/buy action
  -> MarketPreflight rejects
  -> no resource or inventory mutation
  -> rejection reason is stable
  -> result is retained and rendered
```

## Required action IDs

```txt
sell-apples
buy-basic-tool
buy-row-supply
back
```

## Stable reasons

```txt
accepted
unknown-action
missing-apples
missing-money
capacity-full
no-market-source
no-resource-ledger
no-inventory-runtime
```

## Stop condition

The gameplay proof is complete when the Market loop has accepted, rejected, transaction, no-mutation, nested-result, renderer-projection, and GameHost-diagnostic rows in one DOM-free fixture.
