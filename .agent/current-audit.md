# Current audit — ZombieOrchard

## Status

```txt
last aligned: 2026-07-11T07-51-07-04-00
status: composite-command-transaction-child-result-single-publication-gate-audited
runtime source changed: no
branch: main
root .agent state: refreshed
central ledger sync: complete
```

## Selection audit

All ten accessible `LuminaryLabs-Publish` repositories were compared. All nine eligible non-Cavalry repositories had a central ledger and root `.agent` state, so the oldest documented-selection rule applied.

```txt
ZombieOrchard        selected / 2026-07-11T06-02-00-04-00
TheUnmappedHouse     tracked  / 2026-07-11T06-21-57-04-00
AetherVale           tracked  / 2026-07-11T06-29-11-04-00
IntoTheMeadow        tracked  / 2026-07-11T06-38-59-04-00
MyCozyIsland         tracked  / 2026-07-11T07-01-49-04-00
PrehistoricRush      tracked  / 2026-07-11T07-08-45-04-00
TheOpenAbove         tracked  / 2026-07-11T07-18-44-04-00
HorrorCorridor       tracked  / 2026-07-11T07-30-40-04-00
PhantomCommand       tracked  / 2026-07-11T07-38-25-04-00
TheCavalryOfRome     excluded by rule
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
runtime command routing, tick routing, events, snapshots and subscriptions
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
missing session identity and lifecycle authority
missing fixed-step simulation clock
missing capability registry and reachability proof
missing composite command transaction authority
missing seeded random and replay authority
missing versioned save/load authority
```

## Implemented kits and services

- `kit-runtime`: kit registration, domain creation, public command dispatch, delta clamping, all-domain ticking, ephemeral event emission, aggregate snapshots, subscriptions and publication.
- `scoped-interface-domain-kit` plus 12 screen kits: screen state, action catalogs, selection, field mutation, metadata, disabled-action rejection, activation and screen snapshots.
- `interface-composition-kit`: active/previous route ownership, transition, back navigation, active-screen activation, nested child dispatch and automatic Outcome routing.
- `resource-ledger-kit`: affordability checks, Boolean payment, addition and resource snapshots.
- `pressure-field-kit`: bounded channel adjustment, passive growth and snapshots.
- `orchard-world-kit`: tree creation, global-random apple seeding/replenishment, nearby collection and snapshots.
- `construction-runtime-kit`: catalog lookup, first-item fallback, resource payment, built-object creation and message state.
- `roster-runtime-kit`: actor/role state, hiring payment, actor creation and messages.
- `inventory-runtime-kit`: item state and unvalidated equipment mutation.
- `active-session-domain-kit`: movement, apple collection, pest clearing, phase changes, global-random pest spawning, pursuit, damage, score and terminal failure.
- `world-canvas-render-kit`: world, apple, pest and player canvas projection.
- `html-interface-render-kit`: HUD/screen/slot projection, delegated DOM input, hard-coded gameplay command binding and per-frame HTML replacement.
- `game-host-diagnostics-kit`: raw engine exposure, aggregate snapshot readback and unrestricted manual ticking.
- `smoke-fixture-kit`, `static-build-copy-kit`, `pages-deploy-kit`: minimal route/apple proof, static artifact copy and Pages deployment.

## Composite command trace

### Current Construction action

`src/presets/orchard-preset.js` declares:

```txt
construction.shed
  -> parent action activation
  -> child domain: construction-runtime
  -> child type: build
  -> payload id: storage-shed
```

### Current dispatch path

```txt
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

### Exact defects

1. **Child result loss.** `interface-composition` does not retain or return the result of the required child command.
2. **False parent success.** The parent can report `accepted: true` even when the child rejects for missing resources, missing domain or invalid behavior.
3. **Nested publication.** The child dispatch uses the public command path, causing publication before the parent command has completed.
4. **Double publication.** The outer command publishes again after the nested publication.
5. **Route independence.** A future action with both `command` and `to` can route after a rejected child because the route decision does not depend on child success.
6. **No preflight.** Domain existence, command support, catalog target, affordability and route availability are not validated as one plan.
7. **Weak target admission.** An unknown construction ID falls back to the first catalog item instead of rejecting the target.
8. **Weak resource receipt.** Payment returns only a Boolean, with no before/after values, debit ID or reason.
9. **No rollback.** Resource debit and built-object creation are not staged under one reversible transaction.
10. **No correlation.** Commands, events, snapshots and rendered frames carry no command ID, transaction ID, session ID, tick ID or state fingerprint.

## Required transaction authority DSK map

```txt
composite-command-transaction-domain
  -> command-envelope-kit
  -> command-sequence-kit
  -> transaction-id-kit
  -> command-preflight-kit
  -> child-command-plan-kit
  -> internal-dispatch-kit
  -> child-command-result-kit
  -> required-child-policy-kit
  -> resource-debit-receipt-kit
  -> target-admission-kit
  -> mutation-stage-kit
  -> command-rollback-kit
  -> route-commit-kit
  -> command-result-envelope-kit
  -> command-publication-barrier-kit
  -> command-journal-kit
  -> render-command-correlation-kit
  -> command-transaction-fixture-kit
```

## Required parent result

```txt
commandId
transactionId
sessionId
sessionEpoch
source
parentDomain
parentType
parentAccepted
childResults[]
routeResult
beforeFingerprint
afterFingerprint
publicationCount
committedTickId
firstRenderedFrameId
reason
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

The transaction gate remains fourth. It depends on session/epoch identity, committed tick identity and a truthful capability registry, but its exact contract is now documented.
