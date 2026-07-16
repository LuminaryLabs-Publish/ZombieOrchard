# Pressure-system audit: channel, threshold and consumer contract

**Timestamp:** `2026-07-16T03-41-28-04-00`

## Summary

The pressure domain currently guarantees bounded numeric storage, adjustment and time growth. It does not define units, semantic bands, hysteresis, consumer registration, threshold identity or deterministic effect adoption.

## Plan ledger

**Goal:** formalize pressure as a versioned domain contract rather than a HUD-only number.

- [x] Record current channel behavior.
- [x] Define required schema and consumer boundaries.
- [x] Define crossing and deduplication requirements.
- [ ] Implement authored policy and fixtures.

## Channel descriptor

```txt
PressureChannelDescriptor
  id
  schemaVersion
  unit
  minimum
  maximum
  initialValue
  accumulationPolicy
  resetPolicy
  persistencePolicy
  replayPolicy
```

## Threshold descriptor

```txt
PressureBandDescriptor
  id
  channelId
  lowerInclusive
  upperExclusive
  hysteresis
  phaseFilter
  consumerIds[]
  effectDescriptors[]
  policyVersion
```

## Consumer contract

A consumer must register an ID, accepted effect types and owning domain. Evaluation may propose effects, but only the owning domain may mutate gameplay truth. Repeated ticks inside one band must not re-fire one-shot crossings unless policy explicitly declares sustained effects.

## Current gaps

```txt
channel units: unspecified
threshold bands: none
hysteresis: none
consumer registry: none
crossing identity: none
effect receipts: none
restore/replay crossing state: none
```
