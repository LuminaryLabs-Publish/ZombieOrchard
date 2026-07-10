# ZombieOrchard project breakdown — 2026-07-10T10-00-37-04-00

## Selected repo

`LuminaryLabs-Publish/ZombieOrchard`

Reason: no checked non-Cavalry repo was new, ledger-missing, missing root `.agent`, recently added, or undocumented. `ZombieOrchard` was the oldest eligible fallback after `PhantomCommand` advanced.

## Scope

Docs-only internal breakdown for the current Nexus Engine / Realtime ChatGPT Project pass.

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
  -> engine.snapshot()
  -> world canvas renders orchard state
  -> HTML renderer renders active-session HUD or generic interface screen
  -> data-action routes through interface-composition.activate
  -> optional nested action.command dispatches through engine.command(...)
  -> engine.command returns command result
  -> nested result is dropped by interface-composition
  -> Exchange/Market remains generic Back-only screen
  -> GameHost exposes raw engine/getState/tick only
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
market-action-catalog-next
market-command-envelope-next
market-preflight-next
market-result-ledger-next
market-projection-next
market-gamehost-diagnostics-next
central-ledger-readback
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

## Kit service map

- `kit-runtime`: kit registration, command routing, tick routing, snapshot aggregation, event dispatch.
- `interface-composition-kit`: screen state, transition/back/activate, nested command dispatch.
- `html-interface-render-kit`: active-session HUD and generic screen rendering.
- `world-canvas-render-kit`: orchard world canvas rendering.
- `game-host-diagnostics-kit`: raw `engine/getState/tick` browser diagnostics.
- Market next kits: stable Market action IDs/source manifest, price/capacity/preflight rows, accepted/rejected/no_mutation result rows, nested result retention, resource transaction history, inventory purchase intake, Exchange projection/readback, `GameHost.market` diagnostics, DOM-free fixture replay.

## Main finding

`ZombieOrchard` does not need a runtime rewrite, renderer rewrite, economy expansion, or visual polish next.

The blocker is Market nested-result projection:

```txt
engine.command() already returns command results
interface-composition dispatches nested action.command but drops the result
Exchange is still Back-only
HTML renderer has no Market projection/readback branch
GameHost exposes raw engine/getState/tick only
smoke only proves entry -> play -> apple presence
```

## Next safe ledge

```txt
ZombieOrchard Market Nested Result Projection Refresh + GameHost Fixture Gate
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
pushed to main: pending this pass
central ledger updated: pending this pass
```
