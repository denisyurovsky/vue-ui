<template>
  <div :class="classes" class="v-radio">
    <label class="v-radio__label">
      <input
        v-on="listeners"
        :value="value"
        :disabled="isDisabled"
        type="radio"
        :name="radioContext?.name"
        class="v-radio__input"
        v-model="model"
      />
      {{ label }}
    </label>
  </div>
</template>

<script setup lang="ts">
import type { IVRadioModelValue, IVRadioProps } from '@/shared/components/VRadio/types'
import { useRadioContext } from '@/shared/components/VRadio/useRadioContext'
import { computed, useAttrs } from 'vue'
import { useListeners } from '@/shared/composables'

const props = defineProps<IVRadioProps>()
const model = defineModel<IVRadioModelValue>({ required: true })
const radioContext = useRadioContext()
const attrs = useAttrs()
const listeners = useListeners(attrs)

const isDisabled = computed(() => {
  if (typeof radioContext?.disabled === 'boolean') {
    return props.disabled || radioContext?.disabled
  }

  return props.disabled
})

const classes = computed(() => [
  {
    'v-radio--disabled': isDisabled.value
  }
])
</script>

<style lang="scss" scoped>
.v-radio {
  color: var(--color-black);

  &--disabled {
    .v-radio__input,
    .v-radio__label {
      cursor: not-allowed;
    }

    .v-radio__label {
      color: var(--color-grey);
    }
  }
}
</style>
