# ZombieOrchard Interaction Audit: Nested Result Retention Map

**Timestamp:** `2026-07-09T23-20-43-04-00`

## Browser interaction route

```txt
click [data-action]
  -> html-interface-renderer
  -> engine.command("interface-composition", "activate", { actionId })
  -> active screen domain command("activate", payload)
  -> action descriptor returned
  -> optional action.command dispatches through ctx.engine.command(...)
  -> nested result discarded
  -> optional transition moves screen
```

```txt
click [data-command]
  -> html-interface-renderer
  -> engine.command("active-session", command)
```

## Current issue

`createKitRuntime.command()` already returns a result object.

`interface-composition` loses important nested results here:

```txt
if (action.command) ctx.engine.command(action.command.domain || state.active, action.command.type, action.command.payload || {});
```

The nested result is not retained, exposed in snapshot, projected by the renderer, or exported through GameHost.

## Interaction domains

```txt
html-click-router
interface-composition
scoped-interface-domain
active-session-command-route
nested-action-command-route
market-command-envelope-next
interface-nested-result-adapter-next
market-result-projection-next
market-render-readback-next
market-gamehost-diagnostics-next
```

## Required next interaction facts

```txt
actionId
active screen before
nested command envelope
nested command result
active screen after
transition result
lastResult snapshot
lastResult render projection
GameHost marketDiagnostics.lastResult
```

## Main finding

The next safe cut is not a new interaction model. It is a small adapter that preserves the current click route while retaining nested command results and making them serializable.

## Fixture rows needed

```txt
activate market screen
click sell-apples
retain accepted result
click buy-basic-tool with insufficient money
retain rejected result
verify no mutation for rejected result
verify renderer readback saw latest result
verify GameHost diagnostics saw latest result
```
