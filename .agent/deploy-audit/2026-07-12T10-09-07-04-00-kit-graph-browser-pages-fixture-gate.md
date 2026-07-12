# Deploy audit: kit graph browser and Pages fixture gate

**Timestamp:** `2026-07-12T10-09-07-04-00`

## Summary

Current proof checks startup and basic route content but does not validate graph manifests, service bindings, duplicate ownership, deterministic order, rollback, public mutation restrictions or graph-to-frame provenance in browser or deployed Pages builds.

## Plan ledger

**Goal:** define the minimum executable gate required before kit-graph authority can be considered implemented or deployment-safe.

- [x] Identify source-only and runtime proof gaps.
- [x] Define Node, browser, built-artifact and Pages fixtures.
- [x] Define required failure cases and receipts.
- [ ] Implement and run the fixture matrix.

## Required Node fixtures

```txt
kit census equals 19 installed and 27 implemented surfaces
unique kit IDs
unique domain IDs
missing required service rejected
incompatible service version rejected
cyclic dependency rejected
deterministic phase order independent of input order
failed create rolls back all prior acquisitions
explicit replacement retires predecessor exactly once
```

## Required browser fixtures

```txt
raw GameHost.engine.addKit is unavailable
unauthorized graph mutation is rejected
graph observation exposes ID, revision and fingerprint
canvas and HTML receipts cite the same graph revision
stale graph command is rejected
runtime remains usable after rejected candidate
```

## Required built and Pages fixtures

```txt
static build contains expected registry and runtime files
public page boots with expected graph fingerprint
visible canvas and HTML frame cites committed graph revision
rejected mutation does not change visible state
reload reproduces the same graph fingerprint
```

## Gate

Do not claim deployment readiness for dynamic kit installation until every fixture passes on `main` and the deployed Pages artifact reports the same graph fingerprint as the source build.