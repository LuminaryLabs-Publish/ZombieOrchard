# START HERE: ZombieOrchard

## Last aligned

```txt
2026-07-11T09-49-27-04-00
```

## Summary

`ZombieOrchard` is a dependency-free static orchard survival and economy shell with a small kit runtime, 12 interface screens, gameplay services, canvas and HTML rendering, diagnostics, smoke proof, static build and Pages deployment. The current focused finding is that implemented domain commands, visible routes and browser controls are not joined by one capability authority, so movement, hiring and equipment are unreachable while Market is presented without a service.

## Plan ledger

**Goal:** keep one entry point to the interaction loop, complete domain and kit inventory, capability reachability findings, dependency order and proof gaps.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories are centrally tracked and have root `.agent` state.
- [x] Select only `ZombieOrchard` as the oldest eligible central-ledger entry.
- [x] Identify the interaction loop.
- [x] Identify all active domains.
- [x] Identify all implemented kits and services.
- [x] Classify supported, unreachable, dormant, unsupported and internal capabilities.
- [x] Trace browser bindings and discarded results.
- [x] Define the capability registry, admission, binding, projection and fixture contract.
- [x] Add a new timestamped tracker and audit set.
- [x] Change no runtime source.
- [x] Push only to `main`.
- [x] Create no branch or pull request.
- [ ] Implement session, clock and capability authority with executable fixtures.

## Read this first

```txt
.agent/trackers/2026-07-11T09-49-27-04-00/project-breakdown.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/architecture-audit/2026-07-11T09-49-27-04-00-capability-reachability-authority-dsk-map.md
.agent/render-audit/2026-07-11T09-49-27-04-00-capability-affordance-truth-gap.md
.agent/gameplay-audit/2026-07-11T09-49-27-04-00-movement-collect-hire-equip-loop.md
.agent/interaction-audit/2026-07-11T09-49-27-04-00-capability-binding-result-map.md
.agent/capability-reachability-audit/2026-07-11T09-49-27-04-00-registry-binding-projection-contract.md
.agent/deploy-audit/2026-07-11T09-49-27-04-00-capability-reachability-fixture-gate.md
.agent/turn-ledger/2026-07-11T09-49-27-04-00.md
.agent/kit-registry.json
```

## Product interaction loop

```txt
browser boot
  -> construct engine and all domain closures
  -> construct canvas and HTML renderers
  -> install delegated click input
  -> expose raw engine and manual tick through GameHost
  -> begin recursive RAF

RAF
  -> engine.tick(1 / 60)
  -> tick every domain
  -> aggregate snapshots
  -> render canvas and replace interface HTML

browser action
  -> data-action or data-command binding
  -> public engine.command
  -> mutation or rejection
  -> subscriber publication
  -> next rendered snapshot
```

## Capability status

```txt
supported/public:
  route actions
  collect, clear, next-phase
  Storage Shed action

implemented but unreachable:
  move
  hire
  equip

visible but unsupported:
  Market transaction

dormant:
  Session Select

internal but bypassable through raw GameHost:
  resource ledger API
  pressure API
  unrestricted domain commands and manual tick
```

## Main finding

```txt
implemented service
  != declared public capability
  != shipped input binding
  != reachable target
  != truthful enabled affordance
  != retained command result
  != first-frame proof
```

Concrete mismatches:

1. `active-session.move` exists but has no shipped input binding.
2. Collect is visible but the player cannot deliberately move to an apple.
3. Hire and Equip exist but Roster and Inventory are read-only.
4. Equip accepts unknown item IDs.
5. Market is visible without an exchange runtime service.
6. Session Select has no incoming route or slot owner.
7. Static disabled flags are not derived from runtime capability state and are not projected by the button renderer.
8. DOM callers discard command results.
9. Raw engine access bypasses any product capability policy.

## Ordered implementation queue

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

Do not add more interface routes or content before session ownership, fixed-step timing and truthful capability admission are fixture-backed.