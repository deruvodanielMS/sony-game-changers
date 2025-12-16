'use client'

import { FormControl } from '@/components/ui/molecules/FormControl'
import { SearchField } from '@/components/ui/molecules/SearchField'
import { AvatarSelect } from '@/components/ui/molecules/AvatarSelect'
import { FilterMultiSelect } from '@/components/ui/molecules/FilterMultiSelect/FilterMultiSelect'
import { FilterBarType } from './FilterBar.types'
import { Button } from '../../atoms/Button'
import { useTranslations } from 'next-intl'

const FieldSpacer = () => {
  return <div className="w-[1px] h-1 bg-neutral-300 srink-0 grow-0 basis-[1px]" />
}

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
    <section className="w-full h-3 flex justify-between max-sm:flex-col max-sm:h-auto">
      <form className="flex gap-1 items-center max-sm:flex-wrap max-sm:mb-1">
        {filters.map((props) => (
          <FilterMultiSelect key={props.label} {...props} />
        ))}
        <FieldSpacer />
        {avatarSelector && <AvatarSelect {...avatarSelector} />}
        {clearFields && (
          <Button className="max-sm:order-last" variant={'plain'} onClick={handleClearFields}>
            {t('clearFieldsButton')}
          </Button>
        )}
        <FieldSpacer />
        {searchField && (
          <FormControl className="shrink-0 grow-0 " label={''}>
            <SearchField {...searchField} />
          </FormControl>
        )}
      </form>
      {children}
    </section>
  )
}
