# Current audit: ZombieOrchard player movement control coverage

**Timestamp:** `2026-07-15T17-38-05-04-00`  
**Status:** `player-movement-action-coverage-authority-audited`  
**Retained status:** `save-slot-session-selection-admission-authority-central-reconciled`  
**Branch:** `main`

## Summary

`active-session` accepts movement and Canvas2D renders the player position, but no shipped keyboard, pointer, touch, gamepad, or on-screen producer submits movement. The visible gameplay surface exposes only Collect, Clear, Next Phase, and route actions.

## Plan ledger

**Goal:** admit complete control profiles and bind directional intent to accepted position state and a matching visible frame.

- [x] Inspect boot and browser listeners.
- [x] Inspect HTML command producers.
- [x] Inspect movement, bounds, proximity checks, and rendering.
- [x] Inspect smoke, build, deployment, and central tracking.
- [x] Record all 27 implemented kits and services.
- [x] Define the 19-surface player-control authority.
- [ ] Implement and validate the authority.

## Source-backed finding

```txt
move command: present
movement producer: absent
directional HTML controls: absent
collect radius: 42
clear distance: 58
movement fixture: absent
FirstPlayerMovementFrameAck: absent
```

## Required authority

`zombie-orchard-player-movement-control-action-coverage-authority-domain`

## Validation boundary

Documentation only. No runtime behavior, test, artifact, or deployment result changed.
