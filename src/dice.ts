import { BackgammonColor } from './game'
export type BackgammonDieValue = 1 | 2 | 3 | 4 | 5 | 6
export type BackgammonDieOrder = 0 | 1
export type BackgammonRoll = [BackgammonDieValue, BackgammonDieValue]
export type BackgammonRollForStart = [BackgammonDieValue, undefined]

export type BackgammonDiceStateKind =
  | 'inactive'
  | 'rolling-for-start'
  | 'rolled-for-start'
  | 'rolling'
  | 'rolled'

interface BaseDice {
  id: string
  color: BackgammonColor
  currentRoll?: BackgammonRoll | undefined
  total?: number
}

interface Dice extends BaseDice {
  stateKind: BackgammonDiceStateKind
}

export type BackgammonDiceRollingForStart = Dice & {
  stateKind: 'rolling-for-start'
}

export type BackgammonDiceRolledForStart = Dice & {
  stateKind: 'rolled-for-start'
  currentRoll: BackgammonRollForStart
}

export type BackgammonDiceInactive = Dice & {
  stateKind: 'inactive'
}

export type BackgammonDiceRolling = Dice & {
  stateKind: 'rolling'
}

export type BackgammonDiceRolled = Dice & {
  stateKind: 'rolled'
  currentRoll: BackgammonRoll
  total: number
}

export type BackgammonDice =
  | BackgammonDiceInactive
  | BackgammonDiceRollingForStart
  | BackgammonDiceRolledForStart
  | BackgammonDiceRolling
  | BackgammonDiceRolled

export interface DiceClass {
  id: string
  stateKind: BackgammonDiceStateKind
  color: BackgammonColor
  currentRoll: BackgammonRoll | BackgammonRollForStart | undefined

  initialize: (
    color: BackgammonColor,
    stateKind: BackgammonDiceStateKind,
    id?: string,
    currentRoll?: BackgammonRoll
  ) => BackgammonDiceInactive
  roll: (dice: BackgammonDiceInactive) => BackgammonDiceRolled
  rollForStart: (
    dice: BackgammonDiceRollingForStart
  ) => BackgammonDiceRolledForStart
  switchDice: (dice: BackgammonDiceRolled) => BackgammonDiceRolled
  isDouble: (dice: BackgammonDiceRolled) => boolean
  rollDie: () => BackgammonDieValue
  _RandomRoll: BackgammonRoll
}
