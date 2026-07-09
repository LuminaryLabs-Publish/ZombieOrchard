# ZombieOrchard Exchange Projection Readback Consumer Map

**Timestamp:** `2026-07-08T23-40-55-04-00`

## Scope

The repo has a visual/render surface: `world-canvas` for orchard drawing and `html-interface-renderer` for UI screens.

This audit focuses on the exchange/Market consumer path.

## Current render loop

```txt
src/start.js draw()
  -> engine.tick(1 / 60)
  -> world.render(snapshot)
  -> ui.render(snapshot)
  -> requestAnimationFrame(draw)
```

## Current renderer consumers

```txt
world-canvas:
  consumes snapshot["orchard-world"]
  consumes snapshot["active-session"]
  consumes snapshot["pressure-field"] or visual state as needed
  draws canvas world

html-interface-renderer:
  consumes snapshot["interface-composition"]
  consumes snapshot["active-session"]
  consumes snapshot["resource-ledger"]
  consumes snapshot["pressure-field"]
  consumes snapshot["construction-runtime"]
  consumes snapshot["roster-runtime"]
  consumes snapshot["inventory-runtime"]
  renders active-session HUD if active screen is active-session
  renders generic screen panels otherwise
```

## Current exchange render state

```txt
active === "exchange"
  -> current = snapshot["interface-composition"].activeSnapshot
  -> generic panel renders current.title and current.description
  -> generic actions render current.actions
  -> orchardPreset.exchange currently contains only Back
```

## Render authority gap

```txt
html-interface-renderer has no exchange-specific projection branch.
html-interface-renderer has no MarketResultProjection input.
html-interface-renderer has no MarketRenderReadback output.
html-interface-renderer cannot prove it consumed price/capacity/action/transaction rows from Market source helpers.
```

## Target exchange projection path

```txt
MarketCommandSourceManifest
  -> MarketSourceSnapshot
  -> MarketCommandResult
  -> MarketResultProjection
  -> interface-composition.activeSnapshot.marketProjection or GameHost market projection
  -> html-interface-renderer exchange branch consumes projection rows
  -> MarketRenderReadback records consumed row ids and authority boundaries
```

## Renderer readback contract

```txt
MarketRenderReadback:
  readbackId
  activeScreen: exchange
  projectionId
  consumedActionIds
  consumedPriceRowIds
  consumedCapacityRowIds
  consumedTransactionIds
  renderedLastResultSummary
  rendererOwnsPrices: false
  rendererOwnsCapacity: false
  rendererOwnsTransactions: false
  rendererOwnsResourceMutation: false
```

## Required fixture proof

```txt
- Exchange renderer consumes projection action rows.
- Exchange renderer consumes projection price rows.
- Exchange renderer consumes projection capacity rows.
- Exchange renderer consumes last result summary.
- Exchange renderer consumes transaction rows.
- Back action still works.
- Renderer readback records consumed row ids.
- Renderer readback proves HTML renderer did not compute prices or capacity.
```

## Do not change yet

```txt
- Do not rewrite world-canvas.
- Do not change orchard art direction.
- Do not change canvas draw semantics.
- Do not make html-interface-renderer own Market business logic.
- Do not expand new Market content until source/result/projection fixtures pass.
```
