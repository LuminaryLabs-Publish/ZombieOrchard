# Validation - ZombieOrchard

**Timestamp:** `2026-07-14T00-38-19-04-00`

## Scope

Documentation-only audit of organization selection, construction route activation, nested command dispatch, catalog lookup, resource payment, built-record placement, HTML projection, Canvas2D projection, smoke proof, static build, Pages deployment, and central tracking.

## Plan ledger

**Goal:** record exact source evidence and the proof required before construction-settlement or world-adoption claims are made.

- [x] Read the current Publish organization inventory.
- [x] Compare all nine eligible repositories with central tracking.
- [x] Confirm every current repository head matches the recorded repo-local documentation head.
- [x] Select ZombieOrchard as the oldest eligible central entry.
- [x] Read `index.html`, `src/boot.js`, `src/start.js`, and `src/game.js`.
- [x] Read `src/kits/runtime.js`.
- [x] Read `src/kits/scoped-interface-domains.js`.
- [x] Read `src/kits/composition.js`.
- [x] Read `src/kits/game-domains.js`.
- [x] Read `src/presets/orchard-preset.js`.
- [x] Read both renderers.
- [x] Read `tests/smoke.mjs` and `package.json`.
- [x] Confirm purchase, built-record, HTML, and Canvas consumers are not one transaction.
- [x] Preserve all 27 kit surfaces and services.
- [x] Add timestamped audits and root routing.
- [x] Keep documentation writes on `main` with no branch or pull request.
- [ ] Implement and run construction-settlement fixtures.

## Source-backed findings

```txt
src/presets/orchard-preset.js
  -> Storage Shed has id, label, and cost only
  -> construction action dispatches construction-runtime/build

src/kits/composition.js
  -> nested command result is discarded
  -> outer activation can return accepted independently

src/kits/game-domains.js
  -> unknown item falls back to catalog[0]
  -> resource payment occurs before built-record append
  -> placement is derived from built count
  -> no bounds, overlap, collision, or effect admission

src/renderer/html-interface-renderer.js
  -> construction route lists construction-runtime.built

src/renderer/world-canvas.js
  -> reads orchard-world and active-session only
  -> never projects construction-runtime.built

tests/smoke.mjs
  -> verifies Entry, Play, and apple presence only
```

## Deterministic observations

```txt
accessible Publish repositories: 10
eligible repositories: 9
implemented kit surfaces: 27
engine-installed kits: 19
host/support kits: 8
construction catalog entries: 1
built-record consumers in HTML: 1
built-record consumers in Canvas2D: 0
collision consumers: 0
gameplay-effect consumers: 0
construction command/result IDs: 0
construction rollback results: 0
construction fixtures: 0
```

## Required fixture matrix

```txt
exact known-item admission
unknown-item zero mutation
insufficient-resource zero mutation
duplicate and stale command rejection
cost quote and reservation settlement
bounds and overlap validation
resource/construction/render/collision/effect atomicity
failure rollback
nested result propagation
matching HTML and Canvas revisions
gameplay effect activation
source/dist/Pages parity
first visible construction-frame acknowledgement
```

## Validation result

```txt
runtime source changed: no
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
headless construction fixtures: unavailable / not run
browser construction fixtures: unavailable / not run
Pages construction smoke: unavailable / not run
```

No exact item admission, resource reservation, spatial validity, atomic adoption, visible construction, collision, gameplay effect, rollback, or production-readiness claim is made.
