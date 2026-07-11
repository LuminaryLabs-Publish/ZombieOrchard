# Architecture audit: fixed-step clock authority DSK map

## Timestamp

`2026-07-11T15-20-27-04-00`

## Current boundary

```txt
src/start.js RAF
  -> engine.tick(1 / 60)
  -> kit runtime trusts caller delta
  -> every domain ticks once
  -> render once
```

This is a callback-count clock, not a wall-time fixed-step clock.

## Required parent domain

```txt
zombie-orchard-fixed-step-clock-authority-domain
```

## DSK composition

```txt
clock-descriptor-kit
  fixedStep
  maxFrameDelta
  maxCatchupSteps
  overflowPolicy

monotonic-wall-time-sample-kit
  callback timestamp
  prior baseline
  accepted frame delta

wall-time-baseline-kit
  initialize
  pause reset
  visibility reset
  session-handoff reset

fixed-step-accumulator-kit
  accepted delta accumulation
  zero-or-more fixed ticks
  remainder retention

lifecycle-tick-admission-kit
  runtime/session/epoch validation
  running/paused/disposed policy
  stale callback rejection

simulation-tick-id-kit
  monotonic committed tick identity

simulation-tick-result-kit
  before/after tick identity
  accepted domain set
  event summary
  state fingerprint hook

clock-catchup-budget-kit
  bounded steps per callback
  work-budget result

clock-overrun-policy-kit
  defer, clamp or drop decision

dropped-time-result-kit
  explicit discarded/deferred duration
  reason and clock revision

pause-clock-barrier-kit
  stop simulation mutation
  preserve or discard accumulator by policy

visibility-resume-policy-kit
  reset wall-time baseline
  prevent hidden background catch-up

automatic-tick-lease-kit
  exclusive automatic mutation ownership

manual-step-command-kit
  explicit debug step count
  session and observed-revision admission

manual-automatic-exclusion-kit
  reject competing mutation paths

render-frame-id-kit
  independent presentation identity

committed-tick-receipt-kit
  latest committed simulation tick

render-frame-clock-ack-kit
  session, epoch, tick, clock revision and render frame

clock-observation-kit
  clone-safe current clock state

clock-journal-kit
  bounded samples, ticks, overruns and state transitions

cadence-parity-fixture-kit
pause-stall-manual-step-fixture-kit
```

## Dependency rule

Gate 2 must consume these Gate 1 identities:

```txt
runtimeId
sessionId
sessionEpoch
lifecycleState
lifecycleRevision
callback generation
```

It must not create parallel runtime, session or epoch authority.

## Promotion guidance

Generic accumulator, tick-result and render-ack contracts may be promoted after proof in more than one product. Orchard pressure rates, phase behavior, pest behavior, pause semantics and debug bindings remain product-local.