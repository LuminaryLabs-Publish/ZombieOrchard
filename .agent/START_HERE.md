# START HERE: ZombieOrchard

**Repository:** `LuminaryLabs-Publish/ZombieOrchard`  
**Branch:** `main`  
**Aligned:** `2026-07-13T03-59-28-04-00`  
**Status:** `canvas-html-frame-coherence-authority-audited`  
**Retained statuses:** `runtime-event-lifecycle-publication-authority-audited`, `runtime-observer-publication-authority-central-reconciled`

## Summary

ZombieOrchard is a dependency-free orchard survival and economy shell built from a mutable kit runtime, 12 interface definitions, gameplay services, canvas and HTML projection, diagnostics, Node smoke proof, static build, and Pages deployment.

The current audit isolates the browser presentation boundary. `engine.tick()` publishes one snapshot to subscribers and then captures a second snapshot for the host. `src/start.js` applies that second snapshot to the canvas first and the HTML subtree second. No shared frame identity, projection revision, commit barrier, partial-failure result, or first-visible-frame acknowledgement proves that observers, canvas, HTML, diagnostics, and successor scheduling adopted the same state.

## Plan ledger

**Goal:** make one committed runtime revision produce one immutable frame envelope and one terminal dual-surface presentation result.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Select only ZombieOrchard as the oldest eligible documented repository.
- [x] Trace runtime publication, returned snapshots, canvas rendering, HTML rendering, diagnostics, and RAF scheduling.
- [x] Preserve all 27 implemented kit surfaces and their offered services.
- [x] Add a timestamped tracker, turn ledger, and frame-coherence audit family.
- [x] Refresh all required root `.agent` documents and the machine registry.
- [x] Push only to `main` and create no branch or pull request.
- [ ] Runtime frame-envelope implementation and executable browser fixtures remain future work.

## Read this run first

```txt
.agent/trackers/2026-07-13T03-59-28-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-13T03-59-28-04-00.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-13T03-59-28-04-00-canvas-html-frame-coherence-dsk-map.md
.agent/render-audit/2026-07-13T03-59-28-04-00-canvas-html-visible-frame-coherence-gap.md
.agent/gameplay-audit/2026-07-13T03-59-28-04-00-runtime-state-dual-surface-loop.md
.agent/interaction-audit/2026-07-13T03-59-28-04-00-command-frame-surface-result-map.md
.agent/frame-coherence-audit/2026-07-13T03-59-28-04-00-publication-canvas-html-commit-contract.md
.agent/deploy-audit/2026-07-13T03-59-28-04-00-dual-surface-frame-fixture-gate.md
```

## Complete interaction loop

```txt
browser interaction
  -> engine.command(...)
  -> domain mutation
  -> notify captures publication snapshot P
  -> synchronous subscribers receive P

RAF frame
  -> engine.tick(1 / 60)
  -> runtime and domain mutation
  -> notify captures publication snapshot T1
  -> synchronous subscribers receive T1
  -> tick captures and returns second snapshot T2
  -> canvas mutates drawing buffer from T2
  -> HTML renderer replaces #ui-root from T2
  -> successor RAF is requested

public diagnostics
  -> GameHost.getState() captures a third current snapshot
  -> no result identifies P, T1, T2, canvas state, HTML state, or the visible browser frame
```

## Main findings

```txt
shared FrameId and StateRevision: absent
publication-to-render snapshot identity: absent
immutable frame envelope: absent
canvas projection result: absent
HTML projection result: absent
atomic dual-surface commit: absent
partial-frame classification and recovery: absent
route-to-world-surface policy: implicit
visible frame fingerprint and acknowledgement: absent
GameHost visible-state readback: absent
```

## Required parent domain

`zombie-orchard-canvas-html-frame-coherence-authority-domain`

## Guardrails

- Keep gameplay, interface, canvas projection, and HTML projection as separate bounded owners.
- Do not treat sequential renderer calls as an atomic presentation commit.
- Do not infer visible state from a fresh `engine.snapshot()` call.
- Do not reuse runtime frame counters as visible-frame proof without a presentation receipt.
- Do not claim canvas/HTML parity until source, dist, and Pages fixtures verify the same frame envelope and result.
