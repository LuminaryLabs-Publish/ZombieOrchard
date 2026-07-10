# ZombieOrchard Project Breakdown

**Timestamp:** `2026-07-10T02-10-16-04-00`

## Selection

Selected repo: `LuminaryLabs-Publish/ZombieOrchard`.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

The current public `LuminaryLabs-Publish` organization page shows 9 repositories. The current public list was compared against central `LuminaryLabs-Dev/LuminaryLabs` repo-ledger state and sampled repo-local root `.agent` state. No checked non-Cavalry repo was new, absent from central tracking, missing root `.agent`, recently added but undocumented, or otherwise undocumented. `ZombieOrchard` was selected as the oldest eligible documented fallback after the latest central refreshes.

## Current public repo comparison

```txt
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-10T01-31-29-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-10T01-20-47-04-00
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest 2026-07-10T01-11-51-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest 2026-07-10T00-51-03-04-00
LuminaryLabs-Publish/ZombieOrchard        selected / oldest eligible fallback / central latest 2026-07-10T00-38-44-04-00
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest 2026-07-10T01-38-16-04-00
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / central latest 2026-07-10T02-02-24-04-00
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest 2026-07-10T01-49-13-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
```

## Product surface

`ZombieOrchard` is a standalone static browser orchard survival/economy shell.

```txt
index.html
  -> src/boot.js
  -> src/start.js
  -> createOrchardGame()
  -> createKitRuntime({ kits })
  -> canvas renderer + HTML renderer
```

`package.json` exposes:

```txt
npm run dev   -> python -m http.server 5173
npm test      -> node tests/smoke.mjs
npm run build -> copy index.html and src/ into dist
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
  -> engine.snapshot()
  -> world-canvas renders orchard state
  -> html-interface-renderer renders active-session HUD or generic screen panel
  -> data-action routes through interface-composition.activate
  -> scoped interface domain returns action descriptor
  -> optional nested action.command dispatches through ctx.engine.command(...)
  -> nested command result is currently discarded
  -> action.to or transition table moves active screen
  -> data-command routes directly to active-session
  -> Exchange/Market remains generic Back-only screen
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

## Kit services

Current services:

```txt
install kits
register domains
route commands
return command results
tick domains
emit events
aggregate snapshots
render orchard canvas from snapshots
render active-session HUD and generic screens from snapshots
transition interface screens
dispatch nested screen actions
store/add/pay resources
track pressure channels
generate and collect orchard apples
build catalog items with resource payment
track roster and inventory
move/collect/clear/advance active session
expose engine/getState/tick through GameHost
run minimal DOM-free entry/play/apple smoke
```

Needed next services:

```txt
stable Market action IDs
MarketActionCatalog
MarketCommandSourceManifest
MarketCommandEnvelope
MarketSourceSnapshot before/after
MarketPreflight
MarketCommandResult accepted/rejected rows
Market rejection reason catalog
MarketCommandJournal
MarketResultJournal
resource transaction history
inventory purchase intake rows
interface nested-result adapter
Exchange result projection
Market render readback
GameHost market diagnostics
DOM-free Market fixture replay
central ledger readback parity
```

## Kits

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

`ZombieOrchard` does not need a runtime rewrite, renderer rewrite, save/load pass, worker automation, or broader economy expansion next.

The blocker is still the Exchange/Market proof path:

```txt
engine.command() already returns results
interface-composition discards nested action.command results
Exchange is still Back-only
HTML renderer has no Market projection/readback branch
GameHost has no Market diagnostics beyond raw engine state
smoke only proves entry -> play -> apple presence
```

## Next safe ledge

```txt
ZombieOrchard Market Nested Result Readback Catch-up + Exchange Fixture Gate
```

## Suggested first implementation files

```txt
src/kits/market-action-catalog.js
src/kits/market-command-source-manifest.js
src/kits/market-command-envelope.js
src/kits/market-source-snapshot.js
src/kits/market-command-result.js
src/kits/market-result-journal.js
src/kits/market-render-readback.js
src/kits/market-gamehost-diagnostics.js
src/kits/composition.js
src/renderer/html-interface-renderer.js
tests/market-result-fixture.mjs
package.json
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
pushed to main: yes
central ledger updated: planned in same pass
```
