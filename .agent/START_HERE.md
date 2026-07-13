# START HERE: ZombieOrchard

**Repository:** `LuminaryLabs-Publish/ZombieOrchard`  
**Branch:** `main`  
**Aligned:** `2026-07-13T01-18-20-04-00`  
**Status:** `runtime-event-lifecycle-publication-authority-audited`  
**Retained status:** `runtime-observer-publication-authority-central-reconciled`

## Summary

ZombieOrchard is a dependency-free orchard survival and economy shell built from a mutable kit runtime, 12 interface definitions, gameplay services, canvas/HTML projection, diagnostics, Node smoke proof, static build and Pages deployment.

The current audit isolates the runtime event lifecycle. Interface commands emit records into `ctx.events`, but snapshots, subscribers, renderers and `GameHost.getState()` never receive that buffer. Command events accumulate until the next tick, where `ctx.events.length = 0` erases them before rendering. The only direct readback is the mutable raw engine context exposed through `window.GameHost.engine`.

## Plan ledger

**Goal:** make emitted events immutable, ordered, causally linked, retained under an explicit policy and consumable through the same committed publication used by diagnostics and visible frames.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Select only ZombieOrchard as the oldest eligible documented repository.
- [x] Trace event creation, command publication, tick clearing, snapshots, subscribers, renderers and public diagnostics.
- [x] Preserve all 27 implemented kit surfaces and their services.
- [x] Add a timestamped tracker, turn ledger and event-lifecycle audit family.
- [x] Refresh all required root `.agent` documents and machine registry.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Runtime event authority and executable event-retention fixtures remain future work.

## Read this run first

```txt
.agent/trackers/2026-07-13T01-18-20-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-13T01-18-20-04-00.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-13T01-18-20-04-00-runtime-event-lifecycle-dsk-map.md
.agent/render-audit/2026-07-13T01-18-20-04-00-command-event-visible-frame-gap.md
.agent/gameplay-audit/2026-07-13T01-18-20-04-00-interface-event-loss-loop.md
.agent/interaction-audit/2026-07-13T01-18-20-04-00-event-emit-publish-consume-map.md
.agent/event-lifecycle-audit/2026-07-13T01-18-20-04-00-command-tick-event-retention-contract.md
.agent/deploy-audit/2026-07-13T01-18-20-04-00-event-lifecycle-fixture-gate.md
```

## Interaction loop

```txt
browser interaction
  -> delegated click calls engine.command(...)
  -> scoped interface domain may call ctx.emit(...)
  -> command mutates domain state
  -> runtime notify publishes only domain snapshots

between commands
  -> emitted records accumulate in mutable ctx.events
  -> records share the current frame and elapsed values
  -> no event ID, sequence, command ID or consumer cursor exists

next RAF
  -> engine.tick(1 / 60)
  -> ctx.events.length = 0 before domain ticks
  -> command-originated events are erased
  -> renderers receive engine.snapshot(), which never contains ctx.events

public diagnostics
  -> GameHost.getState() returns only engine.snapshot()
  -> raw GameHost.engine.ctx.events is the only direct event readback
  -> external code can mutate or clear the live buffer
```

## Main findings

```txt
event identity and sequence: absent
command/tick correlation: absent
immutable payload boundary: absent
event range in snapshots: absent
consumer identity and cursor: absent
retention and overflow policy: absent
acknowledgement or dead-letter result: absent
event-aware public readback: absent
first visible event-frame acknowledgement: absent
```

## Required parent domain

`zombie-orchard-runtime-event-lifecycle-publication-authority-domain`

## Guardrails

- Do not expose the mutable live event array as the event API.
- Do not clear command events before every intended consumer has an explicit retention outcome.
- Do not infer ordering only from array position, frame or elapsed time.
- Keep command/tick results independent from event delivery failures.
- Do not claim event delivery, retention or visible-effect parity until source, dist and Pages fixtures pass.
