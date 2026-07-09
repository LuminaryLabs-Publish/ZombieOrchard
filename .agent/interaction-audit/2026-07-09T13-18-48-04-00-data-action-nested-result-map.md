# ZombieOrchard Interaction Audit: Data Action Nested Result Map

**Timestamp:** `2026-07-09T13-18-48-04-00`

## Browser input paths

```txt
[data-action] click
  -> html-interface-renderer
  -> engine.command("interface-composition", "activate", { actionId })

[data-command] click
  -> html-interface-renderer
  -> engine.command("active-session", command)
```

## Interface-composition path

```txt
interface-composition.activate
  -> ctx.domains[state.active].command("activate", payload)
  -> selected action descriptor
  -> optional action.command
  -> ctx.engine.command(action.command.domain, action.command.type, action.command.payload)
  -> nested result currently ignored
  -> optional action.to transition
  -> result returns accepted/active or accepted true
```

## Current issue

The nested command result is the critical missing interaction artifact. This means a Build or future Market action can run a command, but the active interface snapshot cannot explain:

```txt
- which source action fired
- whether nested command accepted
- why nested command rejected
- what resources changed
- what inventory changed
- what transaction was appended
- what renderer should show as the last result
```

## Required interaction result surface

```txt
InterfaceNestedResultAdapter:
  actionId
  screenId
  commandDomain
  commandType
  nestedAccepted
  nestedReason
  nestedResultId
  mutationSummary
  transitionTarget
  timestamp/frame

interface-composition.snapshot():
  active
  previous
  activeSnapshot
  lastAction
  lastResult
```

## Fixture rows required

```txt
- exchange sell-apples accepted
- exchange buy-basic-tool accepted
- exchange buy-row-supply rejected: insufficient resources
- exchange buy-row-supply rejected: capacity reached
- construction storage-shed accepted remains compatible
- active-session collect remains compatible
```
