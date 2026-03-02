'use client'

import { AmbitionForm } from '@/components/game-changers/ambitions/AmbitionForm'
import type { NewAmbitionFormProps } from './NewAmbitionForm.types'

export function NewAmbitionForm({ parentAmbitionId, ...rest }: NewAmbitionFormProps) {
  return <AmbitionForm mode="create" parentAmbitionId={parentAmbitionId} {...rest} />
}

NewAmbitionForm.displayName = 'NewAmbitionForm'

