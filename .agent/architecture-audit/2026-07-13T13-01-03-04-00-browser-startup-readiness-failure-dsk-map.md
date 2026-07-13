# Architecture audit: browser startup readiness and failure DSK map

**Timestamp:** `2026-07-13T13-01-03-04-00`

## Summary

The current browser host composes startup procedurally inside module evaluation. Runtime, DOM, Canvas2D, HTML, diagnostics, and RAF ownership are created as live participants without a preparation phase, generation identity, aggregate result, rollback, or error projection.

## Plan ledger

**Goal:** separate startup participant ownership from live adoption while preserving the existing runtime and rendering domains.

- [x] Map current owners and startup order.
- [x] Identify bounded domains that remain unchanged.
- [x] Identify the missing coordinating authority.
- [x] Define candidate, receipt, adoption, failure, disposal, retry, and first-frame services.
- [ ] Implement the authority without moving gameplay or renderer semantics into it.

## Current ownership

```txt
index.html
  owns document nodes and hidden error-panel placeholder

src/boot.js
  owns only a side-effect import

src/start.js
  owns ambient startup order, GameHost publication, first tick/render, and RAF start

src/game.js + src/kits/*
  own runtime and domain construction

world-canvas.js
  owns Canvas2D context and world projection

html-interface-renderer.js
  owns delegated click listener and HTML projection
```

## Domain boundaries

```txt
runtime domain
  kit graph, commands, ticks, events, snapshots, publication

interface domain
  screens, actions, routing, Back, Outcome

gameplay domain
  resources, pressure, orchard, construction, roster, inventory, active run

presentation domain
  canvas projection, HTML projection, browser-visible surfaces

startup authority domain
  dependency admission, preparation, probe, adoption, failure, cleanup, retry, readiness
```

## Required parent DSK

```txt
zombie-orchard-browser-startup-readiness-failure-authority-domain
```

It coordinates startup only. It must not absorb gameplay, route semantics, canvas drawing, HTML templates, or deployment implementation.

## Required services

```txt
identity:
  StartupAttemptId
  StartupGeneration
  DocumentGeneration
  SurfaceGeneration

admission:
  required DOM-node validation
  Canvas2D capability validation
  kit-graph manifest validation
  lifecycle and duplicate-attempt rejection

preparation:
  detached engine candidate
  detached renderer candidates
  delegated-listener candidate
  diagnostics candidate
  scheduler candidate
  participant preparation receipts

proof:
  engine snapshot probe
  canvas projection probe
  HTML projection probe
  first complete visible-frame acknowledgement

commit and recovery:
  atomic participant adoption
  candidate disposal
  live-generation retirement
  typed StartupReadyResult
  typed StartupFailureResult
  error-panel fallback
  bounded retry policy
```

## Planned kits

```txt
startup-attempt-id-kit
startup-generation-kit
startup-phase-kit
startup-command-kit
startup-dependency-manifest-kit
document-lifecycle-admission-kit
dom-node-requirement-kit
canvas-context-capability-kit
kit-graph-preparation-receipt-kit
engine-candidate-kit
canvas-renderer-candidate-kit
html-renderer-candidate-kit
diagnostics-candidate-kit
scheduler-candidate-kit
startup-probe-kit
startup-adoption-result-kit
startup-failure-result-kit
startup-candidate-disposal-kit
startup-error-panel-projection-kit
startup-retry-policy-kit
public-host-readiness-gate-kit
first-startup-frame-ack-kit
startup-source-dist-pages-fixture-kit
```

## Required result model

```txt
StartupReadyResult
  attemptId
  generation
  participantReceipts
  firstFrameCandidateId
  publicCapabilities

StartupFailureResult
  attemptId
  generation
  failedParticipant
  reason
  disposedCandidates
  fallbackProjectionResult
  retryDisposition
```

## Validation boundary

Architecture documentation only. No DSK or runtime code was added.