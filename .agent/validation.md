# Validation — ZombieOrchard

## Scope

Documentation-only audit of simulation-clock authority. Runtime source, dependencies, package scripts, rendering, gameplay behavior, and deployment configuration were not changed.

## Plan ledger

**Goal:** record the refresh-rate-dependent simulation defect and the proof required before the orchard is treated as cadence-stable or fixed-step deterministic.

- [x] Read browser boot, recursive RAF, and public host ownership.
- [x] Read runtime delta clamping, frame/elapsed mutation, domain ticking, and publication.
- [x] Read pressure, pest spawning, movement, damage, route composition, and render projection.
- [x] Read package scripts and smoke proof.
- [x] Confirm one literal `1 / 60` step occurs per display callback.
- [x] Confirm unrestricted manual stepping reaches the same mutable graph.
- [x] Quantify 30/60/120 Hz source-level gameplay divergence.
- [x] Add timestamped architecture and system audits.
- [x] Push documentation only to `main` without a branch or pull request.
- [x] Synchronize the central ledger and internal change log.
- [ ] Implement and run clock fixtures.

## Source-backed findings

```txt
src/start.js
  -> engine.tick(1 / 60) once per RAF
  -> ignores RAF timestamp
  -> exposes GameHost.tick(dt)

src/kits/runtime.js
  -> clamps each supplied delta to 0..0.1
  -> increments elapsed and frame on every call
  -> ticks every domain on every call
  -> snapshots and notifies after every call

pressure-field
  -> rowPressure += dt * 0.8
  -> curse += dt * 0.2

active-session
  -> night spawn trial: Math.random() < dt * 0.55
  -> pest movement: dt * 36
  -> contact damage: dt * 7
```

## Quantified source behavior

| Display cadence | Sim seconds / wall second | Row pressure / second | Pest movement / second | Contact damage / second |
|---:|---:|---:|---:|---:|
| 30 Hz | 0.5 | 0.4 | 18 | 3.5 |
| 60 Hz | 1.0 | 0.8 | 36 | 7 |
| 120 Hz | 2.0 | 1.6 | 72 | 14 |

Approximate night pest-spawn probability per wall second:

```txt
30 Hz: 24.1%
60 Hz: 42.5%
120 Hz: 66.9%
```

## Required fixtures

```txt
fixed-step-policy-shape
monotonic-simulation-step-id
simulation-epoch-reset
30hz-60hz-120hz-equal-wall-time-parity
variable-cadence-parity
pressure/pest/damage/spawn-cadence-parity
long-frame-catch-up-limit
lag-drop-result
hidden-tab-suspension
resume-new-baseline
manual-step-equivalence
manual-auto-writer-exclusion
single-publication-per-batch
stale-epoch-rejection
step-range-visible-frame-receipt
built-artifact-browser-smoke
Pages-cadence-smoke
```

## Existing smoke boundary

Current `npm test` verifies only entry route, Play transition, and apple presence. It does not execute browser cadence, fixed-step accumulation, visibility, manual/automatic exclusion, catch-up, lag dropping, or frame correlation.

## Validation result

```txt
runtime source changed: no
dependencies changed: no
package scripts changed: no
render behavior changed: no
gameplay behavior changed: no
deploy configuration changed: no
branch created: no
pull request created: no

npm test: not run
npm run build: not run
browser smoke: not run
clock fixtures: unavailable / not run
hidden-tab fixture: unavailable / not run
writer-exclusion fixture: unavailable / not run
step/frame fixture: unavailable / not run
Pages cadence smoke: unavailable / not run

repo-local docs pushed to main: yes
central ledger update: complete
central internal change log: complete
```

No cadence parity, fixed-step determinism, automatic/manual writer safety, hidden-tab safety, bounded catch-up, or simulation-to-frame claim is made.