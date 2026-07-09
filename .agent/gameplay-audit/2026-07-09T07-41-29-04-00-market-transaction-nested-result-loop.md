# ZombieOrchard Gameplay Audit: Market Transaction Nested Result Loop

**Timestamp:** `2026-07-09T07-41-29-04-00`

## Gameplay type

Static browser orchard survival/economy shell.

## Current playable loop

```txt
Entry
  -> Play
  -> Active Session
  -> Collect apples near player
  -> Clear pests near player
  -> Advance day/night phase
  -> Open Build / Market / Roster / Inventory / Codex
  -> Build storage shed if resources can pay
  -> Survive pressure and pests
  -> Outcome if active-session ends
```

## Current interaction loop

```txt
screen click on data-action
  -> html-interface-renderer
  -> engine.command("interface-composition", "activate", { actionId })
  -> current interface domain returns action descriptor
  -> interface-composition reads action.to or action.command
  -> transition if action.to exists
  -> nested command if action.command exists
  -> nested command result is not retained
```

```txt
screen click on data-command
  -> html-interface-renderer
  -> engine.command("active-session", command)
  -> active-session command mutates player/resources/session state
  -> snapshot renders next frame
```

## Current command results

`engine.command()` already provides a useful result channel:

```txt
{ accepted: false, reason: "missing domain <id>" }
{ accepted: true }
{ accepted: false }
```

Several game-domain commands already return accepted/rejected results:

```txt
resource-ledger: add/pay
construction-runtime: build
roster-runtime: hire
inventory-runtime: equip
active-session: activate/move/collect/clear/next-phase
```

## Market-specific gap

The Market/Exchange screen currently transitions from `active-session` to `exchange`, but the `exchange` domain only has a Back action.

There is no gameplay-proof row for:

```txt
selling apples
buying tool
buying row supply
accepted resource mutation
rejected no-mutation
inventory intake
transaction history
last nested command result
renderer result projection
```

## Required fixture rows

```txt
open-market
sell-apples-accepted
sell-apples-rejected-no-apples
buy-basic-tool-accepted
buy-basic-tool-rejected-no-money
buy-row-supply-accepted
buy-row-supply-rejected-capacity
back-preserves-market-last-result
```

## Next safe ledge

Build the Market command/result fixture before adding broader economy, workers, save/load, or new rendering.
