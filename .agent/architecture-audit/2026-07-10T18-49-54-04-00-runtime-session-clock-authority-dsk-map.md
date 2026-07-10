# Architecture audit — Runtime session clock authority DSK map

**Timestamp:** `2026-07-10T18-49-54-04-00`

## Current composition

```txt
browser host
  -> createOrchardGame
  -> kit-runtime
     -> gameplay domains
     -> scoped interface domains
     -> interface composition
  -> renderers
  -> RAF loop
  -> GameHost
```

The architecture has owners for gameplay state, screen state, commands, ticks, snapshots, rendering, and deployment. It has no owner for the runtime session or simulation clock.

## Existing domain ownership

| Domain/kit | Current authority | Missing lifecycle responsibility |
| --- | --- | --- |
| `src/start.js` host | engine/render creation, RAF recursion, GameHost | wall-time clock, RAF cancellation, lifecycle orchestration, disposal |
| `kit-runtime` | registration, commands, tick-all, snapshots | lifecycle state, tick eligibility, reset/dispose routing, clock mode |
| `interface-composition-kit` | active/previous screen and transitions | lifecycle-aware Play/New/Pause/Resume/Title policy |
| `pressure-field-kit` | channel mutation and passive tick | running-state guard and reset |
| `orchard-world-kit` | tree/apple state | reset-from-preset and deterministic seed scope |
| `active-session-domain-kit` | player/pest/phase/score/failure | explicit start/pause/resume/reset/end/stop semantics |
| resource/construction/roster/inventory kits | local state and commands | session ownership and reset policy |
| render kits | projection | lifecycle observation, disposal, no-op-after-dispose |
| GameHost | raw engine/snapshot/manual tick | bounded lifecycle readback and clock-mode enforcement |
| smoke fixture | reachability | lifecycle, timing, reset, disposal, and replay proof |

## Proposed DSK boundary

```txt
runtime-session-authority-kit
  owns:
    sessionId
    lifecycleState
    lifecycleTransitionId
    startPolicy
    pausePolicy
    resetPolicy
    stopPolicy
    disposalState
    bounded transition results

fixed-step-clock-kit
  owns:
    clockMode: automatic | manual
    fixedDelta
    accumulator
    lastWallTime
    simulationTick
    maxCatchUpSteps
    droppedTime
    bounded clock-step results

runtime-lifecycle-fixture-adapter-kit
  owns:
    DOM-free host driving
    render-schedule simulation
    start/pause/reset/stop/dispose scripts
    state and lifecycle fingerprint assertions
```

## Required composition order

```txt
preset and session config
  -> runtime-session-authority
  -> fixed-step-clock
  -> gameplay-domain reset/start
  -> lifecycle-aware interface transitions
  -> committed simulation ticks
  -> render projection
  -> GameHost lifecycle/clock readback
  -> fixture adapter
```

## Session-owned domain policy

```txt
resource-ledger          reset on New Game
pressure-field           reset on New Game; tick only while running
orchard-world            rebuild/reset on New Game
construction-runtime     reset on New Game
roster-runtime           reset on New Game
inventory-runtime        reset on New Game
active-session           reset on New Game; tick only while running
interface-composition    transition according to lifecycle result
runtime events/journals  reset or archive according to explicit policy
```

## Lifecycle state machine

```txt
idle
  -> starting
  -> running
  -> paused
  -> running
  -> ended
  -> stopping
  -> stopped
  -> starting

any non-disposed state
  -> failed
  -> stopping/stopped

stopped or failed
  -> disposed
```

Illegal or redundant transitions must return explicit rejected/no-op results without mutation.

## Companion boundaries

Deterministic scenario authority should be scoped below `sessionId` and `simulationTick`. Market command causality should be implemented only after lifecycle, clock, command-result, and committed-frame proof are reliable.

## Next safe ledge

```txt
ZombieOrchard Runtime Session Clock and Lifecycle Authority
+ Pause/Reset/Refresh-Rate Fixture Gate
```