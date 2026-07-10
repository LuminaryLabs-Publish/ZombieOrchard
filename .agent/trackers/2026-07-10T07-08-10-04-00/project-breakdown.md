# ZombieOrchard project breakdown — 2026-07-10T07-08-10-04-00

## Selection

Selected repo: `LuminaryLabs-Publish/ZombieOrchard`.

Reason: the current public `LuminaryLabs-Publish` list is tracked for all checked non-Cavalry repos and sampled root `.agent` state is present. `TheCavalryOfRome` remains excluded. `ZombieOrchard` was the oldest eligible documented fallback in the central ledger at selection time.

## Plan ledger

```txt
[x] Compared the current Publish repo list against central tracking.
[x] Excluded TheCavalryOfRome.
[x] Selected one repo only: ZombieOrchard.
[x] Read root .agent state and central ledger state.
[x] Read package.json, src/boot.js, and src/start.js for the active runtime surface.
[x] Identified interaction loop.
[x] Identified domains in use.
[x] Identified kit services.
[x] Identified implemented and next-cut kits.
[x] Refreshed root .agent docs.
[x] Added tracker, turn-ledger, architecture, render, gameplay, interaction, market-authority, and deploy audits.
[x] Updated central repo ledger.
[x] Added central internal change-log entry.
[ ] Runtime source edit.
[ ] npm test.
[ ] npm run build.
[ ] Browser smoke.
[ ] DOM-free Market fixture run.
```

## Interaction loop

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
  -> nested command result is currently discarded by the interface adapter
  -> Exchange/Market remains a generic Back-only screen
  -> window.GameHost exposes engine/getState/tick and raw snapshot only
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
resource-ledger
pressure-field
orchard-world
construction-runtime
roster-runtime
inventory-runtime
world-canvas-renderer
html-interface-renderer
exchange-market-placeholder
central-ledger-readback
```

## Kit services

```txt
kit-runtime: registers domain kits, commands, ticks, snapshots, and events.
scoped-interface-domain-kit: scopes interface screens and action handlers.
entry/session/run kits: move from entry into active play.
active-session-kit: owns the in-run HUD and session commands.
interrupt/preference/outcome kits: manage non-run screens and preferences.
construction/exchange/roster/inventory/knowledge kits: provide domain screens and action affordances.
interface-composition-kit: activates data-action handlers and nested commands.
resource-ledger-kit: stores apples/resources and transaction-like values.
pressure-field-kit: updates orchard pressure.
orchard-world-kit: owns orchard tiles/entities for the canvas renderer.
world-canvas-render-kit: draws orchard world snapshots.
html-interface-render-kit: projects interface snapshots to HTML.
game-host-diagnostics-kit: exposes the legacy raw GameHost surface.
smoke-fixture-kit: proves entry -> play -> apple presence only.
```

## Kits

### Implemented/runtime kits

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

The blocker is the Market/Exchange result ledger:

```txt
engine.command() already returns command results.
interface-composition can dispatch nested action.command values.
The nested command result is dropped instead of retained or projected.
Exchange is still a Back-only generic screen.
html-interface-renderer has no Market-specific projection/readback branch.
GameHost exposes raw engine state but no Market diagnostics.
tests/smoke.mjs proves entry -> play -> apples exist, not Market transactions.
```

## Next safe ledge

```txt
ZombieOrchard Market Exchange Result Ledger Refresh + GameHost Fixture Gate
```

First useful implementation should source-own Market actions, preserve nested command results, add Exchange projection/readback, expose Market diagnostics through `GameHost`, and prove accepted/rejected rows through a DOM-free fixture before economy expansion or visual polish.

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
```
