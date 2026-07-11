# Current audit: ZombieOrchard

## Status

```txt
last aligned: 2026-07-11T09-49-27-04-00
status: capability-registry-binding-affordance-fixture-gate-audited
runtime source changed: no
branch: main
root .agent state: refreshed
central ledger sync: pending until central write completes
```

## Summary

`ZombieOrchard` is a dependency-free static browser game built from a small kit runtime, 12 interface domains, orchard/economy/survival services, canvas and HTML renderers, diagnostics, a Node smoke test, a static build and Pages deployment. The current audit details Gate 3: interaction capability reachability.

## Plan ledger

**Goal:** preserve the complete repository breakdown while defining one truthful capability boundary from service implementation through lifecycle/route admission, browser binding, target reachability, result projection and first visible frame.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger and root `.agent` state.
- [x] Select only `ZombieOrchard` as the oldest eligible central-ledger entry.
- [x] Re-read runtime, scoped interfaces, composition, game domains, preset, renderer, proof and `.agent` surfaces.
- [x] Identify the interaction loop.
- [x] Identify all domains in use.
- [x] Identify all implemented kits and offered services.
- [x] Classify capabilities as supported, unreachable, dormant, unsupported or internal.
- [x] Trace movement, collect, clear, phase, construction, market, roster, inventory and Session Select paths.
- [x] Define capability registry, binding, projection, result and fixture requirements.
- [x] Add timestamped architecture and system audits.
- [x] Push documentation only to `main`.
- [x] Create no branch or pull request.
- [ ] Runtime implementation and executable fixtures remain future work.

## Selection audit

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or central-ledger-missing repositories: 0
root-.agent-missing repositories: 0
selected: ZombieOrchard
reason: oldest eligible central-ledger timestamp
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

browser intent
  -> hard-coded data-command or descriptor-derived data-action
  -> public engine.command
  -> domain mutation or rejection
  -> subscriber publication
  -> command result discarded by DOM caller
  -> renderer consumes next aggregate snapshot
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
active-session movement, collection, phase, pests, damage, score and failure
world canvas projection
HTML interface projection and delegated input
GameHost diagnostics
Node smoke fixture
static build copy
Pages deployment
missing runtime-session authority
missing fixed-step clock authority
missing capability registry/reachability authority
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

- `kit-runtime`: kit registration, domain creation, unrestricted public command routing, delta clamping, all-domain ticking, ephemeral events, aggregate snapshots, subscriptions and publication.
- Screen kits: screen state, action catalogs, selection, field mutation, metadata, activation, static disabled-action rejection and snapshots.
- `interface-composition-kit`: route ownership, transition, back navigation, parent activation, nested child dispatch and automatic Outcome routing.
- `resource-ledger-kit`: affordability check, Boolean payment, resource addition and snapshots.
- `pressure-field-kit`: bounded adjustment, passive pressure growth and snapshots.
- `orchard-world-kit`: tree generation, random apple seeding/replenishment, nearby collection and snapshots.
- `construction-runtime-kit`: catalog lookup with first-item fallback, resource payment, built-object creation and messages.
- `roster-runtime-kit`: actors, roles, hire payment, actor creation and messages.
- `inventory-runtime-kit`: items, equipment state and unvalidated equip mutation.
- `active-session-domain-kit`: movement, apple collection, pest clearing, phase changes, random pest admission/placement, pursuit, damage, score and failure.
- Render kits: world projection, HUD, generic screens, cards, delegated action binding, hard-coded gameplay binding and per-frame HTML replacement.
- Diagnostics/proof/deploy kits: raw engine exposure, snapshot readback, manual tick, entry-to-play smoke, apple-presence smoke, static build and Pages deployment.

## Capability census

| Capability | Owner | Shipped binding | Classification |
|---|---|---|---|
| route navigation | scoped screens/composition | generic action buttons | supported public |
| move | active-session | none | implemented unreachable |
| collect | active-session | quick button | public, target reachability unproven |
| clear | active-session | quick button | supported public |
| next-phase | active-session | quick button | supported public, admission unscoped |
| build storage shed | construction-runtime | Construction action | public, depends on Gate 4 |
| hire | roster-runtime | none | implemented unreachable |
| equip | inventory-runtime | none | implemented unreachable and target-unvalidated |
| Market transaction | none | visible Market route | unsupported but presented available |
| Session Select | screen only | no incoming route | dormant |
| select/set-field | scoped screens | none | internal/dormant |
| direct resource/pressure commands | game domains | raw GameHost only | internal but bypassable |

## Exact defects

1. There is no canonical capability descriptor or registry.
2. Domain command existence is not validated against public action declarations.
3. `active-session.move` has no keyboard, pointer or accessible button binding.
4. Collect is clickable, but deliberate movement to a collectible is impossible.
5. Roster and Inventory render cards but offer no Hire or Equip controls.
6. `inventory-runtime.equip` accepts unknown item IDs.
7. Market is rendered as an available route although no exchange runtime exists.
8. Session Select has no incoming route or stable slot owner.
9. Static action `disabled` flags are not derived from runtime service, lifecycle, route, target or resource state.
10. The HTML button helper does not emit disabled state or reason.
11. DOM command results are discarded and cannot drive authoritative feedback.
12. Raw `GameHost.engine` bypasses any future product capability policy.
13. No capability registry revision, fingerprint, observation, journal or first-frame acknowledgement exists.
14. The smoke test does not prove any capability is reachable from the shipped browser surface.

## Required capability authority

```txt
zombie-orchard-capability-reachability-authority-domain
  -> capability-descriptor-kit
  -> capability-registry-kit
  -> capability-owner-binding-kit
  -> capability-lifecycle-admission-kit
  -> capability-route-admission-kit
  -> capability-input-binding-kit
  -> movement-input-adapter-kit
  -> collectible-reachability-kit
  -> roster-hire-binding-kit
  -> inventory-equip-binding-kit
  -> target-admission-kit
  -> unsupported-capability-policy-kit
  -> disabled-affordance-projection-kit
  -> capability-command-result-kit
  -> capability-observation-kit
  -> capability-render-ack-kit
  -> capability-reachability-fixture-kit
```

## Latest audit set

```txt
.agent/trackers/2026-07-11T09-49-27-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-11T09-49-27-04-00.md
.agent/architecture-audit/2026-07-11T09-49-27-04-00-capability-reachability-authority-dsk-map.md
.agent/render-audit/2026-07-11T09-49-27-04-00-capability-affordance-truth-gap.md
.agent/gameplay-audit/2026-07-11T09-49-27-04-00-movement-collect-hire-equip-loop.md
.agent/interaction-audit/2026-07-11T09-49-27-04-00-capability-binding-result-map.md
.agent/capability-reachability-audit/2026-07-11T09-49-27-04-00-registry-binding-projection-contract.md
.agent/deploy-audit/2026-07-11T09-49-27-04-00-capability-reachability-fixture-gate.md
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

Gate 3 must consume session and committed-tick identity from Gates 1 and 2. Gate 4 must consume the capability registry rather than inventing a second command-support model.