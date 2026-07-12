# START HERE: ZombieOrchard

**Repository:** `LuminaryLabs-Publish/ZombieOrchard`  
**Branch:** `main`  
**Aligned:** `2026-07-12T16-51-47-04-00`  
**Status:** `interface-action-admission-authority-audited`

## Summary

ZombieOrchard is a dependency-free orchard survival and economy shell built from a mutable kit runtime, 12 interface definitions, gameplay services, canvas/HTML projection, diagnostics, Node smoke proof, static build and Pages deployment.

The newest audit isolates interface action identity, availability and nested-result authority. Generic interface domains fail open when an unknown or missing `actionId` is supplied by falling back to the current `selectedIndex`. The composition layer then discards nested command results and may report success even when the requested gameplay operation was rejected. Disabled actions are also rendered as enabled buttons.

## Plan ledger

**Goal:** require every interface action to prove exact identity, current route and action-set revision, visible availability and nested command success before gameplay mutation or route transition is committed.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger and root `.agent` coverage.
- [x] Select only ZombieOrchard as the oldest eligible central entry.
- [x] Trace HTML click, public command, scoped-domain activation, nested command and route transition flows.
- [x] Identify all domains, all 27 implemented kit surfaces and offered services.
- [x] Confirm unknown scoped action IDs fall back to the selected action.
- [x] Confirm nested command rejection is not propagated by interface composition.
- [x] Confirm disabled actions render as enabled controls.
- [x] Add timestamped architecture and system audits.
- [x] Refresh required root documents and machine registry.
- [x] Synchronize central ledger and change log.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Implement and run action-admission and result-projection fixtures.

## Read this run first

```txt
.agent/trackers/2026-07-12T16-51-47-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-12T16-51-47-04-00.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-12T16-51-47-04-00-interface-action-admission-dsk-map.md
.agent/render-audit/2026-07-12T16-51-47-04-00-action-availability-result-frame-gap.md
.agent/gameplay-audit/2026-07-12T16-51-47-04-00-interface-action-command-route-loop.md
.agent/interaction-audit/2026-07-12T16-51-47-04-00-action-id-command-route-admission-map.md
.agent/interface-action-audit/2026-07-12T16-51-47-04-00-identity-availability-result-contract.md
.agent/deploy-audit/2026-07-12T16-51-47-04-00-interface-action-fixture-gate.md
```

## Interaction loop

```txt
visible HTML button or public caller
  -> interface-composition.activate(actionId)
  -> active interface domain resolves the action
  -> generic domains use exact match OR selected-index fallback
  -> actionRequested event is emitted
  -> optional nested gameplay command runs
  -> nested result is discarded
  -> optional route transition runs
  -> composition returns route success or unconditional accepted=true
  -> canvas and HTML render without action-result provenance
```

## Main findings

```txt
unknown scoped action ID can execute selected action: yes
missing scoped action ID can execute selected action: yes
active-session uses the same fallback: no, exact lookup only
nested gameplay rejection propagated: no
disabled action rendered disabled: no
action-set revision: absent
route revision bound to command: absent
command ID and idempotency: absent
stale action rejection: absent
first visible action-result acknowledgement: absent
```

Concrete current example:

```txt
construction.shed
  -> composition invokes construction-runtime.build
  -> build can reject for missing resources
  -> composition ignores that rejection
  -> composition returns { accepted: true }
```

## Required parent domain

```txt
zombie-orchard-interface-action-admission-authority-domain
```

## Required flow

```txt
InterfaceActionCommand
  -> bind runtime session, run generation, route revision and action-set revision
  -> require exact action identity and availability
  -> reject missing, unknown, stale or disabled actions
  -> execute nested command once
  -> require typed nested result
  -> apply route policy only when the action result permits it
  -> publish one InterfaceActionResult
  -> project availability and rejection feedback
  -> acknowledge the first canvas/HTML frame citing the result
```

## Guardrails

```txt
Push only to main.
Create no branch or pull request.
Do not work on TheCavalryOfRome.
Do not preserve selected-index fallback for explicit action commands.
Do not report accepted when a required nested command rejected.
Do not visually enable actions that admission will reject.
Do not claim correctness until source, dist and Pages fixtures pass.
```