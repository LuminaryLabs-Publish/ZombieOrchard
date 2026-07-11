# Render Frame / Simulation Tick Identity Gap

**Timestamp:** `2026-07-11T12-01-38-04-00`

## Summary

The world canvas and HTML renderer consume the aggregate snapshot returned by `engine.tick()`, but neither projection records a render frame ID or the committed simulation tick it consumed.

## Current path

```txt
engine.tick(1/60)
  -> mutate every domain
  -> aggregate snapshot
  -> world.render(snapshot)
  -> ui.render(snapshot)
  -> request next RAF
```

## Gaps

```txt
ctx.frame is incremented per tick call, not per browser render
manual ticks may occur without rendering
automatic tick and render are not transactionally correlated
world and HTML projections publish no frame receipts
no state fingerprint proves both projections consumed the same state
no first-frame acknowledgement exists after start, reset, pause or outcome
```

## Required frame receipt

```txt
renderFrameId
sessionId
sessionEpoch
clockRevision
latestSimulationTickId
stateFingerprint
worldProjectionStatus
htmlProjectionStatus
presentedAt
```

## Required behavior

1. Run zero or more fixed simulation ticks from the wall-time accumulator.
2. Freeze one immutable committed snapshot.
3. Render canvas and HTML from that same snapshot.
4. Publish one frame receipt only after both projections complete.
5. Keep rejected/pending command results until a frame acknowledges their committed tick.
6. Reject stale renderer work after session or epoch transfer.

## Proof

```txt
manual step without render -> committed tick exists, frame receipt absent
next render -> acknowledges latest tick exactly once
world and HTML -> same state fingerprint
double render without tick -> distinct frame IDs, same tick ID
session reset -> old renderer cannot acknowledge new session
```
