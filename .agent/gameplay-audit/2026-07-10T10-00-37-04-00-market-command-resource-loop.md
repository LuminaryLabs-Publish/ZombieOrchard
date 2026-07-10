# Gameplay audit — Market command resource loop

## Current loop

```txt
player enters active session
  -> interface exposes generic actions
  -> data-action activates a screen/action
  -> optional nested action.command dispatches to engine.command
  -> engine command returns a result
  -> resource/inventory domains may change
  -> nested result is discarded by interface composition
  -> UI cannot explain accepted/rejected/no-op Market outcome
```

## Current implemented gameplay services

- session setup and active-session state
- construction domain commands
- roster and inventory runtime state
- resource ledger state
- pressure field state
- orchard world tick/snapshot
- command result return from runtime engine

## Missing Market gameplay proof

```txt
stable Market action catalog
Market action source rows
price source rows
capacity policy rows
preflight accepted/rejected rows
resource transaction history
inventory purchase intake rows
accepted/rejected/no_mutation command result rows
nested result retention
GameHost.market readback
DOM-free fixture replay
```

## Main gameplay blocker

Market actions cannot be trusted until the interface layer preserves the command result and records resource/inventory deltas. Otherwise the game can mutate correctly while the UI and diagnostics lose the reason trail.

## Next gameplay cut

Add Market proof without changing economy tuning:

```txt
Market action -> preflight -> command -> retained result -> resource delta -> projection/readback -> fixture assertion
```
