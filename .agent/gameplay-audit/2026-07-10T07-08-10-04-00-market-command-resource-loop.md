# Gameplay audit — Market command resource loop

Timestamp: `2026-07-10T07-08-10-04-00`

## Current gameplay loop

```txt
player enters run
  -> orchard engine ticks at fixed dt
  -> active-session HUD renders resource/world state
  -> interface buttons use data-action
  -> interface-composition activates screen action
  -> some actions dispatch nested action.command through engine.command
  -> command result returns from engine.command
  -> nested result is not retained by the interface adapter
  -> renderer only receives the next aggregate snapshot
```

## Market gameplay intent

The Market/Exchange gameplay path should become a first-class source/result loop:

```txt
MarketAction row
  -> preflight price/capacity/resource checks
  -> command envelope
  -> command result
  -> resource transaction row
  -> inventory intake row
  -> Exchange projection
  -> GameHost.market diagnostics
  -> fixture replay row
```

## Current blocker

The engine can return command results, but gameplay consumers do not have an ordered Market command/result ledger. As a result, accepted/rejected/no-op Market behavior cannot be explained independently from final aggregate resource state.

## Safe next gameplay work

```txt
1. Source-own Market action rows.
2. Add stable Market action IDs.
3. Add preflight rows for price, capacity, and resource availability.
4. Preserve command result rows from nested interface commands.
5. Add resource transaction history.
6. Add inventory purchase intake rows.
7. Add a DOM-free fixture with accepted and rejected Market examples.
```

## Unsafe next gameplay work

```txt
Do not add more economy content yet.
Do not rebalance prices yet.
Do not add new inventory categories yet.
Do not infer Market success from final resource totals only.
```
