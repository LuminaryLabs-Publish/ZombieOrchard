# Architecture audit: Runtime session instance DSK map

## Plan ledger

**Goal:** place session ownership above the existing graph and below future clock, capability, transaction, replay and persistence authorities.

- [x] Preserve existing kit and domain responsibilities.
- [x] Avoid creating a parallel gameplay graph.
- [x] Define one product-level parent authority.
- [x] Define identity, lifecycle, resource and proof sub-kits.
- [ ] Implement the parent domain and fixture gate.

## Existing architecture

```txt
src/start.js
  -> createOrchardGame()
  -> createKitRuntime()
  -> install game/interface domains
  -> create renderers
  -> publish GameHost
  -> start RAF
```

The existing domain graph is reusable as session content. The missing layer is an owner around graph construction, command admission, presentation resources and disposal.

## Parent domain

```txt
zombie-orchard-runtime-session-instance-authority-domain
```

### Identity DSKs

```txt
runtime-id-kit
session-id-kit
session-epoch-kit
preset-revision-kit
runtime-revision-kit
```

### Lifecycle DSKs

```txt
lifecycle-state-kit
runtime-start-command-kit
new-run-command-kit
pause-command-kit
resume-command-kit
title-command-kit
outcome-command-kit
runtime-dispose-command-kit
lifecycle-admission-kit
lifecycle-result-kit
```

### Construction and handoff DSKs

```txt
graph-construction-plan-kit
runtime-startup-transaction-kit
session-checkpoint-kit
authority-transfer-kit
startup-rollback-kit
old-session-retirement-kit
```

### Resource ownership DSKs

```txt
animation-frame-lease-kit
delegated-listener-lease-kit
subscription-lease-kit
renderer-resource-owner-kit
public-host-lease-kit
runtime-cleanup-stack-kit
ordered-runtime-dispose-kit
```

### Proof DSKs

```txt
lifecycle-journal-kit
lifecycle-observation-kit
session-descriptor-kit
session-frame-correlation-kit
runtime-session-fixture-kit
```

## Ownership boundary

```txt
session authority owns
  runtime/session identity
  lifecycle state
  current graph authority
  RAF and browser binding leases
  renderer and public-host leases
  startup rollback
  old/new session handoff
  ordered disposal

kit runtime owns
  installed domains
  direct domain command/tick/snapshot mechanics

fixed-step clock authority owns later
  wall-time sampling
  committed simulation ticks
  catch-up and pause timing

renderers own
  canvas and HTML projection only
```

## Dependency order

```txt
Runtime Session Instance Authority
  -> Fixed-Step Clock Authority
  -> Public Capability Gateway
  -> Composite Command Transaction Authority
  -> Seeded Random and Replay Authority
  -> Versioned Save / Load Authority
```

No downstream domain may invent its own session identity or lifecycle epoch.