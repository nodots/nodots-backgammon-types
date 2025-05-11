// Types for Backgammon checker containers, points, bars, and offs
import { BackgammonChecker } from './Checker'

export interface BackgammonCheckerContainer {
  checkers: BackgammonChecker[]
}

export interface BackgammonPoint extends BackgammonCheckerContainer {
  index: number
}

export interface BackgammonBar extends BackgammonCheckerContainer {}

export interface BackgammonOff extends BackgammonCheckerContainer {}

export type BackgammonCheckerContainerPosition = any
export type BackgammonPoints = BackgammonPoint[]

export const __checkercontainer_module = true
