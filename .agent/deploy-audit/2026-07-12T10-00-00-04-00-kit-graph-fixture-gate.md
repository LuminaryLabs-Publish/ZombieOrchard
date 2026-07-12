# Deploy audit: kit graph fixture gate

**Timestamp:** `2026-07-12T10-00-00-04-00`

## Summary

The current Node smoke and static build do not validate kit manifests, dependency resolution, duplicate ownership, rollback or graph-to-frame provenance. Deployment readiness requires equivalent source, built-artifact and Pages graph inventories plus executable failure fixtures.

## Plan ledger

**Goal:** prevent deployment from claiming a valid kit graph unless source, dist and Pages prove the same admitted composition and lifecycle behavior.

- [x] Read package scripts and current smoke boundary.
- [x] Confirm the build copies source without graph validation.
- [x] Define source-level graph fixtures.
- [x] Define browser and Pages graph smoke.
- [x] Define deployment failure conditions.
- [ ] Add scripts and run the gate.

## Current gate

```txt
npm test  -> node tests/smoke.mjs
npm build -> copy index.html and src into dist
```

Neither command verifies graph manifests or runtime installation semantics.

## Required source fixtures

```txt
manifest schema and fingerprint
input-order-independent resolution
duplicate kit and domain rejection
missing and incompatible service rejection
cycle detection
candidate-create rollback
explicit replacement lifecycle
stale graph revision rejection
```

## Required browser fixtures

```txt
public host cannot call raw addKit
successful graph commit emits one revision
failed candidate leaves predecessor visible and active
replacement retires predecessor capabilities
tick order matches resolved phases
canvas and HTML receipts cite the graph fingerprint
```

## Required built and Pages proof

```txt
source graph inventory == dist graph inventory
dist graph fingerprint == Pages graph fingerprint
first visible canvas and HTML frame cite the deployed graph revision
no missing provider or duplicate owner warning
failed install produces no partial visible frame
```

## Proposed scripts

```txt
node tests/kit-graph-manifest.fixture.mjs
node tests/kit-graph-order.fixture.mjs
node tests/kit-graph-rejection.fixture.mjs
node tests/kit-graph-rollback.fixture.mjs
node scripts/smoke-kit-graph-browser.mjs
node scripts/smoke-kit-graph-pages.mjs
```

## Deployment blocker policy

Block deployment when:

```txt
manifest or service validation fails
graph fingerprint differs across source/dist/Pages
a duplicate domain can replace a live owner
a failed candidate leaks resources or changes the graph revision
first visible frames omit or disagree on graph provenance
```

## Validation result

```txt
package scripts changed: no
deployment workflow changed: no
fixtures implemented: no
npm test/build run: no
browser smoke run: no
Pages smoke run: no
```

No deployment-readiness claim is made for kit-graph authority.