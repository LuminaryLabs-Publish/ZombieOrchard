# ZombieOrchard Architecture Audit: Market Nested Result Ledger DSK Map

**Timestamp:** `2026-07-10T00-38-44-04-00`

## Summary

The runtime architecture is already kit-composed enough for the next proof pass.

The missing DSK boundary is the Market/Exchange result ledger.

## Current DSK/domain map

```txt
index.html
  -> static browser host
  -> canvas#world
  -> #ui-root
  -> src/boot.js

src/start.js
  -> createOrchardGame()
  -> createWorldCanvas(canvas)
  -> createHtmlInterfaceRenderer({ root, engine })
  -> requestAnimationFrame(draw)
  -> window.GameHost raw readback

src/game.js
  -> createKitRuntime({ kits })
  -> resource-ledger
  -> pressure-field
  -> orchard-world
  -> construction-runtime
  -> roster-runtime
  -> inventory-runtime
  -> scoped interface domains
  -> active-session
  -> interface-composition

src/kits/runtime.js
  -> command router
  -> tick dispatcher
  -> event emitter
  -> snapshot aggregator
  -> subscriber notification

src/kits/composition.js
  -> active screen state
  -> transition/back
  -> activate active screen
  -> dispatch optional nested action.command
  -> currently discard nested command result
  -> activeSnapshot readback

src/presets/orchard-preset.js
  -> screen/action descriptors
  -> active-session routes
  -> construction command action
  -> exchange Back-only action

src/renderer/html-interface-renderer.js
  -> active-session HUD branch
  -> generic screen branch
  -> no Exchange-specific Market projection branch
```

## Current stable services

```txt
command result return path exists in createKitRuntime
resource pay/add helpers exist
inventory item state exists
screen action descriptors exist
construction nested command path exists
HTML data-action routing exists
GameHost raw snapshot exists
smoke test exists
```

## Missing source-owned Market DSKs

```txt
market-action-catalog-kit
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
```

## Architecture finding

The next cut should not replace `createKitRuntime` or rewrite rendering.

It should add Market source/result rows and splice them through the existing runtime, composition, renderer, and GameHost surfaces.
