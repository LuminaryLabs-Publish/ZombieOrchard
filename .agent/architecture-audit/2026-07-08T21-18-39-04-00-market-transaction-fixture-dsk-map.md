# ZombieOrchard Market Transaction Fixture DSK Map

**Timestamp:** `2026-07-08T21-18-39-04-00`

## Goal

Map the current kit-composed orchard runtime and the next Market transaction/result kits without changing runtime source.

## Current runtime composition

```txt
index.html
  -> src/boot.js
  -> src/start.js
  -> createOrchardGame()
  -> createKitRuntime({ kits })
  -> engine.command / engine.tick / engine.snapshot
  -> world-canvas render
  -> html-interface-renderer render
  -> window.GameHost
```

## Domains in use

```txt
runtime:
  static-browser-host
  boot-module
  runtime-entrypoint
  game-factory
  kit-runtime
  engine-context
  command-router
  tick-dispatcher
  snapshot-aggregator
  GameHost

interface:
  entry
  run-setup
  session-select
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
  market-action-id-catalog
  market-command-source-manifest
  market-command-envelope
  market-source-snapshot
  market-preflight
  market-command-result
  market-command-journal
  market-result-journal
  transaction-ledger
  inventory-purchase-intake
  nested-result-propagation
  market-result-projection
  market-render-readback
  market-fixture-replay
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
game-host-diagnostics-kit
smoke-fixture-kit
```

## Services currently offered

```txt
runtime services:
  install kits
  register domains
  route commands
  return command results
  tick domains
  aggregate snapshots
  notify subscribers

interface services:
  active screen state
  previous screen state
  screen action rows
  transition/back routing
  activate current screen action
  dispatch nested action.command
  generic screen snapshot projection

game services:
  resource affordability
  resource pay/add
  pressure adjustment and ticking
  orchard tree/apple snapshot
  nearby apple collection
  construction build command
  roster hire command
  inventory equip command
  active-session move/collect/clear/next-phase/tick

render services:
  canvas orchard draw
  active-session HUD render
  generic screen render
  click-to-action and click-to-command routing
```

## Next-cut kits

```txt
market-action-id-catalog-kit:
  owns sell/buy/back ids and command type constants.

market-command-source-manifest-kit:
  owns market action rows, command rows, reason rows, price rows, and capacity rows.

market-command-envelope-kit:
  normalizes UI action or fixture input into a command envelope.

market-source-snapshot-kit:
  captures resources, inventory, prices, capacity, and command source before/after rows.

market-preflight-kit:
  accepts or rejects commands before mutation.

market-command-result-kit:
  emits accepted/rejected results with reason, mutation summary, and before/after snapshots.

market-command-journal-kit:
  stores command envelopes in order.

market-result-journal-kit:
  stores result records in order.

resource-transaction-history-kit:
  adds provenance to resource mutations while preserving values/canPay/pay/add.

inventory-purchase-intake-kit:
  adds purchase intake while preserving items/equipped/equip.

nested-command-result-propagation-kit:
  returns nested command results from interface-composition and exposes snapshot.lastResult.

market-result-projection-kit:
  converts source/result rows into renderer-only exchange projection rows.

market-render-readback-kit:
  proves the exchange renderer consumed projection rows.

market-fixture-replay-kit:
  runs DOM-free accepted/rejected/no-mutation/nested-result fixture cases.
```

## Implementation boundary

The next implementation should be additive and should begin adjacent to `src/kits/game-domains.js` and `src/kits/composition.js`. It should not rewrite the static route or move renderer ownership before Market result fixtures pass.
