import { BackgammonBoard } from '.'
import {
  BackgammonCheckercontainer,
  BackgammonMoveDestination,
  BackgammonMoveOrigin,
  BackgammonPoint,
} from './checkercontainer'
import { BackgammonDieValue } from './dice'
import { BackgammonMoveDirection } from './game'
import { BackgammonPlayMoving } from './play'
import {
  BackgammonPlayer,
  BackgammonPlayerActive,
  BackgammonPlayerMoving,
  BackgammonPlayerRolled,
} from './player'

export type BackgammonMoveStateKind =
  | 'ready'
  | 'in-progress'
  | 'completed'
  | 'confirmed'

export type BackgammonMoveKind =
  | 'no-move'
  | 'point-to-point'
  | 'reenter'
  | 'bear-off'

export type BackgammonMoveSkeleton = {
  dieValue: BackgammonDieValue
  direction: BackgammonMoveDirection
  origin: BackgammonMoveOrigin
  destination: BackgammonMoveDestination
}

type BaseMove = {
  id: string
  player: BackgammonPlayerActive
  stateKind: BackgammonMoveStateKind
  dieValue: BackgammonDieValue
  possibleMoves: BackgammonMoveSkeleton[]
}

export type BackgammonMoveReady = BaseMove & {
  stateKind: 'ready'
  player: BackgammonPlayerRolled
  moveKind?: BackgammonMoveKind
  origin?: BackgammonMoveOrigin
}

export type BackgammonMoveInProgress = BaseMove & {
  stateKind: 'in-progress'
  moveKind: BackgammonMoveKind
  player: BackgammonPlayerMoving
  origin?: BackgammonMoveOrigin
  destination?: BackgammonMoveDestination
}

// Split completed moves into two cases
export type BackgammonMoveCompletedWithMove = BaseMove & {
  stateKind: 'completed'
  moveKind: 'point-to-point' | 'reenter' | 'bear-off'
  origin: BackgammonMoveOrigin
  destination: BackgammonMoveDestination
  isHit: boolean
}

export type BackgammonMoveCompletedNoMove = BaseMove & {
  stateKind: 'completed'
  moveKind: 'no-move'
  origin: undefined
  destination: undefined
  isHit: false
}

export type BackgammonMoveCompleted =
  | BackgammonMoveCompletedWithMove
  | BackgammonMoveCompletedNoMove

export type BackgammonMoveConfirmed = BaseMove & {
  stateKind: 'confirmed'
  moveKind: BackgammonMoveKind
  origin: BackgammonMoveOrigin
  destination: BackgammonMoveDestination
  isHit: boolean
}

export type BackgammonMove =
  | BackgammonMoveReady
  | BackgammonMoveInProgress
  | BackgammonMoveCompleted
  | BackgammonMoveConfirmed

export type BackgammonMoves =
  | [BackgammonMove, BackgammonMove]
  | [BackgammonMove, BackgammonMove, BackgammonMove, BackgammonMove]

export type BackgammonMoveResult = {
  board: BackgammonBoard
  move: BackgammonMoveCompleted
}

export type BackgammonMoveDryRunResult = {
  board: BackgammonBoard
  move: BackgammonMoveReady
}

export interface MoveProps {
  move: BackgammonMove
  origin: BackgammonMoveOrigin
}

export interface MoveClass {
  player: BackgammonPlayer
  id: string
  dieValue: BackgammonDieValue
  stateKind: BackgammonMoveStateKind
  moveKind: BackgammonMoveKind | undefined
  origin: BackgammonCheckercontainer | undefined
  destination: BackgammonCheckercontainer | undefined

  initialize: (props: MoveProps) => BackgammonMove
  isPointOpen: (
    point: BackgammonPoint,
    player: BackgammonPlayerMoving | BackgammonPlayerRolled
  ) => boolean
  move: (
    board: BackgammonBoard,
    move: BackgammonMoveReady,
    isDryRun?: boolean
  ) => BackgammonMoveResult | BackgammonMoveDryRunResult
  confirmMove: (move: BackgammonMoveInProgress) => BackgammonMoveConfirmed
}
