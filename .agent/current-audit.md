# Current audit — ZombieOrchard

## Status

```txt
last aligned: 2026-07-11T01-31-15-04-00
status: session-first-clock-second-capability-third-command-transaction-fourth-seeded-replay-fifth
runtime source changed: no
branch: main
root .agent state: refreshed
central ledger sync: pending until central write completes
```

## Selection audit

All ten accessible `LuminaryLabs-Publish` repositories were compared. All nine eligible non-Cavalry repositories had central ledger and root `.agent` state, so the oldest documented-selection rule applied.

```txt
ZombieOrchard        selected / 2026-07-10T23-50-53-04-00
TheUnmappedHouse     tracked  / 2026-07-11T00-00-26-04-00
MyCozyIsland         tracked  / 2026-07-11T00-10-28-04-00
AetherVale           tracked  / 2026-07-11T00-18-24-04-00
IntoTheMeadow        tracked  / 2026-07-11T00-30-48-04-00
PrehistoricRush      tracked  / 2026-07-11T00-39-25-04-00
TheOpenAbove         tracked  / 2026-07-11T00-49-45-04-00
HorrorCorridor       tracked  / 2026-07-11T01-10-28-04-00
PhantomCommand       tracked  / 2026-07-11T01-20-51-04-00
TheCavalryOfRome     excluded by rule
```

`ZombieOrchard` was the only product repository changed.

## Interaction loop

```txt
index.html
  -> src/boot.js
  -> src/start.js
  -> createOrchardGame()
  -> createKitRuntime(...kits)
  -> construct gameplay and interface domains
  -> attach delegated click listener
  -> requestAnimationFrame(draw)
  -> engine.tick(1 / 60)
  -> tick all domains
  -> aggregate snapshot
  -> world and HTML render
  -> request next frame

DOM data-action
  -> engine.command(interface-composition, activate)
  -> interface-composition calls active screen activate directly
  -> active screen resolves action
  -> optional ctx.engine.command(child domain, child type)
  -> child command mutates and notifies subscribers
  -> child result is discarded
  -> optional route transition
  -> parent command returns
  -> outer engine.command notifies subscribers again

DOM data-command
  -> engine.command(active-session, collect | clear | next-phase)
  -> synchronous mutation
  -> one outer notification
```

## Domains in use

```txt
static browser document and module entry
browser runtime host and RAF ownership
game factory and preset composition
kit registry and domain construction
command routing and nested dispatch
ephemeral events, ticking, snapshots and subscriptions
12 scoped interface domains
interface composition and route projection
resource ledger and pressure field
orchard world and apple lifecycle
construction, roster and inventory runtimes
active-session player, movement, collection, pest, phase, score and failure
ambient global randomness
world canvas rendering
HTML interface rendering
GameHost diagnostics
Node smoke fixture
static build copy
Pages deployment
```

## Implemented kits and services

- `kit-runtime`: kit registration, domain creation, command lookup/invocation, delta clamping, ticking, events, aggregate snapshots, subscriptions, and notification.
- `scoped-interface-domain-kit` plus 12 screen kits: screen state, action catalogs, selection, field mutation, disabled-action rejection, activation, and snapshots.
- `interface-composition-kit`: active/previous route state, transition, back navigation, child dispatch, and automatic Outcome routing.
- `resource-ledger-kit`: affordability, boolean payment, addition, and aggregate resource snapshots.
- `pressure-field-kit`: bounded adjustment and passive growth.
- `orchard-world-kit`: fixed tree generation, random apple generation/replenishment, collection, and world snapshots.
- `construction-runtime-kit`: catalog lookup, payment, build creation, and message state.
- `roster-runtime-kit`: actor/role state, payment, actor creation, and message state.
- `inventory-runtime-kit`: item state and equipment assignment.
- `active-session-domain-kit`: movement, collection, clearing, phase changes, pest spawning, pursuit, damage, score, and failure.
- `world-canvas-render-kit` and `html-interface-render-kit`: canvas/HUD/screen projection and delegated browser input.
- `game-host-diagnostics-kit`: raw engine access, snapshot readback, and manual ticking.
- `smoke-fixture-kit`, `static-build-copy-kit`, and `pages-deploy-kit`: minimal proof, artifact copy, and deployment.

## Composite command finding

`interface-composition.activate` invokes child commands through the public `ctx.engine.command()` path. This has three consequences:

1. The child command can publish to subscribers before the parent resolves route state.
2. The child result is not retained or returned by the parent.
3. The outer command publishes again after parent completion.

For `Storage Shed`, a missing-resource rejection from `construction-runtime` is discarded, while the parent can return `{ accepted: true }`. The user-facing path has no typed child result, resource effect, command sequence, transaction ID, commit barrier, rollback result, or durable journal.

The command contract also permits an action with both `command` and `to`. A child mutation can therefore occur before a later route failure, with no atomicity proof.

## Related service correctness gaps

```txt
resource payment returns boolean only
unknown construction IDs fall back to the first catalog item
inventory equip accepts arbitrary IDs
nested results have no parent correlation
subscriber notifications have no transaction identity
events are cleared each tick
renderers expose no committed command ID
GameHost exposes no bounded command journal
```

## Candidate DSK map

```txt
command-envelope-kit
command-sequence-kit
composite-command-transaction-kit
child-command-result-kit
command-result-envelope-kit
command-publication-barrier-kit
command-rollback-kit
resource-transaction-result-kit
command-journal-kit
render-command-correlation-kit
command-transaction-fixture-kit
```

## Ordered safe ledges

```txt
1. ZombieOrchard Runtime Session Instance Authority
   + Start/Reset/Title/Outcome Fidelity Fixture Gate

2. ZombieOrchard Fixed-Step Clock Authority
   + Pause/30-60-120 Hz Parity Fixture Gate

3. ZombieOrchard Interaction Capability Reachability
   + Movement/Service-Binding Fixture Gate

4. ZombieOrchard Composite Command Transaction Authority
   + Parent/Child Result and Single-Publication Fixture Gate

5. ZombieOrchard Seeded Random and Replay Authority
   + Apple/Pest Determinism Fixture Gate
```

## What not to do next

Do not start with Market implementation, economy balancing, new orchard content, renderer replacement, visual polish, or broad service expansion. Establish lifecycle, clock, capability, and command transaction authority first.
