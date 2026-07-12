# Gameplay audit: RAF cadence and orchard pressure loop

## Current gameplay timing

```txt
browser frame
  -> tick with literal 1/60
  -> pressure-field adds dt * 0.8 row pressure
  -> night active-session performs pest trial Math.random() < dt * 0.55
  -> pests move dt * 36 toward player
  -> contact damage applies dt * 7
  -> outcome routing observes the mutated state
```

## Wall-time behavior

Because the literal step is executed once per display callback:

| Display cadence | Sim seconds / wall second | Row pressure / wall second | Pest movement / wall second | Contact damage / wall second |
|---:|---:|---:|---:|---:|
| 30 Hz | 0.5 | 0.4 | 18 | 3.5 |
| 60 Hz | 1.0 | 0.8 | 36 | 7 |
| 120 Hz | 2.0 | 1.6 | 72 | 14 |

Night pest-spawn probability per wall second is approximately:

```txt
30 Hz: 24.1%
60 Hz: 42.5%
120 Hz: 66.9%
```

The exact random sequence is already non-deterministic, but the number of trials per wall second also changes with refresh rate.

## Player-facing consequence

```txt
same route
same apparent real-world duration
same initial state
  -> different pressure
  -> different pest count
  -> different pest distance
  -> different player condition
  -> different failure timing
```

A faster display is currently a harder simulation. A throttled or low-refresh display is easier and slower.

## Required gameplay policy

Gameplay time must be based on admitted simulation steps, not render callback count.

```txt
wall time observation
  -> bounded accumulator
  -> exact 1/60 steps
  -> one deterministic step order
  -> one batch result
  -> one render
```

Route-scoped simulation admission remains a separate dependency: the clock determines when a step may exist, while the route policy determines which domains may consume it.

## Required fixtures

```txt
pressure-cadence-parity
pest-movement-cadence-parity
contact-damage-cadence-parity
night-spawn-trial-count-parity
long-frame-catch-up-bound
hidden-tab-no-pressure-burst
manual-step-no-double-advance
terminal-step-closure
```

No gameplay-speed, difficulty-parity, or fixed-step claim is valid until the fixtures pass.