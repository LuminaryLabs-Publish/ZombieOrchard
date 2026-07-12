# Validation - ZombieOrchard

**Timestamp:** `2026-07-12T10-00-00-04-00`

## Scope

Documentation-only audit of kit manifests, dependency and service admission, deterministic order, atomic installation, rollback, predecessor retirement and graph-to-frame provenance. Runtime source, dependencies, package scripts, gameplay, rendering and deployment configuration were not changed.

## Plan ledger

**Goal:** record source-backed graph defects and the exact proof required before composition safety claims are made.

- [x] Read `src/game.js` and identify the manually ordered kit list.
- [x] Read `src/kits/runtime.js` and trace initial and post-start installation.
- [x] Read interface composition and its order-sensitive Outcome routing.
- [x] Read gameplay domains and their implicit service lookups.
- [x] Read browser host exposure of the raw engine.
- [x] Confirm duplicate domain IDs overwrite live owners.
- [x] Confirm tick order follows mutable domain property order.
- [x] Confirm no manifest, dependency, version or service validation exists.
- [x] Confirm no candidate graph, atomic commit, rollback or disposal exists.
- [x] Confirm snapshots and renderers carry no graph identity.
- [x] Add timestamped architecture and system audits.
- [x] Push documentation only to `main` without a branch or pull request.
- [ ] Implement and run graph-installation fixtures.

## Source-backed findings

```txt
src/game.js
  -> manually constructs one ordered kit array
  -> supplies no manifest or explicit phase plan

src/kits/runtime.js
  -> creates domains against the live ctx
  -> validates only returned domain.id
  -> writes domains[domain.id] directly
  -> silently overwrites an existing owner
  -> iterates Object.values(domains) during tick
  -> provides no graph revision, rollback, uninstall or dispose

src/kits/composition.js
  -> relies on installation order to observe active-session after its tick
  -> exposes no required-service or phase descriptor

src/kits/game-domains.js
  -> resolves collaborators by optional domain/API lookup
  -> converts missing providers into ordinary gameplay behavior

src/start.js
  -> exposes raw engine and addKit through window.GameHost
  -> renderers receive no graph identity or installation result

tests/smoke.mjs
  -> validates no manifest, duplicate, dependency, order, rollback or graph-frame invariant
```

## Deterministic observations

```txt
current initial kit descriptors: 21 runtime/domain kit entries assembled by createOrchardGame
implemented kit responsibilities documented across repo: 27
duplicate domain rejection paths: 0
required service declarations: 0
provided service declarations: 0
explicit lifecycle/tick phases: 0
graph revisions in snapshots: 0
```

The implemented-kit count includes renderer, host, proof, build and deployment responsibilities in addition to the 21 kits installed into the mutable engine graph.

## Required fixtures

```txt
manifest normalization determinism
unique kit and domain ownership
service-provider resolution
service-version compatibility
cycle detection with exact path
deterministic phase and dependency order
duplicate-domain zero-mutation rejection
missing-provider typed rejection
candidate create failure reverse cleanup
atomic graph commit
stale replacement rejection
explicit predecessor migration/disposal
source/dist graph inventory parity
first canvas and HTML frame graph acknowledgement
Pages kit-graph smoke
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
kit graph fixtures: unavailable / not run
browser graph smoke: unavailable / not run
Pages graph smoke: unavailable / not run
```

No deterministic-order, dependency-safe, compatible-service, duplicate-owner, atomic-installation, rollback, predecessor-retirement or graph-to-frame claim is made.