# ZombieOrchard Project Breakdown

## Timestamp

```txt
2026-07-10T11-20-54-04-00
```

## Selection

Selected `LuminaryLabs-Publish/ZombieOrchard`.

No checked public non-Cavalry repo was new, missing from the central ledger, missing sampled root `.agent` state, recently added, or otherwise undocumented. `TheCavalryOfRome` remains excluded by rule. `ZombieOrchard` was the oldest eligible documented fallback after `PhantomCommand` advanced to `2026-07-10T11-10-08-04-00`.

## Interaction loop

```txt
index.html
  -> src/boot.js
  -> src/start.js
  -> createOrchardGame()
  -> createKitRuntime installs game, interface, and composition kits
  -> createWorldCanvas renders orchard-world and active-session state
  -> createHtmlInterfaceRenderer renders HUD or current interface screen
  -> click data-action calls engine.command("interface-composition", "activate", { actionId })
  -> active interface domain returns { accepted, action }
  -> composition.js optionally dispatches action.command through engine.command(...)
  -> nested command result is not retained in the composition result
  -> action.to or transition table moves active screen
  -> active-session direct data-command calls still dispatch to active-session
  -> GameHost exposes engine, getState(), and tick() only
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
market-result-retention-next
market-command-journal-next
market-exchange-projection-next
market-gamehost-diagnostics-next
market-fixture-next
central-ledger-sync
```

## Kits and services

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
static-build-copy-kit
```

Services offered:

```txt
kit registration
command routing
tick routing
snapshot aggregation
event dispatch
interface screen state
action activation
nested command dispatch
resource ledger pay/add
pressure channel adjustment
orchard apple collection
construction build
roster hire
inventory equip
active-session collect/clear/next-phase
world canvas render
HTML interface render
raw GameHost diagnostics
static smoke/build
```

Next-cut kits:

```txt
market-action-catalog-kit
market-command-envelope-kit
market-preflight-kit
market-command-result-kit
market-result-retention-kit
market-command-journal-kit
market-result-journal-kit
resource-transaction-history-kit
inventory-purchase-intake-kit
exchange-market-projection-kit
market-render-readback-kit
market-gamehost-diagnostics-kit
market-fixture-replay-kit
central-ledger-readback-kit
```

## Main finding

`ZombieOrchard` does not need a runtime rewrite, renderer rewrite, economy expansion, or visual polish next.

The blocker is Market result retention and readback. `src/kits/composition.js` dispatches nested `action.command`, but drops the returned command result. `src/renderer/html-interface-renderer.js` has no Market readback branch, and `window.GameHost` still exposes raw `engine/getState/tick` only.

## Next safe ledge

```txt
ZombieOrchard Market Result Retention Readback Ledger Refresh + GameHost Fixture Gate
```

## Validation

Docs-only pass.

```txt
runtime source changed: no
branch created: no
pull request created: no
npm test: not run
npm run build: not run
browser smoke: not run
DOM-free Market fixture: not run because proof files do not exist yet
```
