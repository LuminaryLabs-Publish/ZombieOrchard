# ZombieOrchard Project Breakdown

**Timestamp:** `2026-07-10T08-28-26-04-00`

## Selection

Selected repo: `LuminaryLabs-Publish/ZombieOrchard`

Reason: the current public `LuminaryLabs-Publish` page shows 9 repositories. `TheCavalryOfRome` remains excluded. No checked non-Cavalry repo was new, central-ledger missing, missing root `.agent`, recently added, or otherwise undocumented. `ZombieOrchard` was the oldest eligible documented fallback after `PhantomCommand` advanced to `2026-07-10T08-20-42-04-00`.

## Current product read

`ZombieOrchard` is a static browser orchard survival/economy shell assembled from runtime kits.

```txt
index.html
  -> src/boot.js
  -> src/start.js
  -> createOrchardGame()
  -> createWorldCanvas(...)
  -> createHtmlInterfaceRenderer(...)
  -> requestAnimationFrame(draw)
```

The runtime ticks the engine at `1 / 60`, snapshots state, renders the orchard canvas, renders HTML interface screens, and exposes `window.GameHost = { engine, getState, tick }`.

## Current interaction loop

```txt
index.html
  -> src/boot.js imports src/start.js
  -> start.js creates engine, world canvas renderer, and HTML renderer
  -> requestAnimationFrame draw loop calls engine.tick(1 / 60)
  -> engine.tick advances kit domains and returns engine.snapshot()
  -> world canvas renders trees, apples, pests, and player
  -> HTML renderer renders active-session HUD or generic interface screen
  -> click [data-action] dispatches engine.command("interface-composition", "activate", { actionId })
  -> click [data-command] dispatches engine.command("active-session", command)
  -> interface-composition activates current domain action
  -> if action.command exists, it dispatches ctx.engine.command(action.command.domain, action.command.type, action.command.payload)
  -> nested command result is not retained or returned
  -> action.to transitions interface screen when present
  -> Exchange/Market screen remains Back-only from preset
  -> window.GameHost exposes raw engine/getState/tick only
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
gamehost-diagnostics
interface-screen-state
interface-composition
data-action-routing
data-command-routing
entry-domain
session-select-domain
run-setup-domain
active-session-domain
interrupt-domain
construction-domain
exchange-domain
roster-domain
inventory-domain
knowledge-domain
preferences-domain
outcome-domain
resource-ledger
pressure-field
orchard-world
construction-runtime
roster-runtime
inventory-runtime
world-canvas-renderer
html-interface-renderer
exchange-market-placeholder
market-source-ledger-next
market-result-projection-next
market-gamehost-diagnostics-next
central-ledger-readback
```

## Kit services

Current services:

```txt
kit registration
command routing
tick routing
snapshot aggregation
event dispatch
entry/session/run setup
active play transition
interface action activation
nested command dispatch
resource ledger pay/add/canPay
pressure simulation
orchard world apple collection
construction build command
roster hire command
inventory equip command
active-session collect/clear/next-phase/move commands
world canvas rendering
HTML screen rendering
legacy GameHost diagnostics
basic smoke validation
static build copy
```

Needed next services:

```txt
Market source manifest
Market action ID catalog
Market command envelope
Market price and capacity preflight
Market accepted/rejected/no_mutation result rows
resource transaction history
inventory purchase intake rows
nested-result retention adapter
Exchange Market projection rows
HTML Market render readback
GameHost.market diagnostics
DOM-free Market fixture
build fixture gate
central ledger readback
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
static-build-copy-kit
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
market-exchange-result-ledger-kit
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

`ZombieOrchard` does not need a runtime rewrite, renderer rewrite, economy expansion, or visual polish next.

The blocker is Market projection proof. The engine already returns command results, but `interface-composition` drops nested `action.command` results, the Exchange screen is Back-only, the HTML renderer has no Market branch, and GameHost has no `market` diagnostics.

## Next safe ledge

```txt
ZombieOrchard Market Projection Result Ledger Refresh + GameHost Fixture Gate
```

## Validation

```txt
runtime source changed: no
branch created: no
pull request created: no
npm test: not run
npm run build: not run
browser smoke: not run
DOM-free Market fixture: not run because proof files do not exist yet
pushed to main: pending at file creation time
central ledger update: pending at file creation time
```
