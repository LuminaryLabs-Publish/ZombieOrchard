# Render audit — Route, Simulation and Frame Correlation Gap

**Timestamp:** `2026-07-11T21-40-49-04-00`

## Summary

Canvas and HTML are rendered from the same snapshot object per RAF callback, but that snapshot does not identify the committed route revision, simulation phase, simulation tick or render frame. A Pause or menu frame can therefore visually imply suspension while projecting state mutated during the same or earlier hidden simulation steps.

## Plan ledger

**Goal:** define the minimum presentation receipt needed to prove that a visible route and world frame were produced from the same admitted simulation decision.

- [x] Trace RAF snapshot and both renderers.
- [x] Confirm canvas renders on every route.
- [x] Confirm snapshots omit route/phase/tick/frame provenance.
- [x] Define a shared presentation receipt.
- [ ] Implement and fixture-test parity.

## Current path

```txt
engine.tick(1 / 60)
  -> all simulation domains mutate
  -> snapshot created
  -> canvas renders orchard/session
  -> HTML renders interface-composition.active
```

## Gap

```txt
Pause HTML visible
  does not prove
simulation was suspended before the snapshot
```

The world canvas also remains active under Entry, Run Setup, Settings, management routes and Outcome, so predecessor or hidden-run pixels remain visible without run or route provenance.

## Required frame record

```txt
renderFrameId
runtimeId
runId
sessionEpoch
routeId
routeRevision
simulationPhase
routePolicyId
simulationTickId
simulationStepResultId
stateFingerprint
canvasAcknowledged
htmlAcknowledged
presentedAt
```

## Required proof

```txt
Pause frame -> PAUSED phase -> unchanged simulation fingerprint
Entry frame -> NO_RUN phase -> no hidden tick
management frame -> declared policy -> matching tick result
Outcome frame -> TERMINAL phase -> no post-terminal mutation
canvas, HTML and GameHost -> same frame record
```
