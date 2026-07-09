# Render Audit — Exchange Projection Consumer Readback

**Timestamp:** `2026-07-09T02-05-52-04-00`

## Render surface

`ZombieOrchard` has two render surfaces:

```txt
world-canvas renderer
html-interface-renderer
```

The Market issue is in the HTML surface, not the world canvas.

## Current HTML renderer loop

```txt
root click
  -> [data-action] calls engine.command("interface-composition", "activate", { actionId })
  -> [data-command] calls engine.command("active-session", command)

render(snapshot)
  -> ui = snapshot["interface-composition"]
  -> active = ui.active
  -> current = ui.activeSnapshot
  -> session/resources/pressure/construction/roster/inventory snapshots are read
  -> active-session HUD is special-cased
  -> construction/roster/inventory/outcome cards are special-cased
  -> all other screens use generic title/description/actions panel
```

## Exchange read

The `exchange` screen currently falls through to the generic screen renderer. It has no dedicated projection branch for:

```txt
market action rows
prices
capacity
last accepted/rejected command result
resource delta
inventory intake
transaction history
readback row
```

## Render gap

A fixture can prove command results only if the renderer has a stable projection/readback contract. Today a Market command may mutate a nested domain, but the HTML renderer only knows the active screen snapshot and generic actions.

## Required render proof

Add a pure projection before changing visuals:

```txt
MarketResultProjection
  active: "exchange"
  rows: MarketActionProjection[]
  resources: ResourceReadout
  inventory: InventoryReadout
  lastResult: MarketCommandResult | null
  transactions: TransactionRecord[]
```

Then add readback:

```txt
MarketRenderReadback
  consumedProjection: true
  active: "exchange"
  actionRowCount
  lastResultStatus
  resourceValuesShown
  transactionRowsShown
```

## Safe visual behavior

The next implementation should keep the generic screen shape until the consumer fixture passes.

Do not redesign CSS, canvas, orchard art, HUD layout, or screen flow during the Market result proof.

## Acceptance fixture rows

```txt
exchange-back:
  action accepted, transition back, no Market mutation expected

sell-apples-accepted:
  apples decreases, money increases, accepted result projected, transaction row visible

sell-apples-rejected-no-apples:
  resources unchanged, rejected reason projected, no transaction row added

buy-basic-tool-accepted:
  money decreases, inventory intake record created, accepted result projected

buy-basic-tool-rejected-no-money:
  resources unchanged, inventory unchanged, rejected reason projected
```
