export interface IVConfirmEmits {
  (event: 'success'): void
  (event: 'cancel'): void
}
export interface IVConfirmProps {
  title?: string
  message?: string
}
