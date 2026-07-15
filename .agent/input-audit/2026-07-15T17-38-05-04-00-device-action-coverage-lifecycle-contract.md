# Input audit: device action coverage and lifecycle contract

**Timestamp:** `2026-07-15T17-38-05-04-00`

## Summary

ZombieOrchard has click activation for commands and routes but no admitted movement profile. A complete profile must cover directional movement and lifecycle cancellation without duplicating gameplay authority in device adapters.

## Plan ledger

**Goal:** admit complete control profiles and retire held actions safely across route, focus, visibility, and page lifecycle changes.

- [x] Inventory current click producers.
- [x] Confirm keyboard, touch, pointer-drag, gamepad, and on-screen movement producers are absent.
- [x] Define required action coverage and lifecycle rules.
- [ ] Implement at least keyboard and visible touch-compatible movement profiles.

## Required action vocabulary

```txt
move-x
move-y
collect
clear
next-phase
pause
open-build
open-market
open-roster
open-inventory
open-codex
cancel/back
```

## Admission rule

A profile is playable only when it supplies directional movement plus the required interaction and route actions. On-screen controls must be visible before a touch-only profile is accepted.

## Lifecycle rule

```txt
keydown / pointerdown / gamepad activation
  -> acquire HeldActionGeneration
keyup / pointerup / pointercancel / gamepad release
  -> retire held action
blur / visibility hidden / route transition / pagehide
  -> cancel every held action exactly once
resume
  -> require fresh physical input before movement resumes
```

## Hybrid rule

Keyboard, touch, pointer, and gamepad producers feed one normalized action state. Duplicate simultaneous producers are merged by policy rather than submitted as repeated movement commands.

## Validation boundary

No physical-device, keyboard-only, touch-only, gamepad, hybrid-input, or lifecycle fixture was executed.
