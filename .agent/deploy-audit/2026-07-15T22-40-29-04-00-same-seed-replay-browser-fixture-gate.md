# Deploy audit: same-seed replay browser fixture gate

**Timestamp:** `2026-07-15T22-40-29-04-00`

## Summary

The current smoke test proves entry routing and apple presence only. It does not prove deterministic generation, same-seed replay, save/restore cursor continuity, source/dist parity or deployed Pages parity.

## Plan ledger

**Goal:** block deterministic-run claims until source, built artifact and deployed origin reproduce the same accepted seed and checkpoint hashes.

- [x] Inspect package scripts and smoke coverage.
- [x] Identify absent deterministic proof rows.
- [x] Define source, dist and Pages fixture requirements.
- [ ] Execute fixtures after implementation.

## Required fixture matrix

| Fixture | Required proof |
|---|---|
| same-seed initial | two runtimes produce identical initial canonical hashes |
| different-seed initial | different accepted seeds produce classified divergent hashes |
| apple refill | identical collect commands produce identical replacement apples and IDs |
| pest spawn | identical fixed steps produce identical pest timing, positions and IDs |
| stream isolation | extra apple-refill draws do not alter pest-spawn results |
| same-seed retry | clean retry restores the initial canonical hash |
| save/restore | next random draw after restore matches uninterrupted execution |
| replay | accepted command log reproduces checkpoint hashes |
| source/dist | source and built artifact hashes match for the same run |
| Pages | deployed origin matches the expected source/build proof row |

## Current execution boundary

```txt
npm test: not run
npm run build: not run
seeded fixtures: unavailable
replay fixtures: unavailable
restore fixtures: unavailable
source/dist parity: not run
Pages parity: not run
```
