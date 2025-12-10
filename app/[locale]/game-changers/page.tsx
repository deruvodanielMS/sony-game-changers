'use client'

import { useEffect } from 'react'
import { ROUTES } from '@/common/routes'
import { useRouter } from '@/i18n/navigation'

export default function GameChangersPage() {
  const router = useRouter()
  useEffect(() => {
    router.replace(ROUTES.GAME_CHANGERS_GOALS)
  }, [router])

  return null
}
