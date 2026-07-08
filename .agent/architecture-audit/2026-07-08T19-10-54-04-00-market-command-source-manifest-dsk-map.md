# ZombieOrchard Architecture Audit: Market Command Source Manifest DSK Map

**Timestamp:** `2026-07-08T19-10-54-04-00`

## Purpose

Map the current DSK/domain structure and the exact next-cut Market source modules needed to make exchange behavior durable without rewriting the app shell.

## Current DSK stack

```txt
index.html
  -> src/boot.js
  -> src/start.js
  -> src/game.js
  -> createKitRuntime({ kits })
  -> domain registry
  -> command router
  -> tick dispatcher
  -> snapshot aggregator
```

## Installed domains

```txt
resource-ledger
pressure-field
orchard-world
construction-runtime
roster-runtime
inventory-runtime
entry
session-select
run-setup
interrupt
construction
exchange
roster
inventory
knowledge
preferences
outcome
active-session
interface-composition
```

## Current services by domain

```txt
resource-ledger:
  values
  canPay(cost)
  pay(cost)
  add(values)
  command add/pay
  snapshot values/last

pressure-field:
  pressure channels
  adjust(id, amount)
  tick row pressure and curse
  snapshot channels

orchard-world:
  tree grid
  random apple seed
  nearest apple collection
  bounds snapshot

construction-runtime:
  build catalog
  pay cost through resource-ledger
  append built item
  message projection

roster-runtime:
  pay hire cost through resource-ledger
  append actor
  message projection

inventory-runtime:
  equipped item
  equip command
  item snapshot

active-session:
  action selection
  movement
  apple collection
  pest clearing
  phase advance
  pest tick
  end condition

interface-composition:
  active route
  previous route
  transition/back
  active action activation
  nested action.command dispatch
  activeSnapshot projection
```

## Architecture gap

The current architecture has an important positive seam: `engine.command()` already returns domain command results.

The missing architecture is result retention and Market-specific source ownership.

```txt
current:
  exchange action row is generic
  nested action.command result is dropped
  interface-composition snapshot omits lastResult
  resource-ledger has no transaction provenance
  inventory-runtime has no purchase intake
  html renderer has no exchange projection branch

needed:
  source-owned exchange action ids
  source-owned Market command manifest
  source-owned Market command envelopes
  deterministic before/after source snapshots
  stable preflight and rejection reasons
  accepted/rejected MarketCommandResult records
  transaction history
  retained nestedResult
  snapshot.lastResult
  exchange projection
  renderer readback
  DOM-free fixture rows
```

## Next-cut source modules

```txt
src/market/market-ids.js
src/market/market-command-source-manifest.js
src/market/market-source-snapshot.js
src/market/market-command-envelope.js
src/market/market-preflight.js
src/market/market-result.js
src/market/market-transaction-ledger.js
src/market/market-projection.js
src/market/market-render-readback.js
src/market/market-fixture-rows.js
```

## Next-cut integration points

```txt
src/presets/orchard-preset.js:
  add exchange action rows for sell-apples, buy-basic-tool, buy-row-supply, and back.

src/kits/game-domains.js:
  keep existing kits stable.
  extend resource-ledger with optional transaction history helpers.
  extend inventory-runtime with optional purchase intake helpers.
  add market-runtime-kit or a market dispatch service adjacent to existing game-domain kits.

src/kits/composition.js:
  capture nested ctx.engine.command result.
  return nested result in activate result.
  expose lastResult in snapshot.

src/renderer/html-interface-renderer.js:
  render exchange from MarketResultProjection only.
  expose renderer readback for consumed projection rows.

src/start.js:
  preserve window.GameHost.engine/getState/tick.
  optionally expose market diagnostics without removing baseline shape.

tests/market-transaction-fixture.mjs:
  cover accepted, rejected, no-mutation, nested result, projection, readback, and GameHost compatibility rows.
```

## DSK boundary rule

Market authority should be a set of atomic, source-owned kits.

It should not become a renderer-owned economy system, and it should not rewrite the entire game loop.

## Recommended next slice

```txt
ZombieOrchard Market Command Source Manifest + Nested Result Consumer Fixture Gate
```
