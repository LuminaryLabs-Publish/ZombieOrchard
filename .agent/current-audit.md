# Current audit: ZombieOrchard game audio event projection

**Timestamp:** `2026-07-16T09-02-09-04-00`  
**Status:** `game-audio-event-projection-authority-audited`  
**Retained status:** `pressure-threshold-gameplay-adoption-authority-central-reconciled`  
**Branch:** `main`

## Summary

ZombieOrchard produces accepted route, gameplay, economy, phase, damage, failure, and outcome results, then projects snapshots through Canvas2D and HTML. The browser host has no audio capability observer, accepted gesture unlock, semantic event schema, cue registry, preference bus, lifecycle settlement, deduplication, voice budget, or audible acknowledgement.

## Plan ledger

**Goal:** bind accepted semantic results to lifecycle-safe browser audio while preserving current gameplay and renderer ownership.

- [x] Inspect boot, runtime, command dispatch, gameplay transitions, HTML, Canvas2D, smoke, build, and deployment.
- [x] Preserve all 27 implemented kits and services.
- [x] Define the 20-surface game-audio authority.
- [x] Define browser unlock, lifecycle, parity, and audiovisual convergence fixtures.
- [ ] Implement and validate the authority.

## Source-backed finding

```txt
AudioContext creation: absent
audio provider import: absent
accepted user-gesture unlock: absent
semantic AudioEventId: absent
cue descriptor registry: absent
audio preferences: absent
ambience lifecycle: absent
spatial projection: absent
cue deduplication: absent
voice pooling/budget: absent
page lifecycle audio settlement: absent
FirstAudibleCueAck: absent
FirstAudioVisualConvergenceAck: absent
browser audio fixture count: 0
```

## Required authority

`zombie-orchard-game-audio-event-projection-authority-domain`

## Validation boundary

Documentation only. No runtime, gameplay, HTML, Canvas2D, audio, dependency, test, artifact, workflow, or deployment behavior changed.