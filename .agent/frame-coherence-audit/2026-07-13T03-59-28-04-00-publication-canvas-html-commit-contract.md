# Frame-coherence audit: publication, canvas, and HTML commit contract

**Timestamp:** `2026-07-13T03-59-28-04-00`

## Summary

ZombieOrchard needs one contract that separates committed runtime state, observer publication, canvas projection, HTML projection, browser visibility, and diagnostics while binding them through stable identities.

## Plan ledger

**Goal:** define the exact invariants required for a coherent dual-surface frame.

- [x] Identify current snapshot and projection boundaries.
- [x] Define identity and predecessor requirements.
- [x] Define complete, partial, failed, stale, and superseded outcomes.
- [x] Define diagnostics and acknowledgement requirements.
- [ ] Implement and validate the contract.

## Contract invariants

### One state envelope

```txt
one accepted runtime transition
  -> one StateRevision
  -> one PublicationId
  -> one immutable FrameEnvelopeId
  -> one canonical FrameFingerprint
```

Subscribers and renderers must consume the same immutable envelope. No second live snapshot may silently replace it inside one transaction.

### Explicit surface admission

Canvas admission must cite:

```txt
CanvasSurfaceId
CanvasSurfaceRevision
ViewportRevision
CanvasProjectionRevision
FrameEnvelopeId
```

HTML admission must cite:

```txt
HtmlSurfaceId
HtmlSurfaceRevision
RouteRevision
HtmlProjectionRevision
FrameEnvelopeId
```

### Explicit visibility policy

Every interface route must declare one world-canvas policy:

```txt
visible
visible-dimmed
frozen-last-complete
hidden
```

The policy must be part of the frame fingerprint.

### Terminal surface results

Each surface returns exactly one terminal result:

```txt
applied
rejected-stale
rejected-invalid
failed
superseded
skipped-by-policy
```

### Combined frame result

```txt
complete
partial
failed
stale
superseded
```

A frame is complete only when every required surface returns an accepted terminal result for the same `FrameEnvelopeId`.

### Recovery

```txt
partial or failed frame
  -> retain last complete frame identity
  -> preserve fault and surface results
  -> apply explicit retry, restore, degrade, or supersede policy
  -> schedule successor work independently
```

### Diagnostics

`GameHost` must expose:

```txt
lastCommittedStateRevision
lastPublishedFrameEnvelope
lastCompleteVisibleFrame
lastCanvasProjectionResult
lastHtmlProjectionResult
lastDualSurfaceFrameResult
```

A fresh runtime snapshot is not a visible-frame receipt.

### Acknowledgement

```txt
FirstDualSurfaceFrameAck {
  visibleFrameAckId,
  frameCommitId,
  frameEnvelopeId,
  stateRevision,
  canvasSurfaceRevision,
  htmlSurfaceRevision,
  visibleFingerprint,
  acknowledgedAt
}
```

## Current violations

```txt
notify snapshot and tick return snapshot are independently captured
runtime timing and frame identity are absent from snapshots
canvas and HTML mutate sequentially
surface results are absent
route/world visibility is implicit
partial frame recovery is absent
visible diagnostics readback is absent
first visible frame acknowledgement is absent
```

## Required proof matrix

| Case | Required proof |
|---|---|
| normal frame | identical envelope and fingerprint across subscribers, canvas, HTML, and diagnostics |
| reentrant subscriber | no split publication/render state |
| route transition | declared world visibility policy and matching surface revisions |
| canvas failure | typed result, preserved HTML policy, continued scheduler |
| HTML failure | typed partial result and last-complete-frame retention |
| rapid command burst | stale/superseded envelopes rejected deterministically |
| outcome transition | route and world projection commit under one frame ID |
| deployed build | source, dist, and Pages produce equivalent results |

## Non-claims

This document defines a target contract only. No runtime or renderer currently satisfies these invariants.
