# Render audit: Exchange Market readback projection gap

Timestamp: 2026-07-10T14-21-28-04-00

## Render surfaces

`ZombieOrchard` has two active render surfaces:

- `world-canvas.js`: orchard trees, apples, pests, and player square.
- `html-interface-renderer.js`: active-session HUD plus generic interface screens.

## Current Exchange/Market render state

The Exchange domain is currently rendered through the generic screen template. It has no Market-specific branch, projection rows, price/capacity rows, accepted/rejected result rows, or render readback.

## Gap

HTML rendering cannot answer:

```txt
which Market action was shown?
which command source row powered it?
which nested command result was retained?
what resource or inventory row changed?
what rejection reason should be displayed?
what did GameHost.market expose after render?
```

## Next render ledge

Add Market projection/readback rows independent of DOM. Then let `html-interface-renderer` consume those rows so the fixture can assert accepted/rejected paths without browser clicks.
