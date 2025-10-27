/**
 * XG (eXtreme Gammon) Format Types
 *
 * Types for importing and exporting games in the XG text format.
 * This format is used by XG Mobile and other backgammon software
 * for sharing and analyzing games.
 *
 * Reference: https://www.extremegammon.com/xgformat.aspx
 */

/**
 * XG Match Header - Metadata for a match or game session
 */
export interface XGMatchHeader {
  site: string
  matchId?: string
  player1: string
  player2: string
  player1Elo?: string
  player2Elo?: string
  timeControl?: string
  eventDate: string
  eventTime: string
  variation: string
  crawford?: 'On' | 'Off'
  jacoby?: 'On' | 'Off'
  beaver?: 'On' | 'Off'
  unrated?: 'On' | 'Off'
  cubeLimit?: number
}

/**
 * Single checker move in XG notation
 */
export interface XGMove {
  from: number // 1-24 for points, 25 for bar, 0 for off
  to: number   // 1-24 for points, 25 for bar, 0 for off
}

/**
 * Doubling cube action
 */
export interface XGCubeAction {
  type: 'double' | 'take' | 'drop' | 'beaver' | 'raccoon'
  value?: number // Cube value when doubling
}

/**
 * Game ending information
 */
export interface XGGameEnd {
  winner: 1 | 2 // Player number who won
  points: number // Points won (1=normal, 2=gammon, 3=backgammon)
}

/**
 * Single move record - one turn by one player
 */
export interface XGMoveRecord {
  moveNumber: number
  player: 1 | 2
  dice?: [number, number]
  moves?: XGMove[]
  cubeAction?: XGCubeAction
  gameEnd?: XGGameEnd
}

/**
 * Complete game record with all moves
 */
export interface XGGameRecord {
  gameNumber: number
  initialScore: {
    player1: number
    player2: number
  }
  moves: XGMoveRecord[]
  winner: 1 | 2
  pointsWon: number
  finalScore: {
    player1: number
    player2: number
  }
}

/**
 * Complete XG match with header and games
 */
export interface XGMatch {
  header: XGMatchHeader
  matchLength: number // 0 for money game
  games: XGGameRecord[]
  metadata: {
    totalGames: number
    finalScore: {
      player1: number
      player2: number
    }
    parsedAt: Date
    fileSize: number
  }
}

/**
 * Parse error details
 */
export class XGParserError extends Error {
  constructor(
    message: string,
    public lineNumber?: number,
    public columnNumber?: number,
    public lineContent?: string
  ) {
    super(message)
    this.name = 'XGParserError'
  }
}

/**
 * Result of parsing an XG file
 */
export interface XGParseResult {
  success: boolean
  data?: XGMatch
  errors: XGParserError[]
  warnings: string[]
}

/**
 * Options for exporting to XG format
 */
export interface XGExportOptions {
  includeAnalysis?: boolean
  includeComments?: boolean
  site?: string
  includeElo?: boolean
}

/**
 * Result of exporting game history
 */
export interface HistoryExportResult {
  format: 'xg' | 'sgf' | 'json'
  data: string
  filename: string
  size: number
}
