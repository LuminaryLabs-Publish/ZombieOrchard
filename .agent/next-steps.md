# Next steps: ZombieOrchard browser host lifecycle ownership

**Timestamp:** `2026-07-17T04-41-15-04-00`  
**Status:** `browser-host-single-runtime-lifecycle-retirement-authority-audited`

## Summary

The next implementation slice is a small browser-host wrapper that admits one HostSessionId, owns all boot resources, retires them exactly once, and proves the first visible frame from the accepted generation.

## Checklist

**Goal:** prevent duplicate, stale, or replaced host generations from ticking, handling controls, mutating the DOM, or exposing live capabilities.

- [ ] Export an explicit `startZombieOrchardHost()` instead of relying only on side-effect startup.
- [ ] Allocate `HostSessionId`, document/root revisions, and one singleton runtime lease.
- [ ] Store the active RAF handle and reject stale callbacks by generation.
- [ ] Make the HTML renderer return listener disposal.
- [ ] Add renderer and engine/domain disposal adapters.
- [ ] Retire or replace `window.GameHost` by capability generation.
- [ ] Define pagehide/pageshow and BFCache suspend/resume/replace policy.
- [ ] Publish `HostLifecycleResult` and `FirstHostBoundFrameAck`.
- [ ] Add duplicate-boot, listener-retirement, stale-RAF, BFCache, source, dist, and Pages fixtures.

## Ordering

```txt
host identity and root revisions
  -> singleton boot admission
  -> detached resource construction
  -> atomic host commit
  -> first accepted frame acknowledgement
  -> exact retirement and stale-work rejection
  -> replacement/BFCache policy
  -> source/dist/Pages parity
```

Preserve all existing product domains. This is targeted host ownership around `src/start.js`, not a runtime or gameplay rewrite.