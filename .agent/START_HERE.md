# START HERE — ZombieOrchard

Last aligned: `2026-07-10T08-28-26-04-00`

Current safe ledge:

```txt
ZombieOrchard Market Projection Result Ledger Refresh + GameHost Fixture Gate
```

## Read order

1. `.agent/current-audit.md`
2. `.agent/next-steps.md`
3. `.agent/known-gaps.md`
4. `.agent/validation.md`
5. `.agent/kit-registry.json`
6. `.agent/trackers/2026-07-10T08-28-26-04-00/project-breakdown.md`
7. `.agent/architecture-audit/2026-07-10T08-28-26-04-00-market-projection-result-ledger-dsk-map.md`

## Current product read

`ZombieOrchard` is a static browser orchard survival/economy shell. The live entrypoint is:

```txt
index.html
  -> src/boot.js
  -> src/start.js
  -> createOrchardGame()
  -> createWorldCanvas(...)
  -> createHtmlInterfaceRenderer(...)
  -> requestAnimationFrame(draw)
```

The runtime ticks the engine at `1 / 60`, snapshots state, renders the orchard canvas, renders HTML interface screens, and exposes `window.GameHost = { engine, getState, tick }`.

## Current interaction loop

```txt
index.html
  -> boot/start modules
  -> engine + canvas renderer + HTML renderer
  -> RAF draw loop
  -> engine.tick(1 / 60)
  -> engine.snapshot()
  -> world canvas render
  -> HTML interface render
  -> data-action activation through interface-composition
  -> optional nested action.command dispatch through engine.command(...)
  -> nested command result is dropped by the interface adapter
  -> Exchange/Market remains generic Back-only screen
  -> GameHost exposes raw engine/getState/tick only
```

## Main finding

Do not start next with a runtime rewrite, renderer rewrite, orchard visual polish, or economy expansion.

The blocker is Market projection proof. `engine.command()` already returns command results, but nested interface command results are not retained, Exchange does not project Market rows, and `GameHost` has no Market-specific diagnostics.

## Required next proof

```txt
Market source rows
  -> command envelopes
  -> preflight accepted/rejected rows
  -> command result journal
  -> resource transaction history
  -> inventory intake rows
  -> nested-result adapter retention
  -> Exchange render projection
  -> GameHost.market diagnostics
  -> DOM-free fixture rows
```

## Validation state

Docs-only pass. Runtime source was not changed. No npm, build, browser, or DOM-free fixture validation was run.
