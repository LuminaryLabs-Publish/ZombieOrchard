# Interaction audit — Screen transition and session command map

**Timestamp:** `2026-07-10T18-49-54-04-00`

## Current map

| User intent | Current action | Gameplay consequence |
| --- | --- | --- |
| Play | `entry -> active-session` | reuses already-running singleton state |
| New Game | `entry -> run-setup -> active-session` | no reset or new session |
| Pause | `active-session -> interrupt` | gameplay continues ticking |
| Resume | `interrupt -> active-session` | screen-only transition |
| Title from Pause | `interrupt -> entry` | gameplay continues behind Entry |
| Build | `active-session -> construction` | gameplay continues behind Build |
| Market | `active-session -> exchange` | gameplay continues behind Market |
| Roster | `active-session -> roster` | gameplay continues behind Roster |
| Inventory | `active-session -> inventory` | gameplay continues behind Inventory |
| Codex | `active-session -> knowledge` | gameplay continues behind Codex |
| Outcome Title | `outcome -> entry` | next tick returns to Outcome |
| GameHost tick | direct `engine.tick(dt)` | extra live mutation beside RAF loop |

## Nested action result issue

`interface-composition.activate` executes an optional child command but discards its result. A parent activation can report accepted even when the child command rejects. Lifecycle commands must not repeat this pattern.

## Required interaction flow

```txt
user intent
  -> activationId
  -> lifecycle preflight
  -> lifecycle command result
  -> optional gameplay command result
  -> transition decision
  -> committed session/screen projection
```

## Transition policy

```txt
Play
  idle/stopped -> start -> active-session
  paused       -> resume -> active-session
  ended        -> explicit policy, never silent reuse

New Game
  any non-disposed state -> reset/start transaction -> active-session

Pause
  running -> pause -> interrupt

Resume
  paused -> resume -> active-session

Title
  running/paused/ended -> stop or reset according to policy -> entry

Outcome
  entered only from a committed ended-session result
```

## Required reasons

```txt
started
resumed
reset-and-started
paused
stopped-for-title
already-running
already-paused
no-session
ended-session-requires-reset
disposed
transition-denied
child-command-rejected
```

## Proof requirements

- Screen transition occurs only after accepted lifecycle result.
- Rejected lifecycle result preserves both gameplay and screen fingerprints.
- Parent results retain exact child results.
- Activation, lifecycle, command, transition, and render rows share correlation IDs.
- Manual GameHost interaction cannot bypass lifecycle policy.

## Next safe ledge

```txt
ZombieOrchard Runtime Session Clock and Lifecycle Authority
+ Pause/Reset/Refresh-Rate Fixture Gate
```