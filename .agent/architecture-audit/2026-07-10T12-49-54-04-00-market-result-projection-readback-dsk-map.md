# Architecture audit — Market Result Projection Readback DSK Map

## Repo

`LuminaryLabs-Publish/ZombieOrchard`

## Timestamp

`2026-07-10T12-49-54-04-00`

## Architecture read

`ZombieOrchard` is a small browser game composed through local kits:

```txt
src/start.js
  -> createOrchardGame()
  -> createKitRuntime({ kits })
  -> interface domain kits
  -> runtime game-domain kits
  -> interface-composition-kit
  -> canvas renderer
  -> HTML renderer
  -> raw window.GameHost
```

The engine surface is already useful because `engine.command(domainId, type, payload)` returns command results.

The seam that loses proof is higher up: `interface-composition.activate` dispatches nested `action.command` and drops that result.

## Domain map

```txt
Browser shell
  owns index.html, #world, #ui-root, #error-panel

Runtime entrypoint
  owns start.js boot, draw loop, GameHost exposure

Kit runtime
  owns kit installation, domain registry, command dispatch, tick dispatch, snapshot aggregation, event queue

Interface domains
  owns entry/session/run/active/interrupt/construction/exchange/roster/inventory/knowledge/preferences/outcome screens

Interface composition
  owns current screen, previous screen, transition, back, activate, nested command dispatch

Game runtime domains
  owns resource-ledger, pressure-field, orchard-world, construction-runtime, roster-runtime, inventory-runtime, active-session

Render domains
  owns world-canvas projection and HTML interface projection

Market next domains
  should own action catalog, command envelopes, preflight, retained command results, Exchange projection, renderer readback, GameHost.market diagnostics, and fixture replay
```

## DSK boundary concern

`exchange-domain-kit` currently behaves like a generic interface screen. It has no Market source rows, no price/capacity rows, and no command/result state.

`construction-domain-kit` proves the failure mode because it contains an action with nested command data:

```txt
command: { domain: "construction-runtime", type: "build", payload: { id: "storage-shed" } }
```

`interface-composition` dispatches that command but discards the returned result. Market actions would hit the same seam unless this is fixed first.

## Next architecture cut

```txt
market-action-catalog-kit
  -> stable Market action/source rows
market-command-envelope-kit
  -> serializable command inputs
market-preflight-kit
  -> price/capacity accepted/rejected rows
interface-nested-result-adapter-kit
  -> retains nested command result on activation result
market-result-journal-kit
  -> durable rows for accepted/rejected/no_mutation paths
market-exchange-result-ledger-kit
  -> projection rows for Exchange screen
market-render-readback-kit
  -> HTML renderer consumption proof
market-gamehost-diagnostics-kit
  -> JSON-safe GameHost.market block
market-fixture-replay-kit
  -> DOM-free accepted/rejected proof
```

## Do not do first

```txt
runtime rewrite
renderer rewrite
economy expansion
new Market art
visual polish
new orchard content
```
