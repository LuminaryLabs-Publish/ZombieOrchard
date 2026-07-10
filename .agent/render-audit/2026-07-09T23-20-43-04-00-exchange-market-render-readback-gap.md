# ZombieOrchard Render Audit: Exchange Market Render Readback Gap

**Timestamp:** `2026-07-09T23-20-43-04-00`

## Current render path

```txt
src/start.js
  -> createWorldCanvas(document.querySelector("#world"))
  -> createHtmlInterfaceRenderer({ root: document.querySelector("#ui-root"), engine })
  -> draw()
  -> engine.tick(1 / 60)
  -> world.render(snapshot)
  -> ui.render(snapshot)
```

## Canvas render status

The canvas renderer is not the blocker for this pass. It renders orchard state from snapshots and should stay stable.

## HTML interface render status

`html-interface-renderer` currently has:

```txt
active-session branch:
  HUD stats, quick actions, message

generic screen branch:
  title, description, optional cards, actions
```

There is no Exchange-specific Market branch yet.

## Exchange current state

`orchard-preset.js` defines:

```txt
exchange: { title: "Market", actions: [{ id: "back", label: "Back", to: "active-session" }] }
```

So the Market screen is currently a generic panel with only Back.

## Render domains

```txt
world-canvas-renderer
html-interface-renderer
active-session-hud-render
screen-panel-render
exchange-generic-screen-render
market-result-projection-next
market-render-readback-next
market-gamehost-diagnostics-next
```

## Main finding

Do not rewrite the renderer first. The missing render boundary is a Market projection/readback layer that can prove which actions, prices, rejected reasons, transaction counts, and intake rows were visible.

## Required render proof rows

```txt
active screen is exchange
visible Market action count
visible sell action id
visible buy action id
last accepted/rejected result label
last rejection reason
resource transaction count
inventory intake count
renderer readback snapshot is serializable
GameHost marketDiagnostics matches renderer readback
```

## Deferred

```txt
canvas visual polish
HTML redesign
animation pass
new economy panels
save/load UI
```
