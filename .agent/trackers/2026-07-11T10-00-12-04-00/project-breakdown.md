# ZombieOrchard project breakdown

## Timestamp

```txt
2026-07-11T10-00-12-04-00
```

## Plan ledger

**Goal:** reconcile the newest repo-local capability audit with central tracking and define one public capability gateway that owns player-command admission, typed results, diagnostics quarantine and rendered acknowledgement.

- [x] Enumerate all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Compare the nine eligible repositories with `LuminaryLabs-Dev/LuminaryLabs` ledgers.
- [x] Confirm no eligible repository is new, ledger-missing or root-`.agent`-missing.
- [x] Select only `ZombieOrchard` because its capability audit was newer than the central ledger.
- [x] Identify the complete interaction loop.
- [x] Identify all active and missing authority domains.
- [x] Identify all 27 implemented kits.
- [x] Record all kit-provided services.
- [x] Trace DOM, composition, runtime and `GameHost` command paths.
- [x] Define the public/internal/debug boundary.
- [x] Add architecture, render, gameplay, interaction, gateway and deployment audits.
- [x] Refresh root `.agent` navigation, audit, next steps, gaps, validation and registry.
- [x] Push only to `main`.
- [x] Create no branch or pull request.
- [ ] Runtime implementation and executable fixtures remain future work.

## Selection result

```txt
selected: LuminaryLabs-Publish/ZombieOrchard
reason: repo-local capability documentation newer than central ledger
excluded: LuminaryLabs-Publish/TheCavalryOfRome
other Publish repositories changed: none
```

## Interaction loop

```txt
browser boot
  -> create runtime/domain graph
  -> create renderers and delegated input
  -> expose raw engine/manual tick through GameHost
  -> start recursive RAF

player action
  -> direct engine.command
  -> mutation or rejection
  -> publication
  -> caller discards result
  -> later frame renders aggregate state

internal/debug action
  -> raw GameHost command or manual tick
  -> bypass product capability policy
```

## Domains

```txt
browser hosting
kit runtime
12 scoped interface domains
route composition
resources
pressure
orchard and apples
construction
roster
inventory
active-session gameplay
canvas rendering
HTML rendering and input
GameHost diagnostics/debug
smoke/build/Pages
missing session, clock, gateway, transaction, replay and persistence authority
```

## Kits

The implemented inventory contains 27 source-backed kits: runtime; scoped interface plus 12 screen kits; composition; resource, pressure, orchard, construction, roster and inventory services; canvas and HTML renderers; diagnostics; smoke; static build; and Pages deployment.

## Main finding

The product has command implementation but no authoritative public command surface. A capability registry can describe support, but it cannot enforce support while DOM callers dispatch directly, discard results and `GameHost` exposes unrestricted mutation and ticking.

## Next safe ledge

```txt
ZombieOrchard Runtime Session Instance Authority
+ Start / Reset / Title / Outcome Fidelity Fixture Gate
```
