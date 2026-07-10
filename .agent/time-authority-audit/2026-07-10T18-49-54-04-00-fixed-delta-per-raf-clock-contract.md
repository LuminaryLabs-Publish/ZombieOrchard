# Time authority audit — Fixed delta per RAF clock contract

**Timestamp:** `2026-07-10T18-49-54-04-00`

## Current clock

```js
function draw() {
  const snapshot = engine.tick(1 / 60);
  world.render(snapshot);
  ui.render(snapshot);
  requestAnimationFrame(draw);
}
```

The callback ignores the RAF timestamp and runs exactly one simulation step per render callback.

## Consequences

```txt
30 Hz display  -> about 30 simulation ticks per wall second
60 Hz display  -> about 60 simulation ticks per wall second
120 Hz display -> about 120 simulation ticks per wall second
```

Tick-driven pressure, random pest checks, pursuit, damage, and elapsed/frame counters therefore depend on browser render cadence.

## Required clock model

```txt
on RAF(timestamp):
  wallDelta = clamp(timestamp - lastTimestamp)
  accumulator += wallDelta
  steps = 0
  while accumulator >= fixedDelta and steps < maxCatchUpSteps:
    if lifecycleState == running:
      engine.tick(fixedDelta)
      simulationTick += 1
    accumulator -= fixedDelta
    steps += 1
  if catch-up cap reached:
    record remaining/dropped time according to policy
  render latest committed snapshot once
```

## Clock modes

```txt
automatic
  wall time is supplied by RAF owner
  GameHost manual tick rejects

manual
  no RAF is scheduled
  fixture or trusted host advances explicit wall intervals
```

## Clock-step result

```txt
{
  clockStepId,
  sessionId,
  mode,
  lifecycleState,
  wallDelta,
  accumulatorBefore,
  accumulatorAfter,
  fixedDelta,
  executedSteps,
  firstSimulationTick,
  lastSimulationTick,
  catchUpLimited,
  droppedTime,
  accepted,
  reason
}
```

## Fixture schedules

Drive equal wall time using separate render schedules:

```txt
30 Hz:  30 callbacks per second
60 Hz:  60 callbacks per second
120 Hz: 120 callbacks per second
irregular: deterministic mixed intervals
throttled: one large interval exercising catch-up cap
```

Expected result: equivalent committed simulation tick counts and gameplay fingerprints for schedules that do not invoke dropped-time policy. Any dropped time must be explicit and reproducible.

## Pause policy

Wall callbacks may continue while paused, but no gameplay simulation step may commit. Resume policy must prevent a large accumulated pause interval from causing catch-up gameplay.

## Next safe ledge

```txt
ZombieOrchard Runtime Session Clock and Lifecycle Authority
+ Pause/Reset/Refresh-Rate Fixture Gate
```