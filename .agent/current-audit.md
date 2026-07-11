# Current audit: ZombieOrchard

## Status

```txt
last aligned: 2026-07-11T07-59-08-04-00
status: composite-command-transaction-child-result-single-publication-gate-audited
runtime source changed: no
branch: main
root .agent state: refreshed
central ledger sync: complete
```

## Summary

`ZombieOrchard` is a dependency-free static browser game built from a small kit runtime, 12 interface domains, orchard/economy/survival services, canvas and HTML renderers, diagnostics, a Node smoke test, a static build, and Pages deployment. The current audit documents the fourth architecture gate: composite screen actions are not one transaction.

## Plan ledger

**Goal:** preserve the complete repository breakdown while defining one truthful boundary from interface intent through required child work, route mutation, publication, result return, and first rendered frame.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger and root `.agent` state.
- [x] Select only `ZombieOrchard` because repo-local documentation was newer than the prior central ledger.
- [x] Re-read runtime, composition, gameplay, renderer, preset, proof, and `.agent` surfaces.
- [x] Identify the interaction loop.
- [x] Identify all domains in use.
- [x] Identify all implemented kits and services.
- [x] Trace Construction to Storage Shed through parent and child command dispatch.
- [x] Identify child-result loss, nested publication, false parent success, target fallback, and missing rollback/correlation.
- [x] Add timestamped architecture and system audits.
- [x] Push documentation only to `main`.
- [x] Synchronize the central ledger and internal change log.
- [x] Create no branch or pull request.
- [ ] Runtime implementation and executable fixtures remain future work.

## Selection audit

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or central-ledger-missing repositories: 0
root-.agent-missing repositories: 0
selected: ZombieOrchard
reason: repo-local composite-command audit was newer than the prior central ledger
excluded: TheCavalryOfRome
```

Only `LuminaryLabs-Publish/ZombieOrchard` was changed in the Publish organization.

## Product interaction loop

```txt
browser boot
  -> src/boot.js imports src/start.js
  -> createOrchardGame() constructs one kit runtime
  -> create all gameplay and interface domain closures
  -> create canvas and HTML renderers
  -> install delegated click listener
  -> expose raw engine and manual tick on GameHost
  -> begin recursive RAF

RAF callback
  -> engine.tick(1 / 60)
  -> clamp delta and advance frame/elapsed
  -> clear ephemeral events
  -> tick every domain
  -> notify subscribers
  -> aggregate snapshots
  -> render world canvas
  -> replace interface HTML

interface click
  -> HTML renderer calls engine.command(interface-composition, activate)
  -> composition asks active screen to resolve action
  -> optional child command dispatches through public engine.command
  -> nested child publication occurs
  -> child result is discarded
  -> optional route transition occurs independently
  -> parent publication occurs
```

## Domains in use

```txt
static browser route and ESM boot
browser runtime host
kit registration and domain graph construction
runtime command routing, tick routing, events, snapshots, subscriptions, and publication
12 scoped interface screens
interface route composition and automatic Outcome routing
resource ledger
pressure field
orchard world and apple lifecycle
construction runtime
roster runtime
inventory runtime
active-session movement, collection, phase, pests, damage, score, and failure
world canvas projection
HTML interface projection and delegated input
GameHost diagnostics
Node smoke fixture
static build copy
Pages deployment
missing session identity and lifecycle authority
missing fixed-step simulation clock
missing capability registry and reachability proof
missing composite-command transaction authority
missing seeded random and replay authority
missing versioned save/load authority
```

## Implemented kit inventory

```txt
kit-runtime
scoped-interface-domain-kit
entry-domain-kit
session-select-domain-kit
run-setup-domain-kit
active-session-domain-kit
interrupt-domain-kit
construction-domain-kit
exchange-domain-kit
roster-domain-kit
inventory-domain-kit
knowledge-domain-kit
preferences-domain-kit
outcome-domain-kit
interface-composition-kit
resource-ledger-kit
pressure-field-kit
orchard-world-kit
construction-runtime-kit
roster-runtime-kit
inventory-runtime-kit
world-canvas-render-kit
html-interface-render-kit
game-host-diagnostics-kit
smoke-fixture-kit
static-build-copy-kit
pages-deploy-kit
```

## Kit services

- `kit-runtime`: kit registration, domain creation, public command routing, delta clamping, all-domain ticking, ephemeral events, aggregate snapshots, subscriptions, and publication.
- Screen kits: screen state, action catalogs, selection, field mutation, metadata, activation, disabled-action rejection, and snapshots.
- `interface-composition-kit`: active and previous route ownership, transition, back navigation, parent activation, nested public child dispatch, and automatic Outcome routing.
- `resource-ledger-kit`: affordability checks, Boolean payment, resource addition, and snapshots.
- `pressure-field-kit`: bounded adjustment, passive pressure growth, and snapshots.
- `orchard-world-kit`: tree creation, random apple seeding and replenishment, nearby collection, and snapshots.
- `construction-runtime-kit`: catalog lookup with first-item fallback, resource payment, built-object creation, and messages.
- `roster-runtime-kit`: actor and role state, hiring payment, actor creation, and messages.
- `inventory-runtime-kit`: item state and unvalidated equipment mutation.
- `active-session-domain-kit`: movement, apple collection, pest clearing, phase changes, pest spawning, pursuit, damage, score, and failure.
- Render kits: canvas world projection, HUD and screen HTML, slot cards, DOM action binding, gameplay command binding, and per-frame HTML replacement.
- Diagnostics and proof kits: raw engine exposure, snapshot readback, manual tick, smoke checks, static build copy, and Pages deployment.

## Composite command trace

```txt
Construction screen Storage Shed action
  -> parent activation accepted
  -> child domain: construction-runtime
  -> child type: build
  -> payload id: storage-shed

