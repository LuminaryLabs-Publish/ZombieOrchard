# Deploy audit — Command transaction fixture gate

Timestamp: `2026-07-11T01-31-15-04-00`

## Current deployment chain

```txt
npm test
  -> tests/smoke.mjs
  -> entry exists
  -> Play reaches active-session
  -> apples array is nonempty

npm run build
  -> copy index.html and src into dist

GitHub Pages
  -> test
  -> build
  -> deploy static artifact
```

The workflow shape can remain. The proof surface is insufficient.

## Required command transaction fixture

Add a DOM-free fixture that proves:

```txt
route-only action returns one accepted result and one publication
valid nested build returns parent, child and resource results
invalid build ID rejects without fallback construction
insufficient resources rejects without state mutation
missing child domain rejects before route mutation
child rejection suppresses dependent route transition
successful child-plus-route commits atomically
subscriber notification count is exactly one per committed intent
rejected transaction notification policy is explicit and stable
command journal is detached, bounded and JSON-safe
last rendered observation correlates to committed commandId
```

## Suggested package gate

```txt
npm test
  -> existing smoke
  -> lifecycle fixture
  -> clock parity fixture
  -> capability reachability fixture
  -> command transaction fixture
  -> seeded replay fixture
```

## Deployment decision

Do not claim atomic command behavior, truthful nested results, rollback safety, or replay readiness until the command transaction fixture exists and runs in the Pages pre-deploy test chain.

## Validation this pass

```txt
runtime source changed: no
workflow changed: no
package scripts changed: no
fixture created: no
fixture run: no
Pages run inspected: no
documentation pushed to main: yes
```
