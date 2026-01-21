'use client'

import { create } from 'zustand'
import { ReactNode } from 'react'
import { DrawerProps } from '@/components/ui/atoms/Drawer'
import { ModalProps } from '@/components/ui/molecules/Modal'
import { Toast } from '@/components/ui/atoms/Toast/Toast.types'
import { MODAL_ANIMATION_DURATION, DRAWER_ANIMATION_DURATION } from '@/common/constants'

/**
 * UIState - Global UI state management for modals, drawers, and toasts
 *
 * This store centralizes all overlay UI components (modals, drawers, toasts)
 * to avoid local state management and MutationObserver usage.
 *
 * @example
 * ```tsx
 * const { openModal, closeModal, openDrawer, closeDrawer, enqueueToast } = useUIStore()
 *
 * // Open a modal
 * openModal(<Content />, { size: 'lg' })
 *
 * // Open a drawer
 * openDrawer(<Content />, { position: 'right', size: 'md' })
 *
 * // Enqueue a toast
 * enqueueToast({ id: 'example', message: '...', variant: 'success' })
 * ```
 */
type UIState = {
  modal: Omit<ModalProps, 'children'> & {
    content: ReactNode | null
  }

  drawer: Omit<DrawerProps, 'children'> & {
    content: ReactNode | null
  }

  // Internal key for React reconciliation (not a Drawer prop)
  drawerKey: number

  // Toast
  toastQueue: Array<Toast>

  /**
   * Opens a modal with the specified content and configuration
   * @param content - React content to display in the modal
   * @param config - Modal configuration (size, overlayClose, etc.)
   */
  openModal: (content: ReactNode, config: Omit<ModalProps, 'children' | 'open'>) => void

  /**
   * Closes the currently open modal with proper animation handling
   * @param animationDuration - Optional animation duration in ms (default: MODAL_ANIMATION_DURATION)
   */
  closeModal: (animationDuration?: number) => void

  /**
   * Opens a drawer with the specified content and configuration
   * @param content - React content to display in the drawer
   * @param config - Drawer configuration (position, size, title, etc.)
   */
  openDrawer: (content: ReactNode, config: Omit<DrawerProps, 'children' | 'open'>) => void

  /**
   * Closes the currently open drawer with proper animation handling
   * @param animationDuration - Optional animation duration in ms (default: DRAWER_ANIMATION_DURATION)
   */
  closeDrawer: (animationDuration?: number) => void

  // Toast
  enqueueToast: (content: Toast) => void
  dequeueToast: () => void
}

export const useUIStore = create<UIState>((set, get) => ({
  modal: {
    open: false,
    content: null,
  },

  drawer: {
    open: false,
    content: null,
  },

  drawerKey: 0,

  toastQueue: [],

  // Modal
  openModal: (content, config = {}) =>
    set({
      modal: {
        open: true,
        content,
        onClose: () => get().closeModal(),
        ...config,
      },
    }),

  closeModal: (animationDuration = MODAL_ANIMATION_DURATION) => {
    set((state) => ({
      modal: { ...state.modal, open: false },
    }))
    setTimeout(() => {
      set((state) => ({
        modal: { ...state.modal, content: null },
      }))
    }, animationDuration)
  },

  // Drawer
  openDrawer: (content, config = {}) =>
    set((state) => ({
      drawer: {
        content,
        open: true,
        position: 'right',
        size: 'md',
        overlayClose: true,
        showClose: true,
        focusTrap: false,
        onClose: () => get().closeDrawer(),
        ...config,
      },
      drawerKey: state.drawerKey + 1,
    })),

  closeDrawer: (animationDuration = DRAWER_ANIMATION_DURATION) => {
    set((state) => ({
      drawer: { ...state.drawer, open: false },
    }))
    setTimeout(() => {
      set({
        drawer: {
          open: false,
          content: null,
        },
      })
    }, animationDuration)
  },

  // Toast
  enqueueToast: (content) =>
    set((state) => ({
      toastQueue: [...state.toastQueue, content],
    })),

  dequeueToast: () =>
    set((state) => ({
      toastQueue: state.toastQueue.slice(1),
    })),
}))
