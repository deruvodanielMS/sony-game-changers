'use client'
import React, { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'

export function LoginForm() {
  const t = useTranslations('LoginForm')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const callbackUrl = searchParams?.get?.('callbackUrl') || '/'

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const res = await signIn('credentials', {
      redirect: true,
      email,
      password,
      callbackUrl,
    })

    setLoading(false)

    if (res?.error) {
      setError(t('invalidCredentials'))
      return
    }

    if (res?.url) {
      // NextAuth sometimes returns a url — prefer it
      window.location.href = res.url
      return
    }
  }

  return (
    <div className="max-w-sm mx-auto bg-white shadow-md rounded-lg p-2">
      <h4 className="text-h4 leading-h4 font-semibold mb-1">{t('title')}</h4>
      <form onSubmit={onSubmit} className="space-y-1_5">
        <div>
          <label className="block text-sm font-medium mb-1">{t('emailLabel')}</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            className="w-full px-0_5 py-0_75 border rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={t('emailPlaceholder')}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">{t('passwordLabel')}</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
            className="w-full px-0_5 py-0_75 border rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={t('passwordPlaceholder')}
          />
        </div>

        {error && <div className="text-sm text-red-600">{error}</div>}

        <button
          type="submit"
          disabled={loading}
          className="w-full px-0_5 py-0_75  bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? t('signingIn') : t('signIn')}
        </button>
      </form>
    </div>
  )
}
