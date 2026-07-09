# ZombieOrchard Architecture Audit: Market Readback Ledger Catch-Up DSK Map

**Timestamp:** `2026-07-09T16-38-14-04-00`

## Scope

This audit maps the current DSK/domain boundary and the next Market readback proof boundary.

Runtime implementation was not changed.

## Current architecture

```txt
static browser route
  -> boot/start entry modules
  -> createOrchardGame
  -> createKitRuntime
  -> installed game/domain/interface kits
  -> canvas and HTML renderers
  -> GameHost readback
  -> smoke harness
```

## Current domains

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
smoke-harness
repo-local-agent-ledger
central-ledger-readback
```

## Current service map

```txt
- createKitRuntime: register domains, route commands, return command results, tick domains, emit events, aggregate snapshots, notify subscribers.
- scoped-interface-domain-kit: expose screen descriptors, action activation, optional command descriptors, and interface snapshots.
- interface-composition-kit: route transitions/back, activate the active screen, dispatch nested commands, auto-route outcome, expose activeSnapshot.
- resource-ledger-kit: store money/apples/wood/scrap, affordability helpers, add/pay commands, and resource snapshots.
- pressure-field-kit: track pressure channels and tick pressure drift.
- orchard-world-kit: generate trees/apples, collect nearby apples, expose bounds and orchard state.
- construction-runtime-kit: build catalog entries by paying resources.
- roster-runtime-kit: track actors.
- inventory-runtime-kit: track equipped item and item list.
- active-session-domain-kit: move, collect, clear, advance phase, spawn/chase pests, end session, expose HUD actions.
- world-canvas-render-kit: render orchard state from snapshots.
- html-interface-render-kit: render active-session HUD and generic screens, route data-action/data-command clicks.
- smoke-fixture-kit: verify entry -> play -> active-session and orchard apple availability.
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

## Missing Market proof architecture

The next architecture should add source-owned Market proof as additive kits.

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

## Boundary rule

Do not move the whole game into a new engine. `createKitRuntime` already has the core command/tick/snapshot contract. Patch the Market consumer chain where source/result/readback facts are currently dropped.

## Validation expectation

Next implementation should pass:

```bash
npm test
npm run build
node tests/market-result-fixture.mjs
```
