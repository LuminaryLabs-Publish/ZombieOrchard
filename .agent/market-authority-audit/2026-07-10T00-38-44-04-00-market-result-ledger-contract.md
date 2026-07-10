# ZombieOrchard Market Authority Audit: Market Result Ledger Contract

**Timestamp:** `2026-07-10T00-38-44-04-00`

## Contract goal

Market actions should become source-owned, command-result-backed, renderer-readable, GameHost-readable, and fixture-proven.

## Required action IDs

```txt
sell-apples
buy-basic-tool
buy-row-supply
back
```

## Required command envelope fields

```txt
id
type
actionId
source
resourceDelta
inventoryDelta
expectedMutation
```

## Required result fields

```txt
id
accepted
reason
actionId
before
after
resourceDelta
inventoryDelta
transactionRows
intakeRows
renderProjection
```

## Required rejection reasons

```txt
unknown-action
insufficient-resource
capacity-full
missing-source
unsupported-command
```

## Required proof rows

```txt
source manifest row
before snapshot row
preflight row
accepted result row
rejected result row
no-mutation rejected row
transaction history row
inventory intake row
nested result retention row
renderer readback row
GameHost diagnostics row
fixture replay row
```

## Compatibility rule

Preserve current `window.GameHost.engine`, `window.GameHost.getState`, and `window.GameHost.tick`.

Add Market diagnostics as an additive field only.
