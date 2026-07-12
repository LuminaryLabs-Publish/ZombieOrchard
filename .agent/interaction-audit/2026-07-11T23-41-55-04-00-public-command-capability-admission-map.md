# Public command capability admission map

## Goal

Route every public interaction through a typed capability and reject stale, unknown, malformed or clock-conflicting commands before mutation.

## Current paths

```txt
HTML action
  -> data-action
  -> engine.command("interface-composition", "activate", payload)

HTML active-session command
  -> data-command
  -> engine.command("active-session", commandType)

public diagnostic
  -> GameHost.engine.command(...)
  -> or domain.command(...)
  -> or domain.api.*
  -> or GameHost.tick(...)
```

Only the first two paths are constrained by currently rendered controls. The public diagnostic path can name arbitrary domains and commands or avoid commands entirely.

## Required admission map

```txt
PublicCommandEnvelope
  -> host not revoked?
  -> hostGeneration matches?
  -> capability lease active?
  -> capability permits command family?
  -> runtimeId/runId/sessionEpoch match?
  -> lifecycle revision accepted?
  -> route revision accepted?
  -> expected state/tick revision accepted?
  -> command type allowlisted?
  -> payload schema valid?
  -> single-writer lease available when command advances time?
  -> composite transaction prepared?
  -> commit or reject without partial publication
  -> typed result
  -> frame acknowledgement
```

## Capability classes

```txt
observe
  state and frame receipts only

interact
  allowlisted interface/game commands
  no clock ownership
  no graph registration

test-step
  fixture-only
  bounded fixed steps
  requires production RAF relinquishment

admin-debug
  development-only observation controls
  still no raw engine or domain table

revoke
  internal lifecycle owner only
```

## Rejection reasons

```txt
HOST_REVOKED
STALE_HOST_GENERATION
CAPABILITY_MISSING
CAPABILITY_EXPIRED
CAPABILITY_NOT_PERMITTED
STALE_SESSION
STALE_LIFECYCLE_REVISION
STALE_ROUTE_REVISION
STALE_STATE_REVISION
UNKNOWN_COMMAND
INVALID_PAYLOAD
STEP_WRITER_BUSY
TRANSACTION_REJECTED
FRAME_ACK_PENDING
```

## UI adapter rule

The HTML renderer should submit the same public or internal command envelope shape used by diagnostics, while using an internal capability not exposed through DOM data attributes. DOM attributes may carry action IDs, not authority tokens.

## Result rule

Parent composition success must not conceal child-command failure. A public result must contain:

```txt
parentResult
childResults[]
committed
rollbackApplied
stateRevision
routeRevision
simulationTickId
frameReceipt
```

## Fixture matrix

| Case | Expected result |
|---|---|
| valid observe lease | clone-safe observation |
| unknown capability | reject before lookup |
| expired lease | reject without mutation |
| stale host generation | reject without mutation |
| unknown domain/command | reject with stable reason |
| malformed payload | reject before domain command |
| direct raw-engine lookup | property absent |
| manual step while RAF owns writer | `STEP_WRITER_BUSY` |
| fixture step after RAF relinquishes writer | bounded accepted result |
| revoked host | all mutation commands rejected |
| nested child rejection | parent reports rejected/rolled back |
