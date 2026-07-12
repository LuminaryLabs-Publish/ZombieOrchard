# Validation — ZombieOrchard

## Scope

Documentation-only audit of the browser-global public capability surface. Runtime source, dependencies, package scripts, rendering and deployment configuration were not changed.

## Plan ledger

**Goal:** record the exact raw-engine reachability gap and the proof required before the public host is treated as bounded, revocable, clock-safe or frame-coherent.

- [x] Read browser boot and `window.GameHost` construction.
- [x] Read runtime engine/context/domain exposure.
- [x] Read domain APIs, commands and ticks reachable through the graph.
- [x] Read HTML delegated command bindings.
- [x] Read smoke and build scripts.
- [x] Confirm no capability manifest, lease, allowlist, schema, writer lock or revocation exists.
- [x] Confirm duplicate domain registration overwrites the previous entry.
- [x] Add timestamped architecture and system audits.
- [x] Push documentation only to `main` without a branch or pull request.
- [x] Synchronize the central ledger and internal change log.
- [ ] Implement and run public-host fixtures.

## Source-backed findings

```txt
src/start.js
  -> publishes window.GameHost.engine
  -> publishes getState()
  -> publishes unrestricted tick(dt)
  -> starts the production RAF

src/kits/runtime.js
  -> engine exposes ctx and domains
  -> engine exposes addKit, command, tick, snapshot and subscribe
  -> ctx exposes mutable frame, elapsed, delta, events and domain table
  -> addKit overwrites domains[domain.id]

src/kits/game-domains.js
  -> resource, pressure and orchard domains expose direct api functions
  -> domains expose command and/or tick functions

src/renderer/html-interface-renderer.js
  -> UI delegates to raw engine.command()
  -> no typed capability envelope or frame acknowledgement

tests/smoke.mjs
  -> validates Entry, Play transition and apples
  -> does not instantiate the browser host
  -> does not inspect reachability, leases, revocation or frame receipts
```

## Required DOM-free fixtures

```txt
contract-shape
  -> approved host members only

raw-engine-unreachable
  -> no engine, ctx, domains, addKit or raw tick

duplicate-domain-guard
  -> duplicate ID rejected and predecessor retained

command-admission
  -> unknown command, invalid payload and stale generation/session rejected

single-writer-step
  -> manual public step rejected while RAF owns writer
  -> fixture step admitted only after writer transfer

clone-safe-observation
  -> returned object mutation cannot affect runtime

subscription-lease
  -> lease can unsubscribe and is force-retired on revocation

host-revocation
  -> predecessor generation cannot command successor session

frame-receipt
  -> observation cites state, route, tick, canvas and HTML frame revisions
```

## Required browser fixtures

```txt
window.GameHost exposes approved members only
UI controls still execute allowlisted commands
DOM attributes carry no capability token
manual public tick cannot accelerate production gameplay
observer output is clone-safe
observer output matches the visible canvas and HTML frame
host revokes on teardown or session replacement
one RAF chain and one delegated listener remain
```

## Validation result

```txt
runtime source changed: no
dependencies changed: no
package scripts changed: no
render behavior changed: no
deploy configuration changed: no
branch created: no
pull request created: no

npm test: not run
npm run build: not run
browser smoke: not run
contract-shape fixture: unavailable / not run
raw-engine reachability fixture: unavailable / not run
duplicate-domain fixture: unavailable / not run
capability admission fixture: unavailable / not run
single-writer step fixture: unavailable / not run
host revocation fixture: unavailable / not run
frame-receipt fixture: unavailable / not run

repo-local docs pushed to main: yes
central ledger update: complete
central internal change log: complete
```

No read-only-host, capability-admission, revocation, single-writer stepping or frame-coherence claim is made.
