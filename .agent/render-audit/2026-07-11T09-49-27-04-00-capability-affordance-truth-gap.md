# Render audit: capability affordance truth gap

## Current projection

The HTML renderer rebuilds the interface from aggregate snapshots and binds two generic DOM patterns:

```txt
data-action
  -> interface-composition.activate

data-command
  -> active-session command
```

The active-session HUD hard-codes:

```txt
Collect
Clear
Next Phase
```

All screen action descriptors are rendered as ordinary clickable buttons.

## Gaps

1. The renderer does not consume a capability registry or binding revision.
2. Static action `disabled` state is not projected into the button markup.
3. No disabled reason, unsupported reason or missing-binding reason is shown.
4. Market is rendered as a normal available route despite no exchange runtime service.
5. Roster and Inventory cards are read-only even though hire and equip commands exist.
6. Movement has no keyboard, pointer or accessible control projection.
7. Collect is shown as usable without proof that a collectible is reachable from the current player position.
8. DOM command results are discarded, so rejected capability feedback is not authoritative.
9. The renderer has no capability projection revision, command ID, committed tick, state fingerprint or first-frame acknowledgement.
10. `root.innerHTML` replacement cannot preserve focus or disabled-state transition evidence.

## Required render input

```txt
capabilityProjectionRevision
sessionId
sessionEpoch
committedTickId
routeId
affordances[]:
  capabilityId
  label
  enabled
  supportState
  disabledReason
  bindingType
  targetSummary
  commandEnvelopeTemplate
lastCapabilityResult
stateFingerprint
```

## Required acknowledgement

```txt
renderFrameId
capabilityProjectionRevision
sessionId
sessionEpoch
committedTickId
stateFingerprint
visibleCapabilityIds[]
enabledCapabilityIds[]
unsupportedCapabilityIds[]
```

## Browser fixture

```txt
start a fresh run
  -> movement controls are visible and usable
  -> Collect is enabled only under declared target policy
  -> Roster exposes Hire only when its service and candidate are valid
  -> Inventory exposes Equip only for known items
  -> Market is disabled with an explicit unsupported reason
  -> Session Select is absent or marked dormant until routed and backed by slots
  -> rejected command result is visible
  -> first rendered frame acknowledges the same capability projection revision
```

Do not treat a visible button as proof that its capability is implemented, reachable or currently admitted.