# Gameplay audit: Market resource inventory result loop

Timestamp: 2026-07-10T14-21-28-04-00

## Gameplay loop

```txt
entry screen
  -> play active session
  -> collect apples / money
  -> open interface actions such as construction, roster, inventory, exchange
  -> nested action.command may call runtime domain command
  -> command result may spend resources or mutate inventory/roster/construction
  -> interface-composition currently drops nested result
  -> renderer and GameHost cannot prove the Market outcome
```

## Current gameplay value

The existing engine already has useful resource and inventory primitives:

- `resource-ledger` can pay/add and returns command results.
- construction/hire/equip paths mutate domain state.
- active session can collect, clear, and advance phase.

## Gap

Market needs rows that connect:

```txt
Market action id
  -> command envelope
  -> preflight price/capacity result
  -> retained CommandResult
  -> resource transaction row
  -> inventory purchase intake row
  -> Exchange projection row
  -> GameHost.market row
```

## Next gameplay ledge

Build a DOM-free fixture with one accepted Market action and one rejected Market action. Assert the retained nested result plus resource/inventory deltas before adding more economy content.
