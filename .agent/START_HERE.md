# START HERE: ZombieOrchard

**Repository:** `LuminaryLabs-Publish/ZombieOrchard`  
**Branch:** `main`  
**Aligned:** `2026-07-12T23-00-53-04-00`  
**Status:** `runtime-observer-publication-authority-central-reconciled`

## Summary

ZombieOrchard is a dependency-free orchard survival and economy shell built from a mutable kit runtime, 12 interface definitions, gameplay services, canvas/HTML projection, diagnostics, Node smoke proof, static build and Pages deployment.

The current audit isolates runtime observer publication. `notify()` captures one mutable snapshot and synchronously invokes every subscriber. A subscriber can throw after state commits, mutate the snapshot seen by later subscribers, block the frame, or re-enter `command()`/`tick()` and make later subscribers observe a successor snapshot before its predecessor.

## Plan ledger

**Goal:** make snapshot publication monotonic, immutable, fault-isolated and non-reentrant while keeping committed mutation results independent from observer delivery.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Select only ZombieOrchard because repo-local observer documentation was newer than central state.
- [x] Trace command, tick, snapshot, subscribe, notify, host and render-loop behavior.
- [x] Preserve all 27 implemented kit surfaces and their services.
- [x] Add timestamped reconciliation audits.
- [x] Refresh required root documents and machine registry.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Runtime isolation and executable observer-order fixtures remain future work.

## Read this run first

```txt
.agent/trackers/2026-07-12T23-00-53-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-12T23-00-53-04-00.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-12T23-00-53-04-00-runtime-observer-publication-central-reconciliation-dsk-map.md
.agent/render-audit/2026-07-12T23-00-53-04-00-observer-publication-visible-frame-central-reconciliation.md
.agent/gameplay-audit/2026-07-12T23-00-53-04-00-command-tick-publication-central-reconciliation.md
.agent/interaction-audit/2026-07-12T23-00-53-04-00-commit-publication-delivery-result-map.md
.agent/runtime-observer-audit/2026-07-12T23-00-53-04-00-central-ledger-reconciliation.md
.agent/deploy-audit/2026-07-12T23-00-53-04-00-observer-publication-central-sync-gate.md
```

The deeper technical audit remains under the `2026-07-12T22-48-25-04-00` audit family.

## Interaction loop

```txt
command or tick
  -> mutate one or more domains
  -> capture one snapshot object
  -> synchronously iterate listeners

listener re-entry
  -> invoke nested command or tick
  -> publish successor snapshot to all listeners
  -> return to predecessor notify
  -> remaining listeners receive the older snapshot

listener failure
  -> committed state remains changed
  -> later listeners are skipped
  -> command or tick throws
  -> browser draw can abort before render and successor RAF
```

## Main findings

```txt
publication ID and monotonic sequence: absent
observer identity, generation and cursor: absent
immutable per-delivery snapshot: absent
reentrancy fence or delivery queue: absent
fault isolation and typed delivery result: absent
delivery time/backpressure budget: absent
committed-result delivery receipt: absent
first visible publication-frame acknowledgement: absent
```

## Required parent domain

`zombie-orchard-runtime-observer-publication-authority-domain`

## Guardrails

- Commit domain state before publication, but never let observer failure erase the committed result.
- Deliver snapshot sequences monotonically and never nest publication.
- Give observers read-only envelopes, not a shared mutable projection.
- Continue delivery after one observer fails and journal the failure.
- Do not claim frame-loop liveness or observation consistency until source, dist and Pages fixtures pass.