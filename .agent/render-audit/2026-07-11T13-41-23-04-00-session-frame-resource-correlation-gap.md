# Render audit: Session, frame and resource correlation gap

## Plan ledger

**Goal:** ensure every canvas and HTML frame is produced by one live session and that both render owners are retired with that session.

- [x] Trace canvas and HTML renderer creation.
- [x] Trace per-frame snapshot consumption.
- [x] Trace browser binding and resource ownership.
- [x] Identify missing session/frame receipts and disposal paths.
- [ ] Add render ownership and correlation fixtures.

## Current flow

```txt
module import
  -> create world canvas owner
  -> create HTML interface owner and click listener
  -> RAF engine.tick()
  -> aggregate mutable graph snapshot
  -> world.render(snapshot)
  -> ui.render(snapshot)
  -> request next RAF
```

## Findings

`createWorldCanvas()` retains a 2D context and resizes the backing canvas on every render. It exposes only `render()`.

`createHtmlInterfaceRenderer()` attaches an anonymous delegated click listener to the root and exposes only `render()`. There is no listener lease, disabled state, disposal method or session check.

Neither renderer returns a structured result. A frame cannot prove:

```txt
runtimeId
sessionId
sessionEpoch
lifecycleRevision
simulationTickId
renderFrameId
stateFingerprint
worldRendered
interfaceRendered
resourceGeneration
```

A stale callback or retained public reference can therefore continue driving the same render owners without a typed rejection.

## Required render contract

```txt
CommittedSessionFrame
  -> runtimeId
  -> sessionId
  -> sessionEpoch
  -> lifecycleRevision
  -> latest committed simulation tick
  -> immutable state fingerprint
  -> renderFrameId

world renderer
  -> validate live resource generation
  -> render exactly once
  -> return WorldRenderReceipt

HTML renderer
  -> validate live resource generation
  -> replace projection
  -> return InterfaceRenderReceipt

frame authority
  -> combine both receipts
  -> publish SessionFrameReceipt
```

## Required resource lifecycle

```txt
create
  -> ownerId and resourceGeneration
  -> live
  -> render admitted session frames only
  -> dispose once
  -> remove delegated listener
  -> clear retained references
  -> reject render-after-dispose
```

## Fixture gate

```txt
new session handoff
  -> old renderer generation rejects future frames
  -> new renderer accepts only new session frames

dispose
  -> delegated click listener is removed
  -> render-after-dispose is rejected
  -> no additional RAF frame is acknowledged

frame parity
  -> canvas and HTML receipts cite the same session, epoch, tick and state fingerprint
```