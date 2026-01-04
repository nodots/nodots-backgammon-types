/**
 * Luck Analysis Types
 *
 * Luck in backgammon measures how favorable a dice roll was compared to the
 * average expected roll. For each position:
 * - Calculate the equity after the best play with the actual roll
 * - Calculate the expected equity across all possible rolls (weighted average)
 * - Luck = actual equity - expected equity
 *
 * Positive luck means the roll was better than average, negative means worse.
 */

import type { BackgammonColor } from './game'

/**
 * Luck classification thresholds (in equity points)
 * These thresholds determine when a roll is considered a joker or anti-joker
 */
export interface LuckThresholds {
  /** Luck value above which a roll is considered a joker (very lucky) */
  joker: number
  /** Luck value below which a roll is considered an anti-joker (very unlucky) */
  antiJoker: number
}

/**
 * Default luck thresholds based on common practice
 * Joker: luck > 0.1 (roll gave 10%+ more equity than average)
 * Anti-joker: luck < -0.1 (roll gave 10%+ less equity than average)
 */
export const DEFAULT_LUCK_THRESHOLDS: LuckThresholds = {
  joker: 0.1,
  antiJoker: -0.1,
}

/**
 * Luck classification for a roll
 */
export type LuckClassification = 'joker' | 'anti-joker' | 'normal'

/**
 * Luck analysis for a single roll
 */
export interface RollLuck {
  /** The dice roll [die1, die2] */
  dice: [number, number]
  /** Luck value: positive = lucky, negative = unlucky */
  luck: number
  /** Equity after best play with actual roll */
  actualEquity: number
  /** Expected equity (average across all 21 possible rolls) */
  expectedEquity: number
  /** Classification based on thresholds */
  classification: LuckClassification
  /** Move number in the game */
  moveNumber: number
  /** Player color who rolled */
  playerColor: BackgammonColor
}

/**
 * Luck summary for a player in a game
 */
export interface PlayerLuckSummary {
  /** Player's user ID */
  userId: string
  /** Player's color */
  playerColor: BackgammonColor
  /** Total accumulated luck (sum of all roll luck values) */
  totalLuck: number
  /** Number of rolls analyzed */
  rollCount: number
  /** Number of jokers (very lucky rolls) */
  jokerCount: number
  /** Number of anti-jokers (very unlucky rolls) */
  antiJokerCount: number
  /** Average luck per roll */
  averageLuck: number
}

/**
 * Complete luck analysis for a game
 */
export interface GameLuckAnalysis {
  /** Game ID */
  gameId: string
  /** Per-player luck summaries */
  players: PlayerLuckSummary[]
  /** Per-roll luck values (optional, for detailed view) */
  rolls?: RollLuck[]
  /** Whether analysis is complete */
  analysisComplete: boolean
  /** Thresholds used for classification */
  thresholds: LuckThresholds
  /** Error message if analysis failed */
  error?: string
}

/**
 * Luck-adjusted result for a game
 * Shows what the expected result would be if luck were neutral
 */
export interface LuckAdjustedResult {
  /** Actual result (e.g., player won by 2 points) */
  actualResult: number
  /** Player's total luck in the game */
  playerLuck: number
  /** Opponent's total luck in the game */
  opponentLuck: number
  /** Net luck difference (player luck - opponent luck) */
  netLuck: number
  /** Luck-adjusted result (actual result adjusted for luck differential) */
  adjustedResult: number
}
