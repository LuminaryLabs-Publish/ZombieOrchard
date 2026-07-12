# Architecture audit: player-control reachability DSK map

## Goal

Define one explicit browser-control domain that makes the existing movement service reachable without creating a second simulation or command authority.

## Current graph

```txt
start.js
  -> createOrchardGame()
  -> createWorldCanvas()
  -> createHtmlInterfaceRenderer()
  -> recursive RAF

html-interface-renderer
  -> data-action -> interface-composition.activate
  -> data-command -> active-session command
  -> exposes collect, clear and next-phase only

active-session-domain-kit
  -> implements move({ x, y })
  -> increments position by 22
  -> clamps x to [-360, 360]
  -> clamps y to [-280, 280]

missing edge
  browser movement intent -X-> active-session.move
```

## Required composed domain

```txt
zombie-orchard-player-control-reachability-authority-domain
  -> control-binding-manifest-kit
  -> browser-keyboard-input-adapter-kit
  -> optional-touch-control-adapter-kit
  -> held-control-state-kit
  -> movement-intent-kit
  -> movement-vector-normalization-kit
  -> route-focus-control-lease-kit
  -> movement-command-admission-kit
  -> input-retirement-kit
  -> movement-command-result-kit
  -> control-observation-kit
  -> movement-frame-receipt-kit
  -> player-control-fixture-kit
```

## Ownership boundaries

- Browser adapters own raw key, focus, blur and touch events only.
- The control domain owns binding identity, held state, vector normalization and admission.
- `active-session` remains authoritative for player position and orchard bounds.
- The runtime clock owns when held intent becomes a movement command.
- Interface composition owns whether the active route permits gameplay input.
- Renderers consume committed position and control observations; they do not mutate movement.

## Admission contract

A movement intent must carry or resolve:

```txt
runtimeId
runId
sessionEpoch
routeRevision
controlLeaseId
inputSequence
bindingId
normalizedVector
expectedStateRevision
```

Reject without mutation when the runtime is inactive, the active route is not `active-session`, focus is absent, the lease is stale, the vector is non-finite or the command revision is stale.

## Dependency order

```txt
runtime session instance authority
  -> fixed-step clock authority
  -> route-scoped simulation admission
  -> player-control reachability authority
  -> public capability gateway
  -> composite command transaction authority
  -> replay and persistence
```