HTML click
  -> outer engine.command(interface-composition, activate)
    -> interface-composition.command(activate)
      -> construction.command(activate)
      -> returns action descriptor
      -> nested engine.command(construction-runtime, build)
        -> construction-runtime.command(build)
        -> optional resource-ledger.api.pay
        -> optional built-object mutation
        -> notify subscribers immediately
      -> child result discarded
      -> optional route move evaluated independently
    -> outer notify subscribers
  -> caller receives only parent result
```

## Exact defects

1. `interface-composition` does not retain or return the required child result.
2. The parent can report `accepted: true` when the child rejected.
3. Nested public dispatch publishes before parent completion.
4. The outer command publishes again.
5. A command-plus-route action can route after child rejection.
6. The complete action plan is not preflighted.
7. An unknown construction ID falls back to the first catalog item.
8. Payment returns only a Boolean, with no receipt or shortfall.
9. Resource and construction mutations are not staged or rolled back together.
10. Commands, snapshots, and frames share no command, transaction, session, tick, or fingerprint identity.

## Required transaction authority

```txt
composite-command-transaction-domain
  -> command-envelope-kit
  -> transaction-id-kit
  -> command-sequence-kit
  -> command-preflight-kit
  -> child-command-plan-kit
  -> internal-dispatch-kit
  -> child-command-result-kit
  -> required-child-policy-kit
  -> target-admission-kit
  -> resource-debit-receipt-kit
  -> mutation-stage-kit
  -> command-rollback-kit
  -> route-commit-kit
  -> command-result-envelope-kit
  -> command-publication-barrier-kit
  -> command-journal-kit
  -> render-command-correlation-kit
  -> command-transaction-fixture-kit
```

## Latest audit set

```txt
.agent/trackers/2026-07-11T07-59-08-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-11T07-59-08-04-00.md
.agent/architecture-audit/2026-07-11T07-59-08-04-00-composite-command-central-reconciliation-dsk-map.md
.agent/render-audit/2026-07-11T07-59-08-04-00-single-publication-frame-proof-gap.md
.agent/gameplay-audit/2026-07-11T07-59-08-04-00-storage-shed-parent-child-result-loop.md
.agent/interaction-audit/2026-07-11T07-59-08-04-00-dom-click-child-dispatch-result-map.md
.agent/command-transaction-audit/2026-07-11T07-59-08-04-00-preflight-commit-rollback-publication-contract.md
.agent/deploy-audit/2026-07-11T07-59-08-04-00-composite-command-fixture-gate.md
```

## Ordered safe ledges

```txt
1. Runtime Session Instance Authority
2. Fixed-Step Clock Authority
3. Interaction Capability Reachability
4. Composite Command Transaction Authority
5. Seeded Random and Replay Authority
6. Versioned Save / Load Authority
```

The transaction gate remains fourth because command identity and stale-command admission must be scoped to an authoritative session, committed simulation clock, and truthful capability registry.