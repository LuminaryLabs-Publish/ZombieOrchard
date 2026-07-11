# Capability reachability audit: registry, binding and projection contract

## Authority rule

A capability is publicly available only when all of the following are true:

```txt
descriptor exists
owner domain and command exist
support state is supported
current session and lifecycle admit it
current route admits it
required target/prerequisites are valid
at least one shipped input binding exists
an accessible alternative is declared where required
a typed result can be returned
render projection consumes the same registry revision
```

## Registry states

```txt
supported
  implemented, admitted and bound

unreachable
  implemented but no shipped binding or reachable target path

dormant
  intentionally present but not currently routed or backed by state

unsupported
  visible concept with no service implementation

internal
  implementation detail not available to product users
```

## Current assignments

```txt
supported:
  route navigation
  collect, with target-reachability caveat
  clear
  next-phase
  Storage Shed action, with transaction caveat

unreachable:
  move
  hire
  equip

unsupported:
  Market transaction

dormant:
  Session Select
  scoped selection and field mutation

internal:
  direct resource ledger API
  direct pressure API
  raw engine and manual tick diagnostics
```

## Revision and observation

Every registry change should create:

```txt
registryRevision
registryFingerprint
changedCapabilityIds[]
reason
sessionId
sessionEpoch
committedTickId
```

`GameHost` should expose a detached observation rather than the mutable engine:

```txt
getCapabilityRegistry()
getCapabilityState(capabilityId)
getLatestCapabilityResult()
getLatestCapabilityRenderAck()
```

## Admission sequence

```txt
resolve descriptor
  -> verify registry revision
  -> verify owner binding
  -> verify support state
  -> verify lifecycle and route
  -> validate target/prerequisites
  -> resolve input binding
  -> dispatch command
  -> retain typed result
  -> publish state and capability projection once
  -> acknowledge first rendered frame
```

## Failure reasons

```txt
unknown-capability
owner-missing
command-missing
unsupported
unreachable
lifecycle-blocked
route-blocked
binding-missing
target-missing
target-invalid
prerequisite-missing
stale-registry-revision
stale-session
stale-tick
```

## Implementation boundary

Do not add ad hoc buttons directly in the renderer. Add the registry and binding adapters first, then derive the interface from capability projections. Do not make raw `GameHost.engine.command()` part of the public product contract.