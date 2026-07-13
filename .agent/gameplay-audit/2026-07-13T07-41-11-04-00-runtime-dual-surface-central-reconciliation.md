# Gameplay audit: runtime dual-surface reconciliation

**Timestamp:** `2026-07-13T07-41-11-04-00`

## Summary

Gameplay mutation and presentation are not transactionally correlated. Pressure, pests, player damage, route outcomes, canvas entities, and HTML HUD can be derived from separate captures or partially applied surfaces without a shared committed-frame result.

## Plan ledger

**Goal:** preserve gameplay ownership while requiring one visible result for each accepted runtime transition.

- [x] Trace commands and ticks into gameplay domains.
- [x] Trace active-session failure into automatic Outcome routing.
- [x] Trace the returned runtime snapshot into both presentation surfaces.
- [x] Identify gameplay consequences of partial or stale presentation.
- [ ] Bind gameplay revisions to one immutable presentation envelope.

## Gameplay loop

```txt
command or tick
  -> resource, pressure, orchard, construction, roster, inventory, active-session, and route mutation
  -> runtime publication snapshot
  -> separate browser snapshot capture
  -> canvas projects world/session state
  -> HTML projects route/HUD state
  -> no aggregate visible result
```

## Reachable contradictions

```txt
canvas applies successor player/pests, HTML retains predecessor HUD
HTML applies Outcome, canvas retains predecessor active world
reentrant subscriber mutates state after publication but before browser snapshot
GameHost reads a successor state that has not produced a complete visible frame
renderer failure prevents successor scheduling without a typed runtime result
```

## Required gameplay evidence

```txt
RunGeneration
StateRevision
ActiveSessionRevision
InterfaceRouteRevision
FrameEnvelopeId
CanvasProjectionResult
HtmlProjectionResult
DualSurfaceFrameCommitResult
FirstDualSurfaceFrameAck
```

## Ownership rule

Gameplay domains own state and rules. Presentation authority may cite and validate gameplay revisions, but it must not duplicate movement, economy, pest, outcome, or route semantics.

## Non-claims

No gameplay implementation changed. No player-state/HUD parity or Outcome/world coherence is proven.