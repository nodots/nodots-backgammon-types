import { IntegerRange } from './generics'

export const MAX_PIP_COUNT = 167 as const

export type BackgammonPips = IntegerRange<0, typeof MAX_PIP_COUNT>
