'use client'

import { create } from 'zustand'
import { ReactNode } from 'react'
import { DrawerProps } from '@/components/ui/atoms/Drawer'
import { ModalProps } from '@/components/ui/molecules/Modal'
import { Toast } from '@/components/ui/atoms/Toast/Toast.types'
import { MODAL_ANIMATION_DURATION } from '@/common/constants'

type UIState = {
  modal: Omit<ModalProps, 'children'> & {
    content: ReactNode | null
  }

  drawer: Omit<DrawerProps, 'children'> & {
    content: ReactNode | null
  }

  // Toast
  toastQueue: Array<Toast>

  // Modal
  openModal: (content: ReactNode, config: Omit<ModalProps, 'children' | 'open'>) => void
  closeModal: () => void

  // Drawer
  openDrawer: (content: ReactNode, config: Omit<DrawerProps, 'children' | 'open'>) => void
  closeDrawer: () => void

  // Toast
  enqueueToast: (content: Toast) => void
  dequeueToast: () => void
}

export const useUIStore = create<UIState>((set) => ({
  modal: {
    open: false,
    content: null,
  },

  drawer: {
    open: false,
    content: null,
  },

  toastQueue: [],

  // Modal
  openModal: (content) =>
    set({
      modal: { open: true, content },
    }),

  closeModal: () => {
    set((state) => ({
      modal: { ...state.modal, open: false },
    }))
    setTimeout(() => {
      set((state) => ({
        modal: { ...state.modal, content: null },
      }))
    }, MODAL_ANIMATION_DURATION)
  },

  // Drawer
  openDrawer: (content) =>
    set({
      drawer: { open: true, content },
    }),

  closeDrawer: () =>
    set({
      drawer: { open: false, content: null },
    }),

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
