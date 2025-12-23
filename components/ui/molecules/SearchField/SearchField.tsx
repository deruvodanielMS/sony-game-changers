'use client'

import { ChangeEvent, forwardRef, useEffect, useEffectEvent, useState } from 'react'
import { Search, X } from 'lucide-react'
import { SearchFieldProps } from './SearchField.types'
import { TextField } from '@/components/ui/atoms/TextField'
import { useDebounce } from '@/hooks/useDebounce'
import { Button } from '@/components/ui/atoms/Button'
import { cn } from '@/utils/cn'

export const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(function SearchField(
  { defaultValue, debounce, buttonSearch, onChange, className, clearable, ...restProps },
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

  const updateSearchValue = useEffectEvent((value: string) => {
    if (defaultValue !== searchValue) {
      setSearchValue(value)
    }
  })

  useEffect(() => {
    updateSearchValue(defaultValue || '')
  }, [defaultValue])

  const handleOnSearchClick = () => {
    onChange(searchValue)
  }

  const handleOnClear = () => {
    setSearchValue('')
    onChange('')
  }

  return (
    <div className="relative">
      <TextField
        ref={ref}
        rightIcon={buttonSearch ? null : <Search width={16} className="text-neutral-1000" />}
        value={searchValue}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
        className={cn(className, buttonSearch && 'pr-1')}
        inputClassName={cn(
          'shrink-1 grow-1 basis-[50%] w-[50%]',
          clearable && !!searchValue && '!pr-2 ',
        )}
        {...restProps}
      />
      {clearable && !!searchValue && (
        <Button
          onClick={handleOnClear}
          variant={'plain'}
          iconOnly
          className="!w-2 !h-full absolute flex items-center right-2 top-0 hover:!bg-neutral-0 hover:!border-none hover:!shadow-none hover:!bg-transparent"
        >
          <X width={16} />
        </Button>
      )}
      {buttonSearch && (
        <Button
          onClick={handleOnSearchClick}
          variant={'plain'}
          iconOnly
          className="!w-2 !h-full absolute flex items-center right-0_5 top-0 hover:!bg-neutral-0 hover:!border-none hover:!shadow-none hover:!bg-transparent"
        >
          <Search width={16} />
        </Button>
      )}
    </div>
  )
})

SearchField.displayName = 'SearchField'
