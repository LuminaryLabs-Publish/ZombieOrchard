# Known gaps: ZombieOrchard interactive control stability

**Timestamp:** `2026-07-16T22-40-53-04-00`  
**Status:** `interactive-dom-control-stability-focus-authority-audited`

## Summary

The current renderer does not prove that the control pressed, focused, or activated by the player is the same control generation displayed across adjacent frames.

## Plan ledger

**Goal:** keep browser-control ownership and proof gaps explicit until implemented and executed.

- [x] Record source-backed node-replacement and focus-continuity gaps.
- [x] Preserve interface and domain ownership boundaries.
- [x] Define required results and browser fixtures.
- [ ] Close the gaps in runtime code.

## Gaps

```txt
stable ControlId
ControlGeneration and RouteGeneration
keyed DOM reconciliation
stable button node lifetime
pointerdown-to-pointerup control lease
keyboard focus continuity
focus restoration policy
removed-control retirement result
click/Enter/Space deduplication
stale delegated-event rejection
InterfaceControlResult
FirstStableControlFrameAck
pointer-hold browser fixture
keyboard-focus browser fixture
route-transition interaction fixture
source/dist/Pages control parity
```

## Retained gaps

The cross-domain transaction authority and previously documented audio, pressure, determinism, persistence, lifecycle, rendering, command, accessibility, and gameplay-adoption gaps remain retained unless separately implemented and validated.
