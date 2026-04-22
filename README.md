# @nodots/backgammon-types

Discriminated-union type contracts for every runtime in the [Nodots Backgammon](https://backgammon.nodots.com) ecosystem: game state, board, moves, dice, cube, match history, XG import, practice mode, and i18n.

## Install

```sh
npm install @nodots/backgammon-types
```

## Why a separate types package

One contract has to hold across the core engine, the API server, the web client, and the CLI. Pinning the contract in a standalone package means a breaking change surfaces as a TypeScript error in every consumer at build time — not as a runtime bug in production.

## Example

```ts
import type {
  BackgammonGame,
  BackgammonPlayer,
  BackgammonBoard,
} from '@nodots/backgammon-types'

function isRolling(game: BackgammonGame): boolean {
  return game.stateKind === 'rolling'
}

function activePlayer(game: BackgammonGame): BackgammonPlayer | undefined {
  return game.players.find((p) => p.stateKind !== 'inactive')
}
```

## What's in the package

| Module | Contents |
| --- | --- |
| `board`, `checker`, `checkercontainer` | Board geometry and the dual-direction position system. |
| `game`, `play`, `move` | Game and play state machines, move sequences, legal-move options. |
| `dice`, `cube` | Dice rolls (regular and doubles) and doubling-cube state. |
| `player`, `players` | Player identity, direction, turn state, robot flag. |
| `offer`, `doubling` | Cube offer/accept/decline state. |
| `history`, `match` | Append-only game history and multi-game match metadata. |
| `import`, `xg` | ExtremeGammon `.mat` / `.xg` import contracts. |
| `practice` | Drill-mode position and scoring types. |
| `pip`, `met` | Pip counts and match-equity-table interfaces. |
| `LocaleCode` | Supported UI locales: `en`, `es`, `fr`, `ar`, `tr`, `de`, `gr`. |

## Discriminated unions

Game and play state are discriminated on `stateKind`. The compiler enforces which operations are legal at each phase — `Game.roll` only accepts `rolling-for-start` or `rolling`, `Game.move` only accepts `moving`, and so on.

## Ecosystem

| Package | Role |
| --- | --- |
| [`@nodots/backgammon-types`](https://www.npmjs.com/package/@nodots/backgammon-types) | Type contracts (this package). |
| [`@nodots/backgammon-core`](https://www.npmjs.com/package/@nodots/backgammon-core) | Game logic. |
| [`@nodots/backgammon-ai`](https://www.npmjs.com/package/@nodots/backgammon-ai) | GNU-backed robot move selection. |
| [`@nodots/backgammon-api-utils`](https://www.npmjs.com/package/@nodots/backgammon-api-utils) | Request, response, and WebSocket contracts. |
| [`@nodots/backgammon-cli`](https://www.npmjs.com/package/@nodots/backgammon-cli) | Terminal client (`ndbg`). |
| [`@nodots/gnubg-hints`](https://www.npmjs.com/package/@nodots/gnubg-hints) | Native GNU Backgammon hints addon. |

Hosted product: [backgammon.nodots.com](https://backgammon.nodots.com).

## License

GPL-3.0. See [`LICENSE`](./LICENSE).
