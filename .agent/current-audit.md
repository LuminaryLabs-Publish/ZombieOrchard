# Current audit: ZombieOrchard

**Timestamp:** `2026-07-12T18-48-07-04-00`  
**Status:** `terminal-outcome-seal-authority-audited`  
**Branch:** `main`

## Summary

ZombieOrchard has no authoritative terminal outcome transaction. `active-session.tick()` returns early after `state.ended`, but its command handler does not check the terminal flag. Movement, collection, pest clearing and phase changes therefore remain callable after failure.

`interface-composition.tick()` independently routes to Outcome when it observes `ended`. The browser also exposes the raw engine through `window.GameHost`. The Outcome renderer reads `active-session.score` and `active-session.day` on every render, so direct post-terminal commands can change the supposedly final result.

## Plan ledger

**Goal:** define a single terminal commit that freezes mutable gameplay, revokes commands, publishes an immutable result and correlates the first Outcome frame with that result.

- [x] Compare the complete Publish inventory against central tracking.
- [x] Verify eligible central-ledger and root `.agent` coverage.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `ZombieOrchard` under the oldest eligible fallback rule.
- [x] Read boot, runtime, composition, gameplay domains, preset, HTML renderer, canvas renderer and smoke proof.
- [x] Identify the complete interaction loop, all domains, all 27 implemented kit surfaces and their services.
- [x] Confirm failure is committed inside active-session tick.
- [x] Confirm only tick is suspended after failure.
- [x] Confirm post-terminal commands still mutate live state.
- [x] Confirm Outcome reads mutable live score and day.
- [x] Define terminal identity, sealing, revocation, immutable result and first-frame contracts.
- [ ] Implement and execute terminal-outcome fixtures.

## Selection audit

```txt
ZombieOrchard      2026-07-12T16-51-47-04-00 selected
MyCozyIsland       2026-07-12T17-10-31-04-00
TheUnmappedHouse   2026-07-12T17-20-42-04-00
AetherVale         2026-07-12T17-35-48-04-00
TheOpenAbove       2026-07-12T17-41-25-04-00
IntoTheMeadow      2026-07-12T17-58-43-04-00
PhantomCommand     2026-07-12T18-11-53-04-00
PrehistoricRush    2026-07-12T18-18-59-04-00
HorrorCorridor     2026-07-12T18-38-51-04-00
TheCavalryOfRome   excluded
```

No new, ledger-missing or root-`.agent`-missing eligible repository was found.

## Complete interaction loop

```txt
browser module boot
  -> createOrchardGame()
  -> install 19 engine kits once
  -> create canvas and HTML renderers
  -> expose raw engine through window.GameHost
  -> start recursive RAF

survival simulation
  -> active-session.tick()
  -> night may spawn pests
  -> pests move toward player
  -> every contacting pest subtracts condition
  -> condition <= 0 clamps condition to zero
  -> ended=true and failure message are committed

route projection
  -> interface-composition.tick() reads active-session snapshot
  -> ended=true moves route to outcome
  -> HTML Outcome reads live score and day

post-terminal mutation
  -> raw engine or another caller commands active-session directly
  -> command handler has no ended guard
  -> move, collect, clear and next-phase may accept
  -> world, economy, score, player, day or phase may mutate
  -> next HTML frame projects a different final summary
```

## Source-backed findings

### Tick suspension is not terminal sealing

`src/kits/game-domains.js` begins the active-session tick with:

```js
if (state.ended) return;
```

This stops future pest simulation, but it does not change the command surface or freeze participant domains.

### Commands remain active after failure

The active-session command handler checks command type directly. It has no terminal-phase admission before:

```txt
move
collect
clear
next-phase
```

Consequences include:

- `move` can change the final player position.
- `collect` can remove and replenish an apple, grant apples and money, adjust pressure, increase score and replace the terminal message.
- `clear` can damage or remove a pest, grant scrap, increase score and replace the terminal message.
- `next-phase` can change phase and increment the final day.

### Outcome routing and terminal commit are separate

`src/kits/composition.js` observes the active-session snapshot during its own tick and calls `move("outcome")`. Failure state and route state are not one atomic commit and carry no shared result ID or revision.

### Public callers bypass the visible route

`src/start.js` publishes the raw engine as `window.GameHost.engine`. A caller can command `active-session` while the visible route is Outcome.

### Final projection is live, not sealed

`src/renderer/html-interface-renderer.js` constructs the Outcome cards from current `session.score` and `session.day` on every render. No immutable `TerminalOutcomeResult` is projected.

### Proof is absent

`tests/smoke.mjs` validates only Entry, Play and apple population. It does not force failure, assert Outcome routing, issue post-terminal commands or compare a terminal result with the visible frame.

## Domains in use

```txt
browser document, canvas, DOM, RAF and public GameHost
runtime registration, commands, ticks, events, snapshots, subscriptions and publication
11 generic scoped interface domains plus custom active-session
interface composition, nested command dispatch, routing and automatic Outcome routing
runtime session, run generation, route and terminal revision admission
resource ledger and pressure field
orchard world, collection and refill
construction, roster and inventory
movement, phase, pests, contact damage, score, failure and terminal outcome
canvas world and HTML interface projection
Node smoke, static build, Pages deployment and central tracking
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

## Offered services

| Kit group | Services |
|---|---|
| runtime | Registration, live domain creation, commands, delta clamp, ticks, events, snapshots, subscriptions and synchronous publication |
| interface | Screen state, fields, selection, action descriptors, activation, routing, back navigation, nested dispatch and automatic Outcome routing |
| gameplay | Resources, pressure, orchard collection/refill, construction, hiring, equipment, movement, phases, pests, contact damage, score and failure |
| render | Canvas world drawing, HTML route/HUD projection, Outcome cards and delegated actions |
| diagnostics/proof/deploy | Raw engine publication, state readback, manual tick, Node smoke, static copy and Pages deployment |

## Required composed domain

```txt
zombie-orchard-terminal-outcome-seal-authority-domain
```

## Required transaction

```txt
TerminalOutcomeCandidate
  -> bind runtime session, run generation and expected gameplay revision
  -> bind terminal cause, predicate evidence and participant revisions
  -> freeze score, day, phase, player, resources, pressure, world and roster summaries
  -> validate exactly one terminal transition
  -> atomically commit TerminalOutcomeResult and terminal phase
  -> revoke gameplay, economy and simulation capabilities
  -> reject stale and duplicate terminal commits
  -> route Outcome from the committed result
  -> project immutable result data
  -> acknowledge first canvas/HTML frame citing terminal result revision
```

## Candidate kits

```txt
terminal-outcome-id-kit
terminal-cause-kit
terminal-predicate-evidence-kit
terminal-outcome-candidate-kit
terminal-outcome-admission-kit
terminal-outcome-result-kit
terminal-outcome-revision-kit
terminal-state-seal-kit
terminal-participant-freeze-kit
terminal-command-revocation-kit
terminal-capability-lease-kit
post-terminal-rejection-kit
terminal-route-commit-kit
terminal-outcome-read-model-kit
terminal-outcome-projection-kit
terminal-outcome-observation-kit
terminal-outcome-journal-kit
first-terminal-frame-ack-kit
failure-threshold-fixture-kit
post-terminal-command-fixture-kit
terminal-route-atomicity-fixture-kit
terminal-summary-immutability-fixture-kit
terminal-source-dist-pages-parity-fixture-kit
```

## Runtime non-claims

No runtime source, terminal behavior, gameplay, rendering, package scripts or deployment configuration changed. No immutable terminal result, post-terminal command revocation, atomic Outcome route commit, idempotency or visible terminal-frame claim is made.
