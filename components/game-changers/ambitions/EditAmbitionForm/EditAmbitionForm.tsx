'use client'

import { AmbitionForm } from '@/components/game-changers/ambitions/AmbitionForm'
import type { EditAmbitionFormProps } from './EditAmbitionForm.types'

export function EditAmbitionForm({ goal, ...rest }: EditAmbitionFormProps) {
  return <AmbitionForm mode="edit" goal={goal} {...rest} />
}

EditAmbitionForm.displayName = 'EditAmbitionForm'

