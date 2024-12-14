import type { Rule, ValidateError } from 'async-validator'
import type { ComputedRef, ModelRef, Ref } from 'vue'

export type IVFormModelValues = any

export type IVFormModel = Record<string, IVFormModelValues>

export type IVFormRules<T = unknown> = Partial<Record<T extends object ? keyof T : string, Rule>>

export interface IAsyncValidationError {
  errors: Array<ValidateError>
  fields: Record<string, Array<ValidateError>>
}

export interface IVFormProps {
  modelValue: IVFormModel
  rules?: IVFormRules
  disabled?: boolean
  scrollToError?: boolean
  scrollIntoViewOptions?: ScrollIntoViewOptions
}

export interface IVFormItemProps {
  disabled?: boolean
  prop?: keyof IVFormRules
  title?: string
}

export interface IVFormSlots {
  default?: (props: { isValid: boolean }) => void
}

export interface IVFormItemInstance {
  uid: number
  el: Ref<HTMLDivElement>
  isValidatable: ComputedRef<boolean>
  props: IVFormItemProps
  setErrors: (errors: Array<string>) => void
  isValidationStatusError: ComputedRef<boolean>
  validate: (silent?: boolean) => Promise<boolean>
  clearValidate: () => void
  reset: () => void
}

export interface IVFormContext {
  props: IVFormProps
  modelValue: ModelRef<IVFormModel>
  registerFormItem: (newFormItem: IVFormItemInstance) => void
  unregisterFormItem: (oldFormItem: IVFormItemInstance) => void
}
export interface IVFormItemField {
  reset: () => void
}

export interface IVFormItemContext {
  props: IVFormItemProps
  isValidationStatusError: ComputedRef<boolean>
  isValidationStatusValidating: ComputedRef<boolean>
  isValidationStatusSuccess: ComputedRef<boolean>
  registerField: (field: IVFormItemField) => void
  unregisterField: () => void
  isRequired: ComputedRef<boolean>
  validate: (silent?: boolean) => Promise<boolean>
  clearValidate: () => void
  reset: () => void
}

export type IVFormValidationResult = Promise<boolean>

export interface IVFormInstance {
  validate: (silent?: boolean) => IVFormValidationResult
  clearValidate: () => void
  reset: () => void
  setErrors: (errors: Record<string, string[]>) => void
}

export interface IVFormExpose extends IVFormInstance {}

export interface IVFormItemErrorsProps {
  errors: Array<ValidateError>
}
