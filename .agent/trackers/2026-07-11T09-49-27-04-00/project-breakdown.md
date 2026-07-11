# Project breakdown: ZombieOrchard capability reachability

## Timestamp

```txt
2026-07-11T09-49-27-04-00
```

## Plan ledger

**Goal:** define one truthful capability boundary from implemented domain service through route admission, browser binding, affordance projection, command result, committed state and first visible frame.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Compare the nine eligible repositories against `LuminaryLabs-Dev/LuminaryLabs`.
- [x] Confirm all nine are centrally tracked and have root `.agent` state.
- [x] Select only `ZombieOrchard` as the oldest eligible central-ledger entry.
- [x] Re-read runtime, scoped interfaces, composition, game domains, preset, HTML renderer, proof and current audit state.
- [x] Identify the complete interaction loop.
- [x] Identify all active domains.
- [x] Identify all implemented kits and offered services.
- [x] Classify public, internal, dormant, unreachable and unsupported capabilities.
- [x] Trace movement, collection, clearing, phase change, construction, market, hiring, equipment and session-select reachability.
- [x] Define capability registry, binding, projection, result and fixture requirements.
- [x] Change no runtime source.
- [x] Push documentation only to `main`.
- [x] Create no branch or pull request.
- [ ] Runtime implementation and executable fixtures remain future work.

## Selection comparison

```txt
ZombieOrchard      2026-07-11T07-59-08-04-00 selected
TheUnmappedHouse   2026-07-11T08-11-14-04-00
AetherVale         2026-07-11T08-18-31-04-00
IntoTheMeadow      2026-07-11T08-31-33-04-00
PrehistoricRush    2026-07-11T08-48-04-04-00
MyCozyIsland       2026-07-11T09-08-59-04-00
TheOpenAbove       2026-07-11T09-21-50-04-00
HorrorCorridor     2026-07-11T09-29-07-04-00
PhantomCommand     2026-07-11T09-40-19-04-00
TheCavalryOfRome   excluded
```

## Interaction loop

```txt
browser boot
  -> construct one engine and all domain closures
  -> construct canvas and HTML renderers
  -> install delegated click input
  -> expose raw engine and manual tick through GameHost
  -> begin recursive RAF

RAF
  -> engine.tick(1 / 60)
  -> tick every domain
  -> aggregate snapshots
  -> render world canvas and replace interface HTML

browser action
  -> hard-coded data-command or data-action
  -> public engine.command
  -> domain mutation or rejection
  -> subscriber publication
  -> renderer rebuilds from aggregate snapshot
```

## Capability census

```txt
reachable from shipped DOM:
  interface route actions
  collect
  clear
  next-phase
  Storage Shed build

implemented but unreachable from shipped DOM:
  active-session move
  roster-runtime hire
  inventory-runtime equip
  scoped-interface select
  scoped-interface set-field
  direct resource add/pay/pressure adjust through raw GameHost only

dormant presentation:
  Session Select slot cards

visible but unsupported:
  Market route

read-only presentation:
  Roster cards
  Inventory cards
  Codex and Settings shells
```

## Main finding

The product has implemented services and visible affordances, but no canonical capability registry joins service existence, lifecycle admission, route availability, input binding, target reachability, disabled reason, command result and render proof.

Concrete mismatches:

1. `active-session.move` exists but has no keyboard, pointer or accessible button binding.
2. Collect is clickable, but the player cannot deliberately move to an apple.
3. Roster and Inventory render cards but expose no Hire or Equip actions.
4. `inventory-runtime.equip` accepts unknown item IDs.
5. Market is presented as an available route even though no exchange runtime service exists.
6. Session Select has a screen and renderer path but no incoming route or slot authority.
7. Static `disabled` flags are not derived from runtime capability state, and the button renderer does not project disabled state or reason.
8. DOM callers discard command results, so rejected capabilities have no authoritative feedback surface.
9. Raw `GameHost.engine` bypasses any future public capability policy.

## Required authority domain

```txt
zombie-orchard-capability-reachability-authority-domain
  -> capability-descriptor-kit
  -> capability-registry-kit
  -> capability-owner-binding-kit
  -> capability-lifecycle-admission-kit
  -> capability-route-admission-kit
  -> capability-input-binding-kit
  -> movement-input-adapter-kit
  -> collectible-reachability-kit
  -> roster-hire-binding-kit
  -> inventory-equip-binding-kit
  -> target-admission-kit
  -> unsupported-capability-policy-kit
  -> disabled-affordance-projection-kit
  -> capability-command-result-kit
  -> capability-observation-kit
  -> capability-render-ack-kit
  -> capability-reachability-fixture-kit
```

## Dependency order

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

The capability contract is now detailed enough for Gate 3, but it must consume session and committed-tick identity from Gates 1 and 2.