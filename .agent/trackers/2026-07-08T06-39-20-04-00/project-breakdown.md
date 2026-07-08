# ZombieOrchard Project Breakdown

**Timestamp:** `2026-07-08T06-39-20-04-00`

## Goal

Refresh the internal breakdown for one eligible `LuminaryLabs-Publish` repo, compare the current Publish repo list against central tracking, and make the next implementation seam fixture-readable.

## Checklist

- [x] Compared accessible `LuminaryLabs-Publish` repos against central `LuminaryLabs-Dev/LuminaryLabs` tracking.
- [x] Confirmed `TheCavalryOfRome` remains excluded by standing rule.
- [x] Selected one repo only: `LuminaryLabs-Publish/ZombieOrchard`.
- [x] Read source route, runtime, composition, game-domain, preset, and smoke files.
- [x] Identified interaction loop.
- [x] Identified domains in use.
- [x] Identified services offered by kits.
- [x] Identified implemented and target kits.
- [x] Added Market acceptance ledger.
- [x] Updated root `.agent` entrypoint docs.
- [x] Added timestamped turn ledger.
- [x] Prepared central ledger update.

## Publish repo comparison

```txt
LuminaryLabs-Publish/IntoTheMeadow       tracked; root .agent present
LuminaryLabs-Publish/HorrorCorridor      tracked; root .agent present
LuminaryLabs-Publish/AetherVale          tracked; root .agent present
LuminaryLabs-Publish/ZombieOrchard       selected follow-up; Market fixture acceptance ledger added
LuminaryLabs-Publish/TheUnmappedHouse    tracked; root .agent present
LuminaryLabs-Publish/MyCozyIsland        tracked; root .agent present
LuminaryLabs-Publish/TheOpenAbove        tracked; root .agent present
LuminaryLabs-Publish/PhantomCommand      tracked; root .agent present
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/PrehistoricRush     tracked; root .agent present
```

No checked non-excluded repo was fully new, absent from the central ledger, or missing root `.agent/START_HERE.md` state.

`ZombieOrchard` was selected as a fallback follow-up because its next authority seam is narrow, high-value, and still unproven: Market command acceptance, transaction history, nested result propagation, and exchange projection.

## Interaction loop

```txt
index.html
-> canvas#world + section#ui-root
-> src/boot.js
-> src/start.js
-> createOrchardGame()
-> createWorldCanvas(canvas)
-> createHtmlInterfaceRenderer({ root, engine })
-> requestAnimationFrame(draw)
-> engine.tick(1 / 60)
-> tickable domains update pressure-field and active-session
-> engine.snapshot()
-> world-canvas renders orchard state
-> html-interface-renderer renders active HUD or screen panel
-> interface-composition routes screen actions
-> active-session routes direct gameplay commands
-> window.GameHost exposes engine/getState/tick
```

## Domains in use

```txt
runtime:
  static-browser-host
  module-boot
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
  smoke-harness

interface:
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

game:
  resource-ledger
  pressure-field
  orchard-world
  construction-runtime
  roster-runtime
  inventory-runtime
  active-session
  world-canvas

market-next:
  market-action-id-catalog
  market-command-envelope
  market-source-snapshot
  market-price-source
  market-capacity-policy
  market-preflight
  market-command-result
  market-rejection-reason-catalog
  resource-transaction-history
  inventory-purchase-intake
  nested-command-result-propagation
  market-result-projection
  market-fixture-replay
```

## Kit services

```txt
kit-runtime:
  install kits, register domains, route commands, tick domains, emit events, aggregate snapshots, notify subscribers

scoped-interface-domain-kit:
  screen title, description, fields, actions, select, set-field, activate, snapshot

interface-composition-kit:
  active route, previous route, transition, back, activate current action, nested command dispatch, active snapshot

resource-ledger-kit:
  values, canPay, pay, add, snapshot

pressure-field-kit:
  pressure channel adjust, row-pressure tick, curse tick, snapshot

orchard-world-kit:
  tree grid, apple seed, nearest apple collection, reseed, bounds snapshot

construction-runtime-kit:
  catalog, build command, resource payment, built records, message snapshot

roster-runtime-kit:
  hire command, resource payment, actor records, message snapshot

inventory-runtime-kit:
  items, equipped item, equip command, snapshot

active-session-domain-kit:
  player movement, collect, clear, next phase, pest tick, score, session end, action snapshot

world-canvas-render-kit:
  canvas resize and world drawing from snapshot

html-interface-render-kit:
  HUD and screen rendering from snapshot, click action routing

smoke-fixture-kit:
  entry/play/active-session/apple proof through tests/smoke.mjs
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
smoke-fixture-kit
```

## Target next kits

```txt
market-action-id-catalog-kit
market-command-envelope-kit
market-source-snapshot-kit
market-price-source-kit
market-capacity-policy-kit
market-preflight-kit
market-command-result-kit
market-rejection-reason-catalog-kit
resource-transaction-history-kit
inventory-purchase-intake-kit
nested-command-result-propagation-kit
market-result-projection-kit
market-fixture-replay-kit
```

## Source findings

```txt
README.md:
  Confirms kit-composed orchard survival/economy shell and scoped interface domains.

src/start.js:
  Owns browser loop, world render, UI render, and GameHost exposure.

src/game.js:
  Installs the current kit stack.

src/kits/runtime.js:
  Supports command results but no command/result journal.

src/kits/composition.js:
  Dispatches nested commands but drops nested results.

src/kits/game-domains.js:
  resource-ledger lacks transaction history.
  inventory-runtime lacks purchase intake.
  active-session owns current movement/collect/clear/phase loop.

src/presets/orchard-preset.js:
  exchange currently only has Back.

tests/smoke.mjs:
  No Market fixture coverage yet.
```

## Files changed

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/market-authority-audit/acceptance-ledger.md
.agent/trackers/2026-07-08T06-39-20-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T06-39-20-04-00.md
```

## Validation performed

```txt
repo-list comparison: yes
central ledger comparison: yes
source readback: yes
root .agent docs updated: yes
runtime source changed: no
branch created: no
pull request created: no
```

## Validation not performed

```txt
npm test: no
npm run build: no
browser smoke: no
Playwright smoke: no
GitHub Pages deploy check: no
runtime source edit: no
```

## Next safe ledge

```txt
ZombieOrchard Market Acceptance Fixture Implementation
```

Build the fixture gate before adding workers, saves, codex progression, or broader economy systems.
