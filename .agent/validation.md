# Validation — ZombieOrchard

## Scope

This was a documentation-only audit. Runtime source, dependencies, package scripts, render behavior and deployment configuration were not changed.

## Plan ledger

**Goal:** record the inspected surfaces, source-backed capability findings, documentation changes and missing proof without overstating validation.

- [x] Re-read `src/kits/runtime.js`.
- [x] Re-read `src/kits/scoped-interface-domains.js`.
- [x] Re-read `src/kits/composition.js`.
- [x] Re-read `src/kits/game-domains.js`.
- [x] Re-read `src/presets/orchard-preset.js`.
- [x] Re-read `src/renderer/html-interface-renderer.js`.
- [x] Re-read `package.json`.
- [x] Re-read current root `.agent` state.
- [x] Compare all current Publish repositories against the central ledger.
- [x] Trace movement, collect, clear, phase, build, market, hire, equip and Session Select reachability.
- [x] Confirm missing registry, bindings, disabled-state truth, result projection and fixture proof.
- [x] Update root `.agent` state and add timestamped audits.
- [x] Push only to `main`.
- [x] Create no branch or pull request.
- [ ] Runtime capability implementation remains future work.

## Source-backed findings

```txt
src/kits/runtime.js
  -> commands are routed by domain ID and type without capability admission
  -> every public command publishes
  -> raw domain commands remain callable through exposed engine

src/kits/scoped-interface-domains.js
  -> actions contain static disabled flags
  -> activate resolves by action ID or selected index
  -> select and set-field services exist without shipped bindings
  -> snapshots expose static action descriptors

src/kits/game-domains.js
  -> active-session move exists
  -> collect/clear/next-phase exist
  -> roster hire exists
  -> inventory equip exists and accepts unknown IDs
  -> construction unknown IDs fall back to first catalog entry

src/presets/orchard-preset.js
  -> active-session exposes route actions
  -> Construction exposes Storage Shed
  -> Market, Roster and Inventory expose only route/back shells
  -> Session Select has no incoming route

src/renderer/html-interface-renderer.js
  -> binds only data-action and active-session data-command
  -> hard-codes Collect, Clear and Next Phase
  -> has no movement binding
  -> Roster and Inventory cards are read-only
  -> button helper does not project disabled state or reason
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

The current smoke does not prove that a user can move, deliberately reach an apple, hire, equip, receive a rejected result, see a truthful unsupported state or correlate a capability projection with a rendered frame.

## Required DOM-free capability fixture matrix

```txt
registry completeness
  -> every public capability resolves to one owner command
  -> no duplicate capability IDs
  -> unsupported/dormant/internal states are explicit

binding completeness
  -> every supported public capability has a shipped input binding
  -> move has keyboard and accessible fallback
  -> raw diagnostics do not count as public binding

movement and collection
  -> admitted move changes position
  -> deliberate movement reaches a known apple
  -> collect commits target/resource/score effects
  -> out-of-range collect returns typed rejection

roster and inventory
  -> valid hire commits debit and actor
  -> insufficient funds rejects without mutation
  -> known equip succeeds
  -> unknown equip rejects without mutation

presentation truth
  -> Market is unsupported/disabled
  -> Session Select is dormant
  -> rendered disabled state and reason match registry state

result proof
  -> DOM adapter retains accepted and rejected results
  -> capability, binding, command, session and tick identities correlate
```

## Required browser fixture

```txt
fresh run
  -> move through orchard
  -> collect known apple
  -> observe accepted result and resource update
  -> observe truthful Roster/Inventory controls
  -> observe Market unsupported state
  -> observe Session Select dormant state
  -> first rendered frame acknowledges registry revision and command result
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
central ledger update: pending until central write completes
central internal change log: pending until central write completes
```