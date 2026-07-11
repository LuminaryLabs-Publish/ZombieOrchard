# Render audit: Random Decision to Frame Correlation Gap

## Plan ledger

**Goal:** define the evidence required to prove which seeded decisions produced the apples and pests visible in a committed canvas, HTML and public-host frame.

- [x] Trace random decisions into orchard and pest snapshots.
- [x] Trace snapshots into canvas and HTML renderers.
- [x] Identify missing random, tick and frame provenance.
- [x] Define required render receipts.
- [ ] Implement after session, clock and random authorities.

## Current render path

```txt
Math.random decisions
  -> mutate apples or pests
  -> engine.snapshot()
  -> world.render(snapshot)
  -> ui.render(snapshot)
  -> GameHost.getState()
```

The snapshot exposes entity positions and kinds but not:

```txt
runSeed
randomPolicyVersion
streamId
streamCursor
randomDecisionId
simulationTickId
transactionId
stateFingerprint
renderFrameId
```

## Consequence

Two visually similar frames cannot be proven to come from the same seed and command/tick history. A divergent apple or pest can be observed, but the first differing random decision cannot be located from the frame.

## Required frame receipt

Every committed presentation should expose:

```txt
runtimeId
sessionId
runId
sessionEpoch
simulationTickId
renderFrameId
randomPolicyVersion
seedFingerprint
randomReceiptRange
stateFingerprint
canvasAcknowledged
htmlAcknowledged
hostAcknowledged
```

Entity observations should carry deterministic identity and creation provenance:

```txt
entityId
entityType
createdAtTickId
creationTransactionId
randomReceiptIds
```

## Required proof

```txt
same seed + same admitted command/tick schedule
  -> same random receipts
  -> same durable-state fingerprints
  -> same visible entity identities and transforms
  -> same canvas/HTML/GameHost frame acknowledgement

different seed
  -> explicit seed fingerprint difference
  -> deterministic but intentionally different entity sequence
```

No render-replay correlation currently exists.