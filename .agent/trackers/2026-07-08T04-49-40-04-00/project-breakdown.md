# ZombieOrchard Project Breakdown

**Timestamp:** `2026-07-08T04-49-40-04-00`

## Selected repo

```txt
LuminaryLabs-Publish/ZombieOrchard
```

## Selection reason

The full checked `LuminaryLabs-Publish` set already has central ledger coverage and root `.agent` state for all non-excluded repos that were inspected. `TheCavalryOfRome` remains excluded.

`ZombieOrchard` was selected as the fallback follow-up because its next safe ledge is still unresolved and high leverage: Market actions need command/result authority, transaction provenance, projection handoff, and DOM-free fixture replay.

## Repo state read

`ZombieOrchard` is a compact static orchard survival/economy shell.

The current route is:

```txt
index.html
-> src/boot.js
-> src/start.js
-> createOrchardGame()
-> createWorldCanvas(canvas)
-> createHtmlInterfaceRenderer({ root, engine })
-> requestAnimationFrame(draw)
-> engine.tick(1 / 60)
```

The current game already has an active playable loop with entry, play, active-session HUD, apple collection, pest clearing, phase changes, Build, Market, Roster, Inventory, Codex, Settings, and Outcome screens.

## Interaction loop

```txt
entry screen
-> Play
-> active-session
-> collect apples / clear pests / next phase
-> open Market
-> exchange screen
-> future Market action command
-> preflight source snapshot
-> accepted/rejected MarketCommandResult
-> resource/inventory transaction mutation only on accepted result
-> transaction journal append
-> exchange projection update
-> HTML renderer consumes projection snapshot
-> fixture validates command/result parity without DOM
```

## Domains in use

```txt
runtime:
  static-browser-host
  boot-module
  runtime-entrypoint
  game-factory
  kit-runtime
  command-router
  event-emitter
  tick-dispatcher
  snapshot-aggregator
  subscription-bus
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

market-authority-next:
  market-action-catalog
  market-command-envelope
  market-source-snapshot
  market-price-source
  market-capacity-policy
  market-preflight
  market-command-result
  market-result-journal
  transaction-history
  inventory-purchase-intake
  market-result-projection
  exchange-renderer-handoff
  market-fixture-replay
```

## Services that kits offer

```txt
kit-runtime:
  install kits
  register domains
  route commands
  tick domains
  emit events
  aggregate snapshots
  subscribe listeners

scoped-interface-domain-kit:
  create screen-local state
  expose actions
  select actions
  activate actions
  snapshot fields/meta/actions

interface-composition-kit:
  track active and previous screen
  transition/back
  activate current screen action
  dispatch nested action command
  expose active screen snapshot

resource-ledger-kit:
  hold resource values
  canPay(cost)
  pay(cost)
  add(values)
  snapshot resource state

pressure-field-kit:
  hold rowPressure and curse
  adjust pressure channels
  tick pressure drift
  snapshot pressure state

orchard-world-kit:
  generate tree grid
  seed apples
  collect nearest apple
  snapshot trees/apples/bounds

construction-runtime-kit:
  hold catalog
  pay build cost
  append built records
  snapshot construction state

roster-runtime-kit:
  hire actors
  pay hire cost
  snapshot roster state

inventory-runtime-kit:
  hold items/equipped
  equip item
  snapshot inventory state

active-session-domain-kit:
  move player
  collect apples
  clear pests
  advance phase
  tick night pressure/pests
  route to outcome through ended state

world-canvas-render-kit:
  resize canvas
  draw orchard world from snapshots

html-interface-render-kit:
  render active-session HUD
  render generic screen panels
  route click commands
```

## Current kit inventory

```txt
implemented:
  kit-runtime
  scoped-interface-domain-kit
  interface-composition-kit
  resource-ledger-kit
  pressure-field-kit
  orchard-world-kit
  construction-runtime-kit
  roster-runtime-kit
  inventory-runtime-kit
  active-session-domain-kit
  world-canvas-render-kit
  html-interface-render-kit
  smoke-fixture-kit

target-next:
  market-action-id-catalog-kit
  market-action-normalizer-kit
  market-command-envelope-kit
  market-source-snapshot-kit
  market-price-source-kit
  market-capacity-policy-kit
  market-preflight-kit
  market-command-result-kit
  market-rejection-reason-catalog-kit
  market-command-dispatch-kit
  resource-transaction-history-kit
  inventory-purchase-intake-kit
  market-command-result-journal-kit
  market-result-projection-kit
  market-fixture-replay-kit
```

## Files read

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/architecture-audit/domain-service-breakdown.md
src/kits/scoped-interface-domains.js
src/kits/composition.js
src/kits/game-domains.js
src/presets/orchard-preset.js
tests/smoke.mjs
```

## Files added or updated

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/next-steps.md
.agent/market-authority-audit/transaction-result-projection-gate.md
.agent/trackers/2026-07-08T04-49-40-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T04-49-40-04-00.md
```

## Validation result

Documentation-only pass.

No runtime source changed.

No local command execution was performed.

## Next safe ledge

```txt
Market Result Contract + Transaction Projection Fixture Gate
```

The next implementation pass should add result-returning market command authority and fixture-readable transaction projection without changing the current public route, canvas renderer, active-session controls, or resource snapshot compatibility.