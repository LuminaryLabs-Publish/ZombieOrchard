# Architecture Audit: Market Central Catch-up DSK Map

**Timestamp:** `2026-07-09T05-11-22-04-00`

## Current architecture

`ZombieOrchard` has a compact kit-composed browser runtime.

```txt
src/start.js
  -> createOrchardGame()
  -> createWorldCanvas(...)
  -> createHtmlInterfaceRenderer(...)
  -> frame loop
```

`createOrchardGame()` installs game-domain kits, generated interface-domain kits, active-session, and interface-composition through `createKitRuntime()`.

## Current domains

```txt
runtime:
  static-browser-host
  boot-module
  runtime-entrypoint
  game-factory
  kit-runtime
  engine-context
  domain-registry
  command-router
  tick-dispatcher
  snapshot-aggregator
  subscription-bus
  GameHost

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
  world-canvas

next market authority:
  market-action-catalog
  market-command-source-manifest
  market-command-envelope
  market-source-snapshot
  market-preflight
  market-command-result
  market-command-journal
  market-result-journal
  resource-transaction-history
  inventory-purchase-intake
  interface-nested-result-adapter
  market-result-projection
  market-render-readback
  market-gamehost-diagnostics
  market-fixture-replay
```

## Current kits

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

## Services currently available

```txt
kit installation
domain registration
command routing
command result return
domain ticking
event emission
snapshot aggregation
interface transition
interface activation
nested command dispatch
resource add/pay/check
pressure adjustment
orchard tree/apple generation
nearby apple collection
construction item build
roster hire
inventory equip
player move
apple collect
pest clear
day/night advance
world canvas rendering
HTML screen/HUD rendering
GameHost getState/tick exposure
minimal smoke fixture
```

## Architecture gap

`engine.command()` returns results, but `interface-composition.activate` drops nested action command results.

That means Market command authority cannot yet be inspected across these surfaces:

```txt
source manifest
preflight
mutation/no-mutation
journal
transaction history
snapshot.lastResult
Exchange projection
renderer readback
GameHost diagnostics
DOM-free fixture
```

## Next DSK map

```txt
market-authority-domain
  -> market-action-catalog-kit
  -> market-command-source-manifest-kit
  -> market-command-envelope-kit
  -> market-source-snapshot-kit
  -> market-preflight-kit
  -> market-command-result-kit
  -> market-command-journal-kit
  -> market-result-journal-kit
  -> resource-transaction-history-kit
  -> inventory-purchase-intake-kit

interface-result-domain
  -> interface-nested-result-adapter-kit
  -> interface-composition-last-result-kit

exchange-projection-domain
  -> market-result-projection-kit
  -> market-render-readback-kit
  -> market-gamehost-diagnostics-kit

validation-domain
  -> market-fixture-replay-kit
```

## Decision

Keep the runtime and visual layer stable. Add a narrow source-owned Market result path before any economy expansion.
