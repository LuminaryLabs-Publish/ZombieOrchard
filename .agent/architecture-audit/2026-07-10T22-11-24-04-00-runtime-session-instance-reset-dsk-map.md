# Architecture audit — Runtime session instance and reset DSK map

Timestamp: `2026-07-10T22-11-24-04-00`

## Current composition

```txt
src/start.js
  -> one createOrchardGame() call
  -> one engine for page lifetime
  -> one HTML renderer listener
  -> one uncancelled RAF

src/game.js
  -> one preset
  -> one resource ledger
  -> one pressure field
  -> one orchard world
  -> one construction runtime
  -> one roster runtime
  -> one inventory runtime
  -> twelve interface domains
  -> one active session
  -> one interface composition
```

## Current ownership problem

The domain graph is both the game definition and the live run instance. There is no application-level owner above it that can create a fresh run, assign an epoch, atomically swap sessions, or dispose the retired graph.

```txt
preset definition
  -> live mutable domains
  -> page-lifetime singleton
```

The missing boundary is:

```txt
preset definition
  -> session factory
  -> candidate domain graph
  -> validation and fingerprint
  -> atomic session commit
  -> session epoch
  -> lifecycle-controlled ticking
  -> retirement and disposal
```

## Source-backed DSK map

| Current kit | Current service | Required update |
| --- | --- | --- |
| `kit-runtime` | domain registry, commands, ticks, snapshots | add lifecycle admission, disposal guard, committed tick metadata, lifecycle journal |
| `scoped-interface-domain-kit` | screen actions and fields | expose lifecycle intent without owning lifecycle state |
| `interface-composition-kit` | active screen and automatic Outcome routing | consume session state; stop treating screens as session state; make Outcome routing edge-triggered |
| `resource-ledger-kit` | mutable resources | support fresh construction or reset snapshot |
| `pressure-field-kit` | passive pressure | tick only when session policy admits it; support reset |
| `orchard-world-kit` | trees and random apples | support explicit random source and fresh world creation |
| `construction-runtime-kit` | built-object state | support fresh construction and reset proof |
| `roster-runtime-kit` | actor state | support fresh construction and reset proof |
| `inventory-runtime-kit` | equipment state | support fresh construction and reset proof |
| `active-session-domain-kit` | player, pests, phase, score, failure | expose ended transition and fresh initial state; obey lifecycle admission |
| `html-interface-render-kit` | action projection and click listener | return disposer; project lifecycle results |
| `world-canvas-render-kit` | world projection | expose consumed epoch/tick and disposer |
| `game-host-diagnostics-kit` | raw engine and snapshot | replace unrestricted mutation with bounded lifecycle/readback API |
| `smoke-fixture-kit` | minimal transition proof | add start/reset/title/outcome/dispose fidelity fixtures |

## Candidate new kits

Use existing owners first. Add only the missing cross-domain authorities:

```txt
runtime-session-authority-kit
  owns lifecycle state, epoch, current session handle, admission policy,
  transition results, retirement, and disposal

session-instance-factory-kit
  owns fresh preset-backed domain graph creation and candidate validation

session-fingerprint-kit
  owns detached canonical snapshots and stable before/after fingerprints

fixed-step-clock-kit
  owns wall-time accumulation, committed simulation ticks, catch-up limits,
  dropped-time policy, and automatic/manual clock exclusivity

runtime-lifecycle-fixture-adapter-kit
  exposes DOM-free start/reset/pause/title/outcome/stop/dispose scenarios
```

## Proposed transaction flow

```txt
New Game intent
  -> runtime-session-authority.requestReset()
  -> session-instance-factory.create(preset, seed)
  -> validate required domains
  -> compute candidate fingerprint
  -> retire prior session
  -> atomically commit candidate
  -> increment sessionEpoch
  -> emit reset result
  -> interface-composition projects running screen
```

## Required lifecycle result

```json
{
  "accepted": true,
  "type": "reset",
  "status": "committed",
  "reason": "new-game",
  "previousState": "running",
  "nextState": "running",
  "previousEpoch": 1,
  "nextEpoch": 2,
  "previousFingerprint": "...",
  "nextFingerprint": "..."
}
```

## Atomicity requirements

1. A failed candidate session must not mutate or replace the current committed session.
2. The epoch changes only after a successful commit.
3. A retired session cannot tick or accept commands.
4. Reset-owned domains all change together.
5. Renderers consume only committed session snapshots.
6. Outcome routing occurs once for the ended transition, not forever from a persistent flag.
7. Disposal is idempotent.

## Next safe ledge

`ZombieOrchard Runtime Session Instance Authority + Start/Reset/Title/Outcome Fidelity Fixture Gate`