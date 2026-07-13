# Gameplay audit: night spawn accumulation and damage loop

**Timestamp:** `2026-07-12T20-31-27-04-00`

## Current loop

```txt
phase is night
  -> Math.random() < dt * 0.55 may append one pest
  -> all pests move toward player
  -> each pest within contact distance subtracts dt * 7 condition
  -> day phase stops new spawn but keeps all existing pests
  -> clear removes at most one nearby pest
```

## Finding

Population size is simultaneously difficulty, damage multiplier and performance cost. There is no cap, encounter budget, wave identity, age, despawn, safe transition policy or per-step damage ceiling.

A large accumulated group can apply many damage contributions in one step. The result is not represented as a typed contact or damage transaction and has no population-generation evidence.

## Required gameplay boundary

- bounded encounter population;
- explicit spawn-rate and active-count budgets;
- one contact-set result per step;
- bounded damage aggregation;
- exact retirement reasons;
- deterministic IDs and replay-compatible ordering.
