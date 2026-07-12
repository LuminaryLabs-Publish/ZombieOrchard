# Raw engine graph exposure contract

## Goal

Define the exact reachability boundary for the browser-global host and the lifecycle rules for capability creation, use and revocation.

## Current exposed graph

```txt
GameHost.engine.ctx
GameHost.engine.domains
GameHost.engine.addKit
GameHost.engine.command
GameHost.engine.tick
GameHost.engine.snapshot
GameHost.engine.subscribe
GameHost.getState
GameHost.tick
```

## Required invariant

```txt
public host reachability
  intersect
mutable runtime implementation reachability
  = empty set
```

The gateway may call internal engine services through closures. It must never return those services or store them on publicly reachable objects.

## Capability manifest

```txt
CapabilityManifest {
  apiVersion
  hostGeneration
  capabilityRevision
  entries[] {
    id
    kind
    commandFamilies[]
    observationFields[]
    expiresAtRevision
    fixtureOnly
  }
}
```

Capability IDs are references, not bearer secrets in DOM markup. Authority remains inside the gateway closure.

## Lease lifecycle

```txt
create host generation
  -> create immutable capability manifest
  -> issue internal UI lease
  -> optionally issue test observer/step lease
  -> admit commands and observations
  -> session replacement or dispose begins
  -> revoke all leases
  -> reject queued/stale commands
  -> retire subscriptions
  -> remove or replace window.GameHost
  -> publish terminal revocation observation
```

## Observation guarantees

1. Values are structured-clone-safe.
2. No function, DOM node, renderer, engine, context or domain object is present.
3. Every observation carries host/session/state/frame revisions.
4. Arrays and objects are detached from internal state.
5. Journal length is bounded.
6. A revoked host returns a stable terminal result.

## Command guarantees

1. Every command has a unique command ID.
2. Every command cites capability and host generation.
3. Every mutation cites runtime/run/session/lifecycle/route expectations.
4. Unknown commands are rejected before domain lookup.
5. Payloads are validated before mutation.
6. Time-advancing commands require the single-writer lease.
7. Nested commands return composed child results.
8. Direct domain APIs are unreachable.
9. Registration and replacement are internal-only.
10. Results are journaled and correlated to a frame or explicit headless receipt.

## Duplicate-domain guard

Current registration overwrites `domains[domain.id]`. Required internal rule:

```txt
if domainId already exists
  -> reject DUPLICATE_DOMAIN_ID
  -> retain predecessor
  -> emit no partial replacement
```

An intentional replacement must use a separate internal transaction and cannot be exposed by the public gateway.

## Revocation triggers

```txt
runtime dispose
new run/session authority transfer
pagehide/unload
fatal runtime failure
explicit test teardown
host contract version replacement
```

## Required proof

```txt
Object.keys(GameHost) contains only approved contract members
recursive reachability scan finds no engine/domain/context/functions beyond contract methods
observation mutation does not change internal state
duplicate registration is rejected internally
revoked leases cannot command or subscribe
predecessor host generation cannot affect successor session
```
