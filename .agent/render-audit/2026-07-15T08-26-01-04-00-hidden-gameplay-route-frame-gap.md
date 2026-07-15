# Render audit: hidden gameplay route frame gap

**Timestamp:** `2026-07-15T08-26-01-04-00`  
**Repository:** `LuminaryLabs-Publish/ZombieOrchard`

## Summary

Canvas2D always renders orchard and active-session state, while HTML renders only the currently selected interface route. Because the active route does not suspend gameplay, a Pause or management screen can cover a world that continues changing underneath it.

## Plan ledger

**Goal:** make both render surfaces cite one accepted route and simulation revision.

- [x] Trace render order after each runtime tick.
- [x] Confirm Canvas2D consumes active-session state regardless interface route.
- [x] Confirm HTML replaces the HUD with the selected route.
- [x] Identify the missing shared receipt.
- [ ] Add route-bound render fixtures.

## Current projection

```txt
runtime tick
  -> pressure and active-session mutate
  -> interface composition may mutate
  -> snapshot
  -> Canvas2D renders active-session world
  -> HTML renders selected route
```

## Gap

```txt
RouteRevision: absent from render receipts
SimulationRevision: absent
suspension state in snapshot: absent
Canvas route receipt: absent
HTML route receipt: absent
hidden gameplay mutation indicator: absent
FirstRouteBoundVisibleFrameAck: absent
```

## Required proof

Pause, Build, Market, Roster, Inventory and Codex frames must show zero unauthorized pressure, pest, movement, damage or outcome mutation, and both surfaces must cite the same accepted route/simulation revision.

## Validation boundary

No browser frame or visual regression fixture was run.
