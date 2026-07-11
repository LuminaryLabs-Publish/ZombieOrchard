# ZombieOrchard project breakdown

## Summary

This documentation-only pass reconciles the repo-local composite-command audit with central tracking. The shipped Storage Shed action dispatches a child build through the public command path, discards the child result, publishes intermediate state, and can report parent success without proof that the build succeeded.

## Plan ledger

**Goal:** define one atomic parent and child command transaction so admission, resource debit, gameplay mutation, routing, publication, and the first rendered frame share one truthful result.

- [x] Compare the complete accessible `LuminaryLabs-Publish` inventory.
- [x] Exclude `TheCavalryOfRome`.
- [x] Compare all eligible repositories with `LuminaryLabs-Dev/LuminaryLabs`.
- [x] Select only `LuminaryLabs-Publish/ZombieOrchard` because its repo-local audit is newer than its central ledger.
- [x] Re-read browser boot, runtime, composition, gameplay, preset, renderer, proof, and current `.agent` surfaces.
- [x] Identify the interaction loop.
- [x] Identify all active domains.
- [x] Identify all implemented kits and offered services.
- [x] Trace the Storage Shed action through parent activation, child dispatch, resource payment, mutation, publication, and rendering.
- [x] Add timestamped architecture and system audits.
- [x] Change no runtime source.
- [x] Push only to `main`.
- [x] Create no branch or pull request.
- [ ] Runtime transaction implementation and executable fixtures remain future work.

## Selection

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
central-ledger-missing repositories: 0
root-.agent-missing repositories: 0
selected: ZombieOrchard
reason: repo-local audit 2026-07-11T07-51-07-04-00 is newer than central ledger 2026-07-11T06-02-00-04-00
excluded: TheCavalryOfRome
```

Only `LuminaryLabs-Publish/ZombieOrchard` is changed in the Publish organization.

## Interaction loop

```txt
browser boot
  -> create one runtime and all domain closures
  -> create canvas and HTML renderers
  -> install delegated click input
  -> expose raw engine and manual tick on GameHost
  -> begin recursive RAF

interface click
  -> engine.command(interface-composition, activate)
  -> active screen returns an action descriptor
  -> composition dispatches action.command through public engine.command
  -> child command mutates resources and gameplay state
  -> child public command notifies subscribers
  -> composition discards the child result
  -> optional route transition is evaluated independently
  -> parent public command notifies subscribers again
  -> RAF snapshots and renders the resulting state
```

## Domains in use

```txt
static browser route and ESM boot
browser runtime host
kit registration and domain graph construction
runtime command, tick, event, snapshot, subscription, and publication routing
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
missing runtime-session authority
missing fixed-step clock authority
missing capability-reachability authority
missing composite-command transaction authority
missing seeded replay authority
missing versioned persistence authority
```

## Implemented kits

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

## Services offered

- `kit-runtime`: kit registration, domain creation, public command routing, delta clamping, all-domain ticking, events, snapshots, subscriptions, and publication.
- Screen kits: screen state, action catalogs, selection, field mutation, metadata, activation, disabled-action rejection, and snapshots.
- `interface-composition-kit`: active and previous route ownership, transition, back, parent activation, nested public child dispatch, and automatic Outcome routing.
- `resource-ledger-kit`: affordability checks, Boolean payment, resource addition, and snapshots.
- `pressure-field-kit`: bounded adjustment, passive growth, and snapshots.
- `orchard-world-kit`: tree creation, random apple seeding and replenishment, nearby collection, and snapshots.
- `construction-runtime-kit`: catalog lookup, first-item fallback, resource payment, built-object creation, and messages.
- `roster-runtime-kit`: actor and role state, hiring payment, actor creation, and messages.
- `inventory-runtime-kit`: item state and equipment mutation.
- `active-session-domain-kit`: movement, apple collection, pest clearing, phase changes, pest spawning and pursuit, damage, score, and failure.
- Render kits: world canvas, HUD and screen HTML, slot cards, DOM action binding, gameplay command binding, and per-frame HTML replacement.
- Diagnostics and proof kits: raw engine exposure, snapshot readback, manual tick, smoke checks, static build copy, and Pages deployment.

## Main finding

```txt
Storage Shed click
  -> parent accepted action
  -> child build dispatched publicly
  -> child result discarded
  -> child publication occurs
  -> parent can remain accepted after child rejection
  -> parent publication occurs
```

Additional integrity gaps:

```txt
unknown construction id falls back to the first catalog item
resource payment returns Boolean only
resource debit and built-object creation are not staged
no rollback exists
route commitment is independent of child success
no commandId, transactionId, sessionId, tickId, fingerprint, journal, or first-frame acknowledgement exists
```

## Required authority

```txt
composite-command-transaction-domain
  -> command-envelope-kit
  -> transaction-id-kit
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

## Next safe ledge

```txt
ZombieOrchard Runtime Session Instance Authority
+ Start / Reset / Title / Outcome Fidelity Fixture Gate
```

The composite transaction gate remains fourth in dependency order. It depends on session and epoch identity, committed tick identity, and a truthful capability registry.