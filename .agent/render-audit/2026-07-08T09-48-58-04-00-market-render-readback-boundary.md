# ZombieOrchard Market Render Readback Boundary

**Timestamp:** `2026-07-08T09-48-58-04-00`

## Current render surface

```txt
src/start.js
-> createWorldCanvas(canvas)
-> createHtmlInterfaceRenderer({ root, engine })
-> draw()
-> engine.tick(1 / 60)
-> engine.snapshot()
-> world.render(snapshot)
-> ui.render(snapshot)
```

## Visual surfaces

```txt
world-canvas:
  orchard backdrop
  trees
  apples
  pests
  player

html-interface-renderer:
  active-session HUD
  generic screen panels
  generic action buttons
  outcome panel
```

## Market render gap

The exchange route exists, but it is still a generic interface screen. It does not consume a `MarketResultProjection`.

The next implementation should add one renderer branch:

```txt
snapshot["market-runtime"].projection
or
snapshot["interface-composition"].activeSnapshot.projection
-> html-interface-renderer exchange branch
-> market rows
-> last result card
-> transaction rows
-> renderer readback report
```

## Renderer readback target

```txt
MarketRenderReadback:
  screenId: "exchange"
  projectionVersion: stable string
  consumedRows: number
  consumedTransactionRows: number
  lastResultReason: stable string | null
  renderedFromProjection: true
  ownsPriceAuthority: false
  ownsCapacityAuthority: false
  ownsTransactionAuthority: false
```

## Boundary rules

```txt
HTML renderer may:
  read MarketResultProjection
  render row labels/descriptions/prices/capacity flags
  render disabled state
  render last result summary
  render transaction summaries
  emit button clicks back to engine.command
  expose readback diagnostics

HTML renderer must not:
  decide prices
  decide capacity
  mutate resources
  mutate inventory
  create TransactionRecord ids
  invent rejection reasons
  decide accepted/rejected command result
```

## Fixture rows to add after implementation

```txt
[ ] exchange screen consumes projection rows.
[ ] sell-apples row appears from projection.
[ ] buy-basic-tool row appears from projection.
[ ] buy-row-supply row appears from projection.
[ ] disabled rows render disabledReason from projection.
[ ] accepted transaction renders from transactions projection.
[ ] rejected result renders from lastResult projection.
[ ] render readback reports renderedFromProjection = true.
[ ] render readback reports ownsPriceAuthority = false.
[ ] render readback reports ownsCapacityAuthority = false.
[ ] render readback reports ownsTransactionAuthority = false.
```

## Stop condition

Stop when the renderer can be tested as a projection consumer and not as a source of market authority.
