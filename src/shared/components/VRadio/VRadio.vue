<template>
  <div :class="classes" class="v-radio">
    <label class="v-radio__label">
      <input
        v-on="listeners"
        :value="value"
        :disabled="disabled"
        type="radio"
        class="v-radio__input"
        v-model="model"
      />
      {{ label }}
    </label>
  </div>
</template>

<script setup lang="ts">
import type { IVRadioModelValue, IVRadioProps } from '@/shared/components/VRadio/types'
import { computed, useAttrs } from 'vue'
import { useListeners } from '@/shared/composables'

const props = defineProps<IVRadioProps>()
const model = defineModel<IVRadioModelValue>({ required: true })
const attrs = useAttrs()
const listeners = useListeners(attrs)

const classes = computed(() => [
  {
    'v-radio--disabled': props.disabled
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
