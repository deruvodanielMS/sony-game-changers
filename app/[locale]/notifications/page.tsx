import { useTranslations } from 'next-intl'

export default function NotificationsPage() {
  const t = useTranslations('Pages')

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-h3 leading-h3 font-bold text-neutral-1000">{t('notifications')}</h1>
    </div>
  )
}
