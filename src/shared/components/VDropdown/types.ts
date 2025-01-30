import type { Ref } from 'vue'

export interface IVDropdownSlots {
  default?: () => any
  trigger?: (props: {
    isVisible: boolean
    toggle: () => void
    setVisible: (payload: boolean) => void
  }) => any
}

export interface IVDropdownEmits {
  (event: 'opened', payload: Element): void
  (event: 'closed', payload: Element): void
  (event: 'open'): void
  (event: 'close'): void
}

export interface IVDropdownExpose {
  setVisible: (payload: boolean) => void
  isVisible: Ref<boolean>
}
