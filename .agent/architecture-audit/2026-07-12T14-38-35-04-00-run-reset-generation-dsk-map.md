# Architecture audit: run reset generation DSK map

**Timestamp:** `2026-07-12T14-38-35-04-00`

## Summary

The repository has route transitions but no run lifecycle aggregate. A true reset must coordinate every mutable participant instead of changing `interface-composition.active` while retaining predecessor objects.

## Plan ledger

**Goal:** define a parent DSK that owns clean run creation, participant reset, atomic commit, predecessor retirement and first-frame proof.

- [x] Map current domain construction and route transitions.
- [x] Inventory all mutable reset participants.
- [x] Identify missing run identity, generation and reset result.
- [x] Define candidate construction and validation.
- [x] Define atomic commit and rollback.
- [x] Define predecessor retirement and stale-command rejection.
- [x] Define observation and visible-frame proof.
- [ ] Implement the DSK and fixtures.

## Existing domain graph

```txt
kit-runtime
  -> resource-ledger
  -> pressure-field
  -> orchard-world
  -> construction-runtime
  -> roster-runtime
  -> inventory-runtime
  -> 11 scoped interface domains
  -> active-session
  -> interface-composition
```

Every node is created once in `createOrchardGame()`. The graph has no run owner above these participants.

## Mutable reset participants

```txt
resource-ledger.values + last
pressure-field.channels
orchard-world apples and generated IDs
construction-runtime.built + message
roster-runtime.actors + message
inventory-runtime.items + equipped
active-session day, phase, player, pests, score, message and ended
scoped interface selectedIndex and fields
interface-composition active and previous
runtime elapsed, frame and event state when reset policy requires it
```

## Required parent domain

```txt
zombie-orchard-run-reset-generation-authority-domain
```

## Bounded subdomains

```txt
run identity and generation
run preset and initial-state policy
run participant registry
candidate participant construction
candidate invariant validation
atomic graph/state commit
predecessor retirement
stale run command rejection
reset result and participant receipts
run observation and journal
visible reset-generation acknowledgement
```

## Candidate kits

```txt
run-id-kit
run-generation-kit
run-preset-id-kit
run-reset-command-kit
run-reset-command-id-kit
run-reset-policy-kit
run-reset-admission-kit
run-predecessor-revision-kit
run-seed-allocation-kit
run-participant-registry-kit
run-participant-reset-contract-kit
run-candidate-state-kit
run-candidate-validation-kit
run-reset-commit-kit
run-reset-rollback-kit
run-predecessor-retirement-kit
stale-run-command-rejection-kit
run-reset-result-kit
run-participant-reset-receipt-kit
run-observation-kit
run-reset-journal-kit
first-run-generation-frame-ack-kit
```

## Required invariant

A successful reset installs one complete generation. No observer may see a mixture such as a new active session with predecessor resources, old apples, old builds or an old ended flag.

## Required transaction

```txt
ResetRunCommand
  -> validate command/session/route/predecessor revision
  -> resolve authored preset and reset policy
  -> allocate candidate run ID, generation and deterministic seed
  -> construct all participant candidate states off the live graph
  -> validate cross-domain invariants
  -> atomically install the candidate generation
  -> retire predecessor leases and stale commands
  -> return RunResetResult with participant receipts
  -> publish one generation-bound read model
  -> acknowledge first matching canvas and HTML frame
```

## Dependency relationship

```txt
kit graph installation authority
  -> runtime session authority
  -> run reset generation authority
  -> route/input/economy transaction authorities
  -> frame publication and render proof
  -> persistence/replay continuation
```

## Non-claim

This audit defines architecture only. No reset implementation, clean-state guarantee or runtime fixture exists yet.