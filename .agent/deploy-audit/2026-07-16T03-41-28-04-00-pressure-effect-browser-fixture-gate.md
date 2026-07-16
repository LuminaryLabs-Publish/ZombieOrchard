# Deploy audit: pressure-effect browser fixture gate

**Timestamp:** `2026-07-16T03-41-28-04-00`

## Summary

The package exposes smoke and static-build commands, but no fixture proves pressure threshold behavior, consumer adoption, restore/replay continuity or source/dist/Pages parity.

## Plan ledger

**Goal:** block pressure-readiness claims until the same authored pressure policy produces the same accepted results and visible acknowledgements across source, built artifact and deployed origin.

- [x] Inspect package scripts and smoke coverage.
- [x] Define required fixture matrix.
- [ ] Execute fixtures.

## Required fixture matrix

```txt
initial low-pressure state
exact lower boundary
exact upper boundary
single threshold entry
sustained occupancy without duplicate entry
threshold exit with hysteresis
collection-induced crossing
time-induced crossing
day/night policy filter
consumer rejection and rollback
save/restore inside a band
replay across a crossing
FirstPressureEffectFrameAck
source versus dist parity
dist versus Pages parity
```

## Current proof

```txt
npm test: not run
npm run build: not run
pressure fixtures: unavailable
browser fixtures: unavailable
dist fixtures: unavailable
Pages fixtures: unavailable
```
