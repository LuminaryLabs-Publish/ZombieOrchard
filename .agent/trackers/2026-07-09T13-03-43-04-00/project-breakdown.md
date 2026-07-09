# ZombieOrchard Project Breakdown

**Timestamp:** `2026-07-09T13-03-43-04-00`

## Goal

Refresh repo-local and central internal docs for one eligible `LuminaryLabs-Publish` repo, identify its interaction loop, domains, services, and kits, and record the next safe implementation ledge.

## Checklist

- [x] Compared accessible `LuminaryLabs-Publish` repos.
- [x] Excluded `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Compared current repo list against central ledger state in `LuminaryLabs-Dev/LuminaryLabs`.
- [x] Selected one repo only: `LuminaryLabs-Publish/ZombieOrchard`.
- [x] Read repo-local `.agent/START_HERE.md` state.
- [x] Read current source seams.
- [x] Identified interaction loop.
- [x] Identified domains in use.
- [x] Identified services that kits offer.
- [x] Identified implemented and next-cut kits.
- [x] Updated root `.agent` docs.
- [x] Added timestamped architecture, render, gameplay, market-authority, deploy, tracker, and turn-ledger entries.
- [x] Updated kit registry.
- [x] Updated central repo ledger.
- [x] Added central internal change-log entry.
- [x] Pushed directly to `main`.

## Repo selection

```txt
LuminaryLabs-Publish/ZombieOrchard
```

No checked non-Cavalry repo was fully new, missing from central tracking, missing sampled root `.agent` state, recently added but undocumented, or otherwise undocumented.

`ZombieOrchard` was selected as the oldest eligible central-ledger fallback. Its central ledger still pointed at `2026-07-09T10-40-00-04-00` before this pass.

## Publish organization repos observed

```txt
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest 2026-07-09T12-08-46-04-00
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest 2026-07-09T12-30-09-04-00
LuminaryLabs-Publish/AetherVale           tracked / root .agent present / central latest 2026-07-09T11-30-50-04-00
LuminaryLabs-Publish/ZombieOrchard        selected / oldest eligible central latest 2026-07-09T10-40-00-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest 2026-07-09T11-00-39-04-00
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest 2026-07-09T11-39-50-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-09T11-50-08-04-00
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / central latest 2026-07-09T12-38-16-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-09T12-00-36-04-00
```

## Source evidence read

```txt
package.json
src/start.js
src/game.js
src/kits/runtime.js
src/kits/composition.js
src/kits/scoped-interface-domains.js
src/kits/game-domains.js
src/renderer/html-interface-renderer.js
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
```

## Current interaction loop

```txt
index.html
  -> src/boot.js
  -> src/start.js
  -> createOrchardGame()
  -> createWorldCanvas(...)
  -> createHtmlInterfaceRenderer(...)
  -> requestAnimationFrame(draw)
  -> engine.tick(1 / 60)
  -> pressure-field and active-session tick
  -> engine.snapshot()
  -> world-canvas renders orchard state
  -> html-interface-renderer renders active-session HUD or generic screen panel
  -> data-action routes through interface-composition.activate
  -> data-command routes directly to active-session
  -> scoped interface domain activate returns action descriptors
  -> nested action.command can dispatch through ctx.engine.command(...)
  -> nested command result is currently discarded
  -> exchange screen has no Market-specific projection/readback branch
  -> window.GameHost exposes engine/getState/tick
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
subscription-bus
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

## Services that kits offer

```txt
kit-runtime:
  addKit, command, tick, snapshot, subscribe, ctx.emit.

scoped-interface-domain-kit:
  screen state, action descriptors, activation, select, set-field, snapshot.

interface-composition-kit:
  transition, back, activate, nested dispatch, outcome route, active screen snapshot.

resource-ledger-kit:
  canPay, pay, add, add/pay commands, resource snapshot.

pressure-field-kit:
  adjust, tick pressure channels, snapshot.

orchard-world-kit:
  generate tree/apple state, collectNear, reseed apples, snapshot.

construction-runtime-kit:
  build item with cost, append built object, snapshot.

roster-runtime-kit:
  hire actor with money cost, append actor, snapshot.

inventory-runtime-kit:
  equip item, snapshot.

active-session-domain-kit:
  move, collect, clear, next-phase, pest tick, session end, snapshot.

world-canvas-render-kit:
  render orchard objects from snapshot.

html-interface-render-kit:
  route button clicks, render active-session HUD, render generic screen panel.
```

## Implemented kits

```txt
kit-runtime
scoped-interface-domain-kit
entry-domain-kit
session-select-domain-kit
run-setup-domain-kit
active-session-domain-kit
interrupt-domain-kit
construction-domain-kit
exchange-domain-kit
roster-domain-kit
inventory-domain-kit
knowledge-domain-kit
preferences-domain-kit
outcome-domain-kit
interface-composition-kit
resource-ledger-kit
pressure-field-kit
orchard-world-kit
construction-runtime-kit
roster-runtime-kit
inventory-runtime-kit
world-canvas-render-kit
html-interface-render-kit
game-host-diagnostics-kit
smoke-fixture-kit
```

## Next-cut kits

```txt
market-action-catalog-kit
market-action-id-catalog-kit
market-command-source-manifest-kit
market-command-envelope-kit
market-source-snapshot-kit
market-price-source-kit
market-capacity-policy-kit
market-preflight-kit
market-command-result-kit
market-rejection-reason-catalog-kit
market-command-journal-kit
market-result-journal-kit
resource-transaction-history-kit
inventory-purchase-intake-kit
interface-nested-result-adapter-kit
market-result-projection-kit
market-render-readback-kit
market-gamehost-diagnostics-kit
market-fixture-replay-kit
central-ledger-readback-kit
```

## Main finding

The runtime should not be replaced. `engine.command()` already returns results, but Market result readback is not consumed: nested results are discarded, Exchange has no source-owned Market catalog, the HTML renderer lacks an Exchange projection/readback branch, and GameHost lacks Market diagnostics.

## Next safe ledge

```txt
ZombieOrchard Market Result Consumer Ledger Refresh + Exchange Fixture Gate
```

Start with source/result/readback records and DOM-free fixture rows. Do not change the orchard renderer or widen the economy before accepted/rejected Market rows are proven.
