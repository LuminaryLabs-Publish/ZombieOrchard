# Project breakdown — ZombieOrchard

Timestamp: `2026-07-10T12-49-54-04-00`

## Selection

`LuminaryLabs-Publish/ZombieOrchard` was selected after checking the current public `LuminaryLabs-Publish` repo list against central ledger recency and sampled repo-local `.agent` state.

No checked public non-Cavalry repo was new, central-ledger absent, missing root `.agent`, recently added, or otherwise undocumented.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by rule.

`ZombieOrchard` was the oldest eligible documented fallback after `PhantomCommand` advanced to `2026-07-10T12-40-45-04-00`.

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
market-result-projection-next
market-command-journal-next
market-exchange-readback-next
market-gamehost-diagnostics-next
market-fixture-next
central-ledger-sync
```

## Kit services

- `kit-runtime`: kit registration, command routing, tick routing, snapshot aggregation, event dispatch.
- `scoped-interface-domain-kit`: generic interface domains with actions, fields, metadata, selection, and activation commands.
- `interface-composition-kit`: active screen state, transition/back handling, activation routing, and nested command dispatch.
- `resource-ledger-kit`: money/apple/wood/scrap add/pay/canPay service.
- `pressure-field-kit`: row pressure and curse channels.
- `orchard-world-kit`: tree/apple field, apple placement, and collect-near service.
- `construction-runtime-kit`: build catalog, cost payment, and built-item state.
- `roster-runtime-kit`: hire command and actor state.
- `inventory-runtime-kit`: item/equip state.
- `active-session-domain-kit`: day/phase/player/pest loop, collect/clear/next-phase commands, score, and session end.
- `world-canvas-render-kit`: orchard-world, pest, apple, and player canvas projection.
- `html-interface-render-kit`: active-session HUD and generic screen projection.
- `game-host-diagnostics-kit`: raw engine, snapshot, and tick readback.

## Current kits

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
market-result-retention-kit
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

`ZombieOrchard` does not need a runtime rewrite, renderer rewrite, economy expansion, new orchard content, or visual polish next.

The blocker is Market result projection and readback:

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
ZombieOrchard Market Result Projection Readback Refresh + GameHost Fixture Gate
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
pushed to main: yes
central ledger updated: pending
```
