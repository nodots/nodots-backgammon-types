/**
 * Match Equity Table (MET) Types
 *
 * A Match Equity Table provides the probability of winning a match from any
 * given score. This is essential for proper cube decisions in match play.
 */

/**
 * Match Equity Table data structure
 */
export interface MatchEquityTable {
  /** Name of the MET (e.g., "Kazaross XG2 25 point MET") */
  name: string
  /** Description of how the MET was generated */
  description: string
  /** Maximum match length supported */
  maxLength: number
  /**
   * Pre-Crawford equity table
   * preCrawford[i][j] = probability of winning when you need (i+1) points and opponent needs (j+1) points
   */
  preCrawford: number[][]
  /**
   * Post-Crawford equity table
   * postCrawford[i] = probability of winning when you are at match point (need 1) and opponent needs (i+1) points
   */
  postCrawford: number[]
}

/**
 * Match score context for MET lookups
 */
export interface MatchScoreContext {
  /** Points the player needs to win the match */
  playerAway: number
  /** Points the opponent needs to win the match */
  opponentAway: number
  /** Total match length */
  matchLength: number
  /** Whether this is a Crawford game */
  isCrawford: boolean
  /** Whether this is a post-Crawford game */
  isPostCrawford: boolean
}

/**
 * Cube decision analysis from MET
 */
export interface CubeDecisionAnalysis {
  /** Match winning probability for the player on roll */
  matchEquity: number
  /** Match winning probability if cube is passed (opponent wins current game value) */
  equityIfPass: number
  /** Match winning probability if cube is taken (game continues at new cube value) */
  equityIfTake: number
  /** Minimum game winning probability to take the cube */
  takePoint: number
  /** Minimum game winning probability to offer a double */
  doublePoint: number
  /** Value of winning a gammon at this score */
  gammonPrice: number
  /** Value of winning a backgammon at this score */
  backgammonPrice: number
  /** Whether the cube should be passed */
  shouldPass: boolean
  /** Whether the cube should be doubled */
  shouldDouble: boolean
}

/**
 * Pre-computed gammon values for efficient lookup
 */
export interface GammonValues {
  /** Value of winning a gammon for the player */
  playerGammonValue: number
  /** Value of winning a gammon for the opponent */
  opponentGammonValue: number
  /** Value of winning a backgammon for the player */
  playerBackgammonValue: number
  /** Value of winning a backgammon for the opponent */
  opponentBackgammonValue: number
}
