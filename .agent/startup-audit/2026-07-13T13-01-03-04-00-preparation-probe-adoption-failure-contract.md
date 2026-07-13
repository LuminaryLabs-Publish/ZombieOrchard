# Startup audit: preparation, probe, adoption, and failure contract

**Timestamp:** `2026-07-13T13-01-03-04-00`

## Summary

ZombieOrchard needs one startup generation that owns every live browser participant. Candidates must be prepared off the live path, probed, adopted together, and either acknowledged by a first visible frame or retired with a user-visible failure result.

## Plan ledger

**Goal:** define the smallest complete startup contract that prevents partial installation, pre-readiness ticking, silent blank screens, and stale retry ownership.

- [x] Define startup phases and identities.
- [x] Define participant preparation requirements.
- [x] Define probe and atomic adoption rules.
- [x] Define failure, disposal, fallback, and retry rules.
- [x] Define readiness and first-frame proof.
- [ ] Implement and execute the contract.

## State machine

```txt
Idle
  -> Preparing
  -> Probing
  -> Ready
  -> Retiring
  -> Retired

Preparing | Probing
  -> Failed
  -> Disposing
  -> FailedVisible | Retired

FailedVisible
  -> Preparing successor generation when retry policy permits
```

## Invariants

```txt
one document generation owns at most one live startup generation
no candidate publishes GameHost before adoption
no scheduler can tick a candidate engine
all required DOM and capability checks precede live adoption
all participant receipts cite one StartupAttemptId
probe failure disposes every prepared candidate
Ready requires all participant adoption receipts
first-frame acknowledgement cites the accepted startup generation
retry cannot revive or mutate a retired generation
failure projection must not depend on the failed canvas renderer
```

## Participant contract

```txt
engine candidate
  -> complete kit manifest
  -> all 19 domains installed
  -> detached initial snapshot
  -> disposal/retirement capability

canvas candidate
  -> valid canvas node
  -> non-null 2D context
  -> successful detached/probe projection

HTML candidate
  -> valid root
  -> delegated listener preparation
  -> successful probe projection

scheduler candidate
  -> not started during preparation
  -> generation-bound start and stop capability

diagnostics candidate
  -> detached capability object
  -> published only after Ready
```

## Terminal results

```txt
StartupReadyResult
StartupFailureResult
StartupCancelledResult
StartupSupersededResult
StartupRetirementResult
FirstStartupFrameAck
```

## Failure fallback

The existing `#error-panel` should be owned by a minimal DOM-only failure projector. It must receive a detached failure summary, expose a bounded retry action where safe, and remain independent of the failed engine, canvas context, HTML interface renderer, and RAF scheduler.

## Validation boundary

Contract only. No startup implementation exists yet.