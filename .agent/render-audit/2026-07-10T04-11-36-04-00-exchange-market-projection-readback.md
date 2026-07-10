# Render Audit: Exchange Market Projection Readback

**Timestamp:** `2026-07-10T04-11-36-04-00`

## Render surfaces

```txt
src/renderer/world-canvas.js
  -> draws orchard trees, apples, pests, and player from snapshots

src/renderer/html-interface-renderer.js
  -> draws active-session HUD when active === "active-session"
  -> draws generic screen panel for all other screens
```

## Exchange current state

`orchardPreset.interface.exchange` currently contains:

```txt
{ title: "Market", actions: [{ id: "back", label: "Back", to: "active-session" }] }
```

Because of that, the renderer can only show a generic Market screen with a Back button.

## Missing Exchange projection

```txt
Market action list
stable action ids
price rows
resource affordability rows
capacity rows
accepted/rejected last result
resource transaction summary
inventory intake summary
visible rejection reason
last nested command result
Market render readback
```

## Renderer readback gap

`html-interface-renderer` renders HTML but returns no readback object.

There is no stable proof row for:

```txt
active screen was exchange
visible Market actions count
last result was visible
rejection reason was visible
transaction count was visible
intake count was visible
button ids matched source catalog
```

## Required next render contract

```txt
createMarketProjection(snapshot)
  -> visibleActions
  -> resourceRows
  -> inventoryRows
  -> priceRows
  -> lastResult
  -> rejectionReason
  -> transactionSummary
  -> intakeSummary

createMarketRenderReadback({ projection, root })
  -> activeScreen
  -> visibleActionIds
  -> visibleActionCount
  -> lastResultStatus
  -> lastRejectionReason
  -> transactionCount
  -> intakeCount
```

## Main finding

Do not replace the canvas renderer or generic HTML renderer yet.

The useful next cut is a narrow Exchange branch in `html-interface-renderer` plus a source-backed readback row. That will prove Market rows without changing orchard visuals.
