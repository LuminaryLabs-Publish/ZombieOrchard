# Current audit: ZombieOrchard day/phase transition admission

**Timestamp:** `2026-07-16T22-59-23-04-00`  
**Status:** `day-phase-transition-admission-settlement-authority-audited`  
**Retained status:** `interactive-dom-control-stability-focus-authority-audited`  
**Branch:** `main`

## Summary

The active-session `next-phase` command toggles phase immediately and increments the day counter whenever the resulting phase is day. The HTML control dispatches this command directly, while night pest behavior is evaluated only during a later engine tick. Multiple activations before the next RAF can therefore skip an admitted night simulation tick.

## Plan ledger

**Goal:** bind phase changes, day increments, pressure/pest settlement, and visible projection to one transition generation.

- [x] Inspect page boot, RAF scheduling, direct command handling, active-session phase mutation, pressure, pests, HTML/Canvas projection, smoke, build, and deployment.
- [x] Preserve all 27 implemented kits and services.
- [x] Define the 19-surface phase-transition authority.
- [x] Define rapid-double-activation, zero-night-tick, stale-phase, dist, and Pages fixtures.
- [ ] Implement and validate the authority.

## Source-backed finding

```txt
direct Next Phase command: present
unconditional phase toggle: present
night-to-day day increment: present
night-only pest simulation: present
next simulation tick deferred to RAF: present

PhaseTransitionId: absent
expected phase/day/session revision: absent
minimum phase duration: absent
pending transition lock: absent
transition idempotency: absent
participant settlement result: absent
FirstPhaseBoundFrameAck: absent
phase browser fixtures: 0
```

Two accepted commands can complete `day -> night -> day` before the next RAF. The day counter advances, while no night pest simulation tick is guaranteed and the intermediate phase may never be rendered.

No production exploit was reproduced. This is a source-backed gameplay-policy and executable-proof gap.

## Required authority

`zombie-orchard-day-phase-transition-admission-settlement-authority-domain`

## Validation boundary

Documentation only. No runtime, gameplay, HTML, CSS, Canvas2D, audio, dependency, test, artifact, workflow, or deployment behavior changed.