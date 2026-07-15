# Architecture audit: RAF clock and fixed-step DSK map

## Summary

The browser host currently owns scheduling and silently converts each RAF callback into one `1/60` simulation step. Runtime domains own time-based mutation, while both renderers consume the resulting snapshot. No domain owns the contract joining wall time, fixed simulation steps, visibility transitions and visible-frame publication.

## Current ownership

```txt
browser host
  owns requestAnimationFrame recursion
  ignores callback timestamp
  submits constant 1 / 60
  renders once after every submitted step

kit-runtime
  clamps submitted delta
  advances frame and elapsed
  ticks every domain
  publishes one unversioned snapshot

pressure-field and active-session
  consume submitted dt for gameplay-rate mutation

Canvas2D and HTML renderers
  consume the post-step snapshot
  publish no clock/frame receipt
```

## Required parent DSK

`zombie-orchard-raf-clock-fixed-step-admission-authority-domain`

## Required subkits

| Kit | Service |
|---|---|
| `host-frame-id-kit` | stable identity for one browser callback |
| `monotonic-clock-sample-kit` | validate RAF/performance timestamps |
| `clock-revision-kit` | version host timing policy |
| `wall-delta-clamp-kit` | cap invalid or excessive wall delta |
| `fixed-step-duration-kit` | declare simulation quantum |
| `fixed-step-accumulator-kit` | carry unconsumed wall time |
| `catch-up-budget-kit` | bound steps per host frame |
| `simulation-step-id-kit` | identify each admitted step |
| `simulation-step-result-kit` | receipt delta, participants and snapshot revision |
| `dropped-time-report-kit` | report discarded or deferred wall time |
| `visibility-transition-kit` | classify hidden and visible transitions |
| `hidden-tab-suspension-kit` | define hidden-tab mutation policy |
| `resume-clock-reset-kit` | reject stale pre-hide timestamp debt |
| `render-once-per-host-frame-kit` | project latest accepted state once |
| `runtime-presentation-revision-kit` | bind step result to both renderers |
| `host-frame-result-kit` | aggregate timing, steps and render result |
| `first-clock-bound-visible-frame-ack-kit` | prove one matching visible frame |
| `clock-fixture-matrix-kit` | 30/60/120 Hz, stalls, hidden-tab and resume proof |

## Command flow

```txt
HostFrameCommand
  -> ClockSampleResult
  -> WallDeltaResult
  -> FixedStepAdmissionResult[]
  -> SimulationStepResult[]
  -> RenderFrameResult
  -> HostFrameResult
  -> FirstClockBoundVisibleFrameAck
```

## Boundary

Core gameplay domains should continue consuming deterministic `dt`. The new authority belongs at the browser-host/scheduler boundary and must not move browser RAF, Canvas2D or DOM implementation into gameplay kits.