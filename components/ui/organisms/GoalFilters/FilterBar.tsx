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
    <section className="w-full h-3 flex gap-1 justify-between max-sm:flex-col max-lg:h-auto">
      <form className="flex gap-1 items-center max-sm:flex-wrap max-sm:mb-1 md:max-lg:flex-wrap">
        {filters.map((props) => (
          <FilterMultiSelect key={props.label} className="shrink-0" {...props} />
        ))}
        {avatarSelector && <AvatarSelect {...avatarSelector} />}
        {clearFields && (
          <Button className="max-sm:order-last" variant={'plain'} onClick={handleClearFields}>
            {t('clearFieldsButton')}
          </Button>
        )}
        {searchField && (
          <FormControl className="" label={''}>
            <SearchField {...searchField} />
          </FormControl>
        )}
      </form>
      {children}
    </section>
  )
}
