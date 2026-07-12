# START HERE: ZombieOrchard

**Repository:** `LuminaryLabs-Publish/ZombieOrchard`  
**Branch:** `main`  
**Aligned:** `2026-07-12T10-09-07-04-00`  
**Status:** `kit-graph-installation-central-sync-reconciled`

## Summary

`ZombieOrchard` is a dependency-free orchard survival and economy shell built from a mutable kit runtime, 12 interface-domain definitions, gameplay services, canvas and HTML projection, diagnostics, Node smoke proof, static build and Pages deployment.

The current audit isolates kit-graph installation authority. Source composition installs **19 runtime kits**, while the repository contains **27 implemented kit surfaces** after host, factory, rendering, proof and deployment surfaces are included. Installation still has no manifest, version, service contract, dependency resolver, duplicate-domain rejection, detached candidate graph, atomic commit, rollback, predecessor disposal, graph revision or visible-frame proof.

This alignment also repairs central drift: the repo-local audit had advanced to kit-graph authority at `2026-07-12T10-00-00-04-00`, while the central ledger still described the earlier HTML interface projection audit. The machine census was corrected from 21 to 19 engine-installed kits.

## Plan ledger

**Goal:** keep repo-local and central documentation synchronized on one source-backed kit graph, then implement a deterministic and atomic installation authority.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledgers and root `.agent` state.
- [x] Select only `ZombieOrchard` because its repo-local audit was newer than central tracking.
- [x] Trace startup, kit composition, installation, ticking, rendering and public mutation.
- [x] Identify the complete interaction loop, domains, 27 implemented kit surfaces and all offered services.
- [x] Correct the engine-installed kit count to 19.
- [x] Reconfirm duplicate-domain replacement, implicit dependencies and insertion-order ticking.
- [x] Add a new timestamped tracker, turn ledger and system audits.
- [x] Refresh machine-readable audit state.
- [x] Synchronize `LuminaryLabs-Dev/LuminaryLabs`.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Implement graph authority and run Node/browser/Pages fixtures.

## Read this run first

```txt
.agent/trackers/2026-07-12T10-09-07-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-12T10-09-07-04-00.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-12T10-09-07-04-00-kit-graph-census-central-sync-dsk-map.md
.agent/render-audit/2026-07-12T10-09-07-04-00-graph-revision-canvas-html-proof-gap.md
.agent/gameplay-audit/2026-07-12T10-09-07-04-00-install-order-service-failure-loop.md
.agent/interaction-audit/2026-07-12T10-09-07-04-00-add-kit-command-replacement-result-map.md
.agent/kit-graph-audit/2026-07-12T10-09-07-04-00-engine-installed-census-contract.md
.agent/central-sync-audit/2026-07-12T10-09-07-04-00-local-central-ledger-reconciliation.md
.agent/deploy-audit/2026-07-12T10-09-07-04-00-kit-graph-browser-pages-fixture-gate.md
```

## Interaction loop

```txt
createOrchardGame()
  -> assemble 19 engine-installed kits
  -> createKitRuntime({ kits })
  -> call kit.create(ctx) against the live graph
  -> assign domains[domain.id] directly
  -> expose raw engine through GameHost
  -> tick domains in object insertion order
  -> render canvas and HTML from domain-only snapshots
```

## Main findings

```txt
implemented kit surfaces: 27
engine-installed kits: 19
host/tooling/support kits: 8

kit manifests: absent
kit/service versions: absent
provided/required service declarations: absent
dependency resolution and cycle checks: absent
explicit lifecycle/tick phases: absent
duplicate kit/domain rejection: absent
detached candidate graph: absent
atomic commit and rollback: absent
predecessor retirement/disposal: absent
graph ID/revision/fingerprint: absent
installation receipts: absent
first visible graph-frame acknowledgement: absent
raw post-start GameHost.engine.addKit: exposed
```

## Required parent domain

```txt
zombie-orchard-kit-graph-installation-authority-domain
```

## Required transaction

```txt
KitGraphInstallCommand
  -> validate session and predecessor revision
  -> normalize immutable manifests
  -> validate unique identities and service compatibility
  -> resolve deterministic dependency and phase order
  -> construct a detached candidate graph
  -> validate APIs, snapshots and resource leases
  -> atomically commit one graph revision
  -> migrate or retire explicit predecessors
  -> rollback all candidate acquisition on failure
  -> publish graph fingerprint and installation receipts
  -> acknowledge the first canvas and HTML frame using that revision
```

## Guardrails

```txt
Push only to main.
Create no branch or pull request.
Do not work on TheCavalryOfRome.
Do not use object insertion history as an implicit phase contract.
Do not silently replace a domain owner.
Do not expose raw graph mutation through GameHost.
Do not claim graph safety until executable fixtures pass.
```