# Command transaction audit: prepare, commit and rollback contract

## Authority

```txt
zombie-orchard-composite-command-transaction-authority-domain
```

## Transaction phases

```txt
RECEIVED
  -> ADMITTED
  -> RESOLVED
  -> PREPARED
  -> COMMITTED
  -> PUBLISHED
  -> FRAME_ACKNOWLEDGED
```

Stable alternate outcomes:

```txt
REJECTED_ADMISSION
REJECTED_RESOLUTION
REJECTED_PARTICIPANT
ROLLED_BACK
FAILED_COMMIT
ACCEPTED_DUPLICATE
SUPERSEDED_FRAME
```

## Prepare contract

Preparation may read authoritative snapshots and reserve deterministic IDs, but it must not mutate domain state, emit public events, notify subscribers or alter render surfaces.

Each participant returns:

```txt
participantId
status
beforeFingerprint
preparedDelta
reservedIds
reason
```

## Commit contract

Commit consumes only a validated prepared delta. Every participant returns an after fingerprint and receipt. The coordinator advances the aggregate state revision only after all required participants commit.

## Rollback contract

If commit can fail after preparation, participants must either:

1. commit into detached candidate ownership and atomically swap authority, or
2. provide an inverse operation with a tested rollback receipt.

Detached candidate ownership is preferred for world replacement, collection refill and entity creation.

## Idempotency

```txt
new commandId
  -> process normally

accepted duplicate commandId
  -> return original AggregateCommandResult
  -> perform no mutation or publication

conflicting duplicate commandId
  -> reject identity conflict
```

## Publication contract

Events, subscriber snapshots and render invalidation are buffered until commit. One aggregate event batch and one committed observation are published per command transaction.

## Required journal row

```txt
commandId
transactionId
source
receivedRevision
status
participantResults
beforeFingerprint
afterFingerprint
publishedRevision
canvasFrameId
htmlFrameId
timestampPolicy
```

## Participant-specific rules

- Resource payment and resulting construction/hire entity are one transaction.
- Apple removal, replacement generation, reward, pressure, score and message are one transaction.
- Pest damage/retirement, scrap, score and message are one transaction.
- Child gameplay command and route transition are one transaction when the route depends on child success.
- Equipment admission validates item ownership before commit.

## Do not implement as

```txt
nested engine.command calls
best-effort optional participant calls
message-string success inference
catch-and-continue partial mutation
multiple notify calls
raw snapshot comparison without canonical fingerprints
```