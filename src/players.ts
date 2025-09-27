import {
  PlayerClass,
  BackgammonPlayerInactive,
  BackgammonPlayerMoving,
  BackgammonPlayerRolling,
  BackgammonPlayerRolledForStart,
  BackgammonPlayerRollingForStart,
} from './player'

export type Players = [PlayerClass, PlayerClass]

// Strongly-typed player tuples for each game state
export type BackgammonPlayersRollingForStartTuple = [
  BackgammonPlayerRollingForStart,
  BackgammonPlayerRollingForStart
]
export type BackgammonPlayersRolledForStartTuple = [
  BackgammonPlayerRolledForStart,
  BackgammonPlayerRolledForStart
]
export type BackgammonPlayersRollingTuple = [
  BackgammonPlayerRolling,
  BackgammonPlayerInactive
]
export type BackgammonPlayersMovingTuple = [
  BackgammonPlayerMoving,
  BackgammonPlayerInactive
]
