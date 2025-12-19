import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Foundations/ColorTokens',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

interface ColorSwatchProps {
  name: string
  variable: string
  hexValue?: string
  showA11y?: boolean
}

const ColorSwatch = ({ name, variable, hexValue, showA11y = true }: ColorSwatchProps) => {
  const [computedHex, setComputedHex] = React.useState<string>('')
  const [a11yRating, setA11yRating] = React.useState<string>('')

  React.useEffect(() => {
    if (hexValue) {
      setComputedHex(hexValue)
    } else if (typeof window !== 'undefined') {
      const computedValue = getComputedStyle(document.documentElement)
        .getPropertyValue(variable)
        .trim()
      setComputedHex(computedValue)

      // Calculate contrast ratio for a11y rating (simplified)
      if (showA11y && computedValue.startsWith('#')) {
        const hex = computedValue.replace('#', '')
        const r = parseInt(hex.substr(0, 2), 16)
        const g = parseInt(hex.substr(2, 2), 16)
        const b = parseInt(hex.substr(4, 2), 16)
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255

        if (luminance < 0.3) setA11yRating('AAA')
        else if (luminance < 0.5) setA11yRating('AA')
        else setA11yRating('AAA')
      }
    }
  }, [variable, hexValue, showA11y])

  const displayName = name.includes(' ') ? name.split(' ')[1] : name

  return (
    <div className="flex min-w-[110px] flex-col overflow-hidden rounded-lg border border-neutral-300 shadow-sm">
      <div className="relative h-24 w-full" style={{ backgroundColor: `var(${variable})` }}>
        {showA11y && a11yRating && (
          <div className="absolute right-2 top-2 rounded bg-black px-1_5 py-0_5">
            <span className="text-[10px] font-bold text-white">{a11yRating}</span>
          </div>
        )}
      </div>
      <div className="bg-white px-3 py-2_5">
        <div className="mb-1 text-sm font-bold text-black">
          {computedHex ? computedHex.toUpperCase() : '#000000'}
        </div>
        <div className="text-xs text-neutral-600">{displayName}</div>
      </div>
    </div>
  )
}

interface ColorPaletteProps {
  title: string
  colors: Array<{ name: string; variable: string; hexValue?: string }>
}

const ColorPalette = ({ title, colors }: ColorPaletteProps) => {
  return (
    <div className="mb-10">
      <h3 className="mb-4 text-sm font-semibold text-neutral-900">{title}</h3>
      <div className="flex flex-wrap gap-4">
        {colors.map((color) => (
          <ColorSwatch key={color.variable} {...color} />
        ))}
      </div>
    </div>
  )
}

