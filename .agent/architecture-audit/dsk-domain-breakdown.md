# ZombieOrchard DSK Domain Breakdown

**Timestamp:** `2026-07-08T08-02-32-04-00`

## Purpose

Capture the current Domain Service Kit shape of `ZombieOrchard` and define the next Market authority split without changing runtime code.

## Current composition

```txt
index.html
  -> src/boot.js
    -> src/start.js
      -> createOrchardGame()
        -> createKitRuntime({ kits })
        -> resource-ledger-kit
        -> pressure-field-kit
        -> orchard-world-kit
        -> construction-runtime-kit
        -> roster-runtime-kit
        -> inventory-runtime-kit
        -> scoped interface domain kits
        -> active-session-domain-kit
        -> interface-composition-kit
      -> createWorldCanvas(canvas)
      -> createHtmlInterfaceRenderer({ root, engine })
      -> draw/tick/render loop
```

## Runtime domain

```txt
kit-runtime:
  source: src/kits/runtime.js
  owns: domains registry, command routing, tick dispatch, event emission, snapshots, listeners
  current gap: no command journal, no replay helper, no command metadata normalization

GameHost:
  source: src/start.js
  owns: window.GameHost = { engine, getState, tick }
  current gap: no Market diagnostics, no command journal export, no smoke helper
```

## Interface domain

```txt
scoped-interface-domain-kit:
  source: src/kits/scoped-interface-domains.js
  generates: entry, session-select, run-setup, active-session, interrupt, construction, exchange, roster, inventory, knowledge, preferences, outcome
  owns: screen state, actions, fields, metadata, activate/select/set-field commands
  current gap: exchange actions have no price/capacity/disabled metadata

interface-composition-kit:
  source: src/kits/composition.js
  owns: active screen, previous screen, transitions, nested action dispatch
  current gap: nested action.command result is dropped and not surfaced in snapshot

html-interface-render-kit:
  source: src/renderer/html-interface-renderer.js
  owns: HUD, generic panels, click-to-command routing
  current gap: no exchange renderer branch that consumes MarketResultProjection
```

## Game domain

```txt
resource-ledger-kit:
  source: src/kits/game-domains.js
  owns: values, canPay, pay, add
  current gap: no transaction history and no before/after result provenance

pressure-field-kit:
  source: src/kits/game-domains.js
  owns: rowPressure and curse channels
  current gap: direct tick drift is not deterministic replay authority

orchard-world-kit:
  source: src/kits/game-domains.js
  owns: tree grid, apple list, nearest collection
  current gap: Math.random seed is not stable across fixture replay

construction-runtime-kit:
  source: src/kits/game-domains.js
  owns: build catalog, payment, built item records
  current gap: build payments do not share transaction provenance

roster-runtime-kit:
  source: src/kits/game-domains.js
  owns: actor list, hire command, hire payment
  current gap: hire payments do not share transaction provenance

inventory-runtime-kit:
  source: src/kits/game-domains.js
  owns: items and equipped item
  current gap: no Market purchase intake service

active-session-domain-kit:
  source: src/kits/game-domains.js
  owns: day, phase, player, pests, score, collect, clear, movement, next-phase, ending
  current gap: too broad, but should not be split before Market proof passes

world-canvas-render-kit:
  source: src/renderer/world-canvas.js
  owns: canvas draw for trees, apples, pests, player
  current gap: no render-plan input and no economy/market visualization
```

## Market authority next-cut domain

```txt
market-action-id-catalog:
  source target: src/market/market-ids.js
  owns: sell-apples, buy-basic-tool, buy-row-supply, back

market-rejection-reason-catalog:
  source target: src/market/market-ids.js
  owns: unknown-market-command, no-apples-to-sell, insufficient-funds, inventory-capacity-full, invalid-quantity, missing-market-source

market-source-snapshot:
  source target: src/market/market-sources.js
  owns: resourcesBefore, inventoryBefore, price rows, capacity rows, frame, elapsed

market-command-envelope:
  source target: src/market/market-command.js
  owns: stable command id, type, itemId, quantity, source, frame, issuedAt

market-preflight:
  source target: src/market/market-command.js
  owns: accepted/rejected eligibility before mutations

market-command-result:
  source target: src/market/market-results.js
  owns: accepted, commandId, reason, transaction, before/after snapshots, projection

resource-transaction-history:
  source target: src/kits/game-domains.js or src/market/market-results.js
  owns: accepted transaction records and recent transaction rows

inventory-purchase-intake:
  source target: src/kits/game-domains.js
  owns: item addition/capacity checks for bought tools/supplies

nested-command-result-propagation:
  source target: src/kits/composition.js
  owns: lastResult snapshot and nested result return

market-result-projection:
  source target: src/market/market-results.js
  owns: title/message/rows/lastResult/transactions for renderer consumption

market-fixture-replay:
  source target: tests/market-fixture.mjs or tests/smoke.mjs
  owns: accepted/rejected/no-mutation/projection/nested-result checks without DOM ownership
```

## Services the kits offer

```txt
current services:
  install kits
  register domains
  route commands
  tick domains
  aggregate snapshots
  transition screens
  dispatch nested commands
  render orchard canvas
  render HUD and generic screen panels
  maintain resources
  maintain pressure
  maintain orchard entities
  build structures
  hire workers
  equip items
  move/collect/clear/phase player loop
  expose engine/getState/tick

needed next services:
  normalize Market actions
  generate source snapshots
  preflight Market commands
  emit accepted/rejected Market results
  preserve no-mutation rejection proofs
  append transaction history
  add inventory purchase intake
  propagate nested command results
  project Market rows for HTML rendering
  expose fixture-readable Market diagnostics
  prove Market behavior through DOM-free smoke
```

## Current architectural stance

Keep `ZombieOrchard` as a small static app.

Add Market authority beside the existing kits instead of rewriting the whole game.

Do not promote renderer code into the source of economy truth.
