# ZombieOrchard Render Audit: Exchange Render Readback Gap

**Timestamp:** `2026-07-10T02-10-16-04-00`

## Render surfaces

`ZombieOrchard` has two render surfaces:

```txt
world-canvas-renderer:
  renders orchard state from snapshots

html-interface-renderer:
  renders active-session HUD or generic interface screens from snapshots
```

## Current HTML renderer behavior

```txt
render(snapshot)
  -> read interface-composition active + activeSnapshot
  -> read active-session, resources, pressure, construction, roster, inventory
  -> if active-session, render HUD and quick command buttons
  -> if session-select/construction/roster/inventory/outcome, render extra cards
  -> otherwise render generic screen title/description/actions
```

`exchange` falls through to the generic screen path, and `orchardPreset.interface.exchange` currently exposes only Back.

## Render readback gap

```txt
- no Market-specific Exchange projection branch
- no visible Market action rows beyond Back
- no last accepted/rejected result projection
- no rejection reason projection
- no before/after resource delta projection
- no inventory intake projection
- no transaction history projection
- no renderer readback object
- no GameHost market render diagnostics
```

## Do not do next

```txt
- Do not rewrite world-canvas.
- Do not redesign all UI screens.
- Do not add visual polish before Market result rows exist.
- Do not add economy categories until accepted/rejected render rows are proven.
```

## Required next render readback

```txt
marketRenderReadback = {
  activeScreen: "exchange",
  visibleMarketActions,
  lastResultStatus,
  lastResultReason,
  visibleResourceDelta,
  visibleInventoryDelta,
  visibleTransactionCount,
  visibleIntakeCount,
  fixtureRowId
}
```

This should be additive to the existing generic renderer and should not break active-session HUD rendering.
