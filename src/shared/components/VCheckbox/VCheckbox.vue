<template>
  <div :class="classes" class="v-checkbox">
    <label class="v-checkbox__label">
      &#x2717;
      <input
        :value="value"
        :disabled="disabled"
        v-model="model"
        class="v-checkbox__input"
        type="checkbox"
      />
    </label>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { IVCheckboxProps } from '@/shared/components/VCheckbox/types'
import { isBoolean } from '@/shared/utils'

const model = defineModel()
const props = defineProps<IVCheckboxProps>()

const isChecked = computed<boolean>(() => {
  if (isBoolean(model.value)) {
    return model.value
  }

  if (props.value && !isBoolean(props.value) && Array.isArray(model.value)) {
    return model.value.includes(props.value)
  }

  return (props.value && model.value) === props.value
})

const classes = computed(() => [
  {
    'v-checkbox--active': isChecked.value,
    'v-checkbox--disabled': props.disabled
  }
])
</script>

<style scoped lang="scss">
.v-checkbox {
  overflow: hidden;
  position: relative;
  display: inline-block;

  &--disabled {
    .v-checkbox__label {
      cursor: not-allowed;
      border-color: grey;
    }
  }
  &--active {
    .v-checkbox__label {
      background-color: var(--color-teal);
      color: var(--color-white);
    }
  }

  &__label {
    width: 20px;
    height: 20px;
    border: 1px solid var(--color-teal);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-white);
  }
  &__input {
    position: absolute;
    top: -20px;
  }
}
</style>
