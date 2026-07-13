# Gameplay audit: roster content to delegated command loop

**Timestamp:** `2026-07-13T18-00-38-04-00`

## Summary

Caller-provided roster names can flow from the public engine into `innerHTML`. Injected markup can create controls consumed by the root delegated listener, turning display data into gameplay commands.

## Plan ledger

**Goal:** ensure gameplay display values remain inert text and cannot create command surfaces.

- [x] Trace roster mutation.
- [x] Trace roster card projection.
- [x] Trace delegated control handling.
- [x] Confirm route admission is not checked for injected `data-command` controls.
- [ ] Add safe rendering and command-origin fixtures.

## Reachable loop

```txt
GameHost.engine.command("roster-runtime", "hire", { name, cost })
  -> roster-runtime stores payload.name
  -> transition interface-composition to roster
  -> cards() injects actor.name through innerHTML
  -> injected descendant may contain data-action or data-command
  -> root click handler discovers the descendant
  -> engine.command() dispatches the injected control
```

## Gameplay consequences

```txt
display data can become an interactive control
controls can be introduced outside the authored action list
data-command dispatch is not scoped to the visible route
runtime accepts the command through the public raw engine
no content-origin or command-origin receipt explains the mutation
```

## Required result

`HtmlContentSafetyResult` must prove that all projected values remained inert and that every delegated control belongs to the accepted authored control manifest.
