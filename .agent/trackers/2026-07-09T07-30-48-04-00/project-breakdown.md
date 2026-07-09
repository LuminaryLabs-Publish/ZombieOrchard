# ZombieOrchard Project Breakdown

**Timestamp:** `2026-07-09T07-30-48-04-00`

## Goal

Compare Publish repos against central tracking, select the oldest eligible documented fallback, and refresh `ZombieOrchard` internal docs around the next Market nested-result readback slice.

## Selection checklist

- [x] Listed accessible `LuminaryLabs-Publish` repositories.
- [x] Compared against `LuminaryLabs-Dev/LuminaryLabs` repo-ledger files.
- [x] Sampled root `.agent/START_HERE.md` state for the selected repo.
- [x] Excluded `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Selected one repo only: `LuminaryLabs-Publish/ZombieOrchard`.
- [x] Kept all writes on `main`.
- [x] Created a timestamped tracker folder.
- [x] Created a timestamped turn-ledger entry.
- [x] Created architecture, render, gameplay, market-authority, and deploy audits.
- [x] Updated root `.agent` docs.
- [x] Updated `.agent/kit-registry.json`.
- [x] Updated central repo ledger and internal change log.
- [ ] Runtime source files were not changed.
- [ ] Local validation was not run.

## Publish repo comparison

```txt
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest 2026-07-09T07-05-52-04-00
LuminaryLabs-Publish/AetherVale           tracked / root .agent present / central latest 2026-07-09T06-01-30-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-09T06-20-00-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / central latest 2026-07-09T07-10-00-04-00
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-09T06-10-35-04-00
LuminaryLabs-Publish/ZombieOrchard        selected / oldest eligible central latest 2026-07-09T05-11-22-04-00
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest 2026-07-09T06-28-53-04-00
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest 2026-07-09T05-38-20-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest 2026-07-09T05-20-42-04-00
```

## Interaction loop

```txt
open route
  -> src/boot.js imports src/start.js
  -> src/start.js creates createOrchardGame, createWorldCanvas, createHtmlInterfaceRenderer
  -> src/game.js installs game and interface kits
  -> requestAnimationFrame(draw)
  -> engine.tick(1 / 60)
  -> pressure-field and active-session tick
  -> engine.snapshot()
  -> world-canvas renders trees, apples, pests, player
  -> html-interface-renderer renders active-session HUD or generic screen
  -> data-action clicks route to interface-composition.activate
  -> data-command clicks route to active-session
  -> nested action.command may run through ctx.engine.command
  -> nested result is discarded
  -> GameHost exposes engine/getState/tick
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
subscription-bus
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
html-interface-renderer
resource-ledger
pressure-field
orchard-world
construction-runtime
roster-runtime
inventory-runtime
world-canvas
smoke-harness
```

## Services that kits offer

```txt
kit-runtime:
  install kits, register domains, route commands, tick domains, emit events, aggregate snapshots, notify subscribers

scoped-interface-domain-kit:
  create screen domains, store fields/meta/actions, select action, activate action, emit actionRequested

interface-composition-kit:
  transition/back/activate screens, delegate to active screen, execute nested command, auto-route outcome when session ends

resource-ledger-kit:
  canPay, pay, add, add/pay commands, resource value snapshots

pressure-field-kit:
  adjust channel API, adjust command, rowPressure/curse ticks

orchard-world-kit:
  tree/apple source, apple seeding, collectNear service, world snapshot

construction-runtime-kit:
  build catalog item, consume resources, create built object, report message

roster-runtime-kit:
  hire actor, consume money, report message

inventory-runtime-kit:
  equip item, inventory/equipped snapshot

active-session-domain-kit:
  activate interface action, move, collect, clear, next-phase, tick pests/player condition, outcome state

world-canvas-render-kit:
  consume snapshots and draw orchard rectangles on canvas

html-interface-render-kit:
  consume snapshots and render HUD/generic interface panels

smoke-fixture-kit:
  create engine, activate Play, tick, assert active-session and apples
```

## Kits

```txt
Current implemented kits:
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

Next-cut kits:
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
```

## Main finding

`ZombieOrchard` already has a useful command-returning runtime. The unresolved proof gap is that `interface-composition.activate` discards nested command results, while the Exchange screen has no Market action catalog, source manifest, transaction ledger, renderer projection, render readback, GameHost diagnostics, or DOM-free Market fixture.

## Next safe ledge

```txt
ZombieOrchard Market Nested Result Readback + Exchange Transaction Fixture Gate
```

## Validation

Docs-only pass. No runtime source files changed. No local npm, build, browser, or Market fixture validation was run.
