# START HERE: ZombieOrchard

**Repository:** `LuminaryLabs-Publish/ZombieOrchard`  
**Branch:** `main`  
**Aligned:** `2026-07-12T18-48-07-04-00`  
**Status:** `terminal-outcome-seal-authority-audited`

## Summary

ZombieOrchard is a dependency-free orchard survival and economy shell built from a mutable kit runtime, 12 interface definitions, gameplay services, canvas/HTML projection, diagnostics, Node smoke proof, static build and Pages deployment.

The newest audit isolates terminal outcome sealing. `active-session.tick()` stops after failure, but `active-session.command()` still accepts movement, collection, clearing and phase changes. `interface-composition` routes to Outcome, while `window.GameHost.engine` remains able to mutate the supposedly final run. The Outcome screen reads the live score and day, so the visible final summary is not immutable.

## Plan ledger

**Goal:** make terminal failure a one-way, revisioned commit that freezes gameplay mutation, publishes an immutable result and proves the first Outcome frame from that exact terminal generation.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger and root `.agent` coverage.
- [x] Select only ZombieOrchard as the oldest eligible central entry.
- [x] Trace damage, failure, Outcome routing, direct commands, public host access and result projection.
- [x] Identify all domains, all 27 implemented kit surfaces and offered services.
- [x] Confirm tick simulation stops after `ended`.
- [x] Confirm gameplay commands are not rejected after `ended`.
- [x] Confirm Outcome reads mutable active-session score and day.
- [x] Add timestamped architecture and system audits.
- [x] Refresh required root documents and machine registry.
- [x] Synchronize central ledger and change log.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Implement and run terminal-seal and post-terminal mutation fixtures.

## Read this run first

```txt
.agent/trackers/2026-07-12T18-48-07-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-12T18-48-07-04-00.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-12T18-48-07-04-00-terminal-outcome-seal-dsk-map.md
.agent/render-audit/2026-07-12T18-48-07-04-00-outcome-summary-terminal-frame-gap.md
.agent/gameplay-audit/2026-07-12T18-48-07-04-00-failure-outcome-post-terminal-loop.md
.agent/interaction-audit/2026-07-12T18-48-07-04-00-terminal-command-admission-map.md
.agent/terminal-outcome-audit/2026-07-12T18-48-07-04-00-seal-result-revocation-contract.md
.agent/deploy-audit/2026-07-12T18-48-07-04-00-terminal-outcome-fixture-gate.md
```

## Interaction loop

```txt
night simulation
  -> pests approach the player
  -> each pest in contact subtracts condition
  -> condition <= 0 sets ended=true and failure message

next runtime tick
  -> interface-composition observes ended
  -> route moves to outcome
  -> HTML reads current active-session score and day

post-terminal caller
  -> raw GameHost engine can still command active-session
  -> move, collect, clear and next-phase remain accepted
  -> resources, score, player, day and phase can change
  -> Outcome summary reads the changed live state
```

## Main findings

```txt
terminal phase field beyond ended Boolean: absent
terminal result ID and revision: absent
immutable terminal snapshot: absent
post-terminal gameplay command rejection: absent
public capability revocation: absent
route commit and terminal commit atomicity: absent
Outcome summary bound to terminal result: no
first visible Outcome frame acknowledgement: absent
```

Concrete current example:

```txt
failure commits ended=true
  -> Outcome route becomes visible
  -> GameHost.engine.command("active-session", "collect")
  -> orchard apple may be removed and replaced
  -> money, apples and score may increase
  -> Outcome Score changes after failure
```

## Required parent domain

```txt
zombie-orchard-terminal-outcome-seal-authority-domain
```

## Required flow

```txt
terminal predicate
  -> build TerminalOutcomeCandidate
  -> freeze predecessor session, score, day, resources and world revisions
  -> validate one terminal cause and result
  -> atomically commit terminal phase and immutable result
  -> revoke gameplay command capabilities
  -> stop gameplay simulation and economic settlement
  -> route to Outcome using the committed result revision
  -> project the immutable summary
  -> acknowledge the first visible Outcome frame
```

## Guardrails

```txt
Push only to main.
Create no branch or pull request.
Do not work on TheCavalryOfRome.
Do not treat tick suspension as command revocation.
Do not derive final score or day from mutable live session state.
Do not allow post-terminal collect, clear, move or phase commands.
Do not claim terminal correctness until source, dist and Pages fixtures pass.
```
