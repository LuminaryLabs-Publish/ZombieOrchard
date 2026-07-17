# Known gaps: ZombieOrchard browser host lifecycle ownership

**Timestamp:** `2026-07-17T04-41-15-04-00`  
**Status:** `browser-host-single-runtime-lifecycle-retirement-authority-audited`

## Summary

The current host assumes a single successful module execution but does not encode or prove single-runtime ownership, exact retirement, replacement, page lifecycle handling, or frame correlation.

## Checklist

**Goal:** keep host ownership and proof gaps explicit until implemented and executed.

- [x] Record source-backed boot, RAF, listener, renderer, engine, and GameHost lifecycle gaps.
- [x] Preserve current game, renderer, and interface boundaries.
- [x] Define required results and fixtures.
- [ ] Close the gaps in runtime code.

## Gaps

```txt
HostSessionId and HostGeneration
DocumentGeneration and root revisions
singleton runtime lease
boot duplicate/stale/replacement policy
stored RAF handle and RafLoopGeneration
stale RAF rejection
DOM listener lease and removal
Canvas2D/HTML renderer disposal
engine/domain/subscription disposal
partial-construction rollback
pagehide/pageshow and BFCache policy
GameHost capability generation and retirement
HostBootAdmissionResult
HostLifecycleResult
FirstHostBoundFrameAck
duplicate-boot fixture
listener-retirement fixture
stale-RAF fixture
BFCache fixture
source/dist/Pages lifecycle parity
```

## Retained gaps

The day/phase transition audit and all earlier control, transaction, audio, pressure, determinism, persistence, lifecycle, rendering, command, accessibility, kit-graph, and gameplay-adoption gaps remain retained unless separately implemented and validated.