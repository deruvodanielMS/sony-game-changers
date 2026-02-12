import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Modal } from './Modal'
import { ModalHeader } from './ModalHeader'
import { ModalBody } from './ModalBody'
import { ModalFooter } from './ModalFooter'
import { Button } from '@/components/ui/atoms/Button'

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
        <ModalHeader onClose={() => {}}>Modal title</ModalHeader>
        <ModalBody>
          <p>
            Nulla vitae elit libero, a pharetra augue. Duis mollis, est non commodo luctus, nisi
            erat porttitor ligula, eget lacinia odio sem nec elit.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button variant="link">Button</Button>
          <div className="flex items-center gap-0_75">
            <Button variant="secondary">Button</Button>
            <Button variant="primary">Button</Button>
          </div>
        </ModalFooter>
      </>
    ),
  },
}

export const WithoutFooter: Story = {
  args: {
    open: true,
    onClose: () => {},
    children: (
      <>
        <ModalHeader onClose={() => {}}>Modal title</ModalHeader>
        <ModalBody>
          <p>
            Nulla vitae elit libero, a pharetra augue. Duis mollis, est non commodo luctus, nisi
            erat porttitor ligula, eget lacinia odio sem nec elit.
          </p>
        </ModalBody>
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
        <ModalHeader onClose={() => {}}>Modal title</ModalHeader>
        <ModalBody>
          <p>
            Nulla vitae elit libero, a pharetra augue. Duis mollis, est non commodo luctus, nisi
            erat porttitor ligula, eget lacinia odio sem nec elit.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button variant="link">Cancel</Button>
          <div className="flex items-center gap-0_75">
            <Button variant="secondary">Secondary</Button>
            <Button variant="primary">Confirm</Button>
          </div>
        </ModalFooter>
      </>
    ),
  },
}

export const FullScreen: Story = {
  args: {
    open: true,
    size: 'full',
    onClose: () => {},
    children: (
      <>
        <ModalHeader showClose onClose={() => {}}>
          Full Screen Modal
        </ModalHeader>
        <ModalBody>
          <p>
            This is a full screen modal. Nulla vitae elit libero, a pharetra augue. Duis mollis, est
            non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button variant="link">Cancel</Button>
          <Button variant="primary">Confirm</Button>
        </ModalFooter>
      </>
    ),
  },
}

export const ModalSizeSm: Story = {
  args: {
    open: true,
    size: 'sm',
    onClose: () => {},
    children: (
      <>
        <ModalHeader showClose onClose={() => {}}>
          Small Modal (547px)
        </ModalHeader>
        <ModalBody>
          <p>Small modal content - default for simple confirmations</p>
        </ModalBody>
      </>
    ),
  },
}

export const ModalSizeMd: Story = {
  args: {
    open: true,
    size: 'md',
    onClose: () => {},
    children: (
      <>
        <ModalHeader showClose onClose={() => {}}>
          Medium Modal (607px)
        </ModalHeader>
        <ModalBody>
          <p>Medium modal content - for forms with inputs</p>
        </ModalBody>
      </>
    ),
  },
}

export const ModalSizeLg: Story = {
  args: {
    open: true,
    size: 'lg',
    onClose: () => {},
    children: (
      <>
        <ModalHeader showClose onClose={() => {}}>
          Large Modal
        </ModalHeader>
        <ModalBody>
          <p>Large modal content</p>
        </ModalBody>
      </>
    ),
  },
}

export const OverlayCloseToggle: Story = {
  args: {
    open: true,
    overlayClose: false,
    onClose: () => {},
    children: (
      <>
        <ModalHeader showClose onClose={() => {}}>
          Overlay Close Disabled
        </ModalHeader>
        <ModalBody>
          <p>Clicking on the overlay will not close this modal. Use the X button instead.</p>
        </ModalBody>
      </>
    ),
  },
}
