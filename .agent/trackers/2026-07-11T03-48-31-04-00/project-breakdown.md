# Project breakdown — ZombieOrchard

## Timestamp

```txt
2026-07-11T03-48-31-04-00
```

## Plan ledger

**Goal:** Compare the current Publish inventory, select one eligible repository, and document the unowned versioned save/load boundary without changing runtime behavior.

- [x] Compare all 10 accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories are centrally tracked and have root `.agent` state.
- [x] Select only `ZombieOrchard`, the oldest eligible central-ledger entry.
- [x] Inspect runtime, composition, interface, gameplay, render, preset, test, build, and deploy files.
- [x] Identify the interaction loop.
- [x] Identify all domains in use.
- [x] Identify all implemented kits.
- [x] Identify services offered by the kits.
- [x] Audit the dormant Session Select and absent save/load system.
- [x] Add architecture, render, gameplay, interaction, persistence, and deploy audits.
- [x] Refresh root `.agent` state.
- [x] Use `main` only.
- [x] Create no branch or pull request.

## Selection

```txt
ZombieOrchard        selected / 2026-07-11T01-31-15-04-00
TheUnmappedHouse     tracked  / 2026-07-11T01-38-28-04-00
MyCozyIsland         tracked  / 2026-07-11T02-02-59-04-00
AetherVale           tracked  / 2026-07-11T02-10-13-04-00
IntoTheMeadow        tracked  / 2026-07-11T02-28-12-04-00
PrehistoricRush      tracked  / 2026-07-11T02-48-17-04-00
TheOpenAbove         tracked  / 2026-07-11T03-01-38-04-00
HorrorCorridor       tracked  / 2026-07-11T03-18-44-04-00
PhantomCommand       tracked  / 2026-07-11T03-31-26-04-00
TheCavalryOfRome     excluded by rule
```

## Interaction loop

```txt
boot -> construct engine graph -> attach click listener -> RAF fixed tick
     -> aggregate snapshots -> canvas and HTML render

UI action -> command -> mutation -> notification -> render

Session Select -> domain exists -> optional slot cards in renderer
               -> no route, slots, save/load owner, or persistence adapter
```

## Domains in use

```txt
browser host and route
game factory and preset composition
kit runtime and command routing
12 interface screen domains
route composition
resources and pressure
orchard world and apples
construction, roster, inventory
active-session simulation
randomness
canvas and HTML render
diagnostics
tests, build, Pages deploy
dormant session-select projection
missing persistence and migration authority
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

## Main finding

The Save Select surface is representational only. No authoritative state export, versioned envelope, slot index, adapter, migration, restore service, atomic load transaction, load epoch, or proof journal exists.

## Ordered implementation queue

```txt
session -> clock -> capability -> command transaction -> replay -> save/load
```

## Validation

Documentation only. No runtime, dependency, script, renderer, or deploy behavior changed.
