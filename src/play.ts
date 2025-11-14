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
