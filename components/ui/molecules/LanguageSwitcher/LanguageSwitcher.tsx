'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'
import { LANGUAGES } from '@/common/constants'
import { cn } from '@/utils/cn'
import type { LanguageSwitcherProps } from './LanguageSwitcher.types'

/**
 * LanguageSwitcher - Language toggle component
 * Switches between available languages (EN/FR)
 */
export function LanguageSwitcher({
  isCollapsed = false,
  className,
  'data-test-id': dataTestId,
}: LanguageSwitcherProps) {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  const handleLanguageChange = () => {
    const newLocale = locale === LANGUAGES.EN ? LANGUAGES.FR : LANGUAGES.EN
    router.replace(pathname, { locale: newLocale })
  }

  const currentLanguage = locale === LANGUAGES.EN ? 'EN' : 'FR'
  const nextLanguage = locale === LANGUAGES.EN ? 'FR' : 'EN'

  return (
    <button
      type="button"
      onClick={handleLanguageChange}
      aria-label={`Switch to ${nextLanguage}`}
      data-test-id={dataTestId}
      className={cn(
        'flex items-center w-full',
        'transition-colors duration-fast',
        'rounded-default',
        'text-body-small leading-body-small font-bold',
        'text-neutral-1000',
        'hover:bg-neutral-200',
        'cursor-pointer',
        'border border-neutral-300',
        isCollapsed ? 'justify-center p-0_5' : 'px-1 py-0_75 gap-0_5',
        className,
      )}
    >
      {isCollapsed ? (
        <span className="text-body-tiny leading-body-tiny font-bold" aria-hidden="true">
          {currentLanguage}
        </span>
      ) : (
        <>
          <span className="flex-1 text-left">{currentLanguage}</span>
          <span className="text-neutral-600 text-body-tiny" aria-hidden="true">
            → {nextLanguage}
          </span>
        </>
      )}
    </button>
  )
}

LanguageSwitcher.displayName = 'LanguageSwitcher'
