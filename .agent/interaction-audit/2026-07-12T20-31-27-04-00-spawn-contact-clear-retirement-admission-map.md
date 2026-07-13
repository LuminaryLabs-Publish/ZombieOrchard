# Interaction audit: spawn, contact, clear and retirement admission

**Timestamp:** `2026-07-12T20-31-27-04-00`

## Current command and tick map

```txt
tick/night -> addPest() -> direct array push
tick/all pests -> movement and contact damage
command/clear -> find first nearby pest -> decrement condition
condition <= 0 -> splice pest -> grant scrap and score
```

No operation carries command ID, expected population revision, pest generation, stale-result rejection or exactly-once retirement receipt.

## Required admission map

```txt
SpawnPestCommand
  -> SpawnAdmissionResult

AdvancePestPopulationCommand
  -> PestSimulationResult
  -> ContactSetResult
  -> PestDamageResult

ClearPestCommand
  -> validate pest ID and generation
  -> ClearPestResult
  -> optional PestRetirementResult

Rejected or stale input
  -> zero mutation
  -> bounded observation
```
