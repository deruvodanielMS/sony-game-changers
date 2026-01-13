'use client'

import { useTranslations } from 'next-intl'
import { LanguageSwitcher } from '@/components/ui/molecules/LanguageSwitcher'
import { AnimatedSection } from '@/components/ui/foundations/AnimatedSection'

export default function ProfilePage() {
  const t = useTranslations('Pages')

  return (
    <div className="p-1 md:pt-1_5 md:px-3 md:pb-3 mt-4_5 md:mt-0">
      <AnimatedSection delay={0}>
        <h1 className="text-h3 leading-h3 font-bold text-neutral-1000 mb-6">{t('profile')}</h1>
      </AnimatedSection>

      {/* Language Settings Section */}
      <AnimatedSection delay={0.1}>
        <section className="mb-8">
          <h2 className="text-h5 leading-h5 font-semibold text-neutral-1000 mb-4">
            {t('languageSettings')}
          </h2>
          <div className="max-w-xs">
            <LanguageSwitcher isCollapsed={false} />
          </div>
        </section>
      </AnimatedSection>
    </div>
  )
}
