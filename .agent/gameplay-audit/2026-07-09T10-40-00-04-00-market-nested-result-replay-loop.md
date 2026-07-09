# ZombieOrchard Gameplay Audit — Market Nested Result Replay Loop

**Timestamp:** `2026-07-09T10-40-00-04-00`

## Current gameplay loop

```txt
Entry
  -> Play
  -> Active Session
  -> collect apples
  -> clear pests
  -> next phase
  -> construction / exchange / roster / inventory / knowledge / preferences / outcome screens
```

## Current command paths

```txt
active-session HUD button
  -> [data-command]
  -> engine.command("active-session", command)
  -> result returned to caller but renderer does not retain it

interface screen action
  -> [data-action]
  -> engine.command("interface-composition", "activate", { actionId })
  -> active screen returns action descriptor
  -> optional nested action.command is executed
  -> nested command result is discarded
  -> optional screen transition occurs
```

## Market gameplay gap

The Exchange/Market loop is still not an actual economy loop. The screen exists but currently only exposes Back. The next implementation must make Market actions durable before more economy content is added.

## Required Market replay rows

```txt
accepted sell-apples:
  before apples > 0
  action sell-apples
  result accepted
  apples decrease
  money increase
  transaction appended
  nested result retained

accepted buy-basic-tool:
  before money enough and capacity available
  action buy-basic-tool
  result accepted
  money decrease
  inventory increases
  transaction appended
  nested result retained

rejected insufficient-resource:
  before money too low
  action buy-basic-tool
  result rejected
  reason insufficient-resource
  no resource mutation
  no inventory mutation

rejected capacity:
  before inventory full
  action buy-row-supply
  result rejected
  reason inventory-capacity
  no resource mutation
  no inventory mutation
```

## Gameplay constraint

Do not widen the orchard economy until these replay rows pass without DOM, canvas, or browser state.
