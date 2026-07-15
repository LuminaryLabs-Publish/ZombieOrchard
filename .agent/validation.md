# Validation: ZombieOrchard route-bound simulation suspension

**Timestamp:** `2026-07-15T08-26-01-04-00`

## Scope

Documentation-only audit of the full Publish selection, current heads, root `.agent` coverage, runtime tick order, interface transitions, pressure and active-session predicates, renderer projections, existing smoke coverage, build, Pages and central tracking.

## Plan ledger

**Goal:** distinguish source-proven unconditional ticking from unexecuted browser outcomes.

- [x] Read all 11 accessible Publish repositories.
- [x] Compare ten eligible ledgers, heads and root `.agent` entrypoints.
- [x] Exclude TheCavalryOfRome.
- [x] Select ZombieOrchard because its completed canvas audit advanced beyond the central ledger.
- [x] Inspect runtime, game composition, interface domains, preset, gameplay domains and renderers.
- [x] Preserve all 27 kit surfaces and services.
- [x] Add the timestamped audit family.
- [x] Keep writes on `main`; create no branch or pull request.
- [ ] Implement and run route-suspension fixtures.

## Source-backed findings

```txt
kit-runtime
  -> ticks every domain on every submitted step

pressure-field
  -> grows rowPressure and curse on every tick

active-session
  -> ticks until ended
  -> has no route or pause predicate
  -> spawns/moves pests and applies damage

interface-composition
  -> changes active route only
  -> checks ended state after active-session tick

renderers
  -> Canvas2D always projects active-session world
  -> HTML projects the selected route
```

## What source inspection proves

```txt
route changes do not alter tick eligibility
pressure and active-session may mutate on non-gameplay routes
Pause and management routes do not implement suspension
defeat routing can follow a hidden active-session tick
no typed suspension/resume result exists
no shared route/simulation frame acknowledgement exists
```

## What is not proven

```txt
a reproduced browser defeat while paused
exact user-perceived timing
correct future route policy for every product screen
artifact or Pages parity
production readiness
```

## Required fixture matrix

```txt
entry/settings/run-setup pressure immutability
active-session pressure admission
night pest movement and damage admission
pause/management pest and condition immutability
pause near defeat without outcome transition
resume exactly-once reactivation
title/outcome lease retirement
stale transition and stale tick rejection
Canvas2D/HTML revision equality
source/dist/Pages parity
```

## Change scope

```txt
documentation changed: yes
runtime source changed: no
gameplay changed: no
timing changed: no
Canvas2D or HTML behavior changed: no
public API changed: no
dependencies or scripts changed: no
tests or workflows changed: no
deployment changed: no
branch created: no
pull request created: no

npm test: not run
npm run build: not run
route suspension fixtures: unavailable / not run
browser interaction fixtures: unavailable / not run
dist smoke: not run
Pages smoke: not run
```

## Claims intentionally withheld

No pause safety, route-bound simulation, resume correctness, terminal settlement, visible-frame convergence, artifact parity or production-readiness claim is made.
