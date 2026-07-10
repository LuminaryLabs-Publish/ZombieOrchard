# ZombieOrchard Interaction Audit: Nested Command Result Retention

**Timestamp:** `2026-07-10T00-38-44-04-00`

## Current interaction path

```txt
button[data-action]
  -> engine.command("interface-composition", "activate", { actionId })
  -> active screen domain command("activate")
  -> action descriptor returned
  -> optional action.command dispatches through ctx.engine.command(...)
  -> nested result is discarded
  -> transition target is applied or accepted true is returned
```

## Source fact

`createKitRuntime.command(...)` already returns domain command results.

The loss happens at the interface composition consumer boundary:

```txt
if (action.command) ctx.engine.command(...)
```

No `lastResult`, command journal, or nested-result row is retained in `interface-composition.snapshot()`.

## Required next interaction contract

```txt
nested command requested
nested command domain/type/payload captured
nested command result captured
transition result captured
lastResult exposed in snapshot
Market result projected by renderer
GameHost exposes same Market result row
fixture proves accepted and rejected rows
```

## Do not change first

```txt
Do not replace the command router.
Do not rewrite all screen domains.
Do not add more Market economy categories before nested result retention exists.
```
