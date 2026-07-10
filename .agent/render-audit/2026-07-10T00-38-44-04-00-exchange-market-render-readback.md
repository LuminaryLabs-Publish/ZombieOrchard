# ZombieOrchard Render Audit: Exchange Market Render Readback

**Timestamp:** `2026-07-10T00-38-44-04-00`

## Render surfaces

ZombieOrchard has two render surfaces:

```txt
world-canvas renderer:
  renders orchard state from snapshots

html-interface-renderer:
  renders active-session HUD or generic interface screens
```

## Current Exchange rendering

`exchange` is declared in `orchardPreset.interface` as:

```txt
Market
  -> Back
```

The HTML renderer treats it as a generic screen:

```txt
active !== active-session
  -> screen panel
  -> h1 current.title
  -> p current.description
  -> actions buttons
```

## Missing Market readback

```txt
visible Market action count
visible source-owned action IDs
last nested command result
last accepted/rejected status
last rejection reason
resource delta rows
inventory intake rows
transaction count
rendered result message
GameHost marketDiagnostics parity
```

## Render guidance

Do not rewrite the canvas renderer or add visual polish next.

The Market needs a typed projection/readback branch first.

## Next render-safe proof

```txt
Exchange projection branch
  -> render source-owned Market actions
  -> retain last result from interface-composition
  -> show accepted/rejected result state
  -> expose MarketRenderReadback
  -> expose GameHost market diagnostics
  -> fixture verifies DOM-free projection rows before browser smoke
```
