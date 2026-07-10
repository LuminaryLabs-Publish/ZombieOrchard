# Render Audit: Exchange Market Render Readback Gap

**Timestamp:** `2026-07-10T05-28-12-04-00`

## Current render surfaces

```txt
world-canvas-renderer:
  renders trees, apples, pests, and player from engine snapshot

html-interface-renderer:
  renders active-session HUD when active === "active-session"
  renders generic screen panel for all other active screens
  routes [data-action] to interface-composition.activate
  routes [data-command] to active-session command

window.GameHost:
  exposes engine, getState(), tick(dt)
```

## Exchange render state

`exchange` is still rendered by the generic screen branch.

Current result:

```txt
Market title
empty description
Back button only
no source-owned Market rows
no visible accepted/rejected result
no visible transaction/intake history
no renderer readback
```

## Render blocker

The renderer cannot show Market facts because upstream source/result facts do not exist yet.

The missing flow is:

```txt
MarketActionCatalog
  -> MarketCommandResult
  -> MarketResultProjection
  -> Exchange renderer branch
  -> MarketRenderReadback
  -> GameHost marketDiagnostics
```

## Required render readback rows

```txt
active screen
visible Market action ids
visible Market action count
last command id
last action id
last result status
last rejection reason
last resource delta
last inventory delta
transaction row count
inventory intake row count
snapshot resource totals
snapshot inventory count
```

## Do not do next

```txt
Do not rebuild world-canvas.
Do not polish orchard visuals.
Do not rewrite the whole HTML renderer.
Do not add new economy categories until Exchange rows are readable.
```
