import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Avatar } from './Avatar'

// Mock Next Image
vi.mock('next/image', () => ({
  default: ({
    src,
    alt,
    width,
    height,
    className,
  }: {
    src: string
    alt: string
    width: number
    height: number
    className: string
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} width={width} height={height} className={className} />
  ),
}))

// Mock generateInitialsAvatar
vi.mock('@/utils/generateInitialsAvatar', () => ({
  generateInitialsAvatarSrc: (name: string) => `data:image/svg+xml,${name}`,
}))

describe('Avatar', () => {
  it('renders with provided image src', () => {
    render(<Avatar src="/test.jpg" alt="Test User" />)
    const img = screen.getByAltText('Test User')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', '/test.jpg')
  })

  it('generates initials fallback when no src provided', () => {
    render(<Avatar alt="John Doe" />)
    const img = screen.getByAltText('John Doe')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', 'data:image/svg+xml,John Doe')
  })

  it('shows custom fallback when provided and no src', () => {
    render(<Avatar alt="User" fallback={<span>JD</span>} />)
    expect(screen.getByText('JD')).toBeInTheDocument()
  })

  it('applies default size (md)', () => {
    render(<Avatar alt="User" data-test-id="avatar" />)
    const avatar = screen.getByTestId('avatar')
    expect(avatar).toHaveClass('size-2')
  })

  it('applies xs size', () => {
    render(<Avatar alt="User" size="xs" data-test-id="avatar" />)
    const avatar = screen.getByTestId('avatar')
    expect(avatar).toHaveClass('size-1')
  })

  it('applies sm size', () => {
    render(<Avatar alt="User" size="sm" data-test-id="avatar" />)
    const avatar = screen.getByTestId('avatar')
    expect(avatar).toHaveClass('size-1_5')
  })

  it('applies lg size', () => {
    render(<Avatar alt="User" size="lg" data-test-id="avatar" />)
    const avatar = screen.getByTestId('avatar')
    expect(avatar).toHaveClass('size-3')
  })

  it('applies xl size', () => {
    render(<Avatar alt="User" size="xl" data-test-id="avatar" />)
    const avatar = screen.getByTestId('avatar')
    expect(avatar).toHaveClass('size-4')
  })

  it('displays tooltip with user name on hover', () => {
    render(<Avatar alt="John Doe" src="/test.jpg" data-test-id="avatar" />)
    const avatar = screen.getByTestId('avatar')
    expect(avatar).toHaveAttribute('title', 'John Doe')
  })

  it('applies custom pixel size', () => {
    render(<Avatar alt="User" size={100} data-test-id="avatar" />)
    const avatar = screen.getByTestId('avatar')
    expect(avatar).toHaveStyle({ width: '100px', height: '100px' })
  })

  it('applies circle shape by default', () => {
    render(<Avatar alt="User" data-test-id="avatar" />)
    const avatar = screen.getByTestId('avatar')
    expect(avatar).toHaveClass('rounded-full')
  })

  it('always applies circle shape (square removed)', () => {
    render(<Avatar alt="User" data-test-id="avatar" />)
    const avatar = screen.getByTestId('avatar')
    expect(avatar).toHaveClass('rounded-full')
  })

  it('merges custom className', () => {
    render(<Avatar alt="User" className="custom-class" data-test-id="avatar" />)
    const avatar = screen.getByTestId('avatar')
    expect(avatar).toHaveClass('custom-class')
    expect(avatar).toHaveClass('size-2') // default size still applies
  })

  it('applies data-test-id attribute', () => {
    render(<Avatar alt="User" data-test-id="custom-avatar" />)
    expect(screen.getByTestId('custom-avatar')).toBeInTheDocument()
  })
})
