# Deploy audit: terminal outcome fixture gate

**Timestamp:** `2026-07-12T18-48-07-04-00`

## Summary

Static source checks cannot prove terminal sealing. Deployment must exercise failure, result commit, command revocation and immutable Outcome projection across source, built and published surfaces.

## Plan ledger

**Goal:** prevent deployment from claiming a stable final result while post-terminal mutation or summary drift remains possible.

- [x] Identify source-level terminal fixtures.
- [x] Identify browser and public-host fixtures.
- [x] Identify dist and Pages parity requirements.
- [ ] Implement the gate and wire it into package scripts and Pages CI.

## Required source fixtures

```txt
one lethal threshold -> one terminal result
multiple lethal contacts -> one terminal result
duplicate terminal candidate -> stable replay
post-terminal move rejected
post-terminal collect rejected
post-terminal clear rejected
post-terminal next-phase rejected
post-terminal build/hire/equip rejected
all rejected commands leave all participant snapshots unchanged
```

## Required browser fixtures

```txt
Outcome appears only after accepted terminal result
Outcome score/day match frozen summary
raw GameHost post-terminal command rejects
later RAF ticks do not alter summary
canvas and HTML cite same terminal revision
first visible Outcome frame receipt exists
```

## Required parity matrix

```txt
src module runtime
built dist runtime
GitHub Pages runtime

same terminal cause
same terminal result fingerprint
same rejected-command results
same immutable Outcome summary
same first-frame revision semantics
```

## Gate order

```txt
npm test
  -> terminal source fixtures
  -> build
  -> dist browser smoke
  -> public GameHost terminal smoke
  -> Pages terminal smoke
  -> publish success
```

## Failure policy

Any second terminal commit, accepted post-terminal mutation, live-summary drift, missing capability revocation or source/dist/Pages divergence must fail deployment.

## Non-claim

No fixture or CI gate was implemented or run during this documentation audit.
