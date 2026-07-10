# ZombieOrchard Project Breakdown

**Timestamp:** `2026-07-10T05-28-12-04-00`

## Selection

Selected repo: `LuminaryLabs-Publish/ZombieOrchard`.

The public `LuminaryLabs-Publish` repository page was checked and shows 9 repositories. `TheCavalryOfRome` was excluded. No checked non-Cavalry repo was new, central-ledger absent, missing sampled root `.agent` state, recently added but undocumented, or otherwise undocumented.

`ZombieOrchard` was the oldest eligible documented fallback at central comparison time.

## Public repos observed

```txt
LuminaryLabs-Publish/ZombieOrchard        selected / prior central latest 2026-07-10T04-11-36-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest 2026-07-10T04-22-00-04-00
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest 2026-07-10T04-29-10-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-10T04-40-52-04-00
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-10T04-50-40-04-00
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest 2026-07-10T04-58-56-04-00
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest 2026-07-10T05-11-51-04-00
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / central latest 2026-07-10T05-21-20-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
```

## Current interaction loop

```txt
index.html
  -> src/boot.js
  -> src/start.js
  -> createOrchardGame()
  -> createKitRuntime({ kits })
  -> install resource-ledger, pressure-field, orchard-world, construction-runtime, roster-runtime, inventory-runtime
  -> install scoped interface domains from orchardPreset.interface
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
  -> active screen returns an action descriptor
  -> optional action.command dispatches through ctx.engine.command(...)
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

```txt
createKitRuntime: register domains, route commands, return results, tick domains, emit events, aggregate snapshots, notify subscribers.
scoped-interface-domain-kit: expose screen descriptors, actions, activation descriptors, and snapshots.
interface-composition-kit: route transitions/back, activate active screen, dispatch nested action.command, auto-route outcome, expose activeSnapshot.
resource-ledger-kit: store values, canPay, pay, add, command add/pay, snapshots.
pressure-field-kit: rowPressure/curse drift and adjust command.
orchard-world-kit: tree/apple generation and nearest apple collection.
construction-runtime-kit: build catalog items by paying resources.
roster-runtime-kit: hire actors by paying money.
inventory-runtime-kit: items/equipped state and equip command.
active-session-domain-kit: movement, collect, clear, next phase, pests, score, end state, HUD actions.
world-canvas-render-kit: render orchard trees, apples, pests, and player from snapshot.
html-interface-render-kit: render active-session HUD and generic screens; route data-action/data-command clicks.
smoke-fixture-kit: entry -> play -> tick -> apple presence proof.
```

## Kits

Current implemented kits:

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

`ZombieOrchard` does not need a runtime rewrite next.

The durable blocker is still the Market nested-result ledger. `engine.command()` already returns results, but `interface-composition` dispatches nested `action.command` calls and drops the nested result. Exchange is still Back-only, the HTML renderer has no Market projection/readback branch, and `GameHost` exposes no Market diagnostics beyond the raw engine snapshot.

## Next safe ledge

```txt
ZombieOrchard Market Nested Result Ledger Refresh + Exchange Fixture Gate
```

Do not expand the economy, save/load, visual fidelity, worker automation, or shared-kit promotion until accepted/rejected Market rows are fixture-proven and centrally logged.

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
central ledger updated: yes
```
