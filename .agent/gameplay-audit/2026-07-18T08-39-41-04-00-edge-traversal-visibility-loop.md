# Gameplay audit: edge traversal visibility loop

**Timestamp:** `2026-07-18T08-39-41-04-00`

## Loop

```txt
movement command
  -> player position clamps inside +/-360, +/-280
  -> collection and clearing use world-space distance
  -> simulation remains valid
  -> renderer applies fixed viewport-center projection
  -> player or target may be outside the visible canvas
  -> spatial action feedback can no longer be visually verified
```

## Gameplay impact boundary

The collection and clearing rules operate in world coordinates and remain internally consistent. The gap is presentation coverage: a valid player position, nearby apple or nearby pest is not guaranteed to be visible on narrow or short viewports.

This matters for:

- locating the player after movement;
- identifying nearby collectable apples;
- identifying pests inside the clear radius;
- reading approach and contact pressure;
- understanding world edges;
- future touch or keyboard movement adoption.

## Missing settlement

```txt
accepted viewport profile
accepted camera position
accepted projection scale
player-visible classification
nearest interaction target visibility
edge clamp/follow result
matching visible frame acknowledgement
```

## Proposed result flow

```txt
player and target world positions
  + world bounds
  + viewport and safe area
  -> CameraSettlementResult
  -> EntityVisibilityResult
  -> render snapshot
  -> FirstCameraBoundFrameAck
```

The earlier movement-action and Canvas backing-store audits remain retained. This audit addresses world coverage after a valid gameplay position exists.
