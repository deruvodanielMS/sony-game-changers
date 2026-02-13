'use client'
import React from 'react'
import { useTranslations } from 'next-intl'
import { LoginForm } from '@/components/ui/atoms/LoginForm'

export default function LoginPage() {
  const t = useTranslations('LoginForm')
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-6">
      <div className="w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-6 text-center">{t('pageTitle')}</h1>
        <LoginForm />
      </div>
    </div>
  )
}
