# Gameplay audit — Build, hire and equip transaction loop

Timestamp: `2026-07-11T01-31-15-04-00`

## Construction loop

```txt
construction screen action
  -> interface-composition activate
  -> construction-runtime build
  -> catalog lookup
  -> unknown ID falls back to first catalog item
  -> resource-ledger pay returns boolean
  -> built row appended on success
  -> construction message updated
  -> child result discarded by composition
```

Current failure behavior is not causally complete. The caller cannot distinguish missing resources, invalid item ID, missing ledger service, or a later mutation failure from the parent result alone.

## Roster loop

```txt
roster-runtime hire
  -> charge payload.cost or default 25
  -> append generated actor row
  -> update message
```

The service has no public UI binding, command identity, catalog validation, role validation, debit attribution, or composite result.

## Inventory loop

```txt
inventory-runtime equip
  -> assign payload.id directly
  -> return accepted: true
```

Any arbitrary ID becomes equipped. There is no membership check, previous value, resulting item row, rejection reason, or state fingerprint.

## Resource transaction gap

`resource-ledger.pay()` is an internal boolean function. It does not return:

```txt
transactionId
resource deltas
before values
after values
missing resource facts
request owner
rollback handle
```

## Required gameplay result pattern

```txt
MutationResult
  accepted
  reason
  commandId
  transactionId
  validatedTarget
  resourceEffects[]
  createdOrUpdatedEntity
  beforeFingerprint
  afterFingerprint
```

## Fixtures

```txt
valid build charges exact cost and creates one object
unknown build ID rejects without spending
insufficient resources rejects without mutation
nested build result reaches parent caller
required child failure prevents dependent route commit
valid hire charges exact cost and creates one actor
invalid hire request rejects without spending
valid equip selects an existing item
unknown equipment ID rejects without mutation
one admitted user action produces one committed publication
```
