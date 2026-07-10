# ZombieOrchard Gameplay Audit: Market Command Fixture Loop

**Timestamp:** `2026-07-10T00-38-44-04-00`

## Current player loop

```txt
open app
  -> entry screen
  -> Play
  -> active-session HUD
  -> collect apples / clear pests / next phase
  -> Market action routes to exchange screen
  -> exchange currently shows Back only
  -> Build action can dispatch nested construction-runtime build command
  -> construction nested command result is discarded by interface-composition
```

## Current proof surface

`tests/smoke.mjs` proves:

```txt
createOrchardGame()
entry screen exists
Play transitions to active-session
one tick runs
orchard apples exist
```

It does not prove Market behavior.

## Gameplay blocker

Market gameplay cannot safely expand until accepted/rejected action rows are deterministic and fixture-readable.

## Required Market fixture rows

```txt
accepted sell-apples row
accepted buy-basic-tool row
accepted buy-row-supply row
rejected insufficient-resource row
rejected capacity row
no-mutation rejected row
resource transaction row
inventory intake row
nested result retained row
Exchange projection row
GameHost diagnostics row
```

## Next safe ledge

```txt
ZombieOrchard Market Nested Result Ledger Catch-up + Exchange Fixture Gate
```
