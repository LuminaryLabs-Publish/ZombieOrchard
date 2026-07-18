# Interaction audit: pest spawn and retirement command/result map

**Timestamp:** `2026-07-17T21-40-33-04-00`

## Current evidence flow

```txt
Next Phase command
  -> phase = night
  -> later runtime ticks
  -> random predicate
  -> direct pests.push()
  -> direct movement/contact mutation
  -> Clear command may splice one target
  -> snapshot and render
```

Spawn is not represented as a command or typed result. Retirement has no reason/result record. The phase command does not bind a spawn-policy generation, and the rendered frame cannot prove which population settlement it represents.

## Proposed command/result map

```txt
PhaseTransitionResult
  -> phaseGeneration

PestSpawnAdmissionCommand
  runGeneration
  phaseGeneration
  populationRevision
  policyRevision
  requestedCount

PestSpawnAdmissionResult
  accepted | deferred | rejected
  reason
  createdIds
  populationRevision

PestPopulationSettlementCommand
  acceptedTickGeneration
  populationRevision
  lifetimeEvidence
  distanceEvidence
  clearEvidence
  phaseEvidence

PestPopulationResult
  spawnedIds
  retiredIds
  retirementReasons
  populationCount
  populationRevision

PestProjectionCommitCommand
  populationRevision
  renderBudget

FirstPestBudgetBoundFrameAck
  populationRevision
  projectedCount
  frame
```

## Admission rules

- Reject stale run, phase, population or policy revisions.
- Settle each spawn request exactly once.
- Do not let a deferred or rejected spawn mutate `pests[]`.
- Retire each pest exactly once with one reason.
- Keep score and scrap grants coupled only to accepted player-clear retirement.
- Do not grant clear rewards for lifetime, phase or distance retirement.
- Bind the projected frame to the accepted population revision.

## Validation gap

There are no typed spawn/retirement results, stale-generation fixtures, duplicate-settlement fixtures or matching-frame acknowledgements.