import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useCalculator } from '../hooks/useCalculator'

describe('useCalculator', () => {
  it('shows 0 initially', () => {
    const { result } = renderHook(() => useCalculator())
    expect(result.current.display).toBe('0')
  })

  it('displays a digit when pressed', () => {
    const { result } = renderHook(() => useCalculator())
    act(() => result.current.pressDigit('5'))
    expect(result.current.display).toBe('5')
  })

  it('concatenates multiple digits', () => {
    const { result } = renderHook(() => useCalculator())
    act(() => { result.current.pressDigit('1'); result.current.pressDigit('2'); result.current.pressDigit('3') })
    expect(result.current.display).toBe('123')
  })

  it('performs addition correctly', () => {
    const { result } = renderHook(() => useCalculator())
    act(() => {
      result.current.pressDigit('3')
      result.current.pressOperator('+')
      result.current.pressDigit('4')
      result.current.pressEquals()
    })
    expect(result.current.display).toBe('7')
  })

  it('shows the active operation while entering the second number', () => {
    const { result } = renderHook(() => useCalculator())
    act(() => {
      result.current.pressDigit('6')
      result.current.pressOperator('+')
    })
    expect(result.current.operation).toBe('6 +')

    act(() => result.current.pressDigit('6'))
    expect(result.current.display).toBe('6')
    expect(result.current.operation).toBe('6 +')

    act(() => result.current.pressEquals())
    expect(result.current.operation).toBe('')
  })

  it('performs subtraction correctly', () => {
    const { result } = renderHook(() => useCalculator())
    act(() => {
      result.current.pressDigit('9')
      result.current.pressOperator('-')
      result.current.pressDigit('5')
      result.current.pressEquals()
    })
    expect(result.current.display).toBe('4')
  })

  it('performs multiplication correctly', () => {
    const { result } = renderHook(() => useCalculator())
    act(() => {
      result.current.pressDigit('6')
      result.current.pressOperator('*')
      result.current.pressDigit('7')
      result.current.pressEquals()
    })
    expect(result.current.display).toBe('42')
  })

  it('performs division correctly', () => {
    const { result } = renderHook(() => useCalculator())
    act(() => {
      result.current.pressDigit('8')
      result.current.pressOperator('/')
      result.current.pressDigit('2')
      result.current.pressEquals()
    })
    expect(result.current.display).toBe('4')
  })

  it('shows ERROR for negative result', () => {
    const { result } = renderHook(() => useCalculator())
    act(() => {
      result.current.pressDigit('3')
      result.current.pressOperator('-')
      result.current.pressDigit('9')
      result.current.pressEquals()
    })
    expect(result.current.display).toBe('ERROR')
  })

  it('shows ERROR when result exceeds 999999999', () => {
    const { result } = renderHook(() => useCalculator())
    act(() => {
      ['9','9','9','9','9','9','9','9','9'].forEach(d => result.current.pressDigit(d))
      result.current.pressOperator('+')
      result.current.pressDigit('1')
      result.current.pressEquals()
    })
    expect(result.current.display).toBe('ERROR')
  })

  it('limits input to 9 characters', () => {
    const { result } = renderHook(() => useCalculator())
    act(() => {
      for (let i = 0; i < 12; i++) result.current.pressDigit('1')
    })
    expect(result.current.display.length).toBeLessThanOrEqual(9)
  })

  it('clears display with clear()', () => {
    const { result } = renderHook(() => useCalculator())
    act(() => { result.current.pressDigit('7'); result.current.clear() })
    expect(result.current.display).toBe('0')
  })

  it('chains operations showing intermediate result', () => {
    const { result } = renderHook(() => useCalculator())
    act(() => {
      result.current.pressDigit('5')
      result.current.pressOperator('+')
      result.current.pressDigit('3')
      result.current.pressOperator('+')
    })
    expect(result.current.display).toBe('8')
  })

  it('toggles sign making number negative', () => {
    const { result } = renderHook(() => useCalculator())
    act(() => { result.current.pressDigit('5'); result.current.toggleSign() })
    expect(result.current.display).toBe('-5')
  })

  it('toggle sign twice returns to positive', () => {
    const { result } = renderHook(() => useCalculator())
    act(() => {
      result.current.pressDigit('5')
      result.current.toggleSign()
      result.current.toggleSign()
    })
    expect(result.current.display).toBe('5')
  })

  it('handles decimal input', () => {
    const { result } = renderHook(() => useCalculator())
    act(() => { result.current.pressDigit('3'); result.current.pressDot(); result.current.pressDigit('5') })
    expect(result.current.display).toBe('3.5')
  })

  it('prevents double decimal point', () => {
    const { result } = renderHook(() => useCalculator())
    act(() => {
      result.current.pressDigit('3')
      result.current.pressDot()
      result.current.pressDot()
      result.current.pressDigit('5')
    })
    expect(result.current.display).toBe('3.5')
  })

  it('performs modulo correctly', () => {
    const { result } = renderHook(() => useCalculator())
    act(() => {
      result.current.pressDigit('1')
      result.current.pressDigit('0')
      result.current.pressOperator('%')
      result.current.pressDigit('3')
      result.current.pressEquals()
    })
    expect(result.current.display).toBe('1')
  })

  it('shows ERROR on division by zero', () => {
    const { result } = renderHook(() => useCalculator())
    act(() => {
      result.current.pressDigit('5')
      result.current.pressOperator('/')
      result.current.pressDigit('0')
      result.current.pressEquals()
    })
    expect(result.current.display).toBe('ERROR')
  })

  it('truncates long division results to 9 chars', () => {
    const { result } = renderHook(() => useCalculator())
    act(() => {
      ['2','2'].forEach(d => result.current.pressDigit(d))
      result.current.pressOperator('/')
      result.current.pressDigit('7')
      result.current.pressEquals()
    })
    expect(result.current.display.length).toBeLessThanOrEqual(9)
  })
})
