# Interaction audit: build command, settlement, and adoption map

**Timestamp:** `2026-07-14T00-38-19-04-00`

## Summary

One click crosses two command layers. The inner build result is discarded, so the caller cannot distinguish success from failure or correlate the action with the eventual visible world.

## Plan ledger

**Goal:** make each build request return one typed terminal result linked to settlement, adoption, rollback, and the first visible frame.

- [x] Trace delegated click admission.
- [x] Trace scoped action activation.
- [x] Trace nested command dispatch.
- [x] Confirm nested result loss.
- [x] Define command/result correlation.
- [ ] Implement result propagation and stale/duplicate rejection.

## Current command map

```txt
button[data-action="shed"]
  -> interface-composition.activate({ actionId: "shed" })
  -> construction.activate(...)
  -> { accepted: true, action }
  -> engine.command("construction-runtime", "build", ...)
     -> success or failure result
     -> result discarded
  -> interface-composition returns { accepted: true }
```

## Required result map

```txt
ConstructionCommand
  -> AcceptedForPreparation
  -> RejectedUnknownItem
  -> RejectedInsufficientResources
  -> RejectedInvalidPlacement
  -> Duplicate
  -> Stale
  -> Prepared
  -> Committed
  -> RolledBack
  -> Failed
  -> Cancelled

ConstructionSettlementResult
  -> command ID
  -> item ID
  -> cost quote
  -> resource before/after revisions
  -> construction revision
  -> world placement
  -> render/collision/effect receipts
  -> visible-frame acknowledgement
```

## Admission rules

- One active route and run generation.
- Exact catalog item membership.
- Monotonic resource and world revisions.
- One terminal result per command ID.
- Duplicate commands return the original result.
- Stale commands perform zero mutation.
- The interface returns the nested terminal result, not independent acceptance.

No terminal-result or interaction-to-visible-world claim is made.
