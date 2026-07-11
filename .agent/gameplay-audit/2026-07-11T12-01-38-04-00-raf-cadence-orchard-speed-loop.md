# RAF Cadence / Orchard Speed Loop

**Timestamp:** `2026-07-11T12-01-38-04-00`

## Summary

Gameplay speed is coupled to animation-frame frequency because the browser applies one `1/60` step for every RAF callback.

## Current gameplay loop

```txt
RAF callback
  -> pressure rises by dt
  -> night pest spawn trial uses dt
  -> pests pursue using dt
  -> contact damage uses dt
  -> terminal failure may commit
  -> composition may route to Outcome
```

## Cadence effect

For one real second:

```txt
30 RAF callbacks  -> 30 simulation steps -> 0.5 simulated seconds
60 RAF callbacks  -> 60 simulation steps -> 1.0 simulated seconds
120 RAF callbacks -> 120 simulation steps -> 2.0 simulated seconds
```

This changes pressure growth, pest-spawn opportunities, movement distance and damage rate. It also means a high-refresh display makes the game materially harder than a low-refresh display.

## Pause and inactive-route effect

Pause, Entry, Title and Outcome are interface routes. The runtime continues ticking all domains, so pressure and active-session state can continue changing while gameplay is not visible.

## Required gameplay rule

```txt
simulation duration
  = count(committed fixed ticks) * fixedStep
  != count(render frames) * fixedStep
```

## Required fixtures

```txt
same seed + same commands + 10 wall seconds at 30/60/120 Hz
  -> equal tick count
  -> equal pressure
  -> equal player condition
  -> equal pest decisions after seeded replay authority

pause for 5 wall seconds
  -> no pressure, pest, damage or score changes

terminal state
  -> one final tick
  -> no post-terminal mutation
```
