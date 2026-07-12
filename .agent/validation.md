# Validation — ZombieOrchard

**Timestamp:** `2026-07-12T07-51-04-04-00`

## Scope

Documentation-only audit of HTML interface projection, focus continuity, encoding and visible-frame provenance. Runtime source, dependencies, package scripts, gameplay behavior, rendering behavior and deployment configuration were not changed.

## Plan ledger

**Goal:** record the source-backed projection defects and the proof required before DOM efficiency or accessibility claims are made.

- [x] Read `index.html` and identify the stable `#ui-root`.
- [x] Read browser boot and recursive RAF ownership.
- [x] Read runtime tick and snapshot behavior.
- [x] Read interface composition and active route snapshots.
- [x] Read HTML view construction, delegated click handling and subtree replacement.
- [x] Read runtime values that can enter cards, labels and attributes.
- [x] Confirm `root.innerHTML` is assigned on every UI render.
- [x] Confirm no unchanged-state short circuit exists.
- [x] Confirm no focus/selection capture or restoration exists.
- [x] Confirm string conversion is not HTML/attribute encoding.
- [x] Confirm Node smoke creates no DOM.
- [x] Add timestamped architecture and system audits.
- [x] Push documentation only to `main` without a branch or pull request.
- [ ] Implement and run DOM/focus/encoding fixtures.

## Source-backed findings

```txt
index.html
  -> owns one stable #ui-root surface

src/start.js
  -> calls ui.render(snapshot) every RAF callback
  -> supplies no state or interface revision
  -> receives no typed UI result

src/kits/runtime.js
  -> creates a new deep snapshot for ticks and notifications
  -> exposes no state revision or dirty-domain set

src/renderer/html-interface-renderer.js
  -> attaches one delegated click listener to the stable root
  -> converts values with String(...)
  -> interpolates values into HTML text and data-action attributes
  -> assigns root.innerHTML in active-session mode
  -> assigns root.innerHTML in every other route mode
  -> returns no projection/focus/accessibility result

src/kits/game-domains.js
  -> permits runtime roster names to enter state
  -> exposes mutable game commands through the engine

src/start.js
  -> exposes the raw engine through window.GameHost

tests/smoke.mjs
  -> creates no document or DOM root
  -> checks no mutation, focus, encoding or accessibility invariant
```

## Deterministic calculations

```txt
one UI replacement per RAF callback
60 callbacks/second -> 3,600 requested replacements/minute
60 callbacks/second -> 216,000 requested replacements/hour
```

These are application-level mutation requests derived from the current loop. Actual callback frequency can be reduced by browser throttling.

## Required fixtures

```txt
view-model determinism
text encoding
attribute encoding
unchanged projection no-op
projection revision monotonicity
stale projection rejection
focused action retention
route-transition focus policy
selection continuity
mutation budget
announcement deduplication
canvas/HTML frame correlation
built-artifact browser focus smoke
Pages interface projection smoke
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
DOM fixture: unavailable / not run
focus fixture: unavailable / not run
encoding fixture: unavailable / not run
browser accessibility smoke: unavailable / not run
Pages interface smoke: unavailable / not run
```

No minimal-DOM, keyboard-focus, safe-encoding, accessibility continuity or visible interface-frame claim is made.
