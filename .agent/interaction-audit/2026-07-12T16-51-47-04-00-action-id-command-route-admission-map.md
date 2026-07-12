# Interaction audit: action ID, command and route admission map

**Timestamp:** `2026-07-12T16-51-47-04-00`

## Summary

The same interface command surface accepts delegated DOM clicks and arbitrary public callers, but it does not bind action identity to the current route or action-set revision. Generic domains reinterpret invalid IDs through selection fallback.

## Plan ledger

**Goal:** define one admission map for visible clicks, selected activation and public action commands.

- [x] Map delegated HTML click admission.
- [x] Map public raw-engine admission.
- [x] Compare generic and active-session lookup semantics.
- [x] Identify missing route, action-set and descriptor evidence.
- [ ] Implement typed rejection and stale-command fixtures.

## Callers

```txt
HTML delegated click
  -> data-action string
  -> interface-composition.activate

public GameHost caller
  -> arbitrary payload
  -> interface-composition.activate

future keyboard/controller selection
  -> should use explicit activate-selected command
```

## Current admission

```txt
composition domain exists: checked by runtime
current route domain exists: assumed
payload schema: not validated
action ID presence: not required
exact action match: attempted
fallback to selection: yes in generic domains
current route revision: not checked
action-set revision: not checked
action fingerprint: not checked
command ID/duplicate: not checked
availability projection parity: not checked
```

## Failure map

```txt
invalid Entry id
  -> exact lookup misses
  -> selectedIndex 0 resolves Play
  -> route changes to active-session

stale id from previous route
  -> current route exact lookup may miss
  -> current selected action may execute

missing id
  -> same selected fallback

disabled id
  -> domain rejects, but visible button remains enabled
```

## Required admission result

```txt
accepted
unknown-action
missing-action-id
disabled-action
stale-route
stale-action-set
stale-descriptor
duplicate-command
nested-command-rejected
route-transition-rejected
```

## Required separation

```txt
activate-by-id
  -> exact descriptor only

activate-selected
  -> explicit selection revision
  -> current selected descriptor only
```

## Non-claim

No input or command behavior changed.