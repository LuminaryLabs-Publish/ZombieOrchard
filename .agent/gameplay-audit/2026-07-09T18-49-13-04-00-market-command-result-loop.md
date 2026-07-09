# ZombieOrchard Market Command Result Loop

**Timestamp:** `2026-07-09T18-49-13-04-00`

## Current gameplay loop

```txt
entry
  -> play
  -> active-session
  -> collect apples
  -> clear pests
  -> next phase
  -> open Build / Market / Roster / Inventory / Codex / Settings
  -> generic screen actions route back or trigger optional nested commands
```

## Current Market loop

```txt
active-session Market action
  -> exchange screen
  -> generic Market panel
  -> Back only
```

## Current command result behavior

`createKitRuntime.command()` returns results.

`interface-composition.activate` does not retain nested results from `action.command`.

## Gameplay gap

The Market cannot yet prove:

```txt
accepted sell
accepted buy
rejected insufficient resource
rejected capacity
no mutation for rejected rows
transaction history
inventory intake
Exchange readback
GameHost diagnostics
```

## Next gameplay-safe ledge

```txt
ZombieOrchard Market Nested Result Readback Refresh + Exchange Fixture Gate
```
