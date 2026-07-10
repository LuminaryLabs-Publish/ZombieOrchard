# Interaction audit — Nested command result retention map

## Interaction path

```txt
button[data-action]
  -> HTML click handler
  -> interface-composition.activate(actionId)
  -> action lookup on current screen
  -> optional action.command dispatch
  -> ctx.engine.command(...)
  -> CommandResult returned
  -> result currently not retained by activate return value
```

## Current services

- `transition`: change active screen.
- `back`: return to previous screen.
- `activate`: route action by id.
- `action.command`: dispatch a nested command into the engine.
- `engine.command`: return command result and emit notifications.

## Gap

`activate` can report whether an action was accepted at the interface level, but it does not preserve the nested command result. That means Market cannot tell the difference between:

```txt
accepted purchase
rejected price
rejected capacity
no mutation
unknown action
screen back only
```

## Required result shape next

```txt
{
  actionId,
  screenId,
  accepted,
  command,
  commandResult,
  resourceDelta,
  inventoryDelta,
  projectionRows,
  reason
}
```

## Next fixture cases

- valid Market action retains accepted command result.
- unaffordable Market action retains rejected reason.
- capacity-blocked action retains rejected reason.
- Back-only Exchange action remains explicit, not silent.
- unknown action returns stable rejection row.
