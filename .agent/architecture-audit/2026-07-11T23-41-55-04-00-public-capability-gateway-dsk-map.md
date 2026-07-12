# Public capability gateway DSK map

## Goal

Replace the raw window-global engine export with one explicit, revocable and versioned gateway for observation, admitted commands and fixture-only stepping.

## Current architecture

```txt
window.GameHost
  engine
    ctx
      frame
      elapsed
      delta
      events
      domains
      emit
      engine
    domains
    addKit
    command
    tick
    snapshot
    subscribe
  getState
  tick
```

The runtime has no duplicate-domain guard. `addKit()` writes `domains[domain.id] = domain`, so an externally supplied kit can replace an existing domain ID.

## Authority defects

1. Public callers can reach the mutable runtime graph.
2. Public callers can mutate `ctx.frame`, `ctx.elapsed`, `ctx.delta`, `ctx.events` and `ctx.domains`.
3. Public callers can delete or replace domain entries.
4. Public callers can install arbitrary kits and overwrite an existing domain ID.
5. Public callers can call domain `api` methods without command admission or publication.
6. Public callers can call domain `command()` directly without runtime notification.
7. Public callers can call one domain's `tick()` independently from the graph.
8. Public callers can submit full `tick()` calls beside the active RAF.
9. Public commands carry no runtime, run, session, lifecycle, route or expected-revision identity.
10. The public snapshot omits runtime frame/time and render provenance.
11. Subscriptions have no externally visible lease identity, owner or forced retirement.
12. The host cannot be revoked on session replacement or disposal.

## Required composed domain

```txt
zombie-orchard-public-capability-gateway-authority-domain
  identity
    capability-id-kit
    capability-revision-kit
    host-generation-kit

  contract
    public-host-contract-kit
    host-capability-manifest-kit
    public-command-allowlist-kit
    command-payload-schema-kit

  admission
    capability-lease-kit
    command-session-admission-kit
    route-and-lifecycle-command-admission-kit
    single-writer-step-lease-kit
    manual-step-capability-kit

  observation
    public-read-model-kit
    host-observation-revision-kit
    host-frame-receipt-kit
    public-host-observation-kit

  results
    public-command-envelope-kit
    public-command-result-kit
    capability-journal-kit

  lifecycle
    duplicate-domain-registration-guard-kit
    subscriber-lease-kit
    host-revocation-kit

  proof
    public-host-capability-fixture-kit
    browser-public-host-smoke-kit
```

## Canonical public contract

```txt
PublicHostContract {
  apiVersion
  hostGeneration
  capabilityRevision
  capabilities(): CapabilityManifest
  observe(request?): PublicObservation
  command(PublicCommandEnvelope): PublicCommandResult
  subscribe(listener): CapabilityLease
  revoke(reason): HostRevocationResult
}
```

### PublicCommandEnvelope

```txt
commandId
capabilityId
hostGeneration
runtimeId
runId
sessionEpoch
lifecycleRevision
routeRevision
expectedStateRevision
commandType
payload
```

### PublicCommandResult

```txt
accepted
reason
commandId
capabilityId
hostGeneration
predecessorRevision
committedRevision
simulationTickId
routeRevision
renderFrameId or pendingFrameReceipt
journalSequence
```

### PublicObservation

```txt
apiVersion
hostGeneration
runtimeId
runId
sessionEpoch
lifecycleState
lifecycleRevision
routeId
routeRevision
simulationTickId
renderFrameId
stateRevision
clone-safe domain read models
latest admitted command result
bounded observation journal
```

## Reachability policy

### Publicly reachable

```txt
versioned capability manifest
clone-safe observation
allowlisted route and gameplay commands
explicit subscription lease
fixture-only manual stepping when no production clock owns the writer lease
revocation state
```

### Not publicly reachable

```txt
raw engine
ctx
domains table
domain objects
domain api functions
addKit
raw tick
raw subscribe set
mutable events array
renderer instances
DOM nodes
```

## Registration rule

Runtime registration must reject duplicate domain IDs unless an explicit internal replacement transaction carries:

```txt
replacementCapability
expectedDomainRevision
replacementReason
candidate validation result
rollback handle
```

The public gateway must never expose registration or replacement.

## Dependency order

```txt
Runtime Session Instance Authority
  -> Fixed-Step Clock Authority
  -> Route-Scoped Simulation Admission Authority
  -> Public Capability Gateway and Reachability
  -> Composite Command Transaction Authority
  -> Seeded Random and Replay Authority
  -> Versioned Save / Load Authority
```

The gateway consumes session, lifecycle, route and clock authority. It must not invent parallel identities.
