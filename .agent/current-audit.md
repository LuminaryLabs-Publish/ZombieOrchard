# ZombieOrchard Current Audit

**Timestamp:** `2026-07-09T16-34-14-04-00`

## Summary

`ZombieOrchard` remains a standalone static browser orchard survival/economy shell with a compact kit runtime, scoped interface domains, game-domain kits, a canvas renderer, an HTML renderer, `window.GameHost`, static build scripts, and a minimal smoke harness.

The repo is not missing a route, game factory, static build command, command router, first playable loop, world renderer, UI renderer, or smoke script. The durable blocker is still the Exchange/Market path: source-owned Market actions, command/result ledgers, nested command-result retention, Exchange projection/readback, GameHost diagnostics, and DOM-free fixture proof.

This pass keeps runtime code unchanged and refreshes repo-local docs from `2026-07-09T13-18-48-04-00` to `2026-07-09T16-34-14-04-00`.

## Current interaction loop

```txt
index.html
  -> src/boot.js
  -> src/start.js
  -> createOrchardGame()
  -> createWorldCanvas(canvas)
  -> createHtmlInterfaceRenderer({ root, engine })
  -> draw()
  -> engine.tick(1 / 60)
  -> world.render(snapshot)
  -> ui.render(snapshot)
  -> requestAnimationFrame(draw)
```

Input routing:

```txt
[data-action] click
  -> engine.command("interface-composition", "activate", { actionId })
  -> active screen domain returns action descriptor
  -> optional nested action.command runs through ctx.engine.command(...)
  -> nested result is discarded
  -> optional transition moves active screen

[data-command] click
  -> engine.command("active-session", command)
```

## Domains in use

```txt
static-browser-host
boot-module
runtime-entrypoint
game-factory
kit-runtime
engine-context
domain-registry
command-router
event-emitter
tick-dispatcher
snapshot-aggregator
browser-animation-loop
GameHost
entry
session-select
run-setup
active-session
interrupt
construction
exchange
roster
inventory
knowledge
preferences
outcome
interface-composition
resource-ledger
pressure-field
orchard-world
construction-runtime
roster-runtime
inventory-runtime
world-canvas-renderer
html-interface-renderer
smoke-harness
repo-local-agent-ledger
central-ledger-readback
```

## Kit services in the current runtime

```txt
kit-runtime:
  register domains, route commands, return command results, tick domains, emit events, aggregate snapshots, subscribe listeners.

scoped-interface-domain-kit:
  expose screen descriptors, selectable actions, field mutation, activation descriptors, and interface snapshots.

interface-composition-kit:
  route transitions, route back actions, activate current interface screen, dispatch nested commands, auto-route outcome when active session ends, expose active screen snapshot.

resource-ledger-kit:
  store resource values, canPay, pay, add, add/pay commands, and ledger snapshot.

pressure-field-kit:
  adjust pressure channels, tick row pressure/curse, expose pressure snapshot.

orchard-world-kit:
  generate trees/apples, collect nearby apples, reseed apples, expose bounds and orchard snapshot.

construction-runtime-kit:
  build catalog entries by paying resources, append built items, expose built catalog snapshot.

roster-runtime-kit:
  hire workers by paying money, append actors, expose roster snapshot.

inventory-runtime-kit:
  equip inventory items and expose inventory snapshot.

active-session-domain-kit:
  move, collect, clear, advance phase, spawn/chase pests, end session, expose session and available actions.

world-canvas-render-kit:
  render trees, apples, pests, and player from snapshots.

html-interface-render-kit:
  render active-session HUD or generic screen panel and route click actions/commands.
```

## Main finding

`engine.command()` already returns command results, so the runtime should not be replaced. The missing consumer boundary is inside the Market/Exchange path: `interface-composition` discards nested command results, `exchange` has no source-owned Market action catalog beyond Back, `html-interface-renderer` has no Exchange projection/readback branch, and `GameHost` has no Market diagnostics.

## Recommended next ledge

```txt
ZombieOrchard Market Result Readback Ledger Refresh + Exchange Fixture Gate
```

Start with pure source/result/readback modules and fixture rows. Do not rewrite the engine, canvas renderer, HTML shell, or orchard economy before Market accepted/rejected rows are fixture-proven.
