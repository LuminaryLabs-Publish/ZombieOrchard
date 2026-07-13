# Architecture audit: runtime event lifecycle DSK map

**Timestamp:** `2026-07-13T01-18-20-04-00`

## Summary

The runtime has an event-writing primitive but no event-owning domain. Event state is ambient, mutable and outside normal snapshots.

## Plan ledger

**Goal:** move event identity, retention, publication and consumer progress behind one composed authority.

- [x] Locate event creation and buffer ownership.
- [x] Trace command and tick lifecycle.
- [x] Trace snapshot, subscription and public readback.
- [x] Define parent domain and candidate kits.
- [ ] Implement and validate.

## Current ownership

```txt
kit-runtime
  owns ctx.events
  owns ctx.emit()
  clears the array at tick start
  omits it from snapshot()

scoped-interface domains
  emit selection, field-change and action-request records

composition
  can generate a direct child event and then a nested command

host/renderers
  consume event-free snapshots
```

## Required parent domain

`zombie-orchard-runtime-event-lifecycle-publication-authority-domain`

## Candidate kits

```txt
runtime-event-id-kit
runtime-event-sequence-kit
runtime-event-envelope-kit
event-command-correlation-kit
event-tick-correlation-kit
event-payload-immutability-kit
event-journal-kit
event-buffer-budget-kit
event-retention-policy-kit
event-overflow-result-kit
event-consumer-id-kit
event-consumer-generation-kit
event-consumer-cursor-kit
event-publication-range-kit
event-delivery-result-kit
event-acknowledgement-kit
event-expiry-kit
event-dead-letter-kit
event-readback-kit
event-observation-kit
first-event-frame-ack-kit
command-event-fixture-kit
tick-event-fixture-kit
event-source-dist-pages-parity-fixture-kit
```

## Required transaction

```txt
accepted command or tick
  -> allocate command/tick provenance
  -> allocate monotonic event identity
  -> freeze payload
  -> append to bounded journal
  -> commit state and terminal result
  -> publish immutable snapshot with event range
  -> advance identified consumer cursors
  -> acknowledge, expire or dead-letter explicitly
  -> publish first matching visible-frame acknowledgement
```

## Boundary rule

State snapshots may reference an immutable event range, but consumers must not receive or mutate the live journal storage.
