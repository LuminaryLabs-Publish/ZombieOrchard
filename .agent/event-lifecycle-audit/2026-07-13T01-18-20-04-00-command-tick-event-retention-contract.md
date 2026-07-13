# Event lifecycle audit: command/tick retention contract

**Timestamp:** `2026-07-13T01-18-20-04-00`

## Summary

The current event buffer is neither a transient frame buffer with documented consumers nor a durable journal. Its clearing boundary is tied to tick entry rather than consumer completion.

## Plan ledger

**Goal:** define event append, retention, acknowledgement, expiry and overflow semantics.

- [x] Record current append and clear boundaries.
- [x] Record current readers and omissions.
- [x] Define required event envelope.
- [x] Define required consumer cursor.
- [ ] Implement contract and fixtures.

## Required event envelope

```txt
eventId
sequence
predecessorSequence
runtimeSessionId
runGeneration
commandId or tickId
parentCommandId
type
immutable payload
stateRevision
frame
elapsed
createdAtLogical
fingerprint
```

## Required retention policy

```txt
append
  -> retain until required consumer cursors advance
  -> or explicit expiry occurs
  -> or bounded overflow policy produces a typed result

never
  -> clear because a RAF tick began
  -> expose mutable journal storage
  -> silently overwrite or drop required events
```

## Required consumer contract

```txt
consumer identity and generation
subscription start sequence
monotonic cursor
delivery result
acknowledgement result
retirement result
replay/resume policy
```
