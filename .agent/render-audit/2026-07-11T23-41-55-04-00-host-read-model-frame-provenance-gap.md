# Host read-model and frame-provenance gap

## Goal

Ensure browser diagnostics and automation observe the same committed route, simulation revision and rendered frame that the player sees, without reaching renderer or engine internals.

## Current render path

```txt
RAF
  -> engine.tick(1 / 60)
  -> snapshot domain map
  -> world.render(snapshot)
  -> ui.render(snapshot)
  -> request next RAF
```

The public host is installed before the first draw:

```txt
window.GameHost = {
  engine,
  getState: () => engine.snapshot(),
  tick: (dt) => engine.tick(dt)
}
```

## Gap

`getState()` returns a fresh domain snapshot, but it does not identify:

```txt
runtimeId
runId
sessionEpoch
lifecycleRevision
routeRevision
simulationTickId
stateRevision
canvasFrameId
htmlFrameId
presentedAt
render success or failure
```

A host caller can therefore read state before or after either renderer without knowing which pixels correspond to that observation. A manual host tick can also mutate state without immediately rendering it, so the read model can advance ahead of both visible surfaces.

## Required render receipt

```txt
HostFrameReceipt {
  hostGeneration
  runtimeId
  runId
  sessionEpoch
  routeId
  routeRevision
  simulationTickId
  stateRevision
  canvasFrameId
  canvasRenderResult
  htmlFrameId
  htmlRenderResult
  committedAt
}
```

## Required commit flow

```txt
admitted simulation or presentation step
  -> committed state revision
  -> canvas projection result
  -> HTML projection result
  -> one accepted HostFrameReceipt
  -> public observation update
  -> subscriber publication
```

If either surface fails, the public observation must distinguish:

```txt
state committed, frame pending
state committed, canvas failed
state committed, HTML failed
frame fully committed
host revoked
```

## Public observation rule

The public host may expose clone-safe presentation summaries and receipts. It must not expose:

```txt
canvas renderer object
HTML renderer object
DOM root
2D context
raw engine
mutable domain objects
```

## Required fixtures

```txt
observation-before-first-frame-is-explicitly-not-ready
one state revision maps to one canvas and HTML receipt
manual fixture step remains pending until a frame is rendered
failed canvas projection is visible in the receipt
failed HTML projection is visible in the receipt
stale frame from predecessor host generation is rejected
subscriber receives monotonically increasing frame receipts
public observation cannot mutate renderer or state
```

## Current validation

```txt
render behavior changed: no
browser smoke: not run
frame-receipt fixture: absent
host/read-model parity fixture: absent
```
