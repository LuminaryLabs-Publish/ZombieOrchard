# Exchange Projection Readback Fixture

**Repository:** `LuminaryLabs-Publish/ZombieOrchard`

**Timestamp:** `2026-07-08T19-21-15-04-00`

## Render surface read

`world-canvas` renders the orchard world from snapshots: trees, apples, pests, and player.

`html-interface-renderer` renders either the active-session HUD or a generic screen panel from `interface-composition.activeSnapshot`.

The exchange screen currently falls through the generic screen renderer and only receives the `Back` action from the preset.

## Current render loop

```txt
engine.tick(1 / 60)
  -> engine.snapshot()
  -> world.render(snapshot)
  -> ui.render(snapshot)
  -> active-session HUD or generic screen branch
```

## Render gap

```txt
exchange currently has no MarketResultProjection
exchange currently has no transaction cards
exchange currently has no price/capacity rows
exchange currently has no renderer readback report
html renderer does not report whether it consumed Market projection rows
```

## Required projection contract

```txt
MarketResultProjection:
  active: exchange
  actions: sell-apples / buy-basic-tool / buy-row-supply / back
  prices: deterministic rows
  capacity: deterministic rows
  latestResult: accepted/rejected/no-mutation
  transactions: transaction rows
  warnings: renderer-safe strings only
```

## Required renderer readback

```txt
ExchangeRendererReadback:
  activeScreen: exchange
  consumedProjection: true/false
  renderedActionIds: string[]
  renderedPriceRows: number
  renderedCapacityRows: number
  renderedTransactionRows: number
  latestResultStatus: accepted/rejected/no_mutation/null
  authorityOwnedByRenderer: false
```

## Acceptance

The renderer should consume Market projection records only. It must not own price math, capacity math, transaction mutation, or command rejection logic.
