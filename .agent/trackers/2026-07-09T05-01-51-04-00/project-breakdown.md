# ZombieOrchard Project Breakdown

**Timestamp:** `2026-07-09T05-01-51-04-00`

## Goal

Refresh repo-local operating docs for `LuminaryLabs-Publish/ZombieOrchard`, compare the full accessible `LuminaryLabs-Publish` repository list against the central `LuminaryLabs-Dev/LuminaryLabs` ledger, and preserve a clear next-source handoff for the Market nested-result consumer.

## Selection ledger

```txt
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest 2026-07-09T04-30-54-04-00
LuminaryLabs-Publish/AetherVale           tracked / root .agent present / central latest 2026-07-09T02-50-39-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-09T03-29-29-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / central latest 2026-07-09T04-38-39-04-00
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-09T03-10-05-04-00
LuminaryLabs-Publish/ZombieOrchard        selected / oldest eligible central latest 2026-07-09T02-05-52-04-00
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest 2026-07-09T03-50-12-04-00
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest 2026-07-09T02-31-41-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest 2026-07-09T02-11-07-04-00
```

No non-Cavalry Publish repo was found that was fully new, central-ledger absent, undocumented, recently added but undocumented, or missing sampled root `.agent/START_HERE.md` state.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded.

## Current route read

```txt
index.html
  -> src/boot.js
  -> src/start.js
  -> createOrchardGame()
  -> createWorldCanvas(document.querySelector("#world"))
  -> createHtmlInterfaceRenderer({ root: document.querySelector("#ui-root"), engine })
  -> draw()
  -> engine.tick(1 / 60)
  -> world.render(snapshot)
  -> ui.render(snapshot)
  -> requestAnimationFrame(draw)
```

`window.GameHost` exposes:

```txt
engine
getState: () => engine.snapshot()
tick: (dt) => engine.tick(dt)
```

## Interaction loop

```txt
open route
  -> boot imports start
  -> start creates engine and renderers
  -> game factory installs runtime kits
  -> runtime registers every kit-created domain
  -> animation frame advances tickable domains
  -> snapshot aggregates every domain snapshot
  -> world canvas renders trees, apples, pests, and player
  -> HTML renderer renders active-session HUD or active screen panel
  -> data-action click routes through interface-composition.activate
  -> active scoped interface action may include action.command
  -> interface-composition currently calls ctx.engine.command(action.command...)
  -> nested command return value is not retained
  -> next screen route is applied if action.to or transition table matches
  -> data-command click routes directly to active-session command handlers
  -> GameHost readback returns only current domain snapshots
```

## Domains in use

### Runtime / host domains

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
smoke-harness
```

### Interface domains

```txt
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
html-interface-renderer
```

### Game domains

```txt
resource-ledger
pressure-field
orchard-world
construction-runtime
roster-runtime
inventory-runtime
active-session
world-canvas
```

### Next Market authority domains

```txt
market-action-catalog
market-command-source-manifest
market-command-envelope
market-source-snapshot
market-price-source
market-capacity-policy
market-preflight
market-command-result
market-rejection-reason-catalog
market-command-journal
market-result-journal
resource-transaction-history
inventory-purchase-intake
interface-nested-result-adapter
market-result-projection
market-render-readback
market-gamehost-diagnostics
market-fixture-replay
```

## Services offered by current kits

```txt
create kit runtime
install kits
register domains
route command(domainId, type, payload)
return command result envelopes
advance tickable domains
emit frame-scoped events
aggregate snapshots
subscribe to runtime snapshots
create generated scoped interface screens
select interface actions
set interface fields
activate scoped interface action
transition interface composition
route back from previous screen
call nested domain command from interface action
track resources and affordability
pay / add resources
adjust pressure channels
create trees and apples
collect nearby apples
build construction catalog items
hire roster actors
equip inventory items
move player
collect active-session apples
clear active-session pests
advance day/night phase
render orchard world to canvas
render HUD and generic panels to DOM
expose GameHost engine/getState/tick
run minimal smoke fixture
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

### Next-cut kits

```txt
market-action-catalog-kit
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
```

## Main finding

`ZombieOrchard` should not receive a broad economy/content expansion next.

The exact blocker is result propagation: nested commands can already execute through `interface-composition.activate`, but their return values are discarded, so Market actions cannot yet produce fixture-readable command results, transaction rows, exchange projection state, renderer readback, or GameHost diagnostics.

## Next safe ledge

```txt
ZombieOrchard Market Nested Result Consumer + Exchange Projection Fixture Gate
```

## Source files for the next implementation

```txt
src/market/market-actions.js
src/market/market-source-manifest.js
src/market/market-command-envelope.js
src/market/market-source-snapshot.js
src/market/market-preflight.js
src/market/market-command-result.js
src/market/market-journal.js
src/market/market-projection.js
src/market/market-render-readback.js
src/market/market-gamehost-diagnostics.js
src/kits/game-domains.js
src/kits/composition.js
src/renderer/html-interface-renderer.js
src/start.js
scripts/zombie-orchard-market-result-fixture.mjs
package.json
```

## Validation status

```txt
runtime source changed: no
branch created: no
pull request created: no
local npm test: not run
local npm run build: not run
browser smoke: not run
DOM-free Market fixture: not run / not yet implemented
```
