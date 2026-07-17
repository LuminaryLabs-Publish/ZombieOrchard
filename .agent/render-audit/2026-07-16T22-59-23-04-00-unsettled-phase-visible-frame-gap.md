# Render audit: unsettled phase visible-frame gap

**Timestamp:** `2026-07-16T22-59-23-04-00`  
**Status:** `day-phase-transition-admission-settlement-authority-audited`

## Finding

The `next-phase` command mutates phase state immediately inside the browser click turn. Canvas2D and HTML do not render the new state until the next RAF. A second activation can mutate the phase again before either surface presents the intermediate night generation.

```txt
click 1
  day -> night
click 2 before RAF
  night -> day, day += 1
next RAF
  Canvas2D and HTML present day
```

The intermediate night state can therefore be accepted by gameplay but never become a visible frame and never receive a night simulation tick.

## Missing render authority

```txt
PhaseGeneration
PhaseProjectionSnapshot
pending transition presentation lock
HTML/Canvas matching generation
FirstPhaseBoundFrameAck
intermediate-phase visibility policy
stale phase-frame rejection
```

## Required projection path

```txt
accepted PhaseTransitionSettlementResult
  -> immutable PhaseProjectionSnapshot
  -> Canvas2D projection
  -> HTML HUD projection
  -> matching generation comparison
  -> FirstPhaseBoundFrameAck
```

## Proof required

- One activation yields exactly one matching phase frame.
- Rapid duplicate activation does not skip a required visible generation.
- HTML day/phase values and Canvas world state use the same engine revision.
- Source, built artifact, and Pages output produce equivalent receipts.

No visual defect was reproduced in a browser during this documentation-only audit.