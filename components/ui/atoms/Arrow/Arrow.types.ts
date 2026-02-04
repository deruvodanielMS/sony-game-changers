export type ArrowType =
  | 'Higher top'
  | 'Higher bottom'
  | 'Laddered top'
  | 'Laddered middle'
  | 'Laddered bottom'

export interface ArrowProps {
  className?: string
  type?: ArrowType
  'data-testid'?: string
}
