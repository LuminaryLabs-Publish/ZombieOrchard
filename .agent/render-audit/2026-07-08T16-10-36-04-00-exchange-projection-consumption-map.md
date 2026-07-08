# Render Audit — Exchange Projection Consumption Map

**Timestamp:** `2026-07-08T16-10-36-04-00`

## Goal

Define how the HTML renderer should consume Market projection rows without becoming the owner of Market price, capacity, transaction, or rejection authority.

## Current render surface

```txt
src/start.js
  -> createWorldCanvas(document.querySelector("#world"))
  -> createHtmlInterfaceRenderer({ root: document.querySelector("#ui-root"), engine })
  -> draw()
  -> engine.tick(1 / 60)
  -> world.render(snapshot)
  -> ui.render(snapshot)
```

## Current canvas renderer

`world-canvas` is intentionally simple.

```txt
snapshot["orchard-world"].trees  -> green blocks
snapshot["orchard-world"].apples -> red/gold blocks
snapshot["active-session"].pests -> pest blocks
snapshot["active-session"].player -> player block
```

No Market work is needed in the canvas renderer first.

## Current HTML renderer

```txt
click[data-action]
  -> engine.command("interface-composition", "activate", { actionId })

click[data-command]
  -> engine.command("active-session", command)

active === "active-session"
  -> renders HUD, Collect, Clear, Next Phase, and active-session action buttons

other active screens
  -> render title, description, generic actions, and a few hard-coded extras for session-select, construction, roster, inventory, outcome
```

## Current render gap

```txt
active === "exchange"
  -> currently falls through generic screen rendering
  -> no exchange-specific projection branch
  -> no price rows
  -> no capacity rows
  -> no transaction rows
  -> no last accepted/rejected result row
  -> no renderer readback report
```

## Target exchange render contract

The renderer should only consume these snapshot-owned records:

```txt
MarketResultProjection:
  screenId
  title
  description
  priceRows[]
  capacityRows[]
  actionRows[]
  transactionRows[]
  lastResultRow
  rejectionRows[]
  resourceSummary
  inventorySummary
  sourceFingerprint

MarketRenderReadback:
  activeScreen
  projectionSeen
  consumedRows[]
  missingRows[]
  commandAuthorityOwnedByRenderer: false
  priceAuthorityOwnedByRenderer: false
  capacityAuthorityOwnedByRenderer: false
  transactionAuthorityOwnedByRenderer: false
```

## Required renderer acceptance rows

```txt
exchange_projection_seen
exchange_price_rows_consumed
exchange_capacity_rows_consumed
exchange_action_rows_consumed
exchange_transaction_rows_consumed_after_accepted_sell
exchange_last_result_consumed_after_rejection
exchange_renderer_does_not_compute_prices
exchange_renderer_does_not_compute_capacity
exchange_renderer_does_not_mutate_resources
exchange_renderer_does_not_mutate_inventory
exchange_renderer_readback_available_to_GameHost
active_session_hud_still_uses_current_snapshot_shape
```

## Target renderer flow

```txt
snapshot["interface-composition"].active === "exchange"
  -> snapshot["market-runtime"].projection or snapshot["exchange"].meta.marketProjection
  -> html-interface-renderer renders projection rows
  -> html-interface-renderer records MarketRenderReadback
  -> GameHost exposes latest readback through optional diagnostics
```

## Stop line

Do not make the HTML renderer create Market state.

The renderer may format and display rows, but price rows, capacity rows, transaction rows, accepted/rejected output, and source fingerprints must come from the Market domain/projection layer.