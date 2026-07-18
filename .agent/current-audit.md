# Current audit: ZombieOrchard world viewport and camera coverage

**Timestamp:** `2026-07-18T08-39-41-04-00`  
**Status:** `world-viewport-camera-coverage-authority-audited`  
**Retained status:** `pest-population-spawn-budget-retirement-authority-central-reconciled`  
**Branch:** `main`

## Summary

The Canvas2D host maps world positions directly around the viewport center at unit scale. The playable world is 720 by 560 units, but no camera, fit scale, follow policy, safe area or visibility classification exists. Valid player and interaction positions can be outside the visible canvas on supported-looking narrow or short layouts.

## Checklist

**Goal:** make viewport-to-world coverage explicit and provable without replacing the existing Canvas2D renderer.

- [x] Inspect world bounds, player bounds, spawn extents, canvas sizing and world projection.
- [x] Preserve all 27 implemented kits and services.
- [x] Define the 20-surface world viewport and camera authority.
- [x] Define portrait, small-landscape, edge-traversal and deployed-origin fixtures.
- [ ] Implement and validate the authority.

## Source-backed finding

```txt
world width: 720
world height: 560
player X clamp: -360..360
player Y clamp: -280..280
world origin projection: viewport center
projection scale: 1
camera state: absent
world-fit policy: absent
follow policy: absent
camera clamp: absent
safe-area/HUD occlusion policy: absent
renderer consumption of world bounds: absent
EntityVisibilityResult: absent
FirstCameraBoundFrameAck: absent
viewport camera fixtures: 0
```

At `320x568`, only `44.4%` of the playable horizontal span is visible, and a player at `x=360` projects `200px` beyond the right edge. At `640x480`, a player at `y=280` projects `40px` beyond the bottom edge.

No production incident was reproduced. This is a world-coverage, interaction-visibility and executable-proof gap.

## Required authority

`zombie-orchard-world-viewport-camera-coverage-authority-domain`

## Validation boundary

Documentation only. No runtime, gameplay, HTML, CSS, Canvas2D, input, dependency, test, artifact, workflow or deployment behavior changed.
