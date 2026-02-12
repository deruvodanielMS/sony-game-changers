'use client'

import { FormControl } from '@/components/ui/molecules/FormControl'
import { SearchField } from '@/components/ui/molecules/SearchField'
import { AvatarSelect } from '@/components/ui/molecules/AvatarSelect'
import { FilterMultiSelect } from '@/components/ui/molecules/FilterMultiSelect/FilterMultiSelect'
import { FilterBarType } from './FilterBar.types'
import { Button } from '@/components/ui/atoms/Button'
import { useTranslations } from 'next-intl'

export function FilterBar({
  children,
  clearFields,
  searchField,
  filters = [],
  avatarSelector,
}: FilterBarType) {
  const t = useTranslations('Goals.filters')
  const handleClearFields = () => {
    /** Clear Search Field */
    if (searchField) {
      searchField.onChange('')
    }
    /** Clear Filters */
    if (filters.length) {
      filters.forEach((filter) => filter.onSelect([]))
    }
    /** Clear Avatar Selector */
    if (avatarSelector) {
      avatarSelector.onAvatarSelect([])
    }
  }
  return (
    <section className="w-full flex flex-col gap-1 my-1 lg:flex-row lg:h-3 lg:justify-between">
      {/* Row 1: Filters + Avatar + Clear (on tablet: full width row) */}
      <form className="flex gap-1 items-center flex-wrap">
        {filters.map((props) => (
          <FilterMultiSelect key={props.label} className="shrink-0" {...props} />
        ))}
        {avatarSelector && <AvatarSelect {...avatarSelector} />}
        {clearFields && (
          <Button variant={'link'} size="small" onClick={handleClearFields}>
            {t('clearFieldsButton')}
          </Button>
        )}
      </form>
      {/* Row 2: Search + Primary Action (on tablet: full width row) */}
      <div className="flex gap-1 items-center justify-between lg:justify-end">
        {searchField && (
          <FormControl className="flex-1 lg:flex-none" label={''}>
            <SearchField {...searchField} />
          </FormControl>
        )}
        {children && <div className="shrink-0 self-center">{children}</div>}
      </div>
    </section>
  )
}
