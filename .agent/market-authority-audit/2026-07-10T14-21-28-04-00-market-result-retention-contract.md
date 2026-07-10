# Market authority audit: result retention contract

Timestamp: 2026-07-10T14-21-28-04-00

## Authority boundary

The Market authority should not become a renderer branch or one-off economy rewrite. It should be a source/result contract around existing kit-runtime capabilities.

## Current state

```txt
engine.command() returns CommandResult
interface-composition can dispatch nested action.command
resource-ledger can pay/add
inventory-runtime can mutate equipped/items
Exchange domain exists as a scoped interface screen
HTML renderer can show generic interface screens
GameHost exposes raw engine/getState/tick
```

## Contract needed

```txt
Market source manifest
Market action id catalog
Market command envelope
Market price/capacity preflight
Market accepted/rejected result row
nested command result retained by interface-composition
resource transaction history row
inventory purchase intake row
Exchange projection row
HTML renderer readback row
GameHost.market diagnostics row
DOM-free replay fixture
```

## Non-goals

Do not rewrite the runtime. Do not replace the renderer. Do not add new orchard content first. Do not expand the economy until accepted/rejected Market rows are fixture-readable.
