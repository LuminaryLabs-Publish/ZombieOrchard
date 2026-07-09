# ZombieOrchard Architecture Audit: Market Result Central Ledger Sync DSK Map

**Timestamp:** `2026-07-09T13-18-48-04-00`

## Selection outcome

The accessible `LuminaryLabs-Publish` repo list was compared against the central ledger in `LuminaryLabs-Dev/LuminaryLabs`.

No checked non-Cavalry repo was fully new, missing from central tracking, missing sampled root `.agent` state, or otherwise undocumented.

`ZombieOrchard` was selected as a central-ledger catch-up target because repo-local `.agent` Market breakdown state had advanced beyond the central ledger.

## Runtime architecture

```txt
index.html
  -> src/boot.js
  -> src/start.js
  -> createOrchardGame()
  -> createKitRuntime({ kits })
  -> domain registry
  -> command router
  -> tick dispatcher
  -> snapshot aggregator
  -> world-canvas renderer
  -> html-interface renderer
  -> window.GameHost
```

## Domains in use

```txt
host / boot:
  static-browser-host
  boot-module
  runtime-entrypoint
  browser-animation-loop
  GameHost

runtime:
  kit-runtime
  engine-context
  domain-registry
  command-router
  event-emitter
  tick-dispatcher
  snapshot-aggregator
  subscription-bus

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
  world-canvas-renderer

proof / docs:
  smoke-harness
  repo-local-agent-ledger
  central-ledger-readback
```

## Implemented kit map

```txt
kit-runtime:
  source: src/kits/runtime.js
  service: install domains, route commands, tick domains, aggregate snapshots.

scoped-interface-domain-kit:
  source: src/kits/scoped-interface-domains.js
  service: create screen domains from preset descriptors.

interface-composition-kit:
  source: src/kits/composition.js
  service: active screen state, transition/back, action activation, nested command dispatch.

resource-ledger-kit:
  source: src/kits/game-domains.js
  service: canPay/pay/add resources, expose resource snapshot.

pressure-field-kit:
  source: src/kits/game-domains.js
  service: tick rowPressure/curse and accept adjustment commands.

orchard-world-kit:
  source: src/kits/game-domains.js
  service: generate trees/apples, collect nearest apple, expose world snapshot.

construction-runtime-kit:
  source: src/kits/game-domains.js
  service: pay construction costs and append built structures.

roster-runtime-kit:
  source: src/kits/game-domains.js
  service: pay hire cost and append field hands.

inventory-runtime-kit:
  source: src/kits/game-domains.js
  service: equip item and expose inventory snapshot.

active-session-domain-kit:
  source: src/kits/game-domains.js
  service: move, collect, clear, phase advance, pest tick, outcome state.

world-canvas-render-kit:
  source: src/renderer/world-canvas.js
  service: draw trees, apples, pests, and player from snapshots.

html-interface-render-kit:
  source: src/renderer/html-interface-renderer.js
  service: draw active-session HUD or generic interface screens and route clicks.
```

## Target DSK cut

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

## Boundary finding

The core runtime already has the correct DSK shape for a small browser game. The Market/Exchange path needs a source-owned result surface, not a new runtime. The first architecture change should make Market accepted/rejected rows explicit and make `interface-composition` retain nested command results without breaking existing screen transitions.
