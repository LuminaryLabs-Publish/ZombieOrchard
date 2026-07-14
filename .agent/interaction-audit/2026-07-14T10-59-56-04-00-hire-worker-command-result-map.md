# Interaction audit: HireWorker command/result map

**Timestamp:** `2026-07-14T10-59-56-04-00`

## Summary

The roster route is read-only, while the browser-global host exposes a raw mutation path. The interaction model needs an authored Hire action and typed terminal results rather than caller-controlled command payloads and a generic accepted flag.

## Plan ledger

**Goal:** route every hire request through one command identity, admission policy and typed result.

- [x] Trace browser and raw-host interaction paths.
- [x] Identify missing result classes.
- [x] Define successor interaction flow.
- [ ] Implement route-safe commands and observable results.

## Current map

```txt
Roster button
  -> interface-composition.activate
  -> route = roster
  -> cards + Back
  -> no Hire action

raw host
  -> engine.command("roster-runtime", "hire", payload)
  -> generic { accepted: true|false }
  -> no command ID
  -> no expected revision
  -> no reason taxonomy
  -> no settlement receipts
```

## Required command

```txt
HireWorkerCommand {
  commandId,
  runGeneration,
  expectedRosterRevision,
  expectedResourceRevision,
  offerId,
  roleId,
  displayName
}
```

## Required result classes

```txt
accepted
unknown-offer
unknown-role
invalid-name
unsafe-name
invalid-cost
insufficient-resources
roster-full
duplicate-command
stale-roster
stale-resource-revision
wrong-route
retired-run
participant-prepare-failed
participant-commit-failed
rolled-back
superseded
```

## Required interaction path

```txt
roster route
  -> render authored offers and role capabilities
  -> player activates Hire
  -> interface composition publishes HireWorkerCommand
  -> authority returns HireWorkerResult
  -> accepted result updates roster, gameplay and projections together
  -> rejected result preserves all predecessors and shows a safe message
```

## Public-host rule

`GameHost` may expose immutable diagnostics and an admitted command surface, but it must not expose unrestricted domain mutation that bypasses offer, route, revision and lifecycle policy.