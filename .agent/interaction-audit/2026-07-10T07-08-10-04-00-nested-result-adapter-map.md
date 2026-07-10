# Interaction audit — nested result adapter map

Timestamp: `2026-07-10T07-08-10-04-00`

## Current interaction route

```txt
HTML element with data-action
  -> interface-composition.activate(actionId)
  -> screen action handler
  -> optional action.command
  -> engine.command(action.command)
  -> command result returns
  -> result is dropped
  -> next render uses aggregate engine snapshot
```

## Interaction problem

The user can take actions that dispatch commands, but the interface adapter does not retain the command result. That means the UI cannot reliably explain:

```txt
accepted
rejected
no-op
resource delta
inventory delta
stable reason code
which nested action caused the result
```

## Required adapter behavior

```txt
activationId: stable ID for the clicked interface action
screenId: active screen at activation time
commandId: optional nested command ID
resultStatus: accepted | rejected | no_mutation
reasonCode: stable machine-readable reason
beforeSnapshotRef: source snapshot before command
result: engine command result
projection: Exchange/Market render row
```

## Next interaction ledge

Add a nested-result adapter that preserves command results and makes them available to both the HTML renderer and `GameHost.market` without changing the existing `engine.command()` compatibility surface.
