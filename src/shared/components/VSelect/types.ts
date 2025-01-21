export interface VSelectProps {
  multiple?: boolean
  options: Array<string | number>
  placeholder: string
}

export interface VSelectEmits {
  (event: 'change', payload: string | number): void
}
