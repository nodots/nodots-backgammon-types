import { BackgammonRoll } from './dice'
import {
  BackgammonMoves,
  BackgammonMoveReady,
  BackgammonMoveInProgress,
  BackgammonMoveCompleted,
} from './move'
import {
  BackgammonPlayer,
  BackgammonPlayerMoving,
  BackgammonPlayerRolled,
  BackgammonPlayerRolling,
} from './player'
import { BackgammonBoard } from './board'
import { BackgammonCube } from './cube'
import { BackgammonMoveOrigin } from './checkercontainer'

export type BackgammonPlayResult = {
  board: BackgammonBoard
  play: BackgammonPlay
  move: BackgammonMoveCompleted
}

export type BackgammonPlayStateKind =
  | 'rolling'
  | 'rolled'
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

export type BackgammonPlayRolled = Play & {
  stateKind: 'rolled'
  player: BackgammonPlayerRolled
  moves: BackgammonMoves
}

export type BackgammonPlayDoubled = Play & {
  stateKind: 'doubled'
}

export type BackgammonPlayMoving = Play & {
  stateKind: 'moving'
  player: BackgammonPlayerMoving
  moves: BackgammonMoves
}

export type BackgammonPlayMoved = Play & {
  stateKind: 'moved'
  player: BackgammonPlayer
}

export type BackgammonPlayConfirmed = Play & {
  stateKind: 'confirmed'
  player: BackgammonPlayer
}

export type BackgammonPlay =
  | BackgammonPlayRolling
  | BackgammonPlayRolled
  | BackgammonPlayDoubled
  | BackgammonPlayMoving
  | BackgammonPlayMoved
  | BackgammonMoveCompleted

export type BackgammonRollResults = {
  player: BackgammonPlayerRolled
  activePlay: BackgammonPlayRolled
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
    | BackgammonPlayerRolled
    | BackgammonPlayerMoving

  initialize: (
    board: BackgammonBoard,
    player: BackgammonPlayerRolled
  ) => BackgammonPlayRolled
  move: (
    board: BackgammonBoard,
    play: BackgammonPlayRolled | BackgammonPlayMoving,
    origin: BackgammonMoveOrigin
  ) => {
    play: BackgammonPlayMoving
    board: BackgammonBoard
    move: BackgammonMoveCompleted
  }
}
