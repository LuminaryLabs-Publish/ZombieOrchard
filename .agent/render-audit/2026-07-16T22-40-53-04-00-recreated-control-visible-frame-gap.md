# Render audit: recreated control visible-frame gap

**Timestamp:** `2026-07-16T22-40-53-04-00`

## Finding

The Canvas2D world and HTML interface are rendered each RAF. The HTML path does not reconcile existing nodes; it assigns a complete new `innerHTML` string for both gameplay HUD and screen routes. The pixels may appear unchanged while the interactive node generation has changed.

```txt
frame N
  -> button node A is visible
  -> pointerdown or keyboard focus binds to A

frame N+1
  -> root.innerHTML replaces A with button node B
  -> visible label may be identical
  -> browser interaction identity is no longer identical
```

## Missing visible proof

```txt
render generation identity
stable ControlId-to-node binding
focused-control continuity
pressed-control continuity
removed-control retirement
FirstStableControlFrameAck
```

## Required result

`FirstStableControlFrameAck` must bind the accepted route revision, control manifest revision, DOM generation, focused control, pressed control, and visible frame.
