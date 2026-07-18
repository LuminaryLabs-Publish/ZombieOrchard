# Known gaps: ZombieOrchard world viewport and camera coverage

**Timestamp:** `2026-07-18T08-39-41-04-00`  
**Status:** `world-viewport-camera-coverage-authority-audited`

## Summary

World simulation positions can exceed the visible canvas because viewport size is used only as a fixed screen origin. No explicit camera or coverage policy joins world bounds, player position, interaction focus, safe area and the presented frame.

## Checklist

**Goal:** keep the viewport, camera, projection and proof gaps explicit until supported layouts have bounded, testable coverage.

- [x] Record source-backed world extent and projection gaps.
- [x] Preserve current product and renderer boundaries.
- [x] Define required results and fixtures.
- [ ] Close the gaps in runtime code and executable proof.

## Gaps

```txt
supported viewport profile schema
viewport generation and revision
world extent policy revision
camera state and generation
camera follow policy
camera clamp policy
fit-world versus follow-player decision
projection scale policy
world-to-screen transform result
screen-to-world transform result
safe-area inset input
HUD occlusion input
renderer consumption of orchard-world bounds
player-visible classification
interaction-focus visibility classification
threat visibility classification
resize/orientation stale-work rejection
WorldViewportResult
CameraProjectionResult
WorldViewportFrameDigest
FirstCameraBoundFrameAck
portrait viewport fixture
small-landscape viewport fixture
edge-traversal fixture
safe-area overlap fixture
source/dist/Pages camera parity
```

## Retained gaps

The pest-population audit and all earlier stamina, host lifecycle, phase, control, transaction, audio, pressure, determinism, persistence, rendering, command, accessibility, kit-graph and gameplay-adoption gaps remain retained unless separately implemented and validated.
