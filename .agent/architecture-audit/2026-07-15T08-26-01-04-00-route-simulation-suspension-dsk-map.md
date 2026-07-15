# Architecture audit: route simulation suspension DSK map

**Timestamp:** `2026-07-15T08-26-01-04-00`  
**Repository:** `LuminaryLabs-Publish/ZombieOrchard`

## Summary

Current ownership is split between unconditional runtime ticking and interface-only route selection. The missing semantic boundary is a parent domain that atomically settles route state and simulation tick eligibility.

## Plan ledger

**Goal:** coordinate existing route, gameplay and renderer owners without moving their product logic into the new authority.

- [x] Map current owners.
- [x] Preserve all existing kit APIs.
- [x] Define the missing parent domain and child surfaces.
- [ ] Implement only after suspension and resume fixtures define exact behavior.

## Current ownership

```txt
kit-runtime
  -> ticks every registered domain

interface-composition-kit
  -> active and previous route
  -> route transitions
  -> outcome routing

pressure-field-kit
  -> unconditional time-based pressure growth

active-session-domain-kit
  -> gameplay hazards and damage until ended

html-interface-render-kit
  -> selected route projection

world-canvas-render-kit
  -> active-session world projection
```

## Missing parent domain

`zombie-orchard-interface-route-simulation-suspension-authority-domain`

## Planned child surfaces

| Surface | Service |
|---|---|
| `route-identity-kit` | stable route and revision identity |
| `run-generation-kit` | run/session generation binding |
| `route-transition-command-kit` | typed transition request |
| `simulation-policy-descriptor-kit` | running, suspended, background-safe, terminal and retired policies |
| `simulation-lease-kit` | accepted tick capability |
| `tick-eligibility-kit` | per-domain step admission |
| `pressure-tick-admission-kit` | pressure growth gate |
| `active-session-tick-admission-kit` | pest, movement and damage gate |
| `interrupt-suspension-kit` | Pause semantics |
| `management-screen-suspension-kit` | Build, Market, Roster, Inventory and Codex semantics |
| `background-simulation-policy-kit` | explicit future background-safe services |
| `resume-settlement-kit` | input, time and lease reactivation |
| `route-transition-conflict-kit` | stale, duplicate and conflicting transition rejection |
| `simulation-suspension-result-kit` | suspension and rejection receipts |
| `route-transition-result-kit` | accepted route result |
| `simulation-revision-kit` | state revision shared by simulation and presentation |
| `route-bound-presentation-receipt-kit` | Canvas2D and HTML projection receipts |
| `first-route-bound-visible-frame-ack-kit` | first matching frame acknowledgement |
| `route-suspension-fixture-kit` | headless, browser, build and Pages proof |

## Command boundary

```txt
RouteSimulationAdmissionCommand
  -> bind RunGeneration RouteRevision TransitionCommandId and expected SimulationRevision
  -> resolve the destination route and its SimulationPolicyDescriptor
  -> classify running suspended background-safe terminal or retired
  -> prepare pressure and active-session tick leases
  -> atomically adopt the route and simulation policy
  -> reject stale duplicate conflicting or retired transitions
  -> publish RouteSimulationAdmissionResult
  -> render Canvas2D and HTML from the accepted SimulationRevision
  -> publish FirstRouteBoundVisibleFrameAck

ResumeSimulationCommand
  -> require the matching suspended run and route revision
  -> settle stale input and elapsed-time debt
  -> reactivate pressure and active-session ticks exactly once
  -> publish ResumeSimulationResult
```

## Dependency rule

```txt
interface action
  -> route-simulation authority
  -> route plus simulation policy adopted atomically
  -> eligible gameplay domains receive tick leases
  -> renderers consume accepted route and simulation revision
  -> proof surfaces acknowledge the matching visible frame
```

## Non-goals

Do not move resource, construction, roster, inventory, orchard generation, pest behavior, Canvas2D drawing, HTML layout or Pages ownership into this domain.

## Validation boundary

Documentation only. No authority implementation exists.
