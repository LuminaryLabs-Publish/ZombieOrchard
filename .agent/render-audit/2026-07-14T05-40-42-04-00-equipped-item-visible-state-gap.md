# Render audit: equipped item visible-state gap

**Timestamp:** `2026-07-14T05-40-42-04-00`

## Summary

The renderer cannot prove equipment state. The inventory screen lists item cards without an equipped marker, the active-session HUD omits equipment, and Canvas2D draws no held item or effect indicator.

## Plan ledger

**Goal:** make HTML and Canvas2D project the same accepted equipment revision and acknowledge its first visible frame.

- [x] Trace inventory snapshot consumers.
- [x] Inspect inventory-screen HTML projection.
- [x] Inspect active-session HUD projection.
- [x] Inspect Canvas2D player projection.
- [x] Record revision and frame-proof gaps.
- [ ] Implement matching equipment projection and browser proof.

## Current projection

```txt
inventory-runtime snapshot
  -> items[] shown as generic cards
  -> equipped string not shown

active-session HUD
  -> day, phase, resources, pressure, condition
  -> equipped item omitted

world canvas
  -> trees, apples, pests, player rectangle
  -> held item, reach, attack effect, and durability omitted
```

## Missing evidence

```txt
EquipmentRevision
item content fingerprint
equipped-card marker
HUD equipped indicator
Canvas2D equipment descriptor
ClearAction effect revision
FirstVisibleEquipmentFrameAck
```

## Required proof

A browser fixture must equip a known item, observe the accepted equipment revision, verify the inventory marker and HUD, capture a Canvas2D frame tied to the same revision, execute a clear action whose result cites that revision, and reject stale or unknown equipment without changing the visible predecessor.

## Validation boundary

No renderer or UI behavior changed. No visible equipment-state or frame-coherence claim is made.