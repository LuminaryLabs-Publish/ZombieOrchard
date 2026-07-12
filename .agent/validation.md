# Validation — ZombieOrchard

## Scope

Documentation-only audit of composite command execution. Runtime source, dependencies, package scripts, rendering and deployment configuration were not changed.

## Plan ledger

**Goal:** record the exact nested-result, partial-commit and duplicate-publication gaps and define the proof required before browser commands are treated as atomic or frame-coherent.

- [x] Read browser boot and delegated HTML bindings.
- [x] Read runtime command dispatch and publication.
- [x] Read scoped action resolution and composition.
- [x] Read construction, roster, inventory and active-session mutations.
- [x] Confirm child results are ignored by the composition parent.
- [x] Confirm nested dispatch can publish before parent completion.
- [x] Confirm multi-domain gameplay effects have no prepare/rollback boundary.
- [x] Add timestamped architecture and system audits.
- [x] Push documentation only to `main` without a branch or pull request.
- [ ] Implement and run transaction fixtures.

## Source-backed findings

```txt
src/renderer/html-interface-renderer.js
  -> delegates data-action to interface-composition.activate
  -> discards the returned result

src/kits/composition.js
  -> resolves the active interface action
  -> invokes nested ctx.engine.command for action.command
  -> ignores the nested result
  -> may return parent accepted=true

src/kits/runtime.js
  -> every engine.command invokes notify()
  -> nested child notifies before the outer command returns
  -> outer command notifies again

src/kits/game-domains.js
  -> collect removes/reseeds an apple before reward/pressure/score settlement
  -> clear can remove a pest and add score before optional scrap settlement
  -> build and hire debit resources before entity insertion
  -> no participant prepare, rollback or idempotency service

src/presets/orchard-preset.js
  -> Storage Shed uses a nested construction command
  -> the action has no route target
  -> parent activation can report success after child rejection

tests/smoke.mjs
  -> does not test insufficient resources, participant failure, duplicate submission, publication count or frame receipt
```

## Required DOM-free fixtures

```txt
child-rejection-propagation
  -> insufficient-resource build returns aggregate rejected

no-partial-build
  -> resource and built-list fingerprints unchanged on rejection

collect-rollback
  -> injected reward or pressure failure leaves apple, reward, pressure and score unchanged

clear-rollback
  -> injected ledger failure leaves pest, score and scrap unchanged

single-publication
  -> one intent emits one committed notification

idempotent-success
  -> duplicate command ID does not repeat payment, reward or entity creation

stale-revision
  -> rejected before participant mutation

aggregate-result
  -> every participant result and before/after revision retained

frame-receipt
  -> result cites first canvas and HTML frame presenting the commit
```

## Required browser fixtures

```txt
Storage Shed failure displays the rejected reason
successful Storage Shed debits and constructs exactly once
rapid double click creates one transaction effect
Collect failure cannot consume an apple without reward settlement
Clear failure cannot retire a pest without scrap settlement
no intermediate subscriber state is observable
canvas, HTML and public observation agree on transaction revision
one RAF chain and one delegated listener remain
```

## Validation result

```txt
runtime source changed: no
dependencies changed: no
package scripts changed: no
render behavior changed: no
deploy configuration changed: no
branch created: no
pull request created: no

npm test: not run
npm run build: not run
browser smoke: not run
child-result fixture: unavailable / not run
partial-commit fixture: unavailable / not run
rollback fixture: unavailable / not run
idempotency fixture: unavailable / not run
single-publication fixture: unavailable / not run
result-frame fixture: unavailable / not run

repo-local docs pushed to main: yes
central ledger update: pending after repo-local completion
central internal change log: pending after repo-local completion
```

No atomic-command, rollback, idempotency, one-publication or result-to-frame claim is made.