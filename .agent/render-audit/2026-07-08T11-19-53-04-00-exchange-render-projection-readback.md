# ZombieOrchard Exchange Render Projection Readback

**Timestamp:** `2026-07-08T11-19-53-04-00`

## Goal

Define the render boundary for the Market / exchange screen before adding runtime source changes.

## Current render surfaces

```txt
src/renderer/world-canvas.js:
  canvas renderer for orchard-world and active-session snapshots.
  draws trees, apples, pests, and player.

src/renderer/html-interface-renderer.js:
  HTML renderer for active-session HUD and generic screen panels.
  routes [data-action] clicks to interface-composition.activate.
  routes [data-command] clicks directly to active-session commands.
```

## Current exchange render state

`exchange` is generated as a scoped interface domain from `src/presets/orchard-preset.js`.

It currently has one action:

```txt
back -> active-session
```

Because `html-interface-renderer.js` renders non-active-session screens generically, Market currently appears as a generic panel with Back only.

## Render gap

```txt
No MarketResultProjection exists.
No exchange-specific renderer branch exists.
No renderer readback report exists.
No transaction row projection exists.
No accepted/rejected result projection exists.
```

## Required exchange projection

The renderer should consume a snapshot shape similar to:

```txt
snapshot["market-runtime"].projection = {
  title,
  resources,
  rows,
  lastResult,
  transactions,
  readback
}
```

Rows should be renderer-ready and source-owned:

```txt
{
  id,
  label,
  kind,
  price,
  quantity,
  enabled,
  disabledReason,
  command
}
```

Transactions should be source-owned:

```txt
{
  id,
  frame,
  elapsed,
  commandId,
  accepted,
  resourceDelta,
  inventoryDelta,
  reason
}
```

Renderer readback should prove consumption only:

```txt
{
  consumedProjection: true,
  consumedRows: number,
  consumedTransactions: number,
  renderedLastResult: boolean,
  ownsPrices: false,
  ownsCapacity: false,
  ownsTransactions: false
}
```

## Render invariant

```txt
html-interface-renderer may own DOM markup.
html-interface-renderer must not own price logic.
html-interface-renderer must not own affordability logic.
html-interface-renderer must not own inventory capacity.
html-interface-renderer must not own accepted/rejected result authority.
html-interface-renderer must not own transaction history.
```

## Validation target

Add a DOM-free readback helper first, then a browser renderer readback later.

```txt
MarketResultProjection fixture
-> exchange renderer consumes rows
-> exchange renderer reports readback
-> readback proves renderer did not compute source authority
```
