# Public-host capability fixture gate

## Goal

Prevent deployment from presenting the browser-global host as safe or authoritative until reachability, admission, revocation and frame-correlation fixtures pass.

## Existing validation surface

```txt
npm test
  -> node tests/smoke.mjs
  -> create game
  -> assert Entry
  -> activate Play
  -> tick once
  -> assert Active Session and apples

npm run build
  -> copy index.html and src into dist
```

The current smoke test does not instantiate the browser host or inspect global reachability.

## Required DOM-free fixtures

```txt
public-host-contract-shape
raw-engine-unreachable
ctx-unreachable
domains-table-unreachable
domain-api-unreachable
unknown-command-rejection
payload-schema-rejection
duplicate-domain-registration-rejection
clone-safe-observation
observation-revision-monotonicity
host-generation-stale-command-rejection
capability-expiration
subscription-lease-retirement
host-revocation
manual-step-single-writer-exclusion
fixture-step-admission
```

## Required browser fixtures

```txt
window.GameHost exposes approved members only
UI controls still reach admitted commands
DOM action IDs contain no capability token
manual public step is rejected while RAF owns the clock
observer receives route/tick/frame-correlated receipts
state observation cannot mutate gameplay
host is revoked on teardown/session replacement
predecessor host cannot affect successor run
one RAF chain and one delegated listener remain
```

## Suggested package gates

```txt
npm test
  -> existing smoke
  -> public-host DOM-free contract fixtures

npm run test:browser
  -> host reachability and frame-receipt smoke

npm run build
  -> test gate
  -> static copy
```

## Deployment admission

Pages deployment should require:

```txt
syntax/import success
existing gameplay smoke
public-host contract fixture
capability admission fixture
single-writer step fixture
host revocation fixture
browser frame-receipt smoke
static build success
```

## Current result

```txt
runtime changed: no
workflow changed: no
npm test: not run
npm run build: not run
browser smoke: not run
public-host fixtures: absent
Pages capability gate: absent
```

Do not claim the public host is read-only, revocable, session-scoped, clock-safe or frame-coherent until these fixtures pass on `main`.
