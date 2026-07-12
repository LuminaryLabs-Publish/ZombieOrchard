# ZombieOrchard Pixel Budget, Projection and Surface Revision Contract

**Timestamp:** `2026-07-12T06-11-18-04-00`

## Summary

A render surface is not only the canvas element. It is the committed combination of CSS dimensions, physical drawing-buffer dimensions, DPR policy, pixel budget, world projection and the frame that used them. `ZombieOrchard` currently records none of those as durable state.

## Plan ledger

**Goal:** define the canonical data and lifecycle contract for every canvas surface revision.

- [x] Identify the current ambient inputs.
- [x] Identify required surface identities and revisions.
- [x] Define pixel-budget admission.
- [x] Define projection and membership outputs.
- [x] Define commit, rollback and observation rules.
- [x] Define visible-frame acknowledgement.
- [ ] Implement the contract.
- [ ] Prove it across the viewport matrix.

## Canonical surface descriptor

```txt
CanvasRenderSurface
  surfaceId
  surfaceRevision
  runtimeSessionId
  resizeGeneration
  sourceObservationId
  cssWidth
  cssHeight
  requestedDpr
  appliedDpr
  requestedBufferWidth
  requestedBufferHeight
  actualBufferWidth
  actualBufferHeight
  pixelCount
  pixelBudget
  fallbackTier
  nominalWorldWidth
  nominalWorldHeight
  worldScale
  worldOffsetX
  worldOffsetY
  projectionPolicyRevision
  committedAt
```

## Invariants

```txt
cssWidth > 0
cssHeight > 0
actualBufferWidth > 0
actualBufferHeight > 0
pixelCount = actualBufferWidth * actualBufferHeight
pixelCount <= admitted pixelBudget
surfaceRevision increases only after a successful commit
world projection derives only from committed dimensions
unchanged candidate dimensions do not reset the drawing buffer
stale resize generations cannot replace newer surfaces
failed preparation preserves the predecessor descriptor and buffer
visible frame cites exactly one committed surface revision
```

## Pixel-budget policy

The policy must distinguish:

```txt
requested DPR
product maximum DPR
capability maximum dimensions
product maximum pixel count
minimum acceptable quality tier
```

Candidate derivation:

```txt
requestedWidth  = round(cssWidth  * normalizedDpr)
requestedHeight = round(cssHeight * normalizedDpr)

if requestedWidth * requestedHeight exceeds budget:
  reduce appliedDpr deterministically
  or select a declared fallback tier

never allocate an unbounded candidate
```

## Projection policy

Nominal gameplay bounds are approximately `720 x 560`.

A contain policy can derive:

```txt
worldScale = min(cssWidth / 720, cssHeight / 560)
worldOffsetX = cssWidth / 2
worldOffsetY = cssHeight / 2
```

Entity projection then becomes:

```txt
screenX = worldOffsetX + worldX * worldScale
screenY = worldOffsetY + worldY * worldScale
```

A follow-camera or hybrid policy may replace this, but it must produce the same descriptor fields and revisioned result.

## Preparation and commit

```txt
previous committed surface
  -> receive candidate plan
  -> verify expected predecessor revision
  -> skip mutation when dimensions are unchanged
  -> write candidate canvas dimensions
  -> read actual dimensions
  -> verify budget and readback
  -> commit candidate descriptor
  -> otherwise restore/preserve predecessor result
```

## Observation contract

Public-safe observation should expose:

```txt
surfaceId
surfaceRevision
css dimensions
applied DPR
actual buffer dimensions
pixel count and budget
fallback tier
world scale and offset
last commit result
last visible frame ID
```

It should not expose the raw mutable canvas or context through the public capability boundary.

## Visible-frame contract

```txt
surface revision committed
  -> world renderer draws using that revision
  -> HTML renderer produces its stage result
  -> frame cycle classifies required surfaces
  -> visible receipt records stateRevision + surfaceRevision
```

A scheduled RAF callback or committed surface alone is not proof that pixels were presented.

## Fault classes

```txt
invalid-observation
stale-generation
stale-predecessor
pixel-budget-rejected
capability-rejected
allocation-failed
readback-mismatch
projection-policy-failed
world-render-failed
visible-frame-unacknowledged
```

## Gate

The surface descriptor, plan, result and receipt must remain immutable. Render code may consume committed values, but it must not silently rewrite surface policy.
