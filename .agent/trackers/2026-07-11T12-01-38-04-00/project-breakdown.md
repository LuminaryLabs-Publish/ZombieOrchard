# ZombieOrchard Project Breakdown

**Timestamp:** `2026-07-11T12-01-38-04-00`

## Summary

This run selected `LuminaryLabs-Publish/ZombieOrchard` under the oldest documented-selection rule and audited its fixed-step clock boundary. The browser currently advances one `1/60` update per RAF and also exposes direct manual ticking, so gameplay speed and ordering are not owned by one session clock.

## Plan ledger

**Goal:** identify the interaction loop, domains, kits and services, then define the minimum clock authority and proof required before further gameplay expansion.

- [x] Compare the ten accessible Publish repositories with the nine eligible central ledger entries.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `ZombieOrchard`.
- [x] Read browser host, runtime, composition and gameplay timing code.
- [x] Identify all active domains.
- [x] Identify all implemented kits and services.
- [x] Trace automatic RAF and manual tick paths.
- [x] Define clock DSK boundaries and fixture requirements.
- [x] Update required root `.agent` files.
- [x] Add architecture, render, gameplay, interaction, clock and deploy audits.
- [x] Push only to `main`.
- [x] Create no branch or pull request.

## Selection comparison

```txt
ZombieOrchard      2026-07-11T10-00-12-04-00 selected
TheUnmappedHouse   2026-07-11T10-18-05-04-00
AetherVale         2026-07-11T10-38-55-04-00
IntoTheMeadow      2026-07-11T10-50-14-04-00
PrehistoricRush    2026-07-11T10-58-10-04-00
MyCozyIsland       2026-07-11T11-19-10-04-00
TheOpenAbove       2026-07-11T11-31-06-04-00
HorrorCorridor     2026-07-11T11-39-11-04-00
PhantomCommand     refreshed concurrently after prior 09-40-19 entry
TheCavalryOfRome   excluded
```

## Interaction loop

```txt
boot -> create graph -> create renderers -> expose GameHost -> draw

draw
  -> engine.tick(1/60)
  -> tick all domains once
  -> snapshot
  -> world render
  -> HTML render
  -> request next RAF
```

## Finding

The runtime has a fixed delta value but not a fixed-step clock. A true fixed-step clock measures wall time, accumulates admitted duration, applies zero or more bounded simulation steps and renders from the latest committed tick. ZombieOrchard instead applies exactly one step per display frame.

## Output

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
.agent/turn-ledger/2026-07-11T12-01-38-04-00.md
.agent/architecture-audit/2026-07-11T12-01-38-04-00-fixed-step-clock-dsk-map.md
.agent/render-audit/2026-07-11T12-01-38-04-00-render-frame-simulation-tick-identity-gap.md
.agent/gameplay-audit/2026-07-11T12-01-38-04-00-raf-cadence-orchard-speed-loop.md
.agent/interaction-audit/2026-07-11T12-01-38-04-00-automatic-manual-tick-admission-map.md
.agent/clock-audit/2026-07-11T12-01-38-04-00-accumulator-catchup-pause-contract.md
.agent/deploy-audit/2026-07-11T12-01-38-04-00-clock-cadence-fixture-gate.md
```
