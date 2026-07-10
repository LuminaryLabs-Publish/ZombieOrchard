# Gameplay Audit — Market Command Resource Loop

## Timestamp

```txt
2026-07-10T11-20-54-04-00
```

## Current gameplay loop

```txt
active-session starts
player collects apples
resource-ledger adds apples and money
player can clear pests
construction can pay resource cost to build
roster can pay money to hire
inventory can equip items
interface actions can route through composition
```

## Market-specific gap

The ingredients for Market gameplay exist, but they are not bound by a Market proof loop.

```txt
resource-ledger can pay/add
inventory-runtime can equip
interface-composition can dispatch nested commands
engine.command returns results
nested results are dropped
Exchange has no accepted/rejected Market projection
GameHost has no Market diagnostics
```

## Required Market loop

```txt
open Exchange
  -> render stable Market action catalog
  -> choose Market action
  -> create command envelope
  -> run price/capacity preflight
  -> dispatch command
  -> retain nested command result
  -> write resource transaction row
  -> write inventory intake row
  -> project accepted/rejected result into Exchange
  -> expose GameHost.market rows
  -> fixture proves accepted and rejected cases
```

## Next safe ledge

```txt
ZombieOrchard Market Result Retention Readback Ledger Refresh + GameHost Fixture Gate
```
