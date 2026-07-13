# Interaction audit: command to frame and surface result map

**Timestamp:** `2026-07-13T03-59-28-04-00`

## Summary

Browser actions mutate runtime state and may publish to subscribers immediately, but no command result is linked to the canvas and HTML surfaces that later present the mutation.

## Plan ledger

**Goal:** connect each accepted interaction to one committed state revision, one frame envelope, two surface results, and one visible acknowledgement.

- [x] Trace delegated HTML clicks into engine commands.
- [x] Trace nested composition commands.
- [x] Trace command and tick publication.
- [x] Trace both visible surfaces.
- [x] Identify missing interaction-to-frame correlation.
- [ ] Add command-to-visible-frame fixtures.

## Current map

```txt
click [data-action]
  -> engine.command("interface-composition", "activate", actionId)
  -> active interface command
  -> optional nested engine.command(...)
  -> route transition
  -> synchronous notify after each command boundary

click [data-command]
  -> engine.command("active-session", command)
  -> collect, clear, or next-phase mutation
  -> synchronous notify

next RAF
  -> tick may add further mutations
  -> second publication
  -> returned snapshot rendered to canvas then HTML
```

## Missing correlation

```txt
InteractionId: absent
CommandId: absent
NestedCommandParentId: absent
StateRevision: absent
FrameEnvelopeId: absent
CanvasProjectionReceipt: absent
HtmlProjectionReceipt: absent
VisibleInteractionAck: absent
```

A single click can cause nested commands and multiple publications before one RAF. The visible frame does not state which command or publication it adopted.

## Required map

```txt
BrowserInteraction
  -> InteractionId
  -> CommandEnvelope
  -> CommandResult
  -> StateRevision
  -> FrameEnvelope
  -> CanvasProjectionResult
  -> HtmlProjectionResult
  -> DualSurfaceFrameCommitResult
  -> VisibleInteractionAck
```

## Required rejection behavior

```txt
rejected command
  -> zero state mutation
  -> no false visible acknowledgement

accepted command superseded before RAF
  -> typed superseded result
  -> successor frame cites final admitted revision

nested command
  -> explicit parent and child identities
  -> one ordered publication chain

surface failure
  -> interaction result remains committed
  -> visible acknowledgement remains pending or failed, never implied
```

## Required fixtures

```txt
Play action -> route frame acknowledgement
Collect -> resource HUD and canvas envelope correlation
Next Phase -> phase HUD and world frame correlation
nested build or navigation command -> ordered command/frame chain
multiple commands before one RAF -> final visible adoption result
rejected action -> no visible success receipt
```

## Validation boundary

Documentation only. Browser interaction, commands, routing, and rendering are unchanged.
