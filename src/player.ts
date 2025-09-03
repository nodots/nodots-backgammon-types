import { BackgammonBoard } from './board'
import { BackgammonChecker } from './checker'
import { BackgammonMoveOrigin, BackgammonPoint } from './checkercontainer'
import {
  BackgammonDice,
  BackgammonDiceInactive,
  BackgammonDiceRolled,
  BackgammonDiceRolledForStart,
  BackgammonDiceRolling,
  BackgammonDiceRollingForStart,
  BackgammonDieValue,
} from './dice'
import { BackgammonColor, BackgammonMoveDirection } from './game'
import { BackgammonMoveReady, BackgammonMoveResult } from './move'
import { BackgammonPips } from './pip'
import { BackgammonPlayMoving } from './play'

export type BackgammonPlayerStateKind =
  | 'inactive'
  | 'rolling-for-start'
  | 'rolled-for-start'
  | 'rolling'
  | 'rolled'
  | 'doubled'
  | 'moving'
  | 'moved'
  | 'winner'

interface BasePlayerProps {
  id?: string
  userId: string
  color: BackgammonColor
  direction: BackgammonMoveDirection
  pipCount: BackgammonPips
  isRobot: boolean
  rollForStartValue?: BackgammonDieValue
}

export type BackgammonPlayerInitializing = BasePlayerProps & {
  stateKind: 'initializing'
  dice: BackgammonDice
}

export type BackgammonPlayerInactive = BasePlayerProps & {
  id: string
  stateKind: 'inactive'
  dice: BackgammonDiceInactive
}

export type BackgammonPlayerRollingForStart = BasePlayerProps & {
  id: string
  stateKind: 'rolling-for-start'
  dice: BackgammonDiceRollingForStart
}

export type BackgammonPlayerRolledForStart = BasePlayerProps & {
  id: string
  stateKind: 'rolled-for-start'
  dice: BackgammonDiceRolledForStart
  rollForStartValue: BackgammonDieValue
}

export type BackgammonPlayerRolling = BasePlayerProps & {
  id: string
  stateKind: 'rolling'
  dice: BackgammonDiceRolling
}

export type BackgammonPlayerRolled = BasePlayerProps & {
  id: string
  stateKind: 'rolled'
  dice: BackgammonDiceRolled
}

export type BackgammonPlayerDoubled = BasePlayerProps & {
  id: string
  stateKind: 'doubled'
  dice: BackgammonDiceRolled
}

export type BackgammonPlayerMoving = BasePlayerProps & {
  id: string
  stateKind: 'moving'
  dice: BackgammonDiceRolled
}

export type BackgammonPlayerMoved = BasePlayerProps & {
  id: string
  stateKind: 'moved'
  dice: BackgammonDiceRolled
}

export type BackgammonPlayerWinner = BasePlayerProps & {
  id: string
  stateKind: 'winner'
  dice: BackgammonDiceRolled
}

export type BackgammonPlayer =
  | BackgammonPlayerInactive
  | BackgammonPlayerRollingForStart
  | BackgammonPlayerRolledForStart
  | BackgammonPlayerRolling
  | BackgammonPlayerRolled
  | BackgammonPlayerDoubled
  | BackgammonPlayerMoving
  | BackgammonPlayerMoved
  | BackgammonPlayerWinner

export type BackgammonPlayerActive =
  | BackgammonPlayerRollingForStart
  | BackgammonPlayerRolledForStart
  | BackgammonPlayerRolling
  | BackgammonPlayerRolled
  | BackgammonPlayerDoubled
  | BackgammonPlayerMoving
  | BackgammonPlayerMoved

export type BackgammonPlayers = [BackgammonPlayer, BackgammonPlayer]

export type BackgammonPlayerCheckers<
  T extends BackgammonChecker = BackgammonChecker,
> = [T, T, T, T, T, T, T, T, T, T, T, T, T, T, T]

export interface PlayerClass {
  id: string
  stateKind: BackgammonPlayerStateKind
  dice: BackgammonDice
  pipCount: number
  rollForStartValue?: BackgammonDieValue

  initialize: (
    color: BackgammonColor,
    direction: BackgammonMoveDirection,
    dice?: BackgammonDice,
    id?: string,
    stateKind?: BackgammonPlayerStateKind,
    rollForStartValue?: BackgammonDieValue
  ) => BackgammonPlayer
  rollForStart: (
    player: BackgammonPlayerRollingForStart
  ) => BackgammonPlayerRolledForStart
  roll: (player: BackgammonPlayerRolling) => BackgammonPlayerRolled
  double: (player: BackgammonPlayerRolled) => BackgammonPlayerDoubled
  move: (
    board: BackgammonBoard,
    play: BackgammonPlayMoving,
    origin: BackgammonMoveOrigin
  ) => BackgammonMoveResult
  getHomeBoard: (
    board: BackgammonBoard,
    player: BackgammonPlayer
  ) => BackgammonPoint[]
  getOpponentBoard: (
    board: BackgammonBoard,
    player: BackgammonPlayer
  ) => BackgammonPoint[]
  getBestMove: (possibleMoves: BackgammonMoveReady[]) => BackgammonMoveReady
  // These methods are added to mirror the GameClass interface, making player state transitions
  // (to 'moving' and 'doubling') explicit and keeping the player model consistent with the game model.
  toMoving: (
    player: BackgammonPlayerRolled | BackgammonPlayerDoubled
  ) => BackgammonPlayerMoving
  toDoubling: (player: BackgammonPlayerRolled) => BackgammonPlayerDoubled
}
