# START HERE: ZombieOrchard

**Repository:** `LuminaryLabs-Publish/ZombieOrchard`  
**Branch:** `main`  
**Aligned:** `2026-07-12T14-38-35-04-00`  
**Status:** `run-reset-generation-authority-audited`

## Summary

ZombieOrchard is a dependency-free orchard survival and economy shell built from a mutable kit runtime, 12 interface definitions, gameplay services, canvas/HTML projection, diagnostics, Node smoke proof, static build and Pages deployment.

The newest audit isolates run reset and restart authority. Play, New Game, Start and Title currently change only the active interface route. Every gameplay domain is created once at module boot, so a supposed New Game retains predecessor resources, pressure, apples, builds, actors, inventory, score, player condition and terminal state. After failure, later Play or Start reaches the same `ended` session and the next tick immediately routes back to Outcome.

## Plan ledger

**Goal:** require new-run and restart intent to create one clean, revisioned run generation across every mutable participant before the route and visible frame advance.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger and root `.agent` coverage.
- [x] Select only ZombieOrchard as the oldest eligible synchronized entry.
- [x] Trace Play, New Game, Start, Resume, Title and terminal Outcome flows.
- [x] Identify all domains, all 27 implemented kit surfaces and offered services.
- [x] Confirm no run ID, generation, reset command or participant reset contract exists.
- [x] Confirm terminal and partial predecessor state survives route changes.
- [x] Add timestamped architecture and system audits.
- [x] Refresh required root documents and machine registry.
- [x] Synchronize central ledger and change log.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Implement and run clean-reset and restart fixtures.

## Read this run first

```txt
.agent/trackers/2026-07-12T14-38-35-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-12T14-38-35-04-00.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-12T14-38-35-04-00-run-reset-generation-dsk-map.md
.agent/render-audit/2026-07-12T14-38-35-04-00-reset-generation-visible-frame-gap.md
.agent/gameplay-audit/2026-07-12T14-38-35-04-00-new-game-reuses-ended-session-loop.md
.agent/interaction-audit/2026-07-12T14-38-35-04-00-play-new-start-reset-admission-map.md
.agent/run-reset-audit/2026-07-12T14-38-35-04-00-participant-reset-atomic-commit-contract.md
.agent/deploy-audit/2026-07-12T14-38-35-04-00-run-reset-restart-fixture-gate.md
```

## Interaction loop

```txt
module boot creates one mutable domain graph
  -> Entry Play or New Game -> Start changes route
  -> run mutates resource, world, construction, roster, inventory and active-session state
  -> Pause/Outcome Title changes route to Entry only
  -> later Play/Start reuses predecessor state
  -> if predecessor ended=true, next composition tick returns to Outcome
```

## Main findings

```txt
Play creates a run: no
New Game creates or resets a run: no
Start creates or resets a run: no
Title resets participant state: no
run ID/generation/revision: absent
participant reset contract: absent
atomic candidate commit/rollback: absent
stale predecessor command rejection: absent
first visible reset-generation acknowledgement: absent
```

## Required parent domain

```txt
zombie-orchard-run-reset-generation-authority-domain
```

## Required flow

```txt
StartRunCommand or ResetRunCommand
  -> session, route and predecessor-revision admission
  -> authored preset and reset-policy resolution
  -> candidate run ID, generation and seed allocation
  -> clean candidate state for every mutable participant
  -> cross-domain invariant validation
  -> atomic successor install or full rollback
  -> predecessor retirement and stale-command fencing
  -> typed result and participant reset receipts
  -> first canvas and HTML frame acknowledgement
```

## Guardrails

```txt
Push only to main.
Create no branch or pull request.
Do not work on TheCavalryOfRome.
Do not implement reset as sequential live-domain mutations.
Do not treat route transition as run creation.
Do not claim restart correctness until source, dist and Pages fixtures pass.
```