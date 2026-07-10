# Interaction audit — Nested Command Result Adapter Map

## Timestamp

`2026-07-10T12-49-54-04-00`

## Current interaction path

```txt
button[data-action]
  -> html-interface-renderer click handler
  -> engine.command("interface-composition", "activate", { actionId })
  -> interface-composition asks active domain to activate action
  -> active domain returns { accepted, action }
  -> if action.command exists, interface-composition calls ctx.engine.command(...)
  -> nested command result is ignored
  -> next screen transition may happen
```

## Problem line

In `src/kits/composition.js`, nested command dispatch is currently fire-and-forget:

```txt
if (action.command) ctx.engine.command(action.command.domain || state.active, action.command.type, action.command.payload || {});
```

The result from that nested command does not survive into the activation result, a journal, or any projection.

## Why this matters for Market

Market needs accepted and rejected command rows.

Without a retained nested result, the interface cannot explain:

```txt
what Market action ran
which domain handled it
what payload was sent
whether it was accepted
why it was rejected
what resource delta happened
what inventory delta happened
what Exchange projection should show
```

## Adapter needed next

Add a narrow adapter around nested action commands:

```txt
nestedResult = action.command
  ? ctx.engine.command(action.command.domain || state.active, action.command.type, action.command.payload || {})
  : null

return {
  accepted: true,
  action,
  nestedResult,
  next,
  projectionIntent
}
```

Then Market can consume the result without rewriting the whole runtime.

## Fixture target

```txt
engine.command("interface-composition", "activate", { actionId: "market-buy-seed" })
  -> returns accepted result
  -> contains nestedResult
  -> nestedResult has accepted/reason/resultId
  -> Exchange projection stores same resultId
```

## Main finding

The interaction blocker is not missing buttons. It is missing nested command result retention.
