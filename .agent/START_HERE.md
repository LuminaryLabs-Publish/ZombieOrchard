# START HERE: ZombieOrchard

## Last aligned

```txt
2026-07-11T12-01-38-04-00
```

## Summary

`ZombieOrchard` is a dependency-free static orchard survival and economy shell built from a small kit runtime, 12 interface domains, gameplay services, canvas and HTML projection, diagnostics, smoke proof, a static build and Pages deployment. The current audit establishes the missing fixed-step clock authority: the browser advances exactly one `1/60` simulation step per animation frame, so simulation speed follows display cadence, background throttling, manual `GameHost.tick()` calls and RAF timing rather than one authoritative clock.

## Plan ledger

**Goal:** give every orchard session one monotonic simulation clock so 30, 60 and 120 Hz rendering, pause, background stalls and debug stepping produce explicit, testable results.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have a central ledger and root `.agent` state.
- [x] Select only `ZombieOrchard` as the oldest eligible documented repository.
- [x] Identify the interaction loop, domains, kits and services.
- [x] Trace RAF, runtime tick, domain tick and manual tick paths.
- [x] Define fixed-step, accumulator, catch-up, pause and dropped-time contracts.
- [x] Add a timestamped tracker and audit set.
- [x] Change no runtime source.
- [x] Push only to `main`.
- [x] Create no branch or pull request.
- [ ] Implement session and clock authority with executable cadence fixtures.

## Read this first

```txt
.agent/trackers/2026-07-11T12-01-38-04-00/project-breakdown.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/architecture-audit/2026-07-11T12-01-38-04-00-fixed-step-clock-dsk-map.md
.agent/render-audit/2026-07-11T12-01-38-04-00-render-frame-simulation-tick-identity-gap.md
.agent/gameplay-audit/2026-07-11T12-01-38-04-00-raf-cadence-orchard-speed-loop.md
.agent/interaction-audit/2026-07-11T12-01-38-04-00-automatic-manual-tick-admission-map.md
.agent/clock-audit/2026-07-11T12-01-38-04-00-accumulator-catchup-pause-contract.md
.agent/deploy-audit/2026-07-11T12-01-38-04-00-clock-cadence-fixture-gate.md
.agent/turn-ledger/2026-07-11T12-01-38-04-00.md
.agent/kit-registry.json
```

## Product interaction loop

```txt
browser boot
  -> create one runtime and every domain closure
  -> create canvas and HTML renderers
  -> expose raw engine and manual tick through GameHost
  -> call draw()

one RAF callback
  -> engine.tick(1 / 60)
  -> runtime clamps delta, advances elapsed and frame once
  -> every domain receives one tick
  -> pressure rises, pests may spawn/move, damage may apply
  -> aggregate snapshot
  -> render canvas and replace HTML
  -> request next RAF

manual/debug path
  -> GameHost.tick(dt)
  -> advances the same graph immediately outside RAF
```

## Main finding

```txt
render cadence 30 Hz  -> simulation receives 30 fixed steps/sec
render cadence 60 Hz  -> simulation receives 60 fixed steps/sec
render cadence 120 Hz -> simulation receives 120 fixed steps/sec

background RAF stall  -> simulation receives no catch-up policy
manual GameHost.tick  -> simulation can advance between RAF callbacks
pause/title/outcome    -> all-domain ticking remains active
```

`ctx.frame` is both the tick counter and the only frame-like identity. There is no wall-time accumulator, committed simulation tick ID, render frame ID, catch-up limit, dropped-time result, pause barrier or automatic/manual tick exclusion.

## Domains in use

```txt
static browser route and ESM boot
browser runtime host
kit registration and domain graph construction
command, tick, event, snapshot, subscription and publication routing
12 scoped interface screens
interface route composition and automatic Outcome routing
resource ledger and pressure field
orchard world and apple lifecycle
construction, roster and inventory runtimes
active-session movement, collection, phases, pests, damage, score and failure
world canvas and HTML projection
GameHost diagnostics and debug control
Node smoke, static build and Pages deployment
missing session, fixed-step clock, capability, transaction, replay and persistence authority
```

## Implemented kits

```txt
kit-runtime
scoped-interface-domain-kit
12 screen domain kits
interface-composition-kit
resource-ledger-kit
pressure-field-kit
orchard-world-kit
construction-runtime-kit
roster-runtime-kit
inventory-runtime-kit
active-session-domain-kit
world-canvas-render-kit
html-interface-render-kit
game-host-diagnostics-kit
smoke-fixture-kit
static-build-copy-kit
pages-deploy-kit
```

## Ordered implementation queue

```txt
1. Runtime Session Instance Authority
2. Fixed-Step Clock Authority
3. Public Capability Gateway and Reachability
4. Composite Command Transaction Authority
5. Seeded Random and Replay Authority
6. Versioned Save / Load Authority
```

## Next safe ledge

```txt
ZombieOrchard Runtime Session Instance Authority
+ Fixed-Step Clock Authority
+ Start / Pause / 30-60-120 Hz Fidelity Fixture Gate
```

Do not add more content before session ownership and clock admission are fixture-backed.
