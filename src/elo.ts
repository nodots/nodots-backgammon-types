/**
 * ELO Rating System Types
 *
 * Standard ELO rating system adapted for backgammon.
 * Used to rate human players based on game outcomes.
 * Robot ratings are derived from their Performance Rating (PR).
 */

export interface EloConfig {
  /** Starting rating for new players */
  startingRating: number
  /** K-factor for players with fewer than thresholds.newPlayerGames games */
  kFactorNew: number
  /** K-factor for established players (below elite threshold) */
  kFactorEstablished: number
  /** K-factor for elite players (above thresholds.eliteRating) */
  kFactorElite: number
  thresholds: {
    /** Games below which a player is considered "new" */
    newPlayerGames: number
    /** Rating above which a player is considered "elite" */
    eliteRating: number
  }
}

export const DEFAULT_ELO_CONFIG: EloConfig = {
  startingRating: 1500,
  kFactorNew: 32,
  kFactorEstablished: 16,
  kFactorElite: 10,
  thresholds: {
    newPlayerGames: 30,
    eliteRating: 2100,
  },
} as const

export interface EloCalculationResult {
  previousRating: number
  newRating: number
  ratingChange: number
  expectedScore: number
  actualScore: number
  kFactor: number
  opponentRating: number
}

export interface EloRating {
  rating: number
  gamesPlayed: number
  updatedAt: Date | null
}
