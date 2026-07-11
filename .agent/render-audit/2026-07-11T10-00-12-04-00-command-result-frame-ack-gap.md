# Render audit: Command result and frame acknowledgement gap

## Current render loop

```txt
engine tick/publication
  -> aggregate snapshot
  -> world canvas render
  -> full interface HTML replacement
```

## Gap

Browser command results are discarded before rendering. The renderers receive only aggregate state and therefore cannot prove which accepted/rejected command produced the visible frame.

Missing render provenance:

```txt
sessionId
sessionEpoch
committedTickId
capabilityRegistryRevision
commandId
capabilityId
resultId
accepted/rejected state
stateFingerprint
firstRenderedFrameId
```

## Consequences

1. A rejected action cannot reliably project a reason.
2. A successful action cannot prove which frame first displayed its effects.
3. Disabled affordances cannot prove they came from the same registry revision used for command admission.
4. Debug/manual mutations can appear in a frame without a public command record.
5. Full HTML replacement destroys transient caller-local feedback unless it is retained in authoritative state.

## Required render contract

```txt
CapabilityCommandResult
  -> pending projection queue
  -> render snapshot includes result and registry revision
  -> HTML/canvas frame records frameId
  -> frame acknowledgement(resultId, frameId)
  -> result becomes observed/retirable
```

The renderer should remain a projection consumer. It must not infer support or admission independently from action descriptors.

## Fixture gate

```txt
accepted command -> exactly one first-frame acknowledgement
rejected command -> visible reason and acknowledgement
registry revision used for admission == rendered revision
debug command -> explicitly marked debug provenance
stale result from prior session epoch -> never rendered as current
```
