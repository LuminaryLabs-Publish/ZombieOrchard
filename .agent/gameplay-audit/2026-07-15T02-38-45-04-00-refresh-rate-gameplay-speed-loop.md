# Gameplay audit: refresh-rate gameplay speed loop

## Current loop

```txt
callback rate
  -> one fixed 1 / 60 tick per callback
  -> pressure grows by dt-based amounts
  -> night pest spawn probability evaluates once per callback
  -> every pest moves by dt-based distance
  -> contact damage applies by dt-based amount
  -> runtime elapsed advances by dt
```

## Source-backed rate sensitivity

`pressure-field-kit` applies `rowPressure += dt * 0.8` and `curse += dt * 0.2`. `active-session-domain-kit` evaluates pest spawning with `Math.random() < dt * 0.55`, moves pests by `dt * 36`, and applies damage by `dt * 7`. These formulas are time-based only when submitted steps track wall time.

## Example cadence effect

```txt
120 callbacks/second -> 120 * 1/60 = about 2 simulated seconds/second
60 callbacks/second  -> 60 * 1/60  = about 1 simulated second/second
30 callbacks/second  -> 30 * 1/60  = about 0.5 simulated seconds/second
```

The exact observed browser rate was not measured during this documentation-only run. The source path permits the divergence.

## Required settlement

Gameplay should receive a stable fixed quantum from an accumulator. The host must admit a bounded number of steps based on monotonic wall delta, render once, report discarded/deferred time and settle visibility transitions explicitly.

## Required fixtures

Compare pressure, pest count distribution, pest travel, player damage and runtime elapsed across equivalent wall-time traces at 30, 60 and 120 Hz, including a long frame and hide/resume transition.