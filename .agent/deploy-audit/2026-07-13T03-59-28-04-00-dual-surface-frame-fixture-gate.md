# Deploy audit: dual-surface frame fixture gate

**Timestamp:** `2026-07-13T03-59-28-04-00`

## Summary

The current Node smoke and static copy process cannot prove browser canvas/HTML frame coherence. Deployment readiness requires executable source, dist, and GitHub Pages fixtures that inspect both surfaces and their shared frame receipts.

## Plan ledger

**Goal:** gate deployment claims on equivalent dual-surface frame results across source, built output, and Pages.

- [x] Review package scripts and current smoke scope.
- [x] Confirm the build copies static files without frame-coherence validation.
- [x] Confirm current smoke does not execute the browser render path.
- [x] Define the required browser and deployment matrix.
- [ ] Implement and run the fixture gate.

## Current proof

```txt
npm test
  -> Node smoke only
  -> no browser canvas
  -> no DOM visibility inspection
  -> no surface receipts

npm run build
  -> copy index.html and src into dist
  -> no source/dist behavior comparison

GitHub Pages
  -> static publication
  -> no deployed dual-surface smoke
```

## Required fixture layers

### Model fixtures

```txt
one immutable frame envelope per tick
publication and render envelope identity
surface result state machine
partial-frame classification
last-complete-frame recovery
stale and superseded rejection
```

### Browser source fixtures

```txt
canvas and HTML cite the same FrameEnvelopeId
route changes apply explicit world visibility policy
canvas and HTML failures return typed results
successor RAF survives a projection failure
GameHost visible readback matches the rendered surfaces
FirstDualSurfaceFrameAck is emitted once per admitted first frame
```

### Built-output fixtures

```txt
dist loads successfully
same frame IDs and fingerprints as source
same route/world visibility results
same partial-failure and recovery behavior
```

### Pages fixtures

```txt
published assets load
canvas and HTML both become visible
surface receipts match one envelope
interaction result reaches a matching visible frame
reload does not expose stale diagnostics
```

## Required commands

```txt
npm test
npm run build
node scripts/smoke-dual-surface-browser.mjs --source
node scripts/smoke-dual-surface-browser.mjs --dist
node scripts/smoke-dual-surface-pages.mjs
```

## Pass criteria

```txt
all required surfaces return terminal results
complete frames cite one envelope and fingerprint
partial frames are never reported as complete
scheduler remains live after injected surface faults
visible diagnostics match the last complete frame
source, dist, and Pages results are equivalent
```

## Validation boundary

No proof command was added or executed. Deployment configuration and runtime files are unchanged.
