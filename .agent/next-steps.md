# Next steps — ZombieOrchard

**Timestamp:** `2026-07-12T04-38-12-04-00`

## Summary

Preserve runtime-session, clock, route, input, capability, and transaction boundaries, then make publication and rendering fault-contained. A committed command result must not be rewritten by an observer exception, and a subscriber or renderer failure must produce an explicit cycle result instead of silently terminating the RAF chain.

## Plan ledger

**Goal:** add deterministic post-commit delivery and render-stage handling without hiding critical simulation failures or allowing stale observers to control loop liveness.

- [ ] Preserve runtime session and callback generation fencing.
- [ ] Preserve fixed-step writer and route-step admission.
- [ ] Preserve public capability and composite transaction boundaries.
- [ ] Add monotonically increasing frame-cycle and publication IDs.
- [ ] Create one detached snapshot per committed publication cycle.
- [ ] Replace raw listeners with identified observer leases.
- [ ] Invoke observers independently and collect typed delivery results.
- [ ] Define quarantine/revocation policy for repeated observer failures.
- [ ] Return committed command results independently of delivery failures.
- [ ] Add typed world-render and HTML-render stage results.
- [ ] Classify complete, partial, failed, recovery, and stopped frame cycles.
- [ ] Move successor scheduling into an explicit finalization stage.
- [ ] Add bounded fault journal and detached observation.
- [ ] Acknowledge visible frames only after required surfaces commit.
- [ ] Add source, built-artifact, browser, and Pages fault fixtures.

## Immediate safe ledge

1. Wrap listener invocation in a delivery adapter that never throws into the command/tick caller.
2. Assign observer IDs and return revocable leases.
3. Preserve the original command result and attach a separate publication summary.
4. Wrap world and HTML renderers in independently typed stage results.
5. Schedule the successor cycle from `finally` or transition to an explicit stopped/faulted state.
6. Add subscriber-throw and renderer-throw fixtures before introducing automatic recovery.
7. Keep critical simulation-stage failure separate from recoverable observer/render failure.

## Required runtime flow

```txt
committed command or step
  -> commandCommitRevision / stepRevision
  -> one detached snapshot
  -> publicationCycleId
  -> observer deliveries
       -> accepted
       -> failed and isolated
       -> quarantined/revoked by policy
  -> world render stage
  -> HTML render stage
  -> frame-cycle classification
  -> schedule successor or commit explicit stop
  -> bounded fault observation
  -> visible-frame receipt when required surfaces succeed
```

## Full implementation sequence

1. Add frame-cycle and publication identity modules.
2. Replace `Set<Function>` with an observer registry carrying IDs, generations, and leases.
3. Add detached snapshot construction at the publication barrier.
4. Add per-observer try/catch and typed delivery results.
5. Add observer failure counts and explicit quarantine policy.
6. Ensure `engine.command()` returns the domain/transaction result even when publication has failures.
7. Add a publication summary to command and step observations without mutating the original result meaning.
8. Wrap `world.render()` and `ui.render()` with typed stage adapters.
9. Define required versus optional render surfaces.
10. Add frame-cycle classification and visible-frame receipt.
11. Move next-frame scheduling into explicit finalization.
12. Add recovery generation and restart policy for recoverable render faults.
13. Route critical tick failures into explicit FAULTED/STOPPED lifecycle state.
14. Add bounded fault journal and public read model.
15. Add pure and browser fixtures before claiming recovery.

## Target files

```txt
src/kits/runtime.js
src/start.js
src/renderer/world-canvas.js
src/renderer/html-interface-renderer.js
src/runtime/observer-registry.js
src/runtime/publication-cycle.js
src/runtime/frame-cycle.js
src/runtime/frame-fault-policy.js
tests/observer-delivery.fixture.mjs
tests/command-publication-result.fixture.mjs
tests/frame-cycle-liveness.fixture.mjs
scripts/smoke-frame-fault-recovery.mjs
package.json
```

## Policy decisions

```txt
Are world and HTML surfaces both required for a committed visible frame?
Does one observer failure trigger immediate revocation or a bounded threshold?
Can a failed HTML frame continue rendering the world canvas?
Can a failed world frame continue rendering route UI?
Which failures are recoverable without rebuilding the runtime session?
Which failures must transition the runtime to FAULTED or STOPPED?
How is a recovery generation exposed to diagnostics?
How many fault records are retained?
```

## Required fixtures

```txt
accepted-command + throwing observer -> command remains committed and result returns
throwing first observer -> later observers still receive one snapshot
observer failure -> typed delivery result with observer ID
repeated observer failure -> deterministic quarantine/revocation
throwing observer during RAF -> next cycle remains scheduled or explicit stop result exists
world renderer throw -> HTML policy result and successor-cycle result are deterministic
HTML renderer throw -> world result remains observable
both renderers throw -> explicit failed cycle, no false visible-frame receipt
critical tick throw -> explicit FAULTED/STOPPED result, no silent continuation
recovery generation rejects stale callbacks
visible frame cites publicationCycleId and committed state revision
source/built/browser/Pages behavior parity
```

## Dependency order

```txt
runtime session
  -> fixed-step clock
  -> route and input admission
  -> public capability gateway
  -> composite command transaction
  -> frame-publication fault containment
  -> replay and persistence
```

## Do not claim

Do not claim observer isolation, command-result preservation, automatic recovery, frame-loop liveness, or publication-to-visible-frame parity until the corresponding fixtures pass on `main`.
