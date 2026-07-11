# Project breakdown — ZombieOrchard

Timestamp: `2026-07-10T22-11-24-04-00`

## Goal

Document the current product loop, domains, kits, and kit services, then isolate the smallest safe architecture gate required to make Play, New Game, Pause, Title, and Outcome correspond to real runtime-session transactions.

## Completion checklist

- [x] Compared the full ten-repository Publish inventory.
- [x] Excluded `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirmed central ledger coverage for all nine eligible repositories.
- [x] Confirmed root `.agent` coverage for all nine eligible repositories.
- [x] Selected only `LuminaryLabs-Publish/ZombieOrchard` by oldest eligible fallback.
- [x] Read the active host, game factory, runtime, domain kits, composition, preset, renderers, package scripts, and smoke fixture.
- [x] Identified the complete interaction loop.
- [x] Identified all active domains.
- [x] Identified all implemented kits.
- [x] Identified the services each kit offers.
- [x] Traced session-control behavior through source.
- [x] Added architecture, render, gameplay, interaction, session-authority, and deploy audits.
- [x] Refreshed the required root `.agent` documents.
- [x] Changed no runtime source.
- [x] Created no branch or pull request.

## Repository selection

```txt
ZombieOrchard        selected / 2026-07-10T20-30-23-04-00
TheUnmappedHouse     tracked  / 2026-07-10T20-38-24-04-00
MyCozyIsland         tracked  / 2026-07-10T20-48-55-04-00
PrehistoricRush      tracked  / 2026-07-10T21-00-16-04-00
AetherVale           tracked  / 2026-07-10T21-08-52-04-00
IntoTheMeadow        tracked  / 2026-07-10T21-19-36-04-00
TheOpenAbove         tracked  / 2026-07-10T21-31-01-04-00
HorrorCorridor       tracked  / 2026-07-10T21-39-22-04-00
PhantomCommand       tracked  / 2026-07-10T21-49-26-04-00
TheCavalryOfRome     excluded
```

## Interaction loop

```txt
boot
  -> construct one engine and every mutable domain
  -> attach click listener
  -> start uncancelled RAF
  -> fixed engine tick
  -> pressure and gameplay tick regardless of screen
  -> snapshot
  -> canvas render
  -> HTML replacement

user control
  -> interface action or active-session command
  -> synchronous mutation or screen transition
  -> next automatic frame renders current aggregate state
```

## Active domain groups

```txt
host and bootstrap
runtime and command routing
interface screen state
interface composition
resource and pressure simulation
orchard world generation and collection
construction, roster, and inventory services
active-session gameplay
canvas and HTML rendering
diagnostics
smoke, build, and Pages deployment
```

## Implemented kit inventory

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

## Main finding

The product has interface navigation but no runtime-session instance authority. Every route shares the same preconstructed mutable domain graph. Play does not start a run, New Game does not reset one, Pause does not pause one, Title does not retire one, and Outcome does not clear ended state.

## Next safe ledge

```txt
ZombieOrchard Runtime Session Instance Authority
+ Start/Reset/Title/Outcome Fidelity Fixture Gate
```

## Validation state

Documentation only. Runtime, dependencies, scripts, rendering, deployment, and fixtures were not changed or executed.