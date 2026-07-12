# ZombieOrchard project breakdown

## Run

```txt
2026-07-11T23-41-55-04-00
```

## Plan ledger

**Goal:** define one bounded public-host gateway that exposes clone-safe observation and explicitly admitted test commands without publishing the mutable engine graph, domain APIs, registration surface, clock mutation or uncoordinated stepping.

- [x] Compare the complete ten-repository `LuminaryLabs-Publish` inventory with the central repo ledger.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger entries and root `.agent` state.
- [x] Select only `LuminaryLabs-Publish/ZombieOrchard` as the oldest eligible central entry.
- [x] Read browser boot, public host construction, runtime graph, composition, game-domain APIs, render bindings and smoke proof.
- [x] Identify the interaction loop, domains, all implemented kits and their services.
- [x] Trace every capability reachable through `window.GameHost`.
- [x] Define a public capability gateway, read model, command envelope, lease, revocation and fixture boundary.
- [x] Add architecture, render, gameplay, interaction, capability and deploy audits.
- [x] Refresh the required root `.agent` files.
- [x] Push documentation only to `main`; create no branch or pull request.
- [x] Synchronize `LuminaryLabs-Dev/LuminaryLabs` with a ledger update and internal change log.
- [ ] Runtime implementation and executable public-host fixtures remain future work.

## Selection

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

ZombieOrchard      2026-07-11T21-40-49-04-00 selected
TheUnmappedHouse   2026-07-11T21-48-44-04-00
AetherVale         2026-07-11T22-02-01-04-00
MyCozyIsland       2026-07-11T22-20-00-04-00
PrehistoricRush    2026-07-11T22-38-54-04-00
TheOpenAbove       2026-07-11T22-58-50-04-00
IntoTheMeadow      2026-07-11T23-10-51-04-00
HorrorCorridor     2026-07-11T23-18-16-04-00
PhantomCommand     2026-07-11T23-28-29-04-00
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/ZombieOrchard` is in scope for Publish-repo changes in this run.

## Product interaction loop

```txt
module boot
  -> create one retained engine graph
  -> create canvas and HTML renderers
  -> publish window.GameHost
  -> start recursive RAF

browser RAF
  -> GameHost.engine.tick(1 / 60) through the local draw closure
  -> tick every registered domain
  -> return domain snapshot
  -> render world canvas
  -> render active interface route

UI click
  -> delegated data-action or data-command lookup
  -> raw engine.command(domain, type, payload)
  -> nested composition command when configured
  -> notify subscribers
  -> next RAF projects state

external host caller
  -> read GameHost.engine
  -> reach ctx, domains, addKit, command, tick, snapshot and subscribe
  -> optionally call domain command/api/tick directly
  -> optionally mutate ctx or the domains object
  -> optionally submit extra ticks beside the active RAF
```

## Main finding

`window.GameHost` does not expose a bounded diagnostic facade. It exports the complete mutable runtime object:

```txt
window.GameHost
  -> engine
     -> ctx
     -> domains
     -> addKit(kit)
     -> command(domainId, type, payload)
     -> tick(delta)
     -> snapshot()
     -> subscribe(listener)
  -> getState()
  -> tick(delta)
```

This makes the public host a second authority surface rather than a read-only observation surface.

### Reachable bypasses

```txt
GameHost.engine.addKit(...)
  -> installs a new domain
  -> duplicate domain IDs overwrite the existing entry

GameHost.engine.domains[id].api.*
  -> mutates resources, pressure or orchard state directly
  -> bypasses engine.command() and notify()

GameHost.engine.domains[id].command(...)
  -> mutates a domain directly
  -> bypasses runtime publication and any future gateway admission

GameHost.engine.domains[id].tick(...)
  -> advances one domain without the rest of the graph

GameHost.engine.ctx.*
  -> permits frame, elapsed, delta, event and domain-table mutation

GameHost.tick(dt)
  -> can submit extra steps while the browser RAF is active
  -> has no single-writer lease, session identity or route admission receipt
```

`getState()` is clone-oriented for the current domain snapshots, but it returns only the domain map. It omits runtime/session identity, frame, elapsed time, lifecycle, route revision, tick receipt, render-frame receipt and capability revision.

## Domains in use

```txt
browser module boot and window-global host publication
runtime graph construction and domain registration
command, tick, event, snapshot, subscription and publication routing
runtime/session lifecycle authority: missing
fixed-step and single-writer clock authority: missing
route-scoped simulation admission authority: missing
public capability gateway and host revocation authority: missing
12 scoped interface-screen domains
interface composition and nested command routing
resource ledger and pressure field
orchard world and random apple lifecycle
construction, roster and inventory runtimes
active-session movement, phases, pests, damage, score and terminal state
world-canvas and HTML projection
Node smoke proof
static build and GitHub Pages deployment
```

## Complete implemented kit inventory

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

## Services offered by the kits

| Kit group | Services |
|---|---|
| runtime | kit registration, domain creation, command dispatch, clamped ticking, event emission, snapshots, subscriptions and publication |
| interface | screen state, fields, selection, action lookup, activation, route movement, nested dispatch and automatic Outcome routing |
| resource/pressure | affordability, payment, gain, pressure adjustment and per-tick pressure growth |
| orchard | tree layout, random apple seeding, nearest collection and refill |
| construction/roster/inventory | build, hire, equip and state projection |
| active session | player movement, collection, pest clearing, phase changes, pest spawning, pursuit, damage, scoring and terminal failure |
| render | orchard canvas, HUD, route-screen HTML, cards, delegated click bindings and per-frame replacement |
| diagnostics/proof/deploy | raw engine publication, snapshot readback, manual tick, Node smoke proof, static copy and Pages workflow |

## Required composed domain

```txt
zombie-orchard-public-capability-gateway-authority-domain
  -> public-host-contract-kit
  -> host-capability-manifest-kit
  -> capability-id-kit
  -> capability-lease-kit
  -> public-read-model-kit
  -> host-observation-revision-kit
  -> public-command-envelope-kit
  -> public-command-allowlist-kit
  -> command-payload-schema-kit
  -> command-session-admission-kit
  -> single-writer-step-lease-kit
  -> manual-step-capability-kit
  -> public-command-result-kit
  -> host-frame-receipt-kit
  -> duplicate-domain-registration-guard-kit
  -> host-revocation-kit
  -> capability-journal-kit
  -> public-host-observation-kit
  -> public-host-capability-fixture-kit
```

## Required public surface

```txt
window.GameHost
  version
  capabilityRevision
  capabilities()
  observe()
  command(envelope)
  subscribe(listener) -> lease
  revoke(reason)
```

The public surface must not expose `engine`, `ctx`, `domains`, `addKit`, raw domain APIs or an unrestricted `tick()`.

## Required fixtures

```txt
raw-engine-unreachable
ctx-and-domain-table-unreachable
duplicate-domain-overwrite-rejected
direct-domain-api-unreachable
unknown-command-rejected
payload-schema-rejected
stale-session-command-rejected
stale-capability-lease-rejected
manual-step-rejected-while-raf-owns-clock
manual-step-fixture-capability-admitted-and-journaled
observation-is-clone-safe
observation-carries-session-tick-route-and-frame-receipts
host-revoked-on-dispose-or-session-replacement
subscriber-lease-retired
browser-host-smoke
```

## Validation state

```txt
runtime source changed: no
dependencies changed: no
package scripts changed: no
render behavior changed: no
deployment configuration changed: no
branch created: no
pull request created: no

npm test: not run
npm run build: not run
browser smoke: not run
public-host capability fixtures: unavailable / not run
```
