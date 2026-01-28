import { describe, it, expect } from 'vitest'
import { generateInitialsAvatarSrc } from './generateInitialsAvatar'

function decodeSvg(dataUrl: string) {
  const [, base64] = dataUrl.split(',')
  return Buffer.from(base64, 'base64').toString('utf8')
}

describe('generateInitialsAvatarSrc', () => {
  it('returns a data URL with base64 SVG', () => {
    const src = generateInitialsAvatarSrc('John Doe')
    expect(src.startsWith('data:image/svg+xml;base64,')).toBe(true)
  })

  it('extracts initials from a two-word name', () => {
    const src = generateInitialsAvatarSrc('John Doe')
    const svg = decodeSvg(src)
    expect(svg).toContain('aria-label="JD"')
    expect(/>\s*JD\s*</.test(svg)).toBe(true)
  })

  it('handles single-name input (single initial)', () => {
    const src = generateInitialsAvatarSrc('Alice')
    const svg = decodeSvg(src)
    expect(svg).toContain('aria-label="A"')
    expect(/>\s*A\s*</.test(svg)).toBe(true)
  })

  it('falls back to NN when given an empty name', () => {
    const src = generateInitialsAvatarSrc('')
    const svg = decodeSvg(src)
    expect(svg).toContain('aria-label="NN"')
    expect(/>\s*NN\s*</.test(svg)).toBe(true)
  })

  it('applies provided options (size, colors, fontSize, borderRadius)', () => {
    const src = generateInitialsAvatarSrc('John Doe', {
      size: 100,
      backgroundColor: '#123456',
      textColor: '#abcdef',
      fontSize: 40,
      borderRadius: 10,
    })

    const svg = decodeSvg(src)
    expect(svg).toContain('width="100"')
    expect(svg).toContain('height="100"')
    expect(svg).toContain('fill="#123456"')
    expect(svg).toContain('fill="#abcdef"')
    expect(svg).toContain('font-size="40"')
    expect(svg).toContain('rx="10"')
  })
})
