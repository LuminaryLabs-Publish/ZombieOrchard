# Deploy audit: interactive control browser fixture gate

**Timestamp:** `2026-07-16T22-40-53-04-00`

## Required fixtures

```txt
source origin
  -> pointerdown, hold across 10 RAF frames, pointerup
  -> exactly one activation from the same ControlId

keyboard
  -> Tab to each route action
  -> retain focus across 10 RAF frames
  -> Enter and Space activate exactly once

route transition
  -> retire old controls
  -> focus one eligible successor or body by policy
  -> reject stale click evidence

dist artifact
  -> repeat pointer and keyboard fixtures

Pages origin
  -> repeat fixtures against deployed commit
  -> bind artifact hash and commit
```

## Gate

Build and Pages publication are not interaction-proven until source, dist, and deployed-origin results agree and `FirstStableControlFrameAck` is observed.
