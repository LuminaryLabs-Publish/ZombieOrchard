# Gameplay audit: stationary-player orchard loop

## Current loop

```txt
Play
  -> active-session starts at x=0, y=180
  -> apples are randomly distributed around 63 trees
  -> UI offers Collect, Clear and Next Phase
  -> no UI control issues move
```

`active-session.move` exists and updates the player by 22 units per command, but no product binding invokes it. Collection requires an apple within 42 units. Pest clearing requires a pest within 58 units; pests eventually approach the stationary player at night.

## Reachable outcome

- Exploration is unavailable.
- Apple access depends on initial random proximity to the fixed spawn point.
- A run can present repeated `No apple close enough.` responses with no product action capable of resolving the condition.
- Movement, orchard traversal and deliberate positioning are implemented services but not gameplay mechanics reachable by the player.

## Required gameplay contract

```txt
movement intent
  -> admitted only during active gameplay
  -> normalized to a bounded vector
  -> applied at fixed-step cadence
  -> clamped by active-session bounds
  -> returns a typed accepted/rejected result
  -> advances one state revision
  -> is reflected by one correlated visible frame
```

Diagonal movement requires an explicit normalization policy. Held movement must stop on blur, pause, outcome, route transition, reset and runtime disposal.

## Required fixtures

```txt
start-position-no-input
WASD-cardinal-movement
normalized-diagonal-movement
orchard-boundary-clamp
paused-route-rejection
blur-held-input-retirement
ended-run-rejection
movement-to-collectible-reachability
movement-result-frame-correlation
```
