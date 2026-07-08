# Render Audit — Exchange Projection Readback Contract

**Repository:** `LuminaryLabs-Publish/ZombieOrchard`

**Timestamp:** `2026-07-08T16-20-00-04-00`

## Render surface

`ZombieOrchard` currently has two render surfaces:

```txt
world-canvas:
  draws trees, apples, pests, and player from engine snapshots

html-interface-renderer:
  draws active-session HUD or generic screen panels from interface snapshots
```

The Market problem is not a canvas problem. It is an HTML projection/readback problem.

## Current exchange render behavior

```txt
snapshot["interface-composition"].active === "exchange"
  -> html-interface-renderer reads ui.activeSnapshot
  -> generic screen branch renders title/description/actions
  -> exchange action list currently contains only Back
```

There is no exchange-specific branch.

There is no MarketResultProjection.

There is no readback report proving the renderer consumed Market rows from a source-owned projection instead of owning prices, capacity, resources, or transaction authority.

## Required renderer contract

```txt
MarketResultProjection
  -> screen title
  -> resource summary rows
  -> inventory capacity rows
  -> deterministic price rows
  -> available action rows
  -> latest accepted/rejected result row
  -> transaction history rows
  -> stable disabled/rejection labels
  -> html-interface-renderer exchange branch
  -> MarketRenderReadback
```

## Readback row shape

```txt
MarketRenderReadbackRow:
  id
  projectionId
  rowType
  sourceId
  consumed
  reason
  renderedLabel
  renderedValue
```

## Required readback reasons

```txt
consumed.projection-row
consumed.action-row
consumed.latest-result
consumed.transaction-row
skipped.empty-history
missing.projection
missing.source-row
unsupported.row-type
fallback.generic-screen
```

## Renderer stop line

The renderer should never compute Market prices, capacity, affordability, inventory intake, or resource mutation.

It should consume `MarketResultProjection` only, then return/readably expose what was consumed.

## Fixture rows needed

```txt
- exchange projection includes sell-apples, buy-basic-tool, buy-row-supply, and back
- renderer consumes all available action rows
- renderer consumes price rows without recalculating prices
- renderer consumes capacity rows without recalculating capacity
- renderer consumes latest accepted result row
- renderer consumes latest rejected result row
- renderer consumes transaction history rows
- renderer reports skipped.empty-history before first accepted transaction
- generic screen fallback is not used once exchange projection exists
```
