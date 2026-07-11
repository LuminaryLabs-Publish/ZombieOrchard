# Automatic / Manual Tick Admission Map

**Timestamp:** `2026-07-11T12-01-38-04-00`

## Summary

The automatic RAF path and `GameHost.tick(dt)` both call `engine.tick()` directly. There is no ownership token, session/epoch check or mutual exclusion.

## Current paths

```txt
automatic:
  requestAnimationFrame(draw)
    -> engine.tick(1/60)

manual/debug:
  GameHost.tick(dt)
    -> engine.tick(dt)
```

Both paths advance elapsed time and frame count, clear events, tick every domain, publish subscribers and return a snapshot.

## Required admission

```txt
TickCommand
  source: automatic | manual-debug | fixture
  sessionId
  sessionEpoch
  clockRevision
  commandId
  wallTimestamp or requestedStepCount
  debugLeaseId or null
```

## Rules

1. Automatic mode requires the current RAF/clock lease.
2. Manual stepping is rejected while automatic mode owns the session.
3. Manual mode requires an explicit debug lease bound to session and epoch.
4. A stale lease rejects after reset, stop or disposal.
5. Manual stepping requests a step count, not arbitrary product delta.
6. Each accepted step produces exactly one committed-tick receipt.
7. Fixtures may inject wall-time schedules through a separate deterministic adapter.
8. Default `GameHost` exposes observations, not raw tick mutation.

## Result reasons

```txt
accepted
stale-session
stale-epoch
stale-clock-revision
automatic-clock-active
manual-mode-disabled
missing-debug-lease
stale-debug-lease
invalid-step-count
terminal-session
disposed
```

## Proof

```txt
automatic + manual race -> one accepted owner only
stale debug lease -> no frame/elapsed/domain mutation
manual step 1 -> one tick receipt
manual step N -> N ordered receipts
restart -> old automatic callback and old debug lease reject
```
