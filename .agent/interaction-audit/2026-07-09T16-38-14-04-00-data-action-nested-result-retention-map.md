# ZombieOrchard Interaction Audit: Data Action Nested Result Retention Map

**Timestamp:** `2026-07-09T16-38-14-04-00`

## Current click paths

```txt
[data-action]
  -> html-interface-renderer
  -> engine.command("interface-composition", "activate", { actionId })
  -> active screen command("activate", payload)
  -> result.action
  -> optional action.command
  -> ctx.engine.command(action.command.domain || state.active, action.command.type, action.command.payload || {})
  -> nested result discarded
  -> optional move(next)
  -> returned result loses nested command facts

[data-command]
  -> html-interface-renderer
  -> engine.command("active-session", command)
  -> active-session command result
```

## Problem

`interface-composition` is the correct place to retain nested results because it is the boundary where UI action descriptors become runtime commands. The current implementation executes the nested command but drops its result, so renderers and GameHost cannot know whether a nested Market command was accepted, rejected, or mutation-free.

## Additive retention target

```txt
state.lastResult = InterfaceNestedResultAdapter.normalize({
  source: "interface-composition",
  active,
  actionId,
  actionResult,
  nestedResult,
  transitionResult
})
```

Then expose:

```txt
interface-composition.snapshot().lastResult
```

## Compatibility constraints

```txt
- Keep command("activate", payload) public behavior.
- Keep action.to transitions.
- Keep back/transition commands.
- Keep activeSnapshot.
- Add lastResult without removing existing fields.
```

## Fixture expectation

DOM-free rows should assert that:

```txt
- activation without nested command still returns compatible accepted/transition result
- nested accepted command becomes lastResult.status = accepted
- nested rejected command becomes lastResult.status = rejected
- rejected nested command has no resource/inventory mutation
- renderer and GameHost can read the same lastResult-derived Market projection
```
