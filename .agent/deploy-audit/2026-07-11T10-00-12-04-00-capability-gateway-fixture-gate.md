# Deploy audit: Public capability gateway fixture gate

## Current deployment proof

```txt
npm test
  -> Entry exists
  -> Play reaches Active Session
  -> at least one apple exists

npm run build
  -> copy index.html and src into dist

Pages
  -> test
  -> build
  -> deploy static artifact
```

## Missing deployment gate

The current pipeline can deploy while:

```txt
public commands bypass capability admission
DOM callers discard results
movement/hire/equip remain unreachable
Market appears supported without a service
GameHost exposes raw mutation/manual tick
rendered frames carry no result acknowledgement
```

## Required DOM-free fixtures

```txt
capability registry completeness
public gateway is sole player-command entry
owner/lifecycle/route/binding/target admission
typed accepted and rejected results
result retention until frame acknowledgement
internal/debug lease admission
raw engine quarantine
manual tick exclusion
stale lease rejection after reset
movement and deliberate collection
hire/equip target integrity
unsupported Market and dormant Session Select projection
```

## Required browser smoke

```txt
boot a fresh session
  -> confirm GameHost has detached observations only
  -> move through a public binding
  -> collect a known apple
  -> observe typed result and resource change
  -> inspect truthful disabled/dormant states
  -> verify first rendered frame acknowledges result and registry revision
  -> reset
  -> confirm stale result/debug authority cannot affect the new epoch
```

## Deployment rule

Do not treat Pages success as product-capability proof until the DOM-free fixture matrix and browser smoke both pass against the exact built artifact.
