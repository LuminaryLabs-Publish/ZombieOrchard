# Validation: ZombieOrchard pest population budget

**Timestamp:** `2026-07-17T21-40-33-04-00`

## Scope

Documentation-only audit of night pest creation, retained population, simulation work, retirement, Canvas2D projection, matching-frame evidence and source/build/Pages fixtures.

## Checklist

**Goal:** state exactly what changed, what was inspected and what remains unproven.

- [x] Reviewed `src/kits/runtime.js`, `src/kits/game-domains.js`, `src/renderer/world-canvas.js`, `src/renderer/html-interface-renderer.js`, `src/presets/orchard-preset.js`, current smoke coverage and deployment boundary.
- [x] Added timestamped repo-local documentation.
- [x] Changed no runtime or deployment behavior.
- [ ] Execute pest population fixtures after implementation.

## Change boundary

```txt
documentation changed: yes
runtime JavaScript changed: no
HTML or CSS changed: no
gameplay, simulation, input and command behavior changed: no
Canvas2D or HTML rendering behavior changed: no
packages or dependencies changed: no
tests or workflows changed: no
build or deployment changed: no
branch created: no
pull request created: no
```

## Execution status

```txt
npm test: not run
npm run build: not run
long-night fixture: unavailable
capacity fixture: unavailable
phase-toggle fixture: unavailable
clear-retirement fixture: unavailable
FirstPestBudgetBoundFrameAck fixture: unavailable
browser profiler: not run
source/dist parity: not run
Pages parity: not run
```

No bounded population, spawn-settlement correctness, retirement correctness, update/render budget, state-to-frame convergence, artifact parity, deployed parity or production readiness is claimed.