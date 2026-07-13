# START HERE: ZombieOrchard

**Repository:** `LuminaryLabs-Publish/ZombieOrchard`  
**Branch:** `main`  
**Aligned:** `2026-07-12T22-48-25-04-00`  
**Status:** `runtime-observer-publication-authority-audited`

## Summary

ZombieOrchard is a dependency-free orchard survival and economy shell built from a mutable kit runtime, 12 interface definitions, gameplay services, canvas/HTML projection, diagnostics, Node smoke proof, static build and Pages deployment.

The newest audit isolates runtime observer publication. `notify()` captures one mutable snapshot and synchronously invokes every subscriber. A subscriber can throw after state has committed, mutate the snapshot seen by later subscribers, block the frame, or re-enter `command()`/`tick()` and make later subscribers observe a newer snapshot before the older one.

## Plan ledger

**Goal:** make snapshot publication monotonic, immutable, fault-isolated and non-reentrant so committed simulation and commands cannot be invalidated or reordered by observers.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Select only ZombieOrchard as the oldest eligible entry.
- [x] Trace command, tick, snapshot, subscribe, notify, public host and render-loop behavior.
- [x] Preserve all 27 implemented kit surfaces and their offered services.
- [x] Add timestamped architecture and system audits.
- [x] Refresh required root documents and machine registry.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Runtime isolation and executable observer-order fixtures remain future work.

## Read this run first

```txt
.agent/trackers/2026-07-12T22-48-25-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-12T22-48-25-04-00.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-12T22-48-25-04-00-runtime-observer-publication-dsk-map.md
.agent/render-audit/2026-07-12T22-48-25-04-00-observer-fault-visible-frame-liveness-gap.md
.agent/gameplay-audit/2026-07-12T22-48-25-04-00-command-tick-notify-order-loop.md
.agent/interaction-audit/2026-07-12T22-48-25-04-00-subscribe-notify-reentrancy-map.md
.agent/runtime-observer-audit/2026-07-12T22-48-25-04-00-delivery-order-fault-isolation-contract.md
.agent/deploy-audit/2026-07-12T22-48-25-04-00-observer-publication-fixture-gate.md
```

## Interaction loop

```txt
command or tick
  -> mutate one or more domains
  -> capture one snapshot object
  -> synchronously iterate listeners

listener re-entry
  -> invoke nested command or tick
  -> publish newer snapshot to all listeners
  -> return to predecessor notify
  -> remaining listeners receive the older snapshot

listener failure
  -> committed state remains changed
  -> later listeners are skipped
  -> command or tick throws
  -> browser draw aborts before render and successor RAF
```

## Main findings

```txt
publication ID and monotonic sequence: absent
observer identity and generation: absent
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
