# Render audit — Save Slot and Restored Frame Gap

## Plan ledger

**Goal:** ensure Save Select, save results, load results and the first restored world frame all cite one authoritative slot, load epoch and durable-state fingerprint.

- [x] Trace HTML slot projection.
- [x] Trace world canvas projection.
- [x] Trace GameHost snapshot readback.
- [x] Identify missing save/load/frame correlation.
- [x] Define the required restored-frame receipt.
- [ ] Implement browser proof.

## Current render path

```txt
engine.snapshot()
  -> world.render(snapshot)
  -> ui.render(snapshot)
  -> GameHost.getState() samples live engine again
```

The canvas renders orchard and active-session state on every route. The HTML renderer uses `current.meta.slots` only when `session-select` is active. No renderer receives save identity, slot revision, schema version, load epoch or committed frame identity.

## Current Save Select projection

```txt
active === session-select
  -> cards("Slots", current.meta?.slots || [])
```

The preset supplies no `meta.slots`, so the screen is empty even if reached manually. There is no authoritative slot index, compatibility state, corruption state or command result.

## Current world projection risk

A future naïve load could mutate domains sequentially while the recursive RAF continues. Canvas and HTML could then render different mixtures of predecessor and candidate state because there is no frame commit barrier or load epoch.

```txt
load begins
  -> resource state replaced
  -> RAF renders
  -> orchard state replaced
  -> RAF renders
  -> active-session state replaced
```

This partial-frame sequence must be impossible.

## Required Save Select frame

```txt
renderFrameId
slotIndexRevision
activeSaveId
slots[]:
  slotId
  slotRevision
  label
  updatedAt
  schemaVersion
  runSummary
  compatibility
  corruption
  actions
latestPersistenceResult
```

## Required first restored frame receipt

```txt
renderFrameId
loadCommandId
loadTransactionId
loadEpoch
saveId
slotId
slotRevision
schemaVersion
restoredRunId
restoredSessionEpoch
restoredSimulationTickId
restoredStateFingerprint
canvasAcknowledged
htmlAcknowledged
gameHostAcknowledged
```

## Commit rule

```txt
candidate graph validated
  -> load authority commits
  -> one committed presentation snapshot created
  -> canvas renders snapshot
  -> HTML renders same snapshot
  -> GameHost exposes same committed snapshot
  -> first-restored-frame receipt accepted
  -> predecessor graph can retire
```

If any required projection fails before acknowledgement, the prior committed graph remains visible and authoritative.

## Required browser fixtures

```txt
Save Select route and slot list
slot conflict result projection
migration result projection
corrupt slot projection
successful load first-frame parity
failed load retains predecessor frame
no mixed predecessor/candidate frame
no stale predecessor frame after load epoch
repeated loads retain one RAF and one listener
```

## Validation status

Documentation only. No renderer behavior changed, and no restored-frame coherence claim is made.