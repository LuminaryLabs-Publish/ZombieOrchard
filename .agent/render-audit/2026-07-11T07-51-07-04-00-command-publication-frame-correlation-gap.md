# Command publication and frame-correlation gap

## Audit timestamp

```txt
2026-07-11T07-51-07-04-00
```

## Goal

Define how one committed composite command becomes one aggregate snapshot and one acknowledged rendered frame without exposing intermediate child state.

## Current render path

```txt
command mutation
  -> engine.notify()
  -> subscriber snapshots, if any

next RAF
  -> engine.tick(1 / 60)
  -> engine.notify()
  -> engine.snapshot()
  -> world.render(snapshot)
  -> ui.render(snapshot)
```

The current HTML click path does not explicitly render from the command result. Rendering normally waits for the next RAF, while subscribers can receive nested child and parent publications before that frame.

## Current publication defect

```txt
outer interface-composition command
  -> nested child engine.command
  -> child notify with partial/final child state
  -> parent completion
  -> outer notify
  -> later tick notify
  -> later canvas/HTML render
```

There is no proof of which publication or command the visible frame consumed.

## Missing render provenance

```txt
runtimeId
sessionId
sessionEpoch
commandId
transactionId
committedTickId
snapshotRevision
stateFingerprint
renderFrameId
firstConsumerAcknowledgement
```

Neither `world-canvas-render-kit` nor `html-interface-render-kit` returns a render receipt. `GameHost` exposes only the current aggregate snapshot and raw engine handle.

## Required render contract

```txt
transaction commit
  -> create committed snapshot envelope
  -> publish exactly once
  -> render loop consumes newest admitted envelope
  -> canvas renderer returns consumption receipt
  -> HTML renderer returns consumption receipt
  -> frame authority publishes one combined frame acknowledgement
```

Required snapshot envelope:

```txt
snapshotRevision
runtimeId
sessionId
sessionEpoch
committedTickId
lastCommandId
lastTransactionId
stateFingerprint
domains
```

Required frame acknowledgement:

```txt
renderFrameId
snapshotRevision
stateFingerprint
commandId
transactionId
canvasConsumed
htmlConsumed
presentedAt
```

## Stale-state policy

- Reject snapshots from retired session epochs.
- Never render a staged or rolling-back transaction state.
- Coalesce multiple committed snapshots only under an explicit policy.
- Preserve the first frame that consumes each externally acknowledged command result.
- Keep render receipts detached from mutable domain objects.

## Fixture gate

```txt
valid shed build
  -> one committed snapshot
  -> one visible debit/build transition
  -> one first-frame acknowledgement

rejected shed build
  -> one rejected result publication
  -> no changed gameplay fingerprint
  -> frame may acknowledge unchanged fingerprint with rejection metadata

rolled-back child failure
  -> no partial debit/build frame is observable

rapid duplicate click
  -> one committed transaction
  -> one effect-bearing frame
```
