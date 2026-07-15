# Known gaps: ZombieOrchard player movement control coverage

**Timestamp:** `2026-07-15T17-38-05-04-00`  
**Status:** `player-movement-action-coverage-authority-audited`

## Summary

The current priority gap is a movement consumer without a shipped movement producer. Proximity-gated collecting and clearing cannot be intentionally navigated through the visible product controls.

## Plan ledger

**Goal:** close device coverage, lifecycle, command settlement, and visible-frame evidence gaps without moving gameplay authority into browser adapters.

- [ ] Movement action schema and control profile.
- [ ] Keyboard movement producer.
- [ ] Visible touch-compatible movement producer.
- [ ] Optional gamepad movement producer.
- [ ] Time-based movement rate policy.
- [ ] Focus and overlay arbitration.
- [ ] Held-action cancellation on lifecycle changes.
- [ ] Hybrid-input deduplication.
- [ ] Command identity and expected position revision.
- [ ] Typed accepted, rejected, cancelled, and stale results.
- [ ] Canvas2D presentation receipt.
- [ ] First matching movement-frame acknowledgement.
- [ ] Source, dist, and Pages fixture coverage.

## Current evidence gaps

```txt
keyboard movement listeners: 0
pointer/touch movement producers: 0
gamepad producers: 0
on-screen directional controls: 0
movement smoke assertions: 0
browser movement traces: 0
artifact movement traces: 0
deployed movement traces: 0
```

## Retained gaps

Prior save, route-suspension, clock, canvas, diagnostic, reset, roster, inventory, construction, HTML, startup, frame-coherence, event, and observer findings remain retained in their timestamped audit families.
