'use client'

import { ChangeEvent, forwardRef, useEffect, useEffectEvent, useState } from 'react'
import { Search } from 'lucide-react'
import { SearchFieldProps } from './SearchField.types'
import { TextField } from '@/components/ui/atoms/TextField'
import { useDebounce } from '@/hooks/useDebounce'
import { Button } from '@/components/ui/atoms/Button'
import { cn } from '@/utils/cn'

export const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(function SearchField(
  { defaultValue, debounce, buttonSearch, onChange, className, ...restProps },
  ref,
) {
  const [searchValue, setSearchValue] = useState(defaultValue || '')
  const _searchValue = useDebounce(searchValue, debounce)
  const handleChangeEvent = useEffectEvent((value: string) => {
    onChange(value)
  })
  useEffect(() => {
    if (_searchValue != null && !buttonSearch) {
      handleChangeEvent(_searchValue)
    }
  }, [_searchValue, buttonSearch])

  const handleOnSearchClick = () => {
    onChange(searchValue)
  }

  return (
    <div className="w-full relative">
      <TextField
        type="search"
        ref={ref}
        rightIcon={buttonSearch ? null : <Search width={16} className="text-neutral-1000" />}
        value={searchValue}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
        className={cn(className, buttonSearch && 'pr-1_5')}
        {...restProps}
      />
      {buttonSearch && (
        <Button
          onClick={handleOnSearchClick}
          variant={'plain'}
          iconOnly
          className="!w-2 !h-2 absolute right-0_5 top-0_5 hover:!bg-neutral-0 hover:!border-none hover:!shadow-none"
        >
          <Search width={16} />
        </Button>
      )}
    </div>
  )
})

SearchField.displayName = 'SearchField'
