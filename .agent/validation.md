# Validation: ZombieOrchard save-slot session selection

**Timestamp:** `2026-07-15T12-39-01-04-00`

## Scope

Documentation-only audit of the full Publish selection, current heads, root `.agent` coverage, route graph, scoped interface domains, Save Select projection, state-bearing runtime domains, smoke coverage, build, Pages and central tracking.

## Plan ledger

**Goal:** distinguish source-proven absence of persistence/session admission from unexecuted browser outcomes.

- [x] Read all 11 accessible Publish repositories.
- [x] Compare ten eligible ledgers, heads and root `.agent` entrypoints.
- [x] Exclude TheCavalryOfRome.
- [x] Select ZombieOrchard by the oldest synchronized timestamp.
- [x] Inspect preset, interface domains, composition, renderer, game composition and smoke test.
- [x] Preserve all 27 kit surfaces and services.
- [x] Add the timestamped audit family.
- [x] Keep writes on `main`; create no branch or pull request.
- [ ] Implement and run persistence/session fixtures.

## Source-backed findings

```txt
entry preset
  -> Play routes directly to active-session
  -> New Game routes to run-setup

session-select preset
  -> domain exists
  -> only Back action
  -> no meta.slots

interface composition
  -> moves routes directly
  -> no save/load/new-session command boundary

HTML renderer
  -> can render current.meta.slots
  -> receives no discovered save catalog

source repository
  -> no localStorage or IndexedDB owner found
  -> no save schema, serialization, migration or restore service

smoke
  -> requires Play -> active-session
  -> does not test storage or reload
```

## What source inspection proves

```txt
Save Select is unreachable through current actions
Save Select has no slot catalog or selection command
Play adopts current in-memory state without a load result
New Game enters play without a durable initial-session result
no whole-runtime save/restore transaction exists
no typed persistence result or loaded-frame acknowledgement exists
```

## What is not proven

```txt
a reproduced user-visible Save Select defect
a storage implementation outside the repository
a chosen future save format or storage backend
correct migration behavior
artifact or Pages persistence parity
production readiness
```

## Required fixture matrix

```txt
empty, unavailable, corrupt and incompatible storage classification
stable slot identity and ordering
new-session initial commit
save revision and stale-write rejection
whole-runtime reload equality
migration with provenance
storage failure predecessor preservation
atomic load adoption
slot deletion and catalog refresh
Canvas2D/HTML loaded-session revision equality
source/dist/Pages parity
```

## Change scope

```txt
documentation changed: yes
runtime source changed: no
gameplay changed: no
storage behavior changed: no
Canvas2D or HTML behavior changed: no
public API changed: no
dependencies or scripts changed: no
tests or workflows changed: no
deployment changed: no
branch created: no
pull request created: no

npm test: not run
npm run build: not run
persistence fixtures: unavailable / not run
browser save/reload fixtures: unavailable / not run
dist smoke: not run
Pages smoke: not run
```

## Claims intentionally withheld

No durable-save correctness, migration safety, atomic restore, reload recovery, session-route settlement, visible-frame convergence, artifact parity or production-readiness claim is made.
