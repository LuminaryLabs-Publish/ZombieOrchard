# Render audit: intermediate command publication and frame gap

## Finding

One browser intent can produce more than one state publication before the next rendered frame.

```txt
outer interface-composition command
  -> nested child engine.command
  -> child notify(snapshot A)
  -> outer command completes
  -> outer notify(snapshot B)
  -> RAF later renders snapshot C
```

The production renderers do not subscribe directly, but public subscribers can observe snapshot A and B while the canvas and HTML remain on the previous RAF frame. No receipt states which observation became visible.

## Consequences

- A child mutation can be externally visible before its parent action is complete.
- Parent route mutation can be observed separately from child gameplay mutation.
- The caller receives no canvas or HTML frame identity.
- A rejected child may be invisible in the returned parent result.
- Public readback can advance beyond visible pixels.

## Required render contract

```txt
CommittedCommandResult
  -> immutable render snapshot
  -> canvas render result
  -> HTML render result
  -> required-consumer barrier
  -> CommandFrameReceipt
```

Required receipt fields:

```txt
commandId
transactionId
stateRevision
routeRevision
canvasFrameId
htmlFrameId
canvasStatus
htmlStatus
firstVisibleAt
```

## Required policy

- Buffer subscriber publication during transaction preparation and commit.
- Publish one committed snapshot after aggregate commit.
- Render canvas and HTML from the same immutable revision.
- Mark a result pending until both required surfaces acknowledge it.
- Preserve explicit failed-frame and superseded-frame results.
- Never claim a command is visually complete from state commit alone.

## Proof gate

```txt
single intent -> one committed publication
canvas and HTML consume the same state revision
public observation does not advance past the last acknowledged frame
child rejection produces no new frame revision
accepted duplicate produces no additional frame
```