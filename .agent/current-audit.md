# ZombieOrchard Current Audit

**Timestamp:** `2026-07-08T23-40-55-04-00`

## Summary

`ZombieOrchard` is a standalone static browser orchard survival/economy shell with a kit-composed runtime and a playable browser baseline.

The repo is not missing a static route, kit runtime, command router, renderer, smoke harness, or deploy script. The blocker is narrower: Market/exchange still needs source-owned command/result authority plus consumer readback through `interface-composition`, `html-interface-renderer`, and `GameHost`.

This pass keeps runtime code unchanged and aligns the repo-local docs and central ledger around the next implementation ledge.

## Current interaction loop

```txt
index.html
-> src/boot.js
-> src/start.js
-> createOrchardGame()
-> createWorldCanvas(canvas)
-> createHtmlInterfaceRenderer({ root, engine })
-> requestAnimationFrame(draw)
-> engine.tick(1 / 60)
-> runtime ticks pressure-field and active-session
-> engine.snapshot()
-> world-canvas renders orchard snapshot
-> html-interface-renderer renders active HUD or active screen panel
-> data-action clicks route through interface-composition.activate
-> data-command clicks route directly to active-session
-> nested action.command can call ctx.engine.command(...)
-> nested result is currently not retained or returned
-> window.GameHost exposes engine/getState/tick
```

## Current gameplay loop

```txt
Entry
-> Play
-> Active Session
-> collect apples
-> clear pests
-> advance day/night phase
-> build storage shed
-> open Market/Roster/Inventory/Codex/Settings screens
-> Market reaches exchange shell
-> exchange currently only exposes Back
-> session ends when condition reaches zero
-> outcome screen
```

## Source-backed facts

```txt
package.json:
  dev serves a static folder through python -m http.server 5173.
  test runs node tests/smoke.mjs.
  build copies index.html and src into dist.

src/start.js:
  creates createOrchardGame(), world-canvas, html-interface-renderer, animation loop, and window.GameHost.

src/game.js:
  installs resource-ledger, pressure-field, orchard-world, construction-runtime, roster-runtime, inventory-runtime, generated interface domains, active-session, and interface-composition.

src/kits/runtime.js:
  engine.command(domainId, type, payload) already returns domain command results.
  snapshot aggregation is centralized.
  no command/result journal or replay helper exists.

src/kits/composition.js:
  transition/back/activate are centralized.
  action.command dispatch happens through ctx.engine.command.
  nested command result is currently dropped.
  snapshot exposes active/previous/activeSnapshot only.

src/presets/orchard-preset.js:
  exchange currently reaches Market surface but does not source-own command rows.

src/kits/game-domains.js:
  resource-ledger supports canPay/pay/add but not transaction history.
  inventory-runtime supports equip only and has no purchase intake/capacity policy.
  construction-runtime and roster-runtime can pay costs directly through resource-ledger.

src/renderer/html-interface-renderer.js:
  data-action routes through interface-composition.
  data-command routes directly to active-session.
  active-session HUD is special-cased.
  other screens, including exchange, are generic panels.
```

## Main gap

The engine can return command results, but the result is not yet durable, replayable, or visible to consumers.

Market authority must own source manifests, envelopes, snapshots, preflight, results, transaction rows, journal rows, projections, and readback rows before HTML rendering or GameHost diagnostics consume them.

## Current next safe ledge

```txt
ZombieOrchard Market Consumer Fixture Readback + Central Ledger Sync Gate
```

## Validation status

```txt
runtime source changed: no
branch created: no
pull request created: no
npm test: not run
npm run build: not run
browser smoke: not run
DOM-free market fixture: not run because source files do not exist yet
pushed to main: yes
```
