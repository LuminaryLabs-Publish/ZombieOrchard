# Deploy audit: pest budget browser fixture gate

**Timestamp:** `2026-07-17T21-40-33-04-00`

## Current proof boundary

`npm test` runs `tests/smoke.mjs`, and `npm run build` copies `index.html` and `src/` into `dist`. Existing smoke coverage proves entry, Play and orchard apple presence. It does not execute a night population workload or compare source, dist and Pages behavior.

## Required fixture gate

```txt
source module fixture
  -> construct one game runtime
  -> enter active session
  -> enter night
  -> run accepted fixed-time ticks
  -> assert capacity and revision invariants

browser source fixture
  -> hold night for a bounded simulated duration
  -> sample population, update time and frame time
  -> verify visible population evidence

built artifact fixture
  -> repeat against dist
  -> compare policy and population digest

Pages fixture
  -> repeat against deployed origin
  -> verify matching revision and frame acknowledgement
```

## Minimum cases

```txt
zero-duration night
long-night expected capacity
hard-cap spawn rejection or deferral
phase exit retirement/preservation policy
clear at capacity
lifetime retirement
new-run/reset population generation
source/dist/Pages digest parity
FirstPestBudgetBoundFrameAck
```

## Readiness rule

Do not claim bounded pest cost or deployment parity until the real browser runtime proves a maximum population, bounded update/render work, correct reward settlement and a visible frame tied to the accepted population revision.

## Execution status

```txt
npm test: not run
npm run build: not run
long-night fixture: unavailable
browser profiler: not run
artifact smoke: not run
Pages smoke: not run
```

Documentation only; workflow and deployment files were not changed.