export const AllColorTokens: Story = {
  render: () => {
    const accentColors = [
      { name: 'Primary', variable: '--accent-primary' },
      { name: 'Primary Dark', variable: '--accent-primary-dark' },
      { name: 'Highlight Subtle', variable: '--accent-highlight-subtle' },
      { name: 'Highlight Default', variable: '--accent-highlight-default' },
      { name: 'Border Active', variable: '--accent-border-active' },
      { name: 'Overlay', variable: '--accent-overlay' },
    ]

    const neutralColors = [
      { name: 'Neutral 0', variable: '--neutral-0' },
      { name: 'Neutral 100', variable: '--neutral-100' },
      { name: 'Neutral 200', variable: '--neutral-200' },
      { name: 'Neutral 300', variable: '--neutral-300' },
      { name: 'Neutral 400', variable: '--neutral-400' },
      { name: 'Neutral 500', variable: '--neutral-500' },
      { name: 'Neutral 600', variable: '--neutral-600' },
      { name: 'Neutral 700', variable: '--neutral-700' },
      { name: 'Neutral 800', variable: '--neutral-800' },
      { name: 'Neutral 900', variable: '--neutral-900' },
      { name: 'Neutral 1000', variable: '--neutral-1000' },
    ]

    const feedbackInfoColors = [
      { name: 'Info 100', variable: '--feedback-info-100' },
      { name: 'Info 200', variable: '--feedback-info-200' },
      { name: 'Info 400', variable: '--feedback-info-400' },
      { name: 'Info 600', variable: '--feedback-info-600' },
      { name: 'Info 800', variable: '--feedback-info-800' },
      { name: 'Info 950', variable: '--feedback-info-950' },
    ]

    const feedbackSuccessColors = [
      { name: 'Success 100', variable: '--feedback-success-100' },
      { name: 'Success 200', variable: '--feedback-success-200' },
      { name: 'Success 400', variable: '--feedback-success-400' },
      { name: 'Success 600', variable: '--feedback-success-600' },
      { name: 'Success 800', variable: '--feedback-success-800' },
      { name: 'Success 950', variable: '--feedback-success-950' },
    ]

    const feedbackWarningColors = [
      { name: 'Warning 100', variable: '--feedback-warning-100' },
      { name: 'Warning 200', variable: '--feedback-warning-200' },
      { name: 'Warning 400', variable: '--feedback-warning-400' },
      { name: 'Warning 600', variable: '--feedback-warning-600' },
      { name: 'Warning 800', variable: '--feedback-warning-800' },
      { name: 'Warning 950', variable: '--feedback-warning-950' },
    ]

    const feedbackDangerColors = [
      { name: 'Danger 100', variable: '--feedback-danger-100' },
      { name: 'Danger 200', variable: '--feedback-danger-200' },
      { name: 'Danger 400', variable: '--feedback-danger-400' },
      { name: 'Danger 600', variable: '--feedback-danger-600' },
      { name: 'Danger 800', variable: '--feedback-danger-800' },
      { name: 'Danger 950', variable: '--feedback-danger-950' },
    ]

    const extraRedColors = [
      { name: 'Red 100', variable: '--extra-red-100' },
      { name: 'Red 200', variable: '--extra-red-200' },
      { name: 'Red 300', variable: '--extra-red-300' },
      { name: 'Red 600', variable: '--extra-red-600' },
      { name: 'Red 800', variable: '--extra-red-800' },
      { name: 'Red 950', variable: '--extra-red-950' },
    ]

    const extraGreenColors = [
      { name: 'Green 100', variable: '--extra-green-100' },
      { name: 'Green 200', variable: '--extra-green-200' },
      { name: 'Green 300', variable: '--extra-green-300' },
      { name: 'Green 600', variable: '--extra-green-600' },
      { name: 'Green 800', variable: '--extra-green-800' },
      { name: 'Green 950', variable: '--extra-green-950' },
    ]

    const extraPinkColors = [
      { name: 'Pink 100', variable: '--extra-pink-100' },
      { name: 'Pink 200', variable: '--extra-pink-200' },
      { name: 'Pink 300', variable: '--extra-pink-300' },
      { name: 'Pink 600', variable: '--extra-pink-600' },
      { name: 'Pink 800', variable: '--extra-pink-800' },
      { name: 'Pink 950', variable: '--extra-pink-950' },
    ]

    const extraBlueColors = [
      { name: 'Blue 100', variable: '--extra-blue-100' },
      { name: 'Blue 200', variable: '--extra-blue-200' },
      { name: 'Blue 300', variable: '--extra-blue-300' },
      { name: 'Blue 600', variable: '--extra-blue-600' },
      { name: 'Blue 800', variable: '--extra-blue-800' },
      { name: 'Blue 950', variable: '--extra-blue-950' },
    ]

    return (
      <div className="p-10">
        <div className="mb-12">
          <h1 className="mb-4 text-h3 font-semibold leading-h3 text-color-neutral-1000">
            Color Tokens
          </h1>
          <p className="text-body text-color-neutral-600">
            Complete color palette configured in the design system. Colors adapt automatically based
            on the theme (light/dark).
          </p>
        </div>

        <ColorPalette title="🌈 Accent" colors={accentColors} />
        <ColorPalette title="⚪ Neutral" colors={neutralColors} />
        <ColorPalette title="💬 Feedback - Info" colors={feedbackInfoColors} />
        <ColorPalette title="💬 Feedback - Success" colors={feedbackSuccessColors} />
        <ColorPalette title="💬 Feedback - Warning" colors={feedbackWarningColors} />
        <ColorPalette title="💬 Feedback - Danger" colors={feedbackDangerColors} />
        <ColorPalette title="🌿 Extra - Red" colors={extraRedColors} />
        <ColorPalette title="🌿 Extra - Green" colors={extraGreenColors} />
        <ColorPalette title="🌿 Extra - Pink" colors={extraPinkColors} />
        <ColorPalette title="🌿 Extra - Blue" colors={extraBlueColors} />
      </div>
    )
  },
}

export const AccentColors: Story = {
  render: () => {
    const colors = [
      { name: 'Primary', variable: '--accent-primary' },
      { name: 'Primary Dark', variable: '--accent-primary-dark' },
      { name: 'Highlight Subtle', variable: '--accent-highlight-subtle' },
      { name: 'Highlight Default', variable: '--accent-highlight-default' },
      { name: 'Border Active', variable: '--accent-border-active' },
      { name: 'Overlay', variable: '--accent-overlay' },
    ]

    return (
      <div className="p-10">
        <ColorPalette title="🌈 Accent Colors" colors={colors} />
      </div>
    )
  },
}

