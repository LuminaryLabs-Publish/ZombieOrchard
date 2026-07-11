# Interaction audit: pause and manual-step clock admission

## Timestamp

`2026-07-11T15-20-27-04-00`

## Current ingress paths

```txt
browser RAF
  -> engine.tick(1 / 60)

window.GameHost.tick(dt)
  -> engine.tick(dt)

Pause / Resume / Title
  -> interface composition commands
  -> no clock ownership or baseline transition
```

## Gap

Automatic RAF stepping and public manual stepping can mutate the same graph independently. Neither path carries runtime/session/epoch, lifecycle revision, clock revision or an ownership lease.

Pause is a route. It does not reject automatic ticks, and manual stepping can still advance pressure, pests, damage and Outcome routing while the UI presents a paused screen.

## Required commands

```txt
PauseClockCommand
ResumeClockCommand
VisibilitySuspendedCommand
VisibilityResumedCommand
AcquireManualStepLeaseCommand
ManualStepCommand
ReleaseManualStepLeaseCommand
```

Each command must carry:

```txt
runtimeId
sessionId
sessionEpoch
observedLifecycleRevision
observedClockRevision
commandId
```

## Admission rules

```txt
automatic owner active + manual step request
  -> reject

manual lease active + RAF mutation request
  -> reject or render-only

paused + automatic tick
  -> no mutation

visibility resume
  -> reset wall-time baseline
  -> no hidden catch-up

stale session/epoch/generation
  -> reject
```

## Required result classes

```txt
committed
rejected
no-op
failed
rolled-back
```

A committed pause must be acknowledged before any later simulation tick. Resume must establish a new baseline before admitting elapsed wall time.