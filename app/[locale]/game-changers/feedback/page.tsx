import { useTranslations } from 'next-intl'
import { SectionHeader } from '@/components/ui/organisms/SectionHeader'

export default function GameChangersFeedbackPage() {
  const t = useTranslations('Pages')

  return (
    <div className="flex flex-col gap-3">
      <SectionHeader
        title={t('gameChangersFeedback')}
        description={t('gameChangersFeedbackDescription')}
      />
      {/* Feedback content will be implemented later */}
    </div>
  )
}
