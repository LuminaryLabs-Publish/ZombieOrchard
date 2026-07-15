# Validation - ZombieOrchard

**Timestamp:** `2026-07-14T21-41-41-04-00`

## Scope

Documentation-only audit of organization selection, browser boot, `window.GameHost`, raw engine publication, runtime commands, domain APIs, manual ticking, snapshots, subscriptions, HTML/Canvas2D projection, smoke proof, static build, Pages deployment and central tracking.

## Plan ledger

**Goal:** record exact source evidence and the proof required before public runtime capability or visible-frame claims are made.

- [x] Read the current Publish organization inventory.
- [x] Compare all ten eligible repositories with central tracking.
- [x] Confirm no new, ledger-missing, root-agent-missing or runtime-ahead repository has priority.
- [x] Select ZombieOrchard as the oldest synchronized eligible entry.
- [x] Read `index.html`, `src/boot.js`, `src/start.js` and `src/game.js`.
- [x] Read `src/kits/runtime.js` and `src/kits/game-domains.js`.
- [x] Read both renderers.
- [x] Inspect the existing smoke and deployment coverage recorded in repo-local docs.
- [x] Preserve all 27 kit surfaces and offered services.
- [x] Add timestamped audits and root routing.
- [x] Keep documentation writes on `main` with no branch or pull request.
- [ ] Implement and run public capability fixtures.

## Source-backed findings

```txt
src/start.js
  -> creates one engine and two renderers
  -> publishes raw engine through window.GameHost
  -> publishes getState and manual tick
  -> starts recursive RAF

src/kits/runtime.js
  -> engine exposes ctx, domains, addKit, command, tick, snapshot and subscribe
  -> tick advances frame and elapsed
  -> tick clears events and invokes every domain tick
  -> snapshot returns domain snapshots only
  -> subscribers receive unversioned snapshots

src/kits/game-domains.js
  -> resource, pressure and orchard direct APIs are reachable through raw domains
  -> pressure and active-session mutate during runtime ticks

src/renderer/world-canvas.js
  -> renders only when called by RAF draw
  -> exposes no frame revision or result acknowledgement

src/renderer/html-interface-renderer.js
  -> renders only when called by RAF draw
  -> exposes no frame revision or result acknowledgement
```

## Deterministic observations

```txt
accessible Publish repositories: 11
eligible repositories: 10
implemented kit surfaces: 27
engine-installed kits: 19
host/support kits: 8
raw engine globals: 1
public manual tick methods: 1
public arbitrary command paths: at least 1
public addKit paths: 1
public mutable ctx paths: 1
public mutable domains paths: 1
public capability policy revisions: 0
public capability-set IDs: 0
external-tick leases: 0
runtime frame revisions in public snapshots: 0
HTML frame revisions: 0
Canvas frame revisions: 0
first-visible public-mutation acknowledgements: 0
public capability fixtures: 0
```

## Required fixture matrix

```txt
production GameHost excludes raw engine and mutable internals
state readback is immutable and revisioned
allowlisted public command settles once
unknown, duplicate and stale commands are rejected
wrong host and run generations are rejected
route and pause policies are enforced
external tick is disabled in production
diagnostic tick requires a valid lease
expired and retired leases are rejected
headless and visible steps are distinct
visible step produces one matching HTML frame
visible step produces one matching Canvas2D frame
capability retirement rejects late work
source, dist and Pages behavior match
```

## Validation result

```txt
runtime source changed: no
public API behavior changed: no
HTML or CSS changed: no
dependencies changed: no
package scripts changed: no
gameplay behavior changed: no
canvas behavior changed: no
HTML behavior changed: no
tests or workflows changed: no
deployment changed: no
branch created: no
pull request created: no

npm test: not run
npm run build: not run
headless public capability fixtures: unavailable / not run
browser public capability fixtures: unavailable / not run
dist public capability smoke: unavailable / not run
Pages public capability smoke: unavailable / not run
```

No least-authority publication, public-command admission, external-tick safety, visible-frame convergence, capability retirement, artifact parity or production-readiness claim is made.