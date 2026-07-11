# Gameplay audit: RAF cadence, pressure and pest speed loop

## Timestamp

`2026-07-11T15-20-27-04-00`

## Current gameplay time path

```txt
RAF callback count
  -> one 1/60 tick per callback
  -> pressure rowPressure += dt * 0.8
  -> pressure curse += dt * 0.2
  -> night pest-spawn trial uses Math.random() < dt * 0.55
  -> each pest moves dt * 36
  -> contact damage applies dt * 7
  -> failure may latch
  -> composition may route to Outcome
```

## Finding

The formulas are delta-scaled, but the browser supplies a constant delta for every animation callback. Equal real-world duration therefore produces different gameplay based on display cadence.

```txt
30 Hz for one wall second
  -> 30 trials and 0.5 simulated seconds

60 Hz for one wall second
  -> 60 trials and 1.0 simulated second

120 Hz for one wall second
  -> 120 trials and 2.0 simulated seconds
```

This changes pressure growth, pursuit distance, damage accumulation, number of random spawn trials and time to failure.

Pause and Title are interface routes, so the same clock continues ticking the gameplay graph unless the earlier runtime-session gate introduces lifecycle tick admission.

## Required gameplay contract

```txt
accepted fixed tick
  -> one canonical dt
  -> one ordered domain mutation pass
  -> one simulationTickId
  -> one gameplay result summary
```

All time-dependent gameplay must consume committed fixed ticks only. UI route changes must not implicitly define whether gameplay time advances; lifecycle state must do that.

## Required proof

```txt
equal wall time produces equal pressure at 30/60/120 Hz
pest movement and damage are cadence independent
pause freezes pressure, spawning, pursuit and damage
stall policy is explicit and bounded
Outcome routing cites the tick that committed failure
random-stream determinism remains a later Gate 5 concern
```