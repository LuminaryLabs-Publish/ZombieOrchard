# Current audit: ZombieOrchard player stamina adoption

**Timestamp:** `2026-07-17T09-43-24-04-00`  
**Status:** `player-stamina-effort-recovery-projection-authority-audited`  
**Retained status:** `browser-host-single-runtime-lifecycle-retirement-authority-central-reconciled`  
**Branch:** `main`

## Summary

The active-session player snapshot includes stamina, but the implemented game has no stamina capability. Commands do not resolve effort costs, ticks and phases do not recover it, pressure does not modify it, and renderers do not project it.

## Checklist

**Goal:** make the public stamina field truthful by admitting deterministic effort, exhaustion, recovery and visible projection, or remove it until such a capability exists.

- [x] Inspect player construction, move, collect, clear, next-phase, tick, pressure, HUD, outcome and smoke paths.
- [x] Preserve all 27 implemented kits and services.
- [x] Define the 19-surface stamina authority.
- [x] Define depletion, rejection, recovery, frame and origin-parity fixtures.
- [ ] Implement and validate the authority.

## Source-backed finding

```txt
player.stamina initialized to 100: present
stamina included in snapshot: present
action cost policy: absent
movement depletion: absent
collection depletion: absent
clearing depletion: absent
exhaustion state: absent
passive recovery: absent
phase recovery: absent
pressure coupling: absent
HUD projection: absent
outcome projection: absent
StaminaActionResult: absent
FirstStaminaBoundFrameAck: absent
stamina fixtures: 0
```

No player-facing stamina failure was reproduced because the game currently ignores the field. This is a gameplay-capability, state-truthfulness and executable-proof gap.

## Required authority

`zombie-orchard-player-stamina-effort-recovery-projection-authority-domain`

## Validation boundary

Documentation only. No runtime, gameplay, HTML, CSS, Canvas2D, input, dependency, test, artifact, workflow or deployment behavior changed.