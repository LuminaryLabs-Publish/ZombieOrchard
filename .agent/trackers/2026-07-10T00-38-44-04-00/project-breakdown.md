# ZombieOrchard Project Breakdown

**Timestamp:** `2026-07-10T00-38-44-04-00`

**Selected repo:** `LuminaryLabs-Publish/ZombieOrchard`

**Next safe ledge:** `ZombieOrchard Market Nested Result Ledger Catch-up + Exchange Fixture Gate`

## Selection result

The current public `LuminaryLabs-Publish` organization list showed 9 repositories.

`LuminaryLabs-Publish/TheCavalryOfRome` was excluded by standing rule.

No checked public non-Cavalry repo was new, central-ledger absent, missing sampled root `.agent` state, recently added but undocumented, or otherwise undocumented.

`ZombieOrchard` was selected as the oldest eligible documented fallback by central ledger recency.

```txt
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-09T23-58-41-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-09T23-51-04-04-00
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest 2026-07-09T23-41-15-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest 2026-07-09T23-28-35-04-00
LuminaryLabs-Publish/ZombieOrchard        selected / oldest eligible fallback / central latest 2026-07-09T23-20-43-04-00
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest 2026-07-10T00-09-51-04-00
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / central latest 2026-07-10T00-30-20-04-00
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest 2026-07-10T00-18-38-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
```

## Source read

`ZombieOrchard` is a standalone static browser orchard survival/economy shell.

`index.html` mounts `canvas#world`, `#ui-root`, and `#error-panel`, then loads `src/boot.js`.

`src/start.js` creates `createOrchardGame()`, `createWorldCanvas(...)`, `createHtmlInterfaceRenderer(...)`, runs `engine.tick(1 / 60)` inside `requestAnimationFrame`, renders canvas and HTML, and exposes `window.GameHost = { engine, getState, tick }`.

`src/game.js` creates a kit runtime with resource, pressure, world, construction, roster, inventory, interface-domain, active-session, and interface-composition kits.

`src/kits/runtime.js` already returns command results from `engine.command(...)`.

`src/kits/composition.js` dispatches nested `action.command` through `ctx.engine.command(...)` but discards the nested result.

`src/presets/orchard-preset.js` defines `exchange` as a Back-only screen.

`src/renderer/html-interface-renderer.js` renders active-session HUD or a generic screen and has no Exchange/Market projection/readback branch.

`tests/smoke.mjs` proves entry -> play -> active-session and apple existence only.

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
  -> [data-action] routes through interface-composition.activate
  -> active screen domain returns action descriptor
  -> optional nested action.command dispatches through ctx.engine.command(...)
  -> nested command result is currently discarded
  -> action.to or transition table moves active screen
  -> [data-command] routes directly to active-session
  -> Exchange/Market remains generic Back-only screen
  -> window.GameHost exposes raw engine/getState/tick
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
entry-interface-domain
session-select-interface-domain
run-setup-interface-domain
active-session-interface-domain
interrupt-interface-domain
construction-interface-domain
exchange-interface-domain
roster-interface-domain
inventory-interface-domain
knowledge-interface-domain
preferences-interface-domain
outcome-interface-domain
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

## Services that kits offer

```txt
createKitRuntime:
  register domains, route commands, return command results, tick domains, emit events, aggregate snapshots, notify subscribers

scoped interface domains:
  expose screen descriptors, action descriptors, activation results, and snapshots

interface-composition:
  transition/back, activate active screen, dispatch nested commands, auto-route outcome, expose activeSnapshot, but currently discard nested result

resource-ledger:
  store values, canPay, pay, add, command pay/add, snapshot values

pressure-field:
  rowPressure/curse drift and adjustment

orchard-world:
  generate trees/apples, collect nearest apple, reseed apples, expose bounds

construction-runtime:
  build catalog items by paying resources, record built items, expose message

roster-runtime:
  hire actors by paying money, expose actors/message

inventory-runtime:
  equip items and expose equipped/items

active-session:
  movement, collect, clear, next phase, pest pressure, session end, active HUD actions

world-canvas-renderer:
  canvas orchard state renderer

html-interface-renderer:
  active-session HUD, generic screen panels, data-action and data-command routing

planned Market services:
  stable Market action IDs, command source manifest, envelopes, before/after snapshots, preflight, accepted/rejected results, journals, transaction/intake history, nested result retention, Exchange projection/readback, GameHost diagnostics, DOM-free fixture replay
```

## Kits identified

Implemented:

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

Next-cut:

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

`ZombieOrchard` should not get a runtime rewrite, renderer rewrite, save/load pass, worker automation, or broader economy expansion next.

The durable blocker is the Exchange/Market proof path. `engine.command()` already returns results, but Market actions are not source-owned, Exchange is Back-only, nested `action.command` results are discarded, the HTML renderer has no Market projection/readback branch, and `GameHost` exposes no Market diagnostics beyond raw engine state.

## Next implementation boundary

```txt
ZombieOrchard Market Nested Result Ledger Catch-up + Exchange Fixture Gate
```

## Validation

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
