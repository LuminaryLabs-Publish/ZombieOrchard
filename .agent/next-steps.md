# Next steps — ZombieOrchard

## Plan ledger

**Goal:** turn the browser-global host into a bounded, revocable capability gateway after runtime-session, clock and route-admission authority are established.

- [ ] Implement runtime-session instance authority first.
- [ ] Add a fresh graph factory, staged commit, rollback and predecessor retirement.
- [ ] Implement a monotonic fixed-step clock with one step-writer lease.
- [ ] Implement route-scoped simulation admission.
- [ ] Replace `window.GameHost.engine` with a versioned public contract.
- [ ] Keep raw engine, context, domains, APIs, registration and tick unreachable.
- [ ] Add a capability manifest and revocable leases.
- [ ] Add clone-safe, session/tick/route/frame-correlated observations.
- [ ] Add allowlisted public command envelopes and payload schemas.
- [ ] Reject duplicate domain registration.
- [ ] Permit manual stepping only under a fixture capability after RAF relinquishes the writer lease.
- [ ] Retire subscriptions and revoke the predecessor host during session replacement or disposal.
- [ ] Implement composite command transactions after the gateway.
- [ ] Add replay and persistence after command/session authority is stable.

## Ordered implementation queue

```txt
1. Runtime Session Instance Authority
2. Fixed-Step Clock Authority
2a. Route-Scoped Simulation Admission Authority
3. Public Capability Gateway and Reachability
4. Composite Command Transaction Authority
5. Seeded Random and Replay Authority
6. Versioned Save / Load Authority
```

## Public capability gateway design

### 1. Publish a minimal contract

```txt
window.GameHost = {
  apiVersion,
  hostGeneration,
  capabilityRevision,
  capabilities,
  observe,
  command,
  subscribe,
  revoke
}
```

Do not expose:

```txt
engine
ctx
domains
addKit
raw tick
domain command/api/tick functions
renderer or DOM objects
```

### 2. Add capability classes

```txt
observe
  -> clone-safe read model only

interact
  -> allowlisted interface and gameplay commands
  -> no clock ownership

fixture-step
  -> test-only bounded stepping
  -> requires RAF writer lease to be released

revoke
  -> internal lifecycle owner only
```

### 3. Add a typed public command envelope

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

### 4. Validate before mutation

```txt
host active
  -> generation match
  -> capability lease active
  -> capability permits command
  -> session/lifecycle/route revisions match
  -> command allowlisted
  -> payload schema valid
  -> step writer available when needed
  -> transaction prepare
  -> commit or stable rejection
```

### 5. Add a committed public read model

```txt
apiVersion
hostGeneration
runtimeId
runId
sessionEpoch
lifecycleState
routeId
routeRevision
simulationTickId
stateRevision
canvasFrameId
htmlFrameId
latestCommandResult
bounded journal
clone-safe domain projections
```

### 6. Add duplicate-domain protection

Current runtime registration overwrites by domain ID. Change registration to reject a duplicate ID and retain the predecessor unless an internal replacement transaction is explicitly invoked.

### 7. Add revocation

Revoke the host and all leases on:

```txt
runtime dispose
new session authority transfer
pagehide/unload
fatal failure
fixture teardown
contract version replacement
```

### 8. Add fixtures

```txt
raw engine unreachable
ctx and domains unreachable
direct domain APIs unreachable
duplicate domain rejected
unknown command rejected
invalid payload rejected
stale generation/session rejected
manual step rejected while RAF owns writer
fixture step admitted after writer transfer
observation clone-safe
observation/frame receipt coherent
subscriber lease retired
host revoked on replacement/dispose
```

## Next safe ledge

```txt
ZombieOrchard Runtime Session Instance Authority
+ Fixed-Step Clock Authority
+ Route-Scoped Simulation Admission Authority
+ Public Capability Gateway and Host Revocation
+ Reachability/Single-Writer/Frame-Receipt Fixture Gate
```
