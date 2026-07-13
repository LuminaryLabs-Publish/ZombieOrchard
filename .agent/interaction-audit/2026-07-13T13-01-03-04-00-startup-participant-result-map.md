# Interaction audit: startup participant and result map

**Timestamp:** `2026-07-13T13-01-03-04-00`

## Summary

Startup is currently ambient module evaluation rather than an interaction with explicit input, participants, receipts, and one terminal result. This map defines the command/result chain needed to make startup observable and recoverable.

## Plan ledger

**Goal:** convert startup from side effects into one typed interaction without changing gameplay commands or UI route semantics.

- [x] Identify startup initiator and all participants.
- [x] Identify current untyped side effects.
- [x] Define preparation and adoption receipts.
- [x] Define failure and retry results.
- [ ] Implement the command/result chain and journal.

## Current interaction

```txt
browser module loader
  -> imports boot.js
  -> imports start.js
  -> side effects create every participant
  -> no caller receives a terminal result
```

## Required interaction

```txt
BrowserStartupCommand
  -> DocumentAdmissionResult
  -> DomRequirementResult
  -> KitGraphPreparationResult
  -> EngineCandidateResult
  -> CanvasCandidateResult
  -> HtmlCandidateResult
  -> DiagnosticsCandidateResult
  -> SchedulerCandidateResult
  -> StartupProbeResult
  -> StartupAdoptionResult
  -> StartupReadyResult | StartupFailureResult
  -> FirstStartupFrameAck
```

## Participants

| Participant | Current side effect | Required receipt |
|---|---|---|
| Document | Module evaluation | document/lifecycle generation |
| Engine | Immediate kit installation | manifest and candidate receipt |
| Canvas | Immediate node/context capture | capability and probe receipt |
| HTML | Immediate root/listener capture | listener and projection receipt |
| Diagnostics | Immediate `window.GameHost` exposure | accepted capability receipt |
| Scheduler | Immediate recursive RAF ownership | scheduler-generation receipt |
| Error panel | Declared but unused | fallback projection result |

## Rejection model

```txt
missing node
unsupported context
kit create failure
listener installation failure
probe projection failure
stale document generation
duplicate startup attempt
superseded retry
unload during preparation
```

Every rejection must return one result, mutate no live generation, dispose prepared candidates, and project a fallback when the document remains available.

## Validation boundary

Documentation only. No interaction handlers or public APIs changed.