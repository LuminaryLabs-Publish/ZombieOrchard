# Interaction Audit: Nested Command Result Retention

**Timestamp:** `2026-07-10T04-11-36-04-00`

## Current click routing

```txt
[data-action]
  -> engine.command("interface-composition", "activate", { actionId })
  -> active screen domain returns { accepted: true, action }
  -> optional action.command dispatches through ctx.engine.command(...)
  -> nested command result is not stored
  -> next screen is selected through action.to or transition table
```

```txt
[data-command]
  -> engine.command("active-session", command)
  -> active-session returns command result
  -> renderer does not read or display that result directly
```

## Source blocker

`src/kits/composition.js` currently does this:

```txt
if (action.command) ctx.engine.command(action.command.domain || state.active, action.command.type, action.command.payload || {});
```

The nested command is executed, but the return value is dropped.

## Why this matters

Market cannot prove accepted/rejected rows if the interface layer cannot remember the result of nested commands.

Affected current and near-future paths:

```txt
construction action -> build result disappears from interface-composition snapshot
future sell apples action -> sell result would disappear
future buy tool action -> buy result would disappear
future rejected Market action -> rejection reason would disappear
Exchange renderer cannot show result
GameHost cannot expose result
fixtures cannot assert result through UI-facing snapshot
```

## Required next interaction record

```txt
NestedCommandResultRecord:
  actionId
  sourceScreen
  commandDomain
  commandType
  commandPayload
  accepted
  reason
  result
  beforeActive
  afterActive
  frame
  elapsed
```

## Required compatibility rule

Preserve this API:

```txt
engine.command("interface-composition", "activate", { actionId })
```

Add only this snapshot surface:

```txt
snapshot()["interface-composition"].lastResult
```

## Main interaction finding

The smallest useful implementation is not a new input system.

It is a nested-result retention adapter inside `interface-composition`, followed by a Market renderer and fixture that consume the retained row.
