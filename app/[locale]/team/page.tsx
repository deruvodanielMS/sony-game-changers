import { useTranslations } from 'next-intl'
import { AnimatedSection } from '@/components/ui/foundations/AnimatedSection'

export default function MyTeamPage() {
  const t = useTranslations('Pages')

  return (
    <div className="p-1 md:pt-1_5 md:px-3 md:pb-3 mt-4_5 md:mt-0">
      <AnimatedSection delay={0}>
        <h1 className="text-h3 leading-h3 font-bold text-neutral-1000">{t('myTeam')}</h1>
      </AnimatedSection>
    </div>
  )
}
