import { render, screen, fireEvent } from '@testing-library/react'
import { AvatarSelect } from './AvatarSelect'

describe('AvatarSelect', () => {
  const options = [
    { url: '/profile-img/james-miller.png', uid: '1', name: 'James Miller' },
    { url: '/profile-img/jane-doe.png', uid: '2', name: 'Jane Doe' },
  ]

  it('renders avatar options', () => {
    render(<AvatarSelect options={options} selected={[]} onAvatarSelect={() => {}} />)
    expect(screen.getByTitle('James Miller')).toBeInTheDocument()
    expect(screen.getByTitle('Jane Doe')).toBeInTheDocument()
  })

  it('calls onAvatarSelect when an avatar is clicked', () => {
    const onAvatarSelect = vi.fn()
    render(<AvatarSelect options={options} selected={[]} onAvatarSelect={onAvatarSelect} />)
    fireEvent.click(screen.getByTitle('James Miller'))
    expect(onAvatarSelect).toHaveBeenCalledWith(['1'])
  })
})
