# START HERE: ZombieOrchard

## Last aligned

```txt
2026-07-11T10-00-12-04-00
```

## Summary

`ZombieOrchard` is a dependency-free static orchard survival and economy shell built from a small kit runtime, 12 interface screens, gameplay services, canvas and HTML projection, diagnostics, smoke proof, a static build and Pages deployment. The current focused finding is that no single public capability gateway separates admitted player actions from internal/debug control: browser callers discard command results while `GameHost` exposes the raw engine and unrestricted manual ticking.

## Plan ledger

**Goal:** preserve the complete interaction, domain, kit and service inventory while defining one public capability gateway that owns admission, result retention, diagnostics quarantine and first-frame acknowledgement.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have a central ledger and root `.agent` state.
- [x] Select only `ZombieOrchard` because its repo-local capability audit was newer than the central ledger.
- [x] Identify the interaction loop.
- [x] Identify all active domains.
- [x] Identify all implemented kits and services.
- [x] Trace browser, composition, runtime and `GameHost` command paths.
- [x] Separate public, internal, dormant, unsupported and debug-only capabilities.
- [x] Define the public capability gateway and diagnostics-quarantine contract.
- [x] Add a timestamped tracker and audit set.
- [x] Change no runtime source.
- [x] Push only to `main`.
- [x] Create no branch or pull request.
- [ ] Implement session, clock and capability authority with executable fixtures.

## Read this first

```txt
.agent/trackers/2026-07-11T10-00-12-04-00/project-breakdown.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/architecture-audit/2026-07-11T10-00-12-04-00-public-capability-gateway-dsk-map.md
.agent/render-audit/2026-07-11T10-00-12-04-00-command-result-frame-ack-gap.md
.agent/gameplay-audit/2026-07-11T10-00-12-04-00-player-action-debug-bypass-loop.md
.agent/interaction-audit/2026-07-11T10-00-12-04-00-dom-gateway-gamehost-command-map.md
.agent/capability-gateway-audit/2026-07-11T10-00-12-04-00-public-internal-debug-boundary-contract.md
.agent/deploy-audit/2026-07-11T10-00-12-04-00-capability-gateway-fixture-gate.md
.agent/turn-ledger/2026-07-11T10-00-12-04-00.md
.agent/kit-registry.json
```

## Product interaction loop

```txt
browser boot
  -> create one kit runtime and every domain closure
  -> create canvas and HTML renderers
  -> install delegated click input
  -> expose raw engine and manual tick through GameHost
  -> begin recursive RAF

player/browser action
  -> data-action or hard-coded data-command
  -> direct public engine.command
  -> domain mutation or rejection
  -> subscriber publication
  -> DOM caller discards result
  -> next RAF renders aggregate snapshot

internal/debug action
  -> GameHost.engine.command or GameHost.tick
  -> bypass product capability classification, route admission and input policy
  -> mutate/tick the same graph
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

internal/debug bypassable:
  resource ledger API
  pressure API
  raw engine commands
  unrestricted manual tick
```

## Main finding

```txt
implemented command
  != admitted public capability
  != shipped input binding
  != retained typed result
  != truthful rendered affordance
  != protected internal/debug service
  != first-frame acknowledgement
```

The capability registry plan is necessary but insufficient unless every player-facing command enters through one gateway and diagnostics can no longer bypass that gateway accidentally.

## Ordered implementation queue

```txt
1. Runtime Session Instance Authority
2. Fixed-Step Clock Authority
3. Public Capability Gateway and Reachability
4. Composite Command Transaction Authority
5. Seeded Random and Replay Authority
6. Versioned Save / Load Authority
```

## Next safe ledge

```txt
ZombieOrchard Runtime Session Instance Authority
+ Start / Reset / Title / Outcome Fidelity Fixture Gate
```

Do not add more routes or content before session ownership, fixed-step timing and the public/internal capability boundary are fixture-backed.