import { BackgammonColor } from './game'

export interface MatchInfo {
  matchId: string
  gameNumber: number
  matchLength: number
  matchScore: Record<BackgammonColor, number>
  isCrawford?: boolean
}
