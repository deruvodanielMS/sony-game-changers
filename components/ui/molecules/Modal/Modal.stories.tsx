import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Modal } from './Modal'
import { ModalHeader } from './ModalHeader'
import { ModalBody } from './ModalBody'
import { ModalFooter } from './ModalFooter'

const meta: Meta<typeof Modal> = {
  title: 'Molecules/Modal',
  component: Modal,
}
export default meta

type Story = StoryObj<typeof Modal>

export const Default: Story = {
  args: {
    open: true,
    onClose: () => {},
    children: (
      <>
        <ModalHeader>Modal title</ModalHeader>
        <ModalBody>
          <p>
            Nulla vitae elit libero, a pharetra augue. Duis mollis, est non commodo luctus, nisi
            erat porttitor ligula, eget lacinia odio sem nec elit.
          </p>
        </ModalBody>
        <ModalFooter
          onConfirm={() => alert('You have confirmed this modal')}
          onCancel={() => alert('You have cancelled this modal')}
        />
      </>
    ),
  },
}

export const FocusTrap: Story = {
  args: {
    focusTrap: true,
    open: true,
    onClose: () => {},
    children: (
      <>
        <ModalHeader>Modal title</ModalHeader>
        <ModalBody>
          <p>
            Nulla vitae elit libero, a pharetra augue. Duis mollis, est non commodo luctus, nisi
            erat porttitor ligula, eget lacinia odio sem nec elit.
          </p>
        </ModalBody>
        <ModalFooter
          onConfirm={() => alert('You have confirmed this modal')}
          onCancel={() => alert('You have cancelled this modal')}
        />
      </>
    ),
  },
}

export const FullScreen: Story = {
  render: (args) => (
    <div className="space-y-6">
      <Modal {...args} open size="sm" aria-label="Small modal">
        <ModalHeader showClose onClose={args.onClose}>
          Small Modal
        </ModalHeader>
        <ModalBody>
          <p>Small modal content</p>
        </ModalBody>
      </Modal>

      <Modal {...args} open size="md" aria-label="Medium modal">
        <ModalHeader showClose onClose={args.onClose}>
          Medium Modal
        </ModalHeader>
        <ModalBody>
          <p>Medium modal content</p>
        </ModalBody>
      </Modal>

      <Modal {...args} open size="lg" aria-label="Large modal">
        <ModalHeader showClose onClose={args.onClose}>
          Large Modal
        </ModalHeader>
        <ModalBody>
          <p>Large modal content</p>
        </ModalBody>
      </Modal>

      <Modal {...args} open size="full" aria-label="Full modal">
        <ModalHeader showClose onClose={args.onClose}>
          Full Modal
        </ModalHeader>
        <ModalBody>
          <p>Full modal content</p>
        </ModalBody>
      </Modal>
    </div>
  ),
  args: {
    onClose: () => {},
  },
}

export const ModalSizeSm: Story = {
  render: (args) => (
    <div className="space-y-6">
      <Modal {...args} open size="sm" aria-label="Small modal">
        <ModalHeader showClose onClose={args.onClose}>
          Small Modal
        </ModalHeader>
        <ModalBody>
          <p>Small modal content</p>
        </ModalBody>
      </Modal>
    </div>
  ),
  args: {
    onClose: () => {},
  },
}

export const ModalSizeMd: Story = {
  render: (args) => (
    <div className="space-y-6">
      <Modal {...args} open size="md" aria-label="Medium modal">
        <ModalHeader showClose onClose={args.onClose}>
          Medium Modal
        </ModalHeader>
        <ModalBody>
          <p>Medium modal content</p>
        </ModalBody>
      </Modal>
    </div>
  ),
  args: {
    onClose: () => {},
  },
}

export const ModalSizeLg: Story = {
  render: (args) => (
    <div className="space-y-6">
      <Modal {...args} open size="lg" aria-label="Large modal">
        <ModalHeader showClose onClose={args.onClose}>
          Large Modal
        </ModalHeader>
        <ModalBody>
          <p>Large modal content</p>
        </ModalBody>
      </Modal>
    </div>
  ),
  args: {
    onClose: () => {},
  },
}

export const OverlayCloseToggle: Story = {
  args: {
    open: true,
    onClose: () => {},
    children: (
      <>
        <ModalHeader showClose onClose={() => {}}>
          Overlay Close Toggle
        </ModalHeader>
        <ModalBody>
          <p>Clicking on overlay may or may not close depending on prop.</p>
        </ModalBody>
      </>
    ),
  },
  parameters: {
    controls: { exclude: ['size', 'overlayClose', 'aria-label'] },
  },
}
