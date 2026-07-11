# Current audit: ZombieOrchard

## Status

```txt
last aligned: 2026-07-11T10-00-12-04-00
status: public-capability-gateway-diagnostics-quarantine-fixture-gate-audited
runtime source changed: no
branch: main
root .agent state: refreshed
central ledger sync: complete
central internal change log: complete
```

## Summary

`ZombieOrchard` is a dependency-free static browser game built from a small kit runtime, 12 scoped interface domains, orchard/economy/survival services, canvas and HTML renderers, diagnostics, a Node smoke test, a static build and Pages deployment. The current audit narrows Gate 3 to the missing public capability gateway between browser intent, command admission, result retention, render acknowledgement and internal/debug access.

## Plan ledger

**Goal:** preserve the full repository breakdown while defining one gateway that makes public actions truthful and keeps internal/debug commands from bypassing lifecycle, route, target and capability policy.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledgers and root `.agent` state.
- [x] Select only `ZombieOrchard` because repo-local capability documentation was newer than the central ledger.
- [x] Identify the interaction loop.
- [x] Identify all domains in use.
- [x] Identify all implemented kits and services.
- [x] Trace direct DOM commands, nested composition commands and `GameHost` bypass paths.
- [x] Define public, internal, debug-only, dormant and unsupported capability boundaries.
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
reason: repo-local capability audit newer than central ledger
excluded: TheCavalryOfRome
```

Only `LuminaryLabs-Publish/ZombieOrchard` was changed in the Publish organization.

## Product interaction loop

```txt
browser boot
  -> create one kit runtime and all gameplay/interface domain closures
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
  -> render world canvas and replace interface HTML

player intent
  -> data-action or hard-coded data-command
  -> direct engine.command
  -> domain mutation or rejection
  -> publication
  -> DOM adapter discards returned result
  -> later frame projects aggregate state

internal/debug intent
  -> GameHost.engine.command or GameHost.tick
  -> bypass product capability classification and binding policy
  -> mutate or advance the same live graph
```

## Domains in use

```txt
static browser route and ESM boot
browser runtime host
kit registration and domain graph construction
runtime command, tick, event, snapshot, subscription and publication routing
12 scoped interface screens
interface route composition and automatic Outcome routing
resource ledger
pressure field
orchard world and apple lifecycle
construction runtime
roster runtime
inventory runtime
active-session movement, collection, phases, pests, damage, score and failure
world canvas projection
HTML interface projection and delegated input
GameHost diagnostics and debug control
Node smoke fixture
static build copy
Pages deployment
missing runtime-session authority
missing fixed-step clock authority
missing public capability gateway and reachability authority
missing composite-command transaction authority
missing seeded replay authority
missing versioned persistence authority
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

- `kit-runtime`: kit registration, domain creation, unrestricted command routing, delta clamping, all-domain ticking, events, aggregate snapshots, subscriptions and publication.
- Screen kits: screen state, action catalogs, selection, field mutation, metadata, activation, static disabled-action rejection and snapshots.
- `interface-composition-kit`: route ownership, transition, back navigation, parent activation, nested child dispatch and automatic Outcome routing.
- `resource-ledger-kit`: affordability, Boolean payment, resource addition and snapshots.
- `pressure-field-kit`: bounded adjustment, passive growth and snapshots.
- `orchard-world-kit`: tree generation, random apple seeding/replenishment, nearby collection and snapshots.
- `construction-runtime-kit`: catalog lookup with first-item fallback, resource payment, built-object creation and status messages.
- `roster-runtime-kit`: actor/role state, hire payment, actor creation and status messages.
- `inventory-runtime-kit`: item state, equipment state and unvalidated equip mutation.
- `active-session-domain-kit`: movement, collection, pest clearing, phase change, pest admission/placement, pursuit, damage, score and failure.
- Render kits: canvas world projection, HUD, generic screens, slot cards, delegated action binding, hard-coded gameplay buttons and full HTML replacement.
- Diagnostics/proof/deploy kits: raw engine exposure, snapshot readback, unrestricted manual tick, entry-to-play smoke, apple-presence smoke, static build and Pages deployment.

## Capability census

| Capability | Owner | Shipped binding | Classification |
|---|---|---|---|
| route navigation | screen/composition domains | generic action buttons | supported public |
| move | active-session | none | implemented unreachable |
| collect | active-session | quick button | public, deliberate reachability unproven |
| clear | active-session | quick button | supported public |
| next-phase | active-session | quick button | public, admission unscoped |
| build storage shed | construction-runtime | Construction action | public, transaction-dependent |
| hire | roster-runtime | none | implemented unreachable |
| equip | inventory-runtime | none | unreachable and target-unvalidated |
| Market transaction | no runtime owner | visible route | unsupported but presented |
| Session Select | screen only | no incoming route | dormant |
| direct resource/pressure commands | game domains | raw GameHost only | internal but bypassable |
| manual tick | runtime | raw GameHost only | debug control, unrestricted |

## Main finding

There is no single public capability gateway.

```txt
DOM action
  -> direct engine.command
  -> result discarded

GameHost action
  -> raw engine.command or tick
  -> no public/internal/debug distinction
  -> no lifecycle, route, binding or target policy
```

A registry alone will not make the product truthful if callers can continue to bypass it or discard its results. Public interaction must use one admitted gateway; internal/debug controls must require explicit leases and expose detached observations rather than the raw engine.

## Required composed domain

```txt
zombie-orchard-public-capability-gateway-domain
  -> capability-descriptor-kit
  -> capability-registry-kit
  -> public-command-envelope-kit
  -> capability-gateway-kit
  -> capability-lifecycle-admission-kit
  -> capability-route-admission-kit
  -> capability-target-admission-kit
  -> input-binding-registry-kit
  -> command-result-retention-kit
  -> disabled-affordance-projection-kit
  -> render-result-acknowledgement-kit
  -> internal-command-policy-kit
  -> debug-control-lease-kit
  -> diagnostics-observation-kit
  -> raw-engine-quarantine-kit
  -> capability-gateway-journal-kit
  -> capability-gateway-fixture-kit
```

## Latest audit set

```txt
.agent/trackers/2026-07-11T10-00-12-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-11T10-00-12-04-00.md
.agent/architecture-audit/2026-07-11T10-00-12-04-00-public-capability-gateway-dsk-map.md
.agent/render-audit/2026-07-11T10-00-12-04-00-command-result-frame-ack-gap.md
.agent/gameplay-audit/2026-07-11T10-00-12-04-00-player-action-debug-bypass-loop.md
.agent/interaction-audit/2026-07-11T10-00-12-04-00-dom-gateway-gamehost-command-map.md
.agent/capability-gateway-audit/2026-07-11T10-00-12-04-00-public-internal-debug-boundary-contract.md
.agent/deploy-audit/2026-07-11T10-00-12-04-00-capability-gateway-fixture-gate.md
```

## Central tracking

```txt
repo-ledger/LuminaryLabs-Publish/ZombieOrchard.md
internal-change-log/2026-07-11T10-00-12-04-00-zombie-orchard-public-capability-gateway.md
```

## Ordered safe ledges

```txt
1. Runtime Session Instance Authority
2. Fixed-Step Clock Authority
3. Public Capability Gateway and Reachability
4. Composite Command Transaction Authority
5. Seeded Random and Replay Authority
6. Versioned Save / Load Authority
```

Gate 3 must consume session and committed-tick identity from Gates 1 and 2. Gate 4 must consume the same gateway and registry rather than creating a second command-admission model.