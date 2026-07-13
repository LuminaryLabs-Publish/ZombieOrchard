# Frame-coherence audit: central reconciliation contract

**Timestamp:** `2026-07-13T07-41-11-04-00`

## Summary

This contract preserves the existing source-backed boundary and specifies the minimum transaction needed to prove that runtime publication, canvas projection, HTML projection, diagnostics, and the browser-visible frame agree.

## Plan ledger

**Goal:** define identities, terminal states, invariants, and proof gates for one complete dual-surface frame.

- [x] Define immutable frame-envelope requirements.
- [x] Define per-surface preparation and application receipts.
- [x] Define terminal commit classifications.
- [x] Define predecessor preservation and recovery.
- [x] Define visible readback and acknowledgement.
- [ ] Implement the contract.
- [ ] Execute the fixture matrix.

## Frame envelope

```txt
FrameEnvelope {
  runtimeSessionId,
  runGeneration,
  stateRevision,
  publicationId,
  frameEnvelopeId,
  frameFingerprint,
  routeRevision,
  simulationTickId,
  immutableSnapshot
}
```

## Surface receipt

```txt
SurfaceProjectionResult {
  surfaceId,
  surfaceRevision,
  projectionRevision,
  frameEnvelopeId,
  accepted,
  applied,
  reason,
  visibleFingerprint
}
```

## Commit result

```txt
DualSurfaceFrameCommitResult {
  frameCommitId,
  frameEnvelopeId,
  canvasResult,
  htmlResult,
  classification,
  predecessorCompleteFrameId,
  recoveryResult
}
```

## Invariants

```txt
one committed StateRevision -> at most one canonical FrameEnvelope
observers and renderers consume the exact same envelope object/value
both surface receipts cite the same FrameEnvelopeId
complete requires both surfaces applied under current revisions
partial is never reported as complete
failed or stale frames do not replace lastCompleteFrame
visible readback returns lastCompleteFrame and both receipts
first acknowledgement cites a complete frame only
```

## Terminal classifications

```txt
complete
partial
failed
stale
superseded
cancelled
recovered
```

## Required fixtures

```txt
one tick -> one envelope
subscriber and renderers -> same envelope ID and fingerprint
reentrant subscriber -> no publication/render split
canvas + HTML success -> complete
canvas success + HTML failure -> partial and continued scheduler
canvas failure -> declared HTML degradation result
stale route or viewport -> zero-mutation rejection
GameHost visible readback -> last complete frame
source/dist/Pages -> equivalent receipts
```

## Non-claims

This contract is documentation. It does not prove implementation, browser atomicity, recovery, or deployment parity.