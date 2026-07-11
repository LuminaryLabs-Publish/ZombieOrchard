# Interaction audit: DOM click to child command result

## Summary

The delegated DOM input adapter sends action identity into the composition domain but does not receive or project a durable command result. Required child work is then dispatched without preserving source identity, parent identity, result evidence, or UI feedback.

## Plan ledger

**Goal:** map the interaction path and define one command envelope from browser intent through committed result and first visible acknowledgement.

- [x] Trace delegated click input.
- [x] Trace parent activation.
- [x] Trace child dispatch.
- [x] Trace route mutation.
- [x] Trace result loss.
- [x] Define source and result identity.
- [ ] Implement the interaction envelope.
- [ ] Add accessible result projection.

## Current interaction path

```txt
button[data-action]
  -> action.dataset.action
  -> engine.command(interface-composition, activate, { actionId })
  -> active screen command(activate)
  -> action descriptor
  -> optional ctx.engine.command(child domain, child type, payload)
  -> discarded child result
  -> optional move(next)
  -> parent-only result
```

Direct gameplay buttons use a separate path:

```txt
button[data-command]
  -> engine.command(active-session, command type)
```

Neither path carries a command identity, session identity, expected tick, source element identity, or idempotency key.

## Missing interaction evidence

```txt
inputEventId
commandId
transactionId
parentCommandId
runtimeId
sessionId
sessionEpoch
activeScreenId
actionId
sourceControlId
expectedCommittedTickId
accepted
reason
childResults[]
routeResult
firstRenderedFrameId
```

## Required command admission map

```txt
DOM intent
  -> normalize input source
  -> assign commandId and transactionId
  -> bind runtime/session/epoch
  -> validate active screen and action
  -> resolve complete parent/child/route plan
  -> preflight capabilities and targets
  -> commit or roll back
  -> publish one result
  -> project result to diagnostics and UI
  -> acknowledge first rendered frame
```

## Required interaction policies

1. The adapter must not infer success from the parent action alone.
2. Required child rejection must be visible to the initiating control.
3. Duplicate browser events with the same command identity must not repeat effects.
4. Stale session or tick identity must reject before mutation.
5. Disabled controls must derive from the same capability and admission source used by the command path.
6. Result projection must remain usable without depending only on transient text or color.
