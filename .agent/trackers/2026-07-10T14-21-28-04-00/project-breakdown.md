# ZombieOrchard project breakdown

Timestamp: 2026-07-10T14-21-28-04-00

## Selection

Selected `LuminaryLabs-Publish/ZombieOrchard` after comparing the current Publish org list against the central `LuminaryLabs-Dev/LuminaryLabs` repo ledger. `TheCavalryOfRome` stayed excluded. No checked non-Cavalry repo was new, ledger-missing, missing root `.agent`, recently added, or otherwise undocumented. `ZombieOrchard` was the oldest eligible fallback after `PhantomCommand` advanced.

## Interaction loop

```txt
index.html
  -> src/boot.js
  -> src/start.js
  -> createOrchardGame()
  -> createWorldCanvas(...)
  -> createHtmlInterfaceRenderer(...)
  -> requestAnimationFrame(draw)
  -> engine.tick(1 / 60)
  -> engine.snapshot()
  -> world canvas renders orchard state
  -> HTML renderer renders active-session HUD or generic interface screen
  -> click data-action routes through interface-composition.activate
  -> optional nested action.command dispatches through engine.command(...)
  -> engine.command returns command result
  -> nested result is currently dropped by interface-composition
  -> Exchange/Market stays generic Back-only
  -> GameHost exposes raw engine/getState/tick only
```

## Domains in use

- static browser host
- boot and runtime entrypoint
- kit runtime
- command router and event emitter
- tick dispatcher and snapshot aggregator
- interface composition
- entry/session/run/active/interrupt/construction/exchange/roster/inventory/knowledge/preferences/outcome domains
- resource ledger
- pressure field
- orchard world
- construction, roster, and inventory runtimes
- world canvas renderer
- HTML interface renderer
- raw GameHost diagnostics
- Market result retention planned domain

## Kits and services

Implemented kits:

- `kit-runtime`: registration, command routing, tick routing, snapshot aggregation, event dispatch.
- `scoped-interface-domain-kit`: generic domain state/action surface.
- `interface-composition-kit`: active screen, transition/back, action activation, nested command dispatch.
- `resource-ledger-kit`: pay/add/canPay resources.
- `pressure-field-kit`: pressure channels.
- `orchard-world-kit`: trees, apples, collection API.
- `construction-runtime-kit`: build commands and built rows.
- `roster-runtime-kit`: hire commands and actor rows.
- `inventory-runtime-kit`: equip commands and item state.
- `active-session-domain-kit`: movement, collect, clear, next-phase, score, pests.
- `world-canvas-render-kit`: orchard world canvas rendering.
- `html-interface-render-kit`: active-session HUD and generic screens.
- `game-host-diagnostics-kit`: raw engine, snapshot, tick hooks.

Next kits needed:

- Market action catalog, source manifest, command envelope, preflight, command result, result retention, command/result journal, exchange result ledger, resource transaction history, inventory purchase intake, render readback, GameHost.market diagnostics, DOM-free fixture replay.

## Main finding

`ZombieOrchard` does not need a runtime rewrite, renderer rewrite, economy expansion, new orchard content, or visual polish next.

The blocker is Market nested result retention and readback: `engine.command()` returns command results, but `interface-composition` drops nested `action.command` results; Exchange is still Back-only; the HTML renderer has no Market projection/readback branch; and `GameHost` exposes only raw engine state.

## Next safe ledge

```txt
ZombieOrchard Market Nested Result Retention Readback Refresh + GameHost Fixture Gate
```
