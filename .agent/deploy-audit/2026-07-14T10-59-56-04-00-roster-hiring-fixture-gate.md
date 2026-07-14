# Deploy audit: roster hiring fixture gate

**Timestamp:** `2026-07-14T10-59-56-04-00`

## Summary

Current proof checks Entry, Play and apple presence only. The static build copies files without executing them, so source, built output and Pages can all publish while unsafe roster settlement remains untested.

## Plan ledger

**Goal:** block roster-hiring claims until deterministic source, browser, built-output and Pages fixtures agree.

- [x] Inspect package scripts and smoke scope.
- [x] Identify missing fault and parity cases.
- [x] Define the required fixture gate.
- [ ] Implement and run the fixture matrix.

## Existing proof

```txt
npm test
  -> create game
  -> assert Entry
  -> activate Play
  -> tick once
  -> assert active-session
  -> assert apples exist

npm run build
  -> copy index.html and src into dist
```

No current command exercises roster navigation, hiring, cost validation, identity safety, gameplay adoption, rollback or visible-frame proof.

## Required source fixtures

```txt
valid authored offer settles exact positive cost
negative cost rejected with zero mutation
non-numeric cost rejected with zero mutation
unknown offer and role rejected
unsafe or overlong name rejected or safely normalized
roster capacity enforced
duplicate command settles once
stale roster or resource revision rejected
retired run rejected
worker effect adopted exactly once
participant preparation failure preserves predecessor
commit failure rolls back every participant
```

## Required browser fixtures

```txt
Roster route exposes authored Hire action
accepted hire shows safe roster card
HUD shows matching worker revision
Canvas2D shows worker or labor indicator
unsafe name cannot create markup or executable content
rejected hire shows typed safe feedback
FirstVisibleRosterFrameAck matches accepted revision
```

## Required artifact parity

```txt
source fixture result
  == dist fixture result
  == GitHub Pages fixture result
```

The gate must record source revision, build revision, run generation, command ID, roster revision, resource revision, worker-effect revision and first visible-frame acknowledgement.