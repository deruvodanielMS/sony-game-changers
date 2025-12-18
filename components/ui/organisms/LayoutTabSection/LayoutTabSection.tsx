'use client'

import { usePathname } from 'next/navigation'
import * as Tabs from '@radix-ui/react-tabs'
import { Link } from '@/i18n/navigation'
import type { LayoutTabSectionProps, LayoutTabItem } from './LayoutTabSection.types'

export function LayoutTabSection({ children, sections = [] }: LayoutTabSectionProps) {
  const pathname = usePathname()

  const current = pathname.split('/').pop() || ''

  const tabItemClasses =
    'min-w-[200px] p-0_75 gap-0_5 text-body leading-body flex items-center bg-neutral-100 transition-hover hover:bg-neutral-200 data-[state=active]:bg-neutral-800 data-[state=active]:text-neutral-0 rounded-default font-bold'
  const tabLabelClasses = 'line-clamp-1'

  return (
    <div>
      <Tabs.Root value={current}>
        {/* Desktop: Sticky navigation */}
        <div className="sticky top-0 md:top-0 top-[64px] z-[900] bg-neutral-0 px-1 md:px-3">
          <Tabs.List className="hidden md:flex gap-1 py-1_5">
            {sections.map(({ value, label, href, icon }: LayoutTabItem) => (
              <Tabs.Trigger key={value} value={value} asChild className={tabItemClasses}>
                <Link href={href}>
                  {icon}
                  <span className={tabLabelClasses}>{label}</span>
                </Link>
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          {/* Mobile: ScrollArea with horizontal scroll */}
          <div className="md:hidden w-full overflow-x-auto overflow-y-hidden py-1 scrollbar-hide">
            <Tabs.List className="flex gap-1">
              {sections.map(({ value, label, href, icon }: LayoutTabItem) => (
                <Tabs.Trigger key={value} value={value} asChild className={tabItemClasses}>
                  <Link href={href}>
                    {icon}
                    <span className={tabLabelClasses}>{label}</span>
                  </Link>
                </Tabs.Trigger>
              ))}
            </Tabs.List>
          </div>
        </div>

        <div className="px-1 md:px-3 pt-0 md:pt-1_5 pb-1 md:pb-3">{children}</div>
      </Tabs.Root>
    </div>
  )
}
