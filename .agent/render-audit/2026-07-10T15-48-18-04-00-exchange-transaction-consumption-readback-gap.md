# Render audit: Exchange transaction consumption readback gap

Timestamp: `2026-07-10T15-48-18-04-00`

## Current visual surfaces

```txt
world canvas
  consumes orchard-world and active-session
  draws trees, apples, pests, and player

HTML interface
  consumes interface-composition activeSnapshot
  active-session branch renders HUD and quick commands
  generic branch renders title, description, cards, and actions
```

## Exchange behavior today

The `exchange` screen is configured with one Back action. The generic renderer therefore has no Market-specific source, inventory, price, affordability, rejection, or transaction state to render.

## Missing render proof

A future Market screen must distinguish three layers:

```txt
source projection
  catalog item, price, stock/capacity, action id

result projection
  accepted/rejected, stable reason, resource delta, inventory delta

consumer readback
  projection id, render frame, rows consumed, fallback/ignored fields
```

Without this split, a button can appear while the renderer cannot prove which source row or command result it represented.

## Required readback shape

```json
{
  "projectionId": "market-projection-17",
  "frame": 42,
  "sourceIds": ["market-item-apple-crate"],
  "resultIds": ["market-result-9"],
  "renderedActions": ["buy-apple-crate"],
  "renderedStatus": "rejected",
  "renderedReason": "insufficient_funds",
  "fallbacks": []
}
```

The exact schema can differ, but it must remain JSON-safe and bounded.

## Non-blocking world-render note

`world-canvas.js` has no semantic object descriptors or render readback, but that is not the next Market blocker. Do not replace the canvas renderer during this cut.

## Render conclusion

Add Exchange-specific projection and consumption readback inside the existing HTML renderer before Market art expansion or renderer replacement.