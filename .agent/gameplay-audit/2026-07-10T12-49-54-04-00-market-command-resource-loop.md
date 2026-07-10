# Gameplay audit — Market Command Resource Loop

## Timestamp

`2026-07-10T12-49-54-04-00`

## Current gameplay loop

```txt
active-session
  -> player collects apples
  -> resource-ledger gains apples/money
  -> player can open Build, Market, Roster, Inventory, Codex
  -> construction action can dispatch nested build command
  -> Market currently routes to exchange screen only
```

## Existing command services

`resource-ledger-kit` already supports:

```txt
canPay(cost)
pay(cost)
add(values)
```

`inventory-runtime-kit` already supports:

```txt
equip(id)
snapshot items/equipped
```

`construction-runtime-kit` already proves the shape of a purchase-like command:

```txt
pay item cost
append built item
set message
return { accepted: true }
```

## Gameplay gap

Market does not yet have source-owned command rows.

A valid Market proof path needs:

```txt
Market action catalog
  -> price rows
  -> capacity rows
  -> preflight rows
  -> command result rows
  -> resource transaction rows
  -> inventory intake rows
  -> Exchange projection rows
```

## Accepted path fixture target

```txt
start engine
transition to active-session
add enough resources if needed
transition to exchange
activate market buy action
assert nested command result retained
assert money/apples/wood/scrap delta row exists
assert inventory intake row exists
assert Exchange projection reports last accepted result
```

## Rejected path fixture target

```txt
start engine
transition to exchange
activate unaffordable Market action
assert nested command result retained
assert stable rejection reason
assert no resource delta applied
assert no inventory intake row added
assert Exchange projection reports rejected result
```

## Main finding

Market gameplay should be proved as command/resource/inventory rows before adding economy depth or content.
