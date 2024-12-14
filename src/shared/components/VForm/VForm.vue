<template>
  <form
    class="v-form"
    :class="{
      'v-form--disabled': disabled
    }"
  >
    <slot :is-valid="isValid" />
  </form>
</template>

<script lang="ts" setup>
import type {
  IVFormExpose,
  IVFormItemInstance,
  IVFormModel,
  IVFormProps,
  IVFormRules,
  IVFormSlots,
  IVFormValidationResult
} from '@/shared/components/VForm/types'
import { ref, provide, computed, watch } from 'vue'
import { VFormContextKey } from '@/shared/keys'
import { delay } from '@/shared/utils'

const props = withDefaults(defineProps<IVFormProps>(), {
  scrollIntoViewOptions: () => ({
    block: 'center'
  })
})

defineSlots<IVFormSlots>()

const modelValue = defineModel<IVFormModel>({
  required: true
})

const isValid = ref<boolean>(false)
const formItems = ref<Array<IVFormItemInstance>>([])

function registerFormItem(newFormItem: IVFormItemInstance) {
  const formItem = formItems.value.find((formItem) => formItem.uid === newFormItem.uid)

  if (!formItem) {
    formItems.value.push(newFormItem)
  }
}

function unregisterFormItem(oldFormItem: IVFormItemInstance) {
  formItems.value = formItems.value.filter((formItem) => formItem.uid !== oldFormItem.uid)
}

async function clearValidate() {
  await delay(0)

  formItems.value.forEach((formItem) => formItem.clearValidate())
}

const validatableFormItems = computed<Array<IVFormItemInstance>>(() =>
  formItems.value.filter((formItem) => formItem.isValidatable)
)

function reset() {
  formItems.value.forEach((formItem) => formItem.reset())

  clearValidate()
}

async function validate(silent = false): IVFormValidationResult {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve) => {
    const validationPromises = await Promise.all(
      validatableFormItems.value.map((formItem) => formItem.validate(silent))
    )

    console.log(validationPromises)

    const isValid = validationPromises.every(Boolean)

    return isValid ? resolve(true) : resolve(false)
  })
}

function setErrors(errors: Record<keyof IVFormRules, Array<string>>) {
  for (const [field, fieldErrors] of Object.entries(errors)) {
    const formItem = formItems.value.find((item) => item.props?.prop === field)

    if (formItem) {
      formItem.setErrors(fieldErrors)
    }
  }
}

provide(VFormContextKey, {
  props,
  modelValue,
  registerFormItem,
  unregisterFormItem
})

defineExpose<IVFormExpose>({
  validate,
  clearValidate,
  reset,
  setErrors
})

watch(
  validatableFormItems,
  (formItems) => {
    isValid.value = !formItems.length
  },
  {
    immediate: true
  }
)
</script>

<style lang="scss" scoped></style>
