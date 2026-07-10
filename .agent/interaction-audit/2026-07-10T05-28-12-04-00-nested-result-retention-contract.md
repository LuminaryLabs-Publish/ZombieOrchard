# Interaction Audit: Nested Result Retention Contract

**Timestamp:** `2026-07-10T05-28-12-04-00`

## Current interaction seam

`html-interface-renderer` routes clicks through:

```txt
[data-action]
  -> engine.command("interface-composition", "activate", { actionId })
```

`interface-composition` then does:

```txt
const result = ctx.domains[state.active]?.command?.("activate", payload)
const action = result?.action
if (action.command) ctx.engine.command(action.command.domain || state.active, action.command.type, action.command.payload || {})
```

The nested `ctx.engine.command(...)` result is not stored or returned.

## Why this matters

This means the UI cannot know whether a nested action was accepted, rejected, paid for, or skipped.

Construction already has this problem for `Storage Shed`; Market would inherit it unless the nested-result adapter is added first.

## Required contract

```txt
interface-composition.activate returns:
  accepted
  actionId
  activeBefore
  activeAfter
  transition
  nestedResult
  resultId
  reason
```

`interface-composition.snapshot()` adds:

```txt
lastResult
lastNestedResult
lastActionId
lastTransition
```

## Compatibility rule

Preserve current activate/back/transition behavior.

Only add fields; do not remove `active`, `previous`, or `activeSnapshot`.
