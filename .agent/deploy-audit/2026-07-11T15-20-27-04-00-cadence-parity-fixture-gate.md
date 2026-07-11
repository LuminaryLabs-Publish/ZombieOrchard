# Deploy audit: cadence-parity fixture gate

## Timestamp

`2026-07-11T15-20-27-04-00`

## Current proof surface

The current smoke proof creates one engine, routes Entry to Play, ticks once, verifies Active Session and verifies apple presence. It does not exercise browser cadence, pause, visibility, stalls, manual stepping or render/tick correlation.

## Required DOM-free fixtures

```txt
30 Hz, 60 Hz and 120 Hz schedules over equal wall time
  -> equal committed tick count
  -> equal elapsed simulation time
  -> equal pressure values
  -> equal deterministic movement and damage once random authority is injected

stall schedule
  -> catch-up limited by maxCatchupSteps
  -> deferred/dropped time explicitly reported

pause schedule
  -> zero gameplay mutation while paused
  -> resume establishes a new wall-time baseline

manual schedule
  -> automatic/manual overlap rejected
  -> exclusive manual lease executes exact requested steps
```

## Required browser fixtures

```txt
one retained automatic clock lease
visibility hide/show baseline reset
zero-tick render callback
multi-tick catch-up render callback
canvas and HTML acknowledge the same committed tick
GameHost observation matches the rendered tick
stale session callback cannot mutate or reschedule
```

## Deployment gate

Pages deployment should fail when cadence parity, pause freeze, catch-up budget, manual exclusion or render-correlation fixtures fail.

## Current validation state

```txt
runtime source changed: no
clock fixture implemented: no
browser cadence smoke implemented: no
deployment gate changed: no
```

No cadence-independent simulation claim is valid until these fixtures pass on `main`.