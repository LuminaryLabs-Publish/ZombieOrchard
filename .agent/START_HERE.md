# START HERE: ZombieOrchard

**Repository:** `LuminaryLabs-Publish/ZombieOrchard`  
**Branch:** `main`  
**Aligned:** `2026-07-13T13-01-03-04-00`  
**Status:** `browser-startup-readiness-failure-authority-central-reconciled`  
**Retained statuses:** `canvas-html-frame-coherence-authority-central-reconciled`, `runtime-event-lifecycle-publication-authority-audited`, `runtime-observer-publication-authority-central-reconciled`

## Summary

ZombieOrchard is a dependency-free orchard survival and economy shell built from a mutable kit runtime, 12 interface definitions, gameplay services, canvas and HTML projection, diagnostics, Node smoke proof, static build, and Pages deployment.

The current audit isolates browser startup readiness and failure ownership. The page declares a hidden error panel, but boot is a bare side-effect import. Engine installation, DOM/context capture, listener installation, `GameHost` publication, first simulation tick, canvas projection, HTML projection, and RAF scheduling occur during module evaluation without a startup identity, participant receipts, probe, atomic adoption, cleanup, fallback, retry result, or first-visible-frame acknowledgement.

## Plan ledger

**Goal:** make browser startup one typed transaction that adopts every live participant only after successful preparation and probe.

- [x] Compare all ten current Publish repositories with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only ZombieOrchard as the oldest eligible central entry.
- [x] Preserve the complete interaction loop, domain inventory, 27-kit census, and services.
- [x] Add the timestamped startup-readiness audit family.
- [x] Refresh required root `.agent` documents.
- [x] Keep writes on `main`; create no branch or pull request.
- [ ] Implement and prove startup preparation, probe, adoption, failure projection, cleanup, retry, and first-frame readiness.

## Read this run first

```txt
.agent/trackers/2026-07-13T13-01-03-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-13T13-01-03-04-00.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-13T13-01-03-04-00-browser-startup-readiness-failure-dsk-map.md
.agent/render-audit/2026-07-13T13-01-03-04-00-first-visible-frame-readiness-gap.md
.agent/gameplay-audit/2026-07-13T13-01-03-04-00-first-tick-before-readiness-loop.md
.agent/interaction-audit/2026-07-13T13-01-03-04-00-startup-participant-result-map.md
.agent/startup-audit/2026-07-13T13-01-03-04-00-preparation-probe-adoption-failure-contract.md
.agent/deploy-audit/2026-07-13T13-01-03-04-00-browser-startup-fixture-gate.md
```

## Complete interaction loop

```txt
index.html
  -> declares world canvas, UI root, and hidden error panel
  -> imports boot.js

boot.js
  -> side-effect imports start.js

start.js
  -> creates engine and installs 19 domains
  -> captures DOM nodes and Canvas2D context
  -> installs delegated UI listener
  -> exposes raw GameHost
  -> immediately ticks simulation
  -> renders canvas then HTML
  -> schedules successor RAF

failure at any stage
  -> exception escapes
  -> no aggregate result, cleanup, fallback, retry, or readiness proof
```

## Required authority

```txt
zombie-orchard-browser-startup-readiness-failure-authority-domain
```

## Required transaction

```txt
BrowserStartupCommand
  -> StartupAttemptId and StartupGeneration
  -> document, DOM, capability, and kit-graph admission
  -> detached engine, canvas, HTML, diagnostics, and scheduler candidates
  -> participant preparation receipts
  -> non-committing startup and projection probes
  -> atomic adoption or complete candidate disposal
  -> StartupReadyResult or StartupFailureResult
  -> DOM-only error-panel fallback and bounded retry
  -> GameHost publication from the accepted generation
  -> FirstStartupFrameAck
```

## Validation boundary

Documentation only. Runtime source, HTML, CSS, gameplay, rendering, dependencies, package scripts, tests, workflows, and deployment were not changed. No startup atomicity, readiness, fallback, cleanup, retry, first-visible-frame, or production-readiness claim is made until focused fixtures pass on `main`.