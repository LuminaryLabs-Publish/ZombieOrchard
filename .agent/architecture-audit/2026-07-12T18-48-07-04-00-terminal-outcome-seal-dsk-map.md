# Architecture audit: terminal outcome seal DSK map

**Timestamp:** `2026-07-12T18-48-07-04-00`

## Summary

The current `ended` Boolean is local state, not a composed terminal authority. Terminal predicate evaluation, result capture, participant freezing, command revocation, route transition and frame acknowledgement need one parent DSK.

## Plan ledger

**Goal:** define bounded ownership so failure becomes one deterministic, observable and irreversible run transition.

- [x] Map current owners.
- [x] Identify split terminal responsibilities.
- [x] Define the parent domain and candidate kits.
- [x] Define dependency and commit order.
- [ ] Implement the domain.

## Current ownership

```txt
active-session
  owns condition, pests, score, day, phase, message and ended

interface-composition
  owns active route and observes ended later

resource-ledger
  remains independently mutable

orchard-world
  remains independently mutable

HTML renderer
  derives Outcome from live active-session state

GameHost
  exposes raw direct commands
```

## Required parent domain

```txt
zombie-orchard-terminal-outcome-seal-authority-domain
```

## Subdomain map

```txt
terminal identity
  terminal-outcome-id-kit
  terminal-cause-kit
  terminal-outcome-revision-kit

terminal evidence
  terminal-predicate-evidence-kit
  terminal-participant-revision-kit
  terminal-outcome-candidate-kit

admission
  terminal-outcome-admission-kit
  duplicate-terminal-rejection-kit
  stale-terminal-rejection-kit

commit
  terminal-state-seal-kit
  terminal-participant-freeze-kit
  terminal-outcome-result-kit
  terminal-route-commit-kit

capability lifecycle
  terminal-capability-lease-kit
  terminal-command-revocation-kit
  post-terminal-rejection-kit

observation and projection
  terminal-outcome-read-model-kit
  terminal-outcome-observation-kit
  terminal-outcome-journal-kit
  terminal-outcome-projection-kit
  first-terminal-frame-ack-kit
```

## Required command and result

```txt
TerminalOutcomeCandidate
  candidateId
  sessionId
  runGeneration
  expectedGameplayRevision
  cause
  predicateEvidence
  participantRevisions
  proposedSummaryFingerprint

TerminalOutcomeResult
  terminalOutcomeId
  terminalRevision
  status
  cause
  frozenSummary
  participantFreezeReceipts
  revokedCapabilityRevision
  outcomeRouteRevision
  firstVisibleFrameId
```

## Commit order

```txt
1. evaluate deterministic terminal predicate
2. freeze expected participant revisions
3. build detached immutable summary
4. validate no predecessor terminal result
5. validate candidate freshness
6. commit terminal phase and result
7. revoke gameplay and economy capabilities
8. commit Outcome route from result ID
9. publish result and journal row
10. project and acknowledge first visible frame
```

## Invariants

```txt
one run generation has at most one accepted terminal result
accepted terminal result never changes
post-terminal gameplay/economy commands never mutate
Outcome route references an accepted terminal result
Outcome score and day come from frozen summary
duplicate candidates replay the same terminal result
first visible Outcome frame cites terminal revision
```
