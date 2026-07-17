# Gameplay audit: stamina-free action loop

**Timestamp:** `2026-07-17T09-43-24-04-00`

## Current loop

```txt
move
  -> fixed 22-unit displacement
  -> always accepted inside bounds

collect
  -> collect nearest apple within 42
  -> grant apples, money and score
  -> refill orchard apples

clear
  -> damage nearest pest within 58
  -> remove defeated pest and grant scrap/score

next phase
  -> toggle day/night

all paths
  -> player.stamina remains 100
```

## Finding

The player state suggests an effort budget, but no active action consumes it and no simulation rule restores it. This removes pacing, exhaustion and recovery decisions while leaving a misleading public field in snapshots and diagnostics.

## Decision required

Choose one explicit product policy:

1. **Adopt stamina:** movement, collection and clearing use deterministic costs with exhaustion and recovery.
2. **Remove stamina:** delete the field from public state until an effort system is actually designed.

The recommended path is adoption because the survival loop already separates condition, pressure, phase and action types, giving stamina a clear pacing role without replacing health.

## Acceptance rules

- Costs are defined by policy, not hard-coded independently in each command.
- The result states accepted, degraded or rejected.
- Rejected actions do not mutate unrelated game state.
- Recovery is tied to accepted simulation time or explicit phase settlement.
- Condition damage remains separate from stamina depletion.
- Reset and future persistence initialize or restore stamina deterministically.

## Validation boundary

No effort costs, exhaustion behavior, recovery or gameplay balance changed.