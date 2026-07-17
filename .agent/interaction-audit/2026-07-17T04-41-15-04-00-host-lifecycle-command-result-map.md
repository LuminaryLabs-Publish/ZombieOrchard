# Interaction audit: host lifecycle command/result map

**Timestamp:** `2026-07-17T04-41-15-04-00`

## Current path

```txt
module evaluation
  -> create engine and renderers
  -> add click listener
  -> publish GameHost
  -> start RAF
  -> no typed result

page retirement or replacement
  -> no command
  -> no result
  -> no resource release
```

## Required map

```txt
HostBootAdmissionCommand
  inputs:
    HostSessionId
    expected predecessor generation
    document and root revisions
    requested replacement policy
  outputs:
    HostBootAdmissionResult

HostRuntimeCommitCommand
  inputs:
    accepted admission result
    engine/render/listener candidate set
  outputs:
    HostLifecycleResult(status=active)
    FirstHostBoundFrameAck

HostRuntimeRetirementCommand
  inputs:
    HostSessionId
    expected active generation
    reason
  outputs:
    HostLifecycleResult(status=retired)
```

## Rejection reasons

- duplicate active host;
- stale document/root generation;
- predecessor not retired;
- partial candidate construction;
- missing render roots;
- stale RAF callback;
- already retired generation;
- replacement policy denied.

## Interaction rule

Delegated clicks and public `GameHost` calls must be accepted only by the active HostSessionId. Retirement removes the listener and makes stale capability calls reject rather than mutate a detached runtime.