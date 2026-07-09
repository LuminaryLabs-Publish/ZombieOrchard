# ZombieOrchard Project Breakdown

**Timestamp:** `2026-07-09T16-38-14-04-00`

## Selection result

`LuminaryLabs-Publish/ZombieOrchard` was selected for this pass.

The accessible `LuminaryLabs-Publish` repository list was compared against the central ledger in `LuminaryLabs-Dev/LuminaryLabs` and sampled repo-local `.agent/START_HERE.md` state.

No checked non-Cavalry repo was fully new, absent from central tracking, missing sampled root `.agent` state, recently added but undocumented, or otherwise undocumented.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by rule.

`ZombieOrchard` was selected because repo-local `.agent` state had already advanced to `2026-07-09T16-34-14-04-00` while the central ledger still pointed at `2026-07-09T13-18-48-04-00`. This pass normalizes repo-local root docs and central tracking to `2026-07-09T16-38-14-04-00`.

## Publish repositories checked

```txt
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest observed 2026-07-09T16-00-13-04-00
LuminaryLabs-Publish/AetherVale           tracked / root .agent present / central latest observed 2026-07-09T14-16-00-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest observed 2026-07-09T15-09-09-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / central latest observed 2026-07-09T16-20-45-04-00
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest observed 2026-07-09T15-31-40-04-00
LuminaryLabs-Publish/ZombieOrchard        selected / repo-local latest 2026-07-09T16-34-14-04-00 / central ledger still 2026-07-09T13-18-48-04-00 before this run
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest observed 2026-07-09T15-39-08-04-00
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest observed 2026-07-09T14-39-07-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest observed 2026-07-09T13-38-15-04-00
```

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
  -> pressure-field and active-session tick
  -> engine.snapshot()
  -> world-canvas renders orchard trees, apples, pests, and player
  -> html-interface-renderer renders active-session HUD or generic screen panel
  -> [data-action] routes through interface-composition.activate
  -> scoped interface domain returns action descriptor
  -> optional action.command dispatches through ctx.engine.command(...)
  -> nested command result is currently discarded
  -> next action.to or transition table moves active screen
  -> [data-command] routes directly to active-session
  -> Exchange/Market remains a generic screen with Back only
  -> window.GameHost exposes engine, getState, and tick
```

## Target Market readback loop

```txt
exchange action row
  -> MarketActionCatalog
  -> MarketCommandSourceManifest
  -> MarketCommandEnvelope
  -> MarketSourceSnapshot before
  -> MarketPreflight
  -> MarketCommandResult
  -> accepted mutation or rejected no-mutation
  -> resource transaction / inventory intake rows
  -> MarketCommandJournal + MarketResultJournal
  -> MarketSourceSnapshot after
  -> InterfaceNestedResultAdapter
  -> interface-composition.snapshot().lastResult
  -> MarketResultProjection
  -> Exchange renderer branch
  -> MarketRenderReadback
  -> GameHost market diagnostics
  -> DOM-free fixture rows
  -> central ledger parity row
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

### Current services

```txt
- createKitRuntime registers domains, routes commands, returns results, ticks domains, emits events, aggregates snapshots, and notifies subscribers.
- scoped interface domains expose screen descriptors, actions, activation descriptors, and snapshots.
- interface-composition routes transitions/back, activates the active screen, dispatches nested commands, auto-routes outcome, and exposes activeSnapshot.
- resource-ledger stores resources, affordability helpers, add/pay commands, and snapshots.
- pressure-field tracks rowPressure/curse and pressure drift.
- orchard-world generates trees/apples, supports apple collection, and exposes world bounds/state.
- construction-runtime builds catalog items by paying resources.
- roster-runtime tracks/hire actors.
- inventory-runtime tracks equipped item and item list.
- active-session handles movement, collection, clearing, phase advance, pests, session end, and HUD actions.
- world-canvas renders orchard state from snapshots.
- html-interface-renderer renders active-session HUD and generic screen panels, and routes data-action/data-command clicks.
- tests/smoke.mjs covers entry -> play -> active-session plus apple existence.
```

### Missing next services

```txt
- stable Market action IDs and source-owned catalog rows
- Market command source manifest, envelope, before/after source snapshots, price and capacity policies
- Market preflight with stable rejection reasons
- accepted/rejected MarketCommandResult records with rejected no-mutation proof
- resource transaction history and inventory intake rows for accepted Market commands
- Market command/result journals
- interface nested-result retention without breaking activate/back/transition compatibility
- Exchange-specific projection and render readback in html-interface-renderer
- GameHost market diagnostics compatible with current engine/getState/tick
- DOM-free fixture for accepted sell, accepted buy, rejected insufficient resource, and rejected capacity rows
- central ledger parity update after fixture proof
```

## Kits

### Implemented kits

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

### Target next kits

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

## Source evidence read

```txt
src/game.js installs the runtime with resource-ledger, pressure-field, orchard-world, construction-runtime, roster-runtime, inventory-runtime, interface domains, active-session, and interface-composition.
src/kits/runtime.js already returns command results from engine.command(...).
src/kits/composition.js dispatches nested action.command through ctx.engine.command(...) but does not retain that nested result.
src/presets/orchard-preset.js defines active-session -> market -> exchange, and exchange currently exposes Back only.
src/renderer/html-interface-renderer.js reads interface-composition, resource, pressure, construction, roster, inventory, active-session snapshots; it renders active-session specially and all other screens generically.
```

## Main finding

The runtime should not be replaced. The blocker is the Exchange/Market consumer boundary: Market actions are not source-owned, nested command results are discarded, Exchange has no result projection/readback branch, and GameHost exposes no Market diagnostics beyond raw engine state.

## Next safe ledge

```txt
ZombieOrchard Market Readback Ledger Catch-Up + Exchange Fixture Gate
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
