# START HERE: ZombieOrchard

**Repository:** `LuminaryLabs-Publish/ZombieOrchard`  
**Branch:** `main`  
**Aligned:** `2026-07-12T20-31-27-04-00`  
**Status:** `pest-population-lifecycle-budget-authority-audited`

## Summary

ZombieOrchard is a dependency-free orchard survival and economy shell built from a mutable kit runtime, 12 interface definitions, gameplay services, canvas/HTML projection, diagnostics, Node smoke proof, static build and Pages deployment.

The newest audit isolates pest-population lifecycle and budget authority. Night simulation can append pests without a capacity, age, despawn rule, simulation budget, render budget or population revision. Every active pest is cloned, simulated, damage-tested and rendered each frame, so one unbounded array controls difficulty and frame cost.

## Plan ledger

**Goal:** make pest creation, active capacity, contact damage, retirement and visible population one bounded, revisioned transaction.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Select only ZombieOrchard as the oldest eligible entry.
- [x] Trace spawn, movement, contact damage, clearing, snapshots and canvas projection.
- [x] Preserve all 27 implemented kit surfaces and their offered services.
- [x] Add timestamped architecture and system audits.
- [x] Refresh required root documents and machine registry.
- [x] Prepare central ledger and change-log synchronization.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Runtime enforcement and executable pest-budget fixtures remain future work.

## Read this run first

```txt
.agent/trackers/2026-07-12T20-31-27-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-12T20-31-27-04-00.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-12T20-31-27-04-00-pest-population-lifecycle-budget-dsk-map.md
.agent/render-audit/2026-07-12T20-31-27-04-00-unbounded-pest-array-visible-frame-budget-gap.md
.agent/gameplay-audit/2026-07-12T20-31-27-04-00-night-spawn-accumulation-damage-loop.md
.agent/interaction-audit/2026-07-12T20-31-27-04-00-spawn-contact-clear-retirement-admission-map.md
.agent/pest-system-audit/2026-07-12T20-31-27-04-00-capacity-spawn-despawn-budget-contract.md
.agent/deploy-audit/2026-07-12T20-31-27-04-00-pest-population-budget-fixture-gate.md
```

## Interaction loop

```txt
RAF -> engine.tick(1/60)
  -> night spawn attempt may append one pest
  -> every pest moves toward the player
  -> every contacting pest applies damage
  -> snapshot clones every pest
  -> canvas draws every pest
  -> clear can retire one nearby pest
```

## Main findings

```txt
active population cap: absent
spawn admission result: absent
pest generation and unique-ID authority: absent
age, TTL and despawn policy: absent
simulation and render budgets: absent
contact-set and damage budget: absent
population revision/fingerprint: absent
first visible population-frame acknowledgement: absent
```

## Required parent domain

`zombie-orchard-pest-population-lifecycle-budget-authority-domain`

## Guardrails

- Keep population policy deterministic and run-generation scoped.
- Do not make raw array length the sole difficulty control.
- Do not reward duplicate or stale clear operations.
- Do not claim bounded performance or stable encounter difficulty until source, dist and Pages fixtures pass.
