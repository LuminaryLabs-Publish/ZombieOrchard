# Construction audit: placement, collision, and effect contract

**Timestamp:** `2026-07-14T00-38-19-04-00`

## Summary

Built records contain coordinates and condition, but those values are not admitted or consumed. This audit defines the minimum product contract required for a structure to exist in the orchard.

## Plan ledger

**Goal:** turn a paid catalog entry into one validated construction object with spatial, visual, physical, and gameplay ownership.

- [x] Inspect current built-record shape.
- [x] Inspect orchard bounds and world entities.
- [x] Inspect renderer and active-session consumers.
- [x] Identify missing descriptors and receipts.
- [ ] Implement a detached candidate and atomic adoption.

## Current built record

```txt
{
  id,
  type,
  label,
  x,
  y,
  condition
}
```

## Required construction descriptor

```txt
ConstructionDescriptor
  itemId
  catalogRevision
  footprint { width, height, anchor }
  render { shape, material, layer }
  collision { enabled, blocking, mask }
  placement { boundsPolicy, overlapPolicy }
  effect { effectId, parameters }
  lifecycle { durability, repair, teardown }
```

## Required placement checks

```txt
inside orchard bounds
not overlapping trees
not overlapping apples or reserved collection space
not overlapping player spawn or current player exclusion radius
not overlapping accepted structures
not blocking mandatory traversal
deterministic placement for replay
```

## Adoption participants

```txt
resource-ledger
construction-runtime
orchard-world spatial index
world-canvas renderer
active-session collision/effect system
HTML interface projection
diagnostics and persistence
```

## Rollback rule

A failed mandatory participant must restore the resource revision, remove the candidate from every consumer, and preserve the predecessor visible frame. Optional diagnostics may fail without invalidating the construction.

No placement, collision, effect, or rollback claim is made.
