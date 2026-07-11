# Validation — ZombieOrchard

## Scope

This was a documentation-only audit. Runtime source, dependencies, package scripts, render behavior and deployment configuration were not changed.

## Plan ledger

**Goal:** record inspected surfaces, source-backed gateway findings, documentation changes and missing proof without overstating validation.

- [x] Re-read runtime, scoped-interface, composition, gameplay, preset and HTML-renderer findings.
- [x] Re-read package scripts and current root `.agent` state.
- [x] Compare all current Publish repositories against the central ledger.
- [x] Trace browser direct-command, nested composition and `GameHost` bypass paths.
- [x] Reconfirm movement, collect, build, market, hire, equip and Session Select reachability.
- [x] Confirm missing gateway, diagnostics quarantine, result retention and first-frame acknowledgement.
- [x] Update root `.agent` state and add timestamped audits.
- [x] Push only to `main`.
- [x] Synchronize the central ledger and internal change log.
- [x] Create no branch or pull request.
- [ ] Runtime gateway implementation remains future work.

## Source-backed findings

```txt
src/kits/runtime.js
  -> commands route by domain ID/type without product capability admission
  -> every public command publishes
  -> raw domain commands remain callable through exposed engine
  -> manual tick can advance the graph outside the browser RAF path

src/kits/scoped-interface-domains.js
  -> actions use static disabled flags
  -> activate resolves by action ID or selected index
  -> select/set-field services exist without shipped bindings

src/kits/composition.js
  -> parent actions can dispatch nested child commands
  -> child dispatch uses the same public engine path

src/kits/game-domains.js
  -> move, collect, clear, next-phase, hire and equip services exist
  -> equip accepts unknown item IDs
  -> construction unknown IDs fall back to the first item

src/presets/orchard-preset.js
  -> active-session exposes route actions
  -> Construction exposes Storage Shed
  -> Market, Roster and Inventory expose route/read-only shells
  -> Session Select has no incoming route

src/renderer/html-interface-renderer.js
  -> binds data-action and selected active-session data-command controls
  -> hard-codes Collect, Clear and Next Phase
  -> has no movement binding
  -> Roster and Inventory cards are read-only
  -> button helper does not project disabled state or reason
  -> DOM command results are discarded

src/start.js / GameHost projection
  -> exposes raw engine and unrestricted manual tick
  -> exposes mutation authority rather than detached observations
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

The current smoke does not prove that a public action entered through an admitted gateway, that internal/debug access was quarantined, that a result was retained, or that a rendered frame acknowledged it.

## Required DOM-free gateway fixture matrix

```txt
registry and ownership
  -> every public capability resolves to one owner command
  -> no duplicate capability IDs
  -> unsupported/dormant/internal/debug states are explicit

public gateway
  -> browser callers cannot invoke public engine.command directly
  -> lifecycle, route, binding and target admission are evaluated
  -> accepted and rejected results carry session/tick identity
  -> result remains pending until a frame acknowledgement

internal/debug quarantine
  -> default GameHost exposes detached observations only
  -> debug command requires an explicit lease
  -> manual tick requires debug mode and clock exclusion
  -> stale lease rejects after reset or disposal

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
  -> rendered disabled state and reason match gateway state
```

## Required browser fixture

```txt
fresh run
  -> inspect GameHost and confirm no raw mutation surface
  -> move through orchard through the public gateway
  -> collect a known apple
  -> observe typed accepted result and resource update
  -> observe truthful Roster/Inventory/Market/Session Select states
  -> verify one rendered frame acknowledges registry revision and result
  -> reset and confirm prior debug lease/result cannot affect the new session
```

## Attempted validation

No executable validation was run because this pass changed documentation only and the required gateway fixtures do not exist yet.

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
capability gateway fixture: unavailable / not run
diagnostics quarantine fixture: unavailable / not run
movement/reachability fixture: unavailable / not run
affordance truth fixture: unavailable / not run
render acknowledgement fixture: unavailable / not run

repo-local docs pushed to main: yes
central ledger update: complete
central internal change log: complete
```