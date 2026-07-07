# Zombie Orchard

Standalone kit-composed orchard survival/economy game shell.

## Architecture

```txt
Kits + Presets + Host Renderers
```

The app uses reusable scoped interface domains and project presets.

## Domains

| Screen | Domain |
| --- | --- |
| title | entry |
| save select | session-select |
| new game | run-setup |
| gameplay | active-session |
| pause | interrupt |
| build | construction |
| shop | exchange |
| workers | roster |
| inventory | inventory |
| codex | knowledge |
| settings | preferences |
| game over | outcome |

## Development

```bash
npm run dev
npm test
```

No npm dependencies are required for the static dev server.
