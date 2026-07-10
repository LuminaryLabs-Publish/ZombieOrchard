# Interaction Audit — Nested Command Result Retention Map

## Timestamp

```txt
2026-07-10T11-20-54-04-00
```

## Current interaction routes

```txt
click [data-action]
  -> engine.command("interface-composition", "activate", { actionId })

click [data-command]
  -> engine.command("active-session", command)
```

## Critical seam

```txt
const result = ctx.domains[state.active]?.command?.("activate", payload)
const action = result?.action
if (action.command) ctx.engine.command(action.command.domain || state.active, action.command.type, action.command.payload || {})
const next = action.to || table[state.active]?.[action.id]
return next ? move(next) : { accepted: true }
```

The nested `engine.command(...)` result is not retained. That means the interface cannot explain what happened after a Market action.

## Required interaction contract

```txt
InterfaceActivationResult
NestedCommandResult
MarketActionIntent
MarketPreflightResult
MarketAcceptedResult
MarketRejectedResult
MarketNoMutationResult
MarketResultProjection
MarketResultReadback
```

## Fixture rows needed

```txt
marketAction.clicked
nestedCommand.dispatched
nestedCommand.resultRetained
resourceDelta.recorded
inventoryDelta.recorded
exchangeProjection.updated
renderReadback.recorded
GameHost.market.updated
```
