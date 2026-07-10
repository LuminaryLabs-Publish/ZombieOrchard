# ZombieOrchard Project Breakdown

**Timestamp:** `2026-07-09T23-20-43-04-00`

## Selection

Selected repo: `LuminaryLabs-Publish/ZombieOrchard`.

The public `LuminaryLabs-Publish` organization page showed 9 repositories. `LuminaryLabs-Publish/TheCavalryOfRome` was excluded by standing rule. No checked public non-Cavalry repo was new, absent from the central ledger, missing sampled root `.agent` state, recently added but undocumented, or otherwise undocumented.

`ZombieOrchard` was selected by the documented fallback rule because its central ledger remained the oldest eligible checked non-Cavalry entry at `2026-07-09T18-49-13-04-00`.

## Public repo comparison

```txt
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest 2026-07-09T19-09-44-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest 2026-07-09T19-00-15-04-00
LuminaryLabs-Publish/ZombieOrchard        selected / oldest eligible fallback / central latest 2026-07-09T18-49-13-04-00
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / central latest 2026-07-09T23-02-05-04-00
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest 2026-07-09T22-50-53-04-00
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-09T19-29-23-04-00
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest 2026-07-09T22-40-25-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-09T19-21-19-04-00
```

## Product surface

`ZombieOrchard` is a standalone static browser orchard survival/economy shell.

```txt
index.html
  -> src/boot.js
  -> src/start.js
  -> createOrchardGame()
  -> createWorldCanvas(canvas)
  -> createHtmlInterfaceRenderer({ root, engine })
  -> requestAnimationFrame(draw)
```

## Current interaction loop

```txt
index.html
  -> src/boot.js
  -> src/start.js
  -> createOrchardGame()
  -> createKitRuntime({ kits })
  -> install resource-ledger, pressure-field, orchard-world, construction-runtime, roster-runtime, inventory-runtime
  -> generate scoped interface domains from orchardPreset.interface
  -> install active-session-domain-kit
  -> install interface-composition-kit
  -> createWorldCanvas(canvas)
  -> createHtmlInterfaceRenderer({ root, engine })
  -> requestAnimationFrame(draw)
  -> engine.tick(1 / 60)
  -> pressure-field and active-session tick
  -> engine.snapshot()
  -> world-canvas renders orchard state
  -> html-interface-renderer renders active-session HUD or generic screen panel
  -> [data-action] click routes through interface-composition.activate
  -> active screen domain returns action descriptor
  -> optional action.command dispatches through ctx.engine.command(...)
  -> nested command result is currently discarded
  -> optional action.to or transition table moves active screen
  -> [data-command] click routes directly to active-session
  -> Exchange/Market remains a generic Back-only screen
  -> window.GameHost exposes engine, getState, and tick
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
market-action-catalog-next
market-command-source-manifest-next
market-command-envelope-next
market-source-snapshot-next
market-preflight-next
market-command-result-next
market-command-journal-next
market-result-journal-next
resource-transaction-history-next
inventory-purchase-intake-next
interface-nested-result-adapter-next
market-result-projection-next
market-render-readback-next
market-gamehost-diagnostics-next
market-fixture-replay-next
central-ledger-readback
```

## Services the kits offer

```txt
kit-runtime:
  registers domains, routes commands, returns command results, ticks domains, emits events, aggregates snapshots, and notifies subscribers.

scoped-interface-domain-kit:
  exposes screen descriptors, actions, activation descriptors, and snapshots for entry/session/build/market/roster/inventory/codex/settings/outcome screens.

interface-composition-kit:
  routes transitions/back, activates active screens, dispatches nested commands, auto-routes outcome, and exposes activeSnapshot.
  gap: nested action.command result is discarded.

resource-ledger-kit:
  stores resources, affordability helpers, add/pay commands, and snapshots.

pressure-field-kit:
  tracks row pressure and curse drift.

orchard-world-kit:
  generates orchard state and apple placement.

construction-runtime-kit:
  builds catalog items through resource payment.

roster-runtime-kit and inventory-runtime-kit:
  expose actors, items, and equipped state.

active-session-domain-kit:
  handles movement, collection, clearing, phase advance, pests, session end, and HUD actions.

world-canvas-render-kit:
  renders orchard state from snapshots.

html-interface-render-kit:
  renders active-session HUD and generic screen panels, and routes data-action/data-command clicks.
```

## Kits

Implemented kits:

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

Next-cut kits:

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

The runtime should not be replaced. `engine.command()` already returns command results.

The durable blocker is the Exchange/Market consumer boundary: Market actions are not source-owned, `interface-composition` discards nested command results, Exchange is Back-only, the HTML renderer lacks an Exchange projection/readback branch, and GameHost exposes no Market diagnostics beyond raw engine state.

## Next safe ledge

```txt
ZombieOrchard Market Result Readback Catch-up + Exchange Fixture Gate
```

Do not expand economy categories, renderer fidelity, save/load, workers, or shared-kit promotion until accepted/rejected Market rows are fixture-proven and centrally logged.

## Validation status

```txt
runtime source changed: no
branch created: no
pull request created: no
npm test: not run
npm run build: not run
browser smoke: not run
DOM-free market fixture: not run because fixture files do not exist yet
pushed to main: yes, documentation only
```
