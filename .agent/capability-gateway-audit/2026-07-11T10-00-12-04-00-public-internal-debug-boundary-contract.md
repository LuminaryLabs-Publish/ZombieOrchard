# Capability gateway audit: Public, internal and debug boundary

## Purpose

Prevent product capability policy from becoming advisory by making one gateway authoritative for every player-facing command and explicitly quarantining internal/debug control.

## Classification

```txt
public supported
  route navigation
  collect
  clear
  next-phase
  build-storage-shed

public unreachable
  move
  hire
  equip

public unsupported
  market-transaction

public dormant
  session-select

internal service
  resource-ledger operations
  pressure-field operations

debug-only
  raw domain dispatch
  manual tick
```

## Public gateway contract

```txt
execute(PublicCommandEnvelope)
  -> resolve capability descriptor
  -> validate registry revision
  -> validate session/lifecycle/route/binding/target
  -> dispatch owner command
  -> normalize typed result
  -> retain result for projection
  -> publish one observation
```

## Internal/debug contract

```txt
requestDebugLease(runtimeId, sessionId, epoch, scope)
  -> policy decision
  -> bounded lease or rejection

executeDebug(lease, InternalCommandEnvelope)
  -> validate lease and epoch
  -> execute declared debug-only operation
  -> journal provenance
  -> never masquerade as public capability result
```

## GameHost target

Replace:

```txt
GameHost.engine
GameHost.tick
```

With detached observations such as:

```txt
GameHost.snapshot()
GameHost.capabilities()
GameHost.pendingResults()
GameHost.lifecycle()
GameHost.debugStatus()
```

Any mutating debug control should be absent in production or require an explicit short-lived lease.

## Admission result

```txt
capabilityId
bindingId
commandId
sessionId
sessionEpoch
registryRevision
accepted
reason
targetId
effects[]
committedTickId
stateFingerprint
resultId
firstRenderedFrameId
```

## Invariants

1. A public command has exactly one gateway entry.
2. No public input binding targets raw domain dispatch.
3. Unsupported and dormant capabilities cannot be presented as enabled.
4. Internal/debug operations cannot produce public success results.
5. Stale leases and stale results are rejected after epoch change.
6. The rendered affordance revision equals the admission revision.
7. The first visible effects identify the result and frame that committed them.
