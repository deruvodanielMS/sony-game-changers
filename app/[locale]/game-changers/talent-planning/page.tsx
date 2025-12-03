import { useTranslations } from 'next-intl'
import { SectionHeader } from '@/components/ui/organisms/SectionHeader'

export default function GameChangersTalentPlanningPage() {
  const t = useTranslations('Pages')

  return (
    <div className="flex flex-col gap-3">
      <SectionHeader
        title={t('gameChangersTalentPlanning')}
        description={t('gameChangersTalentPlanningDescription')}
      />
      {/* Talent planning content will be implemented later */}
    </div>
  )
}
