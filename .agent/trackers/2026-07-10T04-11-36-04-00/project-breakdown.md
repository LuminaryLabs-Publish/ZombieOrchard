# ZombieOrchard Project Breakdown

**Timestamp:** `2026-07-10T04-11-36-04-00`

## Goal

Refresh repo-local `.agent` documentation for one eligible `LuminaryLabs-Publish` repo, capture the current loop/domains/services/kits, and sync central tracking.

## Selection result

```txt
selected repo: LuminaryLabs-Publish/ZombieOrchard
excluded repo: LuminaryLabs-Publish/TheCavalryOfRome
selection rule: oldest eligible documented fallback
```

The current public Publish repo list was compared against central ledger state.

No checked non-Cavalry repo was new, central-ledger absent, missing sampled root `.agent` state, recently added but undocumented, or otherwise undocumented.

After `PhantomCommand` advanced to `2026-07-10T03-59-57-04-00`, `ZombieOrchard` was the oldest eligible documented fallback.

## Public Publish repos observed

```txt
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest 2026-07-10T03-01-42-04-00
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-10T02-51-39-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-10T02-38-56-04-00
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest 2026-07-10T02-31-58-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest 2026-07-10T02-19-14-04-00
LuminaryLabs-Publish/ZombieOrchard        selected / oldest eligible fallback / prior central latest 2026-07-10T02-10-16-04-00
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest 2026-07-10T03-49-48-04-00
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / central latest 2026-07-10T03-59-57-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
```

## Source readback

Files read this pass:

```txt
package.json
index.html
src/boot.js
src/start.js
src/game.js
src/kits/runtime.js
src/kits/composition.js
src/kits/scoped-interface-domains.js
src/kits/game-domains.js
src/presets/orchard-preset.js
src/renderer/html-interface-renderer.js
src/renderer/world-canvas.js
tests/smoke.mjs
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
```

## Current interaction loop

```txt
index.html
  -> src/boot.js imports src/start.js
  -> src/start.js creates createOrchardGame()
  -> createKitRuntime installs resource-ledger, pressure-field, orchard-world, construction-runtime, roster-runtime, inventory-runtime, scoped interface domains, active-session, and interface-composition
  -> createWorldCanvas(canvas) renders orchard trees, apples, pests, and player from snapshots
  -> createHtmlInterfaceRenderer({ root, engine }) renders active-session HUD or generic screen panel
  -> requestAnimationFrame(draw)
  -> engine.tick(1 / 60) clamps delta, advances frame/elapsed, ticks domains, notifies subscribers, and returns snapshot
  -> pressure-field drifts rowPressure and curse
  -> active-session advances pests and player condition
  -> world-canvas renders snapshot
  -> html-interface-renderer renders active screen
  -> data-action click calls engine.command("interface-composition", "activate", { actionId })
  -> active screen command returns action descriptor
  -> optional nested action.command dispatches through ctx.engine.command(...)
  -> nested command result is currently discarded
  -> action.to or transition table moves active screen
  -> data-command click calls engine.command("active-session", command)
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
entry-screen-domain
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
interface-composition-domain
resource-ledger-domain
pressure-field-domain
orchard-world-domain
construction-runtime-domain
roster-runtime-domain
inventory-runtime-domain
world-canvas-render-domain
html-interface-render-domain
market-action-source-next
market-command-envelope-next
market-source-snapshot-next
market-preflight-next
market-command-result-next
market-result-journal-next
resource-transaction-history-next
inventory-intake-history-next
interface-nested-result-adapter-next
exchange-render-projection-next
market-gamehost-diagnostics-next
market-fixture-replay-next
central-ledger-sync
```

## Services the kits offer

Current services:

```txt
kit-runtime: domain installation, command routing, event emission, ticking, snapshot aggregation, subscriber notification
scoped-interface-domain-kit: screen descriptors, actions, select, field mutation, activation descriptor return, snapshots
interface-composition-kit: transition/back routing, active screen activation, nested command dispatch, outcome auto-route, activeSnapshot
resource-ledger-kit: values, canPay, pay, add, resource snapshot
pressure-field-kit: pressure channel drift and adjustment
orchard-world-kit: tree/apple state, apple seeding, nearest apple collection
construction-runtime-kit: catalog build command, resource payment, built item snapshot
roster-runtime-kit: hire command and roster snapshot
inventory-runtime-kit: equip command and item snapshot
active-session-domain-kit: move, collect, clear, next phase, pest tick, session end, HUD actions
world-canvas-render-kit: canvas orchard projection from snapshots
html-interface-render-kit: active-session HUD, generic screen rendering, data-action/data-command routing
game-host-diagnostics-kit: raw engine/getState/tick exposure
smoke-fixture-kit: entry -> play -> active session -> apple existence
```

Needed next services:

```txt
Market action catalog
Market command source manifest
Market command envelope
Market source snapshots before and after
Market preflight with stable rejection reasons
Market accepted/rejected command result rows
No-mutation proof for rejected rows
Resource transaction history
Inventory purchase intake rows
Market command/result journals
Nested command result retention in interface-composition
Exchange-specific HTML projection
Market render readback
GameHost Market diagnostics
DOM-free Market fixture replay
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

`ZombieOrchard` does not need a runtime replacement.

The durable blocker is the Market nested-result ledger:

```txt
engine.command() already returns results
interface-composition dispatches nested action.command but drops the result
exchange is Back-only in orchardPreset
html-interface-renderer has no exchange-specific Market projection/readback branch
window.GameHost only exposes raw engine snapshot/tick
tests/smoke.mjs proves entry/play/apple only, not accepted/rejected Market rows
```

## Next safe ledge

```txt
ZombieOrchard Market Nested Result Ledger Refresh + Exchange Fixture Gate
```

## Validation

```txt
runtime source changed: no
branch created: no
pull request created: no
npm test: not run
npm run build: not run
browser smoke: not run
DOM-free market fixture: not run because proof files do not exist yet
pushed to main: yes, documentation only
```
