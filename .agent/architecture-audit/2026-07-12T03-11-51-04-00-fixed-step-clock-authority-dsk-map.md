# Architecture audit: fixed-step clock authority DSK map

## Current topology

```txt
browser requestAnimationFrame
  -> start.draw()
  -> engine.tick(1 / 60)
  -> ctx.delta = clamp(delta, 0, 0.1)
  -> ctx.elapsed += delta
  -> ctx.frame += 1
  -> every domain.tick(delta)
  -> snapshot + notify
  -> canvas render
  -> HTML render

window.GameHost.tick(dt)
  -> same engine.tick path
  -> no exclusion from RAF writer
```

## Authority defect

The runtime has a tick function but no clock domain. Display callback count is treated as elapsed simulation time, and the public host exposes a second writer to the same state.

Missing identities and policies:

```txt
runtime clock source
simulation epoch
simulation step ID
step-writer lease
fixed-step duration policy
wall-time accumulator
catch-up budget
lag-drop classification
visibility suspension generation
manual-step capability
step admission/result
publication batch ID
committed simulation-frame receipt
```

## Required parent domain

```txt
zombie-orchard-fixed-step-clock-authority-domain
```

## DSK composition

| Kit | Responsibility |
|---|---|
| `runtime-clock-source-kit` | monotonic wall-time source and test clock injection |
| `frame-time-observation-kit` | normalized browser timestamp samples |
| `simulation-epoch-kit` | identity for one runtime/reset generation |
| `simulation-step-id-kit` | monotonic step identity within an epoch |
| `step-writer-lease-kit` | exclusive automatic or manual step ownership |
| `fixed-step-policy-kit` | canonical step size, default `1 / 60` |
| `simulation-accumulator-kit` | bounded wall-time accumulation |
| `catch-up-budget-kit` | maximum steps and work per browser frame |
| `lag-drop-policy-kit` | explicit classification of discarded excess time |
| `visibility-suspension-kit` | hidden-tab barrier and resume generation |
| `manual-step-capability-kit` | privileged deterministic stepping policy |
| `simulation-step-command-kit` | immutable automatic/manual step request |
| `simulation-step-admission-kit` | session, epoch, writer, visibility, sequence and delta checks |
| `simulation-step-result-kit` | accepted/rejected step range and reasons |
| `tick-publication-barrier-kit` | one snapshot/notification after an admitted batch |
| `simulation-clock-observation-kit` | detached clock, accumulator and lag read model |
| `simulation-clock-journal-kit` | bounded samples, batches, rejections and lag events |
| `simulation-frame-receipt-kit` | rendered frame linked to committed step range |
| `cadence-parity-fixture-kit` | 30/60/120 and variable-cadence state parity |
| `manual-auto-exclusion-fixture-kit` | one writer and no interleaved manual/RAF steps |
| `hidden-tab-resume-fixture-kit` | suspension and bounded resume behavior |
| `browser-clock-smoke-kit` | built artifact and deployed cadence proof |

## Admission model

```txt
FrameTimeObservation
  sessionId
  simulationEpoch
  timestampMs
  visibilityGeneration
  source = browser-raf

SimulationStepCommand
  commandId
  source = automatic | manual
  expectedEpoch
  expectedNextStepId
  requestedStepCount
  writerLeaseId
```

Reject when:

```txt
runtime is inactive
session or epoch is stale
visibility generation is stale
writer lease is unavailable
requested count is invalid
manual capability is absent
automatic and manual writers overlap
```

## Commit model

```txt
observe wall time
  -> update bounded accumulator
  -> derive candidate step count
  -> acquire one writer lease
  -> execute exact fixed steps
  -> assign committed step range
  -> classify retained/dropped lag
  -> publish once
  -> release writer lease
  -> render once
  -> issue frame receipt
```

## Dependency placement

```txt
Runtime Session Instance Authority
  -> Fixed-Step Clock Authority
  -> Route-Scoped Simulation Admission Authority
  -> Player-Control Reachability Authority
  -> Public Capability Gateway
  -> Composite Command Transaction Authority
  -> Seeded Replay Authority
  -> Versioned Persistence Authority
```

The clock must precede player input because held intent must be consumed by admitted simulation steps rather than DOM event cadence.