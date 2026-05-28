import { useReducer } from 'react'

const MAX_DIGITS = 9
const MAX_VALUE = 999999999

type Op = '+' | '-' | '*' | '/' | '%' | null

interface State {
  display: string
  operand: number | null
  operator: Op
  waitingForOperand: boolean
}

type Action =
  | { type: 'DIGIT'; payload: string }
  | { type: 'DOT' }
  | { type: 'OPERATOR'; payload: Op }
  | { type: 'EQUALS' }
  | { type: 'TOGGLE_SIGN' }
  | { type: 'CLEAR' }

const initial: State = {
  display: '0',
  operand: null,
  operator: null,
  waitingForOperand: false,
}

function format(n: number): string {
  if (n < 0) return 'ERROR'
  if (n > MAX_VALUE) return 'ERROR'
  const s = String(n)
  if (s.length > MAX_DIGITS) return s.slice(0, MAX_DIGITS)
  return s
}

function compute(a: number, op: Op, b: number): string {
  let result: number
  if (op === '+') result = a + b
  else if (op === '-') result = a - b
  else if (op === '*') result = a * b
  else if (op === '/') {
    if (b === 0) return 'ERROR'
    result = a / b
  } else if (op === '%') result = a % b
  else return String(b)
  return format(result)
}

function formatOperator(op: Op): string {
  if (op === '*') return '*'
  if (op === '/') return '/'
  return op ?? ''
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'DIGIT': {
      if (state.display === 'ERROR') return state
      if (state.waitingForOperand) {
        return { ...state, display: action.payload, waitingForOperand: false }
      }
      if (state.display === '0') {
        return { ...state, display: action.payload }
      }
      const stripped = state.display.replace('-', '')
      if (stripped.replace('.', '').length >= MAX_DIGITS) return state
      return { ...state, display: state.display + action.payload }
    }
    case 'DOT': {
      if (state.waitingForOperand) {
        return { ...state, display: '0.', waitingForOperand: false }
      }
      if (state.display.includes('.')) return state
      const stripped2 = state.display.replace('-', '')
      if (stripped2.length >= MAX_DIGITS) return state
      return { ...state, display: state.display + '.' }
    }
    case 'OPERATOR': {
      if (state.display === 'ERROR') {
        return { ...state, operator: action.payload, waitingForOperand: true }
      }
      const current = parseFloat(state.display)
      if (state.operand !== null && state.operator && !state.waitingForOperand) {
        const result = compute(state.operand, state.operator, current)
        return {
          display: result,
          operand: result === 'ERROR' ? null : parseFloat(result),
          operator: action.payload,
          waitingForOperand: true,
        }
      }
      return {
        ...state,
        operand: current,
        operator: action.payload,
        waitingForOperand: true,
      }
    }
    case 'EQUALS': {
      if (state.operand === null || state.operator === null) return state
      const val = parseFloat(state.display)
      const result = compute(state.operand, state.operator, val)
      return { display: result, operand: null, operator: null, waitingForOperand: false }
    }
    case 'TOGGLE_SIGN': {
      if (state.display === 'ERROR' || state.display === '0') return state
      if (state.display.startsWith('-')) {
        return { ...state, display: state.display.slice(1) }
      }
      if (state.display.length >= MAX_DIGITS) return state
      return { ...state, display: '-' + state.display }
    }
    case 'CLEAR':
      return initial
    default:
      return state
  }
}

export function useCalculator() {
  const [state, dispatch] = useReducer(reducer, initial)
  const operation = state.operand !== null && state.operator
    ? `${state.operand} ${formatOperator(state.operator)}`
    : ''

  const pressDigit = (d: string) => dispatch({ type: 'DIGIT', payload: d })
  const pressDot = () => dispatch({ type: 'DOT' })
  const pressOperator = (op: Op) => dispatch({ type: 'OPERATOR', payload: op })
  const pressEquals = () => dispatch({ type: 'EQUALS' })
  const toggleSign = () => dispatch({ type: 'TOGGLE_SIGN' })
  const clear = () => dispatch({ type: 'CLEAR' })

  return { display: state.display, operation, pressDigit, pressDot, pressOperator, pressEquals, toggleSign, clear }
}
