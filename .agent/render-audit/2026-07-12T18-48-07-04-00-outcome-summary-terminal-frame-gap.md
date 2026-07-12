# Render audit: Outcome summary terminal frame gap

**Timestamp:** `2026-07-12T18-48-07-04-00`

## Summary

The Outcome screen is visually terminal but data-wise live. It reads mutable active-session score and day each render and has no terminal result or frame revision.

## Plan ledger

**Goal:** bind the first and every subsequent Outcome frame to one immutable terminal result.

- [x] Trace Outcome HTML data sources.
- [x] Trace canvas data sources after failure.
- [x] Identify missing result/frame provenance.
- [x] Define immutable projection requirements.
- [ ] Implement and test the render contract.

## Current projection

```txt
interface-composition.active = outcome
  -> html renderer reads current active-session snapshot
  -> cards display current score and day

canvas
  -> continues to render current orchard and session snapshots
  -> has no terminal overlay or result revision
```

## Gap

```txt
terminalResultId: absent
terminalRevision: absent
frozenSummary: absent
outcomeFramePlan: absent
canvas/HTML shared frame receipt: absent
first visible Outcome acknowledgement: absent
stale terminal result rejection: absent
```

## Required frame plan

```txt
TerminalOutcomeFramePlan
  frameId
  terminalOutcomeId
  terminalRevision
  routeRevision
  frozenScore
  frozenDay
  frozenCause
  frozenParticipantFingerprint
  canvasProjectionRevision
  htmlProjectionRevision
```

## Required rendering behavior

```txt
accepted terminal result
  -> build immutable Outcome read model
  -> prepare canvas and HTML from same terminal revision
  -> reject stale preparation
  -> commit both projections
  -> acknowledge first visible frame
  -> keep later frames byte/semantic equivalent unless presentation-only state changes
```

## Proof

```txt
post-terminal rejected commands do not change Outcome text
later ticks do not change frozen score/day
canvas and HTML cite same terminal revision
source, dist and Pages project equivalent terminal summaries
```
