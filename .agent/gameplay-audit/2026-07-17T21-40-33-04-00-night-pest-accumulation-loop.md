# Gameplay audit: night pest accumulation loop

**Timestamp:** `2026-07-17T21-40-33-04-00`

## Interaction loop

```txt
player enters active session
  -> selects Next Phase
  -> phase becomes night
  -> each tick may append one pest
  -> all pests chase the player
  -> contact drains condition
  -> Clear damages one nearby pest
  -> defeated pest grants scrap and score
  -> player manually leaves night or loses
```

## Finding

The night phase has no authored duration, wave boundary or population capacity. Expected spawn rate is approximately `0.55 pests/second`, while retirement depends on successful player clearing. A player who remains at night, pauses clearing or cannot reach pests can accumulate population indefinitely.

This creates two coupled gameplay effects:

1. Threat can rise without an explicit authored ceiling or wave contract.
2. Simulation and render cost rise with the same retained population.

No player-facing incident was reproduced. The issue is missing ownership over the intended night threat envelope.

## Gameplay decisions required

```txt
Is night time-bounded or player-ended?
Is pest pressure continuous or wave-based?
What is the soft and hard population capacity?
What happens when capacity is reached?
Do old or distant pests retire?
Does phase exit retire, freeze or preserve pests?
How does rowPressure affect spawn rate or capacity?
What threat evidence should the HUD show?
```

## Proposed settlement

```txt
PestSpawnAdmissionCommand
  -> accept, defer or reject against policy and population revision

PestPopulationSettlementCommand
  -> apply explicit lifetime, distance, clear and phase retirement

PestPopulationResult
  -> publish population count, revision and settlement reasons
```

## Fixture set

```txt
long night at fixed seed/time budget
capacity reached
phase toggle at capacity
clear versus spawn race
contact damage with deferred update population
retirement and score/resource settlement
reset/new-run population generation
```

## Boundary

Documentation only. Spawn behavior, difficulty and rewards remain unchanged.