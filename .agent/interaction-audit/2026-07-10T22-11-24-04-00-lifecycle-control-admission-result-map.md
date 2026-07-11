# Interaction audit — Lifecycle control admission and result map

Timestamp: `2026-07-10T22-11-24-04-00`

## Current control path

```txt
button[data-action]
  -> delegated root click listener
  -> engine.command(interface-composition, activate, actionId)
  -> current screen activate
  -> action descriptor
  -> optional child command
  -> optional screen move
```

The interaction layer has no lifecycle command vocabulary. Labels that imply lifecycle behavior are ordinary navigation descriptors.

## Current map

| User control | Action ID | Current owner | Current result | Missing authority |
| --- | --- | --- | --- | --- |
| Play | `entry.play` | interface composition | screen moved | session start/admission |
| New Game | `entry.new`, `run-setup.start` | interface composition | screen moved twice | reset plus new session commit |
| Pause | `active-session.pause` | interface composition | screen moved | tick eligibility change |
| Resume | `interrupt.resume` | interface composition | screen moved | lifecycle resume result |
| Title | `interrupt.title`, `outcome.title` | interface composition | screen moved | stop/retire policy |
| Outcome | automatic | composition tick | screen moved | one-shot ended transition |
| Stop | none | none | none | RAF and session stop |
| Dispose | none | none | none | listener, renderer, runtime release |

## Nested-result issue

When an action descriptor contains a child command, interface composition invokes `ctx.engine.command(...)` but discards the child result. The parent then returns a generic navigation result. Lifecycle controls must not use this pattern because admission, reset, failure, and rollback outcomes must be preserved.

## Required lifecycle intents

```txt
session.start
session.reset
session.pause
session.resume
session.end
session.stop
session.dispose
session.return-to-title
```

## Required result reasons

```txt
accepted
already-running
already-paused
no-active-session
invalid-transition
candidate-invalid
reset-failed
retirement-failed
disposed
automatic-clock-owned
```

## Required adapter behavior

1. UI actions emit lifecycle intent, not direct screen destinations.
2. Session authority decides whether the intent is admissible.
3. A successful lifecycle commit returns the authoritative next state and epoch.
4. Interface composition derives the next screen from the lifecycle result.
5. Rejected lifecycle intents do not alter the screen or session.
6. Child command results are retained and projected.
7. Disabled lifecycle actions render with actual disabled controls.
8. GameHost exposes bounded detached lifecycle result rows.

## Compatibility rule

Existing action IDs may remain as presentation-facing compatibility aliases, but they should adapt into canonical lifecycle intents and return the canonical result unchanged.