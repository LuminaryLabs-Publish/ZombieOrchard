# Architecture audit — Market nested result projection DSK map

## Current DSK flow

```txt
browser host
  -> boot module
  -> start module
  -> createOrchardGame
  -> kit runtime
  -> domain registry
  -> interface composition
  -> nested command dispatch
  -> engine.command result
  -> result dropped before projection/readback
```

## Domain breakdown

| Domain | Current owner | Notes |
| --- | --- | --- |
| Runtime composition | `src/kits/runtime.js` | Registers kits, routes commands/ticks, emits events, aggregates snapshots. |
| Interface state | `src/kits/composition.js` | Owns screen transitions and `data-action` activation. |
| Nested command dispatch | `src/kits/composition.js` | Calls `ctx.engine.command(...)` for nested `action.command`, but does not retain the returned result. |
| HTML projection | `src/renderer/html-interface-renderer.js` | Renders active-session HUD and generic screens; lacks Market projection/readback branch. |
| Diagnostics | `src/start.js` | Exposes raw `engine`, `getState`, and `tick` through `GameHost`. |
| Market proof | next-cut | Needs source manifest, preflight, command result ledger, projection, readback, diagnostics, fixture replay. |

## Services offered by existing kits

- Runtime services: command routing, tick routing, snapshot aggregation, event dispatch.
- Interface services: generic screen transitions, back navigation, button activation, nested command dispatch.
- Renderer services: canvas orchard world rendering, HTML HUD/generic screen rendering.
- Diagnostics services: raw browser `GameHost` access.

## Gap

The architecture has command results at the engine boundary but no result-retention service at the interface boundary. Market cannot become a trusted Exchange surface until nested results survive into projection/readback rows.

## Next architecture cut

Add a Market source/result lane without rewriting runtime:

```txt
Market action source
  -> stable action id
  -> command envelope
  -> price/capacity preflight
  -> engine.command
  -> retained nested CommandResult
  -> resource transaction history
  -> Exchange projection/readback
  -> GameHost.market diagnostics
  -> DOM-free fixture rows
```
