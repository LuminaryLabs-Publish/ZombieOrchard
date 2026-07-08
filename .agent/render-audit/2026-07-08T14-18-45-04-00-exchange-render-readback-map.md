# ZombieOrchard Exchange Render Readback Map

**Timestamp:** `2026-07-08T14-18-45-04-00`

## Goal

Define the renderer-side proof needed before Market UI expansion.

The exchange renderer should display Market data from projection rows only. It should not compute authority, own price logic, mutate resources, or decide whether commands are accepted.

## Current render surfaces

```txt
src/renderer/world-canvas.js:
  draws trees, apples, pests, and player from snapshots.

src/renderer/html-interface-renderer.js:
  renders active-session HUD when active === active-session.
  renders generic screen panels for other interface domains.
  routes data-action clicks to interface-composition.activate.
  routes data-command clicks directly to active-session.
```

## Current exchange render behavior

```txt
active === exchange
  -> generic screen branch
  -> current.title / description
  -> current.actions
  -> only Back is available from preset
```

## Missing render readback

```txt
MarketResultProjection:
  missing

exchange-specific renderer branch:
  missing

projection row consumption report:
  missing

renderer-owned authority guard:
  missing

DOM-free readback fixture:
  missing
```

## Target projection shape

```txt
MarketResultProjection:
  screenId: exchange
  sourceFingerprint
  prices[]
  capacities[]
  actions[]
  latestResult
  commandJournalTail[]
  transactionJournalTail[]
  message
  disabledReasonsByAction
```

## Target renderer readback shape

```txt
ExchangeRenderReadback:
  active: exchange
  projectionFingerprint
  projectionRowsConsumed
  actionButtonsRendered
  latestResultRendered
  transactionRowsRendered
  disabledReasonRowsRendered
  authorityOwnedByRenderer: false
  sourceFieldsRead:
    - MarketResultProjection.prices
    - MarketResultProjection.capacities
    - MarketResultProjection.actions
    - MarketResultProjection.latestResult
    - MarketResultProjection.transactionJournalTail
```

## Fixture assertions

```txt
- exchange renderer reads MarketResultProjection only
- sell/buy/back buttons match projected action rows
- disabled state matches projected rejection/preflight rows
- latest accepted result is rendered from projection
- latest rejected result is rendered from projection
- transaction row is rendered from transaction projection
- renderer readback does not include resource mutation helpers
- renderer readback does not include price computation helpers
- renderer readback does not include capacity computation helpers
```

## Preserve

```txt
- active-session HUD branch
- generic panel rendering for non-Market screens
- data-command direct active-session buttons for Collect/Clear/Next Phase
- world-canvas drawing baseline
- GameHost engine/getState/tick baseline
```

## Next safe ledge

```txt
ZombieOrchard Market Acceptance Ledger + Exchange Renderer Readback Fixture Gate
```
