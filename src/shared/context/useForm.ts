import { useFormContext, useFormItemContext } from './'
import { computed } from 'vue'

export function useForm() {
  const Form = useFormContext()
  const FormItem = useFormItemContext()

  const isFormDisabled = computed<boolean>(
    () => !!(Form?.props.disabled || FormItem?.props.disabled)
  )
  const isValidationError = computed<boolean>(() => !!FormItem?.isValidationStatusError.value)
  const isRequired = computed<boolean>(() => !!FormItem?.isRequired.value)

  return {
    Form,
    FormItem,
    isFormDisabled,
    isValidationError,
    isRequired
  }
}
