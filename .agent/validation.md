# Validation - ZombieOrchard

**Timestamp:** `2026-07-12T20-31-27-04-00`

## Scope

Documentation-only audit of pest spawning, capacity, identity, simulation, contact damage, clearing, retirement, snapshot cost, canvas draw cost and deployment proof. Runtime source, dependencies, gameplay, rendering and deployment configuration were not changed.

## Plan ledger

**Goal:** record exact source evidence and executable proof required before pest-population correctness claims are made.

- [x] Read `src/start.js` and confirm fixed recursive RAF plus world rendering on every route.
- [x] Read `src/game.js` and confirm all kits share one runtime.
- [x] Read `src/kits/runtime.js` and confirm full-domain tick and deep snapshots.
- [x] Read `src/kits/game-domains.js` and confirm unbounded spawn, O(N) simulation/damage and clear-only retirement.
- [x] Read `src/presets/orchard-preset.js` and confirm no pest capacity configuration.
- [x] Read `src/renderer/world-canvas.js` and confirm one draw per pest with no budget/revision.
- [x] Read `tests/smoke.mjs` and confirm pest lifecycle coverage is absent.
- [x] Add timestamped architecture and system audits.
- [x] Push documentation only to `main` without a branch or pull request.
- [ ] Implement and run pest population fixtures.

## Source-backed findings

```txt
src/kits/game-domains.js
  -> addPest directly pushes random-ID pest
  -> no active-count capacity or spawn result
  -> all pests simulate every tick
  -> each contacting pest adds damage
  -> clear is the only retirement path

src/renderer/world-canvas.js
  -> all pests draw every frame
  -> no culling, render budget or population revision

src/start.js
  -> snapshot and world render occur every RAF regardless route

tests/smoke.mjs
  -> no night, spawn, capacity, clear, retirement or budget assertions
```

## Deterministic observations

```txt
implemented kit surfaces: 27
engine-installed kits: 19
pest arrays: 1 mutable active-session array
active-count limits: 0
spawn admissions: 0
despawn policies: 0
simulation budgets: 0
render budgets: 0
contact-set results: 0
population revisions: 0
pest lifecycle fixtures: 0
```

## Required fixtures

```txt
capacity boundary and long-night bound
deterministic unique pest identity
day/night population policy
clear and duplicate-clear retirement
stale generation rejection
bounded multi-pest damage
simulation and draw budget
population fingerprint and visible frame
source/dist/Pages parity
```

## Validation result

```txt
runtime source changed: no
dependencies changed: no
package scripts changed: no
gameplay behavior changed: no
canvas behavior changed: no
HTML behavior changed: no
deployment changed: no
branch created: no
pull request created: no

npm test: not run
npm run build: not run
pest population fixtures: unavailable / not run
browser pest smoke: unavailable / not run
Pages pest smoke: unavailable / not run
```

No bounded-population, deterministic-ID, exact-retirement, damage-budget, frame-budget or visible population-frame claim is made.
