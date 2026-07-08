# ZombieOrchard DSK / Domain Breakdown

**Timestamp:** `2026-07-08T09-48-58-04-00`

## Route

```txt
index.html
-> src/boot.js
-> src/start.js
-> src/game.js
-> src/kits/runtime.js
-> src/kits/game-domains.js
-> src/kits/composition.js
-> src/renderer/world-canvas.js
-> src/renderer/html-interface-renderer.js
```

## Current interaction loop

```txt
browser shell
-> boot imports start
-> start creates engine, world renderer, and HTML renderer
-> requestAnimationFrame ticks engine at 1 / 60
-> engine.tick updates tickable domains
-> engine.snapshot aggregates domain snapshots
-> world-canvas draws orchard state
-> html-interface-renderer draws active HUD or generic screen
-> click events call engine.command
-> window.GameHost exposes engine/getState/tick
```

## Domains in use

```txt
runtime domains:
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
  smoke-harness

interface domains:
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

game domains:
  resource-ledger
  pressure-field
  orchard-world
  construction-runtime
  roster-runtime
  inventory-runtime
  active-session
  world-canvas

market transaction domains needed next:
  market-action-id-catalog
  market-command-envelope
  market-source-snapshot
  market-price-source
  market-capacity-policy
  market-preflight
  market-command-result
  market-rejection-reason-catalog
  market-result-journal
  resource-transaction-history
  inventory-purchase-intake
  nested-command-result-propagation
  market-result-projection
  market-render-readback
  market-fixture-replay
```

## Services that kits offer

```txt
kit-runtime:
  install kit list
  register domain by id
  route command(domainId, type, payload)
  tick domains
  emit events
  aggregate snapshots
  notify subscribers

scoped-interface-domain-kit:
  expose screen action rows
  handle activate action by id
  return action descriptors
  expose generic screen snapshots

interface-composition-kit:
  track active screen
  transition screens
  route active action activation
  dispatch nested action.command
  expose active screen snapshot

resource-ledger-kit:
  store resource values
  canPay cost maps
  pay cost maps
  add resource maps
  expose resource snapshot

pressure-field-kit:
  store pressure channels
  adjust channel values
  tick row pressure and curse
  expose pressure snapshot

orchard-world-kit:
  create tree grid
  seed apples
  collect nearest apple
  expose tree/apple/bounds snapshot

construction-runtime-kit:
  store build catalog
  pay build costs through resource-ledger
  append built records
  expose construction snapshot

roster-runtime-kit:
  store actors and roles
  pay hire costs through resource-ledger
  append hired actors
  expose roster snapshot

inventory-runtime-kit:
  store items and equipped id
  equip items
  expose inventory snapshot

active-session-domain-kit:
  activate HUD actions
  move player
  collect apples
  clear pests
  advance phase
  tick pest pressure
  end run
  expose session snapshot

world-canvas-render-kit:
  resize canvas
  draw trees, apples, pests, player, and world backdrop from snapshots

html-interface-render-kit:
  render active HUD
  render generic screen panels
  bind data-action and data-command clicks to engine commands

market-next kits:
  normalize exchange actions
  create command envelopes
  snapshot sources
  preflight market rules
  produce accepted/rejected results
  mutate resources/inventory only after accepted result
  append transaction records
  project market rows
  report renderer readback
  replay DOM-free fixture cases
```

## Kit inventory

```txt
implemented kits:
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

target next-cut kits:
  market-action-id-catalog-kit
  market-command-envelope-kit
  market-source-snapshot-kit
  market-price-source-kit
  market-capacity-policy-kit
  market-preflight-kit
  market-command-result-kit
  market-rejection-reason-catalog-kit
  market-result-journal-kit
  resource-transaction-history-kit
  inventory-purchase-intake-kit
  nested-command-result-propagation-kit
  market-result-projection-kit
  market-render-readback-kit
  market-fixture-replay-kit
```

## Source authority finding

`engine.command()` already returns command result records, so the next implementation does not need to rewrite the runtime. The seam is narrower: Market commands need dedicated source files, transaction records, nested result retention, projection snapshots, and fixture replay.

## Guardrail

Keep the HTML renderer as a projection consumer only. Market price, capacity, transaction, and rejection authority must live in source-owned market/domain helpers.
