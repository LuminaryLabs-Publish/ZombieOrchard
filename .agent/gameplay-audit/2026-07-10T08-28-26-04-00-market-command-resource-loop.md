# ZombieOrchard Gameplay Audit — Market Command Resource Loop

**Timestamp:** `2026-07-10T08-28-26-04-00`

## Current gameplay loop

```txt
start app
  -> entry screen
  -> play transitions to active-session
  -> fixed tick advances pressure and active-session state
  -> player can collect apples near position
  -> player can clear pests near position
  -> next-phase toggles day/night and advances day
  -> construction can build storage shed by paying wood/money
  -> roster can hire by paying money
  -> inventory can equip items
  -> Market/Exchange currently exposes only Back
```

## Resource domains in use

```txt
resource-ledger
  -> money
  -> apples
  -> wood
  -> scrap

active-session
  -> player condition
  -> player stamina
  -> day
  -> phase
  -> score
  -> pests
  -> message

construction-runtime
  -> catalog
  -> built
  -> build command

roster-runtime
  -> actors
  -> hire command

inventory-runtime
  -> items
  -> equipped
  -> equip command
```

## Gameplay proof gap

The game has command results, but no Market-specific proof rows.

Missing rows:

```txt
market action source row
resource price row
inventory capacity row
preflight accepted/rejected row
resource before/after transaction
inventory intake row
Market result status
Market result reason
Market journal order
Exchange projection row
GameHost.market readback
```

## Next gameplay services

```txt
market-action-catalog-kit
market-price-source-kit
market-capacity-policy-kit
market-preflight-kit
market-result-kit
market-transaction-history-kit
inventory-purchase-intake-kit
market-result-journal-kit
market-fixture-replay-kit
```

## Recommendation

Do not add more economy content next.

First make Market command/resource effects readable and fixture-proven through accepted and rejected rows.
