# ZombieOrchard Market Command Result Loop

**Timestamp:** `2026-07-08T14-18-45-04-00`

## Goal

Define the gameplay-side command/result loop for Market sell/buy actions before adding implementation code.

## Current gameplay loop

```txt
entry
  -> play action
  -> active-session
  -> collect apples
  -> clear pests
  -> next phase
  -> open construction/exchange/roster/inventory/knowledge/preferences
  -> exchange currently only back
```

## Current command flow

```txt
click[data-action]
  -> engine.command("interface-composition", "activate", { actionId })
  -> interface-composition asks active interface domain to activate action
  -> action may contain action.command
  -> ctx.engine.command(action.command.domain, action.command.type, action.command.payload)
  -> nested command result is currently dropped
  -> optional screen transition occurs
```

## Target Market command loop

```txt
click sell/buy action
  -> interface-composition.activate
  -> exchange action descriptor
  -> MarketCommandEnvelope
  -> MarketSourceSnapshot
  -> MarketPreflight
  -> MarketCommandResult
  -> accepted only: resource/inventory mutation
  -> rejected: no mutation with before/after proof
  -> TransactionRecord if accepted
  -> MarketCommandJournal row
  -> MarketResultJournal row
  -> interface-composition.lastResult
  -> MarketResultProjection
  -> exchange renderer
  -> renderer readback
  -> GameHost diagnostics
```

## Required command results

```txt
accepted sell-apples:
  accepted: true
  commandId: sell-apples
  transaction.kind: sell
  mutations.resources.money > before
  mutations.resources.apples < before

rejected sell-apples:
  accepted: false
  reason: insufficient-apples or invalid-quantity
  before.resources == after.resources
  before.inventory == after.inventory

accepted buy-basic-tool:
  accepted: true
  commandId: buy-basic-tool
  transaction.kind: buy
  mutations.resources.money < before
  mutations.inventory.items contains purchased tool

rejected buy-basic-tool:
  accepted: false
  reason: insufficient-funds or inventory-capacity-full
  no mutation

accepted buy-row-supply:
  accepted: true
  commandId: buy-row-supply
  transaction.kind: buy
  deterministic price row used

rejected unknown command:
  accepted: false
  reason: unknown-market-command
  no mutation
```

## Required journals

```txt
MarketCommandJournal row:
  frame
  elapsed
  commandId
  actorId
  quantity
  sourceFingerprint
  activeScreen
  accepted
  reason

MarketResultJournal row:
  frame
  commandId
  accepted
  reason
  transactionId
  beforeHash
  afterHash
  mutationSummary
```

## Preserve

```txt
- active-session move/collect/clear/next-phase semantics
- construction-runtime build path
- roster-runtime hire path
- inventory-runtime equip path
- interface transition/back behavior
- GameHost baseline shape
```

## Next safe ledge

```txt
ZombieOrchard Market Acceptance Ledger + Exchange Renderer Readback Fixture Gate
```
