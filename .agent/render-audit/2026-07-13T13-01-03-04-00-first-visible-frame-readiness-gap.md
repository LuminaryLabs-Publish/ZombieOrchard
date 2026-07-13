# Render audit: first visible frame readiness gap

**Timestamp:** `2026-07-13T13-01-03-04-00`

## Summary

ZombieOrchard treats renderer construction as readiness even though no visible projection has succeeded. The first browser frame advances simulation, mutates the canvas, then replaces the HTML subtree. There is no startup-frame candidate, surface receipt, failure fallback, or acknowledgement proving a complete first frame became visible.

## Plan ledger

**Goal:** require startup to adopt presentation only after both visible surfaces successfully prepare and one complete frame is acknowledged.

- [x] Read the page shell and both renderers.
- [x] Confirm the error panel is declared but unused.
- [x] Confirm canvas/context and HTML-root acquisition are unchecked.
- [x] Confirm the first tick occurs before any render success.
- [x] Confirm canvas renders before HTML and RAF scheduling.
- [ ] Add probe and first-frame browser fixtures.

## Current render path

```txt
createWorldCanvas(#world)
  -> canvas.getContext("2d")
  -> no null or capability result

createHtmlInterfaceRenderer(#ui-root)
  -> root.addEventListener("click", ...)
  -> no root or listener-install result

first draw
  -> tick simulation
  -> resize and paint canvas
  -> replace HTML subtree
  -> request next RAF
```

## Failure windows

```txt
missing canvas node
  -> renderer construction throws
  -> no error panel

Canvas2D unavailable
  -> null context retained
  -> first canvas render throws after simulation tick
  -> HTML does not render
  -> RAF is not scheduled

missing UI root
  -> listener installation throws
  -> no cleanup of previously prepared engine/canvas state

HTML render failure after canvas success
  -> partial first frame
  -> no typed partial result or fallback
```

## Required render evidence

```txt
StartupFrameCandidateId
CanvasPreparationReceipt
HtmlPreparationReceipt
CanvasProbeResult
HtmlProbeResult
StartupFrameCommitResult
FirstStartupFrameAck
FallbackProjectionResult
```

## Acceptance criteria

```txt
no simulation mutation before accepted startup generation
missing DOM node -> typed failure and visible fallback
missing Canvas2D -> typed failure and visible fallback
canvas probe failure -> candidate disposal
HTML probe failure -> candidate disposal
both probes succeed -> atomic live adoption
first complete surface pair -> FirstStartupFrameAck
GameHost exposure -> only after accepted frame generation
```

## Validation boundary

No renderer, HTML, CSS, canvas, or scheduling code changed.