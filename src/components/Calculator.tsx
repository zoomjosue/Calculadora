import { useCalculator } from '../hooks/useCalculator'
import { Display } from './Display'
import { Keypad } from './Keypad'
export function Calculator() {
  const { display, operation, ...actions } = useCalculator()
  return (
    <div className="calculator">
      <Display value={display} operation={operation} />
      <Keypad {...actions} />
    </div>
  )
}
