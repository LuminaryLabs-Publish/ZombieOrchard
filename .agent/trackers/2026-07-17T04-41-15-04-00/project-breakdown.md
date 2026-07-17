# ZombieOrchard project breakdown: browser host lifecycle ownership

**Timestamp:** `2026-07-17T04-41-15-04-00`  
**Repository:** `LuminaryLabs-Publish/ZombieOrchard`  
**Branch:** `main`  
**Status:** `browser-host-single-runtime-lifecycle-retirement-authority-audited`

## Summary

ZombieOrchard boots by importing `src/start.js`, which immediately constructs the engine, Canvas2D renderer, HTML renderer, delegated click listener, public `GameHost`, and recursive RAF loop. None of those resources has a shared host identity, start result, stop path, disposal path, replacement policy, or retirement acknowledgement.

A normal static page load executes the module once, so no duplicate-runtime incident was reproduced. The source nevertheless has no authority that prevents or safely replaces a second host generation during re-execution, hot replacement, query-versioned imports, BFCache lifecycle transitions, or future recovery logic.

## Checklist

- [x] Compare all 11 Publish repositories and exclude `TheCavalryOfRome`.
- [x] Confirm ten eligible ledgers, ten root `.agent` states, and synchronized documented heads.
- [x] Select only ZombieOrchard by the oldest synchronized timestamp.
- [x] Trace boot, engine creation, listener ownership, RAF scheduling, public capability exposure, rendering, smoke, build, and Pages deployment.
- [x] Identify the complete interaction loop, all domains, all 27 implemented kits, and every offered service.
- [x] Define one host-lifecycle parent authority with 18 coordinating surfaces.
- [x] Add a timestamped tracker and focused audit family.
- [ ] Implement host admission/retirement and run duplicate-boot, listener-retirement, BFCache, artifact, and Pages fixtures.

## Selection comparison

```txt
accessible Publish repositories: 11
eligible after Cavalry exclusion: 10
central ledger entries: 10
root .agent states: 10
new or ledger-missing: 0
root-agent-missing: 0
undocumented: 0
runtime-ahead: 0

selected: LuminaryLabs-Publish/ZombieOrchard
selection class: oldest synchronized documented timestamp
selected prior timestamp: 2026-07-16T22-59-23-04-00
pre-audit repository head: aa62e31d37f895c0605f17ee66394554ec9475c5
```

## Complete interaction loop

```txt
page load
  -> index.html imports src/boot.js
  -> boot.js imports src/start.js
  -> start.js creates one engine
  -> create Canvas2D renderer
  -> create HTML renderer and attach delegated click listener
  -> publish window.GameHost
  -> call draw immediately

every draw
  -> engine.tick(1/60)
  -> pressure and active-session simulation advance
  -> interface composition may route outcome
  -> Canvas2D renders world snapshot
  -> HTML replaces the active projection
  -> requestAnimationFrame(draw)

host retirement/replacement
  -> no stored RAF handle
  -> no stop/dispose API
  -> no listener removal
  -> no renderer retirement
  -> no engine/domain disposal
  -> no GameHost generation retirement
  -> no lifecycle result or matching-frame acknowledgement
```

## Domains in use

```txt
browser document, module evaluation, DOM roots, RAF, page lifecycle and public window capabilities
kit registration, domain creation, commands, ticks, events, snapshots and subscriptions
interface route identity, active-screen projection and nested-command routing
resource balances, payments and grants
pressure channels and time growth
orchard generation, apples, collection and refill
active-session movement, collection, combat, phase, score, damage and failure
construction purchases and built records
roster hiring and actor records
inventory and equipment
Canvas2D world projection
HTML route, HUD, card and command projection
host session identity, singleton lease, listener ownership, RAF generation, retirement and replacement
smoke validation, static build, Pages deployment, repo-local audit and central reconciliation
```

## Implemented kit and service census

```txt
engine-installed kits: 19
host/tooling/support kits: 8
total implemented surfaces: 27
planned host-lifecycle surfaces: 18
```

