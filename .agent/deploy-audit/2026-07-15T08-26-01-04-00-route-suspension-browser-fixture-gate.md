# Deploy audit: route suspension browser fixture gate

**Timestamp:** `2026-07-15T08-26-01-04-00`  
**Repository:** `LuminaryLabs-Publish/ZombieOrchard`

## Summary

Existing smoke coverage proves entry, first Play and apple availability. It does not prove that Pause or management routes freeze pressure, hazards, damage and terminal routing.

## Plan ledger

**Goal:** block pause-safety and route-suspension claims until equivalent source, build artifact and Pages fixtures pass.

- [x] Identify missing fixture classes.
- [x] Define source and browser assertions.
- [x] Preserve current deployment behavior.
- [ ] Implement and run the matrix.

## Required fixtures

```txt
entry for 10 simulated seconds -> pressure unchanged
settings for 10 simulated seconds -> pressure unchanged
active day session -> admitted pressure growth
active night session -> admitted pest spawn/movement/damage
pause with nearby pest -> player condition unchanged
construction with nearby pest -> player condition unchanged
market/roster/inventory/codex -> player condition unchanged
pause near defeat threshold -> no outcome transition
resume -> progression restarts exactly once
title -> gameplay leases retired
stale pre-suspension tick -> rejected
Canvas2D and HTML -> same RouteRevision and SimulationRevision
source, dist and Pages -> matching results
```

## Test layers

```txt
headless deterministic domain fixture
synthetic runtime tick trace
browser interaction fixture
production dist smoke
GitHub Pages smoke
```

## Validation boundary

No tests, build, artifact or Pages smoke were run.
