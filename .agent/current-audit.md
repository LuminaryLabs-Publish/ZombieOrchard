# Current audit: ZombieOrchard browser host lifecycle ownership

**Timestamp:** `2026-07-17T04-41-15-04-00`  
**Status:** `browser-host-single-runtime-lifecycle-retirement-authority-audited`  
**Retained status:** `day-phase-transition-admission-settlement-authority-audited`  
**Branch:** `main`

## Summary

`src/start.js` constructs the engine, Canvas2D renderer, HTML renderer, click listener, public `GameHost`, and recursive RAF as one-way module side effects. No accepted host identity owns those resources, and no stop, dispose, replacement, page-lifecycle, or first-frame result exists.

## Checklist

**Goal:** bind boot, runtime ownership, retirement, replacement, and visible presentation to one HostSessionId.

- [x] Inspect page boot, module evaluation, engine creation, renderer creation, listener installation, RAF scheduling, public capabilities, smoke, build, and deployment.
- [x] Preserve all 27 implemented kits and services.
- [x] Define the 18-surface host-lifecycle authority.
- [x] Define duplicate-boot, stale-RAF, listener-retirement, BFCache, artifact, and Pages fixtures.
- [ ] Implement and validate the authority.

## Source-backed finding

```txt
side-effect host construction: present
recursive RAF with closure-only ownership: present
root delegated click listener: present
window.GameHost publication: present

HostSessionId: absent
singleton runtime lease: absent
stored/cancellable RAF generation: absent
listener disposal: absent
renderer disposal: absent
engine/domain disposal: absent
pagehide/pageshow policy: absent
HostLifecycleResult: absent
FirstHostBoundFrameAck: absent
browser lifecycle fixtures: 0
```

A normal static load currently creates one host. No duplicate-runtime, leaked-listener, BFCache, or stale-capability incident was reproduced. This is a source-backed lifecycle ownership and executable-proof gap.

## Required authority

`zombie-orchard-browser-host-single-runtime-lifecycle-retirement-authority-domain`

## Validation boundary

Documentation only. No runtime, gameplay, HTML, CSS, Canvas2D, input, dependency, test, artifact, workflow, or deployment behavior changed.