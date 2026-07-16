# Next steps: ZombieOrchard pressure gameplay adoption

**Timestamp:** `2026-07-16T03-41-28-04-00`  
**Status:** `pressure-threshold-gameplay-adoption-authority-audited`

## Summary

Keep `pressure-field-kit` as the channel owner, but require an authored policy to translate accepted pressure revisions into session effects. Do not hard-code unversioned thresholds in the renderer or browser event handlers.

## Plan ledger

**Goal:** make pressure a deterministic, observable gameplay input whose effects are evaluated once, adopted atomically and visibly acknowledged.

- [ ] Define channel schemas, ranges, units and authored defaults for `rowPressure` and `curse`.
- [ ] Add monotonic `PressureRevision` and immutable pressure snapshots.
- [ ] Define versioned threshold and modifier policy in the preset.
- [ ] Evaluate effects against expected pressure, phase and session revisions.
- [ ] Decide and document which systems consume `rowPressure`.
- [ ] Decide and document which systems consume `curse`.
- [ ] Publish typed threshold-entered, threshold-exited, effect-applied and no-effect results.
- [ ] Prevent duplicate threshold firing across repeated ticks.
- [ ] Preserve deterministic behavior under save, restore and replay.
- [ ] Project both channels and any active effects through a bounded HUD read model.
- [ ] Publish `FirstPressureEffectFrameAck`.
- [ ] Add low, boundary, high, crossing, reset, restore, replay, source/dist and Pages fixtures.

## Checkpoint

Do not claim pressure gameplay adoption until at least one authored channel effect is proven across boundary crossing, sustained occupancy, reset, save/restore and a matching visible frame.
