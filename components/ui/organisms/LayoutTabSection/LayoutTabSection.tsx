'use client'

import { usePathname } from 'next/navigation'
import * as Tabs from '@radix-ui/react-tabs'
import { Link } from '@/i18n/navigation'
import type { LayoutTabSectionProps, LayoutTabItem } from './LayoutTabSection.types'

export function LayoutTabSection({ children, sections = [] }: LayoutTabSectionProps) {
  const pathname = usePathname()

  const current = pathname.split('/').pop() || ''

  const tabItemClasses =
    'min-w-[200px] p-0_75 gap-0_5 text-body leading-body flex items--center bg-neutral-100 hover:bg-neutral-200 data-[state=active]:bg-neutral-800 data-[state=active]:text-neutral-0 rounded-default'

  return (
    <div className="block px-3">
      <Tabs.Root value={current}>
        <Tabs.List className="flex gap-1 py-1_5">
          {sections.map(({ value, label, href, icon }: LayoutTabItem) => (
            <Tabs.Trigger key={value} value={value} asChild className={tabItemClasses}>
              <Link href={href}>
                {icon}
                <span>{label}</span>
              </Link>
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        <div>{children}</div>
      </Tabs.Root>
    </div>
  )
}
