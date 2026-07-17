# START HERE: ZombieOrchard browser host lifecycle ownership

**Repository:** `LuminaryLabs-Publish/ZombieOrchard`  
**Branch:** `main`  
**Aligned:** `2026-07-17T04-41-15-04-00`  
**Status:** `browser-host-single-runtime-lifecycle-retirement-authority-audited`

## Summary

The browser host is created through side-effect module evaluation. Engine, renderers, delegated click listener, recursive RAF, and `window.GameHost` are made live without one HostSessionId, singleton lease, stop/dispose path, replacement policy, or first host-bound frame acknowledgement.

A normal static load currently executes once; no duplicate-runtime incident was reproduced. The gap is explicit lifecycle ownership for future recovery, replacement, BFCache handling, and re-execution.

## Checklist

- [x] Compare the full Publish inventory and central ledger.
- [x] Select only ZombieOrchard by the oldest synchronized timestamp.
- [x] Identify the complete interaction loop, all domains, 27 implemented kits, and their services.
- [x] Document the 18-surface host-lifecycle authority and deployment fixture gate.
- [x] Retain the prior phase-transition audit and all earlier findings.
- [ ] Implement host admission/retirement and execute browser lifecycle fixtures.

## Read first

1. `.agent/current-audit.md`
2. `.agent/trackers/2026-07-17T04-41-15-04-00/project-breakdown.md`
3. `.agent/architecture-audit/2026-07-17T04-41-15-04-00-browser-host-lifecycle-dsk-map.md`
4. `.agent/host-lifecycle-audit/2026-07-17T04-41-15-04-00-single-runtime-retirement-contract.md`
5. `.agent/validation.md`

## Required authority

`zombie-orchard-browser-host-single-runtime-lifecycle-retirement-authority-domain`

## Retained audits

The `2026-07-16T22-59-23-04-00` day/phase transition audit and all earlier control, transaction, audio, pressure, determinism, persistence, lifecycle, rendering, command, accessibility, kit-graph, and gameplay-adoption findings remain retained.

## Boundary

Documentation only. Runtime behavior, gameplay, rendering, input, tests, build, and deployment remain unchanged.