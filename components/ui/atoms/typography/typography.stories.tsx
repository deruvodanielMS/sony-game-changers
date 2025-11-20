import type { Meta, StoryObj } from '@storybook/react'
import { Typography } from './typography'

/**
 * Reusable wrapper component for story layouts
 */
const TypographyShowcase = ({ children }: { children: React.ReactNode }) => (
  <div className="space-y-4">{children}</div>
)

const meta: Meta<typeof Typography> = {
  title: 'UI/Typography',
  component: Typography,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body', 'bodySmall', 'bodyTiny'],
    },
    fontWeight: {
      control: { type: 'select' },
      options: ['normal', 'semibold', 'bold'],
    },
    color: {
      control: { type: 'select' },
      options: ['default', 'muted', 'primary', 'secondary', 'success', 'warning', 'danger', 'info'],
    },
    as: {
      control: { type: 'select' },
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'div', 'label'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Typography example text',
  },
}

export const AllHeadings: Story = {
  render: () => (
    <TypographyShowcase>
      <Typography variant="h1">Heading 1 - Page titles</Typography>
      <Typography variant="h2">Heading 2 - Section titles</Typography>
      <Typography variant="h3">Heading 3 - Subsection titles</Typography>
      <Typography variant="h4">Heading 4 - Component titles</Typography>
      <Typography variant="h5">Heading 5 - Minor headings</Typography>
      <Typography variant="h6">Heading 6 - Small headings</Typography>
    </TypographyShowcase>
  ),
}

export const AllBodyVariants: Story = {
  render: () => (
    <TypographyShowcase>
      <Typography variant="body">Body - Main content text (16px/14px)</Typography>
      <Typography variant="body" fontWeight="bold">
        Body Bold - Emphasized content
      </Typography>
      <Typography variant="bodySmall">Body Small - Secondary content (14px/12px)</Typography>
      <Typography variant="bodySmall" fontWeight="bold">
        Body Small Bold - Emphasized secondary content
      </Typography>
      <Typography variant="bodyTiny">Body Tiny - Captions and labels (12px/10px)</Typography>
      <Typography variant="bodyTiny" fontWeight="bold">
        Body Tiny Bold - Emphasized captions
      </Typography>
    </TypographyShowcase>
  ),
}

export const ColorVariants: Story = {
  render: () => (
    <TypographyShowcase>
      <Typography variant="body" color="default">
        Default text color (neutral-1000)
      </Typography>
      <Typography variant="body" color="muted">
        Muted text color (neutral-400)
      </Typography>
      <Typography variant="body" color="primary">
        Primary accent color (accent-primary)
      </Typography>
      <Typography variant="body" color="secondary">
        Secondary accent color (accent-primary-dark)
      </Typography>
      <Typography variant="body" color="success">
        Success feedback color (feedback-success-600)
      </Typography>
      <Typography variant="body" color="warning">
        Warning feedback color (feedback-warning-600)
      </Typography>
      <Typography variant="body" color="danger">
        Danger feedback color (feedback-danger-600)
      </Typography>
      <Typography variant="body" color="info">
        Info feedback color (feedback-info-600)
      </Typography>
      <Typography variant="body" className="text-feedback-success-600">
        Custom color via className (for special cases)
      </Typography>
    </TypographyShowcase>
  ),
}

export const BodyComposition: Story = {
  render: () => (
    <TypographyShowcase>
      <Typography variant="body">Default renders as &lt;p&gt;</Typography>
      <Typography variant="body" as="span">
        Body as &lt;span&gt; for inline text
      </Typography>
      <Typography variant="bodySmall" as="label">
        Body Small as &lt;label&gt; for forms
      </Typography>
      <Typography variant="bodyTiny" as="div">
        Body Tiny as &lt;div&gt; container
      </Typography>
    </TypographyShowcase>
  ),
}

export const SemanticExample: Story = {
  render: () => (
    <article className="space-y-4">
      <Typography variant="h1">Article Title</Typography>
      <Typography variant="body" color="muted">
        Published on November 13, 2025
      </Typography>

      <Typography variant="h2">Section 1</Typography>
      <Typography variant="body">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua.
      </Typography>

      <Typography variant="h3">Subsection 1.1</Typography>
      <Typography variant="body">
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </Typography>
    </article>
  ),
}

export const ResponsiveShowcase: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <Typography variant="bodySmall" color="muted" as="div" className="mb-2">
          Resize your browser to see responsive typography
        </Typography>
        <Typography variant="h1">Responsive H1</Typography>
        <Typography variant="bodySmall" color="muted">
          Desktop: 64px/80px | Mobile: 40px/48px
        </Typography>
      </div>

      <div>
        <Typography variant="h2">Responsive H2</Typography>
        <Typography variant="bodySmall" color="muted">
          Desktop: 48px/56px | Mobile: 32px/40px
        </Typography>
      </div>

      <div>
        <Typography variant="body">Responsive Body</Typography>
        <Typography variant="bodySmall" color="muted">
          Desktop: 16px/24px | Mobile: 14px/20px
        </Typography>
      </div>
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'responsive',
    },
  },
}

export const AccessibilityExamples: Story = {
  render: () => (
    <TypographyShowcase>
      <Typography variant="h2" role="heading" aria-level={2}>
        Accessible Heading with ARIA
      </Typography>
      <Typography variant="body" aria-label="Important message for screen readers">
        This text has a screen reader label
      </Typography>
      <Typography variant="bodySmall" aria-describedby="help-text">
        Form field with description (aria-describedby)
      </Typography>
      <Typography variant="body" id="help-text" color="muted">
        This is helper text referenced by aria-describedby
      </Typography>
      <Typography variant="body" role="status" aria-live="polite">
        Dynamic status message (aria-live)
      </Typography>
    </TypographyShowcase>
  ),
}

export const Playground: Story = {
  args: {
    variant: 'body',
    color: 'default',
    children: 'Edit props to test the Typography component',
  },
}
