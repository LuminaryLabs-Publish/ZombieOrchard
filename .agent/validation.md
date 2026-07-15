# Validation - ZombieOrchard

**Timestamp:** `2026-07-15T02-38-45-04-00`

## Scope

Documentation-only audit of Publish selection, browser RAF scheduling, runtime delta handling, time-based gameplay consumers, Canvas2D/HTML render order, smoke coverage, build, Pages and central tracking.

## Plan ledger

**Goal:** record exact source evidence and the proof required before refresh-rate-independent timing claims are made.

- [x] Read the complete Publish organization inventory.
- [x] Compare all ten eligible repositories with central tracking.
- [x] Confirm no new, ledger-missing, root-agent-missing or runtime-ahead repository has priority.
- [x] Select ZombieOrchard as the oldest synchronized eligible entry.
- [x] Read `src/start.js`, `src/game.js`, `src/kits/runtime.js`, `src/kits/game-domains.js` and `tests/smoke.mjs`.
- [x] Preserve all 27 kit surfaces and services.
- [x] Add timestamped clock audits and root routing.
- [x] Keep writes on `main` with no branch or pull request.
- [ ] Implement and run timing fixtures.

## Source-backed findings

```txt
src/start.js
  -> draw ignores the RAF timestamp
  -> every callback submits engine.tick(1 / 60)
  -> renders Canvas2D and HTML once after the step

src/kits/runtime.js
  -> clamps only the submitted delta
  -> advances elapsed and frame from submitted delta
  -> ticks every domain

src/kits/game-domains.js
  -> pressure growth consumes dt
  -> pest spawn probability consumes dt
  -> pest movement consumes dt
  -> player damage consumes dt

tests/smoke.mjs
  -> executes one explicit 1 / 60 step
  -> does not exercise RAF frequency, visibility or catch-up
```

## Deterministic observations

```txt
accessible Publish repositories: 11
eligible repositories: 10
implemented kit surfaces: 27
engine-installed kits: 19
host/support kits: 8
RAF timestamp consumers in active host: 0
constant ticks per RAF callback: 1
fixed-step accumulators: 0
catch-up budgets: 0
visibility clock policies: 0
dropped-time diagnostics: 0
clock-bound renderer receipts: 0
refresh-rate fixtures: 0
```

## Required fixture matrix

```txt
synthetic 30 Hz callback trace
synthetic 60 Hz callback trace
synthetic 120 Hz callback trace
equal wall duration yields equal admitted step count
equal traces yield matching pressure and damage state
long frame respects catch-up budget
excess time produces explicit deferred/dropped result
hidden tab follows declared policy
resume applies no stale unbounded debt
zero-step frame does not mutate gameplay
multi-step frame renders once
Canvas2D and HTML cite one state revision
retired host rejects late callbacks
source, dist and Pages behavior match
```

## Validation result

```txt
documentation changed: yes
runtime source changed: no
gameplay timing changed: no
Canvas2D or HTML behavior changed: no
public API changed: no
dependencies or scripts changed: no
tests or workflows changed: no
deployment changed: no
branch created: no
pull request created: no

npm test: not run
npm run build: not run
headless timing fixtures: unavailable / not run
browser timing fixtures: unavailable / not run
dist timing smoke: unavailable / not run
Pages timing smoke: unavailable / not run
```

No refresh-rate independence, fixed-step correctness, catch-up correctness, hidden-tab safety, visible-frame convergence, artifact parity or production-readiness claim is made.