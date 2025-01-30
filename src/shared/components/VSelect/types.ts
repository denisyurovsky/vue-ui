import type { IVDropdownEmits } from '@/shared/components/VDropdown/types'

export interface VSelectProps {
  multiple?: boolean
  title: string
  options: Array<string | number>
  disabled?: boolean
}

export interface VSelectEmits extends IVDropdownEmits {
  (event: 'change', payload: string | number): void
}
