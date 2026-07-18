# Next steps: ZombieOrchard world viewport and camera coverage

**Timestamp:** `2026-07-18T08-39-41-04-00`  
**Status:** `world-viewport-camera-coverage-authority-audited`

## Summary

The next implementation slice is a targeted camera/projection boundary around `world-canvas-render-kit`. It should preserve world coordinates and Canvas2D drawing while making viewport coverage explicit.

## Checklist

**Goal:** ensure every supported viewport settles one camera/projection generation and presents a frame in which the player and active interaction context follow the accepted visibility policy.

- [ ] Define supported viewport profiles and a versioned world-coverage policy.
- [ ] Consume `orchard-world.bounds` when settling camera and scale.
- [ ] Add source-neutral viewport metrics and safe-area inputs.
- [ ] Add camera center, follow and clamp state.
- [ ] Decide when to fit the complete world and when to follow the player.
- [ ] Keep the nearest accepted collect/clear focus visible where possible.
- [ ] Publish `ViewportAdmissionResult`, `CameraSettlementResult` and `WorldProjectionResult`.
- [ ] Classify player, target and threat visibility.
- [ ] Reject stale viewport and camera generations after resize/orientation changes.
- [ ] Publish `WorldViewportFrameDigest` and `FirstCameraBoundFrameAck`.
- [ ] Add portrait, small-landscape, edge-traversal, safe-area, source, dist and Pages fixtures.

## Ordering

```txt
world and viewport policy
  -> viewport admission
  -> camera follow/clamp settlement
  -> immutable projection snapshot
  -> entity visibility classification
  -> Canvas2D render
  -> matching-frame acknowledgement
  -> source/dist/Pages fixtures
```

Preserve the current active-session simulation and world coordinates. This is targeted presentation ownership, not an engine restructure.
