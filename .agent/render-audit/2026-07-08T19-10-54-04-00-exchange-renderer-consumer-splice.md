# ZombieOrchard Render Audit: Exchange Renderer Consumer Splice

**Timestamp:** `2026-07-08T19-10-54-04-00`

## Purpose

Define the render-side boundary for the Market cutover.

The renderer should consume Market projections and report readback. It should not own price logic, transaction authority, capacity rules, rejection reasons, or mutation decisions.

## Current render path

```txt
src/start.js
  -> const world = createWorldCanvas(document.querySelector("#world"))
  -> const ui = createHtmlInterfaceRenderer({ root, engine })
  -> draw()
  -> snapshot = engine.tick(1 / 60)
  -> world.render(snapshot)
  -> ui.render(snapshot)
```

## Current canvas surface

`world-canvas` is a direct host renderer.

It draws orchard state from snapshots:

```txt
trees
apples
pests
player
```

This does not need to change for the Market source cut.

## Current HTML surface

`html-interface-renderer` currently owns:

```txt
[data-action] click handling
[data-command] click handling
active-session HUD rendering
generic screen panel rendering
generic card helper
```

The active-session branch renders day, phase, money, apples, wood, pressure, condition, Collect, Clear, Next Phase, action buttons, and message.

Generic screens render title, description, optional cards, and actions.

## Render gap

The exchange screen currently falls through the generic screen path.

```txt
exchange activeSnapshot
  -> title: Market
  -> actions: Back only
  -> no sell rows
  -> no buy rows
  -> no transaction rows
  -> no accepted/rejected result banner
  -> no projection row readback
```

## Required consumer splice

Add an exchange-specific branch that consumes source-owned projection data only.

```txt
snapshot["market-runtime"].projection
  -> exchange title
  -> resource summary
  -> price rows
  -> capacity rows
  -> command action rows
  -> last result banner
  -> transaction history rows
  -> rejected reason rows
```

The branch must not compute prices, capacity, affordability, or rejection reasons itself.

## Renderer readback shape

```txt
ExchangeRendererReadback {
  route: "exchange",
  active: true,
  projectionVersion: string,
  consumedRows: string[],
  missingRows: string[],
  unsupportedRows: string[],
  actionIdsRendered: string[],
  transactionRowsRendered: number,
  lastResultRendered: boolean,
  authorityOwnedByRenderer: false
}
```

## Required readback rows

```txt
exchange_branch_uses_market_projection
exchange_branch_renders_sell_apples_action
exchange_branch_renders_buy_basic_tool_action
exchange_branch_renders_buy_row_supply_action
exchange_branch_renders_back_action
exchange_branch_renders_price_rows_from_projection
exchange_branch_renders_capacity_rows_from_projection
exchange_branch_renders_last_result_from_projection
exchange_branch_renders_transaction_history_from_projection
exchange_branch_reports_consumed_projection_rows
renderer_does_not_own_price_capacity_or_mutation_authority
active_session_hud_remains_compatible
world_canvas_remains_compatible
```

## Stop condition

Stop the render cut when fixture output can prove:

```txt
Market projection rows exist before rendering.
html-interface-renderer consumes those rows for exchange.
readback reports all expected projection rows consumed.
readback reports no renderer-owned economy authority.
active-session HUD still renders unchanged.
world-canvas still renders unchanged.
```
