# Validation - ZombieOrchard

**Timestamp:** `2026-07-14T10-59-56-04-00`

## Scope

Documentation-only audit of organization selection, roster preset and state, roster-route interaction, raw hiring commands, resource settlement, actor identity, role adoption, active-session consumption, HTML projection, Canvas2D projection, smoke proof, static build, Pages deployment and central tracking.

## Plan ledger

**Goal:** record exact source evidence and the proof required before roster-hiring claims are made.

- [x] Read the current Publish organization inventory.
- [x] Compare all ten eligible repositories with central tracking.
- [x] Confirm no new, ledger-missing, root-agent-missing or runtime-ahead repository has priority.
- [x] Select ZombieOrchard as the oldest eligible central entry.
- [x] Read `index.html`, `src/boot.js`, `src/start.js` and `src/game.js`.
- [x] Read `src/kits/runtime.js`.
- [x] Read `src/kits/scoped-interface-domains.js`.
- [x] Read `src/kits/game-domains.js`.
- [x] Read `src/presets/orchard-preset.js`.
- [x] Read both renderers.
- [x] Read `tests/smoke.mjs` and `package.json`.
- [x] Confirm resource, roster, gameplay and presentation are not one hire transaction.
- [x] Preserve all 27 kit surfaces and services.
- [x] Add timestamped audits and root routing.
- [x] Keep documentation writes on `main` with no branch or pull request.
- [ ] Implement and run roster-hiring fixtures.

## Source-backed findings

```txt
src/presets/orchard-preset.js
  -> roster starts with no actors
  -> roster route exposes Back only
  -> no authored hire offer or role catalog

src/kits/game-domains.js
  -> hire trusts payload.cost and payload.name
  -> negative cost can increase money
  -> non-numeric truthy cost can normalize to zero
  -> actor ID derives from current array length
  -> role is hardcoded to harvest
  -> active-session never reads roster-runtime

src/renderer/html-interface-renderer.js
  -> roster route lists actor cards
  -> values are converted with String() only
  -> content is inserted through innerHTML
  -> active-session HUD omits roster state

src/renderer/world-canvas.js
  -> renders orchard-world and active-session only
  -> no roster or worker consumer

tests/smoke.mjs
  -> verifies Entry, Play and apple presence only
```

## Deterministic observations

```txt
accessible Publish repositories: 11
eligible repositories: 10
implemented kit surfaces: 27
engine-installed kits: 19
host/support kits: 8
browser Hire actions: 0
raw hire command: 1
caller-controlled cost fields: 1
negative-cost rejection checks: 0
non-numeric-cost rejection checks: 0
caller-controlled name fields: 1
safe HTML name encoders: 0
role catalog lookups: 0
roster capacity checks: 0
active-session roster reads: 0
Canvas2D roster consumers: 0
hire command/result IDs: 0
hire rollback results: 0
roster-hiring fixtures: 0
combined commit statuses before audit: 0
```

## Required fixture matrix

```txt
exact authored-offer admission
positive finite integer cost settlement
negative-cost zero mutation
non-numeric-cost zero mutation
unknown-offer and unknown-role zero mutation
safe normalized display identity
roster capacity and duplicate policy
duplicate and stale command classification
resource reservation and release
roster/gameplay atomic adoption
worker effect references WorkerEffectRevision
failure rollback
matching roster, HUD and Canvas2D revisions
source/dist/Pages parity
first visible roster-frame acknowledgement
```

## Validation result

```txt
runtime source changed: no
HTML or CSS changed: no
dependencies changed: no
package scripts changed: no
gameplay behavior changed: no
roster behavior changed: no
resource behavior changed: no
canvas behavior changed: no
HTML behavior changed: no
tests or workflows changed: no
deployment changed: no
branch created: no
pull request created: no

npm test: not run
npm run build: not run
headless roster fixtures: unavailable / not run
browser roster fixtures: unavailable / not run
dist roster smoke: unavailable / not run
Pages roster smoke: unavailable / not run
```

No safe hire admission, exact positive-cost settlement, actor identity policy, role capability, worker gameplay adoption, matching visible state, rollback, artifact parity or production-readiness claim is made.