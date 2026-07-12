# Interaction audit: browser input to movement admission

## Current browser bindings

```txt
click [data-action]
  -> interface-composition.activate

click [data-command]
  -> active-session command

available active-session buttons
  -> collect
  -> clear
  -> next-phase

keydown / keyup / blur / pointer direction / touch direction
  -> no adapter
```

## Missing path

```txt
WASD or Arrow key
  -X-> held-control state
  -X-> route/focus admission
  -X-> movement intent
  -X-> active-session.move
  -X-> movement result
```

## Required event map

```txt
keydown
  -> reject browser-repeat duplication through held-state transition
  -> acquire or update a control lease
  -> record binding and sequence

fixed simulation step
  -> read admitted held state
  -> normalize vector
  -> submit movement command once for the step
  -> publish result and consumed input sequence

keyup
  -> release one binding

blur / visibility loss / route exit / outcome / reset / dispose
  -> retire every held binding and lease
```

## Policy

- Bind `WASD` and arrow keys to the same canonical directions.
- Do not scroll the page for admitted arrow-key movement.
- Do not accept movement while typing in an editable control.
- Do not mutate gameplay directly from DOM callbacks.
- Do not use event repeat count as simulation time.
- Touch controls, when added, must produce the same normalized movement intent and result type.

## Observability

Expose only detached control state:

```txt
active bindings
normalized vector
focus status
control lease status
last admitted input sequence
last movement result
last consumed simulation tick
```
