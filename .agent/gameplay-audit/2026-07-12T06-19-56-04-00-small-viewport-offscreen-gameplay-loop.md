# Gameplay audit: small-viewport offscreen gameplay loop

**Timestamp:** `2026-07-12T06-19-56-04-00`

## Goal

Show how valid simulation state can remain interactive while falling outside the visible canvas.

## Loop

```txt
active-session movement
  -> clamp player within fixed world bounds
  -> pressure and pests continue updating
  -> orchard apples remain valid at world coordinates

world render
  -> sample current canvas CSS dimensions
  -> center raw world coordinates at width/2,height/2
  -> apply no scale, camera or containment policy

small viewport
  -> visible range becomes narrower than valid world range
  -> player/pest/apple may be offscreen
  -> simulation remains valid and continues
  -> no membership or warning result is emitted
```

## Consequences

- The player may move to a legal position that cannot be seen.
- Pests may damage the player while outside the visible surface.
- Apples may exist and count toward the world state without being visually reachable.
- Route and HUD state can remain current while the world canvas omits required gameplay evidence.
- A resize can change visibility without a simulation or surface revision.

## Required policy

Choose and name one projection policy:

```txt
contain full world
camera-follow player with bounded margins
fixed logical stage with letterbox/pillarbox
explicit viewport membership and offscreen indicators
```

The chosen policy must return required-entity membership and be cited by the visible-frame receipt.

## Fixtures

```txt
320x568 player-at-x-360
568x320 player-at-y-280
DPR 1/1.5/2 parity
resize while player is near a boundary
apple and pest membership at all legal coordinates
unchanged viewport produces no buffer reset
```

No viewport-safe gameplay claim is made until these fixtures pass.