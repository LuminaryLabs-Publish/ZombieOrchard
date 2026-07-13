# ZombieOrchard project breakdown

**Timestamp:** `2026-07-12T20-31-27-04-00`  
**Repository:** `LuminaryLabs-Publish/ZombieOrchard`  
**Branch:** `main`  
**Status:** `pest-population-lifecycle-budget-authority-audited`

## Summary

The active session can create pests every night tick without a population cap, age, despawn rule, simulation budget, render budget, or generation-bound identity. Every pest is simulated and rendered each frame, and every contacting pest applies damage independently, so one unbounded array governs memory, CPU cost, visual density, and lethality.

## Plan ledger

**Goal:** make pest creation, capacity, contact damage, retirement, and visible population one bounded, revisioned lifecycle transaction.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger and root `.agent` coverage.
- [x] Select only `ZombieOrchard` as the oldest eligible repository.
- [x] Read runtime, active-session, preset, canvas, HTML, boot and smoke sources.
- [x] Identify the complete interaction loop, all domains, 27 implemented kit surfaces and offered services.
- [x] Confirm night spawn has no population or per-frame budget.
- [x] Confirm pests retire only through player clearing.
- [x] Confirm simulation, damage and rendering scale directly with active pest count.
- [x] Add timestamped architecture, render, gameplay, interaction, pest-system and deployment audits.
- [x] Refresh required root `.agent` documents and registry.
- [ ] Runtime enforcement and executable population-budget fixtures remain future work.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

ZombieOrchard      2026-07-12T18-48-07-04-00 selected
MyCozyIsland       2026-07-12T19-00-22-04-00
TheUnmappedHouse   2026-07-12T19-11-01-04-00
AetherVale         2026-07-12T19-21-29-04-00
TheOpenAbove       2026-07-12T19-31-06-04-00
IntoTheMeadow      2026-07-12T19-49-41-04-00
PhantomCommand     2026-07-12T19-58-07-04-00
PrehistoricRush    2026-07-12T20-10-25-04-00
HorrorCorridor     2026-07-12T20-20-02-04-00
TheCavalryOfRome   excluded
```

## Interaction loop

```txt
browser RAF
  -> engine.tick(1/60)
  -> active-session night tick may call addPest()
  -> every pest moves toward the player
  -> every contacting pest subtracts condition
  -> snapshot clones the complete pest array
  -> canvas draws every pest
  -> player may clear one nearby pest
  -> no age, capacity, despawn or population revision exists
```

## Main finding

`addPest()` appends a random-ID pest with no admission result. The night tick performs at most one Bernoulli spawn attempt per simulation step, but active population has no maximum and survives phase changes. The only removal path is a successful nearby `clear` command.

## Required parent domain

`zombie-orchard-pest-population-lifecycle-budget-authority-domain`
