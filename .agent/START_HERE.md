# START HERE: ZombieOrchard

## Last aligned

```txt
2026-07-11T07-59-08-04-00
```

## Summary

`ZombieOrchard` is a dependency-free static orchard survival and economy shell with a small domain-kit runtime, 12 interface screens, gameplay services, canvas and HTML rendering, diagnostics, smoke proof, static build, and Pages deployment. The current focused finding is that composite UI actions do not form one transaction: child results are discarded, nested commands publish intermediate state, and the parent can report success without proof that required gameplay work committed.

## Plan ledger

**Goal:** keep one clear entry point to the active architecture findings, complete kit inventory, implementation order, and proof gaps.

- [x] Compare the complete accessible Publish inventory with the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `ZombieOrchard` because the repo-local audit was newer than central tracking.
- [x] Identify the interaction loop.
- [x] Identify all active domains.
- [x] Identify all implemented kits and services.
- [x] Trace the Storage Shed parent and child command path.
- [x] Document preflight, commit, rollback, publication, and frame-proof requirements.
- [x] Add a new timestamped tracker and audit set.
- [x] Change no runtime source.
- [x] Push only to `main`.
- [x] Create no branch or pull request.
- [ ] Implement runtime session authority and dependent gates.

## Read this first

```txt
.agent/trackers/2026-07-11T07-59-08-04-00/project-breakdown.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/architecture-audit/2026-07-11T07-59-08-04-00-composite-command-central-reconciliation-dsk-map.md
.agent/render-audit/2026-07-11T07-59-08-04-00-single-publication-frame-proof-gap.md
.agent/gameplay-audit/2026-07-11T07-59-08-04-00-storage-shed-parent-child-result-loop.md
.agent/interaction-audit/2026-07-11T07-59-08-04-00-dom-click-child-dispatch-result-map.md
.agent/command-transaction-audit/2026-07-11T07-59-08-04-00-preflight-commit-rollback-publication-contract.md
.agent/deploy-audit/2026-07-11T07-59-08-04-00-composite-command-fixture-gate.md
.agent/turn-ledger/2026-07-11T07-59-08-04-00.md
.agent/kit-registry.json
```

## Product interaction loop

```txt
browser boot
  -> construct one engine and all domain closures
  -> create canvas and HTML renderers
  -> install delegated click input
  -> expose raw engine and manual tick on GameHost
  -> begin recursive RAF

RAF
  -> engine.tick(1 / 60)
  -> tick every domain
  -> aggregate snapshots
  -> render world canvas and interface HTML

composite UI action
  -> parent screen activation
  -> nested public child command
  -> child mutation and publication
  -> discarded child result
  -> optional independent route mutation
  -> parent publication
```

## Main finding

```txt
Storage Shed parent action accepted
  -> child build may reject
  -> child result is discarded
  -> parent may still report accepted
  -> child and parent each publish
```

The runtime also falls back to the first construction item for an unknown target, returns only a Boolean payment result, stages no resource or gameplay effects, provides no rollback, and attaches no command, transaction, session, tick, fingerprint, journal, or first-frame identity.

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

Do not add persistence, extra content, or new interface routes before the runtime session owner can prove fresh start, pause freeze, terminal finalization, stable return to title, reset, stale-work rejection, and idempotent disposal.