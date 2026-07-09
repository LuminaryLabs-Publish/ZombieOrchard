# ZombieOrchard Render Audit: Exchange Result Readback Map

**Timestamp:** `2026-07-09T16-34-14-04-00`

## Render surfaces

```txt
src/renderer/world-canvas.js
  renders:
    background
    orchard trees
    apples
    pests
    player marker

src/renderer/html-interface-renderer.js
  renders:
    active-session HUD
    generic interface screen panels
    selected screen cards for session/build/roster/inventory/outcome
```

## Current HTML renderer loop

```txt
click [data-action]
  -> engine.command("interface-composition", "activate", { actionId })

click [data-command]
  -> engine.command("active-session", command)

render(snapshot)
  -> read snapshot["interface-composition"]
  -> read active and activeSnapshot
  -> read active-session, resources, pressure, construction, roster, inventory
  -> if active-session, render HUD and quick commands
  -> otherwise render generic screen panel with cards and actions
```

## Exchange renderer state

`exchange` currently falls through the generic screen path. It has no special projection branch and no readback record.

## Render gap

The renderer cannot currently prove:

```txt
- Market action count visible to the user
- stable Market action ids
- displayed price/source rows
- last accepted/rejected Market result
- visible rejection reason
- visible transaction history count
- inventory intake count
- renderer consumed interface-composition snapshot.lastResult
- GameHost and renderer saw the same Market result
```

## Required Exchange render readback

Add an additive Exchange branch in `html-interface-renderer` after the Market source/result modules exist.

```txt
active === "exchange"
  -> read market projection
  -> render sell/buy/back action rows
  -> render resources, prices, capacity, last result, rejection reason
  -> emit/retain MarketRenderReadback
```

Proposed readback row:

```txt
{
  active: "exchange",
  visibleActionIds: ["sell-apples", "buy-basic-tool", "buy-row-supply", "back"],
  visibleActionCount: 4,
  lastResultStatus: "accepted" | "rejected" | "none",
  lastRejectionReason: string | null,
  transactionCount: number,
  inventoryIntakeCount: number,
  sourceSnapshotVersion: string
}
```

## Do not change yet

```txt
- Do not replace world-canvas.
- Do not make the orchard renderer high fidelity.
- Do not add visual effects to compensate for missing Exchange proof.
- Do not promote renderer kits before Exchange result readback exists.
```
