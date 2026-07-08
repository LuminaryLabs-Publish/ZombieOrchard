# ZombieOrchard Market Projection Readback Handoff

**Timestamp:** `2026-07-08T12-51-50-04-00`

## Render surface

The repo has two active render surfaces:

```txt
world-canvas:
  src/renderer/world-canvas.js
  draws orchard objects from snapshots

html-interface-renderer:
  src/renderer/html-interface-renderer.js
  draws active-session HUD and generic screens from snapshots
```

The Market work belongs primarily in `html-interface-renderer`, but the renderer must remain a projection consumer, not an economy authority owner.

## Current renderer loop

```txt
engine.tick(1 / 60)
-> engine.snapshot()
-> world.render(snapshot)
-> ui.render(snapshot)
-> ui reads interface-composition.active
-> ui reads interface-composition.activeSnapshot
-> active-session draws dedicated HUD branch
-> other screens draw generic title/description/actions branch
```

## Current exchange state

```txt
exchange active screen:
  uses generic screen rendering
  reads activeSnapshot.title
  reads activeSnapshot.description
  renders current.actions
  current.actions only contains Back
```

## Required projection handoff

```txt
MarketCommandResult
-> MarketCommandJournal
-> MarketResultProjection
-> interface-composition.lastResult
-> snapshot["market-runtime"].projection
-> html-interface-renderer exchange branch
-> MarketRenderReadback
```

## Renderer must consume

```txt
market projection rows:
  actionRows
  priceRows
  capacityRows
  resultBanner
  transactionRows
  disabledReasons
  acceptedRejectedSummary

readback rows:
  activeScreen
  projectionSource
  projectionVersion
  consumedActionRowCount
  consumedPriceRowCount
  consumedTransactionRowCount
  renderedLastResultId
  rendererOwnedAuthority: false
```

## Renderer must not own

```txt
- item prices
- inventory capacity
- resource affordability
- apple availability
- mutation eligibility
- transaction IDs
- rejection reasons
- accepted/rejected result status
- command journal rows
```

## Fixture target

```txt
activate Market
-> snapshot proves exchange active
-> Market projection exists
-> renderer branch consumes projection rows
-> readback proves renderer did not invent price/capacity/result authority
```

## Stop condition

Stop the render slice when the exchange screen can be verified from a snapshot alone and `MarketRenderReadback.rendererOwnedAuthority` remains false for price, capacity, transaction, and rejection fields.
