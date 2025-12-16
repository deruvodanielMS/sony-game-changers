import { FilterMultiSelectProps } from '@/components/ui/molecules/FilterMultiSelect/FilterMultiSelect.types'
import { AvatarSelectProps } from '@/components/ui/molecules/AvatarSelect/AvatarSelect.types'
import { SearchFieldProps } from '@/components/ui/molecules/SearchField/SearchField.types'

export type FilterBarType = {
  children: React.ReactNode
  filters: Array<FilterMultiSelectProps>
  avatarSelector?: AvatarSelectProps
  clearFields?: boolean
  searchField?: SearchFieldProps
}
