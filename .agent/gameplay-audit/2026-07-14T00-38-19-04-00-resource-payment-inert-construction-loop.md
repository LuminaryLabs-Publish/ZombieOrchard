# Gameplay audit: resource payment and inert construction loop

**Timestamp:** `2026-07-14T00-38-19-04-00`

## Summary

The Storage Shed consumes four wood and eight money, then becomes only a record. It does not increase storage, protect resources, alter pest behavior, create collision, or affect any active-session rule.

## Plan ledger

**Goal:** ensure paid construction produces an authored gameplay effect only after successful world adoption.

- [x] Trace the Storage Shed descriptor.
- [x] Trace payment and built-record mutation.
- [x] Search active gameplay consumers.
- [x] Confirm no structure effect exists.
- [x] Define effect-adoption and rollback requirements.
- [ ] Implement and prove the first real structure effect.

## Current loop

```txt
start with money 40 and wood 12
  -> buy Storage Shed
  -> money 32 and wood 8
  -> append built record
  -> no capacity change
  -> no inventory change
  -> no apple-storage change
  -> no pressure change
  -> no player/pest collision change
  -> no score or progression change
```

## Required gameplay settlement

```txt
ConstructionEffectDescriptor
  -> stable effect ID
  -> activation prerequisites
  -> capacity/production/defense values
  -> simulation participant
  -> snapshot projection
  -> teardown and rollback behavior

accepted ConstructionSettlementResult
  -> activate effect exactly once
rejected/failed result
  -> activate no effect
```

## Recommended first effect

Keep the first implementation narrow: the Storage Shed should define a deterministic apple-storage capacity or retained-apple bonus. The effect must be snapshot-visible, revisioned, replayable, and removed during rollback.

No gameplay-effect claim is made.
