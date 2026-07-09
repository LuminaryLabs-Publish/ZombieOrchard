# Interaction Audit: Data Action Nested Result Contract

**Timestamp:** `2026-07-09T13-10-19-04-00`

## Current interaction paths

```txt
[data-action]
  -> createHtmlInterfaceRenderer click listener
  -> engine.command("interface-composition", "activate", { actionId })
  -> current interface domain command("activate", payload)
  -> action descriptor returned
  -> optional nested action.command dispatched
  -> optional transition

[data-command]
  -> createHtmlInterfaceRenderer click listener
  -> engine.command("active-session", command)
```

## Current nested result problem

`interface-composition` currently does this:

```txt
if (action.command) ctx.engine.command(action.command.domain || state.active, action.command.type, action.command.payload || {});
```

The nested result is not stored, normalized, projected, or exposed through snapshot.

That means accepted/rejected Build and future Market commands are invisible to the UI consumer except through secondary state mutation.

## Required interaction contract

Add a compatibility-safe result retention shape:

```txt
interface-composition.snapshot()
  -> active
  -> previous
  -> activeSnapshot
  -> lastResult
```

Where `lastResult` is additive and shaped for both existing and future actions:

```txt
{
  actionId,
  sourceDomain,
  commandDomain,
  commandType,
  accepted,
  reason,
  resultType,
  mutationExpected,
  mutationObserved,
  frame
}
```

## Market-specific interaction rows

```txt
sell-apples
  -> action visible on Exchange
  -> nested command retained
  -> accepted result projected

buy-basic-tool
  -> action visible on Exchange
  -> accepted or rejected result retained

buy-row-supply
  -> action visible on Exchange
  -> capacity rejection retained when full

back
  -> still transitions to active-session
```

## Guardrail

Do not break current `[data-action]` and `[data-command]` behavior. The new contract must be additive.
