# START HERE: ZombieOrchard interactive control stability

**Repository:** `LuminaryLabs-Publish/ZombieOrchard`  
**Branch:** `main`  
**Aligned:** `2026-07-16T22-40-53-04-00`  
**Status:** `interactive-dom-control-stability-focus-authority-audited`

## Summary

The HTML interface is rebuilt with `root.innerHTML` during every animation frame. All menu and gameplay buttons are therefore replaced continuously while pointer presses, keyboard focus, and activation gestures are still in progress. The root click delegate survives, but individual controls have no stable node identity, control generation, press lease, focus restoration, retirement result, or matching-frame acknowledgement.

## Plan ledger

**Goal:** preserve one admitted interactive control from press or focus through exact activation or retirement.

- [x] Compare the full Publish inventory and central ledger.
- [x] Select only ZombieOrchard by the oldest synchronized timestamp.
- [x] Identify the complete interaction loop, domains, 27 implemented kits, and services.
- [x] Document the 18-surface interactive-control authority and browser fixture gate.
- [ ] Implement stable DOM reconciliation and execute pointer, keyboard, route, dist, and Pages proofs.

## Read first

1. `.agent/current-audit.md`
2. `.agent/trackers/2026-07-16T22-40-53-04-00/project-breakdown.md`
3. `.agent/architecture-audit/2026-07-16T22-40-53-04-00-interactive-dom-control-stability-dsk-map.md`
4. `.agent/interface-control-audit/2026-07-16T22-40-53-04-00-stable-node-focus-press-contract.md`
5. `.agent/validation.md`

## Required authority

`zombie-orchard-interactive-dom-control-stability-focus-authority-domain`

## Retained audit

The cross-domain transaction authority and all earlier audio, pressure, determinism, persistence, lifecycle, rendering, command, accessibility, and gameplay-adoption findings remain retained.

## Boundary

Documentation only. Runtime behavior, gameplay, visual rendering, audio behavior, tests, build, and deployment remain unchanged.
