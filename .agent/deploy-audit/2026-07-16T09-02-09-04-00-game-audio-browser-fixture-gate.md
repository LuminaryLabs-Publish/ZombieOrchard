# Deploy audit: game audio browser fixture gate

**Timestamp:** `2026-07-16T09-02-09-04-00`

## Summary

The package has smoke and static-build scripts but no browser audio fixture, unlock proof, lifecycle proof, or source/dist/Pages audiovisual parity gate.

## Plan ledger

**Goal:** block audible-gameplay and deployment-readiness claims until browser audio behaves consistently in source, built artifact, and deployed origin.

- [x] Inspect package scripts and current smoke scope.
- [x] Define the required browser fixture matrix.
- [ ] Execute fixtures.

## Required fixture matrix

```txt
Web Audio unavailable fallback
first accepted gesture unlock
suspended context resume
interface accepted/rejected cues
red and gold collection cues
clear hit and pest defeat cues
contact damage and terminal failure cues
build/hire payment outcomes
day/night transition and ambience lifecycle
mute and category preferences
deduplication and voice-budget saturation
pause, blur, hidden, pagehide and route retirement
FirstAudibleCueAck
FirstAudioVisualConvergenceAck
source versus dist parity
dist versus Pages parity
```

## Current proof

```txt
npm test: not run
npm run build: not run
browser audio fixtures: unavailable
unlock/lifecycle fixtures: unavailable
source/dist parity: not run
Pages parity: not run
```