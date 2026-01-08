import { AppLayout } from '@/components/ui/templates/AppLayout'

export default async function LangLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <AppLayout>{children}</AppLayout>
}
