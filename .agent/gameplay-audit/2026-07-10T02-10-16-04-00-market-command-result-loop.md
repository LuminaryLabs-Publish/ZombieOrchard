# ZombieOrchard Gameplay Audit: Market Command Result Loop

**Timestamp:** `2026-07-10T02-10-16-04-00`

## Current gameplay loop

```txt
entry
  -> Play
  -> active-session
  -> collect apples / clear / next phase
  -> open Market
  -> exchange generic screen
  -> Back
```

## Current command flow

```txt
data-action click
  -> engine.command("interface-composition", "activate", { actionId })
  -> active screen command returns action descriptor
  -> optional action.command dispatches through ctx.engine.command(...)
  -> nested result is discarded
  -> optional transition moves active screen
```

## Gameplay proof gap

The active session has a playable loop, but Market actions are not a proofable gameplay loop yet.

```txt
- Exchange has no sell/buy action rows.
- Market action IDs are not source-owned.
- Market commands do not have envelopes.
- Market accepted/rejected rows do not exist.
- Rejected no-mutation behavior is not proven.
- Resource transaction rows do not exist.
- Inventory intake rows do not exist.
- Nested command results do not reach interface snapshots.
- GameHost cannot report the last Market result.
```

## Required Market gameplay fixture rows

```txt
accepted sell apples
accepted buy basic tool
accepted buy row supply
rejected insufficient resources
rejected capacity full
back transition preserved
nested result retained
renderer projects last result
GameHost exposes market diagnostics
```

## Next safe gameplay ledge

```txt
ZombieOrchard Market Nested Result Readback Catch-up + Exchange Fixture Gate
```

Do not expand the economy until the above rows are fixture-proven.
