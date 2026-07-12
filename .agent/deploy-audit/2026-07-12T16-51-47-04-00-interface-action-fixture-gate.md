# Deploy audit: interface action fixture gate

**Timestamp:** `2026-07-12T16-51-47-04-00`

## Summary

Static source checks are not enough for interface-action authority. The deployment gate must exercise the source tree, built `dist`, a browser DOM and the published Pages route with identical commands and expected results.

## Plan ledger

**Goal:** prevent deployment from claiming correct action admission until exact identity, availability, nested results and visible feedback are proven across all shipped surfaces.

- [x] Identify missing source-level fixtures.
- [x] Identify browser DOM and public-host fixtures.
- [x] Identify dist and Pages parity requirements.
- [ ] Implement the gate and wire it into package scripts and Pages CI.

## Required source fixtures

```txt
invalid action ID rejects
missing action ID rejects
activate-selected is separate and revision-bound
generic and active-session lookup semantics match
stale route revision rejects
stale action-set revision rejects
disabled action rejects
nested build rejection propagates
duplicate action command is idempotent
```

## Required browser fixtures

```txt
disabled descriptor renders disabled and aria-disabled
clicking disabled control does not dispatch
invalid public GameHost action does not route
stale action from predecessor route rejects
nested rejection is visible
focus remains on a valid successor control
first result frame cites result revision
```

## Required parity matrix

```txt
src module runtime
built dist runtime
GitHub Pages runtime

same action command
same admission result
same gameplay mutation count
same route result
same visible feedback
same result revision semantics
```

## Gate order

```txt
npm test
  -> action identity fixtures
  -> nested result fixtures
  -> build
  -> dist browser smoke
  -> Pages smoke
  -> publish success
```

## Failure policy

Any fail-open lookup, disabled-affordance mismatch, discarded nested rejection, duplicate effect or source/dist/Pages divergence must fail deployment.

## Non-claim

No fixture or CI gate was implemented or run during this documentation audit.