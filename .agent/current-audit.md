# Current audit: ZombieOrchard interactive DOM control stability

**Timestamp:** `2026-07-16T22-40-53-04-00`  
**Status:** `interactive-dom-control-stability-focus-authority-audited`  
**Retained status:** `cross-domain-gameplay-transaction-settlement-authority-central-reconciled`  
**Branch:** `main`

## Summary

`start.js` calls `ui.render(snapshot)` on every RAF. Both branches of `html-interface-renderer.js` then replace `root.innerHTML`, destroying and recreating every interactive button. The root-level click listener remains installed, but a pointer press or focused control can be retired before activation without an explicit result.

## Plan ledger

**Goal:** make every visible control stable for the lifetime of an admitted pointer or keyboard gesture.

- [x] Inspect page boot, RAF scheduling, HTML projection, delegated click handling, domains, smoke, build, and deployment.
- [x] Preserve all 27 implemented kits and services.
- [x] Define the 18-surface control-stability authority.
- [x] Define pointer-hold, keyboard-focus, route-transition, dist, and Pages fixtures.
- [ ] Implement and validate the authority.

## Source-backed finding

```txt
ui.render(snapshot) every RAF: present
root.innerHTML replacement every RAF: present
root-level click delegation: present

stable control node identity: absent
keyed DOM reconciliation: absent
ControlGeneration: absent
pointer press lease: absent
focus capture/restoration: absent
removed-control settlement: absent
exact activation result: absent
FirstStableControlFrameAck: absent
browser DOM interaction fixtures: 0
```

A control can be replaced between `pointerdown` and `pointerup`, and keyboard focus can be lost on the next frame. The current smoke test bypasses the DOM and dispatches engine commands directly, so it cannot prove browser control continuity.

No specific failed click or keyboard incident was reproduced. This is a source-backed ownership and executable-proof gap.

## Required authority

`zombie-orchard-interactive-dom-control-stability-focus-authority-domain`

## Validation boundary

Documentation only. No runtime, gameplay, HTML, CSS, Canvas2D, audio, dependency, test, artifact, workflow, or deployment behavior changed.
