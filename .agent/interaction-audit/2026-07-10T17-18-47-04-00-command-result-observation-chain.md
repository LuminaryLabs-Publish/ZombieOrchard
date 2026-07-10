# Interaction audit: command-result observation chain

Timestamp: `2026-07-10T17-18-47-04-00`

## Input paths

```txt
[data-action]
  -> interface-composition.activate
  -> scoped interface activate
  -> action descriptor
  -> optional child engine.command
  -> optional transition

[data-command]
  -> active-session command
  -> direct synchronous mutation
```

## Current observation behavior

- Scoped activation emits an ephemeral `*.actionRequested` event.
- Runtime commands return a result directly to the immediate caller.
- Nested child results are ignored by `interface-composition`.
- `notify()` publishes aggregate domain snapshots only.
- Events are excluded from snapshots and cleared at the start of the next tick.
- Renderers do not retain the result returned by either input path.
- `GameHost` exposes no command-result journal.

## Consequences

A user click cannot be reconstructed as one durable chain:

```txt
DOM input
  -> activation request
  -> selected source action
  -> child command
  -> result
  -> mutation
  -> committed frame
  -> rendered projection
```

The visible UI may change, but diagnostics cannot prove which interaction caused the change or whether a child command was rejected.

## Required interaction row

```txt
{
  interactionId,
  source: "dom-action" | "dom-command" | "fixture" | "gamehost",
  actionId,
  activationId,
  commandId,
  requestedFrame,
  completedFrame,
  parentResult,
  childResult,
  transitionResult,
  accepted,
  reason,
  stateFingerprintBefore,
  stateFingerprintAfter
}
```

## Transition policy

The composition layer must define explicit policy for actions with child commands:

```txt
child accepted + target exists -> transition
child accepted + no target -> remain and report accepted
child rejected -> remain and return rejection
missing child domain -> remain and return missing-domain reason
unknown action -> remain and return unknown-action reason
```

No transition should conceal a rejected mutation command.

## Recommendation

Update `interface-composition-kit` and `kit-runtime` first. Keep DOM binding thin. The HTML renderer should consume already-committed interaction/projection state rather than becoming the authority for result handling.