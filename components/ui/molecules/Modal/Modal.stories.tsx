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
  args: {
    open: true,
    size: 'full',
    onClose: () => {},
    children: (
      <>
        <ModalHeader showClose>Full Screen Modal</ModalHeader>
        <ModalBody>
          <p>
            This is a full screen modal. Nulla vitae elit libero, a pharetra augue. Duis mollis, est
            non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
          </p>
        </ModalBody>
        <ModalFooter onConfirm={() => alert('Confirmed')} onCancel={() => alert('Cancelled')} />
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
        <ModalHeader showClose>Small Modal</ModalHeader>
        <ModalBody>
          <p>Small modal content</p>
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
        <ModalHeader showClose>Medium Modal</ModalHeader>
        <ModalBody>
          <p>Medium modal content</p>
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
        <ModalHeader showClose>Large Modal</ModalHeader>
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
