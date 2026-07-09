# ZombieOrchard Gameplay Audit: Market Command Result Replay Loop

**Timestamp:** `2026-07-09T13-03-43-04-00`

## Current gameplay loop

```txt
entry screen
  -> Play action
  -> active-session
  -> collect apples
  -> clear pests
  -> advance phase
  -> open construction / exchange / roster / inventory / knowledge / preferences / outcome screens
```

The playable loop is present, but the Market/Exchange branch is not yet a real economy interaction loop.

## Current command flow

```txt
[data-command]
  -> active-session command
  -> returned result is ignored by renderer

[data-action]
  -> interface-composition.activate
  -> active screen returns action descriptor
  -> optional nested action.command dispatches through ctx.engine.command(...)
  -> nested command result is discarded
  -> optional transition happens
```

## Current gameplay domains

```txt
resource-ledger
pressure-field
orchard-world
construction-runtime
roster-runtime
inventory-runtime
active-session
interface-composition
exchange
```

## Current gameplay services

```txt
resource-ledger:
  add / pay / canPay

orchard-world:
  collectNear

active-session:
  move / collect / clear / next-phase / pest tick

construction-runtime:
  build with resource payment

roster-runtime:
  hire with money payment

inventory-runtime:
  equip

interface-composition:
  transition / back / activate / nested dispatch
```

## Gameplay gap

```txt
- Market has no accepted sell row.
- Market has no accepted buy row.
- Market has no rejected insufficient-resource row.
- Market has no rejected capacity row.
- Market has no no-mutation proof for rejection.
- Market has no transaction history.
- Market has no result journal.
- Market has no replay fixture.
```

## Required replay rows

```txt
row: accepted sell-apples
  before: apples > 0
  result: accepted
  after: apples decrease, money increases
  journal: transaction appended

row: accepted buy-basic-tool
  before: enough money and capacity
  result: accepted
  after: money decreases, inventory increases
  journal: transaction appended

row: rejected buy-basic-tool insufficient money
  before: low money
  result: rejected / insufficient-resource
  after: resources and inventory unchanged
  journal: rejection appended

row: rejected buy-row-supply capacity full
  before: full capacity
  result: rejected / capacity-full
  after: resources and inventory unchanged
  journal: rejection appended
```

## Gameplay stop condition

This ledge is complete only when fixture rows prove command envelope, preflight, result, mutation/no-mutation, transaction, nested result retention, renderer readback, and GameHost diagnostics without requiring DOM or browser state.
