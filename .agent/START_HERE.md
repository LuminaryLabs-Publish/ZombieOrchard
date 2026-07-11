# START HERE — ZombieOrchard

## Last aligned

```txt
2026-07-11T07-51-07-04-00
```

## Summary

`ZombieOrchard` is a dependency-free browser orchard survival/economy shell built from a small kit runtime, 12 interface domains, gameplay domains, canvas/HTML renderers, a Node smoke test and a static Pages build.

This audit documents the fourth architecture gate: composite commands are not transactions. The interface composition domain dispatches child commands through the public engine path, ignores the child result, and allows the child publication to occur before the parent command finishes.

## Plan ledger

**Goal:** preserve the complete repository breakdown while defining one atomic command boundary from interface action through child mutation, route mutation, publication, render correlation and proof.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories are centrally tracked and have root `.agent` state.
- [x] Select only `ZombieOrchard` as the oldest eligible central-ledger entry.
- [x] Re-read boot, runtime, composition, interface, gameplay, renderer, preset, test, build and deploy surfaces.
- [x] Reconfirm the interaction loop, domains, kits and services.
- [x] Trace the Construction -> Storage Shed parent/child command path.
- [x] Identify discarded child results, nested publication and missing rollback/correlation.
- [x] Add timestamped architecture and system audits.
- [x] Refresh the required root `.agent` documents and kit registry.
- [x] Push documentation only to `main`.
- [x] Create no branch or pull request.
- [ ] Runtime implementation and executable transaction fixtures remain future work.

## Selection result

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
TheCavalryOfRome     excluded by rule
```

Only `LuminaryLabs-Publish/ZombieOrchard` is changed by this Publish pass.

## Read this first

```txt
.agent/trackers/2026-07-11T07-51-07-04-00/project-breakdown.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/architecture-audit/2026-07-11T07-51-07-04-00-composite-command-transaction-dsk-map.md
.agent/render-audit/2026-07-11T07-51-07-04-00-command-publication-frame-correlation-gap.md
.agent/gameplay-audit/2026-07-11T07-51-07-04-00-build-resource-command-state-loop.md
.agent/interaction-audit/2026-07-11T07-51-07-04-00-parent-child-command-result-map.md
.agent/command-transaction-audit/2026-07-11T07-51-07-04-00-single-publication-rollback-contract.md
.agent/deploy-audit/2026-07-11T07-51-07-04-00-command-transaction-fixture-gate.md
.agent/turn-ledger/2026-07-11T07-51-07-04-00.md
.agent/kit-registry.json
```

## Actual interaction loop

```txt
module boot
  -> create one engine and all domain closures
  -> create world and HTML renderers
  -> install delegated click listener
  -> expose raw engine and manual tick through GameHost
  -> start recursive RAF

RAF
  -> engine.tick(1 / 60)
  -> tick every domain
  -> aggregate snapshots
  -> render canvas and HTML

screen action click
  -> engine.command(interface-composition, activate)
  -> active screen returns an action descriptor
  -> optional child command is dispatched through engine.command
  -> child command publishes immediately
  -> child result is discarded
  -> optional route transition is evaluated independently
  -> parent command publishes again
```

## Main transaction finding

The current composition path is not atomic:

```txt
parent command identity: absent
transaction identity: absent
child result retention: absent
child rejection propagation: absent
preflight: absent
rollback: absent
single-publication barrier: absent
before/after fingerprints: absent
render acknowledgement: absent
bounded command journal: absent
```

The concrete path is Construction -> Storage Shed:

1. The Construction screen returns an action containing a `construction-runtime.build` child command.
2. `interface-composition` dispatches it with `ctx.engine.command(...)`.
3. The nested engine command notifies subscribers before the parent activation returns.
4. The child result is ignored.
5. The outer command then notifies subscribers again and returns a parent success result that does not describe the build result.

Additional contract weaknesses:

- An unknown build ID falls back to the first catalog item.
- Resource payment returns only a Boolean and has no debit receipt.
- No staged mutation or rollback protects resource debit plus built-object creation.
- A future action containing both `command` and `to` can transition even when its required child command rejects.
- Render snapshots carry no command or transaction provenance.

## Domains in use

```txt
browser route and ESM boot
runtime registration, command, tick, event, snapshot and subscription state
12 scoped interface screen domains
interface composition and automatic Outcome routing
resource ledger
pressure field
orchard world and apple lifecycle
construction runtime
roster runtime
inventory runtime
active-session movement, collection, phase, pests, damage, score and failure
world canvas rendering
HTML interface rendering and delegated input
GameHost diagnostics
Node smoke
static build
Pages deployment
missing session, clock, capability, transaction, replay and persistence authority
```

## Current implementation order

```txt
1. Runtime Session Instance Authority
2. Fixed-Step Clock Authority
3. Interaction Capability Reachability
4. Composite Command Transaction Authority
5. Seeded Random and Replay Authority
6. Versioned Save / Load Authority
```

## Next safe ledge

```txt
ZombieOrchard Runtime Session Instance Authority
+ Start / Reset / Title / Outcome Fidelity Fixture Gate
```

The transaction gate is now fully mapped, but it remains fourth because command identities and stale-command admission must be scoped to an authoritative session and committed simulation clock first.
