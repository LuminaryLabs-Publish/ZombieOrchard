# ZombieOrchard Exchange Result Projection Readback

**Timestamp:** `2026-07-08T21-18-39-04-00`

## Goal

Define the render-side proof needed for Market exchange UI without letting the renderer own Market authority.

## Current render loop

```txt
engine.tick(1 / 60)
  -> engine.snapshot()
  -> world.render(snapshot)
  -> ui.render(snapshot)
```

## Current renderer behavior

```txt
active-session:
  renders day, phase, money, apples, wood, pressure, condition, quick commands, active actions, and message.

other screens:
  renders generic title/description/actions.
  construction, roster, inventory, outcome receive small card branches.

exchange:
  currently falls through to generic screen render.
  exchange currently only exposes Back.
```

## Render authority rule

```txt
renderer may consume:
  MarketResultProjection
  MarketSourceSnapshot projection rows
  renderer readback metadata

renderer must not own:
  price tables
  capacity rules
  resource mutation
  inventory mutation
  Market preflight
  Market result reasons
  transaction records
  command journals
  result journals
```

## Required exchange projection

```txt
MarketResultProjection:
  activeScreen: exchange
  actions:
    - sell-apples
    - buy-basic-tool
    - buy-row-supply
    - back
  resources:
    money
    apples
    wood
    scrap
  offers:
    price
    capacity
    enabled
    disabledReason
  lastResult:
    commandId
    status
    reason
    transactionId
    mutationSummary
  transactionRows:
    id
    commandId
    kind
    resourceDelta
    inventoryDelta
```

## Required readback report

```txt
ExchangeRenderReadback:
  consumedProjection: true
  activeScreen: exchange
  renderedActionIds: string[]
  renderedOfferIds: string[]
  renderedLastResultStatus: string | null
  renderedTransactionCount: number
  authorityOwnedByRenderer: false
```

## Fixture rows needed

```txt
- exchange render consumes projection with no last result
- exchange render consumes accepted sell projection
- exchange render consumes rejected sell projection
- exchange render consumes accepted buy projection
- exchange render consumes insufficient funds projection
- exchange render consumes capacity full projection
- renderer readback confirms action ids and offer ids
```

## Defer

Do not extract `world-canvas`, move to WebGL, add settlement visuals, or make exchange cards more polished until the projection/readback fixture exists.
