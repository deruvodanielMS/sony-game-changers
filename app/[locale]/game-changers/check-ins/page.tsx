import { useTranslations } from 'next-intl'
import { SectionHeader } from '@/components/ui/organisms/SectionHeader'

export default function GameChangersCheckInsPage() {
  const t = useTranslations('Pages')

  return (
    <div className="flex flex-col gap-3">
      <SectionHeader
        title={t('gameChangersCheckIns')}
        description={t('gameChangersCheckInsDescription')}
      />
      {/* Check-ins content will be implemented later */}
    </div>
  )
}
