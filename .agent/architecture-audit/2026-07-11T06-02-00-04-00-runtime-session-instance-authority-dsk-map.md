# Architecture audit — Runtime session instance authority DSK map

## Timestamp

```txt
2026-07-11T06-02-00-04-00
```

## Current architecture

```txt
src/start.js
  -> createOrchardGame()
  -> one process-lifetime engine
  -> one process-lifetime set of mutable domain closures
  -> one unretained recursive RAF
  -> one permanent delegated click listener
  -> one global GameHost handle

interface-composition
  -> treats Play, New Game, Start, Pause, Resume, Title, and Outcome as routes

kit-runtime
  -> ticks every domain every frame
  -> has no lifecycle admission, session identity, reset, stop, or dispose
```

The current architecture has screen state but no run state. UI routes are being used as substitutes for session lifecycle commands.

## Current domain ownership

| Domain | Current owner | Session-lifecycle defect |
|---|---|---|
| Engine graph | `src/start.js` module lifetime | Constructed before Play and never replaced |
| Interface route | `interface-composition-kit` | Route changes are mistaken for lifecycle transitions |
| Resources | `resource-ledger-kit` closure | No fresh-run/reset service |
| Pressure | `pressure-field-kit` closure | Ticks on Entry, Pause, Title, and Outcome |
| World/apples | `orchard-world-kit` closure | One random world for the process lifetime |
| Construction | `construction-runtime-kit` closure | Built objects survive Title and New Game |
| Roster | `roster-runtime-kit` closure | Hires survive Title and New Game |
| Inventory | `inventory-runtime-kit` closure | Equipment survives Title and New Game |
| Active session | `active-session-domain-kit` closure | Ended state cannot be retired or recreated |
| RAF | recursive `draw()` | ID not retained; no stop/dispose |
| DOM listener | HTML renderer | No lease or removal service |
| Global diagnostics | `window.GameHost` | No session epoch, release, or stale-handle rejection |

## Required parent domain

```txt
runtime-session-authority-domain
```

This domain must own exactly one current session instance or no session. It must not be implemented as another interface screen.

## Required kit map

### `runtime-session-id-kit`

Services:

```txt
allocate stable sessionId
allocate monotonic sessionEpoch
classify fresh, resumed, reset, retired, and disposed sessions
produce detached identity snapshots
```

### `session-instance-factory-kit`

Services:

```txt
validate preset input
construct a fresh engine graph
inject seed, clock, persistence, and diagnostics dependencies
return resource acquisition records
return typed construction success or failure
```

### `session-lifecycle-state-kit`

States:

```txt
idle
starting
running
paused
ending
ended
returning_to_title
resetting
disposing
disposed
failed
```

Services:

```txt
state transition admission
illegal transition rejection
terminal-state protection
lifecycle snapshot
```

### `session-command-kit`

Commands:

```txt
START_NEW_SESSION
PAUSE_SESSION
RESUME_SESSION
END_SESSION
RETURN_TO_TITLE
RESET_SESSION
DISPOSE_RUNTIME
```

Every command must carry command identity, expected epoch, source, and reason.

### `session-command-result-kit`

Services:

```txt
typed accepted/rejected/failed result
before and after lifecycle state
sessionId and epoch
committed tick and render frame references
cleanup and rollback status
```

### `session-epoch-kit`

Services:

```txt
issue epoch on successful start/reset/load
reject stale commands
reject stale ticks
reject stale renderer observations
reject stale GameHost handles
```

### `session-tick-admission-kit`

Services:

```txt
allow simulation ticks only while running
freeze simulation while paused, idle, ended, or disposed
separate UI projection ticks from simulation ticks
return admitted/skipped tick results
```

### `session-reset-plan-kit`

Services:

```txt
capture reset intent
construct replacement graph before retirement when policy requires
preserve title/settings state by explicit policy
commit replacement atomically
roll back to previous valid session on construction failure
```

### `raf-ownership-kit`

Services:

```txt
retain RAF id
start exactly once
stop exactly once
cancel pending callback
fence callbacks by runtime generation
publish frame ownership observations
```

### `input-listener-lease-kit`

Services:

```txt
register listener with owner identity
remove listener idempotently
reject callbacks from retired generations
report active leases
```

### `renderer-session-projection-kit`

Services:

```txt
project sessionId and epoch
project committed simulation tick
project lifecycle phase
refuse retired-session snapshots
acknowledge first frame of a new session
```

### `outcome-finalization-kit`

Services:

```txt
capture terminal score/day/result once
freeze gameplay mutation
produce immutable outcome snapshot
admit Title or Reset without automatic bounce-back
```

### `session-graph-disposal-kit`

Services:

```txt
unsubscribe listeners
cancel RAF work
release renderer handles
release globals when still owned
retire domain graph
return idempotent disposal result
```

### `GameHost-session-observation-kit`

Services:

```txt
detached lifecycle snapshot
current session identity
bounded lifecycle results
active RAF/listener/resource counts
stale-handle rejection result
```

### `session-lifecycle-journal-kit`

Services:

```txt
bounded command/result journal
before/after state fingerprints
session and epoch correlation
first-frame and terminal-frame correlation
```

### `session-lifecycle-fixture-kit`

Proof cases:

```txt
boot remains idle without mutating gameplay time
Play creates a fresh session
New Game after mutation creates initial state
Pause freezes gameplay
Resume continues the same epoch
Title retires the current session
Title from Outcome remains on Title
Play after Outcome creates a non-ended session
Reset creates one new epoch
stop/start never creates two RAF owners
dispose is idempotent
stale commands and callbacks reject
```

## Required commit order

```txt
admit lifecycle command
  -> validate expected epoch and current state
  -> prepare fresh graph or terminal snapshot
  -> stop tick/input admission where required
  -> commit lifecycle state and epoch
  -> switch renderer projection
  -> acknowledge first committed frame
  -> retire old graph/resources
  -> publish one terminal result
```

## Dependency order

```txt
runtime session instance authority
  -> fixed-step clock authority
  -> capability reachability
  -> composite command transaction authority
  -> seeded random and replay authority
  -> versioned save/load authority
```

## Constraint

Do not implement reset by mutating every current closure in place. The safer boundary is a fresh preset-backed graph plus atomic ownership transfer, because the existing domains do not expose complete reset contracts.
