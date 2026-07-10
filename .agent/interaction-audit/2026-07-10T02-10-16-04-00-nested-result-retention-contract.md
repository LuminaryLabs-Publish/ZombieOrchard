# ZombieOrchard Interaction Audit: Nested Result Retention Contract

**Timestamp:** `2026-07-10T02-10-16-04-00`

## Current interaction contract

`createKitRuntime.command()` already returns a command result.

`interface-composition.activate` currently does this:

```txt
active screen command("activate", payload)
  -> returns { accepted, action }
  -> if action.command exists, dispatch ctx.engine.command(...)
  -> nested command result is not retained
  -> move to action.to or transition table result
```

## Problem

The nested command result is the important proof row for Market actions, but it is discarded before the interface snapshot, renderer, GameHost, or fixture can inspect it.

## Required additive contract

```txt
InterfaceNestedResult = {
  sourceActionId,
  sourceScreen,
  commandDomain,
  commandType,
  commandPayload,
  commandResult,
  transitionResult,
  accepted,
  reason,
  frame
}
```

## Snapshot target

```txt
snapshot["interface-composition"].lastResult
```

## Consumer targets

```txt
html-interface-renderer:
  read lastResult and render Market result projection when active === "exchange"

GameHost:
  expose marketDiagnostics.lastResult

DOM-free fixture:
  assert accepted and rejected nested command rows are retained
```

## Compatibility rule

Do not remove the current `active`, `previous`, or `activeSnapshot` fields from `interface-composition.snapshot()`.
