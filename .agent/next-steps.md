# Next steps: ZombieOrchard player movement control coverage

**Timestamp:** `2026-07-15T17-38-05-04-00`  
**Status:** `player-movement-action-coverage-authority-audited`

## Summary

Implement one normalized player-control authority before adding isolated key listeners. Movement must remain gameplay-owned, while device adapters produce only normalized intent and lifecycle-safe held-action state.

## Plan ledger

**Goal:** make the harvest-and-defend loop intentionally navigable across keyboard and touch-compatible profiles, with explicit results and visible-frame proof.

- [ ] Define `PlayerActionState`, `MovementCommand`, `MovementResult`, and `PlayerPositionRevision`.
- [ ] Add keyboard WASD and arrow-key production.
- [ ] Add visible touch-compatible directional controls.
- [ ] Add optional gamepad production behind the same action map.
- [ ] Convert movement from event-repeat steps to a time-based movement policy.
- [ ] Block movement while non-gameplay routes or overlays own focus.
- [ ] Cancel held actions on keyup, pointerup, pointercancel, blur, hide, route transition, and page retirement.
- [ ] Deduplicate hybrid-device input.
- [ ] Bind accepted movement to Canvas2D and HTML receipts.
- [ ] Publish `FirstPlayerMovementFrameAck`.
- [ ] Add headless bounds and stale-revision fixtures.
- [ ] Add browser keyboard, touch, gamepad, hybrid, lifecycle, proximity, source/dist, and Pages fixtures.

## Checkpoint

Do not claim playable movement until a user can intentionally approach an apple, collect it, approach a pest, clear it, release all held movement, and observe matching frame revisions through at least keyboard and touch-compatible profiles.
