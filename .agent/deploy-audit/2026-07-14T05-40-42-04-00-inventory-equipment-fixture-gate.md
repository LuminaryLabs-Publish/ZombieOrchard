# Deploy audit: inventory equipment fixture gate

**Timestamp:** `2026-07-14T05-40-42-04-00`

## Summary

Current proof validates Entry, Play, and apple presence only. It cannot detect invalid equipment admission, inert gameplay effects, missing UI state, missing Canvas2D projection, rollback failure, or source/dist/Pages divergence.

## Plan ledger

**Goal:** require executable proof before inventory equipment is treated as implemented.

- [x] Inspect `npm test` and `npm run build`.
- [x] Inspect the smoke fixture.
- [x] Map missing headless, browser, dist, and Pages rows.
- [x] Define the release gate.
- [ ] Implement and run the fixture matrix.

## Required source fixtures

```txt
owned branch equips with a new EquipmentRevision
unknown ID performs zero mutation
unowned item performs zero mutation
stale and duplicate commands classify correctly
clear result cites the accepted EquipmentRevision
equipment effect changes range or power exactly as authored
durability settles once
failed gameplay adoption restores predecessor
```

## Required browser fixtures

```txt
inventory route exposes an authored Equip control
equipped item is visibly marked
active-session HUD shows the same EquipmentRevision
Canvas2D renders the accepted equipment descriptor
clear action uses the same revision
first visible equipment frame is acknowledged
```

## Required artifact parity

```txt
source route
built dist route
GitHub Pages route
```

All three must produce matching item, equipment, gameplay-result, and visible-frame fingerprints.

## Current validation

```txt
npm test: not run in this audit
npm run build: not run in this audit
equipment fixtures: unavailable
browser equipment smoke: unavailable
dist equipment smoke: unavailable
Pages equipment smoke: unavailable
```

## Release gate

Do not claim equipment admission, gameplay effect, durability, visible state, rollback, artifact parity, or production readiness until the complete matrix passes on `main`.