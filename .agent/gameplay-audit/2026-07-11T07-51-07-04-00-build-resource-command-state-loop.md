# Build/resource command state loop

## Audit timestamp

```txt
2026-07-11T07-51-07-04-00
```

## Goal

Trace the only currently configured nested gameplay command and define the atomic gameplay result it must produce.

## Current loop

```txt
open Active Session
  -> choose Build
  -> route to Construction
  -> click Storage Shed
  -> construction screen resolves action
  -> composition dispatches construction-runtime.build
  -> construction runtime resolves catalog item
  -> resource ledger Boolean-pay
  -> built object appended
  -> construction message updated
  -> child result discarded by composition
  -> parent returns generic success
```

## Accepted case today

Starting resources include enough wood and money. The child build normally debits `wood: 4` and `money: 8`, appends one built object and sets a success message.

The caller cannot prove:

```txt
which resource values changed
which target was admitted
which built object was created
whether one or more publications occurred
which parent command caused the mutation
which rendered frame first showed the result
```

## Rejected case today

When resources are insufficient, `resource-ledger.api.pay()` returns `false`. `construction-runtime` sets `Missing resources` and returns `{ accepted: false }`.

`interface-composition` ignores that child result and returns its own parent success. The player-facing caller therefore receives no truthful composite rejection.

## Invalid target case today

```txt
requested id not in catalog
  -> find(...) fails
  -> state.catalog[0] is selected
  -> first item can be built
```

Invalid target identity is converted into a different valid target rather than rejected.

## Required gameplay transaction

```txt
Build Storage Shed command
  -> admit action and session phase
  -> resolve exact catalog target
  -> calculate typed resource debit
  -> create candidate built object with stable ID
  -> validate placement/state invariants
  -> stage message and optional route
  -> commit resource + construction state together
  -> return parent result containing debit and build receipts
  -> publish once
```

## Required rejection behavior

```txt
insufficient resources
  -> accepted: false
  -> reason: insufficient_resources
  -> shortfall values
  -> no resource mutation
  -> no construction mutation
  -> route unchanged

unknown target
  -> accepted: false
  -> reason: unknown_build_target
  -> no first-item fallback

stale session/epoch
  -> accepted: false
  -> reason: stale_session
  -> no mutation
```

## Required gameplay invariants

- Resource values never become negative.
- A built object exists only after its matching debit commits.
- Each built-object ID is stable and unique within the session.
- One command ID cannot create more than one object.
- Rejection and rollback preserve the before fingerprint.
- Construction messages correspond to the committed result, not a staged attempt.
