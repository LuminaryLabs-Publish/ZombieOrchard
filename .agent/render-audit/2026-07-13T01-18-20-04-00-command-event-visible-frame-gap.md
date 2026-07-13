# Render audit: command event visible-frame gap

**Timestamp:** `2026-07-13T01-18-20-04-00`

## Summary

UI commands can emit events between RAF callbacks, but the next RAF starts with `engine.tick()`, which clears the event buffer before rendering. Canvas and HTML renderers receive no event range or event receipt.

## Plan ledger

**Goal:** make any event-driven visual effect cite the committed event range that caused it.

- [x] Trace browser click to command.
- [x] Trace command event emission.
- [x] Confirm tick clears events before render.
- [x] Confirm both renderers receive event-free snapshots.
- [ ] Add event-aware frame receipts and fixtures.

## Current path

```txt
click
  -> engine.command()
  -> ctx.emit()
  -> notify(event-free snapshot)

next RAF
  -> tick clears ctx.events
  -> tick publishes event-free snapshot
  -> canvas render
  -> HTML render
```

## Missing proof

```txt
render frame ID
snapshot revision
event first/last sequence
event-driven effect receipt
first visible event-frame acknowledgement
```

## Required rule

A visual or audio effect that depends on an event must consume an immutable event envelope exactly once under an explicit coalescing policy and publish a matching frame acknowledgement.
