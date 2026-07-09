# Project Breakdown — ZombieOrchard Market Readback Central Refresh

**Timestamp:** `2026-07-09T10-40-00-04-00`

## Goal

Refresh the repo-local `.agent` docs for `LuminaryLabs-Publish/ZombieOrchard`, compare the current Publish repo list against central tracking, identify the current interaction loop, domains, kit services, and kits, and sync central tracking in `LuminaryLabs-Dev/LuminaryLabs`.

## Selection checklist

- [x] Compared accessible `LuminaryLabs-Publish` repos.
- [x] Excluded `TheCavalryOfRome`.
- [x] Compared against central repo ledger.
- [x] Sampled root `.agent/START_HERE.md` state.
- [x] Selected one repo only: `ZombieOrchard`.
- [x] Read repo-local `.agent` docs.
- [x] Read source seams: `src/start.js`, `src/game.js`, `src/kits/runtime.js`, `src/kits/composition.js`, and `src/renderer/html-interface-renderer.js`.
- [x] Identified interaction loop.
- [x] Identified domains in use.
- [x] Identified services that kits offer.
- [x] Identified implemented and next-cut kits.
- [x] Updated required root `.agent` docs.
- [x] Added timestamped architecture, render, gameplay, market-authority, deploy, tracker, and turn-ledger entries.
- [x] Updated kit registry.
- [x] Updated central repo ledger.
- [x] Added central internal change-log entry.
- [x] Pushed directly to `main`.

## Publish repositories observed

```txt
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest observed 2026-07-09T09-59-27-04-00
LuminaryLabs-Publish/AetherVale           tracked / root .agent present / central latest observed 2026-07-09T08-50-00-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest observed 2026-07-09T09-36-24-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / central latest observed 2026-07-09T10-20-44-04-00
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest observed 2026-07-09T09-10-50-04-00
LuminaryLabs-Publish/ZombieOrchard        selected / oldest eligible central latest 2026-07-09T07-41-29-04-00
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest observed 2026-07-09T09-50-00-04-00
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest observed 2026-07-09T08-29-38-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest observed 2026-07-09T08-02-33-04-00
```

## Selected repo

```txt
LuminaryLabs-Publish/ZombieOrchard
```

No checked non-Cavalry repo was fully new, missing from the central ledger, recently added but undocumented, missing sampled root `.agent` state, or otherwise undocumented.

`ZombieOrchard` was selected as the oldest eligible central-ledger fallback.

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
  -> pressure-field and active-session tick
  -> engine.snapshot()
  -> world-canvas renders orchard state
  -> html-interface-renderer renders active-session HUD or generic screen panel
  -> data-action routes through interface-composition.activate
  -> data-command routes directly to active-session
  -> scoped interface domain activate returns action descriptors
  -> nested action.command can dispatch through ctx.engine.command(...)
  -> nested command result is currently discarded
  -> exchange screen has no Market-specific projection/readback branch
  -> window.GameHost exposes engine/getState/tick
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
market-action-catalog-next
market-command-source-manifest-next
market-command-envelope-next
market-source-snapshot-next
market-preflight-next
market-command-result-next
market-render-readback-next
market-gamehost-diagnostics-next
market-fixture-replay-next
central-ledger-readback-next
```

## Services that kits offer

```txt
kit-runtime:
  addKit / command / tick / snapshot / subscribe

scoped-interface-domain-kit:
  screen descriptor snapshot / activate action / action descriptor return

interface-composition-kit:
  active screen tracking / transition / back / nested command dispatch / activeSnapshot projection

resource-ledger-kit:
  resource value storage / add / pay / affordability

pressure-field-kit:
  pressure channel tick/update

orchard-world-kit:
  orchard generation / player movement / apple collection / pest clearing

construction-runtime-kit:
  catalog / built objects / build payment

roster-runtime-kit:
  actor roster / hire payment

inventory-runtime-kit:
  inventory rows / equip state

active-session-domain-kit:
  collect / clear / next phase / session action projection

world-canvas-render-kit:
  snapshot-to-canvas orchard drawing

html-interface-render-kit:
  active-session HUD / generic screen panel
```

## Kits

### Implemented

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

### Next-cut

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

The runtime should not be replaced. The missing boundary is Market result readback: nested command results are discarded, Exchange has no source-owned Market action catalog beyond Back, the HTML renderer has no Exchange projection/readback branch, and GameHost has no Market diagnostics.

## Files changed

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-09T10-40-00-04-00-market-readback-central-refresh-dsk-map.md
.agent/render-audit/2026-07-09T10-40-00-04-00-exchange-result-projection-readback.md
.agent/gameplay-audit/2026-07-09T10-40-00-04-00-market-nested-result-replay-loop.md
.agent/market-authority-audit/2026-07-09T10-40-00-04-00-market-readback-fixture-contract.md
.agent/deploy-audit/2026-07-09T10-40-00-04-00-market-fixture-validation-map.md
.agent/trackers/2026-07-09T10-40-00-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-09T10-40-00-04-00.md
```

## Validation

```txt
runtime source changed: no
branch created: no
pull request created: no
npm test: not run
npm run build: not run
browser smoke: not run
DOM-free market fixture: not run because fixture files do not exist yet
pushed to main: yes
```

## Next safe ledge

```txt
ZombieOrchard Market Readback Central Refresh + Exchange Result Fixture Gate
```
