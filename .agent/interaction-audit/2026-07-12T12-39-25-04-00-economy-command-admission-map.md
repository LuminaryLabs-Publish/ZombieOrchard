# Interaction audit: economy command admission map

**Timestamp:** `2026-07-12T12-39-25-04-00`

## Summary

Economy-affecting commands enter through delegated interface actions or the public raw engine. The runtime validates only domain presence. Participant domains then interpret raw payloads independently and publish a generic `{ accepted }` result without command identity, stable reject codes, expected revisions or conservation evidence.

## Plan ledger

**Goal:** map every economy command from caller intent to typed result and identify the missing admission boundary.

- [x] Trace interface-composition nested dispatch.
- [x] Trace direct public `engine.command` access.
- [x] Trace resource, build, hire and equip handlers.
- [x] Document payload and result gaps.
- [ ] Implement one canonical command envelope and result schema.

## Current command map

```txt
HTML action
  -> interface-composition.activate
  -> active route activate
  -> optional nested engine.command
  -> participant command

public caller
  -> GameHost.engine.command(domainId, type, payload)
  -> participant command directly
```

## Participant behavior

| Command | Current admission | Mutation | Result gap |
|---|---|---|---|
| resource-ledger/add | any object of keys and values | signed deltas and new keys | no schema or balance receipt |
| resource-ledger/pay | any cost object | negative values mint resources | no reject code or conservation proof |
| construction-runtime/build | requested ID or first catalog item | payment plus built item | unknown ID does not reject |
| roster-runtime/hire | caller name and signed cost | payment plus actor | caller controls economic price |
| inventory-runtime/equip | any ID | equipped string replacement | no item-membership proof |
| active-session/collect | proximity only | apple removal, reward, pressure and score | no command ID or participant revisions |

## Required command envelope

```txt
{
  commandId,
  commandType,
  runtimeSessionId,
  actorCapabilityId,
  routeRevision,
  expectedEconomyRevision,
  expectedCatalogRevision,
  payload
}
```

## Required result

```txt
{
  commandId,
  status: "committed" | "rejected" | "duplicate" | "stale",
  reasonCode,
  economyRevision,
  participantRevisions,
  balanceDeltas,
  catalogReceipts,
  frameAckPending
}
```

## Admission order

```txt
session and capability
  -> route policy
  -> command schema
  -> finite and nonnegative numeric policy
  -> registered resource and catalog references
  -> predecessor revisions
  -> mutation plan
  -> conservation checks
  -> atomic commit
  -> typed publication
```

No direct participant mutation should remain available through the public host.