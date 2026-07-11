# START HERE: ZombieOrchard

## Last aligned

```txt
2026-07-11T13-41-23-04-00
```

## Summary

`ZombieOrchard` is a dependency-free static orchard survival and economy shell built from a small kit runtime, 12 interface domains, gameplay services, canvas and HTML projection, diagnostics, smoke proof, a static build and Pages deployment.

The current audit establishes the missing runtime-session instance authority. The browser constructs one mutable graph before Play, then Play, New Game, Start, Pause, Title and Outcome only change interface routes. No runtime/session identity, fresh-run transaction, RAF lease, listener lease, renderer disposal, public-host revocation or ordered graph disposal exists.

## Plan ledger

**Goal:** make every orchard run an identified, independently constructible and disposable session before adding authoritative timing, public capabilities, transactions, replay or persistence.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger and root `.agent` state.
- [x] Select only `ZombieOrchard` as the oldest eligible central entry.
- [x] Identify the interaction loop, domains, kits and services.
- [x] Trace graph construction, route reuse, RAF, listeners, renderers and `GameHost` ownership.
- [x] Add a timestamped tracker and architecture/system audits.
- [x] Change no runtime source.
- [x] Push directly to `main` without a branch or pull request.
- [ ] Implement runtime-session authority and executable lifecycle fixtures.

## Read this first

```txt
.agent/trackers/2026-07-11T13-41-23-04-00/project-breakdown.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/architecture-audit/2026-07-11T13-41-23-04-00-runtime-session-instance-dsk-map.md
.agent/render-audit/2026-07-11T13-41-23-04-00-session-frame-resource-correlation-gap.md
.agent/gameplay-audit/2026-07-11T13-41-23-04-00-start-reset-title-outcome-reuse-loop.md
.agent/interaction-audit/2026-07-11T13-41-23-04-00-lifecycle-command-session-admission-map.md
.agent/lifecycle-audit/2026-07-11T13-41-23-04-00-runtime-graph-raf-listener-dispose-contract.md
.agent/deploy-audit/2026-07-11T13-41-23-04-00-runtime-session-lifecycle-fixture-gate.md
.agent/turn-ledger/2026-07-11T13-41-23-04-00.md
.agent/kit-registry.json
```

## Product interaction loop

```txt
module import
  -> create one engine graph immediately
  -> create canvas and HTML renderers
  -> attach delegated click listener
  -> expose raw GameHost
  -> start unretained recursive RAF

Play / New Game / Start
  -> route the same graph to active-session

Pause / Resume / Title
  -> route changes only
  -> graph remains live and ticks

Failure / Outcome / Title
  -> ended graph remains live
  -> later composition tick can reopen Outcome

page unload
  -> implicit browser cleanup only
  -> no explicit dispose result
```

## Main finding

```txt
one page lifetime
  -> one mutable graph
  -> unidentified run state
  -> unretained RAF
  -> anonymous delegated listener
  -> renderer owners without dispose
  -> raw global engine/tick capability
  -> no fresh-run authority transfer
  -> no ordered disposal
```

`New Game` does not create new resources, pressure, orchard state, construction state, roster, inventory, player, pests, score or terminal latch. It only changes the active interface route.

## Domains in use

```txt
static browser route and ESM boot
browser runtime/session host
kit registration and domain graph construction
command, tick, event, snapshot, subscription and publication routing
12 scoped interface-screen domains
interface route composition and automatic Outcome routing
resource ledger and pressure field
orchard world and apple lifecycle
construction, roster and inventory runtimes
active-session movement, collection, phases, pests, damage, score and failure
world canvas projection
HTML projection and delegated interaction
GameHost diagnostics and direct mutation
Node smoke, static build and Pages deployment
missing session, clock, capability, transaction, replay and persistence authority
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

## Ordered implementation queue

```txt
1. Runtime Session Instance Authority
2. Fixed-Step Clock Authority
3. Public Capability Gateway and Reachability
4. Composite Command Transaction Authority
5. Seeded Random and Replay Authority
6. Versioned Save / Load Authority
```

## Next safe ledge

```txt
ZombieOrchard Runtime Session Instance Authority
+ Start / New Run / Title / Outcome / Dispose Fixture Gate
```

The fixed-step clock must consume the session identity and lifecycle admission established here. Do not add a second session model inside the clock.