# ZombieOrchard Gameplay Audit: Market Command Result Loop

**Timestamp:** `2026-07-09T13-18-48-04-00`

## Current gameplay loop

```txt
Entry
  -> Active Session
  -> collect apples
  -> clear pests
  -> pressure and curse tick upward
  -> day/night advances
  -> Build / Market / Roster / Inventory / Codex / Settings routes
  -> pests can end session
  -> Outcome route
```

## Active-session commands

```txt
move:
  changes player position inside bounds.

collect:
  finds nearest apple, removes it, reseeds apples, adds money/apples, adjusts pressure, updates score/message.

clear:
  damages nearby pest, removes defeated pest, awards scrap, updates score/message.

next-phase:
  toggles day/night and increments day on morning.
```

## Economy commands already present

```txt
construction-runtime build:
  pays resources and appends built item.

roster-runtime hire:
  pays money and appends actor.

inventory-runtime equip:
  equips selected item.

resource-ledger add/pay:
  applies resource deltas.
```

## Market gameplay gap

The Market route currently exists as `exchange`, but it is only a screen shell. It does not yet produce gameplay-grade action/result rows.

Required Market loop:

```txt
open exchange
  -> select sell/buy action
  -> source catalog resolves action
  -> command envelope captures intent
  -> before source snapshot is recorded
  -> preflight accepts or rejects
  -> accepted command mutates resources/inventory
  -> rejected command proves no mutation
  -> command/result journal records row
  -> renderer projects result
  -> GameHost exposes diagnostics
  -> fixture replays accepted and rejected rows
```

## Gameplay recommendation

Do not add new crops, workers, market categories, enemy types, or save/load before Market result proof exists. The current orchard loop has enough gameplay to prove the next DSK seam.
