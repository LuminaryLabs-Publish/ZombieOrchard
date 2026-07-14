# Render audit: hired worker visible-state gap

**Timestamp:** `2026-07-14T10-59-56-04-00`

## Summary

HTML can display stored roster actors when the roster route is open, but active-session HUD and Canvas2D have no roster consumers. A successful raw hire therefore has no visible gameplay-world confirmation and no revisioned first-frame evidence.

## Plan ledger

**Goal:** require roster, HUD and Canvas2D to project one accepted roster and worker-effect revision.

- [x] Inspect roster cards, HUD and Canvas2D inputs.
- [x] Identify the visible-state divergence.
- [x] Define required projection receipts.
- [ ] Implement and browser-test matching projections.

## Current projection

```txt
roster route
  -> html-interface-render-kit reads roster-runtime.actors
  -> actor cards show name and role

active-session HUD
  -> reads day, phase, resources, pressure and player condition
  -> reads no roster state

Canvas2D
  -> reads orchard-world and active-session
  -> draws trees, apples, pests and player
  -> draws no workers or labor effects
```

## Risks

- A raw command can mutate roster state while the player sees no world effect.
- The roster card may display an unsafe caller-controlled name through `innerHTML`.
- A stored actor and an operational actor are visually indistinguishable.
- No frame identifies the roster or worker-effect revision it represents.
- Browser proof can pass even when hired actors remain inert.

## Required visible contract

```txt
accepted RosterRevision
  -> roster route marks actor identity, role and status
  -> active HUD shows worker count or active labor effect
  -> Canvas2D projects the admitted worker or authored labor indicator
  -> all consumers cite the same RosterRevision and WorkerEffectRevision
  -> FirstVisibleRosterFrameAck confirms the accepted frame
```

## Required failure behavior

If any mandatory projection cannot prepare, the hire transaction must not settle. The resource reservation must be released and predecessor roster, gameplay and presentation revisions must remain visible.