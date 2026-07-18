# Architecture audit: pest population budget DSK map

**Timestamp:** `2026-07-17T21-40-33-04-00`  
**Status:** `pest-population-spawn-budget-retirement-authority-audited`

## Current domain path

```txt
kit-runtime
  -> active-session-domain-kit
       -> phase state
       -> addPest()
       -> pests[] ownership
       -> chase/contact tick
       -> clear retirement
       -> snapshot
  -> world-canvas-render-kit
       -> draw every pests[] entry
  -> html-interface-render-kit
       -> phase and condition projection
```

## Current ownership gap

`active-session-domain-kit` owns spawn, storage, movement, contact and clear retirement in one closure, but has no declared population policy. The renderer consumes the entire array with no admitted render budget. Neither surface publishes population revision, spawn settlement, retirement reason, budget result or matching-frame acknowledgement.

## Proposed DSK/domain breakdown

```txt
zombie-orchard-pest-population-spawn-budget-retirement-authority-domain
├─ pest-population-policy-kit
│  └─ capacity, spawn-rate, lifetime and retirement policy revision
├─ pest-spawn-admission-kit
│  └─ phase/run/population generation admission
├─ pest-capacity-budget-kit
│  └─ hard and soft population limits
├─ spawn-rate-policy-kit
│  └─ deterministic spawn cadence and pressure curve
├─ phase-spawn-adapter-kit
│  └─ day/night phase evidence
├─ pest-lifetime-retirement-kit
│  └─ bounded lifetime and explicit retirement reason
├─ pest-distance-retirement-kit
│  └─ optional out-of-bounds retirement
├─ pest-wave-generation-kit
│  └─ wave identity and deterministic membership
├─ pest-update-budget-kit
│  └─ bounded per-tick simulation work
├─ pest-render-budget-kit
│  └─ bounded visible projection work
├─ pest-population-result-kit
│  └─ spawn, defer, reject and retire results
├─ pest-pressure-coupling-kit
│  └─ explicit pressure-to-budget adapter
├─ pest-hud-projection-kit
│  └─ population, wave or threat evidence
└─ first-pest-budget-bound-frame-ack-kit
   └─ accepted population/render generation proof
```

## Required contracts

```txt
PestPopulationPolicy
  revision
  softCapacity
  hardCapacity
  spawnRate
  maxLifetime
  retirementPolicy
  updateBudget
  renderBudget

PestSpawnAdmissionCommand
  runGeneration
  phaseGeneration
  populationRevision
  policyRevision
  requestedSpawnCount

PestSpawnAdmissionResult
  accepted | deferred | rejected
  reason
  populationBefore
  populationAfter
  populationRevision

PestRetirementResult
  pestId
  reason
  populationRevision

PestWorkBudgetResult
  populationCount
  updatedCount
  projectedCount
  deferredCount
  policyRevision

FirstPestBudgetBoundFrameAck
  frame
  populationRevision
  policyRevision
  projectedCount
```

## Integration rule

Keep pest truth inside the existing active-session domain. Add a small policy/admission boundary around creation, update and retirement rather than creating a second pest simulation. The Canvas2D renderer should consume an accepted projection snapshot, not independently decide population truth.

## Boundary

Proposed architecture only. No DSK or runtime service was implemented.