export const NeutralColors: Story = {
  render: () => {
    const colors = [
      { name: 'Neutral 0', variable: '--neutral-0' },
      { name: 'Neutral 100', variable: '--neutral-100' },
      { name: 'Neutral 200', variable: '--neutral-200' },
      { name: 'Neutral 300', variable: '--neutral-300' },
      { name: 'Neutral 400', variable: '--neutral-400' },
      { name: 'Neutral 500', variable: '--neutral-500' },
      { name: 'Neutral 600', variable: '--neutral-600' },
      { name: 'Neutral 700', variable: '--neutral-700' },
      { name: 'Neutral 800', variable: '--neutral-800' },
      { name: 'Neutral 900', variable: '--neutral-900' },
      { name: 'Neutral 1000', variable: '--neutral-1000' },
    ]

    return (
      <div className="p-10">
        <ColorPalette title="⚪ Neutral Colors" colors={colors} />
      </div>
    )
  },
}

export const FeedbackColors: Story = {
  render: () => {
    const infoColors = [
      { name: 'Info 100', variable: '--feedback-info-100' },
      { name: 'Info 200', variable: '--feedback-info-200' },
      { name: 'Info 400', variable: '--feedback-info-400' },
      { name: 'Info 600', variable: '--feedback-info-600' },
      { name: 'Info 800', variable: '--feedback-info-800' },
      { name: 'Info 950', variable: '--feedback-info-950' },
    ]

    const successColors = [
      { name: 'Success 100', variable: '--feedback-success-100' },
      { name: 'Success 200', variable: '--feedback-success-200' },
      { name: 'Success 400', variable: '--feedback-success-400' },
      { name: 'Success 600', variable: '--feedback-success-600' },
      { name: 'Success 800', variable: '--feedback-success-800' },
      { name: 'Success 950', variable: '--feedback-success-950' },
    ]

    const warningColors = [
      { name: 'Warning 100', variable: '--feedback-warning-100' },
      { name: 'Warning 200', variable: '--feedback-warning-200' },
      { name: 'Warning 400', variable: '--feedback-warning-400' },
      { name: 'Warning 600', variable: '--feedback-warning-600' },
      { name: 'Warning 800', variable: '--feedback-warning-800' },
      { name: 'Warning 950', variable: '--feedback-warning-950' },
    ]

    const dangerColors = [
      { name: 'Danger 100', variable: '--feedback-danger-100' },
      { name: 'Danger 200', variable: '--feedback-danger-200' },
      { name: 'Danger 400', variable: '--feedback-danger-400' },
      { name: 'Danger 600', variable: '--feedback-danger-600' },
      { name: 'Danger 800', variable: '--feedback-danger-800' },
      { name: 'Danger 950', variable: '--feedback-danger-950' },
    ]

    return (
      <div className="p-10">
        <ColorPalette title="💬 Info" colors={infoColors} />
        <ColorPalette title="💬 Success" colors={successColors} />
        <ColorPalette title="💬 Warning" colors={warningColors} />
        <ColorPalette title="💬 Danger" colors={dangerColors} />
      </div>
    )
  },
}

export const ExtraColors: Story = {
  render: () => {
    const redColors = [
      { name: 'Red 100', variable: '--extra-red-100' },
      { name: 'Red 200', variable: '--extra-red-200' },
      { name: 'Red 300', variable: '--extra-red-300' },
      { name: 'Red 600', variable: '--extra-red-600' },
      { name: 'Red 800', variable: '--extra-red-800' },
      { name: 'Red 950', variable: '--extra-red-950' },
    ]

    const greenColors = [
      { name: 'Green 100', variable: '--extra-green-100' },
      { name: 'Green 200', variable: '--extra-green-200' },
      { name: 'Green 300', variable: '--extra-green-300' },
      { name: 'Green 600', variable: '--extra-green-600' },
      { name: 'Green 800', variable: '--extra-green-800' },
      { name: 'Green 950', variable: '--extra-green-950' },
    ]

    const pinkColors = [
      { name: 'Pink 100', variable: '--extra-pink-100' },
      { name: 'Pink 200', variable: '--extra-pink-200' },
      { name: 'Pink 300', variable: '--extra-pink-300' },
      { name: 'Pink 600', variable: '--extra-pink-600' },
      { name: 'Pink 800', variable: '--extra-pink-800' },
      { name: 'Pink 950', variable: '--extra-pink-950' },
    ]

    const blueColors = [
      { name: 'Blue 100', variable: '--extra-blue-100' },
      { name: 'Blue 200', variable: '--extra-blue-200' },
      { name: 'Blue 300', variable: '--extra-blue-300' },
      { name: 'Blue 600', variable: '--extra-blue-600' },
      { name: 'Blue 800', variable: '--extra-blue-800' },
      { name: 'Blue 950', variable: '--extra-blue-950' },
    ]

    return (
      <div className="p-10">
        <ColorPalette title="🌿 Red" colors={redColors} />
        <ColorPalette title="🌿 Green" colors={greenColors} />
        <ColorPalette title="🌿 Pink" colors={pinkColors} />
        <ColorPalette title="🌿 Blue" colors={blueColors} />
      </div>
    )
  },
}
