# Interaction audit: focus-preserving interface commit map

**Timestamp:** `2026-07-12T07-51-04-04-00`  
**Repository:** `LuminaryLabs-Publish/ZombieOrchard`

## Summary

Click handling is delegated to the stable root, but keyboard interaction depends on descendant node identity. The current renderer destroys those nodes every frame and has no focus lease, action-key continuity or route-transition focus policy.

## Plan ledger

**Goal:** preserve the user's interaction target across accepted UI updates and make every intentional focus move explicit.

- [x] Map click event delegation.
- [x] Map action IDs and route transitions.
- [x] Confirm descendant replacement occurs after every tick.
- [x] Define focus capture, restoration and transition results.
- [ ] Execute keyboard and assistive-technology fixtures.

## Current interaction map

```txt
click
  -> stable root listener
  -> closest [data-action] / [data-command]
  -> engine command
  -> next RAF rebuilds the complete subtree

keyboard
  -> focus descendant button
  -> next RAF removes descendant
  -> no stable node or restoration operation
  -> next Enter/Space target is not authoritative
```

## Required admission map

```txt
InterfaceProjectionCommand
  -> validate route and projection generations
  -> capture focused action/command identity
  -> prepare keyed successor nodes
  -> reject stale route plan
  -> commit
  -> if prior target still exists, restore it
  -> otherwise apply named route focus policy
  -> publish FocusTransitionResult
```

## Required results

```txt
preserved
restored
moved-to-route-default
cleared-by-policy
unavailable
stale
failed
```
