<template>
  <div
    ref="root"
    class="v-form-item"
    :class="[
      {
        'v-form-item--disabled': isDisabled,
        'v-form-item--required': isRequired,
        'v-form-item--error': isValidationStatusError,
        'v-form-item--validating': isValidationStatusValidating,
        'v-form-item--success': isValidationStatusSuccess
      }
    ]"
  >
    <label v-if="title" class="v-form-item__label">
      {{ title }}
    </label>

    <slot />

    <v-form-item-errors v-if="validationErrors.length" :errors="validationErrors" />
  </div>
</template>

<script setup lang="ts">
import type {
  IAsyncValidationError,
  IVFormItemField,
  IVFormItemInstance,
  IVFormItemProps,
  IVFormModelValues
} from '@/shared/components/VForm/types'
import {
  watch,
  useTemplateRef,
  ref,
  shallowRef,
  onMounted,
  onUnmounted,
  computed,
  nextTick
} from 'vue'
import Schema, { type Rules, type ValidateError, type Values } from 'async-validator'
import { ValidationStatusList } from '@/shared/enums'
import { useForm } from '@/shared/context/useForm'
import { getProp, isObject, clone } from '@/shared/utils'
import type { Maybe } from '@/shared/generics'
import VFormItemErrors from './VFormItemErrors.vue'

const props = defineProps<IVFormItemProps>()
const root = useTemplateRef<HTMLDivElement>('root')

const { Form } = useForm()

const validationStatus = ref<ValidationStatusList>()
const validationErrors = ref<Array<ValidateError>>([])
const validator = shallowRef<Schema>()

const field = shallowRef<IVFormItemField>()

let initialValue: IVFormModelValues

const modelValue = computed<IVFormModelValues>(
  () => props.prop && Form?.modelValue.value && getProp(Form.modelValue.value, props.prop)
)
const rules = computed<Maybe<Rules>>(
  () => props.prop && Form?.props?.rules && getProp(Form.props.rules, props.prop)
)

const isDisabled = computed<boolean>(() => !!(props.disabled || Form?.props.disabled))

const isRequired = computed<boolean>(() => {
  if (!rules.value) {
    return false
  }

  if (Array.isArray(rules.value)) {
    return rules.value.find((rule) => rule.required === true)?.required || false
  }

  if (isObject(rules.value)) {
    return rules.value?.required || false
  }

  return false
})

const isValidationStatusError = computed<boolean>(
  () => validationStatus.value === ValidationStatusList.error
)
const isValidationStatusValidating = computed<boolean>(
  () => validationStatus.value === ValidationStatusList.validating
)
const isValidationStatusSuccess = computed<boolean>(
  () => validationStatus.value === ValidationStatusList.success
)

const isValidatable = computed<boolean>(() => !!rules.value)

function clearValidate() {
  validationStatus.value = undefined
  validationErrors.value = []
}

async function reset() {
  if (!modelValue.value || !props.prop) {
    return
  }

  if (Form) {
    Form.modelValue.value[props.prop] = clone(initialValue)
  }

  field.value?.reset()

  await nextTick()

  clearValidate()
}

function setErrors(errors: Array<string>) {
  validationErrors.value = errors.map((error) => ({ message: error }))
  validationStatus.value = ValidationStatusList.error
}

async function validate(silent = false): Promise<boolean> {
  if (!props.prop) {
    return false
  }

  const model = {
    [props.prop]: modelValue.value
  }

  if (!modelValue.value && !props.prop && !rules.value) {
    return false
  }

  validationStatus.value = ValidationStatusList.validating

  if (!validator.value) {
    return false
  }

  try {
    await validator.value?.validate(model, {
      firstFields: true
    })

    validationStatus.value = ValidationStatusList.success

    return true
  } catch (error) {
    validationStatus.value = ValidationStatusList.error

    if (!silent) {
      const validationError = error as IAsyncValidationError

      if (validationError.errors) {
        validationErrors.value = validationError.errors
      }
    }

    return false
  }
}

function getDescriptor(): Values {
  const descriptor: Values = {}

  if (props.prop && rules.value) {
    descriptor[props.prop] = rules.value
  }

  return descriptor
}

function setDescriptor() {
  const descriptor = getDescriptor()

  validator.value = new Schema(descriptor)
}

onMounted(() => {
  if (!props.prop) {
    return
  }

  setDescriptor()

  initialValue = clone(modelValue.value)
})

onUnmounted(() => {
  Form?.unregisterFormItem(formItemInstance)
})

const formItemInstance: IVFormItemInstance = {
  uid: Math.random(),
  el: root,
  props,
  isValidationStatusError,
  isValidatable,
  reset,
  validate,
  setErrors,
  clearValidate
}

Form?.registerFormItem(formItemInstance)

watch(rules, setDescriptor)
watch(isValidationStatusSuccess, (boolean) => {
  if (boolean) {
    clearValidate()
  }
})
</script>

<style lang="scss" scoped></style>
