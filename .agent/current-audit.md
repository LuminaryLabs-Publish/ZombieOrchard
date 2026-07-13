# Current audit: ZombieOrchard

**Timestamp:** `2026-07-13T18-00-38-04-00`  
**Status:** `html-content-command-surface-authority-central-reconciled`  
**Branch:** `main`

## Summary

The HTML renderer treats `String()` coercion as output encoding, then assigns template strings through `innerHTML`. Dynamic roster names, card labels, action labels and IDs, messages, titles, and descriptions can alter document structure. Because the same root uses delegated selectors for `data-action` and `data-command`, injected markup can also create executable controls.

## Plan ledger

**Goal:** preserve the full repository breakdown while making content trust, DOM construction, and command-surface admission explicit and testable.

- [x] Compare the current Publish organization inventory and central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm no higher-priority repository outranks the fallback rule.
- [x] Select only ZombieOrchard as the oldest eligible central entry.
- [x] Read runtime, interface, roster, renderer, host, preset, test, and build surfaces.
- [x] Preserve all 27 implemented kits and offered services.
- [x] Add and route the timestamped content-safety audit family.
- [x] Keep writes on `main`; create no branch or pull request.
- [ ] Implement and run content-safety fixtures.

## Selection comparison

```txt
ZombieOrchard      2026-07-13T13-01-03-04-00 selected
TheOpenAbove       2026-07-13T13-39-10-04-00
MyCozyIsland       2026-07-13T14-39-40-04-00
TheUnmappedHouse   2026-07-13T14-58-07-04-00
AetherVale         2026-07-13T15-41-24-04-00
IntoTheMeadow      2026-07-13T16-01-05-04-00
PrehistoricRush    2026-07-13T16-41-10-04-00
PhantomCommand     2026-07-13T17-00-59-04-00
HorrorCorridor     2026-07-13T17-40-04-04-00
TheCavalryOfRome   excluded
```

## Complete interaction loop

```txt
input or GameHost
  -> engine.command(domain, type, payload)
  -> mutable state
  -> snapshot
  -> String() and template string
  -> innerHTML
  -> DOM descendants
  -> delegated data-action/data-command lookup
  -> engine.command(...)
```

## Domains in use

```txt
browser DOM, subtree replacement, delegated clicks, Canvas2D, RAF, and public GameHost
runtime registration, arbitrary commands, ticks, events, snapshots, subscribers, and publication
12 interface domains and interface composition
resource ledger, pressure, orchard, construction, roster, and inventory
movement, collection, phases, pests, score, damage, failure, and outcome
dynamic content projection and executable-control admission
content origin, trust, safe DOM construction, control manifests, rejection, and visible proof
Node smoke, static build, Pages deployment, and central tracking
```

## Implemented kits and offered services

```txt
27 total surfaces: 19 engine-installed and 8 host/tooling/support
runtime and scoped interface composition
12 route/interface domains
resource, pressure, orchard, construction, roster, and inventory services
Canvas2D and HTML projection
raw GameHost diagnostics
smoke, build, and Pages deployment
```

## Source-backed findings

- `text()` only calls `String()`.
- `button()` interpolates action IDs and labels into markup.
- `cards()` interpolates labels, names, IDs, summaries, roles, and types.
- Messages, titles, and descriptions enter `innerHTML`.
- `roster-runtime` stores caller-provided `payload.name`.
- `GameHost` exposes the raw engine.
- The delegated listener accepts any matching descendant.
- No content-origin, field-context, trusted-markup, control-manifest, rejection, or security fixture exists.

## Required parent domain

```txt
zombie-orchard-html-content-command-surface-authority-domain
```

## Required transaction

```txt
HtmlProjectionCommand
  -> bind snapshot, route, content origin, and expected revision
  -> classify field context and trust
  -> validate action and command tokens
  -> encode or construct nodes directly
  -> reject unsafe content with zero live mutation
  -> prepare detached DOM and control manifest
  -> atomically adopt the accepted revision
  -> publish HtmlContentSafetyResult
  -> acknowledge the first visible matching content frame
```

## Current file family

```txt
.agent/trackers/2026-07-13T18-00-38-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-13T18-00-38-04-00.md
.agent/architecture-audit/2026-07-13T18-00-38-04-00-html-content-command-surface-dsk-map.md
.agent/render-audit/2026-07-13T18-00-38-04-00-unsafe-html-visible-projection-gap.md
.agent/gameplay-audit/2026-07-13T18-00-38-04-00-roster-content-delegated-command-loop.md
.agent/interaction-audit/2026-07-13T18-00-38-04-00-content-origin-projection-command-result-map.md
.agent/content-safety-audit/2026-07-13T18-00-38-04-00-innerhtml-delegated-control-contract.md
.agent/deploy-audit/2026-07-13T18-00-38-04-00-content-injection-fixture-gate.md
.agent/central-sync-audit/2026-07-13T18-00-38-04-00-repo-ledger-content-safety-reconciliation.md
```

## Validation boundary

Documentation only. No runtime, gameplay, renderer, HTML, CSS, dependency, package-script, test, workflow, build, or deployment behavior changed.
