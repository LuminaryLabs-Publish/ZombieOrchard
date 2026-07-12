# Validation — ZombieOrchard

## Scope

Documentation-only audit of composite command execution. Runtime source, dependencies, package scripts, rendering and deployment configuration were not changed.

## Plan ledger

**Goal:** record the nested-result, partial-commit and duplicate-publication gaps and the proof required before browser commands are treated as atomic or frame-coherent.

- [x] Read browser boot and delegated HTML bindings.
- [x] Read runtime command dispatch and publication.
- [x] Read scoped action resolution and composition.
- [x] Read construction, roster, inventory and active-session mutations.
- [x] Confirm child results are ignored by the composition parent.
- [x] Confirm nested dispatch can publish before parent completion.
- [x] Confirm multi-domain gameplay effects have no prepare/rollback boundary.
- [x] Add timestamped architecture and system audits.
- [x] Push documentation only to `main` without a branch or pull request.
- [x] Synchronize the central ledger and internal change log.
- [ ] Implement and run transaction fixtures.

## Source-backed findings

```txt
html-interface-renderer
  -> delegates data-action to interface-composition.activate
  -> discards the returned result

interface-composition
  -> resolves active action
  -> invokes nested child command
  -> ignores child result
  -> may return parent accepted=true

kit-runtime
  -> every engine.command invokes notify()
  -> child notifies before outer completion
  -> outer command notifies again

game-domains
  -> collect mutates apple world before full settlement
  -> clear can retire pest before scrap settlement
  -> build/hire debit before entity insertion
  -> no prepare, rollback or idempotency services

orchard-preset
  -> Storage Shed uses nested construction command
  -> parent can report success after child rejection
```

## Required DOM-free fixtures

```txt
child-rejection-propagation
no-partial-build
collect-rollback
clear-rollback
single-publication
idempotent-success
stale-revision
aggregate-result
frame-receipt
```

## Required browser fixtures

```txt
Storage Shed failure displays the rejected reason
successful Storage Shed debits and constructs exactly once
rapid double click creates one transaction effect
Collect failure cannot consume an apple without complete settlement
Clear failure cannot retire a pest without complete settlement
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
central ledger update: complete
central internal change log: complete
```

No atomic-command, rollback, idempotency, one-publication or result-to-frame claim is made.