| Kit | Services |
|---|---|
| `kit-runtime` | registration, domain creation, command dispatch, delta clamping, ticking, event buffering, snapshots, subscriptions |
| `scoped-interface-domain-kit` | screen state, field mutation, selection, action activation, events, snapshots |
| `entry-domain-kit` | Play, New Game, Settings |
| `session-select-domain-kit` | Save Select projection, Back |
| `run-setup-domain-kit` | run setup projection, Start, Back |
| `active-session-domain-kit` | movement, collection, phase changes, pest simulation, contact damage, clearing, score, failure |
| `interrupt-domain-kit` | Pause, Resume, Title |
| `construction-domain-kit` | construction projection, Storage Shed action, Back |
| `exchange-domain-kit` | Market projection, Back |
| `roster-domain-kit` | Roster projection, Back |
| `inventory-domain-kit` | Inventory projection, Back |
| `knowledge-domain-kit` | Codex projection, Back |
| `preferences-domain-kit` | Settings projection, Back |
| `outcome-domain-kit` | outcome projection, Title |
| `interface-composition-kit` | route transitions, nested commands, Back, outcome routing |
| `resource-ledger-kit` | balance checks, payments, grants, snapshots |
| `pressure-field-kit` | pressure channels, clamped adjustment, time growth, commands, snapshots |
| `orchard-world-kit` | tree generation, apple generation and refill, collection, bounds, snapshots |
| `construction-runtime-kit` | catalog lookup, payment, built records, messages, snapshots |
| `roster-runtime-kit` | hiring payment, actor records, messages, snapshots |
| `inventory-runtime-kit` | item snapshots, equipment mutation |
| `world-canvas-render-kit` | canvas sizing, player projection, tree projection, apple projection, pest projection |
| `html-interface-render-kit` | delegated route commands, delegated gameplay commands, HUD projection, card projection |
| `game-host-diagnostics-kit` | raw engine exposure, state readback, manual ticking |
| `smoke-fixture-kit` | entry assertion, Play assertion, orchard apple assertion |
| `static-build-copy-kit` | static dist assembly |
| `pages-deploy-kit` | GitHub Pages publication |

## Source-backed finding

```txt
module-evaluation boot: present
immediate engine/renderer construction: present
recursive RAF: present
delegated root click listener: present
public window.GameHost replacement: present

HostSessionId: absent
single-runtime lease: absent
stored RAF handle: absent
cancelAnimationFrame retirement: absent
listener disposal: absent
renderer disposal: absent
engine/domain disposal: absent
pagehide/pageshow policy: absent
HostLifecycleResult: absent
FirstHostBoundFrameAck: absent
browser lifecycle fixtures: 0
```

Concrete paths:

1. `index.html` imports `src/boot.js` as the page module.
2. `src/boot.js` imports `src/start.js` only for side effects.
3. `src/start.js` constructs the engine and renderers, calls `draw()`, and exposes `window.GameHost`; it stores no RAF handle and exports no lifecycle API.
4. `src/renderer/html-interface-renderer.js` installs a root click listener and returns only `{ render }`.
5. `src/renderer/world-canvas.js` returns only `{ render }`.
6. `src/kits/runtime.js` exposes no domain teardown or runtime disposal.
7. `tests/smoke.mjs` exercises headless gameplay state, not browser host admission, duplicate boot, retirement, BFCache, or Pages lifecycle behavior.

## Required parent domain

`zombie-orchard-browser-host-single-runtime-lifecycle-retirement-authority-domain`

## Planned surfaces

- `zombie-orchard-browser-host-single-runtime-lifecycle-retirement-authority-domain`
- `host-session-identity-kit`
- `host-boot-admission-envelope-kit`
- `singleton-runtime-lease-kit`
- `document-root-generation-kit`
- `raf-loop-generation-kit`
- `dom-listener-lease-kit`
- `renderer-lifecycle-adapter-kit`
- `engine-domain-disposal-adapter-kit`
- `gamehost-capability-retirement-kit`
- `pagehide-retirement-policy-kit`
- `pageshow-resume-replace-policy-kit`
- `host-lifecycle-result-kit`
- `first-host-bound-frame-ack-kit`
- `duplicate-boot-fixture-kit`
- `listener-retirement-fixture-kit`
- `bfcache-lifecycle-fixture-kit`
- `source-dist-pages-host-lifecycle-parity-kit`

## Required command boundary

```txt
HostBootAdmissionCommand
  -> bind HostSessionId, document/root revisions and expected predecessor
  -> acquire one singleton runtime lease
  -> reject duplicate or stale boot work

HostRuntimeCommitCommand
  -> construct engine, renderers, listeners and RAF generation
  -> publish HostLifecycleResult
  -> publish FirstHostBoundFrameAck

HostRuntimeRetirementCommand
  -> cancel the accepted RAF generation
  -> remove owned listeners
  -> dispose renderers and engine domains
  -> retire GameHost capability generation exactly once
  -> publish terminal HostLifecycleResult
```

## Validation boundary

Documentation only. Runtime JavaScript, HTML, CSS, gameplay, rendering, tests, package scripts, workflow, build, and deployment remain unchanged. No duplicate runtime, leaked listener, BFCache failure, stale GameHost capability, or production incident was reproduced.