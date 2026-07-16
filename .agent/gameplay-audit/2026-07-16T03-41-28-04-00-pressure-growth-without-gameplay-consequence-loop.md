# Gameplay audit: pressure growth without gameplay consequence

**Timestamp:** `2026-07-16T03-41-28-04-00`

## Summary

Pressure increases through time and collection, but the active-session loop uses fixed constants and never queries pressure. The player can observe increasing `rowPressure` without any source-backed change to pests, damage, phase, eligibility or terminal outcome.

## Plan ledger

**Goal:** require authored pressure consumers and typed effect results before pressure is treated as a gameplay mechanic.

- [x] Trace time growth and collection adjustments.
- [x] Trace pest spawn, motion and damage formulas.
- [x] Trace phase and outcome conditions.
- [x] Confirm zero pressure reads in active-session.
- [ ] Add policy, consumers and fixtures.

## Current loop

```txt
time passes
  -> pressure rises
  -> pest formula unchanged

apple collected
  -> rowPressure rises
  -> resource and score settle
  -> pest formula unchanged

day/night changes
  -> no threshold evaluation
  -> no pressure result

player condition reaches zero
  -> session ends
  -> outcome route opens
```

## Required gameplay result

```txt
PressureEffectEvaluationResult
  policyVersion
  pressureRevision
  sessionRevision
  enteredBands[]
  exitedBands[]
  proposedEffects[]
  disposition: applied | unchanged | stale | rejected | incompatible
```

Balance values are intentionally not prescribed by this audit.
