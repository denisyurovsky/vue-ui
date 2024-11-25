export interface IVInputProps {
  disabled?: boolean
  placeholder?: string
  title?: string
  type?: string
}

export interface IVInputEmits {
  (event: 'focusin', payload: Event): void
  (event: 'focusout', payload: Event): void
}
