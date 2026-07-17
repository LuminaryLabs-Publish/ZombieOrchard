# Interaction audit: interface control command and result map

**Timestamp:** `2026-07-16T22-40-53-04-00`

## Required command flow

```txt
InterfaceControlFrameCommand
  -> bind RouteRevision, SnapshotRevision and action manifest
  -> allocate ControlGeneration
  -> publish InterfaceControlFrameResult

StableControlReconciliationCommand
  -> keyed update existing controls
  -> preserve eligible node identity and focus
  -> retire removed controls explicitly
  -> publish StableControlReconciliationResult

ControlGestureAdmissionCommand
  -> bind ControlId, ControlGeneration, pointer/key identity
  -> reject hidden, disabled, stale or retired controls
  -> publish ControlGestureAdmissionResult

ControlActivationSettlementCommand
  -> accept click, Enter or Space exactly once
  -> reject duplicate or generation-mismatched evidence
  -> dispatch the exact interface or gameplay command
  -> publish InterfaceControlResult
  -> publish FirstStableControlFrameAck
```

## Current result gap

The root listener dispatches a command from the current event target, but the event carries no product-owned control generation and the renderer publishes no activation or retirement result.
