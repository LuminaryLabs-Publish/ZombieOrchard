# ZombieOrchard Deploy Audit — Market Fixture Build Gate

**Timestamp:** `2026-07-10T08-28-26-04-00`

## Current package scripts

```txt
npm run dev   -> python -m http.server 5173
npm test      -> node tests/smoke.mjs
npm run build -> rm -rf dist && mkdir -p dist && cp index.html dist/index.html && cp -R src dist/src
```

## Current validation coverage

`tests/smoke.mjs` proves:

```txt
createOrchardGame()
initial interface-composition.active === entry
engine.command("interface-composition", "activate", { actionId: "play" })
engine.tick(1 / 60)
active screen becomes active-session
orchard-world has apples
```

## Deploy gap

The current test/build path does not prove Market/Exchange behavior.

Missing deploy gates:

```txt
Market source manifest fixture
Market preflight fixture
Market accepted result fixture
Market rejected result fixture
nested result retention fixture
resource transaction fixture
inventory intake fixture
Exchange projection fixture
GameHost.market readback fixture
```

## Next validation target

After implementation, use:

```bash
node tests/market-result-fixture.mjs
npm test
npm run build
```

Then wire `npm run build` to fail before copy if the Market fixture fails.

## This pass validation

```txt
runtime source changed: no
package scripts changed: no
branch created: no
pull request created: no
npm test: not run
npm run build: not run
browser smoke: not run
DOM-free Market fixture: not run because proof files do not exist yet
```
