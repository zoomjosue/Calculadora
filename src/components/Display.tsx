interface Props {
  value: string
  operation?: string
}

export function Display({ value, operation = '' }: Props) {
  const isError = value === 'ERROR'
  const shrink = value.length > 6
  return (
    <div className={`display ${isError ? 'error' : ''} ${shrink ? 'shrink' : ''}`}>
      <div className="display-operation">{operation}</div>
      <div className="display-value">{value}</div>
    </div>
  )
}
