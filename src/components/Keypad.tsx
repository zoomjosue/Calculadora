import { CalcButton } from './CalcButton'
import { BUTTONS } from './buttonData'
import type { CalcActions, BtnVariant, Op } from './types'
export function Keypad({ pressDigit, pressDot, pressOperator, pressEquals, toggleSign, clear }: CalcActions) {
  const handle = (label: string, kind: string, val: string | null) => {
    if (kind === 'clear') return clear()
    if (kind === 'toggleSign') return toggleSign()
    if (kind === 'op') return pressOperator(val as Op)
    if (kind === 'dot') return pressDot()
    if (kind === 'eq') return pressEquals()
    return pressDigit(label)
  }
  return (
    <div className="keypad">
      {BUTTONS.map(([label, variant, val, kind]) => (
        <CalcButton key={label + kind} label={label} variant={variant as BtnVariant}
          wide={kind === 'dw'} onClick={() => handle(label, kind, val as string | null)} />
      ))}
    </div>
  )
}
