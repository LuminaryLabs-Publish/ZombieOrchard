# Project breakdown — ZombieOrchard

## Run

```txt
2026-07-11T07-51-07-04-00
```

## Plan ledger

**Goal:** define the composite command transaction boundary required to make interface actions, child domain work, resource effects, route effects, publication and rendered proof one atomic result.

- [x] Compare the full ten-repository Publish inventory with the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have root `.agent` state.
- [x] Select only `ZombieOrchard` as the oldest eligible entry.
- [x] Identify the interaction loop.
- [x] Identify all active domains.
- [x] Identify every implemented kit and offered service.
- [x] Trace the current Storage Shed composite action.
- [x] Document parent/child result loss and nested publication.
- [x] Document target, resource, rollback and render-proof gaps.
- [x] Add architecture, render, gameplay, interaction, transaction and deploy audits.
- [x] Refresh required root `.agent` files and kit registry.
- [x] Change no runtime source.
- [x] Create no branch or pull request.
- [ ] Runtime implementation and executable fixtures remain future work.

## Selection

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
TheCavalryOfRome     excluded
```

## Interaction loop

```txt
boot
  -> construct runtime graph and renderers
  -> install DOM input
  -> expose GameHost
  -> start RAF

RAF
  -> fixed 1/60 engine tick
  -> all-domain mutation
  -> aggregate snapshot
  -> world and interface render

screen action
  -> outer interface-composition command
  -> active-screen action resolution
  -> optional nested public child command
  -> child publication
  -> discarded child result
  -> optional route transition
  -> parent publication
```

## Domains in use

```txt
browser host
kit runtime
12 interface screens
interface composition
resource ledger
pressure field
orchard world
construction
roster
inventory
active session
canvas render
HTML render and input
GameHost diagnostics
smoke/build/deploy
```

Missing authority domains are runtime session, fixed-step clock, capability registry, composite transaction, seeded random/replay and versioned persistence.

## Implemented kit/service summary

- Runtime: registration, creation, command dispatch, ticking, events, snapshots, subscriptions and publication.
- Interface: action catalogs, selection, fields, activation, transitions, nested dispatch and Outcome routing.
- Gameplay: resources, pressure, orchard/apple lifecycle, construction, roster, inventory, movement, collection, pests, damage, score and failure.
- Presentation: canvas world, HTML HUD/screens/slots and delegated input.
- Operations: raw GameHost diagnostics, Node smoke, static build and Pages deploy.

## Main finding

The Storage Shed action is already composite, but no transaction exists around it.

```txt
outer activate command
  -> child build command
  -> child mutation/publication
  -> child result discarded
  -> outer success/publication
```

This means callers cannot know whether the build succeeded, subscribers can observe intermediate state, and future command-plus-route actions can route even when a required child rejects. Unknown build IDs also fall back to the first item, payment is Boolean-only, and no rollback or render correlation exists.

## Correct boundary

```txt
admit one command envelope
  -> create transaction
  -> preflight parent, child, target, resources and route
  -> stage mutations
  -> execute child through internal non-publishing dispatch
  -> commit all effects or roll back all effects
  -> return one parent result containing child results
  -> publish once
  -> correlate first rendered frame
```

## Next safe ledge

```txt
ZombieOrchard Runtime Session Instance Authority
+ Start / Reset / Title / Outcome Fidelity Fixture Gate
```

Composite transaction authority remains Gate 4 and should consume the session, epoch, tick and capability identities created by Gates 1–3.

## Validation scope

```txt
runtime source changed: no
dependencies/scripts/deploy changed: no
branch or PR created: no
npm test/build/browser smoke: not run
transaction fixtures: unavailable
```
