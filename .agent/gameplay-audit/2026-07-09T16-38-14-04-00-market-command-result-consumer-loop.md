# ZombieOrchard Gameplay Audit: Market Command Result Consumer Loop

**Timestamp:** `2026-07-09T16-38-14-04-00`

## Current gameplay loop

```txt
Entry
  -> Play
  -> Active Session
  -> move / collect / clear / next phase
  -> Build / Market / Roster / Inventory / Codex actions
  -> Exchange currently only Back
  -> Outcome when active-session ends
```

## Current command loop

```txt
active-session quick command
  -> data-command
  -> engine.command("active-session", command)
  -> command result returned to renderer caller but not journaled

screen action
  -> data-action
  -> engine.command("interface-composition", "activate", actionId)
  -> screen domain returns action descriptor
  -> optional action.command is executed through ctx.engine.command(...)
  -> nested command result is discarded
  -> transition result or generic accepted result is returned
```

## Gameplay blocker

The Market screen is not yet an economy loop. It is a navigation screen.

```txt
active-session action id: market
  -> transition to exchange

exchange:
  title: Market
  actions:
    - back
```

## Required gameplay result loop

```txt
sell apples
  -> action source row
  -> command envelope
  -> preflight resources/inventory/capacity
  -> accepted command result
  -> resource transaction record
  -> result journal
  -> projection/readback

buy basic tool
  -> action source row
  -> command envelope
  -> preflight money/capacity
  -> accepted or rejected command result
  -> inventory intake only if accepted
  -> no mutation if rejected

buy row supply
  -> same pattern
```

## Gameplay fixture rows needed

```txt
accepted sell-apples
accepted buy-basic-tool
rejected buy-basic-tool because insufficient money
rejected buy-row-supply because capacity or source policy
back action remains compatible
```

## Deferrals

```txt
- Do not rebalance day/night phases yet.
- Do not add more pests/crops.
- Do not add workers or automation.
- Do not make Market visual polish before command/result proof.
```
