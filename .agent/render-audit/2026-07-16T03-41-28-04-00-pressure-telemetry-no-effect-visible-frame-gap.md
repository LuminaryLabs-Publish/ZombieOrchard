# Render audit: pressure telemetry without effect convergence

**Timestamp:** `2026-07-16T03-41-28-04-00`

## Summary

The HTML HUD projects rounded `rowPressure`, but the displayed value has no corresponding accepted gameplay-effect revision. `curse` and active pressure effects are absent from the read model, and Canvas2D has no pressure-linked descriptor.

## Plan ledger

**Goal:** bind pressure telemetry and any authored effect to the exact accepted gameplay revision visible in HTML and Canvas2D.

- [x] Trace pressure reads in the HTML renderer.
- [x] Trace Canvas2D snapshot use.
- [x] Confirm no pressure-effect descriptor or frame acknowledgement.
- [ ] Implement bounded projection and browser proof.

## Current visible path

```txt
pressure snapshot
  -> html renderer rounds rowPressure
  -> stat strip replaces DOM
  -> Canvas2D renders unchanged world entities
  -> no effect identity or pressure frame receipt

curse
  -> remains in snapshot
  -> is not projected
```

## Missing evidence

```txt
PressureEffectRevision
active pressure-effect read model
curse semantic projection
effect-to-HUD correlation
effect-to-world-frame correlation
FirstPressureEffectFrameAck
```

No visual defect is claimed. The gap is that the visible pressure number cannot be correlated with an accepted gameplay consequence.
