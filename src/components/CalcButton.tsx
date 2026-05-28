interface Props {
  label: string
  onClick: () => void
  variant?: 'digit' | 'operator' | 'equals' | 'action'
  wide?: boolean
}

export function CalcButton({ label, onClick, variant = 'digit', wide }: Props) {
  return (
    <button
      className={`calc-btn ${variant} ${wide ? 'wide' : ''}`}
      onClick={onClick}
      aria-label={label}
    >
      {label}
    </button>
  )
}
