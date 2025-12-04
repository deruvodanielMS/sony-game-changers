import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Card } from './Card'

describe('<Card />', () => {
  it('renderiza los children correctamente', () => {
    render(<Card>Hola mundo</Card>)
    expect(screen.getByText('Hola mundo')).toBeInTheDocument()
  })

  it('aplica las clases por defecto', () => {
    const { container } = render(<Card>Contenido</Card>)

    const div = container.firstElementChild as HTMLElement

    expect(div.className).toContain('bg-neutral-0')
    expect(div.className).toContain('rounded-default')
    expect(div.className).toContain('border-neutral-300')
    expect(div.className).toContain('p-1_5')
  })

  it('fusiona className externo con el interno', () => {
    const { container } = render(<Card className="extra-class">Contenido</Card>)

    const div = container.firstElementChild as HTMLElement

    expect(div.className).toContain('extra-class')
  })

  it('match snapshot', () => {
    const { container } = render(<Card className="test-class">Snapshot</Card>)
    expect(container.firstElementChild).toMatchSnapshot()
  })
})
