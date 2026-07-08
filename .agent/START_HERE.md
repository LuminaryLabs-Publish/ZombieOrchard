# ZombieOrchard Agent Start

**Repo:** `LuminaryLabs-Publish/ZombieOrchard`

**Current state:** compact static browser orchard survival/economy shell with a kit runtime, scoped interface domains, game-domain kits, a canvas world renderer, and an HTML interface renderer.

**Start every future pass here:**

1. Read `.agent/current-audit.md`.
2. Read `.agent/known-gaps.md`.
3. Read `.agent/next-steps.md`.
4. Read `.agent/validation.md`.
5. Read the latest `.agent/turn-ledger/` entry.
6. Read the latest `.agent/trackers/` breakdown entry.
7. Keep reusable logic in kits and keep render/DOM/browser ownership in host renderers.

## Current priority

Build the **Market Command Replay Fixture + Transaction Projection Gate** before expanding worker assignment, saves, codex progression, or advanced economy loops.

## Source anchors

```txt
index.html
src/boot.js
src/start.js
src/game.js
src/kits/runtime.js
src/kits/scoped-interface-domains.js
src/kits/composition.js
src/kits/game-domains.js
src/presets/orchard-preset.js
src/renderer/world-canvas.js
src/renderer/html-interface-renderer.js
tests/smoke.mjs
```

## Required operating docs

```txt
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/architecture-audit/domain-service-breakdown.md
.agent/render-audit/canvas-html-render-audit.md
.agent/gameplay-audit/market-command-replay-fixture.md
.agent/interaction-audit/screen-command-routing.md
.agent/trackers/2026-07-08T03-08-39-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T03-08-39-04-00.md
.agent/kit-registry.json
```
