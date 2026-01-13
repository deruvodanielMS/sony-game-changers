import { useTranslations } from 'next-intl'
import { SectionHeader } from '@/components/ui/organisms/SectionHeader'
import { AnimatedSection } from '@/components/ui/foundations/AnimatedSection'

export default function GameChangersPerformanceReviewPage() {
  const t = useTranslations('Pages')

  return (
    <div className="flex flex-col gap-3">
      <AnimatedSection delay={0}>
        <SectionHeader
          title={t('gameChangersPerformanceReviews')}
          description={t('gameChangersPerformanceReviewsDescription')}
        />
      </AnimatedSection>
      {/* Performance reviews content will be implemented later */}
    </div>
  )
}
