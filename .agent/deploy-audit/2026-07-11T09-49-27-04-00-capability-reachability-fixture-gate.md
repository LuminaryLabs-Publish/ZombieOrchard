# Deploy audit: capability reachability fixture gate

## Current gate

```txt
npm test
  -> create engine
  -> verify Entry
  -> activate Play
  -> tick once
  -> verify Active Session
  -> verify apples exist

npm run build
  -> copy index.html and src into dist

Pages
  -> test
  -> build
  -> deploy static artifact
```

## Missing DOM-free fixture

```txt
registry completeness
  -> every public descriptor resolves to an owner command
  -> no duplicate capability IDs
  -> unsupported and dormant capabilities are explicit

binding completeness
  -> every supported public capability has a shipped binding
  -> movement has keyboard and accessible fallback bindings
  -> internal capabilities are not counted as public

route truth
  -> Market is unsupported/disabled until a service exists
  -> Session Select is dormant until routed and backed by slots
  -> Roster and Inventory cannot claim interactive services without bindings

target admission
  -> equip rejects unknown item
  -> collect out of range returns typed rejection
  -> valid targets commit expected effects

result truth
  -> DOM-facing adapter retains accepted and rejected results
  -> capability, command, session and tick identities correlate
```

## Missing browser fixture

```txt
fresh run
  -> move deliberately through the orchard
  -> reach and collect a known apple
  -> see accepted result and updated resources
  -> see out-of-range collection disabled or rejected with reason
  -> open Roster and Inventory and observe truthful capability state
  -> observe Market disabled as unsupported
  -> verify first rendered frame consumes the registry revision and result fingerprint
```

## Deployment rule

Do not treat the capability gate as passed until both DOM-free and browser fixtures run against the shipped source. Pages should depend on:

```txt
session fixture
clock parity fixture
capability registry/reachability fixture
composite transaction fixture
seed/replay fixture
save/load fixture
```

## Current validation

```txt
runtime source changed: no
package scripts changed: no
deployment workflow changed: no
npm test: not run in this connector run
npm run build: not run in this connector run
capability fixture: unavailable
browser capability smoke: unavailable
```