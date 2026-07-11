# Validation — ZombieOrchard

## Scope

This was a documentation-only audit. Runtime source, dependencies, package scripts, render behavior and deployment configuration were not changed.

## Plan ledger

**Goal:** record inspected surfaces, source-backed capability findings, documentation changes and missing proof without overstating validation.

- [x] Re-read runtime, scoped-interface, composition, gameplay, preset and HTML-renderer source.
- [x] Re-read package scripts and current root `.agent` state.
- [x] Compare all current Publish repositories against the central ledger.
- [x] Trace movement, collect, clear, phase, build, market, hire, equip and Session Select reachability.
- [x] Confirm missing registry, bindings, disabled-state truth, result projection and fixture proof.
- [x] Update required root `.agent` files and add timestamped audits.
- [x] Push only to `main`.
- [x] Create no branch or pull request.
- [x] Synchronize the central ledger and internal change log on `main`.
- [ ] Runtime capability implementation remains future work.

## Source-backed findings

```txt
src/kits/runtime.js
  -> commands route by domain ID and type without capability admission
  -> every public command publishes
  -> exposed raw engine can invoke domain commands directly

src/kits/scoped-interface-domains.js
  -> actions contain static disabled flags
  -> select and set-field services exist without shipped bindings
  -> activation state is not derived from runtime capability state

src/kits/game-domains.js
  -> move, collect, clear and next-phase exist
  -> roster hire exists
  -> inventory equip exists and accepts unknown IDs
  -> unknown construction IDs fall back to the first catalog item

src/presets/orchard-preset.js
  -> Construction exposes Storage Shed
  -> Market, Roster and Inventory expose route/back shells
  -> Session Select has no incoming route

src/renderer/html-interface-renderer.js
  -> binds only data-action and active-session data-command
  -> hard-codes Collect, Clear and Next Phase
  -> has no movement, hire or equip binding
  -> button markup does not project disabled state or reason
  -> DOM command results are discarded
```

## Current proof surface

```txt
npm test
  -> create one engine
  -> verify Entry
  -> activate Play
  -> tick once
  -> verify Active Session
  -> verify at least one apple
```

The current smoke does not prove that a user can move, deliberately reach an apple, hire, equip, receive rejected-command feedback, see truthful unsupported state or correlate capability projection with a rendered frame.

## Required capability fixture matrix

```txt
registry completeness
  -> each public capability resolves to one owner command
  -> no duplicate capability IDs
  -> unsupported, dormant and internal states are explicit

binding completeness
  -> each supported public capability has a shipped binding
  -> move has keyboard and accessible fallback
  -> diagnostics do not count as product binding

movement and collection
  -> admitted movement changes position
  -> deliberate movement reaches a known apple
  -> collect commits target/resource/score effects
  -> out-of-range collect returns a typed visible rejection

roster and inventory
  -> valid hire commits debit and actor
  -> insufficient funds rejects without mutation
  -> known equip succeeds
  -> unknown equip rejects without mutation

presentation truth
  -> Market is unsupported and disabled
  -> Session Select is dormant
  -> rendered disabled state and reason match registry state

result and render proof
  -> DOM adapter retains accepted and rejected results
  -> capability, binding, command, session and tick identities correlate
  -> first frame acknowledges the consumed registry revision and result
```

## Attempted validation

A local clone/test attempt could not run because the execution container could not resolve `github.com`. This was an environment/network failure, not a repository test failure.

## Validation result

```txt
runtime source changed: no
dependencies changed: no
package scripts changed: no
deploy configuration changed: no
branch created: no
pull request created: no

npm test: not run
npm run build: not run
browser smoke: not run
capability registry fixture: unavailable / not run
movement/reachability fixture: unavailable / not run
hire/equip fixture: unavailable / not run
affordance truth fixture: unavailable / not run
render-correlation fixture: unavailable / not run

repo-local docs pushed to main: yes
central ledger updated on main: yes
central internal change log added on main: yes
```