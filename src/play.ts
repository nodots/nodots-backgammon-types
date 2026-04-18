/**
 * Backgammon Play Types
 *
 * A "play" represents a player's complete turn, which may consist of multiple moves
 * (2 for a regular roll, 4 for doubles).
 *
 * ## Serialization Contract for `moves` Field
 *
 * **IMPORTANT**: The `moves` field has different representations in different contexts:
 *
 * - **Core Library (nodots-backgammon-core)**: Uses `Set<BackgammonMove>` for O(1) lookups
 *   and to ensure move uniqueness during turn processing.
 *
 * - **Type Definitions (this package)**: Defines `moves` as `BackgammonMoves` which is
 *   `BackgammonMove[]` (Array) because JSON serialization cannot represent Sets.
 *
 * - **API Responses**: Always returns `moves` as an Array (JSON-serialized).
 *
 * - **Client Applications**: Should always expect `moves` to be an Array. Use the
 *   `transformGameData` utility or `ensureArray` from `@nodots/backgammon-api-utils`
 *   if there's any doubt about the incoming data format.
 *
 * When consuming game data from APIs or WebSocket messages:
 * 1. The data should already be JSON-serialized (moves as Array)
 * 2. Use `Array.isArray(moves)` to verify if needed
 * 3. Never assume moves is a Set in client code
 *
 * When working with the core library directly:
 * 1. Use `Array.from(game.activePlay.moves)` to convert Set to Array
 * 2. The core library handles this conversion internally for its public APIs
 */

import { BackgammonBoard } from './board'
import { BackgammonMoveOrigin } from './checkercontainer'
import { BackgammonCube } from './cube'
import { BackgammonDiceRolled, BackgammonDieValue } from './dice'
import { BackgammonMoveCompleted, BackgammonMoves } from './move'
import {
  BackgammonPlayer,
  BackgammonPlayerMoving,
  BackgammonPlayerRolling,
} from './player'

export type BackgammonPlayResult = {
  board: BackgammonBoard
  play: BackgammonPlay
  move: BackgammonMoveCompleted
  autoSwitched?: boolean
  originalDieValue?: BackgammonDieValue
  usedDieValue?: BackgammonDieValue
}

export type BackgammonPlayStateKind =
  | 'rolling'
  | 'moving'
  | 'moved'
  | 'confirmed'

interface BasePlay {
  id: string
  player: BackgammonPlayer
  board: BackgammonBoard
  /**
   * The moves for this play (2 for regular roll, 4 for doubles).
   *
   * **Serialization Note**: In the core library this is internally a Set for O(1) lookups,
   * but in API responses and type definitions it is always an Array (BackgammonMove[]).
   * Client code should always treat this as an Array.
   *
   * @see BackgammonMoves (which is BackgammonMove[])
   */
  moves?: BackgammonMoves
}

interface Play extends BasePlay {
  stateKind: BackgammonPlayStateKind
}

export type BackgammonPlayRolling = Play & {
  stateKind: 'rolling'
  player: BackgammonPlayerRolling
}


export type BackgammonPlayDoubled = Play & {
  stateKind: 'doubled'
  player: BackgammonPlayerMoving
  moves: BackgammonMoves
  dice: BackgammonDiceRolled
}

export type BackgammonPlayMoving = Play & {
  stateKind: 'moving'
  player: BackgammonPlayerMoving
  moves: BackgammonMoves
  // Turn-local undo stack. Frames are complete pre-move snapshots of the moving game state.
  // Typed as any[] here to avoid circular dependency on BackgammonGameMoving at the types level.
  undo?: { frames: any[] }
}

export type BackgammonPlayMoved = Play & {
  stateKind: 'moved'
  player: BackgammonPlayer
  moves: BackgammonMoves
}

export type BackgammonPlayConfirmed = Play & {
  stateKind: 'confirmed'
  player: BackgammonPlayer
  moves: BackgammonMoves
}

export type BackgammonPlay =
  | BackgammonPlayRolling
  | BackgammonPlayDoubled
  | BackgammonPlayMoving
  | BackgammonPlayMoved
  | BackgammonPlayConfirmed

export type BackgammonRollResults = {
  player: BackgammonPlayerMoving
  activePlay: BackgammonPlayMoving
}

export type BackgammonPlayResults = {
  board: BackgammonBoard
  play: BackgammonPlay
}

export interface PlayProps {
  id?: string
  cube?: BackgammonCube
  stateKind?: BackgammonPlayStateKind
  moves?: BackgammonMoves
  board: BackgammonBoard
  player: BackgammonPlayerRolling | BackgammonPlayerMoving
}

export interface PlayClass {
  id?: string
  cube?: BackgammonCube
  stateKind?: BackgammonPlayStateKind
  moves?: BackgammonMoves
  board: BackgammonBoard
  player:
    | BackgammonPlayerRolling
    | BackgammonPlayerMoving

  initialize: (
    board: BackgammonBoard,
    player: BackgammonPlayerMoving
  ) => BackgammonPlayMoving
  move: (
    board: BackgammonBoard,
    play: BackgammonPlayMoving,
    origin: BackgammonMoveOrigin
  ) => BackgammonPlayResult
}
