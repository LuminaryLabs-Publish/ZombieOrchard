# Render audit — Session frame projection lifecycle gap

## Timestamp

```txt
2026-07-11T06-02-00-04-00
```

## Current render loop

```txt
requestAnimationFrame(draw)
  -> engine.tick(1 / 60)
  -> world.render(snapshot)
  -> ui.render(snapshot)
  -> requestAnimationFrame(draw)
```

The world canvas renders on every screen. Entry, Run Setup, Pause, Title, and Outcome do not own separate render states; they overlay HTML on the same continuously changing orchard snapshot.

## Current render services

### World canvas

```txt
reads orchard-world trees and apples
reads active-session pests and player
resizes the canvas every frame
projects rectangles into screen space
returns only render()
```

### HTML interface

```txt
installs one delegated click listener
reads interface-composition active route
projects HUD or generic screens
projects Outcome from the live active-session snapshot
replaces root.innerHTML every frame
returns only render()
```

## Lifecycle defects

1. Render frames carry no `runtimeId`, `sessionId`, `sessionEpoch`, simulation tick, state fingerprint, or lifecycle phase.
2. The world can continue changing behind Pause, Title, and Outcome because all gameplay domains keep ticking.
3. Outcome is rendered from the mutable active-session closure rather than an immutable terminal snapshot.
4. New Game cannot prove that the first rendered frame belongs to fresh state.
5. Title does not detach the retired world from rendering.
6. The canvas renderer has no stop or dispose result.
7. The HTML renderer does not return a listener-removal handle.
8. A future restart can create duplicate RAF and input owners unless ownership is explicit.
9. `GameHost.getState()` can expose a snapshot from a retired session with no stale marker.

## Required render contract

Every committed render observation should contain:

```txt
runtimeId
runtimeGeneration
sessionId
sessionEpoch
lifecycleState
committedTickId
renderFrameId
stateFingerprint
route
terminalResultId or null
sourceSnapshotRevision
```

## Required transition behavior

### Start

```txt
prepare fresh graph
  -> commit session epoch
  -> publish initial committed snapshot
  -> render first frame
  -> acknowledge first-frame session identity
  -> retire any previous graph
```

### Pause

```txt
freeze simulation admission
  -> keep rendering the last committed gameplay state
  -> project paused lifecycle state
  -> do not advance pests, pressure, damage, score, or world generation
```

### Outcome

```txt
freeze gameplay
  -> create immutable terminal snapshot
  -> render Outcome from terminal snapshot
  -> permit Title or Reset without automatic re-entry
```

### Title

```txt
commit no-active-session or retired-session policy
  -> reject retired snapshots
  -> render title shell
  -> preserve only explicitly allowed settings/profile state
```

## Required fixtures

```txt
Pause for 600 render frames -> gameplay fingerprint unchanged
Outcome -> terminal snapshot remains unchanged across later frames
Title from Outcome -> route remains Entry after subsequent ticks
New Game after mutation -> first frame equals initial preset state
stale snapshot from old epoch -> renderer rejects or marks skipped
stop/start -> one active RAF owner
renderer dispose -> listener and frame owners reach zero
```

## Next safe ledge

```txt
ZombieOrchard Runtime Session Instance Authority
+ Start / Reset / Title / Outcome Fidelity Fixture Gate
```
