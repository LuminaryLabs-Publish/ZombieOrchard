# World projection audit: camera coverage contract

**Timestamp:** `2026-07-18T08-39-41-04-00`

## Contract goal

Keep the player and the active interaction context visible across supported viewport profiles without changing simulation coordinates or rewriting the Canvas2D host.

## Inputs

```txt
world bounds
player world position
nearest collectable or threat focus
viewport CSS size
physical pixel ratio
safe-area insets
HUD occlusion rectangles
camera policy revision
viewport generation
```

## Accepted state

```txt
camera center
projection scale
visible world rectangle
camera clamp classification
interaction-focus classification
viewport generation
camera generation
projection digest
```

## Policy choices requiring explicit authorship

- Fit the complete 720x560 playable area when the viewport can support it.
- Follow the player when fitting the complete area would make entities unreadably small.
- Clamp the camera to world bounds.
- Reserve safe space for the HUD and quick-action controls.
- Keep the nearest accepted collection or clearing target visible where possible.
- Recompute only when viewport, safe area, camera policy or tracked focus changes.

## Retirement and convergence

```txt
new viewport generation admitted
  -> prior pending camera work retired
  -> one camera result accepted
  -> one projection digest committed
  -> one matching frame presented
  -> FirstCameraBoundFrameAck published
```

## Fixtures

```txt
320x568 portrait
375x667 portrait
640x480 small landscape
800x600 complete-world fit
1366x768 wide desktop
edge traversal at all four player limits
rapid orientation changes
HUD safe-area overlap
source/dist/Pages digest parity
```
