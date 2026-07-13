# Gameplay audit: runtime state to dual-surface loop

**Timestamp:** `2026-07-13T03-59-28-04-00`

## Summary

Gameplay state advances before browser presentation, but there is no receipt proving which committed gameplay revision reached both the world canvas and interface surface.

## Plan ledger

**Goal:** trace gameplay ownership into both projections and identify the missing adoption boundary.

- [x] Trace active-session, orchard, pressure, resource, construction, roster, and inventory state.
- [x] Trace runtime tick and snapshot creation.
- [x] Trace canvas and HTML consumers.
- [x] Confirm gameplay revision adoption receipts are absent.
- [ ] Add gameplay-to-visible-frame fixtures.

## Current gameplay projection

```txt
active-session tick
  -> phase, pests, movement, damage, score, and ended state

pressure-field tick
  -> pressure channel mutation

interface-composition tick
  -> automatic Outcome routing when session ends

runtime snapshot
  -> independent domain snapshots

canvas
  -> orchard trees and apples
  -> active-session player and pests

HTML
  -> active route and activeSnapshot
  -> resources, pressure, construction, roster, inventory, and session HUD
```

## Coherence risks

```txt
canvas and HTML do not cite one gameplay StateRevision
Outcome route can change while the canvas continues to draw active-session world state
canvas does not display resource, pressure, construction, roster, or inventory revisions
HTML does not identify the world projection revision it accompanies
reentrant publication can separate observer state from rendered state
partial renderer success can expose mixed gameplay revisions
```

## Required gameplay receipts

```txt
GameplayStateRevision
InterfaceRouteRevision
WorldProjectionAdoptionReceipt
HudProjectionAdoptionReceipt
OutcomeProjectionAdoptionReceipt
DualSurfaceGameplayFrameResult
```

## Required transaction

```txt
gameplay tick result
  -> immutable FrameEnvelope
  -> route/world visibility decision
  -> world projection candidate
  -> interface projection candidate
  -> dual-surface commit
  -> gameplay frame adoption receipts
  -> first visible gameplay frame acknowledgement
```

## Required fixtures

```txt
apple collection -> matching canvas and HUD revision
resource grant -> HUD revision tied to same frame envelope
night pest spawn -> canvas and HUD phase share revision
player failure -> Outcome route and world policy commit together
construction or roster change -> interface projection cites committed gameplay revision
partial render failure -> no false complete gameplay frame
```

## Validation boundary

Documentation only. Gameplay state, simulation, and rendering behavior are unchanged.
