# Capability reachability audit — Command service exposure contract

Timestamp: `2026-07-10T20-30-23-04-00`

## Purpose

Define a durable contract for distinguishing a service that merely exists in code from a capability that is intentionally exposed to players, automation, or other domains.

## Required classifications

```txt
public-direct
  user can invoke through a visible control or declared input binding

public-indirect
  user invokes another public capability that consumes this service

internal
  service is intentionally available only to trusted domain composition

dormant
  implementation exists but is intentionally not part of the current product surface

unsupported
  product surface names the concept but no operational service exists
```

## Current classification

### Public direct and reachable

```txt
entry.play
entry.new
entry.settings
run-setup.start
active-session.collect
active-session.clear
active-session.next-phase
active-session.pause
active-session.build
active-session.market-route
active-session.roster-route
active-session.inventory-route
active-session.codex-route
interrupt.resume
interrupt.title
construction.build-storage-shed
screen back actions
```

### Public indirect

```txt
resource-ledger.add
resource-ledger.pay
pressure-field.adjust
orchard-world.collectNear
```

### Implemented but unclassified/unbound

```txt
active-session.move
roster-runtime.hire
inventory-runtime.equip
scoped-interface.select
scoped-interface.set-field
interface-composition.transition
interface-composition.back
```

### Dormant candidates

```txt
session-select
run-setup fields
preferences fields
knowledge content
```

### Unsupported

```txt
exchange market transaction
save slot load/create/delete
purchase intake
```

## Contract

Each installed kit that exposes commands or callable APIs must publish capability descriptors. The runtime aggregates descriptors without changing their meaning.

Minimum fields:

```txt
schemaVersion
capabilityId
ownerDomainId
ownerKitId
classification
commandType or serviceName
routeRequirement
affordanceRequirement
payloadSchema
resultSchema
effectKeys
fixtureId
status
```

## Admission rules

- `public-direct` fails validation without a route and binding.
- `public-indirect` fails validation without at least one declared public consumer.
- `internal` must not be rendered as a user affordance.
- `dormant` must not be described as currently operational.
- `unsupported` must project explicit unavailable state instead of a misleading empty shell.
- Classification changes must be versioned and included in the fixture fingerprint.

## GameHost readback

```json
{
  "capabilityCatalogVersion": 1,
  "counts": {
    "publicDirect": 0,
    "publicIndirect": 0,
    "internal": 0,
    "dormant": 0,
    "unsupported": 0
  },
  "rows": [],
  "violations": []
}
```

Rows returned to consumers must be detached, bounded, and JSON-safe.

## First enforcement target

`active-session.move` should become the first fully proven public-direct capability because it is required to make the collection loop recoverable.

## Later enforcement targets

```txt
roster-runtime.hire
inventory-runtime.equip
session-select route decision
run-setup field decision
preferences field decision
exchange unsupported projection
```

## Non-goal

The registry must not force every internal service into the UI. Its purpose is to make exposure intent explicit and testable.