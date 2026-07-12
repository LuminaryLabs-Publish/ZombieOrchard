# ZombieOrchard Fixed-World / Small-Viewport Visibility Loop

**Timestamp:** `2026-07-12T06-11-18-04-00`

## Summary

Gameplay accepts player positions across a `720 x 560` world, while rendering exposes only the current canvas dimensions and applies no fit or camera policy. On a small viewport, gameplay can remain valid while the player, pests, apples or orchard rows are outside the visible surface.

## Plan ledger

**Goal:** keep simulation coordinates independent while guaranteeing that the active gameplay region has a declared and testable projection into the viewport.

- [x] Trace world and player bounds.
- [x] Trace tree, apple, pest and player projection.
- [x] Compare simulation bounds with small viewport extents.
- [x] Identify missing visibility and projection results.
- [ ] Select a product projection policy.
- [ ] Add world-membership and viewport fixtures.

## Current loop

```txt
active-session move command
  -> clamp player.x to -360..360
  -> clamp player.y to -280..280

world render
  -> center world at canvas midpoint
  -> add raw world coordinates
  -> draw no camera transform or scale

small viewport
  -> valid simulation position can be outside canvas
  -> HUD can remain visible while controlled actor is absent
  -> no gameplay or diagnostics result reports the mismatch
```

## Concrete example

```txt
viewport width:       320
visible centered x:   approximately -160..160
valid player x range: -360..360
maximum hidden span:  200 pixels on either side
```

The same issue applies vertically when viewport height is below `560` pixels.

## Gameplay consequences

```txt
player can leave the visible area
nearby apple can be collectable but invisible
pest can damage the player while one or both are invisible
orchard rows can be omitted without an explicit camera decision
clear/collect results can appear unrelated to visible objects
screen size can change practical playability
```

The current shipped UI has no movement binding, but the public engine exposes `active-session.move`, and the movement authority is intended gameplay. Projection correctness must be defined before input reachability is considered complete.

## Missing gameplay/render contract

```txt
nominalWorldBounds
activeGameplayBounds
cameraOrFitPolicy
worldScale
worldOffset
playerViewportMembership
pestViewportMembership
collectableViewportMembership
clippedRequiredEntityCount
visibilityMismatchResult
surfaceRevision
visibleFrameReceipt
```

## Candidate policy options

### Contain full world

```txt
scale = min(cssWidth / 720, cssHeight / 560)
center the complete orchard
letterbox unused area
```

### Follow player

```txt
preserve world scale
center camera on player
clamp camera to world bounds
project entities through camera transform
```

### Hybrid

```txt
contain at small viewports
use fixed 1:1 world scale above a threshold
retain explicit safe frame for HUD
```

The product must select one policy; the renderer should not infer it implicitly from canvas size.

## Required proof

```txt
player at all four world corners remains visible or explicitly camera-tracked
collectable within action radius is visible in the committed frame
pest contact cannot occur entirely outside required gameplay visibility
portrait and landscape behavior match declared policy
resize preserves simulation position while updating projection revision
visible frame cites the committed surface and projection revisions
```

## Gate

Do not claim viewport-independent gameplay until world membership and active-entity visibility are tested across the supported viewport matrix.
