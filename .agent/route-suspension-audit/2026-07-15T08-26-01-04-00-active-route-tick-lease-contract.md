# Route suspension audit: active-route tick lease contract

**Timestamp:** `2026-07-15T08-26-01-04-00`  
**Repository:** `LuminaryLabs-Publish/ZombieOrchard`

## Summary

Simulation eligibility must be explicit per route. The current runtime has no lease object, so every ticking domain advances regardless of screen.

## Plan ledger

**Goal:** define a minimal policy matrix and exactly-once suspension/resume settlement.

- [x] Identify current routes.
- [x] Identify time-based domains.
- [x] Define default policy classes.
- [x] Define lifecycle and conflict requirements.
- [ ] Validate policy choices with product fixtures.

## Proposed policy matrix

| Route | Default policy | Pressure | Active session |
|---|---|---:|---:|
| `entry` | retired/no run | off | off |
| `session-select` | suspended | off | off |
| `run-setup` | suspended | off | off |
| `active-session` | running | on | on |
| `interrupt` | suspended | off | off |
| `construction` | suspended | off | off |
| `exchange` | suspended | off | off |
| `roster` | suspended | off | off |
| `inventory` | suspended | off | off |
| `knowledge` | suspended | off | off |
| `preferences` | suspended | off | off |
| `outcome` | terminal | off | off |

Any future background progression must be separately authored and cannot inherit from unconditional runtime ticking.

## Lease invariants

```txt
one accepted RunGeneration
one accepted RouteRevision
one SimulationPolicyRevision
zero or one active pressure lease
zero or one active-session lease
suspension preserves exact predecessor state
resume reactivates each lease once
terminal/title transition retires leases
late ticks from old revisions are rejected
```

## Required receipts

```txt
RouteSimulationAdmissionResult
SimulationSuspensionResult
ResumeSimulationResult
TickRejectedResult
CanvasRouteProjectionReceipt
HtmlRouteProjectionReceipt
FirstRouteBoundVisibleFrameAck
```

## Validation boundary

The policy matrix is proposed documentation, not implemented product behavior.
