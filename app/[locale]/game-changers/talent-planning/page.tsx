import { useTranslations } from 'next-intl'

export default function GameChangersTalentPlanningPage() {
  const t = useTranslations('Pages')

  return (
    <div>
      <h1 className="text-h3 leading-h3 font-bold text-neutral-1000">
        {t('gameChangersTalentPlanning')}
      </h1>
    </div>
  )
}
