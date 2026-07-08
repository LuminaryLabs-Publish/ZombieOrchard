# Architecture Audit — Market Transaction Ledger DSK Map

**Timestamp:** `2026-07-08T16-10-36-04-00`

## Goal

Document the exact DSK boundary needed to make `ZombieOrchard` Market actions source-owned, transaction-backed, renderer-readable, and fixture-verifiable.

## Current architecture

```txt
index.html
  -> src/boot.js
  -> src/start.js
  -> createOrchardGame()
  -> createKitRuntime({ kits })
  -> resource-ledger / pressure-field / orchard-world / construction-runtime / roster-runtime / inventory-runtime
  -> generated interface domains
  -> active-session-domain-kit
  -> interface-composition-kit
  -> world-canvas renderer
  -> html-interface-renderer
  -> window.GameHost
```

## Existing good seams

```txt
- createKitRuntime centralizes domain installation.
- engine.command(domainId, type, payload) already returns accepted/rejected results.
- engine.snapshot() centralizes read model aggregation.
- interface-composition already routes action.command through ctx.engine.command.
- resource-ledger already owns canPay/pay/add.
- inventory-runtime already owns inventory state.
- html-interface-renderer already renders from snapshots.
```

## Current weak seam

```txt
interface-composition.activate
  -> resolves active screen action
  -> dispatches action.command through ctx.engine.command(...)
  -> drops the nested command result
  -> returns transition result or accepted true
  -> snapshot exposes active/previous/activeSnapshot only
```

This means the Market can dispatch a command later, but the app will not have a durable place to inspect the command envelope, preflight, transaction, accepted/rejected result, projection, renderer readback, or fixture row outcome.

## DSK split needed next

```txt
market-action-id-catalog-kit
  Owns canonical action IDs and maps UI actions to command types.

market-source-snapshot-kit
  Owns resource, inventory, price, capacity, and exchange route source snapshots.

market-command-envelope-kit
  Normalizes action ID, command type, payload, quantity, actor/source, before snapshot, and frame.

market-preflight-kit
  Produces accepted/rejected preflight with stable reason codes.

market-command-result-kit
  Produces MarketCommandResult with accepted, reason, before, after, mutation summary, and transaction refs.

market-transaction-ledger-kit
  Appends TransactionRecord rows for accepted sell/buy actions.

market-command-journal-kit
  Appends every MarketCommandEnvelope with source fingerprints.

market-result-journal-kit
  Appends every MarketCommandResult with accepted/rejected outcome.

resource-transaction-history-kit
  Extends resource-ledger without breaking values/canPay/pay/add.

inventory-purchase-intake-kit
  Extends inventory-runtime with capacity-aware purchases without breaking equip/items snapshots.

nested-command-result-propagation-kit
  Returns nested command result through interface-composition and exposes lastResult in snapshot.

market-result-projection-kit
  Produces exchange renderer rows from source/result/journal state.

market-render-readback-kit
  Reports which MarketResultProjection rows the HTML renderer consumed.

market-fixture-replay-kit
  Runs DOM-free accepted/rejected Market rows against createOrchardGame().
```

## Target command flow

```txt
exchange action row
  -> interface-composition.activate
  -> MarketCommandEnvelope
  -> MarketSourceSnapshot before
  -> MarketPreflight
  -> if accepted, mutate resource-ledger and inventory-runtime through domain APIs
  -> TransactionRecord
  -> MarketCommandResult
  -> MarketSourceSnapshot after
  -> MarketCommandJournal row
  -> MarketResultJournal row
  -> nested command result returned by interface-composition
  -> interface-composition.snapshot().lastResult
  -> MarketResultProjection
  -> html-interface-renderer exchange branch
  -> MarketRenderReadback
  -> GameHost market diagnostics
  -> DOM-free fixture rows
```

## Source files to add

```txt
src/market/market-ids.js
src/market/market-source-snapshot.js
src/market/market-command-envelope.js
src/market/market-preflight.js
src/market/market-result.js
src/market/market-transaction-ledger.js
src/market/market-projection.js
src/market/market-render-readback.js
tests/market-transaction-fixture.mjs
```

## Source files to edit after helpers exist

```txt
src/presets/orchard-preset.js
src/kits/game-domains.js
src/kits/composition.js
src/game.js
src/renderer/html-interface-renderer.js
src/start.js
package.json
```

## Do not do yet

```txt
- Do not replace createKitRuntime.
- Do not rewrite active-session.
- Do not move renderer ownership into shared kits.
- Do not expand worker assignment.
- Do not add save slots.
- Do not add new art systems.
- Do not change the static route.
```