# Render Audit — Exchange Market Render Readback Gap

## Timestamp

```txt
2026-07-10T11-20-54-04-00
```

## Current visual surface

```txt
world canvas renderer
  renders orchard-world trees/apples
  renders active-session pests/player

HTML interface renderer
  renders active-session HUD
  renders generic interface screens
  renders cards for session-select, construction, roster, inventory, outcome
```

## Market render gap

`exchange` is still a generic screen. The HTML renderer has no Market branch, no Market projection rows, and no renderer readback proving accepted or rejected Market actions.

## Required render/readback rows

```txt
marketScreenProjected
marketActionCatalogRendered
marketPriceRowsRendered
marketCapacityRowsRendered
marketAcceptedResultRendered
marketRejectedReasonRendered
resourceDeltaRendered
inventoryIntakeRendered
backActionRendered
marketRenderReadbackJsonSafe
```

## Do not do next

```txt
renderer rewrite
new Market art
visual polish
economy expansion
```

The next useful render work is proof rows, not visuals.
