# ZombieOrchard Architecture Audit: Market Result Readback DSK Map

**Timestamp:** `2026-07-10T02-10-16-04-00`

## Architecture read

`ZombieOrchard` is already kit-composed enough for a focused proof pass. The problem is not the runtime shell; it is that the Market/Exchange seam does not retain or project command results.

## Current loop

```txt
index.html
  -> src/boot.js
  -> src/start.js
  -> createOrchardGame()
  -> createKitRuntime({ kits })
  -> scoped interface domains
  -> interface-composition
  -> game domain kits
  -> world-canvas renderer
  -> html-interface-renderer
  -> GameHost
```

## DSK/domain map

```txt
static-browser-host:
  index.html, canvas, ui root

boot-module:
  src/boot.js starts the route

runtime-entrypoint:
  src/start.js wires engine + renderers + requestAnimationFrame

game-factory:
  src/game.js creates the composed engine from preset + kits

kit-runtime:
  registers domains, routes commands, returns results, ticks domains, emits events, aggregates snapshots

interface-domains:
  generated from orchardPreset.interface

interface-composition:
  active screen state, transitions, back, nested action dispatch, activeSnapshot

resource-ledger:
  resource values, add/pay/affordability

pressure-field:
  curse and row pressure drift

orchard-world:
  apple/pest/orchard source state

active-session:
  movement, collection, clearing, phases, pests, session end, HUD actions

construction-runtime:
  build catalog item + resource payment

roster-runtime:
  roster snapshot

inventory-runtime:
  inventory snapshot

world-canvas-renderer:
  orchard state visual projection

html-interface-renderer:
  active-session HUD or generic screen projection

GameHost:
  raw engine/getState/tick exposure

Market-next:
  source-owned Market commands, result ledgers, render readback, GameHost diagnostics, DOM-free fixture
```

## Current service map

```txt
engine.command returns a result
interface-composition.activate gets active screen action descriptor
interface-composition dispatches nested action.command when present
interface-composition currently discards nested command result
interface-composition returns transition result or { accepted: true }
html-interface-renderer renders active-session specially
html-interface-renderer renders other screens generically
exchange preset only exposes Back
GameHost exposes raw engine snapshot, not Market diagnostics
```

## Kit map

Current kits:

```txt
kit-runtime
scoped-interface-domain-kit
active-session-domain-kit
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

The next DSK should not replace `createKitRuntime`. It should use the existing command-result capability and add Market-specific source/result/readback contracts around Exchange.
