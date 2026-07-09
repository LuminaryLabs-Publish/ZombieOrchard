# ZombieOrchard Exchange Projection Consumer Readback

**Timestamp:** `2026-07-08T23-29-18-04-00`

## Scope

This render audit is for the visual/UI surface of the Market exchange path.

No render implementation changed in this pass.

## Current render surfaces

```txt
src/renderer/world-canvas.js:
  draws trees, apples, pests, and player from engine snapshots.

src/renderer/html-interface-renderer.js:
  renders active-session HUD when interface-composition.active === active-session.
  renders generic screen panels for entry, Market/exchange, roster, inventory, knowledge, preferences, outcome, and other interface screens.
```

## Current exchange render behavior

```txt
html-interface-renderer reads:
  snapshot["interface-composition"].active
  snapshot["interface-composition"].activeSnapshot
  snapshot["resource-ledger"].values
  snapshot["pressure-field"].channels
  snapshot["construction-runtime"]
  snapshot["roster-runtime"]
  snapshot["inventory-runtime"]

If active screen is not active-session, it renders:
  title
  description
  selected screen extras when hard-coded
  current.actions as buttons
```

The exchange screen currently falls through the generic screen renderer. It does not have a dedicated Market projection branch.

## Render authority problem

The renderer must not own these values:

```txt
- Market action catalog
- price rows
- capacity rows
- accepted/rejected reasons
- resource mutation amount
- inventory mutation amount
- transaction history
- result journal rows
```

The renderer should only consume projection rows created by Market source/result modules.

## Target projection payload

```txt
MarketResultProjection:
  projectionId
  sourceFingerprint
  activeMarketActionIds[]
  priceRows[]
  capacityRows[]
  lastResultSummary
  transactionRows[]
  disabledActionIds[]
  reasonRows[]
  updatedAtFrame
```

## Target renderer readback

```txt
MarketRenderReadback:
  readbackId
  projectionId
  consumedProjection: true | false
  consumedRows:
    actionRows
    priceRows
    capacityRows
    transactionRows
    lastResultSummary
  unsupportedRows[]
  missingRows[]
  rendererOwnedAuthority: false
  rendererAuthorityLeaks[]
```

## Required exchange renderer behavior

```txt
if active === "exchange":
  read market projection from snapshot only
  render action buttons from projection action rows
  render prices from projection price rows
  render capacity from projection capacity rows
  render last result from projection lastResultSummary
  render transaction rows from projection transactionRows
  emit/readback a MarketRenderReadback record
else:
  keep existing generic screen behavior
```

## Fixture expectations

```txt
- exchange projection exists after navigating to exchange.
- exchange render branch consumes MarketResultProjection.
- renderer does not invent price rows.
- renderer does not invent capacity rows.
- renderer does not mutate resource-ledger.
- renderer does not mutate inventory-runtime.
- readback reports consumed actionRows, priceRows, capacityRows, and transactionRows.
- readback reports rendererOwnedAuthority: false.
- baseline active-session HUD remains unchanged.
```

## Stop line

Do not extract the whole renderer into new render-plan kits yet.

Add only the minimal exchange projection consumer and readback proof needed to prove Market authority is not leaking into the UI renderer.
