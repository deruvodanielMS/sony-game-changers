'use client'

import { useTranslations } from 'next-intl'
import { LanguageSwitcher } from '@/components/ui/molecules/LanguageSwitcher'

export default function ProfilePage() {
  const t = useTranslations('Pages')

  return (
    <div className="p-4 md:p-6 mt-3 md:mt-0">
      <h1 className="text-h3 leading-h3 font-bold text-neutral-1000 mb-6">{t('profile')}</h1>

      {/* Language Settings Section */}
      <section className="mb-8">
        <h2 className="text-h5 leading-h5 font-semibold text-neutral-1000 mb-4">
          Language Settings
        </h2>
        <div className="max-w-xs">
          <LanguageSwitcher isCollapsed={false} />
        </div>
      </section>
    </div>
  )
}
