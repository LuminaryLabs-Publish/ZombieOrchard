# Interaction audit: event emit, publish and consume map

**Timestamp:** `2026-07-13T01-18-20-04-00`

## Summary

The interaction path commits state and emits records, but publication carries only state snapshots.

## Plan ledger

**Goal:** map each interaction to one command result, event range, publication and consumer outcome.

- [x] Trace delegated HTML actions.
- [x] Trace composition activation.
- [x] Trace scoped-domain emissions.
- [x] Trace runtime publication and browser render.
- [ ] Implement typed event results.

## Map

```txt
DOM click
  -> interface-composition.activate
  -> active domain activate
  -> ctx.emit(actionRequested)
  -> optional nested engine.command
  -> command result
  -> notify(snapshot without event range)
  -> next tick clears event
  -> render(snapshot without event range)
```

## Required result set

```txt
CommandCommitResult
EventAppendResult
EventPublicationResult
EventConsumerDeliveryResult
EventRetentionResult
FirstEventFrameAck
```

## Admission rule

A nested command must receive a new command ID while preserving parent command and causal event references.
