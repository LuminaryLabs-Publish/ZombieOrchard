# Validation - ZombieOrchard

**Timestamp:** `2026-07-13T18-00-38-04-00`

## Scope

Documentation-only audit of organization selection, raw runtime command access, roster mutation, scoped interface actions, interface composition, HTML serialization, `innerHTML` adoption, delegated click handling, smoke proof, build, deployment gates, and central tracking.

## Plan ledger

**Goal:** record exact source evidence and the proof required before content-safety claims are made.

- [x] Read the current Publish organization inventory.
- [x] Compare all nine eligible repositories with central tracking.
- [x] Select ZombieOrchard as the oldest eligible central entry.
- [x] Read `src/start.js`.
- [x] Read `src/kits/runtime.js`.
- [x] Read `src/kits/scoped-interface-domains.js`.
- [x] Read `src/kits/composition.js`.
- [x] Read `src/kits/game-domains.js`.
- [x] Read `src/presets/orchard-preset.js`.
- [x] Read `src/renderer/html-interface-renderer.js`.
- [x] Read `tests/smoke.mjs` and `package.json`.
- [x] Confirm dynamic values enter `innerHTML` without context-aware encoding.
- [x] Confirm caller-provided roster names are reachable from the public raw engine.
- [x] Confirm injected matching descendants are accepted by delegated selectors.
- [x] Preserve all 27 kit surfaces and services.
- [x] Add timestamped audits and root routing.
- [x] Keep documentation writes on `main` with no branch or pull request.
- [ ] Implement and run content-safety fixtures.

## Source-backed findings

```txt
src/start.js
  -> exposes window.GameHost.engine

src/kits/runtime.js
  -> command(domainId, type, payload) accepts arbitrary identifiers and payload
  -> notifies after command mutation

src/kits/game-domains.js
  -> roster hire stores payload.name

src/renderer/html-interface-renderer.js
  -> text() calls String() only
  -> button() interpolates action ID and label
  -> cards() interpolates label/name/id and summary/role/type
  -> messages, titles, and descriptions are interpolated
  -> root.innerHTML adopts the generated markup
  -> delegated listener accepts matching descendants

tests/smoke.mjs
  -> never constructs the HTML renderer
  -> contains no malicious-content or delegated-control fixture
```

## Deterministic observations

```txt
accessible Publish repositories: 10
eligible repositories: 9
implemented kit surfaces: 27
engine-installed kits: 19
host/support kits: 8
innerHTML assignment sites in renderer: 2
delegated command selector classes: 2
content-origin identity types: 0
content revisions: 0
safe field-context result types: 0
delegated-control manifests: 0
unsafe-content result types: 0
content-injection fixtures: 0
```

## Required fixture matrix

```txt
script markup remains literal
event attributes remain literal
closing tags cannot alter DOM structure
injected data-action cannot dispatch
injected data-command cannot dispatch
action labels and IDs remain safe
messages/titles/descriptions remain safe
controls require active-route manifest membership
stale controls are rejected
failed candidate preserves predecessor subtree
source/dist/Pages parity
first visible content revision acknowledgement
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
browser content-safety fixtures: unavailable / not run
delegated-control fixtures: unavailable / not run
Pages content-safety smoke: unavailable / not run
```

No safe HTML, command-origin, injection-resistance, visible-content, or production-readiness claim is made.
