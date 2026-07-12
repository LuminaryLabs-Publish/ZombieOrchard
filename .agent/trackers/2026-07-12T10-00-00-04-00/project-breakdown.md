# Project breakdown: ZombieOrchard kit graph installation

**Timestamp:** `2026-07-12T10-00-00-04-00`  
**Repository:** `LuminaryLabs-Publish/ZombieOrchard`  
**Branch:** `main`

## Summary

This run documents how the runtime constructs and mutates its kit graph. The current installer writes domains directly into one live object, permits duplicate-domain replacement, relies on insertion order for ticks and exposes post-start mutation through `GameHost.engine.addKit()`.

## Plan ledger

**Goal:** define one validated and atomic kit-graph transaction from immutable manifests to the first visible frame produced by the committed graph.

- [x] Compare all Publish repositories against central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `ZombieOrchard` under the oldest synchronized fallback rule.
- [x] Trace initial and post-start kit installation.
- [x] Identify the interaction loop, domains, all 27 kits and services.
- [x] Document duplicate ownership, implicit dependencies and order sensitivity.
- [x] Define candidate-graph validation, commit, rollback and disposal.
- [x] Add architecture, render, gameplay, interaction, kit-graph and deploy audits.
- [x] Refresh root `.agent` routing and registry.
- [ ] Implement and execute graph fixtures.

## Selection

```txt
eligible repositories: 9
new/missing/undocumented/drifted repositories: 0
selected oldest synchronized repository: ZombieOrchard
excluded: TheCavalryOfRome
```

## Interaction loop

```txt
createOrchardGame
  -> assemble ordered kit array
  -> createKitRuntime
  -> addKit for each descriptor
  -> kit.create(liveContext)
  -> domains[domain.id] = domain
  -> begin RAF
  -> tick Object.values(domains)
  -> render snapshots

post-start
  -> GameHost.engine.addKit(candidate)
  -> immediate live-map mutation
```

## Domains

```txt
browser and public host
kit manifests and graph installation
service dependencies and compatibility
deterministic lifecycle/tick phases
candidate graph, commit, rollback and disposal
graph identity and visible-frame provenance
runtime commands, ticks, events and snapshots
12 interface domains and composition
resource, pressure, orchard, construction, roster, inventory and active session
canvas and HTML rendering
validation, build and Pages deployment
```

## Kit and service census

```txt
implemented kit responsibilities: 27
engine-installed descriptors: 21
```

Services span runtime registration and publication, screen routing, economy and survival gameplay, world/HUD rendering, diagnostics, Node smoke, static build and Pages deployment.

## Main finding

```txt
manifest/dependency/version validation: absent
duplicate domain rejection: absent
explicit tick phase order: absent
candidate graph and atomic commit: absent
rollback/disposal: absent
graph revision/fingerprint/frame receipt: absent
```

## Required parent domain

```txt
zombie-orchard-kit-graph-installation-authority-domain
```

## Validation boundary

Documentation only. Runtime, dependencies, package scripts, gameplay, rendering and deployment were not changed. No graph fixtures or browser/Pages smoke were run.