# ZombieOrchard Market Authority Audit — Market Source Result Contract

**Timestamp:** `2026-07-10T08-28-26-04-00`

## Authority today

There is no source-owned Market module yet.

The closest current pieces are:

```txt
orchard-preset.js
  -> exchange screen title and Back action only
  -> resource initial values
  -> construction catalog
  -> roster initial state
  -> inventory initial state

resource-ledger kit
  -> canPay(cost)
  -> pay(cost)
  -> add(values)

inventory-runtime kit
  -> items
  -> equipped
  -> equip command

interface-composition kit
  -> can route to exchange
  -> can dispatch nested action.command
```

## Problem

Market semantics do not have a stable authority surface.

A real Market needs source rows and result rows for:

```txt
action id
label
price
resource kind
inventory item
capacity rule
preflight reason
accepted/rejected/no_mutation status
resource delta
inventory intake
projection row
GameHost readback row
```

## Contract for next cut

Add source-owned modules without breaking existing runtime compatibility:

```txt
src/market/market-actions.js
src/market/market-command-envelope.js
src/market/market-preflight.js
src/market/market-results.js
src/market/market-result-ledger.js
src/market/market-projection.js
src/market/market-gamehost.js
tests/market-result-fixture.mjs
```

## Required compatibility

```txt
engine.command() remains compatible
window.GameHost.engine remains compatible
window.GameHost.getState() remains compatible
window.GameHost.tick remains compatible
existing active-session HUD remains compatible
existing world canvas renderer remains compatible
new Market readback is additive only
```

## Fixture rows to prove

```txt
Market action source rows exist
accepted purchase row exists
rejected insufficient-resource row exists
rejected capacity row exists if capacity policy exists
resource before/after row exists
inventory intake row exists
nested result row is retained
Exchange projection row exists
GameHost.market diagnostics exist
```
