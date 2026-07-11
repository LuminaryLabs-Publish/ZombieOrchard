# Fixed-Step Clock DSK Map

**Timestamp:** `2026-07-11T12-01-38-04-00`

## Summary

The existing runtime supplies a fixed delta value but does not own a fixed-step schedule. Clock authority must be composed between the runtime-session owner and every simulation domain.

## Plan ledger

**Goal:** define small DSK boundaries for deterministic time admission, update scheduling, overrun handling and render correlation.

- [x] Map the current host/runtime timing path.
- [x] Separate wall time, simulation ticks and render frames.
- [x] Define automatic/manual ownership.
- [x] Define pause, resume and stall behavior.
- [x] Define observations and fixtures.
- [ ] Implement after runtime-session identity exists.

## Composed domain

```txt
zombie-orchard-fixed-step-clock-authority-domain
  -> clock-descriptor-kit
  -> wall-time-sample-kit
  -> fixed-step-accumulator-kit
  -> simulation-tick-id-kit
  -> lifecycle-tick-admission-kit
  -> clock-catchup-budget-kit
  -> clock-overrun-policy-kit
  -> dropped-time-result-kit
  -> automatic-tick-lease-kit
  -> manual-step-command-kit
  -> manual-automatic-exclusion-kit
  -> visibility-resume-policy-kit
  -> committed-tick-receipt-kit
  -> render-frame-id-kit
  -> render-frame-clock-ack-kit
  -> clock-observation-kit
  -> clock-journal-kit
  -> cadence-parity-fixture-kit
  -> pause-freeze-fixture-kit
```

## Ownership

### Runtime-session domain owns

```txt
sessionId
sessionEpoch
lifecycle state
automatic clock lease
RAF lease
disposal and restart
```

### Fixed-step clock domain owns

```txt
clock revision
wall-time baseline
accumulator
fixed step
catch-up budget
simulation tick ID
dropped/deferred time policy
manual-step admission
committed tick receipts
```

### Render domain owns

```txt
render frame ID
world projection result
HTML projection result
acknowledged simulation tick ID
```

## Admission sequence

```txt
RAF timestamp
  -> verify session/clock lease
  -> sample and clamp wall delta
  -> reject or reset when paused/stale
  -> accumulate time
  -> while accumulator >= fixedStep and steps < maxCatchupSteps
       apply one admitted simulation tick
       publish committed tick receipt
  -> classify remaining overrun
  -> render latest committed snapshot once
  -> publish render-frame acknowledgement
```

## Service contracts

| Kit | Service |
|---|---|
| `clock-descriptor-kit` | immutable policy descriptor and revision |
| `wall-time-sample-kit` | monotonic timestamp sampling and baseline reset |
| `fixed-step-accumulator-kit` | residual-time accounting and step availability |
| `lifecycle-tick-admission-kit` | run/pause/terminal/stopped admission |
| `clock-catchup-budget-kit` | maximum steps per render frame |
| `dropped-time-result-kit` | typed defer/drop/overrun result |
| `manual-automatic-exclusion-kit` | exactly one mutation owner |
| `committed-tick-receipt-kit` | tick identity, events and state fingerprint |
| `render-frame-clock-ack-kit` | frame-to-tick correlation |
| fixture kits | cadence, pause, stall and manual-step proof |

## Dependency rule

Clock authority must not manufacture session identity. It consumes the active session and epoch from runtime-session authority, and all later command, replay and persistence systems consume its committed tick receipts.
