// Types for Backgammon game, color, and move direction
import { BackgammonBoard } from './Board'

export type BackgammonColor = 'black' | 'white'
export type BackgammonMoveDirection = 'clockwise' | 'counterclockwise'

export interface BackgammonGame {
  board: BackgammonBoard
}
