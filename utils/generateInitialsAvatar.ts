export interface AvatarOptions {
  size?: number
  backgroundColor?: string
  textColor?: string
  fontSize?: number
  borderRadius?: number
}

export function generateInitialsAvatarSrc(name: string, options: AvatarOptions = {}): string {
  const {
    size = 64,
    backgroundColor = '#4f46e5',
    textColor = '#ffffff',
    fontSize = size * 0.45,
    borderRadius = size / 2,
  } = options

  const initials = name
    ? name
        .trim()
        .split(/\s+/)
        .map((n) => n[0].toUpperCase())
        .slice(0, 2)
        .join('')
    : 'NN'

  const svg = `
<svg
  width="${size}"
  height="${size}"
  viewBox="0 0 ${size} ${size}"
  xmlns="http://www.w3.org/2000/svg"
  role="img"
  aria-label="${initials}"
>
  <rect
    width="${size}"
    height="${size}"
    rx="${borderRadius}"
    ry="${borderRadius}"
    fill="${backgroundColor}"
  />
  <text
    x="50%"
    y="50%"
    dominant-baseline="central"
    text-anchor="middle"
    fill="${textColor}"
    font-family="Inter, Arial, sans-serif"
    font-size="${fontSize}"
    font-weight="600"
  >
    ${initials}
  </text>
</svg>`

  const base64 = Buffer.from(svg).toString('base64')
  return `data:image/svg+xml;base64,${base64}`
}
