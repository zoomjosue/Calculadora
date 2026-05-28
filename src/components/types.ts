import type { useCalculator } from '../hooks/useCalculator'
export type CalcActions = Omit<ReturnType<typeof useCalculator>, 'display' | 'operation'>
export type BtnVariant = 'digit' | 'operator' | 'equals' | 'action'
export type Op = Parameters<CalcActions['pressOperator']>[0]
