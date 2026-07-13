# START HERE: ZombieOrchard

**Repository:** `LuminaryLabs-Publish/ZombieOrchard`  
**Branch:** `main`  
**Aligned:** `2026-07-13T18-00-38-04-00`  
**Status:** `html-content-command-surface-authority-central-reconciled`  
**Retained statuses:** `browser-startup-readiness-failure-authority-central-reconciled`, `canvas-html-frame-coherence-authority-central-reconciled`, `runtime-event-lifecycle-publication-authority-audited`, `runtime-observer-publication-authority-central-reconciled`

## Summary

ZombieOrchard is a dependency-free orchard survival and economy shell built from a mutable kit runtime, 12 interface definitions, gameplay services, Canvas2D and HTML projection, diagnostics, Node smoke proof, static build, and Pages deployment.

The current audit isolates the HTML content and delegated-command boundary. Dynamic values are coerced with `String()` and interpolated into `innerHTML`. The same root accepts any descendant carrying `data-action` or `data-command`, so caller-provided display data can become markup and then become a live command control.

## Plan ledger

**Goal:** make every visible value inert by default and every executable control explicitly authored, route-valid, revisioned, and acknowledged.

- [x] Compare all ten current Publish repositories with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only ZombieOrchard as the oldest eligible central entry.
- [x] Preserve the complete interaction loop, domain inventory, 27-kit census, and services.
- [x] Add the timestamped content-safety audit family.
- [x] Refresh required root `.agent` documents.
- [x] Keep writes on `main`; create no branch or pull request.
- [ ] Implement safe DOM construction, delegated-control manifests, and executable fixtures.

## Read this run first

```txt
.agent/trackers/2026-07-13T18-00-38-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-13T18-00-38-04-00.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-13T18-00-38-04-00-html-content-command-surface-dsk-map.md
.agent/render-audit/2026-07-13T18-00-38-04-00-unsafe-html-visible-projection-gap.md
.agent/gameplay-audit/2026-07-13T18-00-38-04-00-roster-content-delegated-command-loop.md
.agent/interaction-audit/2026-07-13T18-00-38-04-00-content-origin-projection-command-result-map.md
.agent/content-safety-audit/2026-07-13T18-00-38-04-00-innerhtml-delegated-control-contract.md
.agent/deploy-audit/2026-07-13T18-00-38-04-00-content-injection-fixture-gate.md
.agent/central-sync-audit/2026-07-13T18-00-38-04-00-repo-ledger-content-safety-reconciliation.md
```

## Complete interaction loop

```txt
browser or public-host input
  -> runtime command(domain, type, payload)
  -> domain mutates state
  -> snapshot reaches HTML renderer
  -> String() coercion and template interpolation
  -> root.innerHTML replaces the subtree
  -> delegated listener accepts matching descendants
  -> injected data-action or data-command can dispatch a runtime command
```

## Required authority

```txt
zombie-orchard-html-content-command-surface-authority-domain
```

## Required transaction

```txt
HtmlProjectionCommand
  -> bind snapshot revision, route, content origin, and projection ID
  -> classify fields as text, attribute token, or explicitly trusted markup
  -> validate authored controls against the active route
  -> encode values or build nodes directly
  -> reject untrusted markup without live DOM mutation
  -> prepare and validate a detached fragment and control manifest
  -> atomically adopt the accepted subtree
  -> publish HtmlContentSafetyResult
  -> publish FirstVisibleHtmlContentFrameAck
```

## Validation boundary

Documentation only. Runtime source, HTML, CSS, gameplay, rendering, dependencies, package scripts, tests, workflows, and deployment were not changed. No injection resistance, command-surface isolation, visible content proof, or production-readiness claim is made.
