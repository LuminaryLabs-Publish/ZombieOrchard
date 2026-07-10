# Architecture Audit: Market Nested Result Ledger DSK Map

**Timestamp:** `2026-07-10T04-11-36-04-00`

## Current architecture

```txt
index.html
  -> src/boot.js
  -> src/start.js
  -> src/game.js
  -> createKitRuntime({ kits })
  -> game-domain kits
  -> scoped interface-domain kits
  -> active-session-domain-kit
  -> interface-composition-kit
  -> canvas renderer + HTML renderer
  -> window.GameHost
```

## Domain map

| Domain | Current owner | Status |
| --- | --- | --- |
| Static browser host | `index.html` | stable |
| Boot module | `src/boot.js` | stable |
| Entrypoint loop | `src/start.js` | stable |
| Kit runtime | `src/kits/runtime.js` | stable, result-capable |
| Resource ledger | `src/kits/game-domains.js` | stable, needs transaction rows for Market |
| Pressure field | `src/kits/game-domains.js` | stable |
| Orchard world | `src/kits/game-domains.js` | stable prototype |
| Construction runtime | `src/kits/game-domains.js` | has build result, no nested result retention |
| Roster runtime | `src/kits/game-domains.js` | shallow |
| Inventory runtime | `src/kits/game-domains.js` | shallow, needed by Market buys |
| Scoped interface screens | `src/kits/scoped-interface-domains.js` | stable descriptor return |
| Interface composition | `src/kits/composition.js` | blocker: nested command result discarded |
| Active session | `src/kits/game-domains.js` | first playable loop |
| Exchange screen | `src/presets/orchard-preset.js` | Back-only |
| HTML projection | `src/renderer/html-interface-renderer.js` | no Exchange branch |
| Canvas projection | `src/renderer/world-canvas.js` | serviceable |
| GameHost diagnostics | `src/start.js` | raw snapshot only |
| Smoke fixture | `tests/smoke.mjs` | entry/play/apple only |

## Current DSK services

```txt
createKitRuntime:
  installs domains
  routes commands
  returns command results
  ticks domains
  aggregates snapshots
  notifies subscribers

createScopedInterfaceDomainKit:
  creates screen domains
  exposes actions
  returns action descriptors on activate

createInterfaceCompositionKit:
  routes screen transitions
  activates current screen
  dispatches nested action.command
  currently drops nested command result

createResourceLedgerKit:
  stores and mutates resources
  exposes canPay/pay/add helpers

createInventoryRuntimeKit:
  tracks items/equipped
  needs intake history for Market buys

createHtmlInterfaceRenderer:
  renders active-session HUD or generic screen
  routes clicks back into command system
```

## Next DSK boundary

```txt
MarketActionCatalog
  -> MarketCommandSourceManifest
  -> MarketCommandEnvelope
  -> MarketSourceSnapshot before
  -> MarketPreflight
  -> MarketCommandResult
  -> MarketCommandJournal
  -> ResourceTransactionHistory
  -> InventoryPurchaseIntake
  -> MarketSourceSnapshot after
  -> InterfaceNestedResultAdapter
  -> ExchangeProjection
  -> MarketRenderReadback
  -> GameHostMarketDiagnostics
  -> MarketFixtureReplay
```

## Main architecture finding

The architecture is already kit-shaped enough to continue incrementally.

The next change should add a Market proof seam, not replace the runtime. `engine.command()` already returns results. The missing architectural joint is a retained nested-result record that can be consumed by the interface snapshot, renderer, GameHost, and fixture.

## Defer

```txt
runtime replacement
save/load expansion
new crop categories
canvas visual overhaul
shared-kit extraction
Pages workflow changes